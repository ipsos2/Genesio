import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-navy-900/10 bg-navy-900 text-white/80 dark:border-white/10">
      <div className="container-page grid gap-10 py-14 lg:grid-cols-3">
        <div>
          <p className="text-base font-bold text-white">UFR Sciences de la Santé</p>
          <p className="mt-2 text-sm text-white/60">
            Université Polytechnique de San Pedro — San Pedro, Côte d&rsquo;Ivoire
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Navigation</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-white/60">
            <Link href="/ufr-sciences-de-la-sante" className="hover:text-white">UFR Sciences de la Santé</Link>
            <Link href="/ephr-san-pedro" className="hover:text-white">EPHR de San Pedro</Link>
            <Link href="/calendrier-universitaire" className="hover:text-white">Calendrier Universitaire</Link>
            <Link href="/espace-etudiant" className="hover:text-white">Espace Étudiant</Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Promotion Genèse</p>
          <p className="mt-3 text-sm text-white/60">Doctorat en Médecine, D1 — 34 étudiants</p>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/40">
        © {new Date().getFullYear()} UFR Sciences de la Santé · UPSP. Tous droits réservés.
      </div>
    </footer>
  );
}
