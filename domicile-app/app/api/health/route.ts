import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const supabaseConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  );
  const demoMode = process.env.NEXT_PUBLIC_ENABLE_DEMO_MODE !== "false";

  return NextResponse.json(
    {
      service: "DŌMICILE",
      status: "ok",
      app: "property-management",
      supabaseConfigured,
      mode: demoMode ? "preview" : "live",
      timestamp: new Date().toISOString(),
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
