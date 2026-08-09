import type { TeacherSummaryMetric } from './teacherList';

export type CalendarEventType =
  | 'Class'
  | 'Assignment'
  | 'Quiz'
  | 'Exam'
  | 'Event'
  | 'Reminder';

export type CalendarFilter = 'All' | CalendarEventType;

export interface TeacherCalendarEvent {
  id: string;
  title: string;
  type: CalendarEventType;
  classLabel: string;
  dateKey: string;
  startTime: string;
  endTime?: string;
  location?: string;
  accent: string;
}

export interface TeacherCalendarPageData {
  metrics: TeacherSummaryMetric[];
  filters: CalendarFilter[];
  events: TeacherCalendarEvent[];
}
