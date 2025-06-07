import { NextResponse } from "next/server";
import { resetChat1 } from '@/lib/ai1ChatStore';
import { resetChat2 } from '@/lib/ai2ChatStore';

export async function POST() {
  resetChat1();
  resetChat2();
  return NextResponse.json({ message: "Chat history2 reset" });
}