"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Stethoscope, Scissors, Baby, HeartPulse, MapPin, Users, Building2, Activity } from "lucide-react";

const services = [
  { href: "/ephr-san-pedro/medecine", title: "Médecine", desc: "Consultations et prise en charge médicale générale.", icon: Stethoscope },
  { href: "/ephr-san-pedro/chirurgie", title: "Chirurgie", desc: "Interventions chirurgicales et suivi post-opératoire.", icon: Scissors },
  { href: "/ephr-san-pedro/pediatrie-medicale", title: "Pédiatrie Médicale", desc: "Prise en charge médicale de l'enfant et du nourrisson.", icon: Baby },
  { href: "/ephr-san-pedro/gynecologie-obstetrique", title: "Gynécologie-Obstétrique", desc: "Suivi de grossesse, accouchement et santé de la femme.", icon: HeartPulse },
];

const stats = [
  { icon: Building2, label: "Établissement public régional" },
  { icon: Users, label: "Terrain de stage — UFR Sciences de la Santé" },
  { icon: Activity, label: "4 services cliniques principaux" },
  { icon: MapPin, label: "San Pedro, Côte d'Ivoire" },
];

export default function EphrPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-medical-50 to-white">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-medical-400/20 blur-3xl" />
        <div className="container-page relative py-20 lg:py-28">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <span className="inline-flex items-center rounded-full bg-medical-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-medical-600">
              Établissement Public Hospitalier Régional
            </span>
            <h1 className="mt-6 text-balance text-4xl font-bold leading-[1.1] text-navy-900 lg:text-5xl">
              EPHR de San Pedro
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-navy-900/70">
              Établissement de référence pour la prise en charge sanitaire de la région de San Pedro, et terrain de
              stage privilégié des étudiants de l&rsquo;UFR Sciences de la Santé — Université Polytechnique de San Pedro.
            </p>
          </motion.div>
        </div>
      </section>

      {/* STATS RAPIDES */}
      <section className="container-page -mt-6 relative z-10 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid gap-4 rounded-2xl border border-medical-100 bg-white p-6 shadow-sm sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-medical-50 text-medical-600">
                <s.icon className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium text-navy-900/80">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* PRESENTATION */}
      <section className="bg-medical-50/40 py-16 lg:py-20">
        <div className="container-page">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-medical-600">Présentation</p>
            <h2 className="mt-3 text-3xl font-bold text-navy-900">Un établissement de référence pour la région</h2>
            <p className="mt-5 leading-relaxed text-navy-900/70">
              L&rsquo;EPHR de San Pedro assure la prise en charge médicale, chirurgicale et obstétricale des populations
              de la région, tout en accueillant les étudiants en médecine de l&rsquo;UFR Sciences de la Santé pour leurs
              stages hospitaliers. L&rsquo;établissement s&rsquo;organise autour de quatre services cliniques principaux,
              chacun assurant à la fois les soins courants et l&rsquo;encadrement pédagogique des stagiaires.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="container-page py-16 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-medical-600">Nos services</p>
          <h2 className="mt-2 text-3xl font-bold text-navy-900">Quatre services cliniques</h2>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2">
          {services.map((s, i) => (
            <motion.div key={s.href} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <Link
                href={s.href}
                className="group flex h-full flex-col rounded-2xl border border-medical-100 bg-white p-7 transition-all hover:-translate-y-1 hover:border-medical-500/40 hover:shadow-xl hover:shadow-medical-500/10"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-medical-50 text-medical-600">
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-navy-900">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm text-navy-900/60">{s.desc}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-medical-600">
                  Voir le service <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
