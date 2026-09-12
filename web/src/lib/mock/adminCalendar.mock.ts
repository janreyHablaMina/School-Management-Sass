import { CALENDAR_TYPE_ACCENTS } from '@/lib/calendar/constants';
import { formatDateKey, shiftDays } from '@/lib/calendar/dates';
import type { TeacherCalendarEvent, TeacherCalendarPageData } from '@/types/teacherCalendar';

function event(
  partial: Omit<TeacherCalendarEvent, 'accent'> & { accent?: string },
): TeacherCalendarEvent {
  return {
    ...partial,
    accent: partial.accent ?? CALENDAR_TYPE_ACCENTS[partial.type] ?? '#3b82f6',
  };
}

export function buildAdminCalendarMock(referenceDate = new Date()): TeacherCalendarPageData {
  const today = new Date(referenceDate);
  today.setHours(12, 0, 0, 0);

  const events: TeacherCalendarEvent[] = [
    event({
      id: 'a1',
      title: 'School Board Meeting',
      type: 'Event',
      classLabel: 'Admin Board',
      dateKey: formatDateKey(today),
      startTime: '10:00 AM',
      endTime: '11:30 AM',
      location: 'Conference Room A',
      status: 'Upcoming',
      description: 'Monthly review of school budget and new policies.',
    }),
    event({
      id: 'a2',
      title: 'All-Staff Assembly',
      type: 'Event',
      classLabel: 'All Staff',
      dateKey: formatDateKey(shiftDays(today, 2)),
      startTime: '8:00 AM',
      endTime: '9:00 AM',
      location: 'Main Auditorium',
      status: 'Upcoming',
      description: 'Kick-off assembly for the second semester.',
    }),
    event({
      id: 'a3',
      title: 'Submit Compliance Report',
      type: 'Reminder',
      classLabel: 'Admin',
      dateKey: formatDateKey(shiftDays(today, 5)),
      startTime: '5:00 PM',
      status: 'Due soon',
      description: 'State compliance report due for Q3.',
    }),
    event({
      id: 'a4',
      title: 'PTA Parent-Teacher Evening',
      type: 'Event',
      classLabel: 'All School',
      dateKey: formatDateKey(shiftDays(today, 7)),
      startTime: '6:00 PM',
      endTime: '8:00 PM',
      location: 'Gymnasium',
      status: 'Upcoming',
      description: 'School-wide parent-teacher association gathering and mixer.',
    }),
  ];

  return {
    classroomOptions: [
      'All School',
      'All Staff',
      'Admin Board',
      'Grade 7',
      'Grade 8',
      'Grade 9',
      'Grade 10',
      'Grade 11',
      'Grade 12',
    ],
    events,
  };
}

export const adminCalendarPageMock = buildAdminCalendarMock();
