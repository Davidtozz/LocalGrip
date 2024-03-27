create extension if not exists "pg_jsonschema" with schema "extensions";

alter table "public"."menu_category" add column "name" text;