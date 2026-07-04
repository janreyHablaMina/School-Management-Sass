import { Student, Teacher, Section, AICreditEntry, SchoolDetails } from '@/types/school';

export const getSchoolDetails = (schoolName: string): SchoolDetails => {
  if (schoolName === "St. Mary's Academy") {
    return {
      principal: 'Sr. Maria Theresa Santos',
      email: 'info@stmarysacademy.edu.ph',
      phone: '(02) 8123 4567',
      address: '123 Rizal Avenue, Manila, Metro Manila 1000',
      schoolYear: '2024 - 2025',
      id: 'SCH-00024',
      sections: 18,
      planLimit: 'Up to 500 students',
      paymentMethod: 'MasterCard •••• 4242',
      creditsUsed: 100,
      creditsTotal: 100,
      creditsReset: 'June 31, 2025',
      activities: [
        { text: 'New teacher Juan Dela Cruz was added', time: 'May 31, 2025 • 10:30 AM' },
        { text: 'Grade 7 - St. Benedict section was created', time: 'May 30, 2025 • 03:15 PM' },
        { text: 'New assignment "Math Worksheet 1" was posted', time: 'May 30, 2025 • 02:45 PM' },
        { text: 'Quiz "Science Quiz Bee" was created', time: 'May 29, 2025 • 11:20 AM' },
        { text: 'Attendance for May 29 was recorded', time: 'May 28, 2025 • 09:10 AM' },
      ],
      creditsBreakdown: [
        { tool: 'AI Quiz Generator', count: 45 },
        { tool: 'AI Assignment Generator', count: 20 },
        { tool: 'AI Reviewer Generator', count: 20 },
        { tool: 'AI Lesson Summary', count: 10 },
        { tool: 'AI Rubric Generator', count: 5 },
      ],
    };
  }

  return {
    principal: 'Dr. Juanito dela Cruz',
    email: `contact@${schoolName.toLowerCase().replace(/[^a-z0-9]/g, '')}.edu.ph`,
    phone: '(02) 8987 6543',
    address: 'University Boulevard, City Center',
    schoolYear: '2024 - 2025',
    id: 'SCH-00' + Math.floor(Math.random() * 90000 + 10000),
    sections: 12,
    planLimit: 'Up to 500 students',
    paymentMethod: 'Visa •••• 9876',
    creditsUsed: 42,
    creditsTotal: 100,
    creditsReset: 'June 30, 2025',
    activities: [
      { text: 'Academic calendar updated', time: 'May 28, 2025 • 08:30 AM' },
      { text: 'Teacher roster finalized', time: 'May 25, 2025 • 02:15 PM' },
    ],
    creditsBreakdown: [
      { tool: 'AI Quiz Generator', count: 25 },
      { tool: 'AI Assignment Generator', count: 12 },
      { tool: 'AI Lesson Summary', count: 5 },
    ],
  };
};

export const mockStudents: Student[] = [
  { name: 'Juan Miguel Dela Cruz', id: 'STU-2025-0001', grade: 'Grade 7 - St. Augustine', gender: 'Male', dob: 'Mar 12, 2011', status: 'Active', join: 'May 31, 2025' },
  { name: 'Maria Sofia Reyes', id: 'STU-2025-0002', grade: 'Grade 7 - St. Augustine', gender: 'Female', dob: 'Jul 24, 2011', status: 'Active', join: 'May 31, 2025' },
  { name: 'Rafael Antonio Garcia', id: 'STU-2025-0003', grade: 'Grade 8 - St. Benedict', gender: 'Male', dob: 'Feb 5, 2011', status: 'Active', join: 'May 31, 2025' },
  { name: 'Angela Marie Santos', id: 'STU-2025-0004', grade: 'Grade 8 - St. Benedict', gender: 'Female', dob: 'Oct 18, 2010', status: 'Active', join: 'May 31, 2025' },
  { name: 'Gabriel Matthew Lim', id: 'STU-2025-0005', grade: 'Grade 9 - St. Francis', gender: 'Male', dob: 'Jan 7, 2010', status: 'Active', join: 'May 31, 2025' },
  { name: 'Kimberly Anne Tan', id: 'STU-2025-0006', grade: 'Grade 9 - St. Francis', gender: 'Female', dob: 'Aug 30, 2009', status: 'Inactive', join: 'May 31, 2025' },
  { name: 'Liam Nathaniel Co', id: 'STU-2025-0007', grade: 'Grade 10 - St. John', gender: 'Male', dob: 'May 14, 2009', status: 'Active', join: 'May 31, 2025' },
  { name: 'Beatriz Isabella Cruz', id: 'STU-2025-0008', grade: 'Grade 10 - St. John', gender: 'Female', dob: 'Nov 3, 2009', status: 'Active', join: 'May 31, 2025' },
];

