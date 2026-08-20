import { createClient } from "npm:@supabase/supabase-js@2";

const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const appUrl = Deno.env.get("DOMICILE_APP_URL") ?? "https://app.imvogroup.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": appUrl,
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Vary": "Origin",
};

Deno.serve(async (request: Request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  if (!supabaseUrl || !serviceRoleKey) {
    return json({ error: "Server configuration is incomplete" }, 500);
  }

  const authorization = request.headers.get("Authorization");
  if (!authorization?.startsWith("Bearer ")) {
    return json({ error: "Unauthorized" }, 401);
  }

  const token = authorization.slice("Bearer ".length);
  const admin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: authData, error: authError } = await admin.auth.getUser(token);
  if (authError || !authData.user) {
    return json({ error: "Unauthorized" }, 401);
  }

  const { data: callerProfile, error: callerError } = await admin
    .from("profiles")
    .select("role")
    .eq("id", authData.user.id)
    .single();

  if (callerError || callerProfile?.role !== "admin") {
    return json({ error: "Only a DŌMICILE administrator can invite owners" }, 403);
  }

  let payload: {
    email?: string;
    full_name?: string;
    phone?: string;
    property_id?: string;
    is_primary?: boolean;
  };

  try {
    payload = await request.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const email = payload.email?.trim().toLowerCase();
  const fullName = payload.full_name?.trim();
  const propertyId = payload.property_id?.trim();

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return json({ error: "A valid owner email is required" }, 400);
  }
  if (!fullName || fullName.length < 2) {
    return json({ error: "Owner name is required" }, 400);
  }
  if (!propertyId) {
    return json({ error: "Property is required" }, 400);
  }

  const { data: property, error: propertyError } = await admin
    .from("properties")
    .select("id, name")
    .eq("id", propertyId)
    .single();

  if (propertyError || !property) {
    return json({ error: "Property was not found" }, 404);
  }

  const redirectTo = `${appUrl}/auth/callback?next=/auth/update-password`;
  const { data: invited, error: inviteError } = await admin.auth.admin.inviteUserByEmail(email, {
    redirectTo,
    data: {
      full_name: fullName,
      phone: payload.phone?.trim() || null,
      invited_by_domicile: true,
    },
  });

  if (inviteError || !invited.user) {
    return json({ error: inviteError?.message || "Could not invite owner" }, 400);
  }

  const { error: membershipError } = await admin
    .from("property_members")
    .upsert(
      {
        property_id: propertyId,
        user_id: invited.user.id,
        relationship: "owner",
        is_primary: payload.is_primary ?? true,
      },
      { onConflict: "property_id,user_id" },
    );

  if (membershipError) {
    return json({ error: "Owner was invited but property access could not be attached. Review the account before resending." }, 500);
  }

  await admin.from("activity_logs").insert({
    actor_id: authData.user.id,
    property_id: propertyId,
    entity_type: "profile",
    entity_id: invited.user.id,
    action: "owner.invited",
    metadata: {
      property_name: property.name,
      owner_email: email,
    },
  });

  return json({
    success: true,
    owner_id: invited.user.id,
    property_id: propertyId,
  });
});

function json(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}
