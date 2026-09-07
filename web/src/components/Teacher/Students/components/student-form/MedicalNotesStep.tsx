import React from 'react';
import type { StudentProfileFormInput } from '@/types/teacherStudents';
import { modalStyles } from '../../../shared';

interface MedicalNotesStepProps {
  values: StudentProfileFormInput;
  patch: <K extends keyof StudentProfileFormInput>(key: K, val: StudentProfileFormInput[K]) => void;
}

export function MedicalNotesStep({ values, patch }: MedicalNotesStepProps) {
  return (
    <>
      <label className={modalStyles.modalField}>
        <span className={modalStyles.modalLabel}>Allergies</span>
        <input
          className={modalStyles.modalInput}
          type="text"
          value={values.allergies}
          onChange={(e) => patch('allergies', e.target.value)}
          placeholder="None on file"
          maxLength={120}
        />
      </label>

      <label className={modalStyles.modalField}>
        <span className={modalStyles.modalLabel}>Medical notes</span>
        <textarea
          className={modalStyles.modalTextarea}
          value={values.medicalNotes}
          onChange={(e) => patch('medicalNotes', e.target.value)}
          placeholder="Health notes for classroom awareness"
          maxLength={400}
          rows={3}
        />
      </label>

      <label className={modalStyles.modalField}>
        <span className={modalStyles.modalLabel}>Teacher notes</span>
        <textarea
          className={modalStyles.modalTextarea}
          value={values.teacherNotes}
          onChange={(e) => patch('teacherNotes', e.target.value)}
          placeholder="Private classroom notes"
          maxLength={400}
          rows={3}
        />
      </label>

      <label className={modalStyles.modalField} style={{ marginTop: '0.5rem' }}>
        <span className={modalStyles.modalLabel}>Enrollment date</span>
        <input
          className={modalStyles.modalInput}
          type="date"
          value={values.enrollmentDate}
          onChange={(e) => patch('enrollmentDate', e.target.value)}
        />
      </label>
    </>
  );
}
