import { GoogleGenAI } from '@google/genai';

let chat = null;

export function getChatInstance(apiKey){
  const ai = new GoogleGenAI({ apiKey: apiKey });
  if (!chat) {
    chat = ai.chats.create({
      model: 'gemini-2.0-flash',
      history: [],
    });
  }
  return chat;
}

export function resetChat() {
  chat = null;
}

export { chat };
