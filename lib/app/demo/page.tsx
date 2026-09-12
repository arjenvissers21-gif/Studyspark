import Link from "next/link";

export default function Page() {
  return <main className="container page">
    <div className="pill">Voorbeeld — niet jouw leerstof</div>
    <h1>Zo ziet een resultaat eruit</h1>
    <p className="muted">Dit is alleen een voorbeeld met fictieve fotosynthese-leerstof. Voor jouw eigen materiaal gebruik je de uploadknop.</p>
    <div className="card" style={{ marginTop: 20 }}><h2>Voorbeeldsamenvatting</h2><p>Fotosynthese is het proces waarbij planten lichtenergie gebruiken om uit koolstofdioxide en water glucose te vormen. Daarbij komt zuurstof vrij.</p></div>
    <div className="grid g3" style={{ marginTop: 16 }}>
      <div className="card"><h3>Voorbeeldflashcard</h3><b>Wat is chlorofyl?</b><p className="muted">Het pigment dat licht absorbeert tijdens fotosynthese.</p></div>
      <div className="card"><h3>Voorbeeldquiz</h3><b>Welke stof nemen planten op uit de lucht?</b><p className="muted">Koolstofdioxide.</p></div>
      <div className="card"><h3>Jouw materiaal</h3><p className="muted">Upload je eigen PDF, foto of tekst om echte resultaten te maken.</p><Link href="/upload" className="btn primary">Mijn leerstof uploaden</Link></div>
    </div>
  </main>;
}
