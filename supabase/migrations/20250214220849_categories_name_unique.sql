CREATE UNIQUE INDEX categories_name_key ON public.categories USING btree (name);

alter table "public"."categories" add constraint "categories_name_key" UNIQUE using index "categories_name_key";


