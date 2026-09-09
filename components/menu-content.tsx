"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { UtensilsCrossed } from "lucide-react";
import type { CrouMenuItem } from "@/lib/data";

const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
const meals = ["Petit-déjeuner", "Déjeuner", "Dîner"];

export function MenuContent({ items }: { items: CrouMenuItem[] }) {
  const todayIndex = (new Date().getDay() + 6) % 7;
  const [activeDay, setActiveDay] = useState(days[todayIndex]);

  const dayItems = useMemo(() => items.filter((i) => i.day === activeDay), [items, activeDay]);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-medical-50 to-white">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-medical-400/20 blur-3xl" />
        <div className="container-page relative py-20 lg:py-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <span className="inline-flex items-center rounded-full bg-medical-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-medical-600">
              CROU San Pedro
            </span>
            <h1 className="mt-5 text-balance text-4xl font-bold leading-[1.1] text-navy-900 lg:text-5xl">
              Restaurant Universitaire
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-navy-900/70">
              Le programme de la semaine au restaurant universitaire du CROU — petit-déjeuner, déjeuner et dîner.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="mb-10 flex flex-wrap gap-2">
          {days.map((d) => (
            <button
              key={d}
              onClick={() => setActiveDay(d)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeDay === d ? "bg-medical-600 text-white" : "border border-medical-100 bg-white text-navy-900/70 hover:border-medical-300"
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          {meals.map((meal) => {
            const mealItems = dayItems.filter((i) => i.meal === meal);
            return (
              <div key={meal} className="rounded-2xl border border-medical-100 bg-white p-6">
                <div className="mb-4 flex items-center gap-2.5 text-navy-900">
                  <UtensilsCrossed className="h-5 w-5 text-medical-600" />
                  <h3 className="text-base font-bold">{meal}</h3>
                </div>
                {mealItems.length === 0 ? (
                  <p className="text-sm text-navy-900/40">Non renseigné.</p>
                ) : (
                  <ul className="flex flex-col gap-2">
                    {mealItems.map((i) => (
                      <li key={i.id} className="text-sm text-navy-900/80">{i.dish}</li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

