"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ClipboardList, Users2, type LucideIcon } from "lucide-react";

type ServicePageProps = {
  title: string;
  tag: string;
  icon: LucideIcon;
  intro: string;
  activities: string[];
  stageOrg: string;
  integrationSteps: string[];
};

export function ServicePage({ title, tag, icon: Icon, intro, activities, stageOrg, integrationSteps }: ServicePageProps) {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-medical-50 to-white">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-medical-400/20 blur-3xl" />
        <div className="container-page relative py-20 lg:py-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-medical-50 text-medical-600">
              <Icon className="h-7 w-7" />
            </div>
            <span className="inline-flex items-center rounded-full bg-medical-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-medical-600">
              {tag}
            </span>
            <h1 className="mt-5 text-balance text-4xl font-bold leading-[1.1] text-navy-900 lg:text-5xl">{title}</h1>
            <p className="mt-6 max-w-2xl text-lg text-navy-900/70">{intro}</p>
          </motion.div>
        </div>
      </section>

      {/* ACTIVITES */}
      <section className="container-page py-16 lg:py-20">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-medical-600">Activités cliniques</p>
          <h2 className="mt-2 text-2xl font-bold text-navy-900">Ce qui est pris en charge dans ce service</h2>
        </motion.div>
        <div className="grid gap-4 sm:grid-cols-2">
          {activities.map((a, i) => (
            <motion.div
              key={a}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-start gap-3 rounded-xl border border-medical-100 bg-white p-4"
            >
              <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-medical-600" />
              <span className="text-sm text-navy-900/80">{a}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* STAGES */}
      <section className="bg-medical-50/40 py-16 lg:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-2xl border border-medical-100 bg-white p-8">
            <div className="mb-4 flex items-center gap-2.5 text-navy-900">
              <Users2 className="h-5 w-5 text-medical-600" />
              <h3 className="text-lg font-bold">Organisation des stages</h3>
            </div>
            <p className="text-sm leading-relaxed text-navy-900/70">{stageOrg}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="rounded-2xl border border-medical-100 bg-white p-8">
            <div className="mb-4 flex items-center gap-2.5 text-navy-900">
              <ClipboardList className="h-5 w-5 text-medical-600" />
              <h3 className="text-lg font-bold">Guide d&rsquo;intégration du stagiaire</h3>
            </div>
            <ol className="flex flex-col gap-3">
              {integrationSteps.map((step, i) => (
                <li key={step} className="flex items-start gap-3 text-sm text-navy-900/80">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-medical-50 text-xs font-bold text-medical-600">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </motion.div>
        </div>
      </section>
    </>
  );
}
