'use client';

import type { MyClassRow } from '@/types/myClasses';
import { ConfirmActionModal } from '../../shared';
import styles from '../myClasses.module.css';

interface ArchiveClassModalProps {
  cls?: MyClassRow | null;
  count?: number;
  onCancel: () => void;
  onConfirm: () => void;
}

export function ArchiveClassModal({
  cls = null,
  count = 1,
  onCancel,
  onConfirm,
}: ArchiveClassModalProps) {
  const isBulk = !cls && count > 1;
  const title = isBulk
    ? count + ' classes'
    : (cls?.subject ?? 'Class');
  const copy = isBulk
    ? 'Selected from your class list'
    : (cls?.gradeSection ?? '') + ' - ' + (cls?.academicYear ?? '');

  return (
    <ConfirmActionModal
      title={title}
      copy={copy}
      itemLabel="class"
      count={isBulk ? count : 1}
      actionType="archive"
      onCancel={onCancel}
      onConfirm={onConfirm}
    >
      {!isBulk && cls ? (
        <ul className={styles.archiveFacts}>
          <li><span>Room</span><strong>{cls.room}</strong></li>
          <li><span>Students</span><strong>{cls.studentCount}</strong></li>
          <li><span>Schedule</span><strong>{cls.schedule}</strong></li>
        </ul>
      ) : null}
    </ConfirmActionModal>
  );
}