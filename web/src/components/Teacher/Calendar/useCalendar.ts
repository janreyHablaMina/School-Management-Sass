'use client';

import { useMemo, useState } from 'react';
import { teacherCalendarPageMock } from '@/lib/mock/teacherCalendar.mock';
import type { CalendarFilter, TeacherCalendarEvent } from '@/types/teacherCalendar';
import { formatDayLabel, formatMonthLabel, toDateKey } from './utils';

function todayParts(date = new Date()) {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  };
}

export function useCalendar() {
  const { metrics, filters, events } = teacherCalendarPageMock;
  const today = todayParts();

  const [year, setYear] = useState(today.year);
  const [month, setMonth] = useState(today.month);
  const [selectedDay, setSelectedDay] = useState(today.day);
  const [selectedYear, setSelectedYear] = useState(today.year);
  const [selectedMonth, setSelectedMonth] = useState(today.month);
  const [typeFilter, setTypeFilter] = useState<CalendarFilter>('All');

  const filteredEvents = useMemo(() => {
    if (typeFilter === 'All') return events;
    return events.filter((event) => event.type === typeFilter);
  }, [events, typeFilter]);

  const monthPrefix = `${year}-${String(month).padStart(2, '0')}`;

  const monthEvents = useMemo(
    () => filteredEvents.filter((event) => event.dateKey.startsWith(monthPrefix)),
    [filteredEvents, monthPrefix],
  );

  const eventsByDay = useMemo(() => {
    const map = new Map<number, TeacherCalendarEvent[]>();
    monthEvents.forEach((event) => {
      const day = Number(event.dateKey.slice(-2));
      const list = map.get(day) ?? [];
      list.push(event);
      map.set(day, list);
    });
    map.forEach((list, day) => {
      map.set(
        day,
        [...list].sort((a, b) => a.startTime.localeCompare(b.startTime)),
      );
    });
    return map;
  }, [monthEvents]);

  const selectedDateKey = toDateKey(selectedYear, selectedMonth, selectedDay);

  const selectedDayEvents = useMemo(
    () =>
      filteredEvents
        .filter((event) => event.dateKey === selectedDateKey)
        .sort((a, b) => a.startTime.localeCompare(b.startTime)),
    [filteredEvents, selectedDateKey],
  );

  const selectDay = (day: number) => {
    setSelectedDay(day);
    setSelectedYear(year);
    setSelectedMonth(month);
  };

  const goToPrevMonth = () => {
    if (month === 1) {
      setMonth(12);
      setYear((value) => value - 1);
      return;
    }
    setMonth((value) => value - 1);
  };

  const goToNextMonth = () => {
    if (month === 12) {
      setMonth(1);
      setYear((value) => value + 1);
      return;
    }
    setMonth((value) => value + 1);
  };

  const goToToday = () => {
    const now = todayParts();
    setYear(now.year);
    setMonth(now.month);
    setSelectedYear(now.year);
    setSelectedMonth(now.month);
    setSelectedDay(now.day);
  };

  return {
    metrics,
    filters,
    typeFilter,
    setTypeFilter,
    monthLabel: formatMonthLabel(year, month),
    year,
    month,
    eventsByDay,
    selectedDay,
    selectedYear,
    selectedMonth,
    selectedDateKey,
    selectedDayLabel: formatDayLabel(selectedDateKey),
    selectedDayEvents,
    selectDay,
    goToPrevMonth,
    goToNextMonth,
    goToToday,
    today,
  };
}
