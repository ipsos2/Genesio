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

export type CourseFile = {
  id: string;
  level: string;
  ue: string;
  module: string;
  title: string;
  file_url: string;
  file_type: string;
};

export type FaqItem = {
  id: string;
  category: string;
  question: string;
  answer: string;
  position: number;
};

export async function fetchNewsItems(): Promise<NewsItem[]> {
  const { data, error } = await supabase.from("news_items").select("id, type, text, created_at").order("created_at", { ascending: false });
  if (error || !data) return [];
  return data as NewsItem[];
}

export async function fetchCalendarEvents(): Promise<CalendarEvent[]> {
  const { data, error } = await supabase.from("calendar_events").select("id, event_date, end_date, label, tone, level, category").order("event_date", { ascending: true });
  if (error || !data) return [];
  return data as CalendarEvent[];
}

export async function fetchTeachers(): Promise<Teacher[]> {
  const { data, error } = await supabase.from("teachers").select("id, name, grade, discipline, service, email").order("created_at", { ascending: false });
  if (error || !data) return [];
  return data as Teacher[];
}

export async function fetchGovernance(): Promise<GovernanceRow[]> {
  const { data, error } = await supabase.from("governance").select("id, role, name, position").order("position", { ascending: true });
  if (error || !data) return [];
  return data as GovernanceRow[];
}

export async function fetchCourseFiles(): Promise<CourseFile[]> {
  const { data, error } = await supabase.from("course_files").select("id, level, ue, module, title, file_url, file_type").order("created_at", { ascending: false });
  if (error || !data) return [];
  return data as CourseFile[];
}

export async function fetchFaqItems(): Promise<FaqItem[]> {
  const { data, error } = await supabase.from("faq_items").select("id, category, question, answer, position").order("position", { ascending: true });
  if (error || !data) return [];
  return data as FaqItem[];
}
