import { getChatInstance } from '@/lib/ai2ChatStore';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const body = await req.json();
  const apiKey = body.apiKey;
  const message = body.message;
  const sysP2 = body.sysP2;
  const isFirstChat2 = body.isFirstChat2;

  if (!apiKey) {
    return NextResponse.json({ error: "Missing API key" }, { status: 400 });
  }

  try {
    const chat = getChatInstance(apiKey, sysP2, isFirstChat2);
    const response = await chat.sendMessage({message: message});
    return NextResponse.json({ reply: response.text }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
