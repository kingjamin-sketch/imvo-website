import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const supabaseConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  );
  const demoMode = process.env.NEXT_PUBLIC_ENABLE_DEMO_MODE === "true";
  const configured = demoMode || supabaseConfigured;

  return NextResponse.json(
    {
      service: "DŌMICILE",
      status: configured ? "ok" : "configuration_required",
      app: "property-management",
      supabaseConfigured,
      mode: demoMode ? "preview" : "live",
      timestamp: new Date().toISOString(),
    },
    {
      status: configured ? 200 : 503,
      headers: { "Cache-Control": "no-store" },
    },
  );
}
