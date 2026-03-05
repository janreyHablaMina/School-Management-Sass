import type {
  AiAssistantTool,
  AiAttachment,
  AiAttachmentKind,
  AiChatMessage,
  AiFollowUpActionId,
  AiReplyIntent,
} from '@/types/teacherAiAssistant';
import type { TeacherSummaryMetric } from '@/types/teacherList';
import type { AiUsage } from '@/types/teacherPortal';

const UPLOAD_EXTENSIONS = [
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

export const ACCEPTED_UPLOAD_ACCEPT = UPLOAD_EXTENSIONS.join(',');
export const MAX_ATTACHMENTS = 5;

const MAX_ATTACHMENT_BYTES = 15 * 1024 * 1024;

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

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function attachmentKindFromName(name: string): AiAttachmentKind {
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

export function collectAttachmentsFromFiles(
  files: FileList | File[],
  currentCount: number,
): { attachments: AiAttachment[]; error: string | null } {
  const list = Array.from(files);
  if (list.length === 0) return { attachments: [], error: null };

  const room = MAX_ATTACHMENTS - currentCount;
  if (room <= 0) {
    return {
      attachments: [],
      error: `You can attach up to ${MAX_ATTACHMENTS} files per run.`,
    };
  }

  const accepted: AiAttachment[] = [];
  for (const file of list.slice(0, room)) {
    const name = file.name.toLowerCase();
    if (!UPLOAD_EXTENSIONS.some((ext) => name.endsWith(ext))) {
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
    accepted.push({
      id: `file-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: file.name,
      sizeLabel: formatFileSize(file.size),
      kind: attachmentKindFromName(file.name),
      mimeType: file.type || 'application/octet-stream',
    });
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
  topic?: string,
  intent?: AiReplyIntent,
): AiChatMessage {
  return {
    id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    role,
    content,
    createdAt: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
    toolId,
    attachments: attachments?.length ? attachments : undefined,
    topic,
    intent,
  };
}

function joinBlocks(...parts: Array<string | false | undefined>): string {
  return parts.filter(Boolean).join('\n');
}

export function detectReplyIntent(
  prompt: string,
  tool?: AiAssistantTool,
): AiReplyIntent {
  const p = prompt.toLowerCase();
  if (/summar|biography|life of|overview|explain briefly/.test(p)) return 'summary';
  if (/quiz|question|mcq|true\/false/.test(p)) return 'quiz';
  if (/exam|midterm|final|test paper/.test(p)) return 'exam';
  if (/lesson|lesson plan|warm-?up|exit ticket/.test(p)) return 'lesson';

  switch (tool?.id) {
    case 1:
      return 'upload';
    case 2:
      return 'lesson';
    case 3:
      return 'quiz';
    case 4:
      return 'exam';
    case 5:
      return 'summary';
    default:
      return 'generic';
  }
}

/** Pull the classroom topic out of casual prompts like “generate me summary life of jose rizal”. */
export function extractTopicFromPrompt(prompt: string, fallback = 'your topic'): string {
  let topic = prompt.trim();
  topic = topic.replace(
    /^(please\s+)?(can you\s+)?(generate|create|make|write|draft|give|build|summarize)\s+(me\s+)?/i,
    '',
  );
  topic = topic.replace(
    /^(a\s+|an\s+|the\s+)?(short\s+|quick\s+)?(summary|lesson plan|lesson|quiz|exam|overview|notes?)\s*(of|on|about|for|:)?\s*/i,
    '',
  );
  topic = topic.replace(/^(of|on|about|for)\s+/i, '');
  topic = topic.replace(/[.?!]+$/g, '').trim();
  return topic || fallback;
}

export function followUpActionsFor(
  intent: AiReplyIntent = 'generic',
  options?: { savedLessonId?: string },
): Array<{ id: AiFollowUpActionId; label: string }> {
  const share = { id: 'share' as const, label: 'Share' };
  const save = {
    id: 'save' as const,
    label: options?.savedLessonId ? 'Open in Lessons' : 'Save as Lesson',
  };
  const qa = { id: 'generate-qa' as const, label: 'Generate Q&A' };

  switch (intent) {
    case 'summary':
    case 'lesson':
    case 'upload':
    case 'generic':
      return [save, qa, share];
    case 'quiz':
    case 'exam':
      return [save, share];
    default:
      return [save, qa, share];
  }
}

function buildKnownTopicSummary(topic: string): string | null {
  const key = topic.toLowerCase();
  if (/rizal/.test(key)) {
    return joinBlocks(
      'In one sentence',
      'José Rizal was a Filipino writer and reformist whose novels and ideas helped awaken national consciousness under Spanish rule.',
      '',
      'Life snapshot',
      '• Born June 19, 1861 in Calamba, Laguna; executed December 30, 1896 in Bagumbayan (Luneta).',
      '• Studied medicine and the arts in Europe; became a leading voice of the Propaganda Movement.',
      '• Wrote Noli Me Tangere and El Filibusterismo, exposing injustice and inspiring reform.',
      '• Advocated education, dignity, and peaceful change; his martyrdom strengthened the call for independence.',
      '',
      '5 takeaways',
      '1. Rizal used writing as a tool for social reform.',
      '2. His novels revealed abuses of colonial power and the clergy.',
      '3. He valued knowledge, civic duty, and love of country.',
      '4. Spanish authorities saw his ideas as a threat and sentenced him to death.',
      '5. Filipinos honor him as a national hero whose ideals still shape civic learning.',
      '',
      'Classroom tip',
      'Ask students: Which idea from Rizal still matters in the Philippines today?',
    );
  }
  return null;
}

export function buildQaFromTopic(topic: string, classroom: string): string {
  const classLine = classroom ? ` for ${classroom}` : '';
  const key = topic.toLowerCase();

  if (/rizal/.test(key)) {
    return joinBlocks(
      `Questions & answers${classLine} based on “${topic}”.`,
      '',
      '1. Where and when was José Rizal born?',
      'A: Calamba, Laguna — June 19, 1861.',
      '',
      '2. Name his two most famous novels.',
      'A: Noli Me Tangere and El Filibusterismo.',
      '',
      '3. What movement did Rizal help lead through writing and ideas?',
      'A: The Propaganda Movement for reforms under Spanish rule.',
      '',
      '4. True or False: Rizal’s main tool for change was armed rebellion.',
      'A: False — he emphasized education, writing, and peaceful reform.',
      '',
      '5. Why is December 30 important in Philippine history?',
      'A: It marks Rizal’s execution in 1896; the nation commemorates his martyrdom.',
      '',
      'Demo mode — edit before assigning.',
    );
  }

  return joinBlocks(
    `Questions & answers${classLine} based on “${topic}”.`,
    '',
    '1. Who or what is the main focus?',
    `A: ${topic} — students should state the core idea in one sentence.`,
    '',
    '2. Why does this matter in class?',
    'A: It connects history/ideas to civic values and critical reading.',
    '',
    '3. Name one key detail students should remember.',
    'A: Pick a landmark fact, date, or contribution from the summary.',
    '',
    '4. True or False: The topic only matters for memorization.',
    'A: False — students should explain significance, not only recall names.',
    '',
    '5. Short answer: What is one lesson we can apply today?',
    'A: Encourage a values-based or skills-based takeaway from the material.',
    '',
    'Demo mode — edit before assigning.',
  );
}

export function buildAssistantReply(
  tool: AiAssistantTool | undefined,
  prompt: string,
  classroom: string,
  attachments: AiAttachment[] = [],
): { content: string; intent: AiReplyIntent; topic: string } {
  const topic = extractTopicFromPrompt(
    prompt,
    attachments[0]?.name ?? 'your request',
  );
  const intent = detectReplyIntent(prompt, tool);
  const classLine = classroom ? ` for ${classroom}` : '';
  const filesBlock =
    attachments.length > 0
      ? joinBlocks(
          '',
          'Source files',
          attachments.map((file) => `• ${file.name} (${file.sizeLabel})`).join('\n'),
        )
      : '';

  let content: string;
  switch (intent) {
    case 'upload':
      content = joinBlocks(
        attachments.length
          ? `I reviewed your upload${classLine}.`
          : `Ready to analyze materials${classLine}.`,
        '',
        attachments.length ? 'Suggested outputs from these files' : 'Suggested next steps',
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
      );
      break;
    case 'lesson':
      content = joinBlocks(
        `Here is a draft lesson plan${classLine}.`,
        '',
        `Topic: ${topic}`,
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
        filesBlock,
        '',
        'Demo mode — copy and edit before assigning to students.',
      );
      break;
    case 'quiz':
      content = joinBlocks(
        `Quiz draft ready${classLine}.`,
        '',
        `Topic: ${topic}`,
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
        filesBlock,
      );
      break;
    case 'exam':
      content = joinBlocks(
        `Exam draft ready${classLine}.`,
        '',
        `Topic: ${topic}`,
        '',
        'Structure',
        '• Part A — Multiple choice (40%)',
        '• Part B — Short constructed response (35%)',
        '• Part C — Performance / problem set (25%)',
        '',
        'Answer key: included as a teacher-only section at the end.',
        'Suggested time: align with your class period + 5 minutes buffer.',
        filesBlock,
      );
      break;
    case 'summary': {
      const known = buildKnownTopicSummary(topic);
      content = joinBlocks(
        `Student-friendly summary${classLine}.`,
        '',
        `Topic: ${topic}`,
        '',
        known ??
          joinBlocks(
            'In one sentence',
            `${topic} is explained in plain language so students can retell the main idea.`,
            '',
            '5 takeaways',
            `1. Who/what: introduce ${topic} clearly`,
            '2. Why it matters for the class or community',
            '3. One vivid example or scene students remember',
            '4. A common misconception to correct',
            '5. One practice task or reflection for tonight',
            '',
            'Classroom tip',
            'Ask students to underline one fact and one opinion, then discuss the difference.',
          ),
        filesBlock,
        '',
        'What next? Save, generate Q&A, or share.',
      );
      break;
    }
    default:
      content = joinBlocks(
        `I can help with lessons, quizzes, exams, and summaries${classLine}.`,
        '',
        'Attach a file or pick a tool, then describe the classroom goal.',
        '',
        `You asked: ${topic}`,
        filesBlock,
      );
  }

  return { content, intent, topic };
}

export function previewFromRun(prompt: string, attachments: AiAttachment[]): string {
  const clean = prompt.replace(/\s+/g, ' ').trim();
  if (clean) return clean.length <= 64 ? clean : `${clean.slice(0, 63)}…`;
  if (attachments.length === 1) return attachments[0].name;
  if (attachments.length > 1) return `${attachments.length} files attached`;
  return 'AI run';
}
