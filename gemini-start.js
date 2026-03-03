import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config({ path: ".env.local" });

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// Use the latest free Gemini model
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export { genAI, model };