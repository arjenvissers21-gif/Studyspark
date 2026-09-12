import Link from "next/link";

export default function Page() {
  return <main className="container page">
    <div className="row"><div><h1>Mijn StudySpark 👋</h1><p className="muted">Upload je leerstof en maak direct een samenvatting, flashcards en quiz.</p></div><Link className="btn primary" href="/upload">+ Nieuw materiaal</Link></div>
    <section className="grid g3" style={{marginTop:24}}><div className="card"><div className="muted">Studeren</div><div className="stat">AI</div><p className="muted">Van je eigen leerstof naar oefenmateriaal.</p></div><div className="card"><div className="muted">Flashcards</div><div className="stat">✓</div><p className="muted">Oefen begrippen en antwoorden.</p></div><div className="card"><div className="muted">Quiz</div><div className="stat">✓</div><p className="muted">Test wat je al kent.</p></div></section>
    <section className="card" style={{marginTop:28}}><h2>Begin met leren</h2><p className="muted">Upload een PDF, foto of tekst. StudySpark verwerkt je leerstof wanneer je op uploaden klikt.</p><Link className="btn primary" href="/upload">Mijn leerstof toevoegen</Link></section>
  </main>;
}
