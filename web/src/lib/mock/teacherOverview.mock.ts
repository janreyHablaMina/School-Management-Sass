export const teacherClassesData = [
  { class: 'STEM 11 - A', grade: 'Grade 11', students: 32, adviser: true },
  { class: 'STEM 11 - B', grade: 'Grade 11', students: 30, adviser: true },
  { class: 'STEM 12 - A', grade: 'Grade 12', students: 34, adviser: false },
  { class: 'STEM 12 - B', grade: 'Grade 12', students: 32, adviser: false },
];

export const teacherSubjectsData = [
  { subject: 'General Biology 1', grade: 'Grade 11', periods: 5, students: 62 },
  { subject: 'General Biology 2', grade: 'Grade 12', periods: 5, students: 64 },
  { subject: 'Research in Science', grade: 'Grade 11', periods: 3, students: 62 },
  { subject: 'Practical Research 1', grade: 'Grade 12', periods: 3, students: 64 },
];

export const teacherScheduleData = [
  {
    id: '1',
    time: '07:30 AM - 08:30 AM',
    subject: 'General Biology 1',
    period: 'Period 1',
    section: 'STEM 11 - A',
    room: 'Sci-Lab 1',
    students: 32,
    status: 'completed',
  },
  {
    id: '2',
    time: '09:45 AM - 10:45 AM',
    subject: 'Research in Science',
    period: 'Period 3',
    section: 'STEM 11 - A',
    room: 'Room 302',
    students: 28,
    status: 'ongoing',
  },
];

export const teacherActivitiesData = [
  {
    id: '1',
    title: 'Posted Announcement',
    sub: 'General Biology 1 - Quiz Schedule',
    time: '2 hours ago',
    type: 'announcement',
  },
  {
    id: '2',
    title: 'Graded Assignment',
    sub: 'Lab Report: Cell Structure',
    time: 'Yesterday, 4:30 PM',
    type: 'grading',
  },
  {
    id: '3',
    title: 'Submitted Attendance',
    sub: 'STEM 11 - A (Morning Session)',
    time: 'Yesterday, 8:15 AM',
    type: 'attendance',
  },
];

