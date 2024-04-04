create extension if not exists "pg_jsonschema" with schema "extensions";


drop policy "Owners can create a menu category for their own menu" on "public"."menu_category";

drop policy "Owners can read their own menu category data" on "public"."menu_category";

drop policy "Owners can insert items into their restaurant menu" on "public"."menu_item";

drop policy "Owners can see the menu items of their own menu" on "public"."menu_item";

revoke delete on table "public"."menu_category" from "anon";

revoke insert on table "public"."menu_category" from "anon";

revoke references on table "public"."menu_category" from "anon";

revoke select on table "public"."menu_category" from "anon";

revoke trigger on table "public"."menu_category" from "anon";

revoke truncate on table "public"."menu_category" from "anon";

revoke update on table "public"."menu_category" from "anon";

revoke delete on table "public"."menu_category" from "authenticated";

revoke insert on table "public"."menu_category" from "authenticated";

revoke references on table "public"."menu_category" from "authenticated";

revoke select on table "public"."menu_category" from "authenticated";

revoke trigger on table "public"."menu_category" from "authenticated";

revoke truncate on table "public"."menu_category" from "authenticated";

revoke update on table "public"."menu_category" from "authenticated";

revoke delete on table "public"."menu_category" from "service_role";

revoke insert on table "public"."menu_category" from "service_role";

revoke references on table "public"."menu_category" from "service_role";

revoke select on table "public"."menu_category" from "service_role";

revoke trigger on table "public"."menu_category" from "service_role";

revoke truncate on table "public"."menu_category" from "service_role";

revoke update on table "public"."menu_category" from "service_role";

revoke delete on table "public"."menu_item" from "anon";

revoke insert on table "public"."menu_item" from "anon";

revoke references on table "public"."menu_item" from "anon";

revoke select on table "public"."menu_item" from "anon";

revoke trigger on table "public"."menu_item" from "anon";

revoke truncate on table "public"."menu_item" from "anon";

revoke update on table "public"."menu_item" from "anon";

revoke delete on table "public"."menu_item" from "authenticated";

revoke insert on table "public"."menu_item" from "authenticated";

revoke references on table "public"."menu_item" from "authenticated";

revoke select on table "public"."menu_item" from "authenticated";

revoke trigger on table "public"."menu_item" from "authenticated";

revoke truncate on table "public"."menu_item" from "authenticated";

revoke update on table "public"."menu_item" from "authenticated";

revoke delete on table "public"."menu_item" from "service_role";

revoke insert on table "public"."menu_item" from "service_role";

revoke references on table "public"."menu_item" from "service_role";

revoke select on table "public"."menu_item" from "service_role";

revoke trigger on table "public"."menu_item" from "service_role";

revoke truncate on table "public"."menu_item" from "service_role";

revoke update on table "public"."menu_item" from "service_role";

alter table "public"."menu_category" drop constraint "public_menu_category_menu_id_fkey";

alter table "public"."menu_item" drop constraint "public_menu_item_category_id_fkey";

alter table "public"."menu_item" drop constraint "public_menu_item_menu_id_fkey";

alter table "public"."order" drop constraint "public_order_menu_item_id_fkey";

alter table "public"."menu_category" drop constraint "menu_category_pkey";

alter table "public"."menu_item" drop constraint "menu_item_pkey";

drop index if exists "public"."menu_category_pkey";

drop index if exists "public"."menu_item_pkey";

drop table "public"."menu_category";

drop table "public"."menu_item";

alter table "public"."menu" drop column "description";

alter table "public"."menu" add column "category" text not null;

alter table "public"."menu" add column "image" text;

alter table "public"."menu" add column "ingredients" text not null;

alter table "public"."menu" add column "price" real not null;

alter table "public"."menu" alter column "name" set not null;

alter table "public"."menu" alter column "restaurant_id" drop default;

alter table "public"."menu" alter column "restaurant_id" set not null;

alter table "public"."order" drop column "menu_item_id";

alter table "public"."order" add column "menu_id" uuid default gen_random_uuid();

drop extension if exists "pg_jsonschema";

alter table "public"."order" add constraint "public_order_menu_id_fkey" FOREIGN KEY (menu_id) REFERENCES menu(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."order" validate constraint "public_order_menu_id_fkey";

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
$function$
;



