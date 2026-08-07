export type ClassStatus = 'Active' | 'Archived';
export type NextActivityType = 'Lesson' | 'Assignment' | 'Quiz' | 'Project';

export interface MyClassSummaryMetric {
  label: string;
  value: string;
  subtitle: string;
  icon: string;
  accent: string;
}

export interface NextActivity {
  type: NextActivityType;
  title: string;
  when: string;
}

export interface MyClassRow {
  id: number;
  subject: string;
  gradeSection: string;
  gradeLevel: string;
  academicYear: string;
  schedule: string;
  room: string;
  studentCount: number;
  attendanceRate: number;
  courseProgress: number;
  lessonsCompleted: number;
  lessonsTotal: number;
  nextActivity: NextActivity;
  status: ClassStatus;
  accent: string;
  icon: string;
}

export interface MyClassesPageData {
  metrics: MyClassSummaryMetric[];
  classes: MyClassRow[];
  filterOptions: {
    academicYears: string[];
    gradeLevels: string[];
    subjects: string[];
    statuses: Array<'All Status' | ClassStatus>;
  };
}
