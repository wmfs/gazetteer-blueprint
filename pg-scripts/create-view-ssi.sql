CREATE OR REPLACE VIEW wmfs.ssi_flattened AS
SELECT uprn, category, information, _modified, _created FROM wmfs.ssi
UNION
SELECT a.uprn, b.category, b.information, a._modified, a._created FROM wmfs.ssi_link a, wmfs.ssi b WHERE a.parent_uprn = b.uprn;
