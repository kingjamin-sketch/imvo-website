import { createClient } from "@/lib/supabase/client";

export type LiveProfile = {
  id: string;
  full_name: string;
  role: "admin" | "property_officer" | "owner";
};

export type LiveProperty = {
  id: string;
  code: string;
  name: string;
  property_type: string;
  city: string;
  status: string;
  cover_image_path: string | null;
};

export type LiveCase = {
  id: string;
  reference: string;
  property_id: string;
  category: string;
  title: string;
  description: string;
  urgency: string;
  status: string;
  created_at: string;
};

export type LiveApproval = {
  id: string;
  case_id: string;
  title: string;
  description: string | null;
  amount_rwf: number | null;
  status: "pending" | "approved" | "declined" | "question";
  owner_note: string | null;
  created_at: string;
};

export type LiveInspection = {
  id: string;
  property_id: string;
  title: string;
  scheduled_for: string | null;
  completed_at: string | null;
  overall_status: string;
  summary: string | null;
};

export type LiveExpense = {
  id: string;
  reference: string;
  property_id: string;
  description: string;
  category: string;
  amount_rwf: number;
  status: string;
  expense_date: string;
};

export type LiveDocument = {
  id: string;
  property_id: string;
  category: string;
  title: string;
  file_path: string;
  mime_type: string | null;
  visible_to_owner: boolean;
  created_at: string;
};

export async function getCurrentProfile(): Promise<LiveProfile | null> {
  const supabase = createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError) throw userError;
  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, role")
    .eq("id", user.id)
    .single();
  if (error) throw error;
  return data as LiveProfile;
}

export async function listAccessibleProperties(): Promise<LiveProperty[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("properties")
    .select("id, code, name, property_type, city, status, cover_image_path")
    .order("name");
  if (error) throw error;
  return (data || []) as LiveProperty[];
}

export async function listAccessibleCases(): Promise<LiveCase[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("cases")
    .select("id, reference, property_id, category, title, description, urgency, status, created_at")
    .order("created_at", { ascending: false })
    .limit(100);
  if (error) throw error;
  return (data || []) as LiveCase[];
}

export async function listMyApprovals(): Promise<LiveApproval[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("approvals")
    .select("id, case_id, title, description, amount_rwf, status, owner_note, created_at")
    .order("created_at", { ascending: false })
    .limit(100);
  if (error) throw error;
  return (data || []) as LiveApproval[];
}

export async function listAccessibleInspections(): Promise<LiveInspection[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("inspections")
    .select("id, property_id, title, scheduled_for, completed_at, overall_status, summary")
    .order("scheduled_for", { ascending: false })
    .limit(100);
  if (error) throw error;
  return (data || []) as LiveInspection[];
}

export async function listAccessibleExpenses(): Promise<LiveExpense[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("expenses")
    .select("id, reference, property_id, description, category, amount_rwf, status, expense_date")
    .order("expense_date", { ascending: false })
    .limit(100);
  if (error) throw error;
  return (data || []) as LiveExpense[];
}

export async function listAccessibleDocuments(): Promise<LiveDocument[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("documents")
    .select("id, property_id, category, title, file_path, mime_type, visible_to_owner, created_at")
    .order("created_at", { ascending: false })
    .limit(100);
  if (error) throw error;
  return (data || []) as LiveDocument[];
}

export async function createPropertyCase(input: {
  propertyId: string;
  category: string;
  title: string;
  description: string;
  urgency: "normal" | "urgent";
}) {
  const supabase = createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError) throw userError;
  if (!user) throw new Error("Authentication required");

  const { data, error } = await supabase
    .from("cases")
    .insert({
      property_id: input.propertyId,
      opened_by: user.id,
      category: input.category,
      title: input.title,
      description: input.description,
      urgency: input.urgency,
    })
    .select("id, reference, property_id, category, title, description, urgency, status, created_at")
    .single();
  if (error) throw error;
  return data as LiveCase;
}

export async function respondToApproval(input: {
  approvalId: string;
  response: "approved" | "declined" | "question";
  note?: string;
}) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("approvals")
    .update({
      status: input.response,
      owner_note: input.note?.trim() || null,
    })
    .eq("id", input.approvalId)
    .select("id, case_id, title, description, amount_rwf, status, owner_note, created_at")
    .single();
  if (error) throw error;
  return data as LiveApproval;
}

export async function uploadOwnerPropertyFile(input: {
  propertyId: string;
  file: File;
  folder?: string;
}) {
  const supabase = createClient();
  const safeFolder = (input.folder || "case-attachments")
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, "-");
  const extension = input.file.name.includes(".")
    ? input.file.name.split(".").pop()?.replace(/[^a-zA-Z0-9]/g, "")
    : "bin";
  const objectName = `${crypto.randomUUID()}.${extension || "bin"}`;
  const path = `owner/${input.propertyId}/${safeFolder}/${objectName}`;

  const { data, error } = await supabase.storage
    .from("property-files")
    .upload(path, input.file, {
      cacheControl: "3600",
      upsert: false,
      contentType: input.file.type || undefined,
    });
  if (error) throw error;
  return data.path;
}
