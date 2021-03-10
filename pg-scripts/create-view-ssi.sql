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
STRING_AGG(
    category || E'\n' || REGEXP_REPLACE(category, '.', '-', 'g') || E'\n' || information,
    E'\n\n'
    ORDER BY CASE category
    WHEN 'CRITICAL' THEN 1
    WHEN 'COMAH SITE DETAILS' THEN 2
    WHEN 'FIRE CONTROL INSTRUCTION' THEN 3
    WHEN 'MOBILISATION/PDA' THEN 4
    WHEN 'OCCUPANCY/LIFE RISK' THEN 5
    WHEN 'SITE HAZARDS' THEN 6
    WHEN 'ILLEGAL BEHAVIOUR/VIOLENCE' THEN 7
    WHEN 'BUILDING CONSTRUCTION' THEN 8
    WHEN 'ON-SITE FIRE EQUIPMENT' THEN 9
    WHEN 'OTHER ON-SITE EQUIPMENT' THEN 10
    WHEN 'SECURITY ARRANGEMENTS' THEN 11
    WHEN 'FINDING LOCATION' THEN 12
    WHEN 'ROAD/STREET' THEN 13
    WHEN 'ON ARRIVAL' THEN 14
    WHEN 'ON ENTRY' THEN 15
    WHEN 'PAST INCIDENT DETAIL' THEN 16
    WHEN 'BRIGADE FIRE-FIGHTING' THEN 17
    WHEN 'WATER' THEN 18
    WHEN 'POWER (GAS/ELECTRIC)' THEN 19
    WHEN 'RADIO/COMMS' THEN 20
    WHEN 'LIFT DETAILS' THEN 21
    WHEN 'TUNNELS/BRIDGES' THEN 22
    WHEN 'MOTORWAYS' THEN 23
    END
) AS notes,
(SELECT MAX(_modified) FROM ARRAY_AGG(_modified)) as _modified,
(SELECT MIN(_created) FROM ARRAY_AGG(_created)) as _created
FROM wmfs.ssi_flattened
GROUP BY uprn;

