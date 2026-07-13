import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_ANON_KEY, SUPABASE_URL, isSupabaseConfigured } from "./env";
import type { Database } from "./database.types";

let client: SupabaseClient<Database> | null = null;

export function getSupabase() {
  if (!isSupabaseConfigured()) return null;
  if (!client) {
    client = createClient<Database>(SUPABASE_URL as string, SUPABASE_ANON_KEY as string);
  }
  return client;
}
