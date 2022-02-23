import dotenv from "dotenv";
import fs from "fs";

if (fs.existsSync(".env")) {
  console.log("Using .env file to supply config environment variables");
  dotenv.config({ path: ".env" });
} else {
  console.log("Using .env.example file to supply config environment variables");
  dotenv.config({ path: ".env.example" }); // you can delete this after you create your own .env file!
}

export const MONGODB_URI_LOCAL = process.env["MONGODB_URI_LOCAL"];

if (!MONGODB_URI_LOCAL) {
  console.log(
    "No mongo connection string. Set MONGODB_URI_LOCAL environment variable."
  );
  process.exit(1);
}

export const JWT_SECRET = process.env["JWT_SECRET"];

if (!JWT_SECRET) {
  console.log("No JWT secret string. Set JWT_SECRET environment variable.");
  process.exit(1);
}
