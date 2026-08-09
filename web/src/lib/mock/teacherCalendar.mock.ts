import type {
  CalendarEventType,
  TeacherCalendarEvent,
  TeacherCalendarPageData,
} from '@/types/teacherCalendar';

function toDateKey(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function shiftDays(base: Date, days: number) {
  const next = new Date(base);
  next.setHours(12, 0, 0, 0);
  next.setDate(next.getDate() + days);
  return next;
}

const TYPE_ACCENT: Record<CalendarEventType, string> = {
  Class: '#b68eff',
  Assignment: '#84a9ff',
  Quiz: '#5cc789',
  Exam: '#ff7e93',
  Event: '#f5c842',
  Reminder: '#f5a623',
};

function event(
  partial: Omit<TeacherCalendarEvent, 'accent'> & { accent?: string },
): TeacherCalendarEvent {
  return {
    ...partial,
    accent: partial.accent ?? TYPE_ACCENT[partial.type],
  };
}

export function buildTeacherCalendarMock(referenceDate = new Date()): TeacherCalendarPageData {
  const today = new Date(referenceDate);
  today.setHours(12, 0, 0, 0);

  const events: TeacherCalendarEvent[] = [
    event({
      id: 'c1',
      title: 'Mathematics',
      type: 'Class',
      classLabel: 'Grade 7 - Section A',
      dateKey: toDateKey(today),
      startTime: '8:00 AM',
      endTime: '9:00 AM',
      location: 'Room 201',
    }),
    event({
      id: 'c2',
      title: 'Science Lab',
      type: 'Class',
      classLabel: 'Grade 8 - Section B',
      dateKey: toDateKey(today),
      startTime: '9:30 AM',
      endTime: '10:30 AM',
      location: 'Lab 3',
    }),
    event({
      id: 'c3',
      title: 'ICT Period',
      type: 'Class',
      classLabel: 'Grade 10 - ICT',
      dateKey: toDateKey(today),
      startTime: '11:00 AM',
      endTime: '12:00 PM',
      location: 'Computer Lab',
    }),
    event({
      id: 'a1',
      title: 'Essay Draft Due',
      type: 'Assignment',
      classLabel: 'Grade 9 - Section A',
      dateKey: toDateKey(shiftDays(today, 1)),
      startTime: '11:59 PM',
    }),
    event({
      id: 'q1',
      title: 'Fractions Quiz',
      type: 'Quiz',
      classLabel: 'Grade 7 - Section A',
      dateKey: toDateKey(shiftDays(today, 2)),
      startTime: '8:15 AM',
      endTime: '8:45 AM',
      location: 'Room 201',
    }),
    event({
      id: 'e1',
      title: 'Midterm Exam',
      type: 'Exam',
      classLabel: 'Grade 8 - Section B',
      dateKey: toDateKey(shiftDays(today, 5)),
      startTime: '9:00 AM',
      endTime: '10:30 AM',
      location: 'Hall B',
    }),
    event({
      id: 'v1',
      title: 'Parent-Teacher Meeting',
      type: 'Event',
      classLabel: 'All Classes',
      dateKey: toDateKey(shiftDays(today, 6)),
      startTime: '2:00 PM',
      endTime: '4:00 PM',
      location: 'Auditorium',
    }),
    event({
      id: 'r1',
      title: 'Submit grades draft',
      type: 'Reminder',
      classLabel: 'Homeroom',
      dateKey: toDateKey(shiftDays(today, -1)),
      startTime: '4:00 PM',
    }),
    event({
      id: 'c4',
      title: 'English',
      type: 'Class',
      classLabel: 'Grade 9 - Section A',
      dateKey: toDateKey(shiftDays(today, -2)),
      startTime: '1:00 PM',
      endTime: '2:00 PM',
      location: 'Room 105',
    }),
    event({
      id: 'a2',
      title: 'Lab Report Due',
      type: 'Assignment',
      classLabel: 'Grade 8 - Section B',
      dateKey: toDateKey(shiftDays(today, 8)),
      startTime: '5:00 PM',
    }),
    event({
      id: 'q2',
      title: 'Vocabulary Check',
      type: 'Quiz',
      classLabel: 'Grade 9 - Section A',
      dateKey: toDateKey(shiftDays(today, 9)),
      startTime: '1:15 PM',
      endTime: '1:40 PM',
      location: 'Room 105',
    }),
    event({
      id: 'v2',
      title: 'Sports Fest Briefing',
      type: 'Event',
      classLabel: 'All Classes',
      dateKey: toDateKey(shiftDays(today, 12)),
      startTime: '3:00 PM',
      endTime: '3:45 PM',
      location: 'Gymnasium',
    }),
    event({
      id: 'c5',
      title: 'Mathematics',
      type: 'Class',
      classLabel: 'Grade 7 - Section A',
      dateKey: toDateKey(shiftDays(today, 3)),
      startTime: '8:00 AM',
      endTime: '9:00 AM',
      location: 'Room 201',
    }),
    event({
      id: 'r2',
      title: 'Print quiz sheets',
      type: 'Reminder',
      classLabel: 'Grade 7 - Section A',
      dateKey: toDateKey(shiftDays(today, 2)),
      startTime: '7:30 AM',
    }),
  ];

  const monthKey = toDateKey(today).slice(0, 7);
  const monthEvents = events.filter((item) => item.dateKey.startsWith(monthKey));
  const classes = monthEvents.filter((item) => item.type === 'Class').length;
  const deadlines = monthEvents.filter((item) =>
    item.type === 'Assignment' || item.type === 'Quiz' || item.type === 'Exam',
  ).length;
  const meetings = monthEvents.filter((item) => item.type === 'Event').length;

  return {
    metrics: [
      {
        label: 'This Month',
        value: String(monthEvents.length),
        subtitle: 'Scheduled items',
        icon: '📅',
        accent: '#f5c842',
      },
      {
        label: 'Classes',
        value: String(classes),
        subtitle: 'Teaching blocks',
        icon: '📚',
        accent: '#b68eff',
      },
      {
        label: 'Deadlines',
        value: String(deadlines),
        subtitle: 'Assignments & tests',
        icon: '⏰',
        accent: '#ff7e93',
      },
      {
        label: 'Events',
        value: String(meetings),
        subtitle: 'Meetings & school events',
        icon: '🗓️',
        accent: '#5cc789',
      },
    ],
    filters: ['All', 'Class', 'Assignment', 'Quiz', 'Exam', 'Event', 'Reminder'],
    events,
  };
}

export const teacherCalendarPageMock = buildTeacherCalendarMock();
