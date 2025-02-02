## Beyond Chats Assignment

#### Project Details

| Info             | Value                                           |
| ---------------- | ----------------------------------------------- |
| Project Name     | Beyond Chats Assignment                         |
| Hosting Provider | Vercel                                          |
| URL              | https://beyondchats-assignment-gamma.vercel.app |
| Author           | Rohit Kumar Das                                 |
| email            | contact@rohituno.com                            |

#### Tech Stack

| sl | feature    | name               | desc                                        |
| -- | ---------- | ------------------ | ------------------------------------------- |
| 1  | db         | psql               | free tier neon db                           |
| 2  | framework  | Next Js            | React Js  Framework by vercel              |
| 3  | language   | Typescript         |                                             |
| 4  | auth       | Google, Credential | provided by NextAuth,  supports  Oauth2.0 |
| 5  | auth token | JWT                |                                             |
| 6  | ORM        | Drizzle ORM        |                                             |

#### DB schema

```ts
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
```

#### Back End Methods

- [X] API routes
- [X] Server Actions

#### Tree Structure

```bash
├── components.json
├── drizzle.config.ts
├── eslint.config.mjs
├── next.config.ts
├── next-env.d.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── public
│ ├── file.svg
│ ├── globe.svg
│ ├── illustrations
│ │ ├── home.svg
│ │ ├── login.png
│ │ └── login.svg
│ ├── images
│ │ ├── google.svg
│ │ └── logo.png
│ ├── next.svg
│ ├── vercel.svg
│ └── window.svg
├── README.md
├── src
│ ├── app
│ │ ├── api
│ │ │ ├── auth
│ │ │ │ └── [...nextauth]
│ │ │ │ └── route.tsx
│ │ │ └── route.ts
│ │ ├── globals.css
│ │ ├── icon.png
│ │ ├── layout.tsx
│ │ ├── page.tsx
│ │ ├── signin
│ │ │ └── page.tsx
│ │ ├── signup
│ │ │ └── page.tsx
│ │ └── user
│ │ ├── bot
│ │ │ └── [id]
│ │ │ └── page.tsx
│ │ └── page.tsx
│ ├── auth.ts
│ ├── components
│ │ ├── chatbot
│ │ │ ├── how.tsx
│ │ │ ├── integration.tsx
│ │ │ ├── main.tsx
│ │ │ ├── styles.module.css
│ │ │ └── test.tsx
│ │ ├── devices
│ │ │ └── desktop.tsx
│ │ ├── input
│ │ │ └── OtpInput.tsx
│ │ ├── loader
│ │ │ └── spinner.tsx
│ │ ├── modal
│ │ │ └── modal.tsx
│ │ ├── nav
│ │ │ ├── navbar.tsx
│ │ │ └── signupButton.tsx
│ │ ├── sign
│ │ │ ├── signFormFilelds.tsx
│ │ │ ├── signInForm.tsx
│ │ │ └── signUpForm.tsx
│ │ ├── ui
│ │ │ ├── button
│ │ │ │ └── interactiveButton.tsx
│ │ │ ├── confetti.tsx
│ │ │ └── globe.tsx
│ │ └── user
│ │ ├── addChatbot.tsx
│ │ ├── chatBotList.tsx
│ │ ├── dataPagination.tsx
│ │ ├── dataTable.tsx
│ │ ├── defaultComponent.tsx
│ │ ├── profile.tsx
│ │ ├── user.module.css
│ │ └── uses.tsx
│ ├── lib
│ │ ├── actions
│ │ │ ├── auth.action.ts
│ │ │ ├── chatbot.action.ts
│ │ │ └── user.action.ts
│ │ ├── db
│ │ │ ├── connection.ts
│ │ │ ├── migrate.ts
│ │ │ ├── migrations
│ │ │ │ ├── 0000_happy_chameleon.sql
│ │ │ │ ├── 0001_huge_glorian.sql
│ │ │ │ ├── 0002_steady_george_stacy.sql
│ │ │ │ ├── 0003_gray_photon.sql
│ │ │ │ └── meta
│ │ │ │ ├── 0000_snapshot.json
│ │ │ │ ├── 0001_snapshot.json
│ │ │ │ ├── 0002_snapshot.json
│ │ │ │ ├── 0003_snapshot.json
│ │ │ │ └── \_journal.json
│ │ │ └── schema.ts
│ │ ├── gemini.ts
│ │ ├── helpers.ts
│ │ ├── settings
│ │ │ └── settings.ts
│ │ └── utils.ts
│ └── middleware.ts
├── tailwind.config.ts
└── tsconfig.json
```

#### Output Screenshots

Landing Page

![landing](./output/landing.png)

Sign In Page

![signin](./output/signin.png)

SignUp Page

![signup](./output/signup.png)

Chat Bot Page

![User Dashboard](./output/userdash.png)

Chatbot Page

![Chat bot](./output/chat.png)

![Chat bot](./output/chat2.png)
