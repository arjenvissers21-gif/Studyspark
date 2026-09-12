import UploadClient from "../../components/UploadClient";

export default function Page() {
  return <main className="container page"><div className="row"><div><h1>Mijn leerstof omzetten</h1><p className="muted">Upload je eigen aantekeningen. Daarna krijg je direct een samenvatting, flashcards, quiz en Word-export.</p></div><div className="pill">Zonder account</div></div><UploadClient /></main>;
}
