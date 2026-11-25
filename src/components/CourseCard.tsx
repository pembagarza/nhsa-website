import { Link } from 'react-router-dom';
import { ArrowRight, Clock, BarChart3, MonitorPlay } from 'lucide-react';
import CourseImage from './CourseImage';
import type { Course } from '@/data/courses';

export default function CourseCard({ course }: { course: Course }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/10">
      <div className="relative">
        <CourseImage
          src={course.image}
          alt={course.title}
          className="h-44 w-full"
          overlayLabel={course.title}
        />
        <span className="absolute left-3 top-3 rounded-full bg-teal-brand px-3 py-1 text-xs font-semibold text-white shadow">
          {course.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-heading text-lg font-bold leading-snug text-navy">
          {course.title}
        </h3>

        {course.tagline && (
          <p className="mt-1.5 text-sm italic leading-snug text-teal-800">
            {course.tagline}
          </p>
        )}

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-slate-500">
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-teal-brand" /> {course.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <BarChart3 className="h-3.5 w-3.5 text-teal-brand" /> {course.hours}
          </span>
          <span className="flex items-center gap-1.5">
            <MonitorPlay className="h-3.5 w-3.5 text-teal-brand" /> {course.mode}
          </span>
        </div>

        {course.whoShouldJoin && (
          <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-slate-500">
            <span className="font-semibold text-slate-600">Who should join: </span>
            {course.whoShouldJoin}
          </p>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          {course.tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-teal-soft px-2.5 py-1 text-[11px] font-semibold text-teal-800"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-5 flex flex-1 items-end justify-end">
          <Link
            to={`/courses/${course.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-bold font-heading text-teal-brand transition-colors hover:text-navy"
          >
            Learn More
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
