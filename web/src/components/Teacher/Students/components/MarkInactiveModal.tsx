'use client';

import type { TeacherStudentRow } from '@/types/teacherStudents';
import { listStyles, TeacherModal } from '../../shared';
import styles from '../students.module.css';

interface MarkInactiveModalProps {
  student?: TeacherStudentRow | null;
  count?: number;
  onCancel: () => void;
  onConfirm: () => void;
}

export function MarkInactiveModal({
  student = null,
  count = 1,
  onCancel,
  onConfirm,
}: MarkInactiveModalProps) {
  const isBulk = !student && count > 0;
  const title = isBulk
    ? `${count} student${count === 1 ? '' : 's'}`
    : (student?.fullName ?? 'Student');
  const copy = isBulk
    ? 'Selected from your class list'
    : `${student?.studentCode ?? ''} · ${student?.classLabel ?? ''}`;

  return (
    <TeacherModal
      titleId="mark-inactive-title"
      eyebrow="Mark inactive"
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
            {isBulk ? `Mark ${count} inactive` : 'Mark inactive'}
          </button>
        </>
      }
    >
      <p className={styles.inactiveCopy}>
        {isBulk ? (
          <>
            <strong>{count}</strong> selected student{count === 1 ? '' : 's'} will be
            marked <strong>Inactive</strong>. You can restore them anytime from the
            Inactive status filter.
          </>
        ) : (
          <>
            This student will be marked <strong>Inactive</strong> and can be filtered
            under Inactive status. You can restore them to Active anytime.
          </>
        )}
      </p>
      {!isBulk && student ? (
        <ul className={styles.inactiveFacts}>
          <li>
            <span>Current status</span>
            <strong>{student.status}</strong>
          </li>
          <li>
            <span>Class</span>
            <strong>{student.classLabel}</strong>
          </li>
          <li>
            <span>Subject</span>
            <strong>{student.subject}</strong>
          </li>
        </ul>
      ) : null}
    </TeacherModal>
  );
}
