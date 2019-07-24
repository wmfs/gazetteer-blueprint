CREATE OR REPLACE FUNCTION wmfs.base_encode(
    digits bigint,
    radix integer)
  RETURNS character varying AS
$BODY$
  -- code adapted from https://www.rightbrainnetworks.com/2010/03/02/base36-conversion-in-postgresql/
  DECLARE
    chars char[];
    ret varchar;
    val bigint;
  BEGIN
    chars := ARRAY['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    val := digits;
    ret := '';
    IF val < 0 THEN
        val := val * -1;
    END IF;
    WHILE val != 0 LOOP
        ret := chars[(val % radix)+1] || ret;
        val := val / radix;
    END LOOP;

    RETURN ret;
  END;
$BODY$
  LANGUAGE plpgsql
  IMMUTABLE
  RETURNS NULL ON NULL INPUT
  COST 100;



CREATE OR REPLACE FUNCTION wmfs.base_decode(
    encoded_value character varying,
    radix integer)
  RETURNS bigint AS
$BODY$
  -- code adapted from https://www.rightbrainnetworks.com/2010/03/02/base36-conversion-in-postgresql/
  DECLARE
    a char[];
    ret bigint;
    i int;
    val int;
    chars varchar;
  BEGIN
    chars := '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    FOR i IN REVERSE char_length(encoded_value)..1 LOOP
      a := a || substring(upper(encoded_value) FROM i FOR 1)::char;
    END LOOP;
    i := 0;
    ret := 0;
    WHILE i < (array_length(a,1)) LOOP
      val := position(a[i+1] IN chars)-1;
      ret := ret + (val * (radix ^ i));
      i := i + 1;
    END LOOP;

    RETURN ret;
  END;
$BODY$
  LANGUAGE plpgsql
  IMMUTABLE
  RETURNS NULL ON NULL INPUT
  COST 100;



CREATE OR REPLACE FUNCTION wmfs.uprn_to_mask(
    uprn bigint)
  RETURNS text AS
$BODY$
DECLARE
  v_init_vector bigint = 112134617170;
  v_encode_radix int = 31;
  v_mask text;
BEGIN
  SELECT upper(replace(replace(replace(replace(replace(lower(wmfs.base_encode((uprn + v_init_vector), v_encode_radix)), 'a', 'z'), 'e', 'y'), 'i', 'x'), 'o', 'w'), 'u', 'v')) INTO v_mask;

  RETURN v_mask;
END;
$BODY$
  LANGUAGE plpgsql
  IMMUTABLE
  RETURNS NULL ON NULL INPUT
  COST 100;



CREATE OR REPLACE FUNCTION wmfs.mask_to_uprn(
    mask text)
  RETURNS bigint AS
$BODY$
DECLARE
  v_init_vector bigint = 112134617170;
  v_encode_radix int = 31;
  v_uprn bigint;
BEGIN
  SELECT wmfs.base_decode(replace(replace(replace(replace(replace(lower(mask), 'z', 'a'), 'y', 'e'), 'x', 'i'), 'w', 'o'), 'v', 'u'), v_encode_radix) - v_init_vector INTO v_uprn;

  RETURN v_uprn;
END;
$BODY$
  LANGUAGE plpgsql
  IMMUTABLE
  RETURNS NULL ON NULL INPUT
  COST 100;
