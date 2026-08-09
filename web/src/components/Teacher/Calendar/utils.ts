import type { CalendarEventType } from '@/types/teacherCalendar';
import { accentFromMap } from '../shared';

const TYPE_ACCENTS: Record<CalendarEventType, string> = {
  Class: '#b68eff',
  Assignment: '#84a9ff',
  Quiz: '#5cc789',
  Exam: '#ff7e93',
  Event: '#f5c842',
  Reminder: '#f5a623',
};

export function calendarTypeAccent(type: CalendarEventType): string {
  return accentFromMap(TYPE_ACCENTS, type, '#f5c842');
}

export function toDateKey(year: number, month: number, day: number) {
  const m = String(month).padStart(2, '0');
  const d = String(day).padStart(2, '0');
  return `${year}-${m}-${d}`;
}

export function parseDateKey(dateKey: string) {
  const [year, month, day] = dateKey.split('-').map(Number);
  return { year, month, day };
}

export function formatMonthLabel(year: number, month: number) {
  return new Date(year, month - 1, 1).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
}

export function formatDayLabel(dateKey: string) {
  const { year, month, day } = parseDateKey(dateKey);
  return new Date(year, month - 1, day).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function buildMonthCells(year: number, month: number) {
  const firstWeekday = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const cells: Array<number | null> = [];

  for (let i = 0; i < firstWeekday; i += 1) cells.push(null);
  for (let day = 1; day <= daysInMonth; day += 1) cells.push(day);
  return cells;
}
