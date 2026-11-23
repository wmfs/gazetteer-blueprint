-- Masking numbers.
-- A masking number is the UPRN plus 112134617170, written in base 31 with the vowels swapped
-- for consonants (a>z, e>y, i>x, o>w, u>v), e.g. 100070567650 -> 7M36CJNX.
-- These must give the same results as @wmfs/uprn-encode-decode: test/masking-number-sql-tests.js
-- runs that package's shared test cases (lib/test-cases.json) against them.

-- UPRN -> masking number. NULL for anything that isn't a valid UPRN (missing, 0, negative, more than 12 digits).
CREATE OR REPLACE FUNCTION wmfs.uprn_to_mask(uprn bigint)
  RETURNS text
  LANGUAGE plpgsql IMMUTABLE STRICT PARALLEL SAFE AS
$$
DECLARE
  alphabet CONSTANT text := '0123456789ZBCDYFGHXJKLMNWPQRSTV';
  v bigint;
  r text := '';
BEGIN
  IF uprn <= 0 OR uprn > 999999999999 THEN
    RETURN NULL;
  END IF;
  v := uprn + 112134617170;
  WHILE v > 0 LOOP
    r := substr(alphabet, (v % 31)::int + 1, 1) || r;
    v := v / 31;
  END LOOP;
  RETURN r;
END;
$$;

-- Masking number -> UPRN. Ignores spaces and hyphens, reads O and I as 0 and 1
-- (they never appear in a masking number), and returns NULL for anything that isn't a valid masking number.
CREATE OR REPLACE FUNCTION wmfs.mask_to_uprn(mask text)
  RETURNS bigint
  LANGUAGE plpgsql IMMUTABLE STRICT PARALLEL SAFE AS
$$
DECLARE
  alphabet CONSTANT text := '0123456789ZBCDYFGHXJKLMNWPQRSTV';
  m text := translate(upper(regexp_replace(mask, '[\s-]', '', 'g')), 'OI', '01');
  acc bigint := 0;
  i int;
BEGIN
  -- 0-9 and consonants only: no A, E, I, O or U
  IF m !~ '^[0-9B-DF-HJ-NP-TV-Z]{1,9}$' THEN
    RETURN NULL;
  END IF;
  FOR i IN 1..length(m) LOOP
    acc := acc * 31 + strpos(alphabet, substr(m, i, 1)) - 1;
  END LOOP;
  acc := acc - 112134617170;
  RETURN CASE WHEN acc > 0 AND acc <= 999999999999 THEN acc END;
END;
$$;

-- Hidden search keys for a record held against a property, for a search doc's additionalTerms:
--   the UPRN and the UPRNs matched to it (the same property), their masking numbers,
--   and the property's postcode with and without its space, from the gazetteer.
-- The postcode is always taken from wmfs.gazetteer, so it's only stored in one place.
-- Never returns NULL, so it can be joined to other terms with ||. e.g.
--   wmfs.search_terms(100070567650) -> {100070567650,7M36CJNX,B6 6NU,B66NU}
DROP FUNCTION IF EXISTS wmfs.search_terms(bigint, text);

-- One SQL query rather than PL/pgSQL steps, and matched UPRNs are only looked up for UPRNs that have a match:
-- it runs for every gazetteer row in a full import, so it needs to be fast.
-- Needs the indexes on conflict_resolution.accepted_matches (local_uprn, official_uprn).
CREATE OR REPLACE FUNCTION wmfs.search_terms(p_uprn bigint)
  RETURNS text[]
  LANGUAGE sql STABLE PARALLEL SAFE AS
$$
  WITH uprns AS (
    SELECT p_uprn AS uprn WHERE p_uprn > 0
    UNION
    SELECT m::bigint
      FROM unnest(string_to_array(conflict_resolution.find_related_uprns(p_uprn), ',')) AS m
     WHERE p_uprn > 0
       AND EXISTS (SELECT 1 FROM conflict_resolution.accepted_matches a
                    WHERE (a.local_uprn = p_uprn OR a.official_uprn = p_uprn) AND a.is_active)
  ),
  -- each UPRN's postcode from its best gazetteer row (approved, then alternative, provisional, historical),
  -- so a local UPRN with no postcode still gets the postcode of the official UPRN it's matched to
  postcodes AS (
    SELECT DISTINCT ON (g.uprn) upper(regexp_replace(btrim(g.postcode), '\s+', ' ', 'g')) AS postcode
      FROM wmfs.gazetteer g
      JOIN uprns u ON u.uprn = g.uprn
     WHERE coalesce(btrim(g.postcode), '') <> ''
     ORDER BY g.uprn, CASE g.lpi_status WHEN 1 THEN 1 WHEN 3 THEN 2 WHEN 6 THEN 3 WHEN 8 THEN 4 ELSE 5 END, g.counter
  )
  SELECT coalesce(array_agg(DISTINCT t ORDER BY t) FILTER (WHERE coalesce(t, '') <> ''), '{}')
    FROM (
      SELECT uprn::text AS t FROM uprns
      UNION ALL SELECT wmfs.uprn_to_mask(uprn) FROM uprns
      UNION ALL SELECT postcode FROM postcodes
      UNION ALL SELECT replace(postcode, ' ', '') FROM postcodes
    ) terms
$$;
