import { createBrowserClient } from "@supabase/ssr";

export const supabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
);

// Demo access is opt-in. A missing flag must never expose preview data in production.
export const demoModeEnabled =
  process.env.NEXT_PUBLIC_ENABLE_DEMO_MODE === "true";

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
