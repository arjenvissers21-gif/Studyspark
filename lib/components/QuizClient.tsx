"use client";
import Link from "next/link";
import { useState } from "react";

type Q = { id: string; question: string; answer: string; options: unknown; explanation: string | null };

export default function QuizClient({ documentId, questions }: { documentId: string; questions: Q[] }) {
  const [i, setI] = useState(0);
  const [selected, setSelected] = useState("");
  const [score, setScore] = useState(0);
  const [checked, setChecked] = useState(false);
  const q = questions[i];
  if (!q) return <div className="card"><h2>Quiz klaar! 🎉</h2><p>Score: {score} / {questions.length}</p><Link className="btn primary" href={`/documents/${documentId}`}>Terug naar document</Link></div>;
  const options = Array.isArray(q.options) ? q.options.filter((x): x is string => typeof x === "string") : [];
  function check() { if (!selected) return; setChecked(true); if (selected === q.answer) setScore(s => s + 1); }
  function next() { setSelected(""); setChecked(false); setI(x => x + 1); }
  return <div style={{ maxWidth: 800, marginTop: 24 }}>
    <p className="muted">Vraag {i + 1} van {questions.length} · Score {score}</p>
    <div className="card"><h2>{q.question}</h2>
      {options.length ? <div className="grid" style={{ marginTop: 16 }}>{options.map(o => <button key={o} className="btn soft" disabled={checked} onClick={() => setSelected(o)} style={{ textAlign: "left" }}>{o}</button>)}</div> : <input className="field" value={selected} onChange={e => setSelected(e.target.value)} disabled={checked} placeholder="Typ je antwoord" />}
      {!checked ? <button className="btn primary" style={{ marginTop: 16 }} onClick={check} disabled={!selected}>Controleer</button> : <div style={{ marginTop: 16 }}><p><b>{selected === q.answer ? "Goed!" : `Niet helemaal. Antwoord: ${q.answer}`}</b></p>{q.explanation && <p className="muted">{q.explanation}</p>}<button className="btn primary" onClick={next}>Volgende</button></div>}
    </div>
  </div>;
}
