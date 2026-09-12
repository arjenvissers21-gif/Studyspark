import Link from "next/link";
import { prisma } from "../../../../lib/prisma";
import { getCurrentUser } from "../../../../lib/session";
import QuizClient from "../../../../components/QuizClient";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const u = await getCurrentUser();
  if (!u) return <main className="container page"><h1>Log in om de quiz te doen.</h1><Link className="btn primary" href="/login">Inloggen</Link></main>;
  const { id } = await params;
  const d = await prisma.document.findFirst({ where: { id, userId: u.id }, include: { quizzes: { include: { questions: true }, orderBy: { createdAt: "desc" } } } });
  if (!d) return <main className="container page"><h1>Niet gevonden</h1></main>;
  const questions = d.quizzes[0]?.questions || [];
  return <main className="container page"><div className="row"><div><span className="pill">Quiz</span><h1>{d.title}</h1></div><Link className="btn soft" href={`/documents/${id}`}>← Terug naar document</Link></div>{questions.length ? <QuizClient documentId={id} questions={questions} /> : <div className="card"><h2>Geen quizvragen</h2><p>Maak eerst een nieuw study pack.</p></div>}</main>;
}
