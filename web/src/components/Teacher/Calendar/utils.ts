import { CALENDAR_TYPE_ACCENTS } from '@/lib/calendar/constants';
import { formatDateKey } from '@/lib/calendar/dates';
import type {
  CalendarEventStatus,
  CalendarEventType,
  CreateCalendarEventInput,
  TeacherCalendarEvent,
} from '@/types/teacherCalendar';
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
export { buildCalendarMetrics } from '@/lib/calendar/metrics';

export function calendarTypeAccent(type: CalendarEventType): string {
  return accentFromMap(CALENDAR_TYPE_ACCENTS, type, '#f5c842');
}

export function eventAccent(event: TeacherCalendarEvent): string {
  return event.accent || calendarTypeAccent(event.type);
}

export function formatEventTime(event: Pick<TeacherCalendarEvent, 'startTime' | 'endTime'>): string {
  return event.endTime ? `${event.startTime} – ${event.endTime}` : event.startTime;
}

/** Convert `<input type="time">` value (`HH:MM`) to display time like `8:00 AM`. */
export function formatTimeInput(value: string): string {
  const [hoursRaw, minutesRaw] = value.split(':');
  const hours = Number(hoursRaw);
  const minutes = Number(minutesRaw);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return value;

  const period = hours >= 12 ? 'PM' : 'AM';
  const hour12 = hours % 12 || 12;
  return `${hour12}:${String(minutes).padStart(2, '0')} ${period}`;
}

export function resolveEventStatus(dateKey: string): CalendarEventStatus {
  const todayKey = formatDateKey(new Date());
  return dateKey < todayKey ? 'Completed' : 'Upcoming';
}

export function buildEventFromInput(
  input: CreateCalendarEventInput,
  id: string,
): TeacherCalendarEvent {
  return {
    id,
    title: input.title.trim(),
    type: input.type,
    classLabel: input.classLabel,
    dateKey: input.dateKey,
    startTime: input.startTime,
    endTime: input.endTime,
    location: input.location?.trim() || undefined,
    description: input.description.trim(),
    notes: input.notes?.trim() || undefined,
    status: resolveEventStatus(input.dateKey),
    accent: calendarTypeAccent(input.type),
  };
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
