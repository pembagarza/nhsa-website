import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCourses } from '@/lib/courseStore';
import {
  Award,
  BadgeCheck,
  FlaskConical,
  HeartHandshake,
  MapPin,
  Stethoscope,
  UserCheck,
  Users,
  GraduationCap,
  Home,
  Building2,
  Quote,
  Clock,
} from 'lucide-react';
import CourseCard from '@/components/CourseCard';
import FaqAccordion from '@/components/FaqAccordion';
import CtaBanner from '@/components/CtaBanner';
import { CATEGORIES, type CourseCategory } from '@/data/courses';

type Filter = 'All Programmes' | CourseCategory;
const FILTERS: Filter[] = ['All Programmes', ...CATEGORIES];

const HOME_FAQS = [
  {
    q: 'Where is Nepal HealthCare Skills Academy located?',
    a: 'We are located at Dillibazar-30, Kathmandu — a central, easily accessible location from across the Kathmandu Valley.',
  },
  {
    q: 'Are NHCSA caregiver courses affiliated with CTEVT?',
    a: 'Yes. Our caregiver training is CTEVT-affiliated and aligned with Nepal’s national caregiver skill standards, including our 3-month / 390-hour flagship programme.',
  },
  {
    q: 'Do I need prior medical or nursing experience to join?',
    a: 'No. Our short programmes are designed for complete beginners, family caregivers, students and professionals alike. Trainers start from the fundamentals.',
  },
  {
    q: 'Are classes practical and hands-on?',
    a: 'Yes — that is our core philosophy. Every programme emphasizes supervised practical labs, drills and real-care scenarios rather than passive lectures.',
  },
  {
    q: 'How long are the short-duration training programmes?',
    a: 'Most short courses run from 1 to 7 days (8–30 hours). Our CTEVT-affiliated caregiver training runs for 3 months (390 hours).',
  },
  {
    q: 'How can I enroll or book a free counselling session?',
    a: 'Use the Enroll Now button to fill the registration form, message us on WhatsApp at +977-9767656243, or call 01-4515952. Free counselling is available before you commit.',
  },
];

const AUDIENCES = [
  { title: 'Aspiring Caregivers', sub: 'Local & International Pathways', icon: Users, tint: 'bg-teal-soft' },
  { title: 'Nursing & Health Science Students', sub: 'Strengthen Clinical Practice', icon: GraduationCap, tint: 'bg-blue-50' },
  { title: 'Family Caregivers & Homemakers', sub: 'Care Confidently at Home', icon: Home, tint: 'bg-amber-50' },
  { title: 'Home-Care & Support Workers', sub: 'Formalize & Upgrade Skills', icon: UserCheck, tint: 'bg-green-50' },
  { title: 'Hospitality, Daycare & Institutional Staff', sub: 'Safety & Care Readiness', icon: Building2, tint: 'bg-rose-50' },
  { title: 'Community & Psychosocial Support Workers', sub: 'Stronger Support Skills', icon: HeartHandshake, tint: 'bg-violet-50' },
];

const TRUST_CARDS = [
  { title: 'Hands-On Training', sub: 'Practical Clinical Labs', icon: FlaskConical },
  { title: 'CTEVT Affiliated', sub: 'Recognized Caregiver Standards', icon: BadgeCheck },
  { title: 'Dillibazar, Kathmandu', sub: 'Accessible Central Campus', icon: MapPin },
  { title: 'Learn • Practice • Care', sub: 'Job-Ready Competency', icon: Award },
];

const STORIES = [
  {
    quote:
      'The practical labs changed everything for me. By the time I finished the caregiver course, transferring a patient or checking vitals felt natural — not memorized.',
    name: 'Practical Lab Sessions',
    role: 'Basic Caregiver & Elderly Care Skills',
  },
  {
    quote:
      'I came to improve how I care for my mother at home. The dementia communication techniques made our days calmer within the first week of applying them.',
    name: 'Caregiver Readiness',
    role: 'Dementia Awareness & Communication',
  },
  {
    quote:
      'I joined nervous about the emergency drills. The trainers pushed me through every CPR repetition until I felt genuinely ready to act in a real emergency.',
    name: 'Student Confidence',
    role: 'BLS & First-Aid Training',
  },
];

export default function HomePage() {
  const [filter, setFilter] = useState<Filter>('All Programmes');
  const courses = useCourses();

  const visible = useMemo(
    () => (filter === 'All Programmes' ? courses : courses.filter((c) => c.category === filter)),
    [filter, courses]
  );

  return (
    <>
      {/* A. Hero */}
      <section className="course-photo relative isolate overflow-hidden">
        {/* Full-bleed hero photo — swap public/images/hero-banner.jpg to replace */}
        <img
          src="/images/hero-banner.jpg"
          alt="NHCSA healthcare trainees and instructor in navy scrubs practicing hands-on patient care in Kathmandu"
          className="absolute inset-0 h-full w-full object-cover object-[60%_center] lg:object-[72%_35%]"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-br from-navy/88 via-navy/70 to-navy/40"
          aria-hidden
        />
        <div
          className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy/85 to-transparent"
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-16 sm:px-6 sm:pt-20 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-teal-300/40 bg-teal-brand/25 px-4 py-1.5 text-xs font-semibold tracking-wide text-white backdrop-blur">
              CTEVT-Affiliated Practical Healthcare Training Institute
            </span>
            <h1 className="mt-6 font-heading text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
              Nepal HealthCare Skills Academy — Practical Healthcare Training in Kathmandu
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-100 sm:text-lg">
              Hands-on clinical and caregiving skills training in Dillibazar, Kathmandu —
              designed to build real-world knowledge, confidence, and competency.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {['Elderly & Home Care', 'CTEVT Caregiver', 'BLS & First-Aid', 'Mental Health & PFA', 'Infection Control'].map(
                (t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur"
                  >
                    {t}
                  </span>
                )
              )}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#courses"
                className="rounded-lg bg-white px-7 py-3.5 text-center font-heading text-sm font-bold text-navy transition-transform hover:scale-[1.02]"
              >
                View All Courses →
              </a>
              <Link
                to="/enroll"
                className="rounded-lg bg-teal-brand px-7 py-3.5 text-center font-heading text-sm font-bold text-white transition-transform hover:scale-[1.02]"
              >
                Enroll Now →
              </Link>
            </div>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TRUST_CARDS.map(({ icon: Icon, title, sub }) => (
              <div key={title} className="glass-card rounded-xl p-5">
                <Icon className="h-6 w-6 text-teal-200" />
                <p className="mt-3 font-heading text-sm font-bold text-white">{title}</p>
                <p className="mt-1 text-xs text-slate-200">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* B. Metrics strip */}
      <section className="bg-navy">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-8 px-4 py-10 text-center sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            { stat: '10+', label: 'Practical Training Programmes' },
            { stat: '100%', label: 'Hands-On Skill Focus' },
            { stat: 'CTEVT', label: 'Affiliated Caregiver Pathways' },
            { stat: 'Dillibazar', label: 'Kathmandu Training Center' },
          ].map((s) => (
            <div key={s.stat}>
              <p className="font-heading text-3xl font-extrabold text-teal-200 sm:text-4xl">{s.stat}</p>
              <p className="mt-1.5 text-xs font-medium text-slate-300 sm:text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* C. Programmes grid */}
      <section id="courses" className="scroll-mt-20 bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-3xl font-extrabold text-navy sm:text-4xl">
              Our Practical Training Programmes
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Short-duration, hands-on training programmes designed for aspiring caregivers,
              students, family members, and healthcare professionals.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  filter === f
                    ? 'bg-teal-brand text-white shadow'
                    : 'bg-white text-navy hover:bg-teal-soft'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((c) => (
              <CourseCard key={c.slug} course={c} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/enroll"
              className="inline-block rounded-lg bg-navy px-8 py-4 font-heading text-sm font-bold text-white transition-colors hover:bg-teal-brand"
            >
              Enroll in a Programme →
            </Link>
          </div>
        </div>
      </section>

      {/* D. Why choose */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-center font-heading text-3xl font-extrabold text-navy sm:text-4xl">
            Why Choose Nepal HealthCare Skills Academy?
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {[
              {
                icon: FlaskConical,
                title: 'Hands-On Clinical & Practical Labs',
                body: 'Real-world bedside, mobility, hygiene, and emergency drills rather than passive lectures.',
              },
              {
                icon: BadgeCheck,
                title: 'CTEVT-Affiliated & Job-Ready Standards',
                body: 'Structured curriculum aligned with national caregiver benchmarks and real care environments.',
              },
              {
                icon: Stethoscope,
                title: 'Expert Healthcare & Caregiving Trainers',
                body: 'Learn directly from experienced nursing, clinical, and psychosocial practitioners in Kathmandu.',
              },
              {
                icon: HeartHandshake,
                title: 'Backed by Sparsha Care at Home',
                body: 'Practical insights and care standards connected to real home-healthcare delivery in Nepal.',
              },
            ].map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="flex gap-5 rounded-2xl border border-slate-100 bg-surface p-6 transition-shadow hover:shadow-lg hover:shadow-navy/5"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-soft">
                  <Icon className="h-6 w-6 text-teal-brand" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-navy">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* E. Who it's for */}
      <section className="bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-center font-heading text-3xl font-extrabold text-navy sm:text-4xl">
            Who Our Programmes Are For
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {AUDIENCES.map(({ icon: Icon, title, sub, tint }) => (
              <div
                key={title}
                className={`${tint} rounded-2xl p-6 transition-transform hover:-translate-y-1`}
              >
                <Icon className="h-7 w-7 text-navy" />
                <h3 className="mt-4 font-heading text-base font-bold text-navy">{title}</h3>
                <p className="mt-1 text-sm text-slate-600">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* F. Learner stories */}
      <section className="bg-navy">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-center font-heading text-3xl font-extrabold text-white sm:text-4xl">
            Learner Stories & Practical Training Highlights
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {STORIES.map((s) => (
              <figure
                key={s.name}
                className="glass-card flex flex-col rounded-2xl p-6"
              >
                <Quote className="h-7 w-7 text-teal-200" />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-100">
                  “{s.quote}”
                </blockquote>
                <figcaption className="mt-5 border-t border-white/15 pt-4">
                  <p className="font-heading text-sm font-bold text-white">{s.name}</p>
                  <p className="mt-0.5 flex items-center gap-1.5 text-xs text-teal-200">
                    <Clock className="h-3 w-3" /> {s.role}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* G. FAQs */}
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-center font-heading text-3xl font-extrabold text-navy sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <div className="mt-10">
            <FaqAccordion faqs={HOME_FAQS} />
          </div>
        </div>
      </section>

      {/* H. CTA banner */}
      <CtaBanner />
    </>
  );
}
