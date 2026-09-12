import { redirect } from "next/navigation";
import UploadClient from "../../components/UploadClient";
import { getCurrentUser } from "../../lib/session";

export default async function Page() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/upload");

  return (
    <main className="container page">
      <div className="row">
        <div>
          <h1>Mijn leerstof omzetten</h1>
          <p className="muted">Upload je eigen aantekeningen. Daarna krijg je direct een samenvatting, flashcards, quiz en Word-export.</p>
        </div>
        <div className="pill">AI-modus</div>
      </div>
      <UploadClient />
    </main>
  );
}
