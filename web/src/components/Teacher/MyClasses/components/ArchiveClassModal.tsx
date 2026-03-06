'use client';

import type { MyClassRow } from '@/types/myClasses';
import { listStyles, TeacherModal } from '../../shared';
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
  const isBulk = !cls && count > 0;
  const title = isBulk
    ? `${count} class${count === 1 ? '' : 'es'}`
    : (cls?.subject ?? 'Class');
  const copy = isBulk
    ? 'Selected from your class list'
    : `${cls?.gradeSection ?? ''} · ${cls?.academicYear ?? ''}`;

  return (
    <TeacherModal
      titleId="archive-class-title"
      eyebrow="Archive class"
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
            {isBulk ? `Archive ${count}` : 'Archive class'}
          </button>
        </>
      }
    >
      <p className={styles.archiveCopy}>
        {isBulk ? (
          <>
            <strong>{count}</strong> selected class{count === 1 ? '' : 'es'} will move
            to <strong>Archived</strong> and leave your Active list. You can restore
            them anytime from the Archived filter.
          </>
        ) : (
          <>
            This class will move to <strong>Archived</strong> and leave your Active
            list. You can restore it anytime from the Archived filter.
          </>
        )}
      </p>
      {!isBulk && cls ? (
        <ul className={styles.archiveFacts}>
          <li>
            <span>Room</span>
            <strong>{cls.room}</strong>
          </li>
          <li>
            <span>Students</span>
            <strong>{cls.studentCount}</strong>
          </li>
          <li>
            <span>Schedule</span>
            <strong>{cls.schedule}</strong>
          </li>
        </ul>
      ) : null}
    </TeacherModal>
  );
}
