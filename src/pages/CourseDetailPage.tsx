import { Link, useParams } from 'react-router-dom';
import {
  ArrowRight,
  BarChart3,
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  Clock,
  MapPin,
  MonitorPlay,
  Phone,
} from 'lucide-react';
import FaqAccordion from '@/components/FaqAccordion';
import CtaBanner from '@/components/CtaBanner';
import CourseImage from '@/components/CourseImage';
import { useCourses, getCourseBySlugLive } from '@/lib/courseStore';

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate-600">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-brand" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function CourseDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const allCourses = useCourses();
  const course = getCourseBySlugLive(slug);

  if (!course) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-heading text-3xl font-extrabold text-navy">Course not found</h1>
        <p className="mt-3 text-slate-600">
          The course you are looking for does not exist. Browse all our programmes instead.
        </p>
        <Link
          to="/#courses"
          className="mt-8 inline-block rounded-lg bg-navy px-6 py-3 font-heading text-sm font-bold text-white hover:bg-teal-brand"
        >
          View All Courses
        </Link>
      </div>
    );
  }

  const others = allCourses.filter((c) => c.slug !== course.slug).slice(0, 5);

  return (
    <>
      {/* Hero header */}
      <section className="course-photo relative isolate overflow-hidden">
        <img
          src="/images/hero-banner.jpg"
          alt="Nepal HealthCare Skills Academy training banner in Dillibazar, Kathmandu"
          className="absolute inset-0 h-full w-full object-cover object-[60%_center] lg:object-[72%_35%]"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-br from-navy/88 via-navy/75 to-navy/50"
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <nav className="flex flex-wrap items-center gap-1.5 text-xs text-slate-200" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-teal-200">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/#courses" className="hover:text-teal-200">Courses</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="font-semibold text-teal-200">{course.title}</span>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start">
            <div>
              <span className="inline-block rounded-full bg-teal-brand px-3.5 py-1.5 text-xs font-semibold text-white">
                {course.category}
              </span>
              <h1 className="mt-4 font-heading text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                {course.title}
              </h1>
              {course.tagline && (
                <p className="mt-3 text-base italic text-teal-200">{course.tagline}</p>
              )}
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-100 sm:text-base">
                {course.overview}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {course.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to={`/enroll?course=${encodeURIComponent(course.title)}`}
                  className="rounded-lg bg-teal-brand px-6 py-3 text-center font-heading text-sm font-bold text-white transition-transform hover:scale-[1.02]"
                >
                  Enroll Now →
                </Link>
                <a
                  href="https://wa.me/9779767656243"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg bg-wgreen px-6 py-3 text-center font-heading text-sm font-bold text-white transition-transform hover:scale-[1.02]"
                >
                  Book Free Counselling
                </a>
              </div>
            </div>

            <aside className="overflow-hidden rounded-2xl border border-white/15 bg-navy-dark/70 backdrop-blur">
              <CourseImage
                src={course.image}
                alt={course.title}
                className="h-44 w-full"
                position="object-center"
              />
              <div className="p-6">
                <h2 className="font-heading text-sm font-bold uppercase tracking-wide text-teal-200">
                  Course Quick Facts
                </h2>
                <ul className="mt-4 space-y-4 text-sm">
                  {[
                    { icon: Clock, label: 'Duration', value: course.duration },
                    { icon: BarChart3, label: 'Total Hours', value: course.hours },
                    { icon: MonitorPlay, label: 'Training Mode', value: 'Hands-On Practical & Classroom' },
                    { icon: MapPin, label: 'Campus Location', value: 'Dillibazar-30, Kathmandu' },
                  ].map(({ icon: Icon, label, value }) => (
                    <li key={label} className="flex items-start gap-3">
                      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-teal-200" />
                      <span className="text-slate-200">
                        <span className="font-semibold text-white">{label}:</span> {value}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* What you'll learn */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-extrabold text-navy sm:text-3xl">
            What You’ll Learn
          </h2>
          {course.learnItems ? (
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {course.learnItems.map((item, i) => (
                <div
                  key={item}
                  className="flex items-center gap-3.5 rounded-xl border border-slate-100 bg-surface px-5 py-4 transition-shadow hover:shadow-md hover:shadow-navy/5"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-soft font-heading text-xs font-extrabold text-teal-800">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-sm font-medium text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {(course.modules ?? []).map((m, i) => (
                <div
                  key={m.title}
                  className="rounded-2xl border border-slate-100 bg-surface p-6 transition-shadow hover:shadow-lg hover:shadow-navy/5"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy font-heading text-sm font-extrabold text-white">
                      {i + 1}
                    </span>
                    <h3 className="font-heading text-base font-bold text-navy">{m.title}</h3>
                  </div>
                  <ul className="mt-4 space-y-2.5">
                    {m.points.map((p) => (
                      <li key={p} className="flex gap-2.5 text-sm text-slate-600">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-brand" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Who is this for + outcomes */}
      <section className="bg-surface">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <h2 className="font-heading text-2xl font-extrabold text-navy">Who Is This For?</h2>
            {course.whoShouldJoin ? (
              <p className="mt-6 text-[15px] leading-relaxed text-slate-600">
                {course.whoShouldJoin}
              </p>
            ) : (
              <div className="mt-6">
                <CheckList items={course.audience ?? []} />
              </div>
            )}
          </div>
          <div>
            <h2 className="font-heading text-2xl font-extrabold text-navy">
              Skills & Career Readiness Outcomes
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Graduates of this programme apply their skills across a range of real care settings:
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {course.outcomes.map((o) => (
                <div key={o} className="flex gap-3 rounded-xl bg-white p-4 shadow-sm">
                  <CalendarClock className="mt-0.5 h-5 w-5 shrink-0 text-teal-brand" />
                  <p className="text-sm font-medium leading-relaxed text-slate-700">{o}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-center font-heading text-2xl font-extrabold text-navy sm:text-3xl">
            Course FAQs
          </h2>
          <div className="mt-8">
            <FaqAccordion faqs={course.faqs} />
          </div>
        </div>
      </section>

      {/* Ready to enroll */}
      <section className="bg-surface">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1.5fr_1fr] lg:px-8">
          <div className="rounded-2xl bg-navy p-8 sm:p-10">
            <h2 className="font-heading text-2xl font-extrabold text-white sm:text-3xl">
              Ready to Enroll in {course.title}?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              Seats are limited in every batch to keep our practical training personal. Reserve
              your place today or talk to our counselling team first — free of charge.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                to={`/enroll?course=${encodeURIComponent(course.title)}`}
                className="rounded-lg bg-teal-brand px-6 py-3 text-center font-heading text-sm font-bold text-white transition-colors hover:bg-white hover:text-navy"
              >
                Enroll Now →
              </Link>
              <a
                href="https://wa.me/9779767656243"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg bg-wgreen px-6 py-3 text-center font-heading text-sm font-bold text-white"
              >
                Free Counselling
              </a>
              <a
                href="tel:+9779767656243"
                className="flex items-center justify-center gap-2 rounded-lg border border-white/30 px-6 py-3 text-center font-heading text-sm font-bold text-white transition-colors hover:bg-white/10"
              >
                <Phone className="h-4 w-4" /> +977-9767656243
              </a>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <h3 className="font-heading text-lg font-bold text-navy">
              Certification & Practical Completion
            </h3>
            <ul className="mt-5 space-y-3.5">
              {[
                'Attend all practical lab sessions',
                'Complete skill demonstrations with trainers',
                'Receive NHCSA completion certification',
                `CTEVT national pathway${course.category === 'Caregiving & Elderly Care' ? ' eligibility' : ' awareness'} included`,
                'Guidance for care-sector employment',
              ].map((item) => (
                <li key={item} className="flex gap-3 text-sm text-slate-600">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-brand" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <h3 className="font-heading text-xl font-bold text-navy">Other Courses</h3>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {others.map((c) => (
              <Link
                key={c.slug}
                to={`/courses/${c.slug}`}
                className="group rounded-xl bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <p className="text-xs font-semibold text-teal-brand">{c.category}</p>
                <p className="mt-1.5 text-sm font-semibold leading-snug text-navy">{c.title}</p>
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-teal-brand">
                  Learn More <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}