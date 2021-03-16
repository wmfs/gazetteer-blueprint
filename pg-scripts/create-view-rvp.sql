CREATE OR REPLACE VIEW wmfs.rvp_split_coords AS
   SELECT
   uprn,
   type,
   label,
   SPLIT_PART(coordinates, ', ', 1) as x_coordinate,
   SPLIT_PART(coordinates, ', ', 2) as y_coordinate,
   _modified
   FROM wmfs.rendezvous_points;
