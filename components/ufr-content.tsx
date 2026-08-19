"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, GraduationCap, Users, Target, ShieldCheck, Mail } from "lucide-react";
import type { Teacher, GovernanceRow } from "@/lib/data";

const values = [
  { icon: Target, title: "Excellence", desc: "Un enseignement médical exigeant, aligné sur les standards académiques internationaux." },
  { icon: ShieldCheck, title: "Rigueur", desc: "Une pratique clinique fondée sur l'évidence scientifique et la déontologie." },
  { icon: Users, title: "Humanisme", desc: "Le patient et l'étudiant au centre de toutes les décisions pédagogiques." },
  { icon: GraduationCap, title: "Innovation", desc: "Une formation qui s'adapte aux réalités sanitaires ivoiriennes et régionales." },
];

export function UfrContent({ teachers, governance }: { teachers: Teacher[]; governance: GovernanceRow[] }) {
  const [query, setQuery] = useState("");
  const [grade, setGrade] = useState("Tous les grades");
  const [discipline, setDiscipline] = useState("Toutes les disciplines");

  const grades = useMemo(() => ["Tous les grades", ...Array.from(new Set(teachers.map((t) => t.grade)))], [teachers]);
  const disciplines = useMemo(() => ["Toutes les disciplines", ...Array.from(new Set(teachers.map((t) => t.discipline)))], [teachers]);

  const filtered = useMemo(() => {
    return teachers.filter((t) => {
      const matchQuery = t.name.toLowerCase().includes(query.toLowerCase());
      const matchGrade = grade === "Tous les grades" || t.grade === grade;
      const matchDiscipline = discipline === "Toutes les disciplines" || t.discipline === discipline;
      return matchQuery && matchGrade && matchDiscipline;
    });
  }, [teachers, query, grade, discipline]);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-medical-50 to-white">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-medical-400/20 blur-3xl" />
        <div className="container-page relative py-20 lg:py-28">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <span className="inline-flex items-center rounded-full bg-medical-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-medical-600">Faculté de Médecine</span>
            <h1 className="mt-6 text-balance text-4xl font-bold leading-[1.1] text-navy-900 lg:text-5xl">UFR Sciences de la Santé</h1>
            <p className="mt-6 max-w-2xl text-lg text-navy-900/70">
              Former des médecins rigoureux, humains et ancrés dans les réalités sanitaires de Côte d&rsquo;Ivoire —
              telle est la mission de l&rsquo;UFR Sciences de la Santé de l&rsquo;Université Polytechnique de San Pedro.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="container-page py-16 lg:py-20">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-2xl border border-medical-100 bg-medical-50/40 p-8 lg:p-12">
          <p className="text-xs font-semibold uppercase tracking-wider text-medical-600">Mot du Doyen</p>
          <p className="mt-4 max-w-3xl text-lg italic leading-relaxed text-navy-900/85">
            « Notre ambition est de bâtir, avec la première promotion de l&rsquo;UFR Sciences de la Santé, une tradition
            d&rsquo;excellence médicale au service de San Pedro et de la Côte d&rsquo;Ivoire. »
          </p>
          <p className="mt-5 text-sm font-semibold text-navy-900">Pr. Konan Emmanuel</p>
          <p className="text-xs text-navy-900/50">Doyen, UFR Sciences de la Santé</p>
        </motion.div>
      </section>

      <section className="bg-medical-50/40 py-16 lg:py-20">
        <div className="container-page">
          <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-3xl font-bold text-navy-900">Nos valeurs</motion.h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="rounded-2xl border border-medical-100 bg-white p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-medical-50 text-medical-600"><v.icon className="h-5 w-5" /></div>
                <h3 className="mt-4 text-base font-semibold text-navy-900">{v.title}</h3>
                <p className="mt-2 text-sm text-navy-900/60">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16 lg:py-20">
        <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-3xl font-bold text-navy-900">Organisation & Gouvernance</motion.h2>
        <div className="overflow-hidden rounded-2xl border border-medical-100">
          {governance.map((g, i) => (
            <div key={g.id} className={`flex items-center justify-between gap-4 px-6 py-4 ${i % 2 === 0 ? "bg-white" : "bg-medical-50/30"}`}>
              <span className="text-sm font-medium text-navy-900">{g.role}</span>
              <span className="text-sm text-navy-900/60">{g.name}</span>
            </div>
          ))}
          {governance.length === 0 && <p className="px-6 py-8 text-center text-sm text-navy-900/40">Informations à venir.</p>}
        </div>
      </section>

      <section className="bg-medical-50/40 py-16 lg:py-20">
        <div className="container-page">
          <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8 text-3xl font-bold text-navy-900">Annuaire du Corps Enseignant</motion.h2>

          <div className="mb-8 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-900/40" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Rechercher un nom..." className="w-full rounded-full border border-medical-100 bg-white py-2.5 pl-11 pr-4 text-sm outline-none focus:border-medical-500" />
            </div>
            <select value={grade} onChange={(e) => setGrade(e.target.value)} className="rounded-full border border-medical-100 bg-white px-4 py-2.5 text-sm">
              {grades.map((g) => <option key={g}>{g}</option>)}
            </select>
            <select value={discipline} onChange={(e) => setDiscipline(e.target.value)} className="rounded-full border border-medical-100 bg-white px-4 py-2.5 text-sm">
              {disciplines.map((d) => <option key={d}>{d}</option>)}
            </select>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((t, i) => (
              <motion.div key={t.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="rounded-2xl border border-medical-100 bg-white p-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-medical-50 text-lg font-bold text-medical-600">
                  {t.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                </div>
                <h3 className="mt-4 text-base font-semibold text-navy-900">{t.name}</h3>
                <p className="text-xs font-medium uppercase tracking-wide text-medical-600">{t.grade}</p>
                <p className="mt-1 text-sm text-navy-900/60">{t.discipline} — {t.service}</p>
                <div className="mt-4 flex items-center gap-2 text-xs text-navy-900/50"><Mail className="h-3.5 w-3.5" /> {t.email}</div>
              </motion.div>
            ))}
            {filtered.length === 0 && <p className="col-span-full py-10 text-center text-sm text-navy-900/40">Aucun résultat, ou aucun enseignant ajouté pour l&rsquo;instant.</p>}
          </div>
        </div>
      </section>
    </>
  );
}
