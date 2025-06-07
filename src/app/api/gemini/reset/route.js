import { NextResponse } from "next/server";
import { resetChat1 } from '@/lib/ai1ChatStore';

export async function POST() {
  resetChat1();
  return NextResponse.json({ message: "Chat history1 reset" });
}