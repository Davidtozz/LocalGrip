create extension if not exists "pg_jsonschema" with schema "extensions";


alter table "public"."restaurant" drop column "cuisinez_type";

--drop extension if exists "pg_jsonschema";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_restaurant_profile(name text, address text, phone text, website text)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN
  INSERT INTO restaurant
  (name, address, phone, website_url, owner_id)
  VALUES (name, address, phone, website, auth.uid());
END;
$function$;