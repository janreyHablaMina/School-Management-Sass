export interface Teacher {
  id: string;
  name: string;
  email: string;
  employeeId: string;
  department: string;
  departmentColor: string;
  subjects: string;
  classes: number;
  status: 'Active' | 'On Leave';
  statusBg: string;
  statusColor: string;
  lastActiveDate: string;
  lastActiveTime: string;
  avatar: string;
  // Profile specific
  phone?: string;
  address?: string;
  dateHired?: string;
  employmentType?: string;
  highestEducation?: string;
  position?: string;
  gender?: string;
  dateOfBirth?: string;
  civilStatus?: string;
  citizenship?: string;
  languages?: string;
  specialization?: string;
  aboutBio?: string;
}

export const TEACHERS_LIST: Teacher[] = [
  {
    id: 't1',
    name: 'Ms. Anna Reyes',
    email: 'anna.reyes@abcla.edu.ph',
    employeeId: 'TCH-2021-0123',
    department: 'Science',
    departmentColor: '#8b5cf6', // purple
    subjects: 'Biology, Research',
    classes: 5,
    status: 'Active',
    statusBg: 'rgba(52, 211, 153, 0.15)',
    statusColor: '#34d399',
    lastActiveDate: 'May 20, 2025',
    lastActiveTime: '10:30 AM',
    avatar: 'https://i.pravatar.cc/150?u=anna',
    phone: '0917 123 4567',
    address: '123 Sampaguita St., San Pablo City, Laguna',
    dateHired: 'June 15, 2021',
    employmentType: 'Full-time',
    highestEducation: 'Master of Science in Biology',
    position: 'Senior High School Teacher',
    gender: 'Female',
    dateOfBirth: 'May 12, 1992',
    civilStatus: 'Single',
    citizenship: 'Filipino',
    languages: 'English, Filipino',
    specialization: 'Biology Education',
    aboutBio: 'Dedicated Biology teacher with a passion for fostering critical thinking and scientific curiosity in students. Committed to creating an engaging and inclusive learning environment.'
  },
  {
    id: 't2',
    name: 'Mr. Richard Gomez',
    email: 'richard.gomez@abcla.edu.ph',
    employeeId: 'TCH-2020-0087',
    department: 'Mathematics',
    departmentColor: '#8b5cf6',
    subjects: 'General Math, Statistics',
    classes: 4,
    status: 'Active',
    statusBg: 'rgba(52, 211, 153, 0.15)',
    statusColor: '#34d399',
    lastActiveDate: 'May 20, 2025',
    lastActiveTime: '09:15 AM',
    avatar: 'https://i.pravatar.cc/150?u=richard',
    phone: '0917 234 5678',
    address: '456 Mabini St., Manila',
    dateHired: 'August 10, 2020',
    employmentType: 'Full-time',
    highestEducation: 'Master of Arts in Mathematics Education',
    position: 'Senior High School Teacher',
    gender: 'Male',
    dateOfBirth: 'August 24, 1988',
    civilStatus: 'Married',
    citizenship: 'Filipino',
    languages: 'English, Filipino',
    specialization: 'Applied Mathematics',
    aboutBio: 'Passionate about making mathematics accessible and engaging. Strong advocate for logical reasoning and analytical thinking in everyday life.'
  },
  {
    id: 't3',
    name: 'Ms. Maria Santos',
    email: 'maria.santos@abcla.edu.ph',
    employeeId: 'TCH-2022-0156',
    department: 'English',
    departmentColor: '#8b5cf6',
    subjects: 'English, Creative Writing',
    classes: 6,
    status: 'Active',
    statusBg: 'rgba(52, 211, 153, 0.15)',
    statusColor: '#34d399',
    lastActiveDate: 'May 19, 2025',
    lastActiveTime: '04:45 PM',
    avatar: 'https://i.pravatar.cc/150?u=maria',
    phone: '0917 345 6789',
    address: '789 Rizal Ave., Quezon City',
    dateHired: 'July 5, 2022',
    employmentType: 'Full-time',
    highestEducation: 'Master of Arts in English Literature',
    position: 'English Coordinator',
    gender: 'Female',
    dateOfBirth: 'November 3, 1990',
    civilStatus: 'Single',
    citizenship: 'Filipino',
    languages: 'English, Filipino, Spanish',
    specialization: 'Creative Writing, Literature',
    aboutBio: 'A firm believer in the power of words. I strive to help students find their own voice through literature and creative expression.'
  },
  {
    id: 't4',
    name: 'Mr. John Paulo',
    email: 'john.paulo@abcla.edu.ph',
    employeeId: 'TCH-2019-0045',
    department: 'Filipino',
    departmentColor: '#8b5cf6',
    subjects: 'Komunikasyon, Panitikan',
    classes: 5,
    status: 'Active',
    statusBg: 'rgba(52, 211, 153, 0.15)',
    statusColor: '#34d399',
    lastActiveDate: 'May 20, 2025',
    lastActiveTime: '08:20 AM',
    avatar: 'https://i.pravatar.cc/150?u=john',
    phone: '0917 456 7890',
    address: '321 Bonifacio St., Makati City',
    dateHired: 'May 20, 2019',
    employmentType: 'Full-time',
    highestEducation: 'Master of Arts in Filipino Language',
    position: 'Senior High School Teacher',
    gender: 'Male',
    dateOfBirth: 'February 15, 1985',
    civilStatus: 'Married',
    citizenship: 'Filipino',
    languages: 'Filipino, English, Cebuano',
    specialization: 'Philippine Literature',
    aboutBio: 'Nakatuon sa pagpapalaganap at pagpapahalaga sa ating sariling wika at panitikan. Naniniwala sa kapangyarihan ng kultura sa paghubog ng kabataan.'
  },
  {
    id: 't5',
    name: 'Ms. Liza Mendoza',
    email: 'liza.mendoza@abcla.edu.ph',
    employeeId: 'TCH-2021-0102',
    department: 'Social Studies',
    departmentColor: '#8b5cf6',
    subjects: 'Philippine History, Civics',
    classes: 4,
    status: 'Active',
    statusBg: 'rgba(52, 211, 153, 0.15)',
    statusColor: '#34d399',
    lastActiveDate: 'May 18, 2025',
    lastActiveTime: '03:10 PM',
    avatar: 'https://i.pravatar.cc/150?u=liza',
    phone: '0917 567 8901',
    address: '654 Luna St., Pasig City',
    dateHired: 'June 1, 2021',
    employmentType: 'Full-time',
    highestEducation: 'Bachelor of Secondary Education Major in Social Studies',
    position: 'Junior High School Teacher',
    gender: 'Female',
    dateOfBirth: 'October 10, 1994',
    civilStatus: 'Single',
    citizenship: 'Filipino',
    languages: 'English, Filipino',
    specialization: 'Asian History',
    aboutBio: 'Dedicated to teaching history not just as facts, but as lessons for the future. Encouraging students to understand their roots and societal roles.'
  },
  {
    id: 't6',
    name: 'Mr. Daniel Tan',
    email: 'daniel.tan@abcla.edu.ph',
    employeeId: 'TCH-2022-0178',
    department: 'Computer',
    departmentColor: '#8b5cf6',
    subjects: 'ICT, Programming',
    classes: 6,
    status: 'Active',
    statusBg: 'rgba(52, 211, 153, 0.15)',
    statusColor: '#34d399',
    lastActiveDate: 'May 20, 2025',
    lastActiveTime: '11:05 AM',
    avatar: 'https://i.pravatar.cc/150?u=daniel',
    phone: '0917 678 9012',
    address: '987 Roxas Blvd., Manila',
    dateHired: 'August 15, 2022',
    employmentType: 'Full-time',
    highestEducation: 'Bachelor of Science in Information Technology',
    position: 'ICT Instructor',
    gender: 'Male',
    dateOfBirth: 'December 5, 1996',
    civilStatus: 'Single',
    citizenship: 'Filipino',
    languages: 'English, Filipino',
    specialization: 'Software Development, Web Technologies',
    aboutBio: 'Tech enthusiast eager to equip the next generation with essential digital skills. Focuses on practical programming and problem-solving.'
  },
  {
    id: 't7',
    name: 'Ms. Carla Dela Cruz',
    email: 'carla.delacruz@abcla.edu.ph',
    employeeId: 'TCH-2023-0211',
    department: 'MAPEH',
    departmentColor: '#8b5cf6',
    subjects: 'Music, Arts',
    classes: 3,
    status: 'On Leave',
    statusBg: 'rgba(239, 68, 68, 0.15)',
    statusColor: '#ef4444',
    lastActiveDate: 'May 15, 2025',
    lastActiveTime: '02:30 PM',
    avatar: 'https://i.pravatar.cc/150?u=carla',
    phone: '0917 789 0123',
    address: '159 Taft Ave., Pasay City',
    dateHired: 'January 10, 2023',
    employmentType: 'Part-time',
    highestEducation: 'Bachelor of Music in Music Education',
    position: 'Arts and Music Teacher',
    gender: 'Female',
    dateOfBirth: 'September 22, 1993',
    civilStatus: 'Married',
    citizenship: 'Filipino',
    languages: 'English, Filipino',
    specialization: 'Vocal Performance, Visual Arts',
    aboutBio: 'Bringing creativity to the classroom! I believe every student has an inner artist waiting to be discovered and nurtured.'
  },
  {
    id: 't8',
    name: 'Mr. Angelo Bautista',
    email: 'angelo.bautista@abcla.edu.ph',
    employeeId: 'TCH-2020-0071',
    department: 'Physical Education',
    departmentColor: '#8b5cf6',
    subjects: 'PE, Health',
    classes: 4,
    status: 'Active',
    statusBg: 'rgba(52, 211, 153, 0.15)',
    statusColor: '#34d399',
    lastActiveDate: 'May 20, 2025',
    lastActiveTime: '07:50 AM',
    avatar: 'https://i.pravatar.cc/150?u=angelo',
    phone: '0917 890 1234',
    address: '753 Quezon Blvd., Quezon City',
    dateHired: 'July 20, 2020',
    employmentType: 'Full-time',
    highestEducation: 'Bachelor of Physical Education',
    position: 'Sports Coordinator',
    gender: 'Male',
    dateOfBirth: 'March 18, 1989',
    civilStatus: 'Single',
    citizenship: 'Filipino',
    languages: 'English, Filipino',
    specialization: 'Sports Science, Athletics',
    aboutBio: 'Advocating for physical wellness and teamwork. My goal is to build discipline and character through sports and physical activities.'
  },
  {
    id: 't9',
    name: 'Ms. Jessa Villanueva',
    email: 'jessa.villanueva@abcla.edu.ph',
    employeeId: 'TCH-2023-0234',
    department: 'Science',
    departmentColor: '#8b5cf6',
    subjects: 'Chemistry, Earth Science',
    classes: 3,
    status: 'On Leave',
    statusBg: 'rgba(239, 68, 68, 0.15)',
    statusColor: '#ef4444',
    lastActiveDate: 'May 10, 2025',
    lastActiveTime: '01:25 PM',
    avatar: 'https://i.pravatar.cc/150?u=jessa',
    phone: '0917 901 2345',
    address: '246 Ortigas Ave., Mandaluyong City',
    dateHired: 'June 10, 2023',
    employmentType: 'Full-time',
    highestEducation: 'Master of Science in Chemistry',
    position: 'Science Teacher',
    gender: 'Female',
    dateOfBirth: 'July 8, 1995',
    civilStatus: 'Single',
    citizenship: 'Filipino',
    languages: 'English, Filipino',
    specialization: 'Analytical Chemistry',
    aboutBio: 'Fascinated by the chemical processes that make up our world. I aim to make science fun and relatable through hands-on experiments.'
  },
  {
    id: 't10',
    name: 'Mr. Vincent Garcia',
    email: 'vincent.garcia@abcla.edu.ph',
    employeeId: 'TCH-2018-0022',
    department: 'Religion',
    departmentColor: '#8b5cf6',
    subjects: 'Christian Living',
    classes: 6,
    status: 'Active',
    statusBg: 'rgba(52, 211, 153, 0.15)',
    statusColor: '#34d399',
    lastActiveDate: 'May 20, 2025',
    lastActiveTime: '09:00 AM',
    avatar: 'https://i.pravatar.cc/150?u=vincent',
    phone: '0917 012 3456',
    address: '135 Katipunan Ave., Quezon City',
    dateHired: 'June 5, 2018',
    employmentType: 'Full-time',
    highestEducation: 'Master of Arts in Theological Studies',
    position: 'Values Education Teacher',
    gender: 'Male',
    dateOfBirth: 'April 30, 1982',
    civilStatus: 'Married',
    citizenship: 'Filipino',
    languages: 'English, Filipino, Latin',
    specialization: 'Ethics, Theology',
    aboutBio: 'Guiding students in their moral and spiritual journey. Deeply committed to teaching values that build strong, compassionate individuals.'
  }
];

export const TEACHERS_METRICS = [
  {
    title: 'Total Teachers',
    value: '42',
    subtitle: 'All teaching staff',
    icon: 'Users',
    iconBg: 'rgba(139, 92, 246, 0.15)',
    iconColor: '#8b5cf6'
  },
  {
    title: 'Active Teachers',
    value: '37',
    subtitle: 'Currently teaching',
    icon: 'UserCheck',
    iconBg: 'rgba(52, 211, 153, 0.15)',
    iconColor: '#34d399'
  },
  {
    title: 'Advisers',
    value: '8',
    subtitle: 'Class advisers',
    icon: 'UserPlus',
    iconBg: 'rgba(251, 191, 36, 0.15)',
    iconColor: '#fbbf24'
  },
  {
    title: 'On Leave',
    value: '3',
    subtitle: 'For this school year',
    icon: 'Palmtree',
    iconBg: 'rgba(239, 68, 68, 0.15)',
    iconColor: '#ef4444'
  }
];
export interface TeacherClass {
  id: string;
  name: string;
  section: string;
  gradeLevel: string;
  subject: string;
  students: number;
  schedule: {
    days: string;
    time: string;
  };
  room: string;
  isAdviser: boolean;
  status: 'Active' | 'Inactive';
}

export const mockTeacherClasses: TeacherClass[] = [
  { id: '1', name: 'STEM 11 - A', section: 'Section A', gradeLevel: 'Grade 11', subject: 'General Biology 1', students: 32, schedule: { days: 'Mon, Wed, Fri', time: '7:30 AM - 8:30 AM' }, room: 'Science Lab 1', isAdviser: true, status: 'Active' },
  { id: '2', name: 'STEM 11 - B', section: 'Section B', gradeLevel: 'Grade 11', subject: 'General Biology 1', students: 30, schedule: { days: 'Tue, Thu', time: '8:30 AM - 9:30 AM' }, room: 'Science Lab 1', isAdviser: true, status: 'Active' },
  { id: '3', name: 'STEM 12 - A', section: 'Section A', gradeLevel: 'Grade 12', subject: 'Research in Science', students: 34, schedule: { days: 'Mon, Wed', time: '9:45 AM - 10:45 AM' }, room: 'Science Lab 2', isAdviser: true, status: 'Active' },
  { id: '4', name: 'STEM 12 - B', section: 'Section B', gradeLevel: 'Grade 12', subject: 'Research in Science', students: 32, schedule: { days: 'Tue, Thu', time: '1:00 PM - 2:00 PM' }, room: 'Science Lab 2', isAdviser: true, status: 'Active' },
  { id: '5', name: 'STEM 12 - A', section: 'Section A', gradeLevel: 'Grade 12', subject: 'General Biology 2', students: 28, schedule: { days: 'Fri', time: '10:45 AM - 11:45 AM' }, room: 'Science Lab 1', isAdviser: false, status: 'Active' }
];

