import React, { useMemo, useState } from 'react';
import type { MyClassRow } from '@/types/myClasses';
import type { TeacherCalendarEvent } from '@/types/teacherCalendar';
import { listStyles, PageHeader } from '../../shared';
import { parseScheduleParts } from '../utils';
import { CalendarMonthGrid } from '../../Calendar/components/CalendarMonthGrid';
import { CalendarAgenda } from '../../Calendar/components/CalendarAgenda';
import { formatDayLabel } from '../../Calendar/utils';
import calendarStyles from '../../Calendar/calendar.module.css';

interface ClassScheduleViewProps {
  cls: MyClassRow;
  onBack: () => void;
  onEdit?: () => void;
  onNavigate?: (request: string) => void;
}

const DAY_MAP: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

function todayParts() {
  const d = new Date();
  return { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() };
}

function shiftMonth(year: number, month: number, delta: number) {
  const date = new Date(year, month - 1 + delta, 1);
  return { year: date.getFullYear(), month: date.getMonth() + 1 };
}

function formatMonthLabel(year: number, month: number) {
  const date = new Date(year, month - 1, 1);
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

export function ClassScheduleView({
  cls,
  onBack,
  onEdit,
  onNavigate,
}: ClassScheduleViewProps) {
  const isArchived = cls.status === 'Archived' || cls.schedule === 'Archived';
  const today = todayParts();
  
  const [viewYear, setViewYear] = useState(today.year);
  const [viewMonth, setViewMonth] = useState(today.month);
  const [selectedDay, setSelectedDay] = useState(today.day);

  // Build sessions array from flexible data, or fallback to the old string parsing
  const sessions = useMemo(() => {
    let s = cls.sessions || [];
    if (s.length === 0 && !isArchived) {
      const parts = parseScheduleParts(cls.schedule);
      s = parts.days.map((day) => ({
        day,
        startTime: parts.startTime,
        endTime: parts.endTime,
      }));
    }
    return s;
  }, [cls.sessions, cls.schedule, isArchived]);

  // Generate recurring events for the current month view
  const eventsByDay = useMemo(() => {
    const map = new Map<number, TeacherCalendarEvent[]>();
    if (isArchived) return map;

    const daysInMonth = new Date(viewYear, viewMonth, 0).getDate();
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(viewYear, viewMonth - 1, day);
      const dayOfWeek = date.getDay();
      
      const daySessions = sessions.filter(s => DAY_MAP[s.day.substring(0,3)] === dayOfWeek);
      
      if (daySessions.length > 0) {
        const events: TeacherCalendarEvent[] = daySessions.map((s, idx) => ({
          id: `class-${cls.id}-${day}-${idx}`,
          title: cls.subject,
          type: 'Class',
          classLabel: cls.gradeSection,
          dateKey: `${viewYear}-${String(viewMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
          startTime: s.startTime,
          endTime: s.endTime,
          location: cls.room,
          accent: cls.accent,
          status: 'Upcoming',
          description: '',
        }));
        map.set(day, events);
      }
    }
    return map;
  }, [sessions, viewYear, viewMonth, isArchived, cls.id, cls.subject, cls.gradeSection]);

  const monthLabel = formatMonthLabel(viewYear, viewMonth);
  const selectedDateKey = `${viewYear}-${String(viewMonth).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;
  const selectedDayLabel = formatDayLabel(selectedDateKey);
  const selectedDayEvents = eventsByDay.get(selectedDay) || [];

  return (
    <div className={listStyles.page}>
      <div style={{ marginBottom: '1.5rem' }}>
        <button type="button" className={listStyles.backBtn} onClick={onBack}>
          <span aria-hidden>‹</span> Back to My Classes
        </button>
      </div>

      <PageHeader
        title={`${cls.subject} Schedule`}
        subtitle={`${cls.gradeSection} · Room ${cls.room}`}
      >
        {onNavigate ? (
          <button type="button" className={listStyles.secondaryBtn} onClick={() => onNavigate('Calendar')}>
            Open Full Calendar
          </button>
        ) : null}
        {onEdit && !isArchived ? (
          <button type="button" className={listStyles.primaryBtn} onClick={onEdit}>
            Edit schedule
          </button>
        ) : null}
      </PageHeader>

      {isArchived ? (
        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <p style={{ color: 'rgba(255,255,255,0.7)' }}>This class is archived and has no active sessions.</p>
        </div>
      ) : (
        <div className={calendarStyles.layout}>
          <CalendarMonthGrid
            monthLabel={monthLabel}
            year={viewYear}
            month={viewMonth}
            eventsByDay={eventsByDay}
            selectedDay={selectedDay}
            selectedYear={viewYear}
            selectedMonth={viewMonth}
            today={today}
            onSelectDay={setSelectedDay}
            onPrevMonth={() => {
              const next = shiftMonth(viewYear, viewMonth, -1);
              setViewYear(next.year);
              setViewMonth(next.month);
            }}
            onNextMonth={() => {
              const next = shiftMonth(viewYear, viewMonth, 1);
              setViewYear(next.year);
              setViewMonth(next.month);
            }}
          />
          <CalendarAgenda
            dayLabel={selectedDayLabel}
            events={selectedDayEvents}
            onViewDayDetails={() => {}}
            onOpenEvent={() => {}}
          />
        </div>
      )}
    </div>
  );
}
