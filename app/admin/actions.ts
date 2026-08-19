"use server";

import { supabaseAdmin } from "@/lib/supabase-admin";
import { revalidatePath } from "next/cache";

export async function checkAdminPassword(password: string) {
  return password === process.env.ADMIN_PASSWORD;
}

export async function fetchAdminData() {
  const [newsRes, eventsRes, teachersRes, govRes] = await Promise.all([
    supabaseAdmin.from("news_items").select("id, type, text").order("created_at", { ascending: false }),
    supabaseAdmin.from("calendar_events").select("id, event_date, label, tone").order("event_date", { ascending: true }),
    supabaseAdmin.from("teachers").select("id, name, grade, discipline, service, email").order("created_at", { ascending: false }),
    supabaseAdmin.from("governance").select("id, role, name, position").order("position", { ascending: true }),
  ]);
  return {
    news: newsRes.data ?? [],
    events: eventsRes.data ?? [],
    teachers: teachersRes.data ?? [],
    governance: govRes.data ?? [],
  };
}

function revalidateAll() {
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/ufr-sciences-de-la-sante");
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

export async function addCalendarEvent(event_date: string, label: string, tone: string) {
  if (!event_date || !label) return { error: "Champs manquants" };
  const { error } = await supabaseAdmin.from("calendar_events").insert({ event_date, label, tone });
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
