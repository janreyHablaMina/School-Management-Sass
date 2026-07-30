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
    avatar: 'https://i.pravatar.cc/150?u=richard'
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
    avatar: 'https://i.pravatar.cc/150?u=maria'
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
    avatar: 'https://i.pravatar.cc/150?u=john'
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
    avatar: 'https://i.pravatar.cc/150?u=liza'
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
    avatar: 'https://i.pravatar.cc/150?u=daniel'
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
    avatar: 'https://i.pravatar.cc/150?u=carla'
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
    avatar: 'https://i.pravatar.cc/150?u=angelo'
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
    avatar: 'https://i.pravatar.cc/150?u=jessa'
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
    avatar: 'https://i.pravatar.cc/150?u=vincent'
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
