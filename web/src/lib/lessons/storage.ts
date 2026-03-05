import { teacherLessonsPageMock } from '@/lib/mock/teacherLessons.mock';
import type { TeacherLessonRow } from '@/types/teacherLessons';

const LESSONS_STORAGE_KEY = 'teachify.teacher.lessons';
const LESSONS_TOAST_KEY = 'teachify.teacher.lessons.toast';

function canUseStorage() {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

export function loadTeacherLessons(
  seed: TeacherLessonRow[] = teacherLessonsPageMock.lessons,
): TeacherLessonRow[] {
  if (!canUseStorage()) return seed;
  try {
    const raw = localStorage.getItem(LESSONS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LESSONS_STORAGE_KEY, JSON.stringify(seed));
      return seed;
    }
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as TeacherLessonRow[]) : seed;
  } catch {
    return seed;
  }
}

export function persistTeacherLessons(lessons: TeacherLessonRow[]) {
  if (!canUseStorage()) return;
  try {
    localStorage.setItem(LESSONS_STORAGE_KEY, JSON.stringify(lessons));
  } catch {
    /* ignore quota / private mode */
  }
}

export function setLessonsPendingToast(toast: {
  title: string;
  message?: string;
}) {
  if (!canUseStorage()) return;
  try {
    sessionStorage.setItem(LESSONS_TOAST_KEY, JSON.stringify(toast));
  } catch {
    /* ignore */
  }
}

export function consumeLessonsPendingToast(): {
  title: string;
  message?: string;
} | null {
  if (!canUseStorage()) return null;
  try {
    const raw = sessionStorage.getItem(LESSONS_TOAST_KEY);
    if (!raw) return null;
    sessionStorage.removeItem(LESSONS_TOAST_KEY);
    return JSON.parse(raw) as { title: string; message?: string };
  } catch {
    return null;
  }
}
