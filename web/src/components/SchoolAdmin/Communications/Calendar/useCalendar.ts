'use client';

import { useMemo, useState } from 'react';
import { adminCalendarPageMock } from '@/lib/mock/adminCalendar.mock';
import type {
  CreateCalendarEventInput,
  TeacherCalendarEvent,
} from '@/types/teacherCalendar';
import {
  buildAdminCalendarMetrics,
  buildEventFromInput,
  formatDayLabel,
  formatMonthLabel,
  groupEventsByDay,
  monthPrefix,
  parseDateKey,
  sortEventsByTime,
  toDateKey,
  todayParts,
} from './utils';

function shiftMonth(year: number, month: number, delta: number) {
  const date = new Date(year, month - 1 + delta, 1);
  return { year: date.getFullYear(), month: date.getMonth() + 1 };
}

function timeToMinutes(time: string) {
  const match = time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return 0;

  const [, hourRaw, minuteRaw, periodRaw] = match;
  const hour = Number(hourRaw);
  const minute = Number(minuteRaw);
  const period = periodRaw.toUpperCase();
  const normalizedHour = (hour % 12) + (period === 'PM' ? 12 : 0);

  return normalizedHour * 60 + minute;
}

function findInitialFocus(events: TeacherCalendarEvent[], todayKey: string) {
  const upcoming = events
    .filter((event) => event.dateKey >= todayKey)
    .sort((a, b) => {
      const dateSort = a.dateKey.localeCompare(b.dateKey);
      return dateSort || timeToMinutes(a.startTime) - timeToMinutes(b.startTime);
    });

  return upcoming.find((event) => event.type === 'Class') ?? upcoming[0] ?? null;
}

export function useCalendar() {
  const { classroomOptions, events: seedEvents } = adminCalendarPageMock;
  const today = todayParts();
  const todayKey = toDateKey(today.year, today.month, today.day);
  const initialFocus = findInitialFocus(seedEvents, todayKey);
  const initialKey = initialFocus?.dateKey ?? todayKey;
  const initialDate = parseDateKey(initialKey);

  const [events, setEvents] = useState(seedEvents);
  const [viewYear, setViewYear] = useState(initialDate.year);
  const [viewMonth, setViewMonth] = useState(initialDate.month);
  const [selectedDateKey, setSelectedDateKey] = useState(initialKey);
  const [isDayDetailOpen, setIsDayDetailOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [focusEventId, setFocusEventId] = useState<string | null>(null);

  const selected = parseDateKey(selectedDateKey);
  const metrics = useMemo(() => buildAdminCalendarMetrics(events), [events]);

  const eventsByDay = useMemo(() => {
    const prefix = monthPrefix(viewYear, viewMonth);
    return groupEventsByDay(
      events.filter((event) => event.dateKey.startsWith(prefix)),
    );
  }, [events, viewYear, viewMonth]);

  const selectedDayEvents = useMemo(
    () =>
      sortEventsByTime(events.filter((event) => event.dateKey === selectedDateKey)),
    [events, selectedDateKey],
  );

  const focusDate = (dateKey: string, eventId: string | null = null, openModal = true) => {
    const { year, month } = parseDateKey(dateKey);
    setViewYear(year);
    setViewMonth(month);
    setSelectedDateKey(dateKey);
    setFocusEventId(eventId);
    if (openModal) {
      setIsDayDetailOpen(true);
    }
  };

  const selectDay = (day: number) => {
    focusDate(toDateKey(viewYear, viewMonth, day), null, false);
  };

  const openEventDetail = (event: TeacherCalendarEvent) => {
    focusDate(event.dateKey, event.id);
  };

  const closeDayDetail = () => {
    setIsDayDetailOpen(false);
    setFocusEventId(null);
  };

  const openCreate = () => {
    setIsDayDetailOpen(false);
    setIsCreateOpen(true);
  };

  const createEvent = (input: CreateCalendarEventInput) => {
    const next = buildEventFromInput(input, `evt-${Date.now()}`);
    setEvents((prev) => [next, ...prev]);
    setIsCreateOpen(false);
    focusDate(next.dateKey, next.id);
  };

  const goToPrevMonth = () => {
    const next = shiftMonth(viewYear, viewMonth, -1);
    setViewYear(next.year);
    setViewMonth(next.month);
  };

  const goToNextMonth = () => {
    const next = shiftMonth(viewYear, viewMonth, 1);
    setViewYear(next.year);
    setViewMonth(next.month);
  };

  const goToToday = () => {
    const now = todayParts();
    setViewYear(now.year);
    setViewMonth(now.month);
    setSelectedDateKey(toDateKey(now.year, now.month, now.day));
  };

  return {
    metrics,
    classroomOptions,
    monthLabel: formatMonthLabel(viewYear, viewMonth),
    year: viewYear,
    month: viewMonth,
    eventsByDay,
    selectedDay: selected.day,
    selectedYear: selected.year,
    selectedMonth: selected.month,
    selectedDateKey,
    selectedDayLabel: formatDayLabel(selectedDateKey),
    selectedDayEvents,
    selectDay,
    openDayDetail: () => focusDate(selectedDateKey),
    openEventDetail,
    closeDayDetail,
    isDayDetailOpen,
    focusEventId,
    isCreateOpen,
    openCreate,
    closeCreate: () => setIsCreateOpen(false),
    createEvent,
    goToPrevMonth,
    goToNextMonth,
    goToToday,
    today,
  };
}
