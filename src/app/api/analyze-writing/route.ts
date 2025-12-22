import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
    try {
        const { prompt, essay, type } = await req.json();

        if (!essay) {
            return NextResponse.json({ error: "Essay content is required" }, { status: 400 });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const systemPrompt = `
      You are an expert IELTS examiner. Analyze the following IELTS Writing ${type} essay based on the 4 official criteria:
      1. Task Response / Achievement
      2. Coherence and Cohesion
      3. Lexical Resource
      4. Grammatical Range and Accuracy

      Provide a band score (0-9) for each criterion and an overall band score.
      Then, provide specific constructive feedback for each criterion.
      Finally, if requested, provide a 'Band 9' improved version of the essay.

      Format your response as a JSON object:
      {
        "scores": {
          "taskResponse": number,
          "coherence": number,
          "lexical": number,
          "grammar": number,
          "overall": number
        },
        "feedback": {
          "taskResponse": "string",
          "coherence": "string",
          "lexical": "string",
          "grammar": "string"
        },
        "improvedEssay": "string"
      }
    `;

        const userPrompt = `
      Prompt: ${prompt}
      Essay Content: ${essay}
    `;

        const result = await model.generateContent([systemPrompt, userPrompt]);
        const response = await result.response;
        const text = response.text();

        // Extract JSON from the response (sometimes Gemini wraps it in code blocks)
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        const resultJson = jsonMatch ? JSON.parse(jsonMatch[0]) : null;

        if (!resultJson) {
            throw new Error("Failed to parse AI response");
        }

        return NextResponse.json(resultJson);
    } catch (error: any) {
        console.error("AI Analysis Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
