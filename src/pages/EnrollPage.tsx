import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  MessageCircle,
  Phone,
} from 'lucide-react';
import Logo from '@/components/Logo';
import { useCourses } from '@/lib/courseStore';

const SCHEDULES = ['Morning Batch', 'Day Batch', 'Evening/Weekend Batch', 'Flexible'];
const EDUCATION = [
  'SEE/SLC',
  '+2 / High School',
  'Health Science Student',
  'Working Professional',
  'Homemaker / Family Caregiver',
  'Other',
];

interface FormState {
  fullName: string;
  contactNumber: string;
  address: string;
  schedule: string;
  whatsappNumber: string;
  email: string;
  dob: string;
  education: string;
  guardianContact: string;
  campusLocation: string;
  programme: string;
  notes: string;
}

const INITIAL: FormState = {
  fullName: '',
  contactNumber: '',
  address: '',
  schedule: '',
  whatsappNumber: '',
  email: '',
  dob: '',
  education: '',
  guardianContact: '',
  campusLocation: 'Dillibazar-30, Kathmandu',
  programme: '',
  notes: '',
};

const REQUIRED: (keyof FormState)[] = [
  'fullName',
  'contactNumber',
  'address',
  'schedule',
  'whatsappNumber',
  'dob',
  'guardianContact',
  'campusLocation',
  'programme',
];

const LABELS: Record<keyof FormState, string> = {
  fullName: 'Full Name',
  contactNumber: 'Contact Number',
  address: 'Address',
  schedule: 'Preferred Schedule / Shift',
  whatsappNumber: 'WhatsApp Number',
  email: 'Email',
  dob: 'Date of Birth',
  education: 'Education / Background',
  guardianContact: 'Guardian / Emergency Contact Name',
  campusLocation: 'Campus Location',
  programme: 'Selected Training Programme',
  notes: 'Additional Notes / Questions',
};

function buildWhatsAppMessage(f: FormState): string {
  const lines = [
    'Hello NHCSA! I would like to enroll in a training programme.',
    '',
    `Name: ${f.fullName}`,
    `Contact: ${f.contactNumber}`,
    `WhatsApp: ${f.whatsappNumber}`,
    `Address: ${f.address}`,
    `Date of Birth: ${f.dob}`,
    `Education: ${f.education || '—'}`,
    `Guardian/Emergency Contact: ${f.guardianContact}`,
    `Campus: ${f.campusLocation}`,
    `Programme: ${f.programme}`,
    `Preferred Schedule: ${f.schedule}`,
  ];
  if (f.email) lines.push(`Email: ${f.email}`);
  if (f.notes) lines.push(`Notes: ${f.notes}`);
  return lines.join('\n');
}

const inputClass =
  'w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-colors focus:border-teal-brand focus:ring-2 focus:ring-teal-brand/25';

