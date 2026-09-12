"use client";
import Link from "next/link";
import { useState } from "react";

export default function StudyClient({ documentId, cards }: { documentId: string; cards: { id: string; q: string; a: string }[] }) {
  const [i, setI] = useState(0);
  const [show, setShow] = useState(false);
  const [done, setDone] = useState(0);
  const c = cards[i];

  if (!c) return <div className="card"><h2>Je bent klaar! 🎉</h2><p className="muted">Je hebt alle {cards.length} flashcards bekeken.</p><Link className="btn primary" href={`/documents/${documentId}`}>Terug naar je leerstof</Link></div>;

  const next = () => { setDone(x => x + 1); setShow(false); if (i + 1 < cards.length) setI(i + 1); else setI(cards.length); };

  return (
    <div style={{ maxWidth: 720, marginTop: 24 }}>
      <div className="progress"><div style={{ width: `${((i + 1) / cards.length) * 100}%` }} /></div>
      <p className="muted">Kaart {i + 1} van {cards.length}</p>
      <div className="card" style={{ minHeight: 300, display: "grid", placeItems: "center", textAlign: "center" }}>
        <div>
          <div className="pill">{show ? "Antwoord" : "Vraag"}</div>
          <h2>{show ? c.a : c.q}</h2>
          {!show && <button className="btn soft" onClick={() => setShow(true)}>Toon antwoord</button>}
          {show && <div className="row" style={{ justifyContent: "center", marginTop: 20 }}><button className="btn primary" onClick={next}>Volgende kaart</button></div>}
        </div>
      </div>
      {done > 0 && <p className="muted">Bekeken: {done}</p>}
    </div>
  );
}
