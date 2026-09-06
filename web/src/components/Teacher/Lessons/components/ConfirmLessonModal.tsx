'use client';

import type { TeacherLessonRow } from '@/types/teacherLessons';
import { listStyles, TeacherModal } from '../../shared';
import styles from './confirmLessonModal.module.css';

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
  const isBulk = !lesson && count > 0;
  const title = isBulk
    ? `${count} lesson${count === 1 ? '' : 's'}`
    : (lesson?.title ?? 'Lesson');
  const copy = isBulk
    ? 'Selected from your lesson list'
    : `${lesson?.classLabel ?? ''} · ${lesson?.subject ?? ''}`;

  const isArchive = actionType === 'archive';

  return (
    <TeacherModal
      titleId={`confirm-${actionType}-lesson-title`}
      eyebrow={isArchive ? 'Archive lesson' : 'Delete lesson'}
      title={title}
      copy={copy}
      onClose={onCancel}
      showClose
      footer={
        <>
          <button type="button" className={listStyles.secondaryBtn} onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className={styles.dangerBtn} onClick={onConfirm}>
            {isBulk ? `${isArchive ? 'Archive' : 'Delete'} ${count}` : `${isArchive ? 'Archive' : 'Delete'} lesson`}
          </button>
        </>
      }
    >
      <p className={styles.confirmCopy}>
        {isBulk ? (
          <>
            <strong>{count}</strong> selected lesson{count === 1 ? '' : 's'} will {isArchive ? 'move to Archived and leave your Active list. You can restore them anytime from the Archived filter.' : 'be permanently deleted. This action cannot be undone.'}
          </>
        ) : (
          <>
            This lesson will {isArchive ? 'move to Archived and leave your Active list. You can restore it anytime from the Archived filter.' : 'be permanently deleted. This action cannot be undone.'}
          </>
        )}
      </p>
    </TeacherModal>
  );
}
