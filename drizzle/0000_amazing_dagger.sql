CREATE TABLE "projects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"short_description" text NOT NULL,
	"full_description" text NOT NULL,
	"techs" text[] DEFAULT '{}' NOT NULL,
	"github_url" text,
	"live_url" text,
	"cover_image" text,
	"images" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"status" text DEFAULT 'draft' NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "projects_slug_unique" UNIQUE("slug"),
	CONSTRAINT "projects_status_check" CHECK ("projects"."status" in ('draft', 'published'))
);
--> statement-breakpoint
CREATE INDEX "projects_status_idx" ON "projects" USING btree ("status");--> statement-breakpoint
CREATE INDEX "projects_featured_idx" ON "projects" USING btree ("featured");--> statement-breakpoint
CREATE INDEX "projects_sort_order_idx" ON "projects" USING btree ("sort_order");