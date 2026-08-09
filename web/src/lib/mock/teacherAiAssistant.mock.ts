import type { TeacherAiAssistantData } from '@/types/teacherAiAssistant';
import { teacherPortalMock } from './teacherPortal.mock';

const { aiCredits, aiUsage, aiTools, myClasses } = teacherPortalMock;

const promptHints: Record<number, string> = {
  1: 'Attach a PDF, PowerPoint, or Word file, then say what you need (outline, quiz, summary…).',
  2: 'Topic, grade level, duration, and learning goals — or attach source notes to build from.',
  3: 'Topic, number of items, difficulty, and question types — attach a lesson file to quiz from.',
  4: 'Coverage, item count, time limit, and whether you need an answer key.',
  5: 'Attach notes or paste material to summarize for students.',
};

const creditCosts: Record<number, number> = {
  1: 0,
  2: 15,
  3: 10,
  4: 20,
  5: 8,
};

export const teacherAiAssistantMock: TeacherAiAssistantData = {
  creditsLeft: aiCredits,
  usage: aiUsage,
  tools: aiTools.map((tool) => ({
    ...tool,
    promptHint: promptHints[tool.id] ?? 'Describe what you need help with.',
    creditCost: creditCosts[tool.id] ?? 10,
  })),
  classroomOptions: myClasses.map((c) => c.title),
  starterPrompts: [
    {
      id: 'sp-1',
      label: 'Fractions lesson',
      prompt:
        'Create a 45-minute lesson on comparing fractions for Grade 7, with a warm-up, guided practice, and exit ticket.',
      toolId: 2,
    },
    {
      id: 'sp-2',
      label: 'Science quiz',
      prompt:
        'Generate a 10-item quiz on the water cycle for Grade 8, mix of multiple choice and short answer, medium difficulty.',
      toolId: 3,
    },
    {
      id: 'sp-3',
      label: 'ICT exam draft',
      prompt:
        'Draft a 40-item midterm exam on basic networking for Grade 10 ICT, include an answer key.',
      toolId: 4,
    },
    {
      id: 'sp-4',
      label: 'Summarize notes',
      prompt:
        'Summarize this lesson for students in plain language with 5 key takeaways and 3 practice tips: photosynthesis stages and why leaves look green.',
      toolId: 5,
    },
  ],
  recentRuns: [
    {
      id: 'run-1',
      toolId: 3,
      toolTitle: 'Generate Quiz',
      toolIcon: '❓',
      preview: '10-item quiz on linear equations for Grade 7',
      classroom: 'Grade 7 - Section A',
      creditsSpent: 10,
      createdAt: 'Today · 9:12 AM',
    },
    {
      id: 'run-2',
      toolId: 2,
      toolTitle: 'Generate Lesson',
      toolIcon: '📖',
      preview: 'Lesson plan: intro to cell organelles',
      classroom: 'Grade 8 - Section B',
      creditsSpent: 15,
      createdAt: 'Yesterday · 4:40 PM',
    },
    {
      id: 'run-3',
      toolId: 5,
      toolTitle: 'Summarize Lesson',
      toolIcon: '✨',
      preview: 'Student-friendly summary of binary search',
      classroom: 'Grade 10 - ICT',
      creditsSpent: 8,
      createdAt: 'Mon · 11:05 AM',
    },
  ],
};
