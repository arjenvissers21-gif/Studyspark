import Link from "next/link";
import { getGuestUser } from "../../lib/guest";
import { prisma } from "../../lib/prisma";

export default async function Library(){const u=await getGuestUser();const docs=await prisma.document.findMany({where:{userId:u.id},orderBy:{updatedAt:"desc"},include:{_count:{select:{flashcards:true,quizzes:true}}}});return <main className="container page"><div className="row"><div><h1>Mijn bibliotheek</h1><p className="muted">Al je studiemateriaal op één plek.</p></div><Link className="btn primary" href="/upload">+ Nieuw materiaal</Link></div><div className="grid g2" style={{marginTop:20}}>{docs.map(d=><Link className="card" href={`/documents/${d.id}`} key={d.id}><span className="pill">{d.sourceType}</span><h2>{d.title}</h2><p className="muted">{d._count.flashcards} flashcards · {d._count.quizzes} quiz</p></Link>)}</div>{!docs.length&&<div className="card"><p className="muted">Je bibliotheek is nog leeg.</p></div>}</main>}
