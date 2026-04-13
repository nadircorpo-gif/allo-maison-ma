import * as fs from "fs";

const SUPABASE_URL = "https://ejqrxoeykfrcxutjdmvr.supabase.co";
const SERVICE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqcXJ4b2V5a2ZyY3h1dGpkbXZyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjA3MjQyNCwiZXhwIjoyMDkxNjQ4NDI0fQ.2Pi6p1b1TKyLWtBQiTvv8f9kg0YYUxVDLIXEVWo5q98";

async function main() {
  const lines = fs
    .readFileSync("/tmp/convex-export/professionals/documents.jsonl", "utf-8")
    .trim()
    .split("\n");
  console.log("Total records:", lines.length);

  const BATCH_SIZE = 50;
  let pushed = 0;
  let errors = 0;

  for (let i = 0; i < lines.length; i += BATCH_SIZE) {
    const batch = lines.slice(i, i + BATCH_SIZE).map((line) => {
      const doc = JSON.parse(line);
      return {
        first_name: doc.firstName || "",
        last_name: doc.lastName || "",
        phone: doc.phone || null,
        photo: doc.photo || null,
        gender: doc.gender || null,
        services: doc.services || [],
        city: doc.city || "",
        quartier: doc.quartier || null,
        lat: doc.lat || null,
        lng: doc.lng || null,
        score_maison: doc.scoreMaison || 0,
        score_completude: doc.scoreDetails?.completude || 0,
        score_joignabilite: doc.scoreDetails?.joignabilite || 0,
        score_multi_plateforme: doc.scoreDetails?.multiPlateforme || 0,
        score_experience: doc.scoreDetails?.experience || 0,
        sources: doc.sources || [],
        experience: doc.experience ? Math.round(doc.experience) : null,
        media_count: doc.mediaCount ? Math.round(doc.mediaCount) : null,
        description: doc.description || null,
        verified: doc.verified || false,
        status: doc.status || "scraped",
      };
    });

    const res = await fetch(SUPABASE_URL + "/rest/v1/professionals", {
      method: "POST",
      headers: {
        apikey: SERVICE_KEY,
        Authorization: "Bearer " + SERVICE_KEY,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(batch),
    });

    if (res.ok) {
      pushed += batch.length;
    } else {
      const err = await res.text();
      console.error("Batch error at " + i + ":", err.substring(0, 200));
      errors += batch.length;
    }

    if ((i + BATCH_SIZE) % 200 === 0 || i + BATCH_SIZE >= lines.length) {
      console.log("Progress:", pushed, "pushed,", errors, "errors");
    }
  }

  console.log("Done! Pushed:", pushed, "Errors:", errors);
}

main().catch(console.error);
