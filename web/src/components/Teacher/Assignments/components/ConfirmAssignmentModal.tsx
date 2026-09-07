'use client';

import type { TeacherAssignmentRow } from '@/types/teacherAssignments';
import { ConfirmActionModal } from '../../shared';

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
  const isBulk = !assignment && count > 1;
  const title = isBulk
    ? count + ' assignments'
    : (assignment?.title ?? 'Assignment');
  const copy = isBulk
    ? 'Selected from your assignments list'
    : (assignment?.classLabel ?? '') + ' - ' + (assignment?.subject ?? '');

  return (
    <ConfirmActionModal
      title={title}
      copy={copy}
      itemLabel="assignment"
      count={isBulk ? count : 1}
      actionType={actionType}
      onCancel={onCancel}
      onConfirm={onConfirm}
    />
  );
}