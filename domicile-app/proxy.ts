import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const publicPaths = [
  "/login",
  "/forgot-password",
  "/auth/callback",
  "/auth/update-password",
  "/api/health",
];

export async function proxy(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  const demoMode = process.env.NEXT_PUBLIC_ENABLE_DEMO_MODE === "true";
  const pathname = request.nextUrl.pathname;
  const isPublic = publicPaths.some((path) => pathname.startsWith(path));

  // Explicit preview deployments may use demo data without Supabase.
  if (demoMode) {
    return NextResponse.next();
  }

  // Live mode fails closed when authentication is not configured.
  if (!url || !key) {
    if (isPublic) return NextResponse.next();
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("error", "configuration-required");
    return NextResponse.redirect(loginUrl);
  }

  let response = NextResponse.next({ request });
  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  const { data: { user } } = await supabase.auth.getUser();

  if (!user && !isPublic) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    return NextResponse.redirect(loginUrl);
  }

  if (user && pathname.startsWith("/login")) {
    const appUrl = request.nextUrl.clone();
    appUrl.pathname = "/live";
    appUrl.search = "";
    return NextResponse.redirect(appUrl);
  }

  // In live mode the authenticated root always enters the real-data workspace,
  // never the demo dashboard kept at / for visual preview deployments.
  if (user && pathname === "/") {
    const liveUrl = request.nextUrl.clone();
    liveUrl.pathname = "/live";
    liveUrl.search = "";
    return NextResponse.redirect(liveUrl);
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
