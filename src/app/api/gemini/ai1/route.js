import { GoogleGenAI } from '@google/genai';
import { NextResponse } from "next/server";

let chat = null;

export async function POST(req) {
  const body = await req.json();
  const apiKey = body.apiKey;
  const message = body.message;

  if (!apiKey) {
    return NextResponse.json({ error: "Missing API key" }, { status: 400 });
  }

  const ai = new GoogleGenAI({ apiKey: apiKey });

  try {

    if (!chat) {
      chat = ai.chats.create({
        model: 'gemini-2.0-flash',
        history: [],
      });
    }
    const response = await chat.sendMessage({message: message});
    return NextResponse.json({ reply: response.text }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
