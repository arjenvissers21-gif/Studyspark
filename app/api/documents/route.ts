import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { extractText } from "../../../lib/parse";
import { generateStudyPack } from "../../../lib/ai";
import { getGuestUser } from "../../../lib/guest";

export const runtime = "nodejs";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    if (!process.env.DATABASE_URL?.trim()) {
      return NextResponse.json(
        { error: "DATABASE_URL ontbreekt in Vercel. Voeg je PostgreSQL DATABASE_URL toe via Project Settings → Environment Variables en redeploy daarna." },
        { status: 503 },
      );
    }
    const user = await getGuestUser();

    const form = await req.formData();
    const file = form.get("file");
    const pasted = String(form.get("text") || "").trim();

    let text = pasted;
    let sourceType = "TEXT";

    if (file instanceof File) {
      const extracted = await extractText(file);
      text = extracted.text;
      sourceType = extracted.type;
    }

    text = text.replace(/\u0000/g, "").trim();
    if (text.length < 20) return NextResponse.json({ error: "Ik kon niet genoeg leerstof uit je bestand halen. Gebruik een duidelijkere PDF/foto of plak de tekst rechtstreeks." }, { status: 400 });

    const pack = await generateStudyPack(text);

    const document = await prisma.document.create({
      data: {
        userId: user.id,
        title: pack.title,
        sourceType,
        rawText: text,
        summary: pack.summary,
        sections: {
          create: pack.sections.map((section, index) => ({ title: section.title, content: section.content, order: index })),
        },
        flashcards: {
          create: pack.flashcards.map(card => ({ question: card.question, answer: card.answer, difficulty: card.difficulty, dueAt: new Date() })),
        },
        quizzes: {
          create: {
            title: pack.quiz.title,
            questions: {
              create: pack.quiz.questions.map(question => ({
                type: question.type,
                question: question.question,
                options: question.options,
                answer: question.answer,
                explanation: question.explanation,
                topic: question.topic,
              })),
            },
          },
        },
      },
    });

    return NextResponse.json({ id: document.id });
  } catch (error) {
    console.error("StudySpark document error", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Verwerking mislukt." },
      { status: 500 },
    );
  }
}
