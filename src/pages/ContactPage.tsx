import { Globe, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import CtaBanner from '@/components/CtaBanner';

const CONTACTS = [
  {
    icon: MapPin,
    title: 'Visit Us',
    lines: ['Dillibazar-30, Kathmandu, Nepal', 'Central, easy-to-reach campus'],
  },
  {
    icon: Phone,
    title: 'Call Us',
    lines: ['Landline: 01-4515952', 'Mobile: +977-9767656243'],
  },
  {
    icon: Mail,
    title: 'Email Us',
    lines: ['info@nhskillacademy.com', 'We respond within 1–2 working days'],
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="course-photo relative isolate overflow-hidden">
        <img
          src="/images/hero-banner.jpg"
          alt="Nepal HealthCare Skills Academy training center in Dillibazar, Kathmandu"
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
          <h1 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
            Contact Nepal HealthCare Skills Academy
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-100">
            Questions about programmes, batches or enrollment? Our team in Dillibazar is ready to
            help — including free counselling before you choose a course.
          </p>
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {CONTACTS.map(({ icon: Icon, title, lines }) => (
              <div key={title} className="rounded-2xl bg-white p-8 text-center shadow-sm">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-teal-soft">
                  <Icon className="h-6 w-6 text-teal-brand" />
                </div>
                <h2 className="mt-4 font-heading text-lg font-bold text-navy">{title}</h2>
                {lines.map((l) => (
                  <p key={l} className="mt-1.5 text-sm text-slate-600">
                    {l}
                  </p>
                ))}
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-6 rounded-2xl bg-white p-8 shadow-sm sm:p-10 md:grid-cols-2">
            <div>
              <h2 className="font-heading text-xl font-bold text-navy">
                Fastest Ways to Reach Us
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                For admissions, batch schedules and fee details, WhatsApp is the quickest route —
                our admissions staff reply throughout the day. Phone calls are answered during
                office hours, Sunday to Friday.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href="https://wa.me/9779767656243"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-lg bg-wgreen px-6 py-3 font-heading text-sm font-bold text-white"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp Us
                </a>
                <a
                  href="tel:+9779767656243"
                  className="flex items-center justify-center gap-2 rounded-lg bg-navy px-6 py-3 text-center font-heading text-sm font-bold text-white hover:bg-teal-brand"
                >
                  <Phone className="h-4 w-4" /> Call Now
                </a>
              </div>
            </div>
            <div className="rounded-xl bg-surface p-6">
              <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-teal-brand">
                Institution Details
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li className="flex items-center gap-2.5">
                  <MapPin className="h-4 w-4 shrink-0 text-teal-brand" /> Dillibazar-30, Kathmandu, Nepal
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 shrink-0 text-teal-brand" /> 01-4515952 • +977-9767656243
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 shrink-0 text-teal-brand" /> info@nhskillacademy.com
                </li>
                <li className="flex items-center gap-2.5">
                  <Globe className="h-4 w-4 shrink-0 text-teal-brand" /> nhskillacademy.com
                </li>
              </ul>
              <p className="mt-5 border-t border-slate-200 pt-4 text-xs font-semibold text-slate-500">
                CTEVT-Affiliated Caregiver Trainings • A Unit of Sparsha Care at Home Pvt. Ltd.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}