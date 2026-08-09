export interface TeacherClassFocus {
  gradeSection: string;
  subject: string;
  gradeLevel?: string;
}

export interface TeacherNavRequest {
  tab: string;
  classFocus?: TeacherClassFocus;
  /** Prefill AI Assistant tool (e.g. Generate Quiz). */
  aiToolId?: number;
}

function normalizeSubject(value: string): string {
  const v = value.trim().toLowerCase();
  if (v === 'ict' || v === 'it' || v.includes('information technology')) {
    return 'ict';
  }
  return v;
}

export function subjectsMatch(a: string, b: string): boolean {
  const left = normalizeSubject(a);
  const right = normalizeSubject(b);
  return left === right || left.includes(right) || right.includes(left);
}

/** Resolve a Grades/Attendance class id from My Classes focus. */
export function findClassIdByFocus<T extends { id: string; gradeSection: string; subject: string }>(
  classes: T[],
  focus: TeacherClassFocus | null | undefined,
): string | null {
  if (!focus) return null;

  const exact = classes.find(
    (item) =>
      item.gradeSection === focus.gradeSection && subjectsMatch(item.subject, focus.subject),
  );
  if (exact) return exact.id;

  const bySection = classes.find((item) => item.gradeSection === focus.gradeSection);
  if (bySection) return bySection.id;

  if (focus.gradeLevel) {
    const byLevelSubject = classes.find(
      (item) =>
        item.gradeSection.includes(focus.gradeLevel!) &&
        subjectsMatch(item.subject, focus.subject),
    );
    if (byLevelSubject) return byLevelSubject.id;
  }

  const bySubject = classes.find((item) => subjectsMatch(item.subject, focus.subject));
  return bySubject?.id ?? null;
}

/** Pick a list filter option that best matches the focused class. */
export function resolveClassFilterOption(
  options: string[],
  focus: TeacherClassFocus | null | undefined,
): string | null {
  if (!focus) return null;
  if (options.includes(focus.gradeSection)) return focus.gradeSection;

  const byIncludes = options.find(
    (option) =>
      option !== 'All Classes' &&
      (focus.gradeSection.includes(option) || option.includes(focus.gradeSection)),
  );
  if (byIncludes) return byIncludes;

  if (focus.gradeLevel) {
    const byLevel = options.find(
      (option) => option !== 'All Classes' && option.includes(focus.gradeLevel!),
    );
    if (byLevel) return byLevel;
  }

  return null;
}
