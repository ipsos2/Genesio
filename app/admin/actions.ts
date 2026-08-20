"use server";

import { supabaseAdmin } from "@/lib/supabase-admin";
import { revalidatePath } from "next/cache";

export async function checkAdminPassword(password: string) {
  return password === process.env.ADMIN_PASSWORD;
}

export async function fetchAdminData() {
  const [newsRes, eventsRes, teachersRes, govRes, coursesRes, faqRes] = await Promise.all([
    supabaseAdmin.from("news_items").select("id, type, text").order("created_at", { ascending: false }),
    supabaseAdmin.from("calendar_events").select("id, event_date, end_date, label, level, category").order("event_date", { ascending: true }),
    supabaseAdmin.from("teachers").select("id, name, grade, discipline, service, email").order("created_at", { ascending: false }),
    supabaseAdmin.from("governance").select("id, role, name, position").order("position", { ascending: true }),
    supabaseAdmin.from("course_files").select("id, level, ue, module, title, file_url").order("created_at", { ascending: false }),
    supabaseAdmin.from("faq_items").select("id, category, question, answer, position").order("position", { ascending: true }),
  ]);
  return {
    news: newsRes.data ?? [],
    events: eventsRes.data ?? [],
    teachers: teachersRes.data ?? [],
    governance: govRes.data ?? [],
    courses: coursesRes.data ?? [],
    faq: faqRes.data ?? [],
  };
}

function revalidateAll() {
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/ufr-sciences-de-la-sante");
  revalidatePath("/calendrier-universitaire");
  revalidatePath("/espace-etudiant");
  revalidatePath("/faq");
}

export async function addNewsItem(type: string, text: string) {
  if (!text) return { error: "Texte manquant" };
  const { error } = await supabaseAdmin.from("news_items").insert({ type, text });
  if (error) return { error: error.message };
  revalidateAll();
  return { error: null };
}

export async function deleteNewsItem(id: string) {
  const { error } = await supabaseAdmin.from("news_items").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidateAll();
  return { error: null };
}

const categoryToTone: Record<string, string> = { rentree: "academique", stage: "info", examen: "urgent", conge: "info" };

export async function addCalendarEvent(event_date: string, end_date: string, label: string, level: string, category: string) {
  if (!event_date || !label) return { error: "Champs manquants" };
  const tone = categoryToTone[category] ?? "info";
  const { error } = await supabaseAdmin.from("calendar_events").insert({ event_date, end_date: end_date || null, label, level, category, tone });
  if (error) return { error: error.message };
  revalidateAll();
  return { error: null };
}

export async function deleteCalendarEvent(id: string) {
  const { error } = await supabaseAdmin.from("calendar_events").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidateAll();
  return { error: null };
}

export async function addTeacher(name: string, grade: string, discipline: string, service: string, email: string) {
  if (!name || !grade) return { error: "Champs manquants" };
  const { error } = await supabaseAdmin.from("teachers").insert({ name, grade, discipline, service, email });
  if (error) return { error: error.message };
  revalidateAll();
  return { error: null };
}

export async function deleteTeacher(id: string) {
  const { error } = await supabaseAdmin.from("teachers").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidateAll();
  return { error: null };
}

export async function addGovernanceRow(role: string, name: string, position: number) {
  if (!role || !name) return { error: "Champs manquants" };
  const { error } = await supabaseAdmin.from("governance").insert({ role, name, position });
  if (error) return { error: error.message };
  revalidateAll();
  return { error: null };
}

export async function deleteGovernanceRow(id: string) {
  const { error } = await supabaseAdmin.from("governance").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidateAll();
  return { error: null };
}

export async function addCourseFile(formData: FormData) {
  const level = formData.get("level") as string;
  const ue = formData.get("ue") as string;
  const mod = formData.get("module") as string;
  const title = formData.get("title") as string;
  const file = formData.get("file") as File;
  if (!level || !ue || !mod || !title || !file || file.size === 0) return { error: "Champs manquants" };
  const ext = file.name.split(".").pop() || "pdf";
  const path = `${level}/${ue}/${mod}/${Date.now()}-${title.replace(/\s+/g, "-")}.${ext}`;
  const { error: uploadError } = await supabaseAdmin.storage.from("courses").upload(path, file, { contentType: file.type, upsert: false });
  if (uploadError) return { error: uploadError.message };
  const { data: publicUrlData } = supabaseAdmin.storage.from("courses").getPublicUrl(path);
  const { error: insertError } = await supabaseAdmin.from("course_files").insert({ level, ue, module: mod, title, file_url: publicUrlData.publicUrl, file_type: ext });
  if (insertError) return { error: insertError.message };
  revalidateAll();
  return { error: null };
}

export async function deleteCourseFile(id: string) {
  const { error } = await supabaseAdmin.from("course_files").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidateAll();
  return { error: null };
}

export async function addFaqItem(category: string, question: string, answer: string, position: number) {
  if (!category || !question || !answer) return { error: "Champs manquants" };
  const { error } = await supabaseAdmin.from("faq_items").insert({ category, question, answer, position });
  if (error) return { error: error.message };
  revalidateAll();
  return { error: null };
}

export async function deleteFaqItem(id: string) {
  const { error } = await supabaseAdmin.from("faq_items").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidateAll();
  return { error: null };
}
