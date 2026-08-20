"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, ChevronDown, HelpCircle } from "lucide-react";
import type { FaqItem } from "@/lib/data";

export function FaqContent({ items }: { items: FaqItem[] }) {
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = useMemo(
    () => items.filter((i) => i.question.toLowerCase().includes(query.toLowerCase()) || i.answer.toLowerCase().includes(query.toLowerCase())),
    [items, query]
  );

  const grouped = useMemo(() => {
    const map = new Map<string, FaqItem[]>();
    filtered.forEach((i) => {
      if (!map.has(i.category)) map.set(i.category, []);
      map.get(i.category)!.push(i);
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
              Futurs étudiants
            </span>
            <h1 className="mt-5 text-balance text-4xl font-bold leading-[1.1] text-navy-900 lg:text-5xl">Questions Fréquentes</h1>
            <p className="mt-6 max-w-2xl text-lg text-navy-900/70">
              Vous envisagez de rejoindre l&rsquo;UFR Sciences de la Santé de l&rsquo;UPSP ? Voici les réponses aux
              questions les plus courantes sur la faculté, le campus, le CROU, l&rsquo;EPHR et la ville de San Pedro.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="container-page py-10">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-900/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher une question..."
            className="w-full rounded-full border border-medical-100 bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-medical-500"
          />
        </div>
      </section>

      <section className="container-page pb-24">
        {grouped.length === 0 && <p className="py-16 text-center text-sm text-navy-900/40">Aucune question ne correspond à ta recherche.</p>}
        <div className="flex flex-col gap-12">
          {grouped.map(([category, categoryItems]) => (
            <div key={category}>
              <h2 className="mb-5 flex items-center gap-2.5 text-lg font-bold text-navy-900">
                <HelpCircle className="h-5 w-5 text-medical-600" />
                {category}
              </h2>
              <div className="flex flex-col divide-y divide-medical-100 overflow-hidden rounded-2xl border border-medical-100 bg-white">
                {categoryItems.map((item) => (
                  <div key={item.id}>
                    <button onClick={() => setOpenId(openId === item.id ? null : item.id)} className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left">
                      <span className="text-sm font-semibold text-navy-900">{item.question}</span>
                      <ChevronDown className={`h-4 w-4 shrink-0 text-medical-600 transition-transform ${openId === item.id ? "rotate-180" : ""}`} />
                    </button>
                    {openId === item.id && (
                      <div className="px-6 pb-4">
                        <p className="text-sm leading-relaxed text-navy-900/70">{item.answer}</p>
                      </div>
                    )}
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
