import OpenAI from "openai";
import { z } from "zod";

const Pack = z.object({
  title: z.string(),
  summary: z.string(),
  sections: z.array(z.object({ title: z.string(), content: z.string() })),
  flashcards: z.array(z.object({
    question: z.string(),
    answer: z.string(),
    difficulty: z.number().int().min(1).max(3),
  })),
  quiz: z.object({
    title: z.string(),
    questions: z.array(z.object({
      type: z.enum(["multiple_choice", "true_false", "short_answer"]),
      question: z.string(),
      options: z.array(z.string()).optional(),
      answer: z.string(),
      explanation: z.string().optional(),
      topic: z.string().optional(),
    })),
  }),
});

const system = `You are StudySpark's study engine. The supplied source material is authoritative. Never invent facts and never add facts that are not supported by the source. Create useful, non-duplicated study content. Return valid JSON only.`;

function getClient() {
  const key = process.env.OPENAI_API_KEY?.trim();
  if (!key) throw new Error("OPENAI_API_KEY ontbreekt in Vercel. Voeg deze toe via Project Settings → Environment Variables en redeploy daarna.");
  return new OpenAI({ apiKey: key });
}

export async function generateStudyPack(source: string) {
  const ai = getClient();
  try {
    const r = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      temperature: 0.15,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: system },
        { role: "user", content: `Maak een complete study pack van deze bron. Maak minimaal 6 flashcards en minimaal 5 quizvragen als de bron genoeg informatie bevat.\n\nBRON:\n${source.slice(0, 120000)}` },
      ],
    });
    return Pack.parse(JSON.parse(r.choices[0]?.message?.content || "{}"));
  } catch (error) {
    console.error("StudySpark AI error", error);
    if (error instanceof z.ZodError) throw new Error("De AI gaf geen geldig study pack terug. Probeer het opnieuw met iets kortere of duidelijkere leerstof.");
    if (error instanceof Error && error.message.includes("OPENAI_API_KEY")) throw error;
    throw new Error("De AI kon je leerstof niet verwerken. Controleer in Vercel of OPENAI_API_KEY is ingesteld en probeer opnieuw.");
  }
}

export async function ocrImage(dataUrl: string) {
  const ai = getClient();
  try {
    const r = await ai.chat.completions.create({
      model: process.env.OCR_MODEL || process.env.OPENAI_MODEL || "gpt-4.1-mini",
      temperature: 0,
      messages: [
        { role: "system", content: "Extract all readable study notes from this image. Preserve headings, names, numbers and meaning. Return plain text only. Do not summarize." },
        { role: "user", content: [{ type: "text", text: "Transcribe these notes accurately." }, { type: "image_url", image_url: { url: dataUrl } }] },
      ],
    });
    return r.choices[0]?.message?.content || "";
  } catch (error) {
    console.error("StudySpark OCR error", error);
    throw new Error("De AI kon de foto niet lezen. Controleer OPENAI_API_KEY en probeer een scherpere foto.");
  }
}
