export const getSchoolDetails = (schoolName: string) => {
  if (schoolName === "St. Mary's Academy") {
    return {
      principal: "Sr. Maria Theresa Santos",
      email: "info@stmarysacademy.edu.ph",
      phone: "(02) 8123 4567",
      address: "123 Rizal Avenue, Manila, Metro Manila 1000",
      schoolYear: "2024 - 2025",
      id: "SCH-00024",
      sections: 18,
      planLimit: "Up to 500 students",
      paymentMethod: "MasterCard •••• 4242",
      creditsUsed: 100,
      creditsTotal: 100,
      creditsReset: "June 31, 2025",
      activities: [
        { text: "New teacher Juan Dela Cruz was added", time: "May 31, 2025 • 10:30 AM" },
        { text: "Grade 7 - St. Benedict section was created", time: "May 30, 2025 • 03:15 PM" },
        { text: "New assignment \"Math Worksheet 1\" was posted", time: "May 30, 2025 • 02:45 PM" },
        { text: "Quiz \"Science Quiz Bee\" was created", time: "May 29, 2025 • 11:20 AM" },
        { text: "Attendance for May 29 was recorded", time: "May 28, 2025 • 09:10 AM" }
      ],
      creditsBreakdown: [
        { tool: "AI Quiz Generator", count: 45 },
        { tool: "AI Assignment Generator", count: 20 },
        { tool: "AI Reviewer Generator", count: 20 },
        { tool: "AI Lesson Summary", count: 10 },
        { tool: "AI Rubric Generator", count: 5 }
      ]
    };
  }
  
  return {
    principal: "Dr. Juanito dela Cruz",
    email: `contact@${schoolName.toLowerCase().replace(/[^a-z0-9]/g, '')}.edu.ph`,
    phone: "(02) 8987 6543",
    address: "University Boulevard, City Center",
    schoolYear: "2024 - 2025",
    id: "SCH-00" + Math.floor(Math.random() * 90000 + 10000),
    sections: 12,
    planLimit: "Up to 500 students",
    paymentMethod: "Visa •••• 9876",
    creditsUsed: 42,
    creditsTotal: 100,
    creditsReset: "June 30, 2025",
    activities: [
      { text: "Academic calendar updated", time: "May 28, 2025 • 08:30 AM" },
      { text: "Teacher roster finalized", time: "May 25, 2025 • 02:15 PM" }
    ],
    creditsBreakdown: [
      { tool: "AI Quiz Generator", count: 25 },
      { tool: "AI Assignment Generator", count: 12 },
      { tool: "AI Lesson Summary", count: 5 }
    ]
  };
};

export const mockStudents = [
  { name: 'Juan Miguel Dela Cruz', id: 'STU-2025-0001', grade: 'Grade 7 - St. Augustine', gender: 'Male', dob: 'Mar 12, 2011', status: 'Active', join: 'May 31, 2025' },
  { name: 'Maria Sofia Reyes', id: 'STU-2025-0002', grade: 'Grade 7 - St. Augustine', gender: 'Female', dob: 'Jul 24, 2011', status: 'Active', join: 'May 31, 2025' },
  { name: 'Rafael Antonio Garcia', id: 'STU-2025-0003', grade: 'Grade 8 - St. Benedict', gender: 'Male', dob: 'Feb 5, 2011', status: 'Active', join: 'May 31, 2025' },
  { name: 'Angela Marie Santos', id: 'STU-2025-0004', grade: 'Grade 8 - St. Benedict', gender: 'Female', dob: 'Oct 18, 2010', status: 'Active', join: 'May 31, 2025' },
  { name: 'Gabriel Matthew Lim', id: 'STU-2025-0005', grade: 'Grade 9 - St. Francis', gender: 'Male', dob: 'Jan 7, 2010', status: 'Active', join: 'May 31, 2025' },
  { name: 'Kimberly Anne Tan', id: 'STU-2025-0006', grade: 'Grade 9 - St. Francis', gender: 'Female', dob: 'Aug 30, 2009', status: 'Inactive', join: 'May 31, 2025' },
  { name: 'Liam Nathaniel Co', id: 'STU-2025-0007', grade: 'Grade 10 - St. John', gender: 'Male', dob: 'May 14, 2009', status: 'Active', join: 'May 31, 2025' },
  { name: 'Beatriz Isabella Cruz', id: 'STU-2025-0008', grade: 'Grade 10 - St. John', gender: 'Female', dob: 'Nov 3, 2009', status: 'Active', join: 'May 31, 2025' },
];

export const mockTeachers = [
  { name: 'Juan Dela Cruz', id: 'TCH-2025-0001', subject: 'Mathematics', position: 'Subject Teacher', type: 'Full-time', status: 'Active', join: 'May 31, 2025', gender: 'Male' },
  { name: 'Maria Elena Reyes', id: 'TCH-2025-0002', subject: 'English', position: 'Subject Teacher', type: 'Full-time', status: 'Active', join: 'May 31, 2025', gender: 'Female' },
  { name: 'Robert Santos', id: 'TCH-2025-0003', subject: 'Science', position: 'Subject Teacher', type: 'Full-time', status: 'Active', join: 'May 31, 2025', gender: 'Male' },
  { name: 'Michelle Garcia', id: 'TCH-2025-0004', subject: 'Filipino', position: 'Subject Teacher', type: 'Full-time', status: 'Active', join: 'May 31, 2025', gender: 'Female' },
  { name: 'Daniel Lim', id: 'TCH-2025-0005', subject: 'Araling Panlipunan', position: 'Subject Teacher', type: 'Part-time', status: 'Active', join: 'Jun 1, 2025', gender: 'Male' },
  { name: 'Patricia Torres', id: 'TCH-2025-0006', subject: 'MAPEH', position: 'Subject Teacher', type: 'Full-time', status: 'Active', join: 'May 31, 2025', gender: 'Female' },
  { name: 'Mark Joseph Villanueva', id: 'TCH-2025-0007', subject: 'Computer', position: 'Subject Teacher', type: 'Part-time', status: 'Active', join: 'Jun 2, 2025', gender: 'Male' },
  { name: 'Christine Faith Go', id: 'TCH-2025-0008', subject: 'TLE', position: 'Subject Teacher', type: 'Full-time', status: 'Inactive', join: 'May 15, 2025', gender: 'Female' },
];
