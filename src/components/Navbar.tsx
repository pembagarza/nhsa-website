import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, Phone, X } from 'lucide-react';
import Logo from './Logo';
import { useCourses } from '@/lib/courseStore';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const courses = useCourses();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-semibold font-heading transition-colors ${
      isActive ? 'text-teal-brand' : 'text-navy hover:text-teal-brand'
    }`;

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow ${
        scrolled ? 'shadow-md shadow-navy/10' : 'shadow-sm'
      }`}
    >
      <nav className="mx-auto flex min-h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:px-8">
        <Link to="/" aria-label="NHCSA home" className="shrink-0">
          <Logo />
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          <NavLink to="/" className={linkClass} end>
            Home
          </NavLink>
          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              className="flex items-center gap-1 px-3 py-2 text-sm font-semibold font-heading text-navy hover:text-teal-brand transition-colors"
              onClick={() => setDropdownOpen((v) => !v)}
              aria-expanded={dropdownOpen}
            >
              Courses
              <ChevronDown className={`h-4 w-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            <div
              className={`absolute left-1/2 top-full w-80 -translate-x-1/2 rounded-xl border border-slate-100 bg-white p-2 shadow-xl transition-all ${
                dropdownOpen ? 'visible opacity-100' : 'invisible opacity-0'
              }`}
            >
              <Link
                to="/#courses"
                className="block rounded-lg bg-surface px-4 py-2.5 text-sm font-semibold text-navy hover:bg-teal-soft"
              >
                View All Courses
              </Link>
              <div className="my-1 h-px bg-slate-100" />
              {courses.map((c) => (
                <Link
                  key={c.slug}
                  to={`/courses/${c.slug}`}
                  className="block rounded-lg px-4 py-2.5 text-sm text-slate-700 hover:bg-teal-soft hover:text-navy"
                >
                  {c.title}
                </Link>
              ))}
            </div>
          </div>
          <NavLink to="/about" className={linkClass}>
            About Us
          </NavLink>
          <NavLink to="/contact" className={linkClass}>
            Contact
          </NavLink>
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href="tel:+9779767656243"
            className="flex items-center gap-2 text-sm font-semibold text-navy hover:text-teal-brand transition-colors"
          >
            <Phone className="h-4 w-4 text-teal-brand" />
            +977-9767656243
          </a>
          <Link
            to="/enroll"
            className="rounded-lg bg-navy px-5 py-2.5 text-sm font-bold font-heading text-white transition-colors hover:bg-teal-brand"
          >
            Enroll Now
          </Link>
        </div>

        <button
          className="rounded-lg p-2 text-navy hover:bg-surface lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-slate-100 bg-white px-4 pb-6 pt-2 lg:hidden">
          <div className="flex flex-col gap-1">
            <Link to="/" className="rounded-lg px-3 py-2.5 font-heading text-sm font-semibold text-navy hover:bg-surface">
              Home
            </Link>
            <div className="rounded-lg bg-surface px-3 py-2.5">
              <p className="font-heading text-sm font-semibold text-navy">Courses</p>
              <div className="mt-2 flex flex-col gap-0.5">
                <Link to="/#courses" className="rounded-md px-3 py-2 text-sm font-semibold text-teal-brand">
                  View All Courses
                </Link>
                {courses.map((c) => (
                  <Link
                    key={c.slug}
                    to={`/courses/${c.slug}`}
                    className="rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-white"
                  >
                    {c.title}
                  </Link>
                ))}
              </div>
            </div>
            <Link to="/about" className="rounded-lg px-3 py-2.5 font-heading text-sm font-semibold text-navy hover:bg-surface">
              About Us
            </Link>
            <Link to="/contact" className="rounded-lg px-3 py-2.5 font-heading text-sm font-semibold text-navy hover:bg-surface">
              Contact
            </Link>
            <a
              href="tel:+9779767656243"
              className="mt-2 flex items-center justify-center gap-2 rounded-lg border border-navy px-3 py-2.5 font-heading text-sm font-semibold text-navy"
            >
              <Phone className="h-4 w-4" /> Call +977-9767656243
            </a>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <Link
                to="/enroll"
                className="rounded-lg bg-navy px-3 py-2.5 text-center font-heading text-sm font-bold text-white"
              >
                Enroll Now
              </Link>
              <a
                href="https://wa.me/9779767656243"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg bg-wgreen px-3 py-2.5 text-center font-heading text-sm font-bold text-white"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}