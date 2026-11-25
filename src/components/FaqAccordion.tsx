import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { CourseFaq } from '@/data/courses';

export default function FaqAccordion({ faqs }: { faqs: CourseFaq[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
      {faqs.map((f, i) => (
        <div key={f.q}>
          <button
            className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            <span className="font-heading text-[15px] font-bold text-navy">{f.q}</span>
            <ChevronDown
              className={`h-5 w-5 shrink-0 text-teal-brand transition-transform ${
                open === i ? 'rotate-180' : ''
              }`}
            />
          </button>
          {open === i && (
            <p className="px-6 pb-5 text-sm leading-relaxed text-slate-600">{f.a}</p>
          )}
        </div>
      ))}
    </div>
  );
}
