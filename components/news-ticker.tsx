"use client";

import { AlertTriangle, GraduationCap, Info } from "lucide-react";

type NewsItem = {
  type: "info" | "academique" | "urgent";
  text: string;
};

const news: NewsItem[] = [
  { type: "urgent", text: "Report de la clôture des inscriptions au 30 septembre" },
  { type: "academique", text: "Rentrée académique Doctorat 1 fixée au 15 octobre" },
  { type: "info", text: "Journée Santé du campus le 12 novembre — inscriptions ouvertes" },
  { type: "academique", text: "Publication du calendrier des stages EPHR — voir Calendrier Universitaire" },
  { type: "info", text: "Réunion de la délégation Promotion Genèse le mercredi 18h" },
];

const styles: Record<NewsItem["type"], { label: string; classes: string; icon: JSX.Element }> = {
  info: {
    label: "Info",
    classes: "bg-medical-50 text-medical-600 dark:bg-medical-500/10 dark:text-medical-400",
    icon: <Info className="h-3.5 w-3.5" />,
  },
  academique: {
    label: "Académique",
    classes: "bg-navy-100 text-navy-900 dark:bg-white/10 dark:text-white",
    icon: <GraduationCap className="h-3.5 w-3.5" />,
  },
  urgent: {
    label: "Urgent",
    classes: "bg-red-600 text-white",
    icon: <AlertTriangle className="h-3.5 w-3.5" />,
  },
};

export function NewsTicker() {
  const doubled = [...news, ...news];
  return (
    <div className="group relative overflow-hidden border-b border-navy-900/10 bg-white/70 py-2.5 backdrop-blur dark:border-white/10 dark:bg-navy-900/70">
      <div className="flex w-max animate-marquee gap-10 group-hover:[animation-play-state:paused]">
        {doubled.map((item, i) => {
          const s = styles[item.type];
          return (
            <div key={i} className="flex shrink-0 items-center gap-2.5 text-sm">
              <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${s.classes}`}>
                {s.icon}
                {s.label}
              </span>
              <span className={item.type === "urgent" ? "font-semibold text-red-600 dark:text-red-400" : "text-navy-900/80 dark:text-white/80"}>
                {item.text}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
