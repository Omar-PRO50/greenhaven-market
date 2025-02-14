ALTER TABLE "public"."profiles" ALTER COLUMN "created_at" DROP DEFAULT;

alter table "public"."profiles" alter column "created_at" set not null;

alter table "public"."profiles" alter column "created_at" set data type timestamp with time zone using "created_at"::timestamp with time zone;

ALTER TABLE "public"."profiles"  ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;
