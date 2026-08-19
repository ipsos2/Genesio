"use client";

import { AlertTriangle, GraduationCap, Info } from "lucide-react";

export type NewsItem = {
  id?: string;
  type: "info" | "academique" | "urgent";
  text: string;
};

const styles: Record<NewsItem["type"], { label: string; classes: string; icon: JSX.Element }> = {
  info: {
    label: "Info",
    classes: "bg-medical-50 text-medical-600",
    icon: <Info className="h-3.5 w-3.5" />,
  },
  academique: {
    label: "Académique",
    classes: "bg-navy-100 text-navy-900",
    icon: <GraduationCap className="h-3.5 w-3.5" />,
  },
  urgent: {
    label: "Urgent",
    classes: "bg-red-600 text-white",
    icon: <AlertTriangle className="h-3.5 w-3.5" />,
  },
};

export function NewsTicker({ items }: { items: NewsItem[] }) {
  if (!items || items.length === 0) return null;
  const doubled = [...items, ...items];
  return (
    <div className="group relative overflow-hidden border-b border-medical-100 bg-white py-2.5">
      <div className="flex w-max animate-marquee gap-10 group-hover:[animation-play-state:paused]">
        {doubled.map((item, i) => {
          const s = styles[item.type];
          return (
            <div key={i} className="flex shrink-0 items-center gap-2.5 text-sm">
              <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${s.classes}`}>
                {s.icon}
                {s.label}
              </span>
              <span className={item.type === "urgent" ? "font-semibold text-red-600" : "text-navy-900/75"}>
                {item.text}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
