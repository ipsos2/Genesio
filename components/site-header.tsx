"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { NewsTicker, type NewsItem } from "@/components/news-ticker";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/ufr-sciences-de-la-sante", label: "UFR Sciences de la Santé" },
  { href: "/ephr-san-pedro", label: "EPHR de San Pedro" },
  { href: "/calendrier-universitaire", label: "Calendrier Universitaire" },
  { href: "/faq", label: "FAQ" },
];



export function SiteHeader({ newsItems }: { newsItems: NewsItem[] }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur">
      <div className="border-b border-medical-100 bg-medical-50 py-1.5 text-center text-[11px] font-medium uppercase tracking-wider text-medical-700">
        République de Côte d&rsquo;Ivoire — Union · Discipline · Travail
      </div>

      <NewsTicker items={newsItems} />

      <div className="container-page flex items-center justify-between border-b border-medical-100 py-3.5">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo-usp.PNG" alt="Logo UPSP" width={42} height={42} className="object-contain" />
          <div className="leading-tight">
            <p className="text-sm font-bold text-navy-900">UFR Sciences de la Santé</p>
            <p className="text-[11px] text-navy-900/50">Université Polytechnique de San Pedro</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-navy-900/75 transition-colors hover:bg-medical-50 hover:text-medical-600"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <Link href="/espace-etudiant">
            <Button variant="primary" size="default">Espace Étudiant</Button>
          </Link>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full text-navy-900 lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Ouvrir le menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-b border-medical-100 bg-white px-6 pb-6 lg:hidden">
          <nav className="flex flex-col gap-1 pt-2">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-navy-900 hover:bg-medical-50"
              >
                {l.label}
              </Link>
            ))}
            <Link href="/espace-etudiant" onClick={() => setOpen(false)} className="mt-3">
              <Button variant="primary" className="w-full">Espace Étudiant</Button>
            </Link>
            <div className="mt-3 flex justify-center">
              <ThemeToggle />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
