import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import { makeDocx } from "../../../../../lib/word";
import { getGuestUser } from "../../../../../lib/guest";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getGuestUser();

  const { id } = await params;
  const document = await prisma.document.findFirst({
    where: { id, userId: user.id },
    include: {
      sections: { orderBy: { order: "asc" } },
      flashcards: true,
    },
  });

  if (!document) {
    return NextResponse.json({ error: "Niet gevonden." }, { status: 404 });
  }

  const buffer = await makeDocx({
    title: document.title,
    summary: document.summary || "",
    sections: document.sections,
    flashcards: document.flashcards,
  });

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": `attachment; filename="${encodeURIComponent(document.title)}.docx"`,
    },
  });
}
