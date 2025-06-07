import { GoogleGenAI } from '@google/genai';

let chat = null;

export function getChatInstance(apiKey, sysP1, isFirstChat1){
  const ai = new GoogleGenAI({ apiKey: apiKey });
  if (isFirstChat1) {
    chat = ai.chats.create({
      model: 'gemini-2.0-flash',
      config: {
        systemInstruction: sysP1,
      },
      history: [],
    });
  }
  return chat;
}
