"use client";

import { useEffect, useState } from "react";
import { Trash2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  checkAdminPassword,
  fetchAdminData,
  addNewsItem,
  deleteNewsItem,
  addCalendarEvent,
  deleteCalendarEvent,
} from "./actions";

type NewsRow = { id: string; type: string; text: string };
type EventRow = { id: string; event_date: string; label: string; tone: string };

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [news, setNews] = useState<NewsRow[]>([]);
  const [events, setEvents] = useState<EventRow[]>([]);

  const [newsType, setNewsType] = useState("info");
  const [newsText, setNewsText] = useState("");

  const [eventDate, setEventDate] = useState("");
  const [eventLabel, setEventLabel] = useState("");
  const [eventTone, setEventTone] = useState("info");

  async function loadData() {
    setLoading(true);
    const data = await fetchAdminData();
    setNews(data.news as NewsRow[]);
    setEvents(data.events as EventRow[]);
    setLoading(false);
  }

  useEffect(() => {
    if (sessionStorage.getItem("admin_ok") === "1") {
      setAuthed(true);
      loadData();
    }
  }, []);

  async function handleLogin() {
    const ok = await checkAdminPassword(password);
    if (ok) {
      sessionStorage.setItem("admin_ok", "1");
      setAuthed(true);
      loadData();
    } else {
      setError("Mot de passe incorrect");
    }
  }

  async function handleAddNews() {
    if (!newsText.trim()) return;
    await addNewsItem(newsType, newsText);
    setNewsText("");
    loadData();
  }

  async function handleAddEvent() {
    if (!eventDate || !eventLabel.trim()) return;
    await addCalendarEvent(eventDate, eventLabel, eventTone);
    setEventLabel("");
    setEventDate("");
    loadData();
  }

  if (!authed) {
    return (
      <div className="container-page flex min-h-[70vh] items-center justify-center">
        <div className="w-full max-w-sm rounded-2xl border border-medical-100 bg-white p-8 shadow-lg">
          <div className="mb-6 flex items-center gap-2 text-navy-900">
            <Lock className="h-5 w-5 text-medical-600" />
            <h1 className="text-lg font-bold">Accès administrateur</h1>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            className="mb-3 w-full rounded-lg border border-navy-900/15 px-4 py-2.5 text-sm outline-none focus:border-medical-500"
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />
          {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
          <Button onClick={handleLogin} className="w-full">Se connecter</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page py-14">
      <h1 className="mb-10 text-3xl font-bold text-navy-900">Dashboard — Page d&rsquo;accueil</h1>

      {loading && <p className="mb-6 text-sm text-navy-900/50">Chargement...</p>}

      {/* NEWS */}
      <section className="mb-14 rounded-2xl border border-medical-100 bg-white p-7">
        <h2 className="mb-5 text-xl font-bold text-navy-900">Actualités (bandeau + accueil)</h2>

        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          <select
            value={newsType}
            onChange={(e) => setNewsType(e.target.value)}
            className="rounded-lg border border-navy-900/15 px-3 py-2.5 text-sm"
          >
            <option value="info">Info</option>
            <option value="academique">Académique</option>
            <option value="urgent">Urgent</option>
          </select>
          <input
            value={newsText}
            onChange={(e) => setNewsText(e.target.value)}
            placeholder="Texte de l'actualité"
            className="flex-1 rounded-lg border border-navy-900/15 px-4 py-2.5 text-sm outline-none focus:border-medical-500"
          />
          <Button onClick={handleAddNews}>Ajouter</Button>
        </div>

        <ul className="flex flex-col divide-y divide-navy-900/10">
          {news.map((n) => (
            <li key={n.id} className="flex items-center justify-between gap-4 py-3">
              <div>
                <span className="mr-2 rounded-full bg-medical-50 px-2 py-0.5 text-[11px] font-semibold uppercase text-medical-600">
                  {n.type}
                </span>
                <span className="text-sm text-navy-900/85">{n.text}</span>
              </div>
              <button onClick={() => deleteNewsItem(n.id).then(loadData)} className="text-red-500 hover:text-red-700">
                <Trash2 className="h-4 w-4" />
              </button>
            </li>
          ))}
          {news.length === 0 && <p className="py-3 text-sm text-navy-900/40">Aucune actualité.</p>}
        </ul>
      </section>

      {/* CALENDAR */}
      <section className="rounded-2xl border border-medical-100 bg-white p-7">
        <h2 className="mb-5 text-xl font-bold text-navy-900">Dates du calendrier (aperçu accueil)</h2>

        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="rounded-lg border border-navy-900/15 px-3 py-2.5 text-sm"
          />
          <input
            value={eventLabel}
            onChange={(e) => setEventLabel(e.target.value)}
            placeholder="Libellé de l'événement"
            className="flex-1 rounded-lg border border-navy-900/15 px-4 py-2.5 text-sm outline-none focus:border-medical-500"
          />
          <select
            value={eventTone}
            onChange={(e) => setEventTone(e.target.value)}
            className="rounded-lg border border-navy-900/15 px-3 py-2.5 text-sm"
          >
            <option value="info">Info</option>
            <option value="academique">Académique</option>
            <option value="urgent">Examen</option>
          </select>
          <Button onClick={handleAddEvent}>Ajouter</Button>
        </div>

        <ul className="flex flex-col divide-y divide-navy-900/10">
          {events.map((e) => (
            <li key={e.id} className="flex items-center justify-between gap-4 py-3">
              <div>
                <span className="mr-3 text-xs font-semibold text-navy-900/50">{e.event_date}</span>
                <span className="text-sm text-navy-900/85">{e.label}</span>
              </div>
              <button onClick={() => deleteCalendarEvent(e.id).then(loadData)} className="text-red-500 hover:text-red-700">
                <Trash2 className="h-4 w-4" />
              </button>
            </li>
          ))}
          {events.length === 0 && <p className="py-3 text-sm text-navy-900/40">Aucun événement.</p>}
        </ul>
      </section>
    </div>
  );
}
