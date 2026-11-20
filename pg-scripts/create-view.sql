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

-- Search views: one row per UPRN.
-- wmfs.gazetteer has a row per UPRN + counter (approved, alternative, provisional, historical addresses).
-- The chosen row is the best valid one: approved, then alternative, provisional, historical, then
-- lowest counter. The other rows' addresses and aliases are kept so they can still be searched.
--   gazetteer_search_view_all: every UPRN, with all_invalid (every row marked invalid) and merged
--     (a local record merged into another UPRN) flags, for blueprints that need those too
--   gazetteer_search_view: only properties that are neither, used by search-docs/expanded-gazetteer-view.json
DROP VIEW IF EXISTS wmfs.gazetteer_search_view CASCADE;
DROP VIEW IF EXISTS wmfs.gazetteer_search_view_all CASCADE;

CREATE VIEW wmfs.gazetteer_search_view_all AS
   SELECT chosen.uprn,
          chosen.counter,
          chosen.address_label,
          chosen.masking_number,
          chosen.class,
          ac.general_desc as general_description,
          ac.small_icon as small_icon,
          chosen.postcode,
          chosen.latitude,
          chosen.longitude,
          chosen.actual_x,
          chosen.actual_y,
          chosen.lpi_status,
          others.other_address_labels,
          others.aliases,
          others.all_invalid,
          (merged.local_uprn is not null) as merged,
          others._created,
          others._modified
     FROM (
            SELECT DISTINCT ON (gaz.uprn) gaz.*
              FROM wmfs.gazetteer gaz
          ORDER BY gaz.uprn,
                   coalesce(gaz.marked_as_invalid, false),
                   case gaz.lpi_status when 1 then 1 when 3 then 2 when 6 then 3 when 8 then 4 else 5 end,
                   gaz.counter
          ) chosen
CROSS JOIN LATERAL (
            SELECT bool_and(coalesce(g.marked_as_invalid, false)) as all_invalid,
                   nullif(array_to_string(array_agg(DISTINCT g.address_label) FILTER (
                     WHERE g.address_label is not null
                       and g.address_label is distinct from chosen.address_label
                       and not coalesce(g.marked_as_invalid, false)
                   ), '; '), '') as other_address_labels,
                   nullif(array_to_string(array_agg(DISTINCT g.alias) FILTER (WHERE g.alias is not null), '; '), '') as aliases,
                   min(g._created) as _created,
                   max(g._modified) as _modified
              FROM wmfs.gazetteer g
             WHERE g.uprn = chosen.uprn
          ) others
LEFT JOIN ordnance_survey.addressbase_classifications ac ON (chosen.class = ac.concatenated)
LEFT JOIN (
            SELECT DISTINCT am.local_uprn
              FROM conflict_resolution.accepted_matches am
             WHERE am.is_active = true
          ) merged ON (merged.local_uprn = chosen.uprn);

CREATE VIEW wmfs.gazetteer_search_view AS
   SELECT *
     FROM wmfs.gazetteer_search_view_all
    WHERE not all_invalid
      and not merged;
