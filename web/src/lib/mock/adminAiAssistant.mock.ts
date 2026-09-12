import type { TeacherAiAssistantData } from '@/types/teacherAiAssistant';

const adminTools = [
  {
    id: 1,
    title: 'Draft Announcement',
    desc: 'Write formal announcements for parents, staff, or students.',
    icon: '📢',
    iconBg: 'rgba(182, 142, 255, 0.1)',
    iconColor: '#b68eff',
    credits: '10 cr',
  },
  {
    id: 2,
    title: 'Summarize Report',
    desc: 'Extract key points from long attendance or financial reports.',
    icon: '📄',
    iconBg: 'rgba(92, 199, 137, 0.1)',
    iconColor: '#5cc789',
    credits: '15 cr',
  },
  {
    id: 3,
    title: 'Draft Memo',
    desc: 'Create internal memos for teachers and staff members.',
    icon: '📝',
    iconBg: 'rgba(255, 171, 107, 0.1)',
    iconColor: '#ffab6b',
    credits: '10 cr',
  },
  {
    id: 4,
    title: 'Translate Notice',
    desc: 'Translate school notices into local dialects or languages.',
    icon: '🌍',
    iconBg: 'rgba(107, 203, 255, 0.1)',
    iconColor: '#6bcbff',
    credits: '20 cr',
  },
];

const promptHints: Record<number, string> = {
  1: 'Who is the audience and what is the key message?',
  2: 'Attach a CSV or PDF report to get a quick executive summary.',
  3: 'What is the policy or update you need the staff to know?',
  4: 'Paste the notice and specify the target language.',
};

function creditCostFromLabel(credits: string): number {
  if (credits.toLowerCase().includes('free')) return 0;
  const match = credits.match(/(\d+)/);
  return match ? Number(match[1]) : 10;
}

export const adminAiAssistantMock: TeacherAiAssistantData = {
  creditsLeft: 50000,
  usage: {
    used: 12500,
    total: 62500,
    percent: 20,
  },
  tools: adminTools.map((tool) => ({
    ...tool,
    promptHint: promptHints[tool.id] ?? 'Describe what you need help with.',
    creditCost: creditCostFromLabel(tool.credits),
  })),
  classroomOptions: ['All Staff', 'All Parents', 'All Students', 'Grade 7 Teachers', 'Grade 12 Parents'],
  starterPrompts: [
    {
      id: 'sp-1',
      label: 'Weather Suspension',
      prompt: 'Draft an urgent announcement to all parents about class suspension tomorrow due to the typhoon. Include safety reminders.',
      toolId: 1,
    },
    {
      id: 'sp-2',
      label: 'New Dress Code Memo',
      prompt: 'Write a memo to all staff detailing the new casual Friday dress code guidelines.',
      toolId: 3,
    },
    {
      id: 'sp-3',
      label: 'Summarize Meeting',
      prompt: 'Summarize the attached PTA meeting minutes into 3 key action items for the board.',
      toolId: 2,
    },
  ],
  recentRuns: [
    {
      id: 'run-1',
      toolId: 1,
      toolTitle: 'Draft Announcement',
      toolIcon: '📢',
      preview: 'Parent-Teacher conference schedule update',
      classroom: 'All Parents',
      creditsSpent: 10,
      createdAt: 'Today · 9:12 AM',
    },
    {
      id: 'run-2',
      toolId: 3,
      toolTitle: 'Draft Memo',
      toolIcon: '📝',
      preview: 'Reminder for submission of Q1 grades',
      classroom: 'All Staff',
      creditsSpent: 10,
      createdAt: 'Yesterday · 4:40 PM',
    },
  ],
};
