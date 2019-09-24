CREATE OR REPLACE VIEW wmfs.ssi_flattened AS
SELECT uprn, category, information FROM wmfs.ssi
UNION
SELECT a.uprn, b.category, b.information FROM wmfs.ssi_link a, wmfs.ssi b WHERE a.parent_uprn = b.uprn;
