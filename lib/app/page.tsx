import Link from "next/link";

export default function Home() {
  return <main>
    <section className="hero container">
      <div className="pill">AI-studeren vanuit jouw eigen leerstof</div>
      <h1>Van je aantekeningen naar een complete studiesessie.</h1>
      <p>Upload je eigen PDF, foto of tekst. StudySpark maakt er een samenvatting, flashcards, quiz en Word-document van.</p>
      <div className="row" style={{ justifyContent: "center" }}>
        <Link className="btn primary" href="/upload">Start met mijn leerstof</Link>
        <Link className="btn soft" href="/demo">Bekijk voorbeeld</Link>
      </div>
    </section>
    <section className="container grid g3" style={{ paddingBottom: 70 }}>
      {[["📄 Jouw leerstof", "Upload PDF, tekst of een duidelijke foto van je aantekeningen."], ["🧠 Flashcards + quiz", "AI maakt oefenmateriaal dat rechtstreeks op jouw bron is gebaseerd."], ["📘 Word-export", "Download je gegenereerde samenvatting en flashcards als Word-document."]].map(x => <div className="card" key={x[0]}><h3>{x[0]}</h3><p className="muted">{x[1]}</p></div>)}
    </section>
  </main>;
}
