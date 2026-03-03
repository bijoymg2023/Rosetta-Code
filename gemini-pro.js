import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Load from .env.local explicitly
dotenv.config({ path: '.env.local' });

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

async function convertCode(input, fromLang, toLang) {
    try {
        console.log("API Key available:", !!process.env.GOOGLE_API_KEY);

        // Use gemini-2.0-flash model (latest free model)
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const prompt = `Convert the following ${fromLang} code to ${toLang}. 
        Return ONLY the converted code without any explanations or markdown formatting:

        ${input}`;

        console.log("Converting code...");

        // Generate content using the Gemini API
        const result = await model.generateContent(prompt);
        const response = result.response;
        const convertedCode = response.text();

        return convertedCode.trim();

    } catch (error) {
        console.error("Error during code conversion:", error.message);
        return `// Conversion failed due to an error: ${error.message}`;
    }
}

export default convertCode;