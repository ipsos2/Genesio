import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-medical-100 bg-medical-50">
      <div className="container-page grid gap-10 py-14 lg:grid-cols-3">
        <div>
          <p className="text-base font-bold text-navy-900">UFR Sciences de la Santé</p>
          <p className="mt-2 text-sm text-navy-900/60">
            Université Polytechnique de San Pedro — San Pedro, Côte d&rsquo;Ivoire
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-navy-900">Navigation</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-navy-900/60">
            <Link href="/ufr-sciences-de-la-sante" className="hover:text-medical-600">UFR Sciences de la Santé</Link>
            <Link href="/ephr-san-pedro" className="hover:text-medical-600">EPHR de San Pedro</Link>
            <Link href="/calendrier-universitaire" className="hover:text-medical-600">Calendrier Universitaire</Link>
            <Link href="/espace-etudiant" className="hover:text-medical-600">Espace Étudiant</Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-navy-900">Promotion Genèse</p>
          <p className="mt-3 text-sm text-navy-900/60">Doctorat en Médecine, D1 — 34 étudiants</p>
        </div>
      </div>
      <div className="border-t border-medical-100 py-5 text-center text-xs text-navy-900/40">
        © {new Date().getFullYear()} UFR Sciences de la Santé · UPSP. Tous droits réservés.
      </div>
    </footer>
  );
}
