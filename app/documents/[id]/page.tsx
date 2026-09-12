import { prisma } from "../../../lib/prisma";
import { getGuestUser } from "../../../lib/guest";
import Link from "next/link";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const u = await getGuestUser();
  const { id } = await params;

  const d = await prisma.document.findFirst({
    where: { id, userId: u.id },
    include: { sections: { orderBy: { order: "asc" } }, flashcards: true, quizzes: { include: { questions: true } } },
  });
  if (!d) return <main className="container page"><h1>Niet gevonden</h1></main>;

  return (
    <main className="container page">
      <div className="row">
        <div><span className="pill">{d.sourceType}</span><h1>{d.title}</h1></div>
        <div className="row">
          <Link className="btn primary" href={`/documents/${id}/flashcards`}>🧠 Flashcards ({d.flashcards.length})</Link>
          <Link className="btn soft" href={`/documents/${id}/quiz`}>Quiz ({d.quizzes[0]?.questions.length || 0})</Link>
          <a className="btn soft" href={`/api/documents/${id}/word`}>Word downloaden</a>
        </div>
      </div>

      <div className="card" style={{ marginTop: 20 }}><h2>Samenvatting</h2><p>{d.summary}</p></div>
      <div className="card" style={{ marginTop: 16 }}><h2>Onderwerpen</h2>{d.sections.map(s => <section key={s.id}><h3>{s.title}</h3><p>{s.content}</p></section>)}</div>
      <div className="card" style={{ marginTop: 16 }}>
        <div className="row"><h2>Flashcards</h2><Link className="btn soft" href={`/documents/${id}/flashcards`}>Alle flashcards oefenen</Link></div>
        {d.flashcards.slice(0, 6).map(c => <p key={c.id}><b>{c.question}</b><br/><span className="muted">{c.answer}</span></p>)}
      </div>
      <div className="card" style={{ marginTop: 16 }}>
        <div className="row"><h2>Quiz</h2><Link className="btn soft" href={`/documents/${id}/quiz`}>Quiz starten</Link></div>
        {d.quizzes[0]?.questions.slice(0, 3).map(q => <p key={q.id}><b>{q.question}</b></p>)}
      </div>
    </main>
  );
}
