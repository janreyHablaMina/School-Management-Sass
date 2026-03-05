import type { AiTool, AiUsage } from './teacherPortal';

export type AiMessageRole = 'user' | 'assistant';

export type AiAttachmentKind = 'pdf' | 'ppt' | 'doc' | 'text' | 'other';

export interface AiAttachment {
  id: string;
  name: string;
  sizeLabel: string;
  kind: AiAttachmentKind;
  mimeType: string;
}

export interface AiAssistantTool extends AiTool {
  promptHint: string;
  creditCost: number;
}

export type AiReplyIntent =
  | 'summary'
  | 'lesson'
  | 'quiz'
  | 'exam'
  | 'upload'
  | 'generic';

export interface AiChatMessage {
  id: string;
  role: AiMessageRole;
  content: string;
  createdAt: string;
  toolId?: number;
  attachments?: AiAttachment[];
  /** Topic used for follow-up actions (Q&A, save labels). */
  topic?: string;
  /** Drives Save / Q&A / Share buttons under assistant replies. */
  intent?: AiReplyIntent;
}

export type AiFollowUpActionId = 'save' | 'generate-qa' | 'share';

export interface AiRecentRun {
  id: string;
  toolId: number;
  toolTitle: string;
  toolIcon: string;
  preview: string;
  classroom: string;
  creditsSpent: number;
  createdAt: string;
}

export interface AiStarterPrompt {
  id: string;
  label: string;
  prompt: string;
  toolId: number;
}

export interface TeacherAiAssistantData {
  creditsLeft: number;
  usage: AiUsage;
  tools: AiAssistantTool[];
  classroomOptions: string[];
  starterPrompts: AiStarterPrompt[];
  recentRuns: AiRecentRun[];
}
