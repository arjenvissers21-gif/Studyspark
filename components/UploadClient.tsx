"use client";
import { useState } from "react";

export default function UploadClient() {
  const [f, setF] = useState<File | null>(null);
  const [t, setT] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function go() {
    setBusy(true);
    setErr("");
    const fd = new FormData();
    if (f) fd.append("file", f);
    if (t.trim()) fd.append("text", t);

    try {
      const r = await fetch("/api/documents", { method: "POST", body: fd });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(d.error || `Verwerken mislukt (${r.status}).`);
      if (!d.id) throw new Error("StudySpark heeft geen document teruggekregen.");
      window.location.href = `/documents/${d.id}`;
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Er ging iets mis.");
      setBusy(false);
    }
  }

  return (
    <div className="grid" style={{ maxWidth: 800, marginTop: 24 }}>
      <div className="card drop">
        <h2>📄 Upload je echte leerstof</h2>
        <p className="muted">PDF, TXT, MD, PNG, JPEG of WebP · maximaal 10 MB.</p>
        <input
          className="field"
          type="file"
          accept=".pdf,.txt,.md,image/png,image/jpeg,image/webp"
          onChange={e => setF(e.target.files?.[0] || null)}
          disabled={busy}
        />
        {f && <p><b>{f.name}</b></p>}
      </div>

      <div className="card">
        <h3>Of plak je leerstof</h3>
        <textarea className="field area" value={t} onChange={e => setT(e.target.value)} placeholder="Plak hier je aantekeningen…" disabled={busy} />
      </div>

      <button className="btn primary" disabled={busy || (!f && !t.trim())} onClick={go}>
        {busy ? "AI verwerkt je leerstof… even geduld" : "Maak mijn samenvatting + flashcards"}
      </button>

      {err && (
        <div className="card" style={{ border: "1px solid #ef4444" }}>
          <h3>Er ging iets mis</h3>
          <p className="error">{err}</p>
          <p className="muted">Als hier staat dat een AI-sleutel ontbreekt, moet OPENAI_API_KEY in Vercel bij Project Settings → Environment Variables staan.</p>
        </div>
      )}
    </div>
  );
}
