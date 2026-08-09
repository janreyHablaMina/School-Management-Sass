'use client';

import type { MyClassRow } from '@/types/myClasses';
import { listStyles, TeacherModal } from '../../shared';
import styles from '../myClasses.module.css';

interface ArchiveClassModalProps {
  cls: MyClassRow;
  onCancel: () => void;
  onConfirm: () => void;
}

export function ArchiveClassModal({
  cls,
  onCancel,
  onConfirm,
}: ArchiveClassModalProps) {
  return (
    <TeacherModal
      titleId="archive-class-title"
      eyebrow="Archive class"
      title={cls.subject}
      copy={`${cls.gradeSection} · ${cls.academicYear}`}
      onClose={onCancel}
      showClose
      footer={
        <>
          <button type="button" className={listStyles.secondaryBtn} onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className={styles.dangerBtn} onClick={onConfirm}>
            Archive class
          </button>
        </>
      }
    >
      <p className={styles.archiveCopy}>
        This class will move to <strong>Archived</strong> and leave your Active
        list. You can restore it anytime from the Archived filter.
      </p>
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
    </TeacherModal>
  );
}
