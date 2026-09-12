import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  let database = false;
  if (process.env.DATABASE_URL?.trim()) {
    try {
      await prisma.$queryRaw`SELECT 1`;
      database = true;
    } catch {
      database = false;
    }
  }

  return NextResponse.json({
    ok: database && !!process.env.OPENAI_API_KEY?.trim(),
    database,
    openai: !!process.env.OPENAI_API_KEY?.trim(),
  });
}