export interface TeacherActivity {
  id: string;
  date: string;
  time: string;
  type: 'Announcement' | 'Grades' | 'Assignment' | 'Document';
  title: string;
  details: string;
  targetClass: string;
}

export const mockTeacherActivities: TeacherActivity[] = [
  { id: '1', date: 'May 20, 2025', time: '02:15 PM', type: 'Announcement', title: 'Posted Announcement', details: 'Posted reminder about the lab activity on Friday.', targetClass: 'STEM 11 - A' },
  { id: '2', date: 'May 19, 2025', time: '10:30 AM', type: 'Grades', title: 'Submitted Grades', details: 'Submitted Quarterly Grades for General Biology 1.', targetClass: 'STEM 11 - B' },
  { id: '3', date: 'May 18, 2025', time: '09:05 AM', type: 'Assignment', title: 'Created Assignment', details: 'Created new assignment: Cell Structure Diagram.', targetClass: 'STEM 12 - A' },
  { id: '4', date: 'May 16, 2025', time: '04:20 PM', type: 'Document', title: 'Uploaded Document', details: 'Uploaded lecture notes: Photosynthesis.', targetClass: 'STEM 12 - B' }
];
export interface ScheduleEvent {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  startTime: string; // e.g. "07:30"
  endTime: string;   // e.g. "08:30"
  title: string;
  subtitle: string;
  type: 'class' | 'advisory' | 'prep' | 'grading' | 'office' | 'meeting' | 'break';
}