export default function EnrollPage() {
  const [params] = useSearchParams();
  const preselected = params.get('course') ?? '';
  const courses = useCourses();

  const [form, setForm] = useState<FormState>({ ...INITIAL, programme: preselected });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<FormState | null>(null);
  const [dbError, setDbError] = useState<string | null>(null);

  const waLink = useMemo(() => {
    if (!submitted) return '';
    return `https://wa.me/9779767656243?text=${encodeURIComponent(buildWhatsAppMessage(submitted))}`;
  }, [submitted]);

  const set = (key: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((err) => ({ ...err, [key]: undefined }));
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    for (const key of REQUIRED) {
      if (!form[key].trim()) next[key] = `${LABELS[key]} is required`;
    }
    if (form.contactNumber.trim() && !/^[+\d][\d\s-]{5,}$/.test(form.contactNumber.trim())) {
      next.contactNumber = 'Please enter a valid contact number';
    }
    if (form.whatsappNumber.trim() && !/^[+\d][\d\s-]{5,}$/.test(form.whatsappNumber.trim())) {
      next.whatsappNumber = 'Please enter a valid WhatsApp number';
    }
    if (!next.programme && !courses.some((c) => c.title === form.programme)) {
      next.programme = 'Please select a training programme';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDbError(null);
    if (!validate()) return;

    setSubmitting(true);
    try {
      const { getSupabase } = await import('@/lib/supabase');
      const { error } = await getSupabase().from('enrollment_inquiries').insert({
        full_name: form.fullName.trim(),
        contact_number: form.contactNumber.trim(),
        whatsapp_number: form.whatsappNumber.trim(),
        address: form.address.trim(),
        dob: form.dob,
        guardian_contact: form.guardianContact.trim(),
        campus_location: form.campusLocation,
        programme: form.programme,
        schedule: form.schedule,
        education: form.education || null,
        email: form.email.trim() || null,
        notes: form.notes.trim() || null,
      });
      if (error) throw error;
      setSubmitted(form);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setDbError(
        'We could not save your inquiry right now. Please try again, or send your details directly via WhatsApp below.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-surface">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
          <div className="rounded-2xl bg-white p-8 text-center shadow-lg shadow-navy/5 sm:p-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-soft">
              <CheckCircle2 className="h-9 w-9 text-teal-brand" />
            </div>
            <h1 className="mt-6 font-heading text-2xl font-extrabold text-navy sm:text-3xl">
              Inquiry Received — Thank You, {submitted.fullName.split(' ')[0]}!
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Your enrollment inquiry has been registered with our admissions team. To receive an
              immediate response, send the same details to our admissions staff on WhatsApp with
              one click below.
            </p>

            <div className="mt-8 rounded-xl bg-surface p-6 text-left">
              <h2 className="font-heading text-sm font-bold uppercase tracking-wide text-teal-brand">
                Your Selection Summary
              </h2>
              <dl className="mt-4 grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
                {[
                  ['Programme', submitted.programme],
                  ['Schedule', submitted.schedule],
                  ['Campus', submitted.campusLocation],
                  ['Contact', submitted.contactNumber],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-xs font-semibold text-slate-500">{k}</dt>
                    <dd className="mt-0.5 font-semibold text-navy">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="mt-8 flex items-center justify-center gap-2 rounded-lg bg-wgreen px-6 py-4 font-heading text-sm font-bold text-white transition-transform hover:scale-[1.02]"
            >
              <MessageCircle className="h-5 w-5" />
              Send Application via WhatsApp (+977-9767656243)
            </a>

            <div className="mt-6 flex flex-col items-center gap-3 text-sm">
              <a
                href="tel:014515952"
                className="flex items-center gap-2 font-semibold text-navy hover:text-teal-brand"
              >
                <Phone className="h-4 w-4 text-teal-brand" /> Or call us: 01-4515952
              </a>
              <button
                onClick={() => {
                  setSubmitted(null);
                  setForm({ ...INITIAL });
                }}
                className="font-semibold text-slate-500 underline hover:text-navy"
              >
                Submit another inquiry
              </button>
              <Link to="/" className="font-semibold text-teal-brand hover:underline">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const field = (
    key: keyof FormState,
    label: string,
    node: React.ReactNode,
    required: boolean
  ) => (
    <div key={key}>
      <label htmlFor={key} className="mb-1.5 block text-sm font-semibold text-navy">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {node}
      {errors[key] && (
        <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-600">
          <AlertCircle className="h-3.5 w-3.5" /> {errors[key]}
        </p>
      )}
    </div>
  );

  return (
    <div className="bg-surface">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="flex flex-col items-center text-center">
          <Link to="/" aria-label="NHCSA home">
            <Logo />
          </Link>
          <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
            A Unit of Sparsha Care at Home Pvt. Ltd.
          </p>
        </div>

        <div className="mt-8 rounded-2xl bg-white p-6 shadow-xl shadow-navy/5 sm:p-10">
          <h1 className="text-center font-heading text-2xl font-extrabold text-navy">
            Please fill in your details
          </h1>
          <p className="mt-2 text-center text-sm text-slate-500">
            Our admissions team will contact you to confirm your batch and complete your
            enrollment.
          </p>

          {dbError && (
            <div className="mt-6 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              {dbError}
            </div>
          )}

          <form className="mt-8 grid gap-5 sm:grid-cols-2" onSubmit={handleSubmit} noValidate>
            {field('fullName', 'Full Name', (
              <input id="fullName" type="text" className={inputClass} value={form.fullName} onChange={set('fullName')} placeholder="Your full name" />
            ), true)}

            {field('contactNumber', 'Contact Number', (
              <input id="contactNumber" type="tel" className={inputClass} value={form.contactNumber} onChange={set('contactNumber')} placeholder="98XXXXXXXX" />
            ), true)}

            {field('address', 'Address', (
              <input id="address" type="text" className={inputClass} value={form.address} onChange={set('address')} placeholder="City / district" />
            ), true)}

            {field('schedule', 'Preferred Schedule / Shift', (
              <select id="schedule" className={inputClass} value={form.schedule} onChange={set('schedule')}>
                <option value="">Select a schedule…</option>
                {SCHEDULES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            ), true)}

            {field('whatsappNumber', 'WhatsApp Number', (
              <input id="whatsappNumber" type="tel" className={inputClass} value={form.whatsappNumber} onChange={set('whatsappNumber')} placeholder="977XXXXXXXXX" />
            ), true)}

            {field('email', 'Email', (
              <input id="email" type="email" className={inputClass} value={form.email} onChange={set('email')} placeholder="you@example.com" />
            ), false)}

            {field('dob', 'Date of Birth', (
              <input id="dob" type="date" className={inputClass} value={form.dob} onChange={set('dob')} max="2026-12-31" />
            ), true)}

            {field('education', 'Education / Background', (
              <select id="education" className={inputClass} value={form.education} onChange={set('education')}>
                <option value="">Select education…</option>
                {EDUCATION.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            ), false)}

            {field('guardianContact', 'Guardian / Emergency Contact Name', (
              <input id="guardianContact" type="text" className={inputClass} value={form.guardianContact} onChange={set('guardianContact')} placeholder="Guardian or emergency contact" />
            ), true)}

            {field('campusLocation', 'Campus Location', (
              <input id="campusLocation" type="text" className={`${inputClass} bg-slate-100`} value={form.campusLocation} onChange={set('campusLocation')} />
            ), true)}

            {field('programme', 'Select Training Programme', (
              <select id="programme" className={`${inputClass} sm:col-span-2`} value={form.programme} onChange={set('programme')}>
                <option value="">Choose a programme…</option>
                {courses.map((c) => <option key={c.slug} value={c.title}>{c.title}</option>)}
              </select>
            ), true)}

            {field('notes', 'Additional Notes / Questions', (
              <textarea id="notes" rows={3} className={`${inputClass} sm:col-span-2`} value={form.notes} onChange={set('notes')} placeholder="Anything you'd like us to know (optional)" />
            ), false)}

            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-navy px-6 py-4 font-heading text-sm font-bold text-white transition-colors hover:bg-teal-brand disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {submitting ? 'Submitting…' : 'Submit Enrollment Inquiry'}
              </button>
              <p className="mt-3 text-center text-xs text-slate-500">
                By submitting, you agree to be contacted by NHCSA admissions regarding your
                enrollment inquiry.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
