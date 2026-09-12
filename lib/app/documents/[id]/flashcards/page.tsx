import Link from "next/link";
import { prisma } from "../../../../lib/prisma";
import { getGuestUser } from "../../../../lib/guest";
import StudyClient from "../../../../components/StudyClient";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const u = await getGuestUser();
  const { id } = await params;
  const d = await prisma.document.findFirst({ where: { id, userId: u.id }, include: { flashcards: true } });
  if (!d) return <main className="container page"><h1>Niet gevonden</h1></main>;

  return (
    <main className="container page">
      <div className="row">
        <div><span className="pill">Flashcards</span><h1>{d.title}</h1><p className="muted">{d.flashcards.length} kaarten uit jouw leerstof.</p></div>
        <Link className="btn soft" href={`/documents/${id}`}>← Terug naar document</Link>
      </div>
      <StudyClient documentId={d.id} cards={d.flashcards.map(x => ({ id: x.id, q: x.question, a: x.answer }))} />
    </main>
  );
}
