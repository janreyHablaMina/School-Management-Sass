/** Calendar UI helpers — re-exports shared lib for local imports. */
export {
  CALENDAR_EVENT_TYPES,
  CALENDAR_FILTERS,
  buildEventFromInput,
  buildMonthCells,
  calendarTypeAccent,
  countEventsByType,
  eventAccent,
  formatDayLabel,
  formatEventTime,
  formatMonthLabel,
  formatTimeInput,
  getCreateEventError,
  groupEventsByDay,
  monthPrefix,
  parseDateKey,
  sortEventsByTime,
  toDateKey,
  todayParts,
} from '@/lib/calendar';

import { formatDateKey } from '@/lib/calendar/dates';
import { CALENDAR_TYPE_ACCENTS } from '@/lib/calendar/constants';
import type { TeacherCalendarEvent } from '@/types/teacherCalendar';
import type { TeacherSummaryMetric } from '@/types/teacherList';

export function buildAdminCalendarMetrics(
  events: TeacherCalendarEvent[],
  referenceDate = new Date(),
): TeacherSummaryMetric[] {
  const monthKey = formatDateKey(referenceDate).slice(0, 7);
  const monthEvents = events.filter((item) => item.dateKey.startsWith(monthKey));

  return [
    {
      label: 'Total Schedule',
      value: String(monthEvents.length),
      subtitle: 'Items this month',
      icon: '📅',
      accent: '#3b82f6',
    },
    {
      label: 'School Events',
      value: String(monthEvents.filter((item) => item.type === 'Event').length),
      subtitle: 'Assemblies & activities',
      icon: '🎪',
      accent: CALENDAR_TYPE_ACCENTS.Event,
    },
    {
      label: 'Admin Reminders',
      value: String(monthEvents.filter((item) => item.type === 'Reminder').length),
      subtitle: 'Tasks & deadlines',
      icon: '⏰',
      accent: CALENDAR_TYPE_ACCENTS.Reminder,
    },
    {
      label: 'Academic Deadlines',
      value: String(
        monthEvents.filter(
          (item) =>
            item.type === 'Assignment' || item.type === 'Quiz' || item.type === 'Exam',
        ).length,
      ),
      subtitle: 'School-wide academics',
      icon: '📚',
      accent: CALENDAR_TYPE_ACCENTS.Exam,
    },
  ];
}
