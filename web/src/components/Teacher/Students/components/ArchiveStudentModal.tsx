'use client';

import { useState } from 'react';
import type { TeacherStudentRow } from '@/types/teacherStudents';
import { listStyles, TeacherModal, modalStyles } from '@/components/ui/shared';;
import styles from '../students.module.css';

interface ArchiveStudentModalProps {
  student?: TeacherStudentRow | null;
  count?: number;
  onCancel: () => void;
  onConfirm: () => void;
}

export function ArchiveStudentModal({
  student = null,
  count = 1,
  onCancel,
  onConfirm,
}: ArchiveStudentModalProps) {
  const [reason, setReason] = useState('');
  const isBulk = !student && count > 0;
  const title = isBulk
    ? `${count} student${count === 1 ? '' : 's'}`
    : (student?.fullName ?? 'Student');
  const copy = isBulk
    ? 'Selected from your list'
    : `${student?.studentCode ?? ''} · ${student?.classLabel ?? ''}`;

  return (
    <TeacherModal
      titleId="archive-student-title"
      eyebrow="Archive"
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
            {isBulk ? `Archive ${count} student${count === 1 ? '' : 's'}` : 'Archive student'}
          </button>
        </>
      }
    >
      <p className={styles.inactiveCopy}>
        {isBulk ? (
          <>
            <strong>{count}</strong> selected student{count === 1 ? '' : 's'} will be
            <strong> Archived</strong>. You can restore them anytime from the
            Archived status filter.
          </>
        ) : (
          <>
            This student will be <strong>Archived</strong> and can be filtered
            under Archived status. You can restore them to Active anytime.
          </>
        )}
      </p>
      
      {!isBulk && student ? (
        <ul className={styles.inactiveFacts}>
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

      <div style={{ marginTop: '1.25rem' }}>
        <label className={modalStyles.modalField}>
          <span className={modalStyles.modalLabel}>Reason (Optional)</span>
          <textarea
            className={modalStyles.modalTextarea}
            placeholder="Why is this student being archived?"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </label>
      </div>
    </TeacherModal>
  );
}
