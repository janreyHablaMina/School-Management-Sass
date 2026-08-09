import type { CalendarEventType, CalendarFilter } from '@/types/teacherCalendar';

export const CALENDAR_EVENT_TYPES: CalendarEventType[] = [
  'Class',
  'Assignment',
  'Quiz',
  'Exam',
  'Event',
  'Reminder',
];

export const CALENDAR_FILTERS: CalendarFilter[] = ['All', ...CALENDAR_EVENT_TYPES];

export const CALENDAR_TYPE_ACCENTS: Record<CalendarEventType, string> = {
  Class: '#b68eff',
  Assignment: '#84a9ff',
  Quiz: '#5cc789',
  Exam: '#ff7e93',
  Event: '#f5c842',
  Reminder: '#f5a623',
};
