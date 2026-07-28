export interface SubjectRecord {
  id: string;
  name: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  teacher: string;
  units: number;
  quarterGrade: number;
  finalGrade: number;
}

export const SUBJECTS_DATA: SubjectRecord[] = [
  { id: '1', name: 'General Mathematics', icon: '📐', iconBg: 'rgba(182, 142, 255, 0.1)', iconColor: '#b68eff', teacher: 'Mr. Richard Gomez', units: 1.5, quarterGrade: 92, finalGrade: 90 },
  { id: '2', name: 'English for Academic Purposes', icon: '📖', iconBg: 'rgba(132, 169, 255, 0.1)', iconColor: '#84a9ff', teacher: 'Ms. Anna Reyes', units: 1.5, quarterGrade: 88, finalGrade: 87 },
  { id: '3', name: 'Physical Science', icon: '🔬', iconBg: 'rgba(255, 171, 107, 0.1)', iconColor: '#ffab6b', teacher: 'Mr. James Cruz', units: 1.5, quarterGrade: 85, finalGrade: 86 },
  { id: '4', name: 'Filipino sa Piling Larangan', icon: '🗣️', iconBg: 'rgba(92, 199, 137, 0.1)', iconColor: '#5cc789', teacher: 'Ms. Carla Santos', units: 1.5, quarterGrade: 91, finalGrade: 92 },
  { id: '5', name: 'World History', icon: '🌍', iconBg: 'rgba(182, 142, 255, 0.1)', iconColor: '#b68eff', teacher: 'Mr. Daniel Tan', units: 1.5, quarterGrade: 87, finalGrade: 88 },
  { id: '6', name: 'Computer Programming 1', icon: '💻', iconBg: 'rgba(132, 169, 255, 0.1)', iconColor: '#84a9ff', teacher: 'Ms. Liza Mendoza', units: 1.5, quarterGrade: 93, finalGrade: 94 },
  { id: '7', name: 'Physical Education and Health', icon: '🏃', iconBg: 'rgba(255, 126, 147, 0.1)', iconColor: '#ff7e93', teacher: 'Mr. Mark Garcia', units: 1.0, quarterGrade: 95, finalGrade: 95 },
  { id: '8', name: 'Christian Living Education', icon: '✝️', iconBg: 'rgba(245, 200, 66, 0.1)', iconColor: '#f5c842', teacher: 'Rev. John Paul', units: 1.0, quarterGrade: 90, finalGrade: 90 },
];

export interface ScheduleRecord {
  id: string;
  time: string;
  subject: string;
  teacher: string;
  room: string;
  day: string;
}

export const SCHEDULE_DATA: ScheduleRecord[] = [
  { id: '1', time: '07:30 AM - 08:30 AM', subject: 'General Mathematics', teacher: 'Mr. Richard Gomez', room: 'Room 201', day: 'Mon, Wed, Fri' },
  { id: '2', time: '08:30 AM - 09:30 AM', subject: 'English for Academic Purposes', teacher: 'Ms. Anna Reyes', room: 'Room 205', day: 'Mon, Wed, Fri' },
  { id: '3', time: '09:30 AM - 10:30 AM', subject: 'Physical Science', teacher: 'Mr. James Cruz', room: 'Science Lab 1', day: 'Tue, Thu' },
  { id: '4', time: '10:30 AM - 11:30 AM', subject: 'Filipino sa Piling Larangan', teacher: 'Ms. Carla Santos', room: 'Room 204', day: 'Tue, Thu' },
  { id: '5', time: '01:00 PM - 02:00 PM', subject: 'World History', teacher: 'Mr. Daniel Tan', room: 'Room 203', day: 'Mon, Wed' },
];

export interface SummaryCardData {
  id: string;
  label: string;
  value: string;
  subText: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  subTextColor: string;
}

