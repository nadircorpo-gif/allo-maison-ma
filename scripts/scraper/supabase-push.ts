import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL || "https://ejqrxoeykfrcxutjdmvr.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqcXJ4b2V5a2ZyY3h1dGpkbXZyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjA3MjQyNCwiZXhwIjoyMDkxNjQ4NDI0fQ.2Pi6p1b1TKyLWtBQiTvv8f9kg0YYUxVDLIXEVWo5q98";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export async function upsertPro(pro: Record<string, any> & { phone: string }): Promise<string | null> {
  const { data: existing } = await supabase
    .from("professionals")
    .select("id, sources")
    .eq("phone", pro.phone)
    .limit(1)
    .single();

  if (existing) {
    const mergedSources = existing.sources || [];
    if (pro.sources) {
      for (const s of pro.sources) {
        if (!mergedSources.some((e: any) => e.platform === s.platform && e.externalId === s.externalId)) {
          mergedSources.push(s);
        }
      }
    }
    const { error } = await supabase
      .from("professionals")
      .update({ ...pro, sources: mergedSources })
      .eq("id", existing.id);
    if (error) console.error("Update error:", error.message);
    return existing.id;
  } else {
    const { data, error } = await supabase
      .from("professionals")
      .insert(pro)
      .select("id")
      .single();
    if (error) console.error("Insert error:", error.message);
    return data?.id ?? null;
  }
}

export async function upsertBatch(pros: Array<Record<string, any> & { phone: string }>): Promise<{ pushed: number; errors: number }> {
  let pushed = 0;
  let errors = 0;
  for (const pro of pros) {
    const id = await upsertPro(pro);
    if (id) pushed++;
    else errors++;
  }
  return { pushed, errors };
}

export async function updatePro(id: string, fields: Record<string, any>): Promise<boolean> {
  const { error } = await supabase
    .from("professionals")
    .update(fields)
    .eq("id", id);
  if (error) {
    console.error("Update error:", error.message);
    return false;
  }
  return true;
}

export async function getAllPros(filters?: { withPhone?: boolean; status?: string }): Promise<any[]> {
  const all: any[] = [];
  const PAGE_SIZE = 1000;
  let offset = 0;

  while (true) {
    let query = supabase.from("professionals").select("*").range(offset, offset + PAGE_SIZE - 1);
    if (filters?.withPhone) query = query.not("phone", "is", null);
    if (filters?.status) query = query.eq("status", filters.status);
    const { data, error } = await query;
    if (error) {
      console.error("Query error:", error.message);
      break;
    }
    if (!data || data.length === 0) break;
    all.push(...data);
    if (data.length < PAGE_SIZE) break;
    offset += PAGE_SIZE;
  }

  return all;
}
