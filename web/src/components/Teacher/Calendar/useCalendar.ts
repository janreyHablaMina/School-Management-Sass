'use client';

import { useMemo, useState } from 'react';
import { teacherCalendarPageMock } from '@/lib/mock/teacherCalendar.mock';
import type {
  CalendarFilter,
  CreateCalendarEventInput,
  TeacherCalendarEvent,
} from '@/types/teacherCalendar';
import {
  buildCalendarMetrics,
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

export function useCalendar() {
  const { filters, classroomOptions, events: seedEvents } = teacherCalendarPageMock;
  const today = todayParts();
  const initialKey = toDateKey(today.year, today.month, today.day);

  const [events, setEvents] = useState(seedEvents);
  const [viewYear, setViewYear] = useState(today.year);
  const [viewMonth, setViewMonth] = useState(today.month);
  const [selectedDateKey, setSelectedDateKey] = useState(initialKey);
  const [typeFilter, setTypeFilter] = useState<CalendarFilter>('All');
  const [isDayDetailOpen, setIsDayDetailOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [focusEventId, setFocusEventId] = useState<string | null>(null);

  const selected = parseDateKey(selectedDateKey);
  const metrics = useMemo(() => buildCalendarMetrics(events), [events]);

  const filteredEvents = useMemo(() => {
    if (typeFilter === 'All') return events;
    return events.filter((event) => event.type === typeFilter);
  }, [events, typeFilter]);

  const eventsByDay = useMemo(() => {
    const prefix = monthPrefix(viewYear, viewMonth);
    return groupEventsByDay(
      filteredEvents.filter((event) => event.dateKey.startsWith(prefix)),
    );
  }, [filteredEvents, viewYear, viewMonth]);

  const selectedDayEvents = useMemo(
    () =>
      sortEventsByTime(filteredEvents.filter((event) => event.dateKey === selectedDateKey)),
    [filteredEvents, selectedDateKey],
  );

  const openDayDetail = (eventId: string | null = null) => {
    setFocusEventId(eventId);
    setIsDayDetailOpen(true);
  };

  const selectDay = (day: number) => {
    setSelectedDateKey(toDateKey(viewYear, viewMonth, day));
    openDayDetail();
  };

  const openSelectedDayDetail = () => openDayDetail();

  const openEventDetail = (event: TeacherCalendarEvent) => {
    const { year, month } = parseDateKey(event.dateKey);
    setViewYear(year);
    setViewMonth(month);
    setSelectedDateKey(event.dateKey);
    openDayDetail(event.id);
  };

  const closeDayDetail = () => {
    setIsDayDetailOpen(false);
    setFocusEventId(null);
  };

  const openCreate = () => {
    setIsDayDetailOpen(false);
    setIsCreateOpen(true);
  };

  const closeCreate = () => setIsCreateOpen(false);

  const createEvent = (input: CreateCalendarEventInput) => {
    const next = buildEventFromInput(input, `evt-${Date.now()}`);
    const { year, month } = parseDateKey(next.dateKey);

    setEvents((prev) => [next, ...prev]);
    setViewYear(year);
    setViewMonth(month);
    setSelectedDateKey(next.dateKey);
    setIsCreateOpen(false);
    setFocusEventId(next.id);
    setIsDayDetailOpen(true);
  };

  const goToPrevMonth = () => {
    if (viewMonth === 1) {
      setViewMonth(12);
      setViewYear((value) => value - 1);
      return;
    }
    setViewMonth((value) => value - 1);
  };

  const goToNextMonth = () => {
    if (viewMonth === 12) {
      setViewMonth(1);
      setViewYear((value) => value + 1);
      return;
    }
    setViewMonth((value) => value + 1);
  };

  const goToToday = () => {
    const now = todayParts();
    setViewYear(now.year);
    setViewMonth(now.month);
    setSelectedDateKey(toDateKey(now.year, now.month, now.day));
  };

  return {
    metrics,
    filters,
    classroomOptions,
    typeFilter,
    setTypeFilter,
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
    openSelectedDayDetail,
    openEventDetail,
    closeDayDetail,
    isDayDetailOpen,
    focusEventId,
    isCreateOpen,
    openCreate,
    closeCreate,
    createEvent,
    goToPrevMonth,
    goToNextMonth,
    goToToday,
    today,
  };
}
