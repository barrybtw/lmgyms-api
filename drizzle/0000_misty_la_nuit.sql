CREATE TABLE IF NOT EXISTS "calendar" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" varchar(255),
	"creation_date" timestamp DEFAULT now(),
	"author_id" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "calendar_participant" (
	"calendar_id" serial NOT NULL,
	"user_id" serial NOT NULL,
	CONSTRAINT calendar_participant_user_id_calendar_id PRIMARY KEY("user_id","calendar_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" serial NOT NULL,
	"token" varchar(255) NOT NULL,
	"expiration_date" timestamp NOT NULL,
	"csrf_token" varchar(255) NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(255),
	"password_hash" varchar(255) NOT NULL,
	"password_salt" varchar(255) NOT NULL,
	"name" varchar(255),
	CONSTRAINT "user_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "name_idx" ON "calendar" ("name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "token_idx" ON "session" ("token");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "username_idx" ON "user" ("username");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "id_idx" ON "user" ("id");