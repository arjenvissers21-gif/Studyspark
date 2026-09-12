import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  let database = false;
  try { await prisma.$queryRaw`SELECT 1`; database = true; } catch { database = false; }
  return NextResponse.json({
    ok: database && !!process.env.OPENAI_API_KEY && !!process.env.AUTH_SECRET,
    database,
    openai: !!process.env.OPENAI_API_KEY,
    auth: !!process.env.AUTH_SECRET,
  });
}