export const mockTeacherSchedule: ScheduleEvent[] = [
  // Monday
  { id: '1', day: 'Monday', startTime: '07:30', endTime: '08:30', title: 'General Biology 1', subtitle: 'STEM 11 - A', type: 'class' },
  { id: '2', day: 'Monday', startTime: '09:45', endTime: '10:45', title: 'Research in Science', subtitle: 'STEM 12 - A', type: 'class' },
  { id: '3', day: 'Monday', startTime: '10:45', endTime: '11:45', title: 'Break', subtitle: '', type: 'break' },
  { id: '4', day: 'Monday', startTime: '13:00', endTime: '13:30', title: 'Advisory Class', subtitle: 'STEM 11 - A', type: 'advisory' },
  { id: '5', day: 'Monday', startTime: '14:00', endTime: '15:00', title: 'Grading & Reports', subtitle: '', type: 'grading' },
  { id: '6', day: 'Monday', startTime: '15:00', endTime: '16:00', title: 'Office Hours', subtitle: '', type: 'office' },
  { id: '7', day: 'Monday', startTime: '16:00', endTime: '17:00', title: 'Planning & Prep', subtitle: '', type: 'prep' },

  // Tuesday
  { id: '8', day: 'Tuesday', startTime: '08:30', endTime: '09:30', title: 'General Biology 1', subtitle: 'STEM 11 - B', type: 'class' },
  { id: '9', day: 'Tuesday', startTime: '09:45', endTime: '10:45', title: 'Research in Science', subtitle: 'STEM 12 - B', type: 'class' },
  { id: '10', day: 'Tuesday', startTime: '10:45', endTime: '11:45', title: 'Break', subtitle: '', type: 'break' },
  { id: '11', day: 'Tuesday', startTime: '11:00', endTime: '12:00', title: 'General Biology 1', subtitle: 'STEM 11 - B', type: 'class' },
  { id: '12', day: 'Tuesday', startTime: '13:00', endTime: '14:00', title: 'Subject Preparation', subtitle: '', type: 'prep' },
  { id: '13', day: 'Tuesday', startTime: '14:00', endTime: '15:00', title: 'Subject Preparation', subtitle: '', type: 'prep' },
  { id: '14', day: 'Tuesday', startTime: '15:00', endTime: '16:00', title: 'Office Hours', subtitle: '', type: 'office' },
  { id: '15', day: 'Tuesday', startTime: '16:00', endTime: '17:00', title: 'Planning & Prep', subtitle: '', type: 'prep' },
  
  // Wednesday
  { id: '16', day: 'Wednesday', startTime: '07:30', endTime: '08:30', title: 'General Biology 1', subtitle: 'STEM 11 - A', type: 'class' },
  { id: '17', day: 'Wednesday', startTime: '09:45', endTime: '10:45', title: 'General Biology 1', subtitle: 'STEM 11 - A', type: 'class' },
  { id: '18', day: 'Wednesday', startTime: '10:45', endTime: '11:45', title: 'Break', subtitle: '', type: 'break' },
  { id: '19', day: 'Wednesday', startTime: '11:00', endTime: '12:00', title: 'Research in Science', subtitle: 'STEM 12 - A', type: 'class' },
  { id: '20', day: 'Wednesday', startTime: '13:00', endTime: '13:30', title: 'Advisory Class', subtitle: 'STEM 11 - B', type: 'advisory' },
  { id: '21', day: 'Wednesday', startTime: '14:00', endTime: '15:00', title: 'Grading & Reports', subtitle: '', type: 'grading' },
  { id: '22', day: 'Wednesday', startTime: '15:00', endTime: '16:00', title: 'Office Hours', subtitle: '', type: 'office' },
  { id: '23', day: 'Wednesday', startTime: '16:00', endTime: '17:00', title: 'Planning & Prep', subtitle: '', type: 'prep' },

  // Thursday
  { id: '24', day: 'Thursday', startTime: '07:30', endTime: '08:45', title: 'Research in Science', subtitle: 'STEM 12 - A', type: 'class' },
  { id: '25', day: 'Thursday', startTime: '09:00', endTime: '10:00', title: 'General Biology 2', subtitle: 'STEM 12 - A', type: 'class' },
  { id: '26', day: 'Thursday', startTime: '10:45', endTime: '11:45', title: 'Break', subtitle: '', type: 'break' },
  { id: '27', day: 'Thursday', startTime: '11:00', endTime: '12:00', title: 'Research in Science', subtitle: 'STEM 12 - B', type: 'class' },
  { id: '28', day: 'Thursday', startTime: '13:00', endTime: '14:00', title: 'Subject Preparation', subtitle: '', type: 'prep' },
  { id: '29', day: 'Thursday', startTime: '14:00', endTime: '15:00', title: 'Subject Preparation', subtitle: '', type: 'prep' },
  { id: '30', day: 'Thursday', startTime: '15:00', endTime: '16:00', title: 'Office Hours', subtitle: '', type: 'office' },
  { id: '31', day: 'Thursday', startTime: '16:00', endTime: '17:00', title: 'Planning & Prep', subtitle: '', type: 'prep' },

  // Friday
  { id: '32', day: 'Friday', startTime: '08:30', endTime: '09:30', title: 'General Biology 1', subtitle: 'STEM 11 - B', type: 'class' },
  { id: '33', day: 'Friday', startTime: '09:45', endTime: '10:45', title: 'Research in Science', subtitle: 'STEM 12 - B', type: 'class' },
  { id: '34', day: 'Friday', startTime: '10:45', endTime: '11:45', title: 'Break', subtitle: '', type: 'break' },
  { id: '35', day: 'Friday', startTime: '11:00', endTime: '12:00', title: 'General Biology 2', subtitle: 'STEM 12 - A', type: 'class' },
  { id: '36', day: 'Friday', startTime: '13:00', endTime: '14:00', title: 'Department Meeting', subtitle: '', type: 'meeting' },
  { id: '37', day: 'Friday', startTime: '14:00', endTime: '15:00', title: 'Subject Preparation', subtitle: '', type: 'prep' },
  { id: '38', day: 'Friday', startTime: '15:00', endTime: '16:00', title: 'Office Hours', subtitle: '', type: 'office' },
  { id: '39', day: 'Friday', startTime: '16:00', endTime: '17:00', title: 'Planning & Prep', subtitle: '', type: 'prep' }
];
export interface SubjectHandled {
  id: string;
  name: string;
  type: string; // Laboratory, etc.
  code: string;
  gradeLevel: string;
  totalClasses: number;
  totalStudents: number;
  weeklyPeriods: number;
  status: 'Active' | 'Inactive';
}

export const mockTeacherSubjects: SubjectHandled[] = [
  { id: '1', name: 'General Biology 1', type: 'Laboratory', code: 'BIO11-01', gradeLevel: 'Grade 11', totalClasses: 2, totalStudents: 62, weeklyPeriods: 5, status: 'Active' },
  { id: '2', name: 'General Biology 2', type: 'Laboratory', code: 'BIO12-01', gradeLevel: 'Grade 12', totalClasses: 2, totalStudents: 64, weeklyPeriods: 5, status: 'Active' },
  { id: '3', name: 'Research in Science', type: '', code: 'RES11-01', gradeLevel: 'Grade 11', totalClasses: 2, totalStudents: 62, weeklyPeriods: 3, status: 'Active' },
  { id: '4', name: 'Practical Research 1', type: '', code: 'PR12-01', gradeLevel: 'Grade 12', totalClasses: 1, totalStudents: 28, weeklyPeriods: 3, status: 'Active' },
  { id: '5', name: 'Environmental Science', type: '', code: 'ENV11-01', gradeLevel: 'Grade 11', totalClasses: 1, totalStudents: 30, weeklyPeriods: 2, status: 'Active' },
  { id: '6', name: 'Earth & Life Science', type: '', code: 'ELS11-01', gradeLevel: 'Grade 11', totalClasses: 1, totalStudents: 29, weeklyPeriods: 2, status: 'Active' },
];

export interface SubjectActivity {
  id: string;
  date: string;
  time: string;
  activityType: 'Created Assignment' | 'Updated Lesson' | 'Added Learning Material' | 'Submitted Grades';
  details: string;
  subject: string;
}

export const mockSubjectActivities: SubjectActivity[] = [
  { id: '1', date: 'May 20, 2025', time: '02:15 PM', activityType: 'Created Assignment', details: 'Created assignment: Cell Structure Diagram', subject: 'General Biology 1' },
  { id: '2', date: 'May 19, 2025', time: '10:30 AM', activityType: 'Updated Lesson', details: 'Updated lesson plan for Photosynthesis', subject: 'General Biology 1' },
  { id: '3', date: 'May 18, 2025', time: '09:05 AM', activityType: 'Added Learning Material', details: 'Uploaded presentation: Ecology Basics', subject: 'Environmental Science' },
  { id: '4', date: 'May 16, 2025', time: '04:20 PM', activityType: 'Submitted Grades', details: 'Submitted Quarterly Grades', subject: 'Research in Science' },
];
