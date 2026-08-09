import type {
  AiAssistantTool,
  AiAttachment,
  AiAttachmentKind,
  AiChatMessage,
  TeacherSummaryMetric,
} from '@/types/teacherAiAssistant';
import type { AiUsage } from '@/types/teacherPortal';

export const ACCEPTED_UPLOAD_EXTENSIONS = [
  '.pdf',
  '.ppt',
  '.pptx',
  '.doc',
  '.docx',
  '.txt',
  '.rtf',
  '.odt',
  '.odp',
] as const;

export const ACCEPTED_UPLOAD_ACCEPT = ACCEPTED_UPLOAD_EXTENSIONS.join(',');

export const MAX_ATTACHMENTS = 5;
export const MAX_ATTACHMENT_BYTES = 15 * 1024 * 1024;

export function buildMetrics(
  creditsLeft: number,
  usage: AiUsage,
  toolsCount: number,
): TeacherSummaryMetric[] {
  return [
    {
      label: 'Credits left',
      value: creditsLeft.toLocaleString(),
      subtitle: 'Available this month',
      icon: '✨',
      accent: '#f5c842',
    },
    {
      label: 'Used this month',
      value: `${usage.used}`,
      subtitle: `of ${usage.total.toLocaleString()} credits`,
      icon: '📊',
      accent: '#84a9ff',
    },
    {
      label: 'AI tools',
      value: String(toolsCount),
      subtitle: 'Ready for classroom work',
      icon: '🧰',
      accent: '#5cc789',
    },
    {
      label: 'Usage',
      value: `${usage.percent}%`,
      subtitle: 'Of monthly allowance',
      icon: '📈',
      accent: '#f5a623',
    },
  ];
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function attachmentKindFromName(name: string): AiAttachmentKind {
  const ext = name.includes('.') ? name.slice(name.lastIndexOf('.')).toLowerCase() : '';
  if (ext === '.pdf') return 'pdf';
  if (ext === '.ppt' || ext === '.pptx' || ext === '.odp') return 'ppt';
  if (ext === '.doc' || ext === '.docx' || ext === '.odt' || ext === '.rtf') return 'doc';
  if (ext === '.txt') return 'text';
  return 'other';
}

export function attachmentIcon(kind: AiAttachmentKind): string {
  switch (kind) {
    case 'pdf':
      return '📄';
    case 'ppt':
      return '📊';
    case 'doc':
      return '📝';
    case 'text':
      return '📃';
    default:
      return '📎';
  }
}

function isAcceptedFile(file: File): boolean {
  const name = file.name.toLowerCase();
  return ACCEPTED_UPLOAD_EXTENSIONS.some((ext) => name.endsWith(ext));
}

export function createAttachmentFromFile(file: File): AiAttachment {
  return {
    id: `file-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    name: file.name,
    sizeLabel: formatFileSize(file.size),
    kind: attachmentKindFromName(file.name),
    mimeType: file.type || 'application/octet-stream',
  };
}

export function collectAttachmentsFromFiles(
  files: FileList | File[],
  currentCount: number,
): { attachments: AiAttachment[]; error: string | null } {
  const list = Array.from(files);
  if (list.length === 0) {
    return { attachments: [], error: null };
  }

  const room = MAX_ATTACHMENTS - currentCount;
  if (room <= 0) {
    return {
      attachments: [],
      error: `You can attach up to ${MAX_ATTACHMENTS} files per run.`,
    };
  }

  const accepted: AiAttachment[] = [];
  for (const file of list.slice(0, room)) {
    if (!isAcceptedFile(file)) {
      return {
        attachments: [],
        error: 'Use PDF, PowerPoint, Word, text, or OpenDocument files.',
      };
    }
    if (file.size > MAX_ATTACHMENT_BYTES) {
      return {
        attachments: [],
        error: `"${file.name}" is over 15 MB. Choose a smaller file.`,
      };
    }
    accepted.push(createAttachmentFromFile(file));
  }

  if (list.length > room) {
    return {
      attachments: accepted,
      error: `Only ${MAX_ATTACHMENTS} files allowed — attached the first ${room}.`,
    };
  }

  return { attachments: accepted, error: null };
}

export function createMessage(
  role: AiChatMessage['role'],
  content: string,
  toolId?: number,
  attachments?: AiAttachment[],
): AiChatMessage {
  return {
    id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    role,
    content,
    createdAt: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
    toolId,
    attachments: attachments?.length ? attachments : undefined,
  };
}

function fileListLine(attachments: AiAttachment[]): string {
  if (attachments.length === 0) return '';
  return attachments.map((file) => `• ${file.name} (${file.sizeLabel})`).join('\n');
}

export function buildAssistantReply(
  tool: AiAssistantTool | undefined,
  prompt: string,
  classroom: string,
  attachments: AiAttachment[] = [],
): string {
  const topic = prompt.trim().slice(0, 120) || (attachments[0]?.name ?? 'your request');
  const classLine = classroom ? ` for ${classroom}` : '';
  const filesBlock =
    attachments.length > 0
      ? ['', 'Source files', fileListLine(attachments)].join('\n')
      : '';

  switch (tool?.id) {
    case 1:
      return [
        attachments.length
          ? `I reviewed your upload${classLine}.`
          : `Ready to analyze materials${classLine}.`,
        '',
        attachments.length
          ? 'Suggested outputs from these files'
          : 'Suggested next steps',
        attachments.length
          ? '1. Lesson outline pulled from the slides/document sections'
          : '1. Attach a PDF, PowerPoint, or Word file',
        '2. Vocabulary list + discussion questions',
        '3. Short quiz or summary you can drop into Lessons',
        '',
        `Focus: ${topic}`,
        filesBlock,
        '',
        'Demo mode — files stay in this session only.',
      ]
        .filter(Boolean)
        .join('\n');
    case 2:
      return [
        `Here is a draft lesson plan${classLine}.`,
        '',
        'Lesson outline',
        '• Warm-up (5 min): Activate prior knowledge with a quick board prompt.',
        '• Teach (15 min): Short chalk explanation + worked example.',
        '• Guided practice (15 min): Pair work with 3 progressive problems.',
        '• Exit ticket (10 min): 2 checks for understanding.',
        '',
        attachments.length
          ? 'Materials: adapted from your attached file(s), plus chalkboard examples.'
          : 'Materials: chalkboard examples, student notebooks, 1 printable worksheet.',
        '',
        `Based on: ${topic}`,
        filesBlock,
        '',
        'Demo mode — copy and edit before assigning to students.',
      ]
        .filter(Boolean)
        .join('\n');
    case 3:
      return [
        `Quiz draft ready${classLine}.`,
        '',
        'Item set (sample)',
        '1. Multiple choice — recall of key terms',
        '2. Multiple choice — apply the concept',
        '3. Short answer — explain in 2–3 sentences',
        '4. True/False — common misconception check',
        '5. Challenge — multi-step reasoning',
        '',
        attachments.length
          ? 'Items were seeded from the attached materials.'
          : 'I can expand this to your full item count, add an answer key, or retarget difficulty.',
        '',
        `Based on: ${topic}`,
        filesBlock,
      ]
        .filter(Boolean)
        .join('\n');
    case 4:
      return [
        `Exam draft ready${classLine}.`,
        '',
        'Structure',
        '• Part A — Multiple choice (40%)',
        '• Part B — Short constructed response (35%)',
        '• Part C — Performance / problem set (25%)',
        '',
        'Answer key: included as a teacher-only section at the end.',
        'Suggested time: align with your class period + 5 minutes buffer.',
        '',
        `Based on: ${topic}`,
        filesBlock,
      ]
        .filter(Boolean)
        .join('\n');
    case 5:
      return [
        `Student-friendly summary${classLine}.`,
        '',
        'In one sentence',
        'The main idea is stated clearly, then broken into digestible chalk notes.',
        '',
        '5 takeaways',
        '1. Core definition students must remember',
        '2. Why the idea matters in class',
        '3. One everyday example',
        '4. Common mistake to avoid',
        '5. What to practice tonight',
        '',
        `Source: ${topic}`,
        filesBlock,
      ]
        .filter(Boolean)
        .join('\n');
    default:
      return [
        `I can help with lessons, quizzes, exams, and summaries${classLine}.`,
        '',
        'Attach a file or pick a tool, then describe the classroom goal.',
        '',
        `You asked: ${topic}`,
        filesBlock,
      ]
        .filter(Boolean)
        .join('\n');
  }
}

export function previewFromPrompt(prompt: string, max = 64): string {
  const clean = prompt.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1)}…`;
}

export function previewFromRun(prompt: string, attachments: AiAttachment[]): string {
  if (prompt.trim()) return previewFromPrompt(prompt);
  if (attachments.length === 1) return attachments[0].name;
  if (attachments.length > 1) return `${attachments.length} files attached`;
  return 'AI run';
}
