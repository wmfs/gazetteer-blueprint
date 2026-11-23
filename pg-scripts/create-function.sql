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
--   and the postcode with and without its space.
-- If no postcode is given, the property's postcode is looked up in the gazetteer.
-- Never returns NULL, so it can be joined to other terms with ||. e.g.
--   wmfs.search_terms(100070567650, 'B6 6NU') -> {100070567650,7M36CJNX,B6 6NU,B66NU}
CREATE OR REPLACE FUNCTION wmfs.search_terms(p_uprn bigint, p_postcode text DEFAULT NULL)
  RETURNS text[]
  LANGUAGE plpgsql STABLE PARALLEL SAFE AS
$$
DECLARE
  v_uprns bigint[] := '{}';
  v_postcode text := upper(regexp_replace(btrim(p_postcode), '\s+', ' ', 'g'));
  v_terms text[] := '{}';
  u bigint;
BEGIN
  IF p_uprn > 0 THEN
    SELECT coalesce(array_agg(DISTINCT m::bigint), '{}') INTO v_uprns
      FROM unnest(string_to_array(conflict_resolution.find_related_uprns(p_uprn), ',')) AS m;
    IF NOT p_uprn = ANY(v_uprns) THEN
      v_uprns := p_uprn || v_uprns;
    END IF;

    IF coalesce(v_postcode, '') = '' THEN
      SELECT upper(regexp_replace(btrim(g.postcode), '\s+', ' ', 'g')) INTO v_postcode
        FROM wmfs.gazetteer g
       WHERE g.uprn = p_uprn
         AND coalesce(btrim(g.postcode), '') <> ''
       ORDER BY CASE g.lpi_status WHEN 1 THEN 1 WHEN 3 THEN 2 WHEN 6 THEN 3 WHEN 8 THEN 4 ELSE 5 END, g.counter
       LIMIT 1;
    END IF;
  END IF;

  FOREACH u IN ARRAY v_uprns LOOP
    v_terms := v_terms || u::text || wmfs.uprn_to_mask(u);
  END LOOP;

  IF coalesce(v_postcode, '') <> '' THEN
    v_terms := v_terms || v_postcode || replace(v_postcode, ' ', '');
  END IF;

  RETURN ARRAY(SELECT DISTINCT t FROM unnest(v_terms) AS t WHERE coalesce(t, '') <> '' ORDER BY t);
END;
$$;