export const SUMMARY_DATA: SummaryCardData[] = [
  { id: '1', label: 'General Average', value: '89.15', subText: 'Very Good', icon: '🎓', iconBg: 'rgba(182, 142, 255, 0.1)', iconColor: '#b68eff', subTextColor: '#b68eff' },
  { id: '2', label: 'GPA', value: '3.41', subText: 'Very Good', icon: '📈', iconBg: 'rgba(92, 199, 137, 0.1)', iconColor: '#5cc789', subTextColor: '#5cc789' },
  { id: '3', label: 'Total Units Earned', value: '11.0', subText: 'This School Year', icon: '📘', iconBg: 'rgba(132, 169, 255, 0.1)', iconColor: '#84a9ff', subTextColor: '#84a9ff' },
  { id: '4', label: 'Academic Standing', value: 'Very Good', subText: 'With Honors', icon: '🏅', iconBg: 'rgba(255, 171, 107, 0.1)', iconColor: '#ffab6b', subTextColor: 'rgba(240,239,237,0.5)' },
];

export interface RankingData {
  id: string;
  label: string;
  value: string;
  subText: string;
  icon: string;
  iconBg: string;
  iconColor: string;
}

export const RANKING_DATA: RankingData[] = [
  { id: '1', label: 'Class Ranking', value: '12 of 58', subText: 'Top 20.7%', icon: '🏆', iconBg: 'rgba(182, 142, 255, 0.1)', iconColor: '#b68eff' },
  { id: '2', label: 'Honors', value: 'With Honors', subText: 'Q1 Grading', icon: '🎖️', iconBg: 'rgba(245, 200, 66, 0.1)', iconColor: '#f5c842' },
];

export interface AttendanceOverview {
  id: string;
  label: string;
  value: string;
  subText: string;
  icon: string;
  iconBg: string;
  iconColor: string;
}

export const ATTENDANCE_OVERVIEW_DATA: AttendanceOverview[] = [
  { id: '1', label: 'Overall Attendance Rate', value: '96%', subText: 'This School Year', icon: '📝', iconBg: 'rgba(132, 169, 255, 0.1)', iconColor: '#84a9ff' },
  { id: '2', label: 'Days Present', value: '168', subText: 'of 180 school days', icon: '✅', iconBg: 'rgba(92, 199, 137, 0.1)', iconColor: '#5cc789' },
  { id: '3', label: 'Days Late', value: '5', subText: 'This School Year', icon: '⏰', iconBg: 'rgba(245, 200, 66, 0.1)', iconColor: '#f5c842' },
  { id: '4', label: 'Days Absent', value: '7', subText: 'This School Year', icon: '❌', iconBg: 'rgba(255, 126, 147, 0.1)', iconColor: '#ff7e93' },
];

export interface AttendanceChartData {
  month: string;
  rate: number;
}

export const ATTENDANCE_CHART_DATA: AttendanceChartData[] = [
  { month: 'Jun', rate: 95 },
  { month: 'Jul', rate: 92 },
  { month: 'Aug', rate: 98 },
  { month: 'Sep', rate: 97 },
  { month: 'Oct', rate: 85 },
  { month: 'Nov', rate: 99 },
  { month: 'Dec', rate: 96 },
  { month: 'Jan', rate: 91 },
  { month: 'Feb', rate: 75 },
  { month: 'Mar', rate: 93 },
  { month: 'Apr', rate: 97 },
  { month: 'May', rate: 95 },
];

export interface AttendanceSubjectRecord {
  id: string;
  subject: string;
  teacher: string;
  schedule: string;
  daysPresent: number;
  daysLate: number;
  daysAbsent: number;
  rate: number;
  icon: string;
  iconBg: string;
  iconColor: string;
}

export const ATTENDANCE_SUBJECT_DATA: AttendanceSubjectRecord[] = [
  { id: '1', subject: 'General Mathematics', teacher: 'Mr. Richard Gomez', schedule: 'Mon, Wed, Fri\n7:30 AM - 8:30 AM', daysPresent: 58, daysLate: 2, daysAbsent: 1, rate: 97, icon: '📐', iconBg: 'rgba(182, 142, 255, 0.1)', iconColor: '#b68eff' },
  { id: '2', subject: 'English for Academic Purposes', teacher: 'Ms. Anna Reyes', schedule: 'Mon, Wed, Fri\n8:30 AM - 9:30 AM', daysPresent: 57, daysLate: 1, daysAbsent: 2, rate: 95, icon: '📖', iconBg: 'rgba(132, 169, 255, 0.1)', iconColor: '#84a9ff' },
  { id: '3', subject: 'Physical Science', teacher: 'Mr. James Cruz', schedule: 'Tue, Thu\n9:30 AM - 10:30 AM', daysPresent: 38, daysLate: 1, daysAbsent: 1, rate: 95, icon: '🔬', iconBg: 'rgba(255, 171, 107, 0.1)', iconColor: '#ffab6b' },
  { id: '4', subject: 'Filipino sa Piling Larangan', teacher: 'Ms. Carla Santos', schedule: 'Tue, Thu\n10:30 AM - 11:30 AM', daysPresent: 38, daysLate: 0, daysAbsent: 0, rate: 100, icon: '🗣️', iconBg: 'rgba(92, 199, 137, 0.1)', iconColor: '#5cc789' },
  { id: '5', subject: 'World History', teacher: 'Mr. Daniel Tan', schedule: 'Mon, Wed\n1:00 PM - 2:00 PM', daysPresent: 37, daysLate: 1, daysAbsent: 2, rate: 93, icon: '🌍', iconBg: 'rgba(182, 142, 255, 0.1)', iconColor: '#b68eff' },
  { id: '6', subject: 'Computer Programming 1', teacher: 'Ms. Liza Mendoza', schedule: 'Tue, Thu\n2:00 PM - 3:00 PM', daysPresent: 37, daysLate: 0, daysAbsent: 1, rate: 97, icon: '💻', iconBg: 'rgba(132, 169, 255, 0.1)', iconColor: '#84a9ff' },
  { id: '7', subject: 'Physical Education and Health', teacher: 'Mr. Mark Garcia', schedule: 'Fri\n3:00 PM - 4:00 PM', daysPresent: 19, daysLate: 0, daysAbsent: 1, rate: 95, icon: '🏃', iconBg: 'rgba(255, 126, 147, 0.1)', iconColor: '#ff7e93' },
  { id: '8', subject: 'Christian Living Education', teacher: 'Rev. John Paul', schedule: 'Wed\n3:00 PM - 4:00 PM', daysPresent: 19, daysLate: 0, daysAbsent: 0, rate: 100, icon: '✝️', iconBg: 'rgba(245, 200, 66, 0.1)', iconColor: '#f5c842' },
];

export interface DetailRecord {
  id: string;
  label: string;
  value: string;
  fullWidth?: boolean;
}

export const ENROLLMENT_DATA: DetailRecord[] = [
  { id: '1', label: 'Enrollment Type', value: 'Transferee' },
  { id: '2', label: 'Admission Date', value: 'August 15, 2024' },
  { id: '3', label: 'Curriculum', value: 'Basic Education (K-12)' },
  { id: '4', label: 'Previous School', value: 'Quezon City Science High School' },
];

export const CONTACT_DATA: DetailRecord[] = [
  { id: '1', label: 'Address', value: '123 Sampaguita St., Barangay 12, Quezon City', fullWidth: true },
  { id: '2', label: 'Contact Number', value: '+63 917 123 4567' },
  { id: '3', label: 'Email', value: 'juan.delacruz@student.edu.ph' },
];

export interface GuardianRecord {
  name: string;
  relationship: string;
  initials: string;
  status: string;
  contact: string;
  avatarGradient: string;
}

export const GUARDIAN_DATA: GuardianRecord = {
  name: 'Pedro Dela Cruz',
  relationship: 'Primary Guardian • Father',
  initials: 'PD',
  status: 'Active',
  contact: '0917 876 5432',
  avatarGradient: 'linear-gradient(135deg, rgba(255,126,147,0.8), rgba(182,142,255,0.8))'
};

