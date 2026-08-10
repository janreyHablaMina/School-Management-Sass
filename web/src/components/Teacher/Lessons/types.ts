export type LessonGeneratorMode = 'generate' | 'upload';

export interface LessonGeneratorSession {
  mode: LessonGeneratorMode;
  classLabel: string;
  subject: string;
  durationMins?: number;
  topic?: string;
  initialPrompt: string;
}
