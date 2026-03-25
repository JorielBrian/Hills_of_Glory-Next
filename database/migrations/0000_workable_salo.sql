CREATE TABLE "lifegroup_members" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"lifegroup_id" uuid NOT NULL,
	"joined_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lifegroups" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(225) NOT NULL,
	"network_leader_id" uuid,
	"life_guide_id" uuid,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_name" varchar(225) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"user_type" "user_type" DEFAULT 'Regular' NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"middle_name" varchar(255),
	"last_name" varchar(255) NOT NULL,
	"gender" "user_gender" NOT NULL,
	"birth_date" date,
	"contact_number" varchar(20),
	"address" varchar(500),
	"facebook" varchar(255),
	"occupation" "user_occupation" NOT NULL,
	"invited_by_id" uuid,
	"first_date_attended" date,
	"first_event" "church_event",
	"member_type" "member_type" DEFAULT 'First Timer' NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"last_activity_date" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_user_name_unique" UNIQUE("user_name"),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_contact_number_unique" UNIQUE("contact_number"),
	CONSTRAINT "users_facebook_unique" UNIQUE("facebook")
);
--> statement-breakpoint
ALTER TABLE "lifegroup_members" ADD CONSTRAINT "lifegroup_members_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lifegroup_members" ADD CONSTRAINT "lifegroup_members_lifegroup_id_lifegroups_id_fk" FOREIGN KEY ("lifegroup_id") REFERENCES "public"."lifegroups"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lifegroups" ADD CONSTRAINT "lifegroups_network_leader_id_users_id_fk" FOREIGN KEY ("network_leader_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lifegroups" ADD CONSTRAINT "lifegroups_life_guide_id_users_id_fk" FOREIGN KEY ("life_guide_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_invited_by_id_users_id_fk" FOREIGN KEY ("invited_by_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "email_idx" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "username_idx" ON "users" USING btree ("user_name");