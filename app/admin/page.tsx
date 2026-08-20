"use client";

import { useEffect, useRef, useState } from "react";
import { Trash2, Lock, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  checkAdminPassword,
  fetchAdminData,
  addNewsItem,
  deleteNewsItem,
  addCalendarEvent,
  deleteCalendarEvent,
  addTeacher,
  deleteTeacher,
  addGovernanceRow,
  deleteGovernanceRow,
  addCourseFile,
  deleteCourseFile,
  addFaqItem,
  deleteFaqItem,
} from "./actions";

type NewsRow = { id: string; type: string; text: string };
type EventRow = { id: string; event_date: string; end_date: string | null; label: string; level: string; category: string };
type TeacherRow = { id: string; name: string; grade: string; discipline: string; service: string; email: string };
type GovRow = { id: string; role: string; name: string; position: number };
type CourseRow = { id: string; level: string; ue: string; module: string; title: string; file_url: string };
type FaqRow = { id: string; category: string; question: string; answer: string; position: number };

const levels = ["Licence 1", "Licence 2", "Licence 3", "Doctorat 1", "Doctorat 2", "Internat"];
const categories = [
  { value: "rentree", label: "Rentrée" },
  { value: "stage", label: "Stage" },
  { value: "examen", label: "Examen" },
  { value: "conge", label: "Congé" },
];
const faqCategories = ["UFR & Admission", "Vie universitaire & Campus", "CROU (Logement & Restauration)", "EPHR (Stages)", "Ville de San Pedro"];

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [actionError, setActionError] = useState("");
  const [uploading, setUploading] = useState(false);

  const [news, setNews] = useState<NewsRow[]>([]);
  const [events, setEvents] = useState<EventRow[]>([]);
  const [teachers, setTeachers] = useState<TeacherRow[]>([]);
  const [governance, setGovernance] = useState<GovRow[]>([]);
  const [courses, setCourses] = useState<CourseRow[]>([]);
  const [faqs, setFaqs] = useState<FaqRow[]>([]);

  const [newsType, setNewsType] = useState("info");
  const [newsText, setNewsText] = useState("");

  const [eventDate, setEventDate] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");
  const [eventLabel, setEventLabel] = useState("");
  const [eventLevel, setEventLevel] = useState("Toutes");
  const [eventCategory, setEventCategory] = useState("rentree");

  const [tName, setTName] = useState("");
  const [tGrade, setTGrade] = useState("Assistant");
  const [tDiscipline, setTDiscipline] = useState("");
  const [tService, setTService] = useState("");
  const [tEmail, setTEmail] = useState("");

  const [gRole, setGRole] = useState("");
  const [gName, setGName] = useState("");
  const [gPosition, setGPosition] = useState("0");

  const [cLevel, setCLevel] = useState(levels[0]);
  const [cUe, setCUe] = useState("");
  const [cModule, setCModule] = useState("");
  const [cTitle, setCTitle] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [fCategory, setFCategory] = useState(faqCategories[0]);
  const [fQuestion, setFQuestion] = useState("");
  const [fAnswer, setFAnswer] = useState("");
  const [fPosition, setFPosition] = useState("0");

  async function loadData() {
    setLoading(true);
    const data = await fetchAdminData();
    setNews(data.news as NewsRow[]);
    setEvents(data.events as EventRow[]);
    setTeachers(data.teachers as TeacherRow[]);
    setGovernance(data.governance as GovRow[]);
    setCourses(data.courses as CourseRow[]);
    setFaqs(data.faq as FaqRow[]);
    setLoading(false);
  }

  useEffect(() => {
    if (sessionStorage.getItem("admin_ok") === "1") {
      setAuthed(true);
      loadData();
    }
  }, []);

  async function handleLogin() {
    const ok = await checkAdminPassword(password);
    if (ok) {
      sessionStorage.setItem("admin_ok", "1");
      setAuthed(true);
      loadData();
    } else {
      setError("Mot de passe incorrect");
    }
  }

  async function handleAddNews() {
    if (!newsText.trim()) return;
    setActionError("");
    const res = await addNewsItem(newsType, newsText);
    if (res?.error) return setActionError(res.error);
    setNewsText("");
    loadData();
  }

  async function handleAddEvent() {
    if (!eventDate || !eventLabel.trim()) return;
    setActionError("");
    const res = await addCalendarEvent(eventDate, eventEndDate, eventLabel, eventLevel, eventCategory);
    if (res?.error) return setActionError(res.error);
    setEventLabel(""); setEventDate(""); setEventEndDate("");
    loadData();
  }

  async function handleAddTeacher() {
    if (!tName.trim() || !tDiscipline.trim()) return;
    setActionError("");
    const res = await addTeacher(tName, tGrade, tDiscipline, tService, tEmail);
    if (res?.error) return setActionError(res.error);
    setTName(""); setTDiscipline(""); setTService(""); setTEmail("");
    loadData();
  }

  async function handleAddGovernance() {
    if (!gRole.trim() || !gName.trim()) return;
    setActionError("");
    const res = await addGovernanceRow(gRole, gName, parseInt(gPosition || "0", 10));
    if (res?.error) return setActionError(res.error);
    setGRole(""); setGName(""); setGPosition("0");
    loadData();
  }

  async function handleAddCourse() {
    const file = fileInputRef.current?.files?.[0];
    if (!cUe.trim() || !cModule.trim() || !cTitle.trim() || !file) {
      setActionError("Remplis tous les champs et choisis un fichier");
      return;
    }
    setActionError("");
    setUploading(true);
    const formData = new FormData();
    formData.append("level", cLevel);
    formData.append("ue", cUe);
    formData.append("module", cModule);
    formData.append("title", cTitle);
    formData.append("file", file);
    const res = await addCourseFile(formData);
    setUploading(false);
    if (res?.error) return setActionError(res.error);
    setCUe(""); setCModule(""); setCTitle("");
    if (fileInputRef.current) fileInputRef.current.value = "";
    loadData();
  }

  async function handleAddFaq() {
    if (!fQuestion.trim() || !fAnswer.trim()) return;
    setActionError("");
    const res = await addFaqItem(fCategory, fQuestion, fAnswer, parseInt(fPosition || "0", 10));
    if (res?.error) return setActionError(res.error);
    setFQuestion(""); setFAnswer(""); setFPosition("0");
    loadData();
  }

  if (!authed) {
    return (
      <div className="container-page flex min-h-[70vh] items-center justify-center">
        <div className="w-full max-w-sm rounded-2xl border border-medical-100 bg-white p-8 shadow-lg">
          <div className="mb-6 flex items-center gap-2 text-navy-900">
            <Lock className="h-5 w-5 text-medical-600" />
            <h1 className="text-lg font-bold">Accès administrateur</h1>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            className="mb-3 w-full rounded-lg border border-navy-900/15 px-4 py-2.5 text-sm outline-none focus:border-medical-500"
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />
          {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
          <Button onClick={handleLogin} className="w-full">Se connecter</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page py-14">
      <h1 className="mb-6 text-3xl font-bold text-navy-900">Dashboard</h1>

      {loading && <p className="mb-6 text-sm text-navy-900/50">Chargement...</p>}
      {actionError && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          Erreur : {actionError}
        </div>
      )}

      {/* NEWS */}
      <section className="mb-10 rounded-2xl border border-medical-100 bg-white p-7">
        <h2 className="mb-5 text-xl font-bold text-navy-900">Actualités (bandeau + accueil)</h2>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          <select value={newsType} onChange={(e) => setNewsType(e.target.value)} className="rounded-lg border border-navy-900/15 px-3 py-2.5 text-sm">
            <option value="info">Info</option>
            <option value="academique">Académique</option>
            <option value="urgent">Urgent</option>
          </select>
          <input value={newsText} onChange={(e) => setNewsText(e.target.value)} placeholder="Texte de l'actualité" className="flex-1 rounded-lg border border-navy-900/15 px-4 py-2.5 text-sm outline-none focus:border-medical-500" />
          <Button onClick={handleAddNews}>Ajouter</Button>
        </div>
        <ul className="flex flex-col divide-y divide-navy-900/10">
          {news.map((n) => (
            <li key={n.id} className="flex items-center justify-between gap-4 py-3">
              <div><span className="mr-2 rounded-full bg-medical-50 px-2 py-0.5 text-[11px] font-semibold uppercase text-medical-600">{n.type}</span><span className="text-sm text-navy-900/85">{n.text}</span></div>
              <button onClick={() => deleteNewsItem(n.id).then(loadData)} className="text-red-500 hover:text-red-700"><Trash2 className="h-4 w-4" /></button>
            </li>
          ))}
          {news.length === 0 && <p className="py-3 text-sm text-navy-900/40">Aucune actualité.</p>}
        </ul>
      </section>

      {/* CALENDAR */}
      <section className="mb-10 rounded-2xl border border-medical-100 bg-white p-7">
        <h2 className="mb-5 text-xl font-bold text-navy-900">Calendrier universitaire</h2>
        <div className="mb-6 grid gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs text-navy-900/50">Date de début</label>
            <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} className="w-full rounded-lg border border-navy-900/15 px-3 py-2.5 text-sm" />
          </div>
          <div>
            <label className="mb-1 block text-xs text-navy-900/50">Date de fin (optionnel)</label>
            <input type="date" value={eventEndDate} onChange={(e) => setEventEndDate(e.target.value)} className="w-full rounded-lg border border-navy-900/15 px-3 py-2.5 text-sm" />
          </div>
          <input value={eventLabel} onChange={(e) => setEventLabel(e.target.value)} placeholder="Libellé de l'événement" className="rounded-lg border border-navy-900/15 px-4 py-2.5 text-sm outline-none focus:border-medical-500 sm:col-span-2" />
          <select value={eventLevel} onChange={(e) => setEventLevel(e.target.value)} className="rounded-lg border border-navy-900/15 px-3 py-2.5 text-sm">
            <option>Toutes</option>
            {levels.map((l) => <option key={l}>{l}</option>)}
          </select>
          <select value={eventCategory} onChange={(e) => setEventCategory(e.target.value)} className="rounded-lg border border-navy-900/15 px-3 py-2.5 text-sm">
            {categories.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
          <Button onClick={handleAddEvent} className="sm:col-span-2">Ajouter</Button>
        </div>
        <ul className="flex flex-col divide-y divide-navy-900/10">
          {events.map((e) => (
            <li key={e.id} className="flex items-center justify-between gap-4 py-3">
              <div>
                <span className="mr-3 text-xs font-semibold text-navy-900/50">{e.event_date}{e.end_date ? ` → ${e.end_date}` : ""}</span>
                <span className="text-sm text-navy-900/85">{e.label}</span>
                <span className="ml-2 text-xs text-medical-600">({e.level} — {e.category})</span>
              </div>
              <button onClick={() => deleteCalendarEvent(e.id).then(loadData)} className="text-red-500 hover:text-red-700"><Trash2 className="h-4 w-4" /></button>
            </li>
          ))}
          {events.length === 0 && <p className="py-3 text-sm text-navy-900/40">Aucun événement.</p>}
        </ul>
      </section>

      {/* GOUVERNANCE */}
      <section className="mb-10 rounded-2xl border border-medical-100 bg-white p-7">
        <h2 className="mb-5 text-xl font-bold text-navy-900">Gouvernance (page UFR)</h2>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          <input value={gRole} onChange={(e) => setGRole(e.target.value)} placeholder="Fonction" className="flex-1 rounded-lg border border-navy-900/15 px-4 py-2.5 text-sm outline-none focus:border-medical-500" />
          <input value={gName} onChange={(e) => setGName(e.target.value)} placeholder="Nom" className="flex-1 rounded-lg border border-navy-900/15 px-4 py-2.5 text-sm outline-none focus:border-medical-500" />
          <input type="number" value={gPosition} onChange={(e) => setGPosition(e.target.value)} placeholder="Ordre" className="w-24 rounded-lg border border-navy-900/15 px-3 py-2.5 text-sm" />
          <Button onClick={handleAddGovernance}>Ajouter</Button>
        </div>
        <ul className="flex flex-col divide-y divide-navy-900/10">
          {governance.map((g) => (
            <li key={g.id} className="flex items-center justify-between gap-4 py-3">
              <div><span className="text-sm font-medium text-navy-900">{g.role}</span><span className="ml-3 text-sm text-navy-900/60">{g.name}</span></div>
              <button onClick={() => deleteGovernanceRow(g.id).then(loadData)} className="text-red-500 hover:text-red-700"><Trash2 className="h-4 w-4" /></button>
            </li>
          ))}
          {governance.length === 0 && <p className="py-3 text-sm text-navy-900/40">Aucune ligne de gouvernance.</p>}
        </ul>
      </section>

      {/* TEACHERS */}
      <section className="mb-10 rounded-2xl border border-medical-100 bg-white p-7">
        <h2 className="mb-5 text-xl font-bold text-navy-900">Corps Enseignant (page UFR)</h2>
        <div className="mb-6 grid gap-3 sm:grid-cols-2">
          <input value={tName} onChange={(e) => setTName(e.target.value)} placeholder="Nom complet" className="rounded-lg border border-navy-900/15 px-4 py-2.5 text-sm outline-none focus:border-medical-500" />
          <select value={tGrade} onChange={(e) => setTGrade(e.target.value)} className="rounded-lg border border-navy-900/15 px-3 py-2.5 text-sm">
            <option>Professeur Titulaire</option>
            <option>Maître de Conférences</option>
            <option>Maître-Assistant</option>
            <option>Assistant</option>
          </select>
          <input value={tDiscipline} onChange={(e) => setTDiscipline(e.target.value)} placeholder="Discipline" className="rounded-lg border border-navy-900/15 px-4 py-2.5 text-sm outline-none focus:border-medical-500" />
          <input value={tService} onChange={(e) => setTService(e.target.value)} placeholder="Service" className="rounded-lg border border-navy-900/15 px-4 py-2.5 text-sm outline-none focus:border-medical-500" />
          <input value={tEmail} onChange={(e) => setTEmail(e.target.value)} placeholder="Email" className="rounded-lg border border-navy-900/15 px-4 py-2.5 text-sm outline-none focus:border-medical-500 sm:col-span-2" />
          <Button onClick={handleAddTeacher} className="sm:col-span-2">Ajouter</Button>
        </div>
        <ul className="flex flex-col divide-y divide-navy-900/10">
          {teachers.map((t) => (
            <li key={t.id} className="flex items-center justify-between gap-4 py-3">
              <div><span className="text-sm font-medium text-navy-900">{t.name}</span><span className="ml-2 text-xs text-navy-900/50">— {t.grade}, {t.discipline}</span></div>
              <button onClick={() => deleteTeacher(t.id).then(loadData)} className="text-red-500 hover:text-red-700"><Trash2 className="h-4 w-4" /></button>
            </li>
          ))}
          {teachers.length === 0 && <p className="py-3 text-sm text-navy-900/40">Aucun enseignant.</p>}
        </ul>
      </section>

      {/* COURSES */}
      <section className="mb-10 rounded-2xl border border-medical-100 bg-white p-7">
        <h2 className="mb-5 text-xl font-bold text-navy-900">Banque de cours (Espace Étudiant)</h2>
        <div className="mb-6 grid gap-3 sm:grid-cols-2">
          <select value={cLevel} onChange={(e) => setCLevel(e.target.value)} className="rounded-lg border border-navy-900/15 px-3 py-2.5 text-sm">
            {levels.map((l) => <option key={l}>{l}</option>)}
          </select>
          <input value={cUe} onChange={(e) => setCUe(e.target.value)} placeholder="UE" className="rounded-lg border border-navy-900/15 px-4 py-2.5 text-sm outline-none focus:border-medical-500" />
          <input value={cModule} onChange={(e) => setCModule(e.target.value)} placeholder="Module" className="rounded-lg border border-navy-900/15 px-4 py-2.5 text-sm outline-none focus:border-medical-500" />
          <input value={cTitle} onChange={(e) => setCTitle(e.target.value)} placeholder="Titre du fichier" className="rounded-lg border border-navy-900/15 px-4 py-2.5 text-sm outline-none focus:border-medical-500" />
          <input ref={fileInputRef} type="file" accept=".pdf,.ppt,.pptx" className="rounded-lg border border-navy-900/15 px-3 py-2.5 text-sm sm:col-span-2" />
          <Button onClick={handleAddCourse} disabled={uploading} className="sm:col-span-2">
            <Upload className="h-4 w-4" /> {uploading ? "Envoi en cours..." : "Ajouter le fichier"}
          </Button>
        </div>
        <ul className="flex flex-col divide-y divide-navy-900/10">
          {courses.map((c) => (
            <li key={c.id} className="flex items-center justify-between gap-4 py-3">
              <div><span className="text-sm font-medium text-navy-900">{c.title}</span><span className="ml-2 text-xs text-navy-900/50">— {c.level} / {c.ue} / {c.module}</span></div>
              <button onClick={() => deleteCourseFile(c.id).then(loadData)} className="text-red-500 hover:text-red-700"><Trash2 className="h-4 w-4" /></button>
            </li>
          ))}
          {courses.length === 0 && <p className="py-3 text-sm text-navy-900/40">Aucun cours ajouté.</p>}
        </ul>
      </section>

      {/* FAQ */}
      <section className="rounded-2xl border border-medical-100 bg-white p-7">
        <h2 className="mb-5 text-xl font-bold text-navy-900">FAQ (futurs étudiants)</h2>
        <div className="mb-6 grid gap-3">
          <select value={fCategory} onChange={(e) => setFCategory(e.target.value)} className="rounded-lg border border-navy-900/15 px-3 py-2.5 text-sm">
            {faqCategories.map((c) => <option key={c}>{c}</option>)}
          </select>
          <input value={fQuestion} onChange={(e) => setFQuestion(e.target.value)} placeholder="Question" className="rounded-lg border border-navy-900/15 px-4 py-2.5 text-sm outline-none focus:border-medical-500" />
          <textarea value={fAnswer} onChange={(e) => setFAnswer(e.target.value)} placeholder="Réponse" rows={3} className="rounded-lg border border-navy-900/15 px-4 py-2.5 text-sm outline-none focus:border-medical-500" />
          <input type="number" value={fPosition} onChange={(e) => setFPosition(e.target.value)} placeholder="Ordre dans la catégorie" className="w-40 rounded-lg border border-navy-900/15 px-3 py-2.5 text-sm" />
          <Button onClick={handleAddFaq}>Ajouter</Button>
        </div>
        <ul className="flex flex-col divide-y divide-navy-900/10">
          {faqs.map((f) => (
            <li key={f.id} className="flex items-start justify-between gap-4 py-3">
              <div>
                <span className="mr-2 rounded-full bg-medical-50 px-2 py-0.5 text-[11px] font-semibold text-medical-600">{f.category}</span>
                <p className="mt-1 text-sm font-medium text-navy-900">{f.question}</p>
                <p className="mt-0.5 text-xs text-navy-900/50">{f.answer}</p>
              </div>
              <button onClick={() => deleteFaqItem(f.id).then(loadData)} className="shrink-0 text-red-500 hover:text-red-700"><Trash2 className="h-4 w-4" /></button>
            </li>
          ))}
          {faqs.length === 0 && <p className="py-3 text-sm text-navy-900/40">Aucune question.</p>}
        </ul>
      </section>
    </div>
  );
}
