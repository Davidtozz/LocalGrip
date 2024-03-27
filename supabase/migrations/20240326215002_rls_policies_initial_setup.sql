create extension if not exists "pg_jsonschema" with schema "extensions";


alter table "public"."menu_item" drop constraint "menu_item_status_check";

alter table "public"."menu_category" drop column "menu_item_id";

alter table "public"."menu_item" drop column "display_order";

alter table "public"."menu_item" drop column "status";

alter table "public"."order" drop column "status";

alter table "public"."promotions" alter column "name" set not null;

drop extension if exists "pg_jsonschema";

create policy """Owners can read their own restaurant data"""
on "public"."menu"
as permissive
for select
to authenticated
using ((auth.uid() = ( SELECT restaurant.owner_id
   FROM restaurant
  WHERE (restaurant.owner_id = auth.uid()))));

create policy "Owners can create a menu for their restaurant"
on "public"."menu"
as permissive
for insert
to authenticated
with check ((auth.uid() IN ( SELECT restaurant.owner_id
   FROM restaurant)));


create policy "Owners can create a menu category for their own menu"
on "public"."menu_category"
as permissive
for insert
to authenticated
with check ((auth.uid() = ( SELECT restaurant.owner_id
   FROM restaurant
  WHERE (restaurant.id = ( SELECT menu.restaurant_id
           FROM menu
          WHERE (menu.id = menu_category.menu_id))))));


create policy "Owners can read their own menu category data"
on "public"."menu_category"
as permissive
for select
to authenticated
using ((auth.uid() = ( SELECT restaurant.owner_id
   FROM restaurant
  WHERE (restaurant.id = ( SELECT menu.restaurant_id
           FROM menu
          WHERE (menu.id = menu_category.menu_id))))));


create policy "Owners can insert items into their restaurant menu"
on "public"."menu_item"
as permissive
for insert
to authenticated
with check ((auth.uid() = ( SELECT restaurant.owner_id
   FROM restaurant
  WHERE (restaurant.id = ( SELECT menu.restaurant_id
           FROM menu
          WHERE (menu.id = menu_item.menu_id))))));


create policy "Owners can see the menu items of their own menu"
on "public"."menu_item"
as permissive
for select
to authenticated
using ((auth.uid() = ( SELECT restaurant.owner_id
   FROM restaurant
  WHERE (restaurant.id = ( SELECT menu.restaurant_id
           FROM menu
          WHERE (menu.id = menu_item.menu_id))))));


create policy "Owners can create a restaurant"
on "public"."restaurant"
as permissive
for insert
to authenticated
with check (true);


create policy "Owners can delete their own restaurant data"
on "public"."restaurant"
as permissive
for delete
to authenticated
using ((auth.uid() = owner_id));


create policy "Owners can read their own restaurant data"
on "public"."restaurant"
as permissive
for select
to authenticated
using ((auth.uid() = owner_id));


create policy "Owners can update their own restaurant data"
on "public"."restaurant"
as permissive
for update
to authenticated
using ((auth.uid() = owner_id));