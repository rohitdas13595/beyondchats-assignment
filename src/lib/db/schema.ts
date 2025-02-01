import {
  pgSchema,
  uuid,
  varchar,
  text,
  timestamp,
  pgTable,
  PgEnumColumn,
  boolean,
  json,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const User = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
  company: varchar("company", { length: 255 }),
  password: varchar("password", { length: 255 }),
  isVerified: boolean("is_verified").default(false),
  signUpType: varchar("sign_up_type", {
    length: 255,
    enum: ["password", "google"],
  }),
  logo: varchar("logo", { length: 500 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdateFn(() => sql`update users set updated_at = CURRENT_TIMESTAMP`),
});

export const Chatbot = pgTable("chatbot", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  userId: uuid("user_id")
    .notNull()
    .references(() => User.id),
  name: varchar("name", { length: 255 }),
  prompt: varchar("prompt", { length: 255 }),
  webpages: json("webpages"),
  website: varchar("website", { length: 255 }),
  avatar: varchar("avatar", { length: 500 }),
  isActive: boolean("is_active").default(true),
  isScrapped: boolean("is_scrapped").default(false),
  token: varchar("token", { length: 255 }),
  data: json("data"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdateFn(() => sql`update chatbot set updated_at = CURRENT_TIMESTAMP`),
});

export const Messages = pgTable("messages", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  chatbotId: uuid("chatbot_id").notNull(),
  senderType: varchar("sender_type", {
    length: 255,
    enum: ["user", "bot", "admin"],
  }),
  rayId: varchar("ray_id", { length: 255 }),
  content: varchar("content", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdateFn(() => sql`update messages set updated_at = CURRENT_TIMESTAMP`),
});
