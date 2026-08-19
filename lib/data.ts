import { supabase } from "@/lib/supabase";

export type NewsItem = {
  id: string;
  type: "info" | "academique" | "urgent";
  text: string;
  created_at?: string;
};

export type CalendarEvent = {
  id: string;
  event_date: string;
  label: string;
  tone: "info" | "academique" | "urgent";
};

export async function fetchNewsItems(): Promise<NewsItem[]> {
  const { data, error } = await supabase
    .from("news_items")
    .select("id, type, text, created_at")
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  return data as NewsItem[];
}

export async function fetchCalendarEvents(): Promise<CalendarEvent[]> {
  const { data, error } = await supabase
    .from("calendar_events")
    .select("id, event_date, label, tone")
    .order("event_date", { ascending: true });
  if (error || !data) return [];
  return data as CalendarEvent[];
}
