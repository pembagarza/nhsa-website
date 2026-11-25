import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Copy,
  Download,
  Pencil,
  Plus,
  RotateCcw,
  Trash2,
  X,
  CheckCircle2,
} from 'lucide-react';
import { CATEGORIES, type Course, type CourseCategory } from '@/data/courses';
import {
  useCourses,
  saveCourse,
  deleteCourse,
  resetToDefaults,
  courseToTsSnippet,
} from '@/lib/courseStore';

interface FormState {
  slug: string;
  title: string;
  category: CourseCategory;
  duration: string;
  hours: string;
  mode: string;
  overview: string;
  tagline: string;
  image: string;
  tags: string;
  learnItems: string;
  whoShouldJoin: string;
  outcomes: string;
}

const EMPTY: FormState = {
  slug: '',
  title: '',
  category: 'Caregiving & Elderly Care',
  duration: '',
  hours: '',
  mode: 'Practical Skill Development',
  overview: '',
  tagline: '',
  image: '',
  tags: '',
  learnItems: '',
  whoShouldJoin: '',
  outcomes: '',
};

const inputClass =
  'w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition-colors focus:border-teal-brand focus:ring-2 focus:ring-teal-brand/25';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function toFullCourse(f: FormState, existingFaqs: Course['faqs']): Course {
  return {
    slug: f.slug,
    title: f.title,
    category: f.category,
    duration: f.duration,
    hours: f.hours,
    mode: f.mode,
    overview: f.overview,
    tagline: f.tagline || undefined,
    image: f.image || undefined,
    tags: f.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean),
    learnItems: f.learnItems
      .split(/\n|,/)
      .map((s) => s.trim())
      .filter(Boolean),
    whoShouldJoin: f.whoShouldJoin || undefined,
    outcomes: f.outcomes
      .split(/\n|,/)
      .map((s) => s.trim())
      .filter(Boolean),
    faqs: existingFaqs,
  };
}

