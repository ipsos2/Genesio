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
  end_date: string | null;
  label: string;
  tone: "info" | "academique" | "urgent";
  level: string;
  category: "rentree" | "stage" | "examen" | "conge";
};

export type Teacher = {
  id: string;
  name: string;
  grade: string;
  discipline: string;
  service: string;
  email: string;
};

export type GovernanceRow = {
  id: string;
  role: string;
  name: string;
  position: number;
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
    .select("id, event_date, end_date, label, tone, level, category")
    .order("event_date", { ascending: true });
  if (error || !data) return [];
  return data as CalendarEvent[];
}

export async function fetchTeachers(): Promise<Teacher[]> {
  const { data, error } = await supabase
    .from("teachers")
    .select("id, name, grade, discipline, service, email")
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  return data as Teacher[];
}

export async function fetchGovernance(): Promise<GovernanceRow[]> {
  const { data, error } = await supabase
    .from("governance")
    .select("id, role, name, position")
    .order("position", { ascending: true });
  if (error || !data) return [];
  return data as GovernanceRow[];
}
