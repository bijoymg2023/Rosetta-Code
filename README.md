# Rosetta Code
*Seamlessly translate code between programming languages.*

## 🚀 Problem It Solves
Manually translating code from one programming language to another can be time-consuming, tedious, and prone to syntax errors. Rosetta Code leverages the power of AI to automate code conversion, instantly translating logic, structure, and syntax from your source language into the desired language. This accelerates the process of migrating projects or learning a new language through familiar concepts.

## 🎯 Who It's For
- **Developers & Engineers:** Need to port existing logic or features to a different tech stack quickly.
- **Students & Learners:** Want to see how a known algorithm in one language (like Python) looks in another (like Java).
- **Organizations:** Looking to modernize legacy codebases or integrate modules written in different languages.

## ✨ Features
- **AI-Powered Translation:** Uses the advanced Google Gemini AI (`gemini-2.0-flash` model) to deeply understand and accurately translate code.
- **Clean & Intuitive Interface:** A minimalist layout that easily allows pasting the input code, selecting languages, and copying the result.
- **Syntax Awareness:** Designed out-of-the-box to handle multiple languages.
- **Smart API Handling:** Built-in retry logic and rate-limit handling for smooth usage even under free API quotas.
- **Customizable UI:** Supports seamless switching between Dark and Light mode depending on user preference.

## 🛠 Tech Stack
- **Frontend:** HTML, TailwindCSS, Vanilla JavaScript (FontAwesome for icons).
- **Backend:** Node.js, Express.js.
- **AI Integration:** Google Generative AI (`@google/generative-ai`).

## 📦 Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/rosettacode.git
   cd rosettacode
   ```

2. **Install the dependencies:**
   ```bash
   npm install
   ```

3. **Set up the environment variables:**
   Create a `.env.local` file in the root directory and add your Google API Key:
   ```env
   GOOGLE_API_KEY=your_google_gemini_api_key
   PORT=3000
   ```

## 💻 Usage

1. **Start the application:**
   ```bash
   npm start
   ```

2. **Access the Web UI:**
   Open your browser and navigate to `http://localhost:3000`.

3. **Convert Code:**
   - Paste the code you want to translate into the left input prompt.
   - Select the **Source Language** (e.g., Python) and the **Target Language** (e.g., Java) from the dropdown menus.
   - Click **Convert**. The AI will process the conversion and the result will seamlessly appear on the right panel.

## 🔮 Future Improvements
- **Extensive Syntax Highlighting:** Integrate syntax highlighting libraries (like Prism.js or Highlight.js) for input and output code blocks.
- **File Upload Support:** Allow users to upload scripts or `.zip` repositories for bulk translation operations.
- **History & Snippet Manager:** Let users save or download conversions for future reference.  
- **Broader Language Context:** Provide the AI with whole-project context to translate dependent modules accurately.
