import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql/web";
import * as schema from "@/schemas/index.ts";

export const db = drizzle({
  connection: {
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
  schema,
});
