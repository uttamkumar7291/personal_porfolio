
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getCareerInsight = async (topic: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a professional career coach. Provide a single, inspiring, and practical career tip specifically about ${topic} for a Computer Science Engineer named Uttam Kumar. Keep it under 20 words.`,
      config: {
        temperature: 0.8,
      }
    });
    return response.text?.trim() || "Stay curious and never stop learning new technologies.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Focus on building a strong foundation in data structures and algorithms.";
  }
};
