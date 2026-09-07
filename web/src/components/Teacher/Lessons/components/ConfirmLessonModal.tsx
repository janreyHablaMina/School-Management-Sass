'use client';

import type { TeacherLessonRow } from '@/types/teacherLessons';
import { ConfirmActionModal } from '../../shared';

interface ConfirmLessonModalProps {
  lesson?: TeacherLessonRow | null;
  count?: number;
  actionType: 'archive' | 'delete';
  onCancel: () => void;
  onConfirm: () => void;
}

export function ConfirmLessonModal({
  lesson = null,
  count = 1,
  actionType,
  onCancel,
  onConfirm,
}: ConfirmLessonModalProps) {
  const isBulk = !lesson && count > 1;
  const title = isBulk
    ? count + ' lessons'
    : (lesson?.title ?? 'Lesson');
  const copy = isBulk
    ? 'Selected from your lesson list'
    : (lesson?.classLabel ?? '') + ' - ' + (lesson?.subject ?? '');

  return (
    <ConfirmActionModal
      title={title}
      copy={copy}
      itemLabel="lesson"
      count={isBulk ? count : 1}
      actionType={actionType}
      onCancel={onCancel}
      onConfirm={onConfirm}
    />
  );
}