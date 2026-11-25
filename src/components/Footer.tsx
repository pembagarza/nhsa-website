import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Globe } from 'lucide-react';
import { useCourses } from '@/lib/courseStore';

const SOCIAL_LINKS = [
  { icon: Facebook, label: 'Facebook', href: '#' },
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
];

const QUICK_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'All Courses', to: '/#courses' },
  { label: 'About Us', to: '/about' },
  { label: 'Enroll Now', to: '/enroll' },
  { label: 'Contact', to: '/contact' },
];

export default function Footer() {
  const courses = useCourses();
  const [footerLogoSrc, setFooterLogoSrc] = useState('/images/footer-logo.png');

  return (
    <footer className="bg-navy-dark text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="inline-flex shrink-0 items-center">
              <img
                src={footerLogoSrc}
                alt="Nepal HealthCare Skills Academy"
                onError={() => {
                  if (footerLogoSrc !== '/images/nhcsa-logo.png') {
                    setFooterLogoSrc('/images/nhcsa-logo.png');
                  }
                }}
                className="h-14 w-auto max-w-[220px] object-contain sm:h-16"
              />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              Building skilled healthcare professionals through hands-on, practical
              caregiver and clinical skills training in the heart of Kathmandu.
            </p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-teal-200">
              A Unit of Sparsha Care at Home Pvt. Ltd.
            </p>
            <div className="mt-5 flex gap-3">
              {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={href !== '#' ? '_blank' : undefined}
                  rel={href !== '#' ? 'noreferrer' : undefined}
                  className="rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-teal-brand"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-heading text-base font-bold uppercase tracking-wide text-teal-200">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {QUICK_LINKS.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-slate-300 transition-colors hover:text-teal-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-base font-bold uppercase tracking-wide text-teal-200">
              Our Programmes
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {courses.map((course) => (
                <li key={course.slug}>
                  <Link
                    to={`/courses/${course.slug}`}
                    className="text-slate-300 transition-colors hover:text-teal-200"
                  >
                    {course.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-base font-bold uppercase tracking-wide text-teal-200">
              Head Office & Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-teal-200" />
                <span>Dillibazar-30, Kathmandu, Nepal</span>
              </li>
              <li className="flex gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-teal-200" />
                <span>
                  Landline:{' '}
                  <a href="tel:014515952" className="hover:text-teal-200">
                    01-4515952
                  </a>
                  <br />
                  WhatsApp/Mobile:{' '}
                  <a href="tel:+9779767656243" className="hover:text-teal-200">
                    +977-9767656243
                  </a>
                </span>
              </li>
              <li className="flex gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-teal-200" />
                <a href="mailto:info@nhskillacademy.com" className="hover:text-teal-200">
                  info@nhskillacademy.com
                </a>
              </li>
              <li className="flex gap-2.5">
                <Globe className="mt-0.5 h-4 w-4 shrink-0 text-teal-200" />
                <a
                  href="https://nhskillacademy.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-teal-200"
                >
                  nhskillacademy.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-4 py-5 text-center text-xs text-slate-400 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} Nepal HealthCare Skills Academy (A Unit of Sparsha Care at Home Pvt. Ltd.).
          All rights reserved.
        </p>
      </div>
    </footer>
  );
}