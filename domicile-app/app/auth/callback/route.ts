import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next") || "/";

  if (!code) {
    return NextResponse.redirect(new URL("/login?error=missing-auth-code", url.origin));
  }

  try {
    const supabase = await createServerSupabaseClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) throw error;

    const safeNext = next.startsWith("/") && !next.startsWith("//") ? next : "/";
    return NextResponse.redirect(new URL(safeNext, url.origin));
  } catch {
    return NextResponse.redirect(new URL("/login?error=auth-callback-failed", url.origin));
  }
}
