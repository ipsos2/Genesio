"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Download, CalendarDays } from "lucide-react";
import type { CalendarEvent } from "@/lib/data";

const levels = ["Toutes", "Licence 1", "Licence 2", "Licence 3", "Doctorat 1", "Doctorat 2", "Internat"];

const categoryLabels: Record<string, string> = {
  rentree: "Rentrée",
  stage: "Stage",
  examen: "Examen",
  conge: "Congé",
};

const categoryClasses: Record<string, string> = {
  rentree: "bg-navy-100 text-navy-900",
  stage: "bg-medical-50 text-medical-600",
  examen: "bg-red-50 text-red-600",
  conge: "bg-emerald-50 text-emerald-700",
};

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });
}

function monthKey(d: string) {
  return new Date(d).toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
}

export function CalendarContent({ events }: { events: CalendarEvent[] }) {
  const [level, setLevel] = useState("Toutes");

  const filtered = useMemo(
    () => events.filter((e) => level === "Toutes" || e.level === "Toutes" || e.level === level),
    [events, level]
  );

  const grouped = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    filtered.forEach((e) => {
      const key = monthKey(e.event_date);
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(e);
    });
    return Array.from(map.entries());
  }, [filtered]);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-medical-50 to-white">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-medical-400/20 blur-3xl" />
        <div className="container-page relative py-20 lg:py-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <span className="inline-flex items-center rounded-full bg-medical-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-medical-600">
              Année universitaire
            </span>
            <h1 className="mt-5 text-balance text-4xl font-bold leading-[1.1] text-navy-900 lg:text-5xl">
              Calendrier Universitaire
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-navy-900/70">
              Rentrées, périodes de stage, examens et congés — filtrez par niveau d&rsquo;étude pour voir ce qui vous concerne.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="container-page py-12 lg:py-16 print:hidden">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {levels.map((l) => (
              <button
                key={l}
                onClick={() => setLevel(l)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  level === l ? "bg-medical-600 text-white" : "border border-medical-100 bg-white text-navy-900/70 hover:border-medical-300"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 self-start rounded-full border border-navy-900/15 px-5 py-2.5 text-sm font-semibold text-navy-900 hover:bg-navy-900 hover:text-white"
          >
            <Download className="h-4 w-4" /> Exporter en PDF
          </button>
        </div>
      </section>

      <section className="container-page pb-24">
        {grouped.length === 0 && (
          <p className="py-16 text-center text-sm text-navy-900/40">Aucun événement pour ce niveau pour le moment.</p>
        )}
        <div className="flex flex-col gap-12">
          {grouped.map(([month, monthEvents]) => (
            <div key={month}>
              <h2 className="mb-5 flex items-center gap-2.5 text-lg font-bold capitalize text-navy-900">
                <CalendarDays className="h-5 w-5 text-medical-600" />
                {month}
              </h2>
              <div className="flex flex-col divide-y divide-medical-100 overflow-hidden rounded-2xl border border-medical-100 bg-white">
                {monthEvents.map((e) => (
                  <div key={e.id} className="flex flex-col gap-2 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-semibold text-navy-900">{e.label}</span>
                      <span className="text-xs text-navy-900/50">
                        {formatDate(e.event_date)}
                        {e.end_date ? ` → ${formatDate(e.end_date)}` : ""}
                        {e.level !== "Toutes" ? ` · ${e.level}` : ""}
                      </span>
                    </div>
                    <span className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-[11px] font-semibold ${categoryClasses[e.category] ?? categoryClasses.stage}`}>
                      {categoryLabels[e.category] ?? e.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
