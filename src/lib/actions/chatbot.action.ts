"use server";
import * as crypto from "crypto";

import { and, desc, ilike, count, or, eq } from "drizzle-orm";
import { db } from "../db/connection";
import { Chatbot } from "../db/schema";
import { GeminiAgentService } from "../gemini";

export const listChatbots = async ({
  limit = 10,
  offset = 0,
  query = "",
  userId,
}: {
  limit: number;
  offset: number;
  userId: string;
  query?: string;
}) => {
  console.log("query.........", query);
  const doctorList = await db.query.Chatbot.findMany({
    limit,
    offset,
    where: (Chatbot, { eq, or, and }) => {
      return and(
        eq(Chatbot.userId, userId),
        !!query ? or(ilike(Chatbot.name, `%${query}%`)) : undefined
      );
    },
    orderBy: [desc(Chatbot.createdAt)],
  });

  const Numbers = await db
    .select({ count: count(Chatbot.id) })
    .from(Chatbot)
    .where(and(!!query ? or(ilike(Chatbot.name, `%${query}%`)) : undefined));

  if (
    doctorList &&
    Numbers &&
    Numbers.length > 0 &&
    Numbers[0] &&
    Numbers[0].count
  ) {
    return {
      data: doctorList,
      total: Numbers[0].count,
    };
  }
  return null;
};

export const getAllChatbots = async () => {
  const doctorList = await db.query.Chatbot.findMany();
  if (doctorList) {
    return doctorList;
  }
  return null;
};

export const getChatbot = async (chatbotId: string) => {
  const chatbot = await db
    .select()
    .from(Chatbot)
    .where(eq(Chatbot.id, chatbotId));
  if (chatbot && chatbot[0]) {
    return chatbot[0];
  }
  return null;
};

export const createChatbot = async ({
  name,
  prompt,
  userId,
  website,
}: {
  name: string;
  prompt?: string;
  userId: string;
  website: string;
}) => {
  const token = crypto.randomBytes(16).toString("hex");

  const agent = await new GeminiAgentService();

  const pages = await agent.scrapeWebsite({ websiteUrl: website });

  const chatbot = await db
    .insert(Chatbot)
    .values({
      isActive: true,
      name,
      prompt:
        prompt ||
        "You are a helpful assistant. Getting Data about  about the user",
      userId,
      token,
      website,
      webpages: pages,
      data: {
        website: website,
        scappedOn: new Date().toISOString(),
      },
      isScrapped: !!pages ? true : false,
    })
    .returning();
  if (chatbot && chatbot[0]) {
    return chatbot[0];
  }
};

export const fetchTitle = async (url: string) => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const text = await response.text();
      if (text) {
        return text;
      }
    }
  } catch (e) {
    console.error(e);
  }
};

/**
 * userId: uuid("user_id")
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
 */
