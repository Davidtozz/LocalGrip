create extension if not exists pg_jsonschema;

create table "public"."menu" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "name" text,
    "description" text,
    "restaurant_id" uuid default gen_random_uuid()
);


alter table "public"."menu" enable row level security;

create table "public"."menu_category" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "menu_id" uuid,
    "menu_item_id" uuid
);


alter table "public"."menu_category" enable row level security;

create table "public"."menu_item" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "status" text not null,
    "menu_id" uuid not null,
    "category_id" uuid not null,
    "description" text,
    "image_url" text,
    "display_order" integer,
    "name" text,
    "price" numeric
);


alter table "public"."menu_item" enable row level security;

create table "public"."order" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "issued_by" uuid default gen_random_uuid(),
    "menu_item_id" uuid default gen_random_uuid(),
    "restaurant_id" uuid default gen_random_uuid(),
    "total_price" real,
    "quantity" integer,
    "status" text
);


alter table "public"."order" enable row level security;

create table "public"."promotions" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "name" text,
    "details" text,
    "discount_percentage" smallint not null,
    "start_date" date not null,
    "expire_date" date,
    "is_recurring" boolean not null default false,
    "code" text,
    "restaurant_id" uuid default gen_random_uuid()
);


alter table "public"."promotions" enable row level security;

create table "public"."restaurant" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "name" text not null,
    "address" text not null,
    "owner_id" uuid not null default gen_random_uuid(),
    "cuisinez_type" text not null,
    "phone" text not null,
    "website_url" text,
    "opening_hours" jsonb
);


alter table "public"."restaurant" enable row level security;

CREATE UNIQUE INDEX menu_category_pkey ON public.menu_category USING btree (id);

CREATE UNIQUE INDEX menu_item_pkey ON public.menu_item USING btree (id);

CREATE UNIQUE INDEX menu_pkey ON public.menu USING btree (id);

CREATE UNIQUE INDEX order_pkey ON public."order" USING btree (id);

CREATE UNIQUE INDEX promotions_code_key ON public.promotions USING btree (code);

CREATE UNIQUE INDEX promotions_pkey ON public.promotions USING btree (id);

CREATE UNIQUE INDEX restaurant_name_key ON public.restaurant USING btree (name);

CREATE UNIQUE INDEX restaurant_phone_key ON public.restaurant USING btree (phone);

CREATE UNIQUE INDEX restaurant_pkey ON public.restaurant USING btree (id);

alter table "public"."menu" add constraint "menu_pkey" PRIMARY KEY using index "menu_pkey";

alter table "public"."menu_category" add constraint "menu_category_pkey" PRIMARY KEY using index "menu_category_pkey";

alter table "public"."menu_item" add constraint "menu_item_pkey" PRIMARY KEY using index "menu_item_pkey";    

alter table "public"."order" add constraint "order_pkey" PRIMARY KEY using index "order_pkey";

alter table "public"."promotions" add constraint "promotions_pkey" PRIMARY KEY using index "promotions_pkey"; 

alter table "public"."restaurant" add constraint "restaurant_pkey" PRIMARY KEY using index "restaurant_pkey"; 

