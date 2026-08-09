import { CALENDAR_TYPE_ACCENTS } from './constants';
import { formatDateKey } from './dates';
import type { TeacherCalendarEvent } from '@/types/teacherCalendar';
import type { TeacherSummaryMetric } from '@/types/teacherList';

export function buildCalendarMetrics(
  events: TeacherCalendarEvent[],
  referenceDate = new Date(),
): TeacherSummaryMetric[] {
  const monthKey = formatDateKey(referenceDate).slice(0, 7);
  const monthEvents = events.filter((item) => item.dateKey.startsWith(monthKey));

  return [
    {
      label: 'This Month',
      value: String(monthEvents.length),
      subtitle: 'Scheduled items',
      icon: '📅',
      accent: CALENDAR_TYPE_ACCENTS.Event,
    },
    {
      label: 'Classes',
      value: String(monthEvents.filter((item) => item.type === 'Class').length),
      subtitle: 'Teaching blocks',
      icon: '📚',
      accent: CALENDAR_TYPE_ACCENTS.Class,
    },
    {
      label: 'Deadlines',
      value: String(
        monthEvents.filter(
          (item) =>
            item.type === 'Assignment' || item.type === 'Quiz' || item.type === 'Exam',
        ).length,
      ),
      subtitle: 'Assignments & tests',
      icon: '⏰',
      accent: CALENDAR_TYPE_ACCENTS.Exam,
    },
    {
      label: 'Events',
      value: String(monthEvents.filter((item) => item.type === 'Event').length),
      subtitle: 'Meetings & school events',
      icon: '🗓️',
      accent: CALENDAR_TYPE_ACCENTS.Quiz,
    },
  ];
}
