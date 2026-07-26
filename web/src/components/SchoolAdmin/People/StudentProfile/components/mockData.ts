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