export const QUICK_STATS_DATA = [
  { id: '1', label: 'General Average', value: '89.15', subText: 'Very Good', icon: '🏅', iconBg: 'rgba(245, 200, 66, 0.1)', iconColor: '#f5c842' },
  { id: '2', label: 'Attendance', value: '96%', subText: 'This School Year', icon: '📅', iconBg: 'rgba(92, 199, 137, 0.1)', iconColor: '#5cc789' },
  { id: '3', label: 'Subjects', value: '8', subText: 'This School Year', icon: '📖', iconBg: 'rgba(132, 169, 255, 0.1)', iconColor: '#84a9ff' },
  { id: '4', label: 'Assessments', value: '12 / 13', subText: 'Submitted', icon: '📋', iconBg: 'rgba(182, 142, 255, 0.1)', iconColor: '#b68eff' },
];

export const ASSESSMENT_STATS = {
  overall: { value: '88.45%', subText: 'Average Score', label: 'Very Good', color: '#5cc789' },
  completed: { value: '18', subText: 'of 22', icon: '📅', iconBg: 'rgba(92, 199, 137, 0.1)', iconColor: '#5cc789' },
  pending: { value: '3', subText: 'to be submitted', icon: '⏱️', iconBg: 'rgba(245, 200, 66, 0.1)', iconColor: '#f5c842' },
  overdue: { value: '1', subText: 'needs attention', icon: '⏰', iconBg: 'rgba(255, 126, 147, 0.1)', iconColor: '#ff7e93' }
};

export const ASSESSMENT_CATEGORIES = ['All', 'Assignments', 'Quizzes', 'Exams', 'Projects', 'Performance Tasks', 'Laboratory Activities', 'Worksheets', 'Other'];

export interface AssessmentRecord {
  id: string;
  title: string;
  subtitle: string;
  type: string;
  typeColor: string;
  typeBg: string;
  subject: string;
  teacher: string;
  dueDate: string;
  dueDay: string;
  status: string;
  statusColor: string;
  statusBg: string;
  score: string;
  scorePercent: string;
  icon: string;
}

