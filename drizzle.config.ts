// import "dotenv/config";
import type { Config } from "drizzle-kit";
import { settings } from "@/lib/settings/settings";

export default {
  schema: "./src/lib/db/schema.ts",
  out: "./src/lib/db/migrations",
  dialect: "postgresql",

  // url:`postgresql://postgres:mysecretpassword@localhost:5432/house_listings`,
  dbCredentials: {
    host: settings.postgresHost,
    port: settings.postgresPort as number,
    user: settings.postgresUser,
    password: settings.postgresPassword,
    database: settings.postgresDatabase,
  },
} satisfies Config;

//hello
