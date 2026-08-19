"use server";

import { supabaseAdmin } from "@/lib/supabase-admin";
import { revalidatePath } from "next/cache";

export async function checkAdminPassword(password: string) {
  return password === process.env.ADMIN_PASSWORD;
}

export async function fetchAdminData() {
  const [newsRes, eventsRes] = await Promise.all([
    supabaseAdmin.from("news_items").select("id, type, text").order("created_at", { ascending: false }),
    supabaseAdmin.from("calendar_events").select("id, event_date, label, tone").order("event_date", { ascending: true }),
  ]);
  return {
    news: newsRes.data ?? [],
    events: eventsRes.data ?? [],
  };
}

export async function addNewsItem(type: string, text: string) {
  if (!text) return;
  await supabaseAdmin.from("news_items").insert({ type, text });
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteNewsItem(id: string) {
  await supabaseAdmin.from("news_items").delete().eq("id", id);
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function addCalendarEvent(event_date: string, label: string, tone: string) {
  if (!event_date || !label) return;
  await supabaseAdmin.from("calendar_events").insert({ event_date, label, tone });
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteCalendarEvent(id: string) {
  await supabaseAdmin.from("calendar_events").delete().eq("id", id);
  revalidatePath("/");
  revalidatePath("/admin");
}
