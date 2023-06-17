import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  db_uri: process.env.DATABASE_URI,
  env: process.env.NODE_ENV || "development",
};
