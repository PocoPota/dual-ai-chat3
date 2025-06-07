import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const apiKey = body.apiKey;

  if (!apiKey) {
    return NextResponse.json({ error: "Missing API key" }, { status: 400 });
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: "Explain how AI works in a few words",
    });

    return NextResponse.json({ text: response.text });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
