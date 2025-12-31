import { config as loadEnv } from "dotenv";
import { defineConfig } from "@prisma/config";

// Load environment variables
loadEnv();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
