export const dynamic = "force-dynamic";
export const revalidate = 0;

import Link from "next/link";
import { getGuestUser } from "../../lib/guest";
import { prisma } from "../../lib/prisma";

export default async function Page() {
  const u = await getGuestUser();
  const docs = await prisma.document.findMany({
    where: { userId: u.id }, orderBy: { createdAt: "desc" }, take: 8,
    include: { _count: { select: { flashcards: true, quizzes: true } } },
  });
  const p = u.progress;
  return <main className="container page">
    <div className="row"><div><h1>Mijn StudySpark 👋</h1><p className="muted">Hier staan je samenvattingen, flashcards en quizzen.</p></div><Link className="btn primary" href="/upload">+ Nieuw materiaal</Link></div>
    <section className="grid g3" style={{marginTop:24}}><div className="card"><div className="muted">Kaarten herhaald</div><div className="stat">{p?.cardsReviewed || 0}</div></div><div className="card"><div className="muted">Quizzen voltooid</div><div className="stat">{p?.quizzesDone || 0}</div></div><div className="card"><div className="muted">Streak</div><div className="stat">{p?.streak || 0} dagen</div></div></section>
    <div className="row" style={{marginTop:28}}><h2>Mijn studiemateriaal</h2><Link className="btn soft" href="/library">Alles bekijken</Link></div>
    <div className="grid g2" style={{marginTop:12}}>{docs.length ? docs.map(d=><div className="card" key={d.id}><span className="pill">{d.sourceType}</span><h2>{d.title}</h2><p className="muted">{d._count.flashcards} flashcards · {d._count.quizzes} quiz</p><div className="row" style={{marginTop:12}}><Link className="btn primary" href={`/documents/${d.id}`}>Open</Link><Link className="btn soft" href={`/documents/${d.id}/flashcards`}>Flashcards</Link></div></div>) : <div className="card"><h2>Je eerste leerstof</h2><p className="muted">Upload een PDF, foto of tekst. StudySpark maakt daarna automatisch je samenvatting, flashcards en quiz.</p><Link className="btn primary" href="/upload">Mijn leerstof toevoegen</Link></div>}</div>
  </main>;
}
