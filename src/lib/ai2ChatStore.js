import { GoogleGenAI } from '@google/genai';

let chat = null;

export function getChatInstance(apiKey, sysP2){
  const ai = new GoogleGenAI({ apiKey: apiKey });
  if (!chat) {
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

export function resetChat2() {
  console.log('リセットするよーー！')
  chat = null;
}

export { chat };