export const ASSESSMENT_LIST: AssessmentRecord[] = [
  { id: '1', title: 'Algebra Homework 1', subtitle: 'Linear Equations and Inequalities', type: 'Assignment', typeColor: '#84a9ff', typeBg: 'rgba(132, 169, 255, 0.1)', subject: 'General Mathematics', teacher: 'Mr. Richard Gomez', dueDate: 'May 12, 2025', dueDay: 'Mon', status: 'Submitted', statusColor: '#5cc789', statusBg: 'rgba(92, 199, 137, 0.1)', score: '18 / 20', scorePercent: '90%', icon: '📝' },
  { id: '2', title: 'Chapter 3 Quiz', subtitle: 'The Cell Structure', type: 'Quiz', typeColor: '#b68eff', typeBg: 'rgba(182, 142, 255, 0.1)', subject: 'Physical Science', teacher: 'Mr. James Cruz', dueDate: 'May 15, 2025', dueDay: 'Thu', status: 'Graded', statusColor: '#5cc789', statusBg: 'rgba(92, 199, 137, 0.1)', score: '24 / 25', scorePercent: '96%', icon: '❓' },
  { id: '3', title: 'Midterm Examination', subtitle: 'Quarter 2 Midterm', type: 'Exam', typeColor: '#ffab6b', typeBg: 'rgba(255, 171, 107, 0.1)', subject: 'English for Academic Purposes', teacher: 'Ms. Anna Reyes', dueDate: 'May 20, 2025', dueDay: 'Tue', status: 'Graded', statusColor: '#5cc789', statusBg: 'rgba(92, 199, 137, 0.1)', score: '88 / 100', scorePercent: '88%', icon: '📋' },
  { id: '4', title: 'Research Project', subtitle: 'Philippine Cultural Heritage', type: 'Project', typeColor: '#84a9ff', typeBg: 'rgba(132, 169, 255, 0.1)', subject: 'Filipino sa Piling Larangan', teacher: 'Ms. Carla Santos', dueDate: 'May 28, 2025', dueDay: 'Wed', status: 'In Progress', statusColor: '#f5c842', statusBg: 'rgba(245, 200, 66, 0.1)', score: '-', scorePercent: '-', icon: '📁' },
  { id: '5', title: 'Laboratory Activity #2', subtitle: 'Chemical Reactions', type: 'Laboratory Activity', typeColor: '#5cc789', typeBg: 'rgba(92, 199, 137, 0.1)', subject: 'Physical Science', teacher: 'Mr. James Cruz', dueDate: 'May 30, 2025', dueDay: 'Fri', status: 'Submitted', statusColor: '#5cc789', statusBg: 'rgba(92, 199, 137, 0.1)', score: '22 / 25', scorePercent: '88%', icon: '🧪' },
  { id: '6', title: 'Reading Comprehension Worksheet', subtitle: 'Identifying Main Ideas', type: 'Worksheet', typeColor: '#ffab6b', typeBg: 'rgba(255, 171, 107, 0.1)', subject: 'English for Academic Purposes', teacher: 'Ms. Anna Reyes', dueDate: 'Jun 2, 2025', dueDay: 'Mon', status: 'Pending', statusColor: '#f5c842', statusBg: 'rgba(245, 200, 66, 0.1)', score: '-', scorePercent: '-', icon: '📄' },
  { id: '7', title: 'Oral Recitation', subtitle: 'Noli Me Tangere (Ch. 1-5)', type: 'Performance Task', typeColor: '#ff7e93', typeBg: 'rgba(255, 126, 147, 0.1)', subject: 'Filipino sa Piling Larangan', teacher: 'Ms. Carla Santos', dueDate: 'Jun 3, 2025', dueDay: 'Tue', status: 'Graded', statusColor: '#5cc789', statusBg: 'rgba(92, 199, 137, 0.1)', score: '19 / 20', scorePercent: '95%', icon: '🗣️' },
  { id: '8', title: 'Vocabulary Quiz 2', subtitle: 'Academic Vocabulary', type: 'Quiz', typeColor: '#b68eff', typeBg: 'rgba(182, 142, 255, 0.1)', subject: 'English for Academic Purposes', teacher: 'Ms. Anna Reyes', dueDate: 'Jun 5, 2025', dueDay: 'Thu', status: 'Pending', statusColor: '#f5c842', statusBg: 'rgba(245, 200, 66, 0.1)', score: '-', scorePercent: '-', icon: '❓' }
];

export const UPCOMING_DEADLINES = [
  { id: '1', title: 'Research Project', subject: 'Filipino sa Piling Larangan', date: 'Due: May 28, 2025 (2 days left)', iconColor: '#f5c842' },
  { id: '2', title: 'Vocabulary Quiz 2', subject: 'English for Academic Purposes', date: 'Due: Jun 5, 2025 (10 days left)', iconColor: '#f5c842' },
  { id: '3', title: 'Science Fair Report', subject: 'Physical Science', date: 'Due: Jun 12, 2025 (17 days left)', iconColor: '#f5c842' }
];

// -----------------------------------------
// GRADES TAB DATA
// -----------------------------------------

export const GRADES_GENERAL_AVERAGE = {
  value: '88.45',
  descriptiveRating: 'Very Good',
  equivalent: '2.00',
  color: '#b68eff'
};

export const GRADES_CLASS_RANK = {
  rank: '12 of 58',
  percentile: 'Top 20.7%',
  color: '#b68eff'
};

export interface SubjectGrade {
  id: string;
  subject: string;
  teacher: string;
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  final: string;
  remarks: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  remarkColor: string;
}

