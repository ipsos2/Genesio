import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { fetchNewsItems } from "@/lib/data";

export const metadata: Metadata = {
  title: "UFR Sciences de la Santé — Université Polytechnique de San Pedro",
  description:
    "Portail officiel de l'UFR Sciences de la Santé, Université Polytechnique de San Pedro : UFR, EPHR, calendrier universitaire et espace étudiant.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const news = await fetchNewsItems();
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <SiteHeader newsItems={news} />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
