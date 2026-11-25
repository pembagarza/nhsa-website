import { useSyncExternalStore } from 'react';
import { COURSES, type Course } from '@/data/courses';

const STORAGE_KEY = 'nhcsa_custom_courses_v1';

let customCourses: Course[] | null = null;
const listeners = new Set<() => void>();

function readStorage(): Course[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Course[]) : [];
  } catch {
    return [];
  }
}

function writeStorage(courses: Course[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
  } catch {
    // storage unavailable (private mode/full) — courses stay in memory for this session
  }
}

let snapshot: Course[] = [];

function rebuildSnapshot() {
  snapshot = [...COURSES, ...(customCourses ?? [])];
}

function getAll(): Course[] {
  if (customCourses === null) {
    customCourses = readStorage();
    rebuildSnapshot();
  }
  return snapshot;
}

function emit() {
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useCourses(): Course[] {
  return useSyncExternalStore(subscribe, getAll);
}

export function getCourseBySlugLive(slug: string | undefined): Course | undefined {
  return getAll().find((c) => c.slug === slug);
}

export function saveCourse(course: Course) {
  const current = customCourses ?? [];
  const idx = current.findIndex((c) => c.slug === course.slug);
  if (COURSES.some((c) => c.slug === course.slug)) {
    // Editing a default course: store an overriding copy
    const merged = current.filter((c) => c.slug !== course.slug);
    customCourses = [...merged, course];
  } else if (idx >= 0) {
    const merged = [...current];
    merged[idx] = course;
    customCourses = merged;
  } else {
    customCourses = [...current, course];
  }
  writeStorage(customCourses);
  rebuildSnapshot();
  emit();
}

export function deleteCourse(slug: string) {
  customCourses = (customCourses ?? []).filter((c) => c.slug !== slug);
  writeStorage(customCourses);
  rebuildSnapshot();
  emit();
}

export function resetToDefaults() {
  customCourses = [];
  writeStorage([]);
  rebuildSnapshot();
  emit();
}

export function courseToTsSnippet(course: Course): string {
  const learnItems = course.learnItems?.length
    ? `    learnItems: [\n${course.learnItems.map((p) => `      '${p.replace(/'/g, "\\'")}',`).join('\n')}\n    ],\n`
    : '';
  const modules = course.modules
    ?.map(
      (m) =>
        `      {\n        title: '${m.title.replace(/'/g, "\\'")}',\n        points: [\n${m.points
          .map((p) => `          '${p.replace(/'/g, "\\'")}',`)
          .join('\n')}\n        ],\n      },`
    )
    .join(',\n');
  const modulesBlock = modules ? `    modules: [\n${modules}\n    ],\n` : '';
  const audience = course.audience?.length
    ? `    audience: [\n${course.audience.map((a) => `      '${a.replace(/'/g, "\\'")}',`).join('\n')}\n    ],\n`
    : '';

  return `  {
    slug: '${course.slug}',
    title: '${course.title.replace(/'/g, "\\'")}',
    category: '${course.category}',
    duration: '${course.duration}',
    hours: '${course.hours}',
    mode: '${course.mode}',
    overview: '${course.overview.replace(/'/g, "\\'")}',
    tagline: '${(course.tagline ?? '').replace(/'/g, "\\'")}',
    image: '${course.image ?? ''}',
    tags: [${course.tags.map((t) => `'${t.replace(/'/g, "\\'")}'`).join(', ')}],
${learnItems}${modulesBlock}${audience}    outcomes: [
${course.outcomes.map((o) => `      '${o.replace(/'/g, "\\'")}',`).join('\n')}
    ],
    faqs: [
${course.faqs
  .map(
    (f) =>
      `      { q: '${f.q.replace(/'/g, "\\'")}', a: '${f.a.replace(/'/g, "\\'")}' },`
  )
  .join('\n')}
    ],
  },`;
}
