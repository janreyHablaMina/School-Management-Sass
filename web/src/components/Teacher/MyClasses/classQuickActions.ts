export interface ClassQuickAction {
  id: string;
  label: string;
  hint: string;
  icon: string;
  tab: string;
  accent: string;
  featured?: boolean;
  /** Prefill AI Assistant active tool. */
  aiToolId?: number;
}

/** Primary teacher workflows launched from a class hub. */
export const CLASS_QUICK_ACTIONS: ClassQuickAction[] = [
  {
    id: 'generate-quiz',
    label: 'Generate Quiz',
    hint: 'AI questions for this class',
    icon: '❓',
    tab: 'AI Assistant',
    accent: '#f5c842',
    featured: true,
    aiToolId: 3,
  },
  {
    id: 'generate-exam',
    label: 'Generate Exam',
    hint: 'Draft exam with answer key',
    icon: '📝',
    tab: 'AI Assistant',
    accent: '#84a9ff',
    featured: true,
    aiToolId: 4,
  },
  {
    id: 'generate-lesson',
    label: 'Generate Lesson',
    hint: 'Build a lesson plan fast',
    icon: '📖',
    tab: 'AI Assistant',
    accent: '#5cc789',
    featured: true,
    aiToolId: 2,
  },
  {
    id: 'create-assignment',
    label: 'Create Assignment',
    hint: 'Set work for this class',
    icon: '📋',
    tab: 'Assignments',
    accent: '#c9a8ff',
    featured: true,
  },
  {
    id: 'attendance',
    label: 'Take Attendance',
    hint: "Start today's session",
    icon: '📍',
    tab: 'Attendance',
    accent: '#f5a623',
    featured: true,
  },
  { id: 'grades', label: 'Grades', hint: '', icon: '📊', tab: 'Grades', accent: '#b68eff' },
  { id: 'quizzes', label: 'Quizzes', hint: '', icon: '🧠', tab: 'Quizzes', accent: '#6ed9a0' },
  { id: 'exams', label: 'Exams', hint: '', icon: '📄', tab: 'Exams', accent: '#ff7e93' },
  { id: 'students', label: 'Students', hint: '', icon: '👥', tab: 'Students', accent: '#84a9ff' },
  { id: 'lessons', label: 'Lessons', hint: '', icon: '📚', tab: 'Lessons', accent: '#f5a623' },
  {
    id: 'announcements',
    label: 'Announce',
    hint: '',
    icon: '📢',
    tab: 'Announcements',
    accent: '#5cc789',
  },
  { id: 'calendar', label: 'Calendar', hint: '', icon: '📅', tab: 'Calendar', accent: '#b68eff' },
];
