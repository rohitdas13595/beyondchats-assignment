CREATE TABLE "chatbot" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255),
	"prompt" varchar(255),
	"webpages" json,
	"website" varchar(255),
	"avatar" varchar(500),
	"is_active" boolean DEFAULT true,
	"is_scrapped" boolean DEFAULT false,
	"token" varchar(255),
	"data" json,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "messages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"chatbot_id" uuid NOT NULL,
	"sender_type" varchar(255),
	"content" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
