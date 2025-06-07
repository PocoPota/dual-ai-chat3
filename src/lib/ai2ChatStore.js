import { GoogleGenAI } from '@google/genai';

let chat = null;

export function getChatInstance(apiKey, sysP2, isFirstChat2){
  const ai = new GoogleGenAI({ apiKey: apiKey });
  if (isFirstChat2) {
    chat = ai.chats.create({
      model: 'gemini-2.0-flash',
      config: {
        systemInstruction: sysP2,
      },
      history: [],
    });
  }
  return chat;
}