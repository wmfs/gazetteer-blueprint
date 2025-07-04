DROP VIEW IF EXISTS wmfs.expanded_gazetteer_view CASCADE;

CREATE SCHEMA IF NOT EXISTS ordnance_survey;
CREATE TABLE IF NOT EXISTS ordnance_survey.addressbase_classifications (
    concatenated text,
    class_desc text,
    general_desc text,
    small_icon text,
    large_icon text
);

CREATE VIEW wmfs.expanded_gazetteer_view AS
   SELECT gaz.uprn,
          gaz.origin_hash_sum,
          gaz.counter,
          gaz.masking_number,
          gaz.class,
          ac.class_desc as class_description,
          ac.general_desc as general_description,
          gaz.parent_uprn,
          gaz.usrn,
          gaz.state,
          gaz.lpi_status,
          gaz.local_custodian_code,
          gaz.official_flag,
          gaz.address_label,
          gaz.address_description,
          gaz.business_name,
          gaz.building_name,
          gaz.building_number,
          gaz.street_name_1,
          gaz.area_name_1,
          gaz.area_name_2,
          gaz.postcode,
          gaz.post_town,
          gaz.post_county,
          gaz.latitude,
          gaz.longitude,
          gaz.actual_x,
          gaz.actual_y,
          gaz.routing_x,
          gaz.routing_y,
          gaz.mapbook_ref,
          gaz.lpi_key,
          gaz.lsoa_code_2011,
          gaz.voa_ndrp_desc_code,
          gaz.voa_ndr_scat_code,
          gaz.street_name_2,
          gaz.ward_code,
          gaz.command_area_id,
          gaz.command_area_label,
          gaz.borough_id,
          gaz.district_id,
          gaz.data_source,
          gaz.alias,
          gaz.routing_node,
          ac.small_icon as small_icon,
          ac.large_icon as large_icon,
          gaz._created,
          gaz._created_by,
          gaz._modified,
          gaz._modified_by
     FROM wmfs.gazetteer gaz
LEFT JOIN ordnance_survey.addressbase_classifications ac ON (gaz.class = ac.concatenated)
WHERE (gaz.marked_as_invalid is null or gaz.marked_as_invalid = false)
and gaz.uprn not in (select am.local_uprn from conflict_resolution.accepted_matches am where am.is_active = true);
