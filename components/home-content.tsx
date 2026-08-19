"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Stethoscope,
  Scissors,
  Baby,
  HeartPulse,
  CalendarDays,
  Newspaper,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { NewsItem, CalendarEvent } from "@/lib/data";

const services = [
  { href: "/ephr-san-pedro/medecine", title: "Médecine", desc: "Consultations et prise en charge médicale générale.", icon: Stethoscope },
  { href: "/ephr-san-pedro/chirurgie", title: "Chirurgie", desc: "Interventions chirurgicales et suivi post-opératoire.", icon: Scissors },
  { href: "/ephr-san-pedro/pediatrie-medicale", title: "Pédiatrie Médicale", desc: "Prise en charge médicale de l'enfant et du nourrisson.", icon: Baby },
  { href: "/ephr-san-pedro/gynecologie-obstetrique", title: "Gynécologie-Obstétrique", desc: "Suivi de grossesse, accouchement et santé de la femme.", icon: HeartPulse },
];

const toneClasses: Record<string, string> = {
  academique: "bg-navy-100 text-navy-900",
  info: "bg-medical-50 text-medical-600",
  urgent: "bg-red-50 text-red-600",
};

function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "short" });
}

export function HomeContent({ news, events }: { news: NewsItem[]; events: CalendarEvent[] }) {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-medical-50 to-white">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-medical-400/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-navy-900/10 blur-3xl" />

        <div className="container-page relative py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center rounded-full bg-medical-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-medical-600">
              Portail officiel des étudiants
            </span>
            <h1 className="mt-6 text-balance text-4xl font-bold leading-[1.08] text-navy-900 lg:text-6xl">
              L&rsquo;excellence médicale s&rsquo;enseigne à l&rsquo;UFR Sciences de la Santé de San Pedro.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-navy-900/70">
              Le portail académique de référence de l&rsquo;Université Polytechnique de San Pedro : formation médicale,
              établissement hospitalier de référence, calendrier universitaire et ressources pédagogiques réunis en un
              seul lieu.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/ufr-sciences-de-la-sante">
                <Button variant="primary" size="lg">
                  Explorer l&rsquo;UFR <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/espace-etudiant">
                <Button variant="outline" size="lg">Accéder aux Cours</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="container-page py-20 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-medical-600">EPHR de San Pedro</p>
            <h2 className="mt-2 text-3xl font-bold text-navy-900">Services cliniques</h2>
          </div>
          <Link href="/ephr-san-pedro" className="inline-flex items-center gap-1.5 text-sm font-semibold text-medical-600 hover:text-medical-500">
            Voir l&rsquo;établissement <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <motion.div key={s.href} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}>
              <Link href={s.href} className="group flex h-full flex-col rounded-2xl border border-navy-900/10 bg-white p-6 transition-all hover:-translate-y-1 hover:border-medical-500/40 hover:shadow-xl hover:shadow-medical-500/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-medical-50 text-medical-600">
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-navy-900">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm text-navy-900/60">{s.desc}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-medical-600">
                  Découvrir <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ACTUALITES + CALENDRIER */}
      <section className="bg-medical-50/40 py-20 lg:py-28">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="rounded-2xl border border-medical-100 bg-white p-8">
            <div className="mb-6 flex items-center gap-2.5 text-navy-900">
              <Newspaper className="h-5 w-5 text-medical-600" />
              <h3 className="text-lg font-bold">Dernières actualités</h3>
            </div>
            <ul className="flex flex-col divide-y divide-navy-900/10">
              {news.map((n) => (
                <li key={n.id} className="flex items-start gap-4 py-3.5">
                  <span className="mt-0.5 shrink-0 text-xs font-semibold text-navy-900/50">{formatDate(n.created_at)}</span>
                  <span className={n.type === "urgent" ? "text-sm font-semibold text-red-600" : "text-sm text-navy-900/85"}>{n.text}</span>
                </li>
              ))}
              {news.length === 0 && <p className="py-3 text-sm text-navy-900/40">Aucune actualité pour le moment.</p>}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="rounded-2xl border border-medical-100 bg-white p-8">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-navy-900">
                <CalendarDays className="h-5 w-5 text-medical-600" />
                <h3 className="text-lg font-bold">Prochaines dates</h3>
              </div>
              <Link href="/calendrier-universitaire" className="text-sm font-semibold text-medical-600 hover:text-medical-500">Tout voir</Link>
            </div>
            <ul className="flex flex-col divide-y divide-navy-900/10">
              {events.map((c) => (
                <li key={c.id} className="flex items-center justify-between gap-4 py-3.5">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-semibold text-navy-900/50">{formatDate(c.event_date)}</span>
                    <span className="text-sm text-navy-900/85">{c.label}</span>
                  </div>
                  <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${toneClasses[c.tone]}`}>
                    {c.tone === "academique" ? "Académique" : c.tone === "urgent" ? "Examen" : "Info"}
                  </span>
                </li>
              ))}
              {events.length === 0 && <p className="py-3 text-sm text-navy-900/40">Aucun événement pour le moment.</p>}
            </ul>
          </motion.div>
        </div>
      </section>
    </>
  );
}
