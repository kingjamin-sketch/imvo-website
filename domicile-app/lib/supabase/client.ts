import { createBrowserClient } from "@supabase/ssr";

export const supabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
);

export const demoModeEnabled =
  process.env.NEXT_PUBLIC_ENABLE_DEMO_MODE !== "false";

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error(
      "DŌMICILE Supabase environment variables are not configured.",
    );
  }

  return createBrowserClient(url, key);
}