export const SUBJECT_GRADES: SubjectGrade[] = [
  { id: '1', subject: 'General Mathematics', teacher: 'Mr. Richard Gomez', q1: '92', q2: '90', q3: '91', q4: '91', final: '91', remarks: 'Outstanding', icon: '➗', iconBg: 'rgba(182, 142, 255, 0.1)', iconColor: '#b68eff', remarkColor: '#5cc789' },
  { id: '2', subject: 'English for Academic Purposes', teacher: 'Ms. Anna Reyes', q1: '88', q2: '87', q3: '85', q4: '87', final: '87', remarks: 'Very Good', icon: '📖', iconBg: 'rgba(132, 169, 255, 0.1)', iconColor: '#84a9ff', remarkColor: '#84a9ff' },
  { id: '3', subject: 'Physical Science', teacher: 'Mr. James Cruz', q1: '84', q2: '86', q3: '88', q4: '86', final: '86', remarks: 'Very Good', icon: '🧪', iconBg: 'rgba(92, 199, 137, 0.1)', iconColor: '#5cc789', remarkColor: '#84a9ff' },
  { id: '4', subject: 'Filipino sa Piling Larangan', teacher: 'Ms. Carla Santos', q1: '90', q2: '92', q3: '91', q4: '91', final: '91', remarks: 'Outstanding', icon: '🏛️', iconBg: 'rgba(255, 171, 107, 0.1)', iconColor: '#ffab6b', remarkColor: '#5cc789' },
  { id: '5', subject: 'World History', teacher: 'Mr. Daniel Tan', q1: '86', q2: '87', q3: '88', q4: '87', final: '87', remarks: 'Very Good', icon: '🌍', iconBg: 'rgba(182, 142, 255, 0.1)', iconColor: '#b68eff', remarkColor: '#84a9ff' },
  { id: '6', subject: 'Computer Programming 1', teacher: 'Ms. Liza Mendoza', q1: '93', q2: '94', q3: '95', q4: '94', final: '94', remarks: 'Outstanding', icon: '💻', iconBg: 'rgba(132, 169, 255, 0.1)', iconColor: '#84a9ff', remarkColor: '#5cc789' },
  { id: '7', subject: 'Physical Education and Health', teacher: 'Mr. Mark Garcia', q1: '95', q2: '95', q3: '94', q4: '95', final: '95', remarks: 'Outstanding', icon: '⚽', iconBg: 'rgba(255, 126, 147, 0.1)', iconColor: '#ff7e93', remarkColor: '#5cc789' },
  { id: '8', subject: 'Christian Living Education', teacher: 'Rev. John Paul', q1: '90', q2: '91', q3: '90', q4: '90', final: '90', remarks: 'Very Good', icon: '✝️', iconBg: 'rgba(245, 200, 66, 0.1)', iconColor: '#f5c842', remarkColor: '#84a9ff' }
];

export const GRADING_SCALE = [
  { range: '90 - 100', rating: 'Outstanding', equivalent: '4.00', color: '#5cc789' },
  { range: '85 - 89', rating: 'Very Good', equivalent: '3.00', color: '#84a9ff' },
  { range: '80 - 84', rating: 'Satisfactory', equivalent: '2.00', color: '#f5c842' },
  { range: '75 - 79', rating: 'Fairly Satisfactory', equivalent: '1.00', color: '#ffab6b' },
  { range: 'Below 75', rating: 'Did Not Meet Expectation', equivalent: '0.00', color: '#ff7e93' }
];

// -----------------------------------------
// DOCUMENTS TAB DATA
// -----------------------------------------

export const DOCUMENT_STATS = {
  total: { value: 10, label: 'Total Documents', subText: 'All required documents', icon: '📄', iconColor: '#b68eff', iconBg: 'rgba(182, 142, 255, 0.1)' },
  verified: { value: 8, label: 'Verified Documents', subText: 'Up to date', icon: '🛡️', iconColor: '#5cc789', iconBg: 'rgba(92, 199, 137, 0.1)' },
  pending: { value: 1, label: 'Pending Documents', subText: 'For verification', icon: '⏱️', iconColor: '#f5c842', iconBg: 'rgba(245, 200, 66, 0.1)' },
  missing: { value: 1, label: 'Missing Documents', subText: 'Required to submit', icon: '📄', iconColor: '#ff7e93', iconBg: 'rgba(255, 126, 147, 0.1)' }
};

export interface DocumentRecord {
  id: string;
  name: string;
  category: string;
  categoryColor: string;
  categoryBg: string;
  uploadedDate: string;
  status: 'Verified' | 'Pending' | 'Missing';
  uploadedBy: string;
  uploadedByRole: string;
  icon: string;
}

export const DOCUMENT_LIST: DocumentRecord[] = [
  { id: '1', name: 'PSA Birth Certificate', category: 'Identification', categoryColor: '#b68eff', categoryBg: 'rgba(182, 142, 255, 0.1)', uploadedDate: 'May 5, 2025\n10:15 AM', status: 'Verified', uploadedBy: 'Sophia Loren', uploadedByRole: 'School Admin', icon: '📄' },
  { id: '2', name: 'Form 137 (Report Card)', category: 'Academic Record', categoryColor: '#5cc789', categoryBg: 'rgba(92, 199, 137, 0.1)', uploadedDate: 'May 5, 2025\n10:18 AM', status: 'Verified', uploadedBy: 'Sophia Loren', uploadedByRole: 'School Admin', icon: '📄' },
  { id: '3', name: 'Form 138 (Report Card)', category: 'Academic Record', categoryColor: '#5cc789', categoryBg: 'rgba(92, 199, 137, 0.1)', uploadedDate: 'May 10, 2025\n2:30 PM', status: 'Pending', uploadedBy: 'Juan Dela Cruz (Parent)', uploadedByRole: '', icon: '📄' },
  { id: '4', name: 'Good Moral Certificate', category: 'Certificate', categoryColor: '#84a9ff', categoryBg: 'rgba(132, 169, 255, 0.1)', uploadedDate: 'Apr 28, 2025\n9:05 AM', status: 'Verified', uploadedBy: 'Sophia Loren', uploadedByRole: 'School Admin', icon: '📄' },
  { id: '5', name: 'Medical Certificate', category: 'Health', categoryColor: '#b68eff', categoryBg: 'rgba(182, 142, 255, 0.1)', uploadedDate: 'Apr 28, 2025\n9:10 AM', status: 'Verified', uploadedBy: 'Sophia Loren', uploadedByRole: 'School Admin', icon: '📄' },
  { id: '6', name: 'ID Photo', category: 'Identification', categoryColor: '#b68eff', categoryBg: 'rgba(182, 142, 255, 0.1)', uploadedDate: 'Apr 28, 2025\n9:12 AM', status: 'Verified', uploadedBy: 'Juan Dela Cruz (Parent)', uploadedByRole: '', icon: '🖼️' },
  { id: '7', name: 'Vaccination Record', category: 'Health', categoryColor: '#b68eff', categoryBg: 'rgba(182, 142, 255, 0.1)', uploadedDate: 'May 6, 2025\n11:00 AM', status: 'Verified', uploadedBy: 'Juan Dela Cruz (Parent)', uploadedByRole: '', icon: '📄' },
  { id: '8', name: 'Parent Consent Form', category: 'Forms', categoryColor: '#ffab6b', categoryBg: 'rgba(255, 171, 107, 0.1)', uploadedDate: 'May 12, 2025\n4:45 PM', status: 'Verified', uploadedBy: 'Juan Dela Cruz (Parent)', uploadedByRole: '', icon: '📄' },
  { id: '9', name: 'Certificate of Completion (JHS)', category: 'Certificate', categoryColor: '#84a9ff', categoryBg: 'rgba(132, 169, 255, 0.1)', uploadedDate: '-', status: 'Missing', uploadedBy: '-', uploadedByRole: '', icon: '📄' },
  { id: '10', name: 'Other Attachments', category: 'Others', categoryColor: '#f5c842', categoryBg: 'rgba(245, 200, 66, 0.1)', uploadedDate: 'May 15, 2025\n1:20 PM', status: 'Verified', uploadedBy: 'Sophia Loren', uploadedByRole: 'School Admin', icon: '📄' }
];

