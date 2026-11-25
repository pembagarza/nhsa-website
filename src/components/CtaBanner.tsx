import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';

export default function CtaBanner() {
  return (
    <section className="bg-gradient-to-r from-teal-brand to-navy">
      <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h2 className="font-heading text-3xl font-extrabold leading-tight text-white sm:text-4xl">
          Ready to Build Job-Ready Healthcare & Caregiving Skills?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-white/90">
          Join our upcoming practical training batches at Dillibazar-30, Kathmandu.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/enroll"
            className="w-full rounded-lg bg-white px-7 py-3.5 text-center font-heading text-sm font-bold text-navy transition-transform hover:scale-[1.02] sm:w-auto"
          >
            Enroll Now →
          </Link>
          <a
            href="https://wa.me/9779767656243"
            target="_blank"
            rel="noreferrer"
            className="w-full rounded-lg bg-wgreen px-7 py-3.5 text-center font-heading text-sm font-bold text-white transition-transform hover:scale-[1.02] sm:w-auto"
          >
            Book Free Counselling
          </a>
        </div>
        <p className="mt-6 flex items-center justify-center gap-2 text-sm text-white/85">
          <Phone className="h-4 w-4" />
          Or call us: 01-4515952 • +977-9767656243
        </p>
      </div>
    </section>
  );
}
