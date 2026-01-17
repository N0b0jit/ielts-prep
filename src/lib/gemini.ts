
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function checkApiKey(apiKey: string): Promise<{ valid: boolean, error?: string }> {
    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        // Try the primary model we use
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        await model.generateContent("Test");
        return { valid: true };
    } catch (error: any) {
        console.error("API Key check failed:", error);

        let errorMessage = "Validation failed.";
        if (error.message) {
            if (error.message.includes("API key not valid")) errorMessage = "Invalid API Key provided.";
            else if (error.message.includes("quota")) errorMessage = "API Key quota exceeded.";
            else if (error.message.includes("fetch failed")) errorMessage = "Network error. Check your connection.";
            else errorMessage = error.message; // Fallback to actual error
        }

        return { valid: false, error: errorMessage };
    }
}

export async function analyzeEssayAI(apiKey: string, essay: string, prompt: string) {
    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const instructions = `
      Act as an expert IELTS examiner. Analyze the following essay based on the prompt: "${prompt}".
      Return a pure JSON object (no markdown, no backticks) with the following structure:
      {
        "scores": {
          "overall": number (0-9, 0.5 increments),
          "taskResponse": number,
          "coherence": number,
          "lexical": number,
          "grammar": number
        },
        "feedback": {
          "lexical": "specific feedback string",
          "grammar": "specific feedback string",
          "taskResponse": "specific feedback string",
          "coherence": "specific feedback string"
        },
        "comparisons": [
          { "original": "extract a weak sentence from the essay", "improved": "Band 9 rewritten version of that sentence" },
          { "original": "another weak sentence", "improved": "Band 9 rewritten version" }
        ]
      }
      
      Essay:
      ${essay}
    `;

        const result = await model.generateContent(instructions);
        const text = result.response.text();
        // Clean up if markdown code blocks are returned
        const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();
        return JSON.parse(cleanText);
    } catch (error) {
        console.error("Gemini Analysis Failed:", error);
        throw new Error("Failed to analyze essay. Please check your API key or try again.");
    }
}

export async function generateBrainstormingAI(apiKey: string, prompt: string) {
    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const instructions = `
      Act as an IELTS tutor. Brainstorm ideas for following essay prompt: "${prompt}".
      Return a pure JSON object (no markdown) with:
      {
        "agree": ["point 1", "point 2", "point 3"],
        "disagree": ["point 1", "point 2", "point 3"],
        "structure": "Recommended concise essay structure (e.g. Intro > Body 1 > Body 2 > Conclusion)"
      }
    `;

        const result = await model.generateContent(instructions);
        const text = result.response.text();
        const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();
        return JSON.parse(cleanText);
    } catch (error) {
        console.error("Gemini Brainstorm Failed:", error);
        throw new Error("Failed to generate ideas.");
    }
}

export async function transformTextStyleAI(apiKey: string, text: string, type: 'academic' | 'concise') {
    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const instruction = type === 'academic'
            ? "Rewrite the following text to likely achieve IELTS Band 9. Use sophisticated vocabulary and complex grammar structures, but keep it natural."
            : "Rewrite the following text to be more concise and direct, while maintaining an academic tone.";

        const result = await model.generateContent(`${instruction}\n\nText: "${text}"`);
        return result.response.text().trim();
    } catch (error) {
        console.error("Gemini Transform Failed:", error);
        throw new Error("Failed to transform text.");
    }
}

export async function fixGrammarAI(apiKey: string, text: string) {
    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(`
      Correct all grammar, punctuation, and spelling errors in the following text. 
      Return ONLY the corrected text, no explanations.
      
      Text: "${text}"
    `);
        return result.response.text().trim();
    } catch (error) {
        console.error("Gemini Grammar Fix Failed:", error);
        throw new Error("Failed to fix grammar.");
    }
}

export async function chatWithAI(apiKey: string, history: { role: string, content: string }[], message: string) {
    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const chat = model.startChat({
            history: history.map(h => ({
                role: h.role === 'bot' ? 'model' : 'user',
                parts: [{ text: h.content }],
            }))
        });

        const result = await chat.sendMessage(message);
        return result.response.text();
    } catch (error) {
        console.error("Gemini Chat Failed:", error);
        throw new Error("Failed to chat.");
    }
}
