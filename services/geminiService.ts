
import { GoogleGenAI, Type } from "@google/genai";

// Shared AI instance helper using the mandatory environment variable
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a romantic poem for Amantle based on provided traits.
 */
export const generatePoem = async (traits: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Write a romantic poem for Amantle based on these traits: ${traits}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          content: { type: Type.STRING },
        },
        required: ["title", "content"],
      },
    },
  });
  
  const text = response.text;
  if (!text) throw new Error("Poem generation failed.");
  return JSON.parse(text);
};

/**
 * Generates romantic date ideas for Amantle based on interests.
 */
export const generateDateIdeas = async (interests: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Suggest 3 romantic date ideas for Amantle based on these interests: ${interests}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            vibe: { type: Type.STRING },
          },
          required: ["title", "description", "vibe"],
        },
      },
    },
  });

  const text = response.text;
  if (!text) throw new Error("Date ideas generation failed.");
  return JSON.parse(text);
};

/**
 * Generates E-Card details (theme and song) based on a love message.
 */
export const generateECardDetails = async (message: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Create a romantic theme and select a matching song for this message to Amantle: "${message}"`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          cardThemeTitle: { type: Type.STRING },
          songTitle: { type: Type.STRING },
          songArtist: { type: Type.STRING },
        },
        required: ["cardThemeTitle", "songTitle", "songArtist"],
      },
    },
  });

  const text = response.text;
  if (!text) throw new Error("E-Card details generation failed.");
  return JSON.parse(text);
};

/**
 * Generates a romantic image for a love card using nano banana.
 */
export const generateLoveCardImage = async (prompt: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { text: `A highly aesthetic and romantic digital painting for a love card: ${prompt}` },
      ],
    },
    config: {
      imageConfig: {
        aspectRatio: "1:1",
      },
    },
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  throw new Error("Image generation failed.");
};
