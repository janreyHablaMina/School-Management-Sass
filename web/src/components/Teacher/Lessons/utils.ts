import type { LessonStatus, LessonType } from '@/types/teacherLessons';

export function lessonTypeAccent(type: LessonType): string {
  switch (type) {
    case 'Video Lesson':
      return '#b68eff';
    case 'Document':
      return '#5cc789';
    case 'Presentation':
      return '#f5a623';
    case 'Link':
      return '#84a9ff';
    case 'Text Lesson':
      return '#c9a8ff';
    default:
      return '#f5c842';
  }
}

export function lessonStatusAccent(status: LessonStatus): string {
  switch (status) {
    case 'Published':
      return '#5cc789';
    case 'Draft':
      return '#f5a623';
    case 'Archived':
      return '#84a9ff';
    default:
      return '#f0efed';
  }
}
