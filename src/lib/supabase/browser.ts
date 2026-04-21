import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/lib/supabase/types";

export const createSupabaseBrowserClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabasePublishableKey) {
    throw new Error("Supabase environment variables are missing.");
  }

  return createBrowserClient<Database>(supabaseUrl, supabasePublishableKey);
};