export interface ParentGuardianRecord {
  id: string;
  name: string;
  relationship: string;
  occupation: string;
  mobile: string;
  email: string;
  address: string;
  isLegalGuardian?: boolean;
}

export const PARENTS_GUARDIANS: ParentGuardianRecord[] = [
  { id: '1', name: 'Ramon Dela Cruz', relationship: 'Father', occupation: 'Engineer', mobile: '0917 123 4567', email: 'ramon.delacruz@email.com', address: '123 Sampaguita St., San Pablo City, Laguna' },
  { id: '2', name: 'Maria Dela Cruz', relationship: 'Mother', occupation: 'Teacher', mobile: '0928 765 4321', email: 'maria.delacruz@email.com', address: '123 Sampaguita St., San Pablo City, Laguna' },
  { id: '3', name: 'Lola Teresa Dela Cruz', relationship: 'Grandmother', occupation: 'Retired', mobile: '0906 555 7788', email: 'teresadelacruz@email.com', address: '123 Sampaguita St., San Pablo City, Laguna', isLegalGuardian: true },
];

export interface LinkedAccountRecord {
  id: string;
  name: string;
  relationship: string;
  mobile: string;
  status: string;
  lastLogin: string;
}

export const LINKED_ACCOUNTS: LinkedAccountRecord[] = [
  { id: '1', name: 'Ramon Dela Cruz', relationship: 'Father', mobile: '0917 123 4567', status: 'Active', lastLogin: 'May 6, 2025\n10:30 AM' },
  { id: '2', name: 'Maria Dela Cruz', relationship: 'Mother', mobile: '0928 765 4321', status: 'Active', lastLogin: 'May 5, 2025\n4:15 PM' },
  { id: '3', name: 'Lola Teresa Dela Cruz', relationship: 'Grandmother', mobile: '0906 555 7788', status: 'Active', lastLogin: 'May 4, 2025\n2:40 PM' },
];

export interface EmergencyContactRecord {
  id: string;
  name: string;
  relationship: string;
  mobile: string;
  priority: string;
  label: string;
}

export const EMERGENCY_CONTACTS: EmergencyContactRecord[] = [
  { id: '1', name: 'Ramon Dela Cruz', relationship: 'Father', mobile: '0917 123 4567', priority: 'Priority 1', label: 'Primary Contact' },
  { id: '2', name: 'Maria Dela Cruz', relationship: 'Mother', mobile: '0928 765 4321', priority: 'Priority 2', label: 'Secondary Contact' },
];

export interface AuthorizedPickupRecord {
  id: string;
  name: string;
  relationship: string;
  mobile: string;
}

export const AUTHORIZED_PICKUP: AuthorizedPickupRecord[] = [
  { id: '1', name: 'Ramon Dela Cruz', relationship: 'Father', mobile: '0917 123 4567' },
  { id: '2', name: 'Maria Dela Cruz', relationship: 'Mother', mobile: '0928 765 4321' },
];

export const MEDICAL_NOTES = {
  text: 'No medical notes on file.\nClick edit to add medical information.',
};

export interface CommunicationPrefRecord {
  id: string;
  type: string;
  description: string;
  enabled: boolean;
  icon: string;
}

export const COMMUNICATION_PREFS: CommunicationPrefRecord[] = [
  { id: '1', type: 'SMS Notifications', description: 'Receive important updates via SMS', enabled: true, icon: 'message-square' },
  { id: '2', type: 'Email Notifications', description: 'Receive important updates via Email', enabled: true, icon: 'mail' },
  { id: '3', type: 'Mobile App Notifications', description: 'Receive push notifications in the app', enabled: true, icon: 'bell' },
];