alter table "public"."menu" add constraint "public_menu_restaurant_id_fkey" FOREIGN KEY (restaurant_id) REFERENCES restaurant(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."menu" validate constraint "public_menu_restaurant_id_fkey";

alter table "public"."menu_category" add constraint "public_menu_category_menu_id_fkey" FOREIGN KEY (menu_id) REFERENCES menu(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."menu_category" validate constraint "public_menu_category_menu_id_fkey";

alter table "public"."menu_item" add constraint "menu_item_status_check" CHECK (((status = 'available'::text) OR (status = 'unavailable'::text) OR (status = 'limited'::text))) not valid;

alter table "public"."menu_item" validate constraint "menu_item_status_check";

alter table "public"."menu_item" add constraint "public_menu_item_category_id_fkey" FOREIGN KEY (category_id) REFERENCES menu_category(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."menu_item" validate constraint "public_menu_item_category_id_fkey";

alter table "public"."menu_item" add constraint "public_menu_item_menu_id_fkey" FOREIGN KEY (menu_id) REFERENCES menu(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."menu_item" validate constraint "public_menu_item_menu_id_fkey";

alter table "public"."order" add constraint "public_order_issued_by_fkey" FOREIGN KEY (issued_by) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."order" validate constraint "public_order_issued_by_fkey";

alter table "public"."order" add constraint "public_order_menu_item_id_fkey" FOREIGN KEY (menu_item_id) REFERENCES menu_item(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."order" validate constraint "public_order_menu_item_id_fkey";

alter table "public"."order" add constraint "public_order_restaurant_id_fkey" FOREIGN KEY (restaurant_id) REFERENCES restaurant(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."order" validate constraint "public_order_restaurant_id_fkey";

alter table "public"."promotions" add constraint "promotions_code_key" UNIQUE using index "promotions_code_key";

alter table "public"."promotions" add constraint "public_promotions_restaurant_id_fkey" FOREIGN KEY (restaurant_id) REFERENCES restaurant(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."promotions" validate constraint "public_promotions_restaurant_id_fkey";

alter table "public"."restaurant" add constraint "opening_hours_is_valid" CHECK (jsonb_matches_schema('{     "type": "object",     "properties": {       "days": {         "type": "array",         "minItems": 1,         "maxItems": 7,         "items": {           "type": "object",           "properties": {             "day_of_week": {               "type": "string",               "enum": [                 "Monday",                 "Tuesday",                 "Wednesday",                 "Thursday",                 "Friday",                 "Saturday",                 "Sunday"               ]             },             "opening_hours": {               "type": "string",               "pattern": "^([0-1][0-9]|2[0-3]):([0-5][0-9])$"             },             "closing_hours": {               "type": "string",               "pattern": "^([0-1][0-9]|2[0-3]):([0-5][0-9])$"             }           },           "required": [             "day_of_week",             "opening_hours",             "closing_hours"           ]         }       }     },     "required": ["days"] }'::json, opening_hours)) not valid;

alter table "public"."restaurant" validate constraint "opening_hours_is_valid";

alter table "public"."restaurant" add constraint "public_restaurant_owner_id_fkey" FOREIGN KEY (owner_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."restaurant" validate constraint "public_restaurant_owner_id_fkey";

alter table "public"."restaurant" add constraint "restaurant_name_key" UNIQUE using index "restaurant_name_key";

alter table "public"."restaurant" add constraint "restaurant_phone_key" UNIQUE using index "restaurant_phone_key";

grant delete on table "public"."menu" to "anon";

grant insert on table "public"."menu" to "anon";

grant references on table "public"."menu" to "anon";

grant select on table "public"."menu" to "anon";

grant trigger on table "public"."menu" to "anon";

grant truncate on table "public"."menu" to "anon";

grant update on table "public"."menu" to "anon";

grant delete on table "public"."menu" to "authenticated";

grant insert on table "public"."menu" to "authenticated";

grant references on table "public"."menu" to "authenticated";

grant select on table "public"."menu" to "authenticated";

grant trigger on table "public"."menu" to "authenticated";

grant truncate on table "public"."menu" to "authenticated";

grant update on table "public"."menu" to "authenticated";

grant delete on table "public"."menu" to "service_role";

grant insert on table "public"."menu" to "service_role";

grant references on table "public"."menu" to "service_role";

grant select on table "public"."menu" to "service_role";

grant trigger on table "public"."menu" to "service_role";

grant truncate on table "public"."menu" to "service_role";

grant update on table "public"."menu" to "service_role";

grant delete on table "public"."menu_category" to "anon";

grant insert on table "public"."menu_category" to "anon";

grant references on table "public"."menu_category" to "anon";

grant select on table "public"."menu_category" to "anon";

grant trigger on table "public"."menu_category" to "anon";

grant truncate on table "public"."menu_category" to "anon";

grant update on table "public"."menu_category" to "anon";

grant delete on table "public"."menu_category" to "authenticated";

grant insert on table "public"."menu_category" to "authenticated";

grant references on table "public"."menu_category" to "authenticated";

grant select on table "public"."menu_category" to "authenticated";

grant trigger on table "public"."menu_category" to "authenticated";

grant truncate on table "public"."menu_category" to "authenticated";

grant update on table "public"."menu_category" to "authenticated";

grant delete on table "public"."menu_category" to "service_role";

grant insert on table "public"."menu_category" to "service_role";

grant references on table "public"."menu_category" to "service_role";

grant select on table "public"."menu_category" to "service_role";

grant trigger on table "public"."menu_category" to "service_role";

grant truncate on table "public"."menu_category" to "service_role";

grant update on table "public"."menu_category" to "service_role";

grant delete on table "public"."menu_item" to "anon";

grant insert on table "public"."menu_item" to "anon";

grant references on table "public"."menu_item" to "anon";

grant select on table "public"."menu_item" to "anon";

grant trigger on table "public"."menu_item" to "anon";

grant truncate on table "public"."menu_item" to "anon";

grant update on table "public"."menu_item" to "anon";

grant delete on table "public"."menu_item" to "authenticated";

grant insert on table "public"."menu_item" to "authenticated";

grant references on table "public"."menu_item" to "authenticated";

grant select on table "public"."menu_item" to "authenticated";

grant trigger on table "public"."menu_item" to "authenticated";

grant truncate on table "public"."menu_item" to "authenticated";

grant update on table "public"."menu_item" to "authenticated";

grant delete on table "public"."menu_item" to "service_role";

grant insert on table "public"."menu_item" to "service_role";

grant references on table "public"."menu_item" to "service_role";

grant select on table "public"."menu_item" to "service_role";

grant trigger on table "public"."menu_item" to "service_role";

grant truncate on table "public"."menu_item" to "service_role";

grant update on table "public"."menu_item" to "service_role";

grant delete on table "public"."order" to "anon";

grant insert on table "public"."order" to "anon";

grant references on table "public"."order" to "anon";

grant select on table "public"."order" to "anon";

grant trigger on table "public"."order" to "anon";

grant truncate on table "public"."order" to "anon";

grant update on table "public"."order" to "anon";

grant delete on table "public"."order" to "authenticated";

grant insert on table "public"."order" to "authenticated";

grant references on table "public"."order" to "authenticated";

grant select on table "public"."order" to "authenticated";

grant trigger on table "public"."order" to "authenticated";

grant truncate on table "public"."order" to "authenticated";

grant update on table "public"."order" to "authenticated";

grant delete on table "public"."order" to "service_role";

grant insert on table "public"."order" to "service_role";

grant references on table "public"."order" to "service_role";

grant select on table "public"."order" to "service_role";

grant trigger on table "public"."order" to "service_role";

grant truncate on table "public"."order" to "service_role";

grant update on table "public"."order" to "service_role";

grant delete on table "public"."promotions" to "anon";

grant insert on table "public"."promotions" to "anon";

grant references on table "public"."promotions" to "anon";

grant select on table "public"."promotions" to "anon";

grant trigger on table "public"."promotions" to "anon";

grant truncate on table "public"."promotions" to "anon";

grant update on table "public"."promotions" to "anon";

grant delete on table "public"."promotions" to "authenticated";

grant insert on table "public"."promotions" to "authenticated";

grant references on table "public"."promotions" to "authenticated";

grant select on table "public"."promotions" to "authenticated";

grant trigger on table "public"."promotions" to "authenticated";

grant truncate on table "public"."promotions" to "authenticated";

grant update on table "public"."promotions" to "authenticated";

grant delete on table "public"."promotions" to "service_role";

grant insert on table "public"."promotions" to "service_role";

grant references on table "public"."promotions" to "service_role";

grant select on table "public"."promotions" to "service_role";

grant trigger on table "public"."promotions" to "service_role";

grant truncate on table "public"."promotions" to "service_role";

grant update on table "public"."promotions" to "service_role";

grant delete on table "public"."restaurant" to "anon";

grant insert on table "public"."restaurant" to "anon";

grant references on table "public"."restaurant" to "anon";

grant select on table "public"."restaurant" to "anon";

grant trigger on table "public"."restaurant" to "anon";

grant truncate on table "public"."restaurant" to "anon";

grant update on table "public"."restaurant" to "anon";

grant delete on table "public"."restaurant" to "authenticated";

grant insert on table "public"."restaurant" to "authenticated";

grant references on table "public"."restaurant" to "authenticated";

grant select on table "public"."restaurant" to "authenticated";

grant trigger on table "public"."restaurant" to "authenticated";

grant truncate on table "public"."restaurant" to "authenticated";

grant update on table "public"."restaurant" to "authenticated";

grant delete on table "public"."restaurant" to "service_role";

grant insert on table "public"."restaurant" to "service_role";

grant references on table "public"."restaurant" to "service_role";

grant select on table "public"."restaurant" to "service_role";

grant trigger on table "public"."restaurant" to "service_role";

grant truncate on table "public"."restaurant" to "service_role";

grant update on table "public"."restaurant" to "service_role"