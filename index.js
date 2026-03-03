import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files (e.g., HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "ROSETTACODE-main"), { index: false }));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "ROSETTACODE-main", "landing.html"));
});

// Define a route for the landing page
app.get("/index", (req, res) => {
    res.sendFile(path.join(__dirname, "ROSETTACODE-main", "index.html"));
});

// Initialize Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// Helper: sleep for ms
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Define an API endpoint for code conversion
app.post("/api", async (req, res) => {
    const { input, fromLang, toLang } = req.body;

    const maxRetries = 3;
    let attempt = 0;

    while (attempt < maxRetries) {
        try {
            attempt++;
            console.log(`API Key available: ${!!process.env.GOOGLE_API_KEY}`);

            // Create a prompt for code conversion
            const prompt = `Convert the following ${fromLang} code to ${toLang}. Only return the converted code without any explanation or markdown formatting.\n\n${input}`;

            // Use the gemini-2.0-flash model
            const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

            console.log(`Converting from ${fromLang} to ${toLang} (attempt ${attempt}/${maxRetries})`);

            // Generate content using the Gemini API
            const result = await model.generateContent(prompt);
            const response = result.response;
            const convertedCode = response.text();

            return res.json({ convertedCode: convertedCode.trim() });

        } catch (error) {
            console.error(`Error in /api route (attempt ${attempt}):`, error.message);

            // If rate limited and we have retries left, wait and retry
            if (error.message.includes("429") && attempt < maxRetries) {
                const waitTime = attempt * 10; // 10s, 20s
                console.log(`Rate limited. Waiting ${waitTime}s before retry...`);
                await sleep(waitTime * 1000);
                continue;
            }

            // Build a user-friendly error message
            let userMessage = "Failed to convert code.";
            if (error.message.includes("429")) {
                userMessage = "Rate limit exceeded. The free API quota is temporarily exhausted. Please wait a minute and try again.";
            } else if (error.message.includes("API_KEY_INVALID")) {
                userMessage = "Invalid API key. Please check your API key in .env.local.";
            }

            return res.status(500).json({
                error: userMessage,
                details: error.message
            });
        }
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Using API Key (masked): ${process.env.GOOGLE_API_KEY ? "****" + process.env.GOOGLE_API_KEY.substring(process.env.GOOGLE_API_KEY.length - 4) : "Not found"}`);
});
