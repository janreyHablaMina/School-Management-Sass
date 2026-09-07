'use client';

import type { TeacherAssignmentRow } from '@/types/teacherAssignments';
import { listStyles, TeacherModal } from '../../shared';
import styles from './confirmAssignmentModal.module.css';

interface ConfirmAssignmentModalProps {
  assignment?: TeacherAssignmentRow | null;
  count?: number;
  actionType: 'archive' | 'delete';
  onCancel: () => void;
  onConfirm: () => void;
}

export function ConfirmAssignmentModal({
  assignment = null,
  count = 1,
  actionType,
  onCancel,
  onConfirm,
}: ConfirmAssignmentModalProps) {
  const isBulk = !assignment && count > 0;
  const title = isBulk
    ? `${count} assignment${count === 1 ? '' : 's'}`
    : (assignment?.title ?? 'Assignment');
  const copy = isBulk
    ? 'Selected from your assignments list'
    : `${assignment?.classLabel ?? ''} · ${assignment?.subject ?? ''}`;

  const isArchive = actionType === 'archive';

  return (
    <TeacherModal
      titleId={`confirm-${actionType}-assignment-title`}
      eyebrow={isArchive ? 'Archive assignment' : 'Delete assignment'}
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
            {isBulk ? `${isArchive ? 'Archive' : 'Delete'} ${count}` : `${isArchive ? 'Archive' : 'Delete'} assignment`}
          </button>
        </>
      }
    >
      <p className={styles.confirmCopy}>
        {isBulk ? (
          <>
            <strong>{count}</strong> selected assignment{count === 1 ? '' : 's'} will {isArchive ? 'move to Archived and leave your Active list. You can restore them anytime from the Archived filter.' : 'be permanently deleted. This action cannot be undone.'}
          </>
        ) : (
          <>
            This assignment will {isArchive ? 'move to Archived and leave your Active list. You can restore it anytime from the Archived filter.' : 'be permanently deleted. This action cannot be undone.'}
          </>
        )}
      </p>
    </TeacherModal>
  );
}