export default function CourseManagerPage() {
  const courses = useCourses();
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [notice, setNotice] = useState<string | null>(null);

  const allSnippets = useMemo(
    () => courses.map((c) => courseToTsSnippet(c)).join('\n'),
    [courses]
  );

  const set = (key: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const openNew = () => {
    setForm(EMPTY);
    setEditingSlug(null);
    setShowForm(true);
    setNotice(null);
  };

  const openEdit = (c: Course) => {
    setForm({
      slug: c.slug,
      title: c.title,
      category: c.category,
      duration: c.duration,
      hours: c.hours,
      mode: c.mode,
      overview: c.overview,
      tagline: c.tagline ?? '',
      image: c.image ?? '',
      tags: c.tags.join(', '),
      learnItems: (c.learnItems ?? []).join(', '),
      whoShouldJoin: c.whoShouldJoin ?? '',
      outcomes: c.outcomes.join(', '),
    });
    setEditingSlug(c.slug);
    setShowForm(true);
    setNotice(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const course = toFullCourse(form, courses.find((c) => c.slug === form.slug)?.faqs ?? []);
    saveCourse(course);
    setShowForm(false);
    setNotice(`Course "${course.title}" saved. It now appears across the site.`);
  };

  const handleDelete = (c: Course) => {
    if (!window.confirm(`Delete "${c.title}" from the course list?`)) return;
    deleteCourse(c.slug);
    setNotice(`Course "${c.title}" removed.`);
  };

  const handleReset = () => {
    if (!window.confirm('Reset to the default NHCSA courses? All added/edited courses will be removed.')) return;
    resetToDefaults();
    setNotice('Course list reset to NHCSA defaults.');
  };

  const handleDownload = () => {
    const content = `// Paste the entries below into the COURSES array in src/data/courses.ts\n\n${allSnippets}\n`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'courses-entries.ts';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(allSnippets);
      setNotice('All course entries copied — paste them into src/data/courses.ts in VS Code.');
    } catch {
      setNotice('Copy failed — use the Download button instead.');
    }
  };

  return (
    <div className="bg-surface">
      {/* Hero Banner */}
      <section className="course-photo relative isolate overflow-hidden">
        <img
          src="/images/hero-banner.jpg"
          alt="Nepal HealthCare Skills Academy training programmes in Dillibazar, Kathmandu"
          className="absolute inset-0 h-full w-full object-cover object-[60%_center] lg:object-[72%_35%]"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-br from-navy/88 via-navy/75 to-navy/50"
          aria-hidden
        />
        <div className="relative mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <span className="inline-block rounded-full border border-teal-300/40 bg-teal-brand/25 px-3.5 py-1 text-xs font-semibold text-white backdrop-blur">
                NHCSA Admin
              </span>
              <h1 className="mt-3 font-heading text-2xl font-extrabold text-white sm:text-3xl">
                Course Manager
              </h1>
              <p className="mt-1.5 text-sm text-slate-200">
                Add, edit or remove training programmes. Changes appear instantly across the site.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={openNew}
                className="flex items-center gap-2 rounded-lg bg-teal-brand px-5 py-2.5 font-heading text-sm font-bold text-white transition-colors hover:bg-white hover:text-navy"
              >
                <Plus className="h-4 w-4" /> Add Course
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur hover:bg-white/20"
              >
                <RotateCcw className="h-4 w-4" /> Reset
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        {notice && (
          <div className="mt-2 flex items-start gap-2 rounded-lg border border-teal-200 bg-teal-soft p-4 text-sm text-teal-800">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /> {notice}
            <button onClick={() => setNotice(null)} className="ml-auto" aria-label="Dismiss">
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {showForm && (
          <form
            onSubmit={handleSave}
            className="mt-8 rounded-2xl bg-white p-6 shadow-lg shadow-navy/5 sm:p-8"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-lg font-bold text-navy">
                {editingSlug ? `Edit: ${editingSlug}` : 'New Course'}
              </h2>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-surface"
                aria-label="Close form"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-semibold text-navy">
                Title *
                <input required className={`${inputClass} mt-1.5 font-normal`} value={form.title} onChange={set('title')} placeholder="Course title" />
              </label>
              <label className="text-sm font-semibold text-navy">
                Slug * <span className="font-normal text-slate-400">(URL: /courses/your-slug)</span>
                <input required pattern="[a-z0-9-]+" className={`${inputClass} mt-1.5 font-normal`} value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: slugify(e.target.value) }))} placeholder="course-slug" />
              </label>
              <label className="text-sm font-semibold text-navy">
                Category *
                <select className={`${inputClass} mt-1.5 font-normal`} value={form.category} onChange={set('category')}>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </label>
              <label className="text-sm font-semibold text-navy">
                Duration *
                <input required className={`${inputClass} mt-1.5 font-normal`} value={form.duration} onChange={set('duration')} placeholder="e.g. 5 Days" />
              </label>
              <label className="text-sm font-semibold text-navy">
                Total Hours *
                <input required className={`${inputClass} mt-1.5 font-normal`} value={form.hours} onChange={set('hours')} placeholder="e.g. 20 Hours" />
              </label>
              <label className="text-sm font-semibold text-navy">
                Training Mode *
                <input required className={`${inputClass} mt-1.5 font-normal`} value={form.mode} onChange={set('mode')} />
              </label>
              <label className="text-sm font-semibold text-navy sm:col-span-2">
                Tagline
                <input className={`${inputClass} mt-1.5 font-normal`} value={form.tagline} onChange={set('tagline')} placeholder="Short motivational line shown on cards" />
              </label>
              <label className="text-sm font-semibold text-navy sm:col-span-2">
                Image URL or path
                <input className={`${inputClass} mt-1.5 font-normal`} value={form.image} onChange={set('image')} placeholder="/images/my-course.jpg or https://…" />
              </label>
              <label className="text-sm font-semibold text-navy sm:col-span-2">
                Short Summary / Overview *
                <textarea required rows={3} className={`${inputClass} mt-1.5 font-normal`} value={form.overview} onChange={set('overview')} />
              </label>
              <label className="text-sm font-semibold text-navy sm:col-span-2">
                Learning Points <span className="font-normal text-slate-400">(comma or line separated)</span>
                <textarea rows={4} className={`${inputClass} mt-1.5 font-normal`} value={form.learnItems} onChange={set('learnItems')} placeholder="Hand Hygiene, PPE Awareness, Safe Disposal…" />
              </label>
              <label className="text-sm font-semibold text-navy">
                Who Should Join
                <textarea rows={3} className={`${inputClass} mt-1.5 font-normal`} value={form.whoShouldJoin} onChange={set('whoShouldJoin')} />
              </label>
              <label className="text-sm font-semibold text-navy">
                Outcomes <span className="font-normal text-slate-400">(comma or line separated)</span>
                <textarea rows={3} className={`${inputClass} mt-1.5 font-normal`} value={form.outcomes} onChange={set('outcomes')} />
              </label>
              <label className="text-sm font-semibold text-navy sm:col-span-2">
                Focus Tags <span className="font-normal text-slate-400">(comma separated)</span>
                <input className={`${inputClass} mt-1.5 font-normal`} value={form.tags} onChange={set('tags')} placeholder="Elderly Care, Hands-On" />
              </label>
            </div>

            <button
              type="submit"
              className="mt-6 rounded-lg bg-navy px-6 py-3 font-heading text-sm font-bold text-white transition-colors hover:bg-teal-brand"
            >
              Save Course
            </button>
          </form>
        )}

        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <h2 className="font-heading text-lg font-bold text-navy">
              Current Courses ({courses.length})
            </h2>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-surface"
              >
                <Copy className="h-3.5 w-3.5" /> Copy Code
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-surface"
              >
                <Download className="h-3.5 w-3.5" /> Download Code
              </button>
            </div>
          </div>

          <div className="mt-5 divide-y divide-slate-100">
            {courses.map((c) => (
              <div key={c.slug} className="flex items-center gap-4 py-4">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-heading text-sm font-bold text-navy">{c.title}</p>
                  <p className="mt-0.5 truncate text-xs text-slate-500">
                    {c.category} • {c.duration} • {c.hours} • /courses/{c.slug}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    onClick={() => openEdit(c)}
                    className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-navy hover:bg-surface"
                  >
                    <Pencil className="h-3.5 w-3.5" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(c)}
                    className="flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 border-t border-slate-100 pt-4 text-xs leading-relaxed text-slate-500">
            Saved courses are stored in this browser. To make them permanent in the codebase,
            use “Copy Code” or “Download Code” and paste the entries into{' '}
            <code className="rounded bg-slate-100 px-1.5 py-0.5">src/data/courses.ts</code> in VS
            Code before pushing to GitHub.
          </p>
        </div>

        <p className="mt-8 text-center text-sm">
          <Link to="/" className="font-semibold text-teal-brand hover:underline">
            Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
}