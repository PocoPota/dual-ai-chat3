import { GoogleGenAI } from '@google/genai';

let chat = null;

export function getChatInstance(apiKey, sysP1){
  const ai = new GoogleGenAI({ apiKey: apiKey });
  if (!chat) {
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

export function resetChat1() {
  console.log('リセットするよーー！')
  chat = null;
}

export { chat };
