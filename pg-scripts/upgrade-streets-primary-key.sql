-- When we add the counter we need to alter the street primary key constraint
-- to be a composite of usrn and counter.
--
-- Don't want to drop and recreate the primary key on each restart, so create
-- a little function to do it only if needed.
-- The query counts the number of fields that form the wmfs.streets primary
-- key. If there's only one, then the new composite is not in place so make
-- the alteration.    

CREATE OR REPLACE FUNCTION alter_streets_primary_key()
RETURNS BOOLEAN
AS
$BODY$
DECLARE
	changed BOOLEAN = false;
	key_fields INT;
BEGIN
  SELECT COUNT(a.attname) INTO key_fields
	FROM   pg_index i
	JOIN   pg_attribute a ON a.attrelid = i.indrelid AND a.attnum = ANY(i.indkey)
	WHERE  i.indrelid = 'wmfs.streets'::regclass
	AND    i.indisprimary;

  IF key_fields = 1 THEN
	ALTER TABLE wmfs.streets DROP CONSTRAINT streets_pkey;
  	ALTER TABLE wmfs.streets ADD PRIMARY KEY (usrn, counter);
	changed := true;
  END IF;

  RETURN changed;
END
$BODY$
LANGUAGE plpgsql;

SELECT alter_streets_primary_key();

DROP FUNCTION alter_streets_primary_key();
