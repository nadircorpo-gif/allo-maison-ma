import { ConvexHttpClient } from "convex/browser";
import { api } from "../../convex/_generated/api";
import type { NormalizedPro } from "./types";

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL;

if (!CONVEX_URL) {
  throw new Error("NEXT_PUBLIC_CONVEX_URL environment variable is required. Run: npx convex dev --once");
}

const client = new ConvexHttpClient(CONVEX_URL);

export async function pushPro(pro: NormalizedPro): Promise<string> {
  const id = await client.mutation(api.mutations.professionals.upsert, {
    firstName: pro.firstName,
    lastName: pro.lastName,
    phone: pro.phone ?? undefined,
    photo: pro.photo ?? undefined,
    gender: pro.gender ?? undefined,
    services: pro.services,
    city: pro.city,
    quartier: pro.quartier ?? undefined,
    lat: pro.lat ?? undefined,
    lng: pro.lng ?? undefined,
    scoreMaison: pro.scoreMaison,
    scoreDetails: pro.scoreDetails,
    sources: pro.sources,
    experience: pro.experience ?? undefined,
    mediaCount: pro.mediaCount ?? undefined,
    description: pro.description ?? undefined,
    verified: pro.verified || undefined,
    status: pro.status,
  });
  return id;
}

export async function pushBatch(pros: NormalizedPro[]): Promise<{ pushed: number; errors: number }> {
  let pushed = 0;
  let errors = 0;

  for (const pro of pros) {
    try {
      await pushPro(pro);
      pushed++;
    } catch (err) {
      errors++;
      console.error(`Failed to push ${pro.firstName} ${pro.lastName}:`, err);
    }
  }

  return { pushed, errors };
}