export const mockTeachers: Teacher[] = [
  { name: 'Juan Dela Cruz', id: 'TCH-2025-0001', subject: 'Mathematics', position: 'Subject Teacher', type: 'Full-time', status: 'Active', join: 'May 31, 2025', gender: 'Male' },
  { name: 'Maria Elena Reyes', id: 'TCH-2025-0002', subject: 'English', position: 'Subject Teacher', type: 'Full-time', status: 'Active', join: 'May 31, 2025', gender: 'Female' },
  { name: 'Robert Santos', id: 'TCH-2025-0003', subject: 'Science', position: 'Subject Teacher', type: 'Full-time', status: 'Active', join: 'May 31, 2025', gender: 'Male' },
  { name: 'Michelle Garcia', id: 'TCH-2025-0004', subject: 'Filipino', position: 'Subject Teacher', type: 'Full-time', status: 'Active', join: 'May 31, 2025', gender: 'Female' },
  { name: 'Daniel Lim', id: 'TCH-2025-0005', subject: 'Araling Panlipunan', position: 'Subject Teacher', type: 'Part-time', status: 'Active', join: 'Jun 1, 2025', gender: 'Male' },
  { name: 'Patricia Torres', id: 'TCH-2025-0006', subject: 'MAPEH', position: 'Subject Teacher', type: 'Full-time', status: 'Active', join: 'May 31, 2025', gender: 'Female' },
  { name: 'Mark Joseph Villanueva', id: 'TCH-2025-0007', subject: 'Computer', position: 'Subject Teacher', type: 'Part-time', status: 'Active', join: 'Jun 2, 2025', gender: 'Male' },
  { name: 'Christine Faith Go', id: 'TCH-2025-0008', subject: 'TLE', position: 'Subject Teacher', type: 'Full-time', status: 'Inactive', join: 'May 15, 2025', gender: 'Female' },
];

export const mockSections: Section[] = [
  { id: 'SEC-001', short: '7A', name: 'Grade 7 - St. Augustine', adviser: 'Maria Elena Reyes', students: 32, capacity: 35, utilization: 91.4, status: 'Near Capacity', year: '2024 - 2025' },
  { id: 'SEC-002', short: '7B', name: 'Grade 7 - St. Monica', adviser: 'Robert Santos', students: 28, capacity: 35, utilization: 80.0, status: 'Near Capacity', year: '2024 - 2025' },
  { id: 'SEC-003', short: '8A', name: 'Grade 8 - St. Benedict', adviser: 'Michelle Garcia', students: 30, capacity: 35, utilization: 85.7, status: 'Near Capacity', year: '2024 - 2025' },
  { id: 'SEC-004', short: '8B', name: 'Grade 8 - St. Clare', adviser: 'Daniel Lim', students: 25, capacity: 35, utilization: 71.4, status: 'Active', year: '2024 - 2025' },
  { id: 'SEC-005', short: '9A', name: 'Grade 9 - St. Francis', adviser: 'Patricia Torres', students: 27, capacity: 35, utilization: 77.1, status: 'Active', year: '2024 - 2025' },
  { id: 'SEC-006', short: '9B', name: 'Grade 9 - St. Therese', adviser: 'Mark Joseph Villanueva', students: 26, capacity: 35, utilization: 74.3, status: 'Active', year: '2024 - 2025' },
  { id: 'SEC-007', short: '10A', name: 'Grade 10 - St. John', adviser: 'Christine Faith Go', students: 33, capacity: 35, utilization: 94.3, status: 'Full Capacity', year: '2024 - 2025' },
  { id: 'SEC-008', short: '10B', name: 'Grade 10 - St. Paul', adviser: 'Juan Dela Cruz', students: 31, capacity: 35, utilization: 88.6, status: 'Near Capacity', year: '2024 - 2025' },
];

export const mockAICreditHistory: AICreditEntry[] = [
  { date: 'May 31, 2025 10:30 AM', feature: 'AI Quiz Generator', description: 'Generated quiz for Grade 7 - Science', credits: 10, user: 'Maria Elena Reyes', initials: 'MR', role: 'Teacher', avatarColor: '#b884ff' },
  { date: 'May 31, 2025 09:15 AM', feature: 'AI Assignment Generator', description: 'Generated assignment for Grade 8 - English', credits: 5, user: 'Robert Santos', initials: 'RS', role: 'Teacher', avatarColor: '#84a9ff' },
  { date: 'May 30, 2025 04:45 PM', feature: 'AI Reviewer Generator', description: 'Generated reviewer for Grade 9 - Math', credits: 5, user: 'Daniel Lim', initials: 'DL', role: 'Teacher', avatarColor: '#84a9ff' },
  { date: 'May 30, 2025 02:20 PM', feature: 'AI Quiz Generator', description: 'Generated quiz for Grade 10 - TLE', credits: 10, user: 'Patricia Torres', initials: 'PT', role: 'Teacher', avatarColor: '#4df58a' },
  { date: 'May 29, 2025 11:05 AM', feature: 'AI Lesson Summary', description: 'Generated lesson summary for Grade 7 - Araling Panlipunan', credits: 10, user: 'Michelle Garcia', initials: 'MG', role: 'Teacher', avatarColor: '#4df58a' },
];
