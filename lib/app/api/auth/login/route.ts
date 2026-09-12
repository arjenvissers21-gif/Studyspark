import { NextResponse } from "next/server";
export async function POST() {
  return NextResponse.json({ error: "Inloggen is uitgeschakeld. Gebruik StudySpark direct zonder account." }, { status: 410 });
}
