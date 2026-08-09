import { CALENDAR_TYPE_ACCENTS } from '@/lib/calendar/constants';
import type { CalendarEventType, TeacherCalendarEvent } from '@/types/teacherCalendar';
import { accentFromMap } from '../shared';

export {
  buildMonthCells,
  formatDayLabel,
  formatMonthLabel,
  monthPrefix,
  parseDateKey,
  toDateKey,
  todayParts,
} from '@/lib/calendar/dates';

export { CALENDAR_EVENT_TYPES, CALENDAR_FILTERS } from '@/lib/calendar/constants';

export function calendarTypeAccent(type: CalendarEventType): string {
  return accentFromMap(CALENDAR_TYPE_ACCENTS, type, '#f5c842');
}

export function eventAccent(event: TeacherCalendarEvent): string {
  return event.accent || calendarTypeAccent(event.type);
}

export function formatEventTime(event: Pick<TeacherCalendarEvent, 'startTime' | 'endTime'>): string {
  return event.endTime ? `${event.startTime} – ${event.endTime}` : event.startTime;
}

export function sortEventsByTime(events: TeacherCalendarEvent[]): TeacherCalendarEvent[] {
  return [...events].sort((a, b) => a.startTime.localeCompare(b.startTime));
}

export function groupEventsByDay(events: TeacherCalendarEvent[]): Map<number, TeacherCalendarEvent[]> {
  const map = new Map<number, TeacherCalendarEvent[]>();

  events.forEach((event) => {
    const day = Number(event.dateKey.slice(-2));
    const list = map.get(day) ?? [];
    list.push(event);
    map.set(day, list);
  });

  map.forEach((list, day) => {
    map.set(day, sortEventsByTime(list));
  });

  return map;
}

export function countEventsByType(
  events: TeacherCalendarEvent[],
): Array<[CalendarEventType, number]> {
  const counts = events.reduce<Partial<Record<CalendarEventType, number>>>((acc, item) => {
    acc[item.type] = (acc[item.type] ?? 0) + 1;
    return acc;
  }, {});

  return Object.entries(counts) as Array<[CalendarEventType, number]>;
}
