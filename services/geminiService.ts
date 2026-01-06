
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are an expert on Ontario Automobile Insurance, specifically the Statutory Accident Benefits Schedule (SABS).
Your goal is to explain complex insurance terms to Ontario drivers in simple, accessible language.
Focus on the upcoming reforms that aim to give consumers more choice between mandatory and optional coverages.
Always clarify that while "optional" coverages cost more premium, they provide much higher protection levels.
Encourage users to speak with a licensed insurance broker for personalized advice.
Be professional, empathetic, and clear.
Keep responses concise (under 200 words if possible).
`;

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async askQuestion(question: string, history: { role: 'user' | 'model'; parts: { text: string }[] }[]) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          ...history,
          { role: 'user', parts: [{ text: question }] }
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        }
      });

      return response.text || "I'm sorry, I couldn't process that request. Please try again.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "There was an error connecting to the AI advisor. Please ensure your environment is configured correctly.";
    }
  }
}

export const gemini = new GeminiService();
