CREATE OR REPLACE VIEW wmfs.ssi_flattened AS
SELECT uprn, category, information, _modified, _created
FROM wmfs.ssi
UNION
SELECT a.uprn, a.parent_category, b.information, a._modified, a._created
FROM wmfs.ssi_link a, wmfs.ssi b
WHERE a.parent_uprn = b.uprn
AND a.parent_category = b.category;


CREATE OR REPLACE VIEW wmfs.ssi_aggregated AS
SELECT
uprn,
STRING_AGG(category || E'\n' || REGEXP_REPLACE(category, '.', '-', 'g') || E'\n' || information, E'\n\n' ORDER BY category) AS notes,
_modified,
_created
FROM wmfs.ssi_flattened
GROUP BY uprn, _modified, _created;
