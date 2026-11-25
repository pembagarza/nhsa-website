import { Link } from 'react-router-dom';
import {
  Award,
  BadgeCheck,
  HeartHandshake,
  MapPin,
  Stethoscope,
  Target,
  Users,
} from 'lucide-react';
import CtaBanner from '@/components/CtaBanner';

const VALUES = [
  {
    icon: Target,
    title: 'Our Mission',
    body: 'To build skilled, confident and compassionate healthcare professionals through practical, standards-based training that meets real care needs in Nepal and beyond.',
  },
  {
    icon: BadgeCheck,
    title: 'Our Standards',
    body: 'CTEVT-affiliated caregiver training aligned with national skill benchmarks, delivered by experienced nursing, clinical and psychosocial practitioners.',
  },
  {
    icon: HeartHandshake,
    title: 'Our Foundation',
    body: 'As a unit of Sparsha Care at Home Pvt. Ltd., our teaching is grounded in the daily realities of real home-healthcare delivery across Kathmandu.',
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="course-photo relative isolate overflow-hidden">
        <img
          src="/images/hero-banner.jpg"
          alt="Nepal HealthCare Skills Academy practical healthcare training in Kathmandu"
          className="absolute inset-0 h-full w-full object-cover object-[60%_center] lg:object-[72%_35%]"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-br from-navy/88 via-navy/75 to-navy/50"
          aria-hidden
        />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <span className="inline-block rounded-full border border-teal-300/40 bg-teal-brand/25 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur">
            About Us
          </span>
          <h1 className="mt-5 font-heading text-3xl font-extrabold text-white sm:text-4xl">
            Building Skilled Healthcare Professionals
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-100">
            Nepal HealthCare Skills Academy (NHCSA) is a practical healthcare training institute
            in Dillibazar-30, Kathmandu — a unit of Sparsha Care at Home Pvt. Ltd., and a
            CTEVT-affiliated caregiver training provider.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-extrabold text-navy sm:text-3xl">
            Who We Are
          </h2>
          <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-slate-600">
            <p>
              Nepal HealthCare Skills Academy was founded on a simple belief: healthcare and
              caregiving are learned by doing. Every one of our programmes — from short
              first-aid courses to our 3-month CTEVT-affiliated caregiver training — is built
              around supervised, hands-on practice in practical clinical labs.
            </p>
            <p>
              As a unit of Sparsha Care at Home Pvt. Ltd., we train with the same standards our
              own care teams use in real Nepali homes every day. That connection keeps our
              curriculum honest, current and genuinely job-ready.
            </p>
            <p>
              Our learners include aspiring caregivers, nursing and health science students,
              family caregivers, home-care workers, hospitality and institutional staff, and
              community psychosocial workers — anyone who wants to care for others with real
              skill and real confidence.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              { icon: Stethoscope, label: 'Expert Practitioner Trainers' },
              { icon: Users, label: 'Small, Personal Batch Sizes' },
              { icon: Award, label: 'Recognized Completion Certificates' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="rounded-2xl bg-surface p-6 text-center">
                <Icon className="mx-auto h-7 w-7 text-teal-brand" />
                <p className="mt-3 font-heading text-sm font-bold text-navy">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {VALUES.map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-2xl bg-white p-8 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-soft">
                  <Icon className="h-6 w-6 text-teal-brand" />
                </div>
                <h3 className="mt-5 font-heading text-lg font-bold text-navy">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-6 rounded-2xl bg-navy p-8 sm:flex-row sm:p-10">
            <div>
              <h3 className="font-heading text-xl font-bold text-white">
                Visit Our Dillibazar Campus
              </h3>
              <p className="mt-2 flex items-center gap-2 text-sm text-slate-300">
                <MapPin className="h-4 w-4 text-teal-200" /> Dillibazar-30, Kathmandu, Nepal
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                to="/courses/basic-caregiver-elderly-care-skills"
                className="rounded-lg bg-teal-brand px-6 py-3 text-center font-heading text-sm font-bold text-white hover:bg-white hover:text-navy"
              >
                Explore Courses
              </Link>
              <Link
                to="/contact"
                className="rounded-lg border border-white/30 px-6 py-3 text-center font-heading text-sm font-bold text-white hover:bg-white/10"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}