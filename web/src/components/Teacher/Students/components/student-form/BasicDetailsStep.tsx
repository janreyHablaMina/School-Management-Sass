import React from 'react';
import type { StudentProfileFormInput, StudentStatus } from '@/types/teacherStudents';
import { listStyles, modalStyles } from '../../../shared';
import { STUDENT_PHOTO_ACCEPT, gradeLevelFromClassLabel } from '../../studentForm';
import styles from '../../students.module.css';
import { StudentAvatar } from '../StudentAvatar';
import { CustomSelect } from '@/components/ui/CustomSelect';

const STATUSES: StudentStatus[] = ['Active', 'At Risk', 'Inactive'];

interface BasicDetailsStepProps {
  values: StudentProfileFormInput;
  errors: Record<string, string>;
  patch: <K extends keyof StudentProfileFormInput>(key: K, val: StudentProfileFormInput[K]) => void;
  setValues: React.Dispatch<React.SetStateAction<StudentProfileFormInput>>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  classOptions: string[];
  subjectOptions: string[];
  gradeOptions: string[];
  previewStudent: any; // We can use the appropriate type here, TeacherStudentRow | null
  fileInputRef: React.RefObject<HTMLInputElement>;
  handlePhotoChange: (file?: File) => void;
}

export function BasicDetailsStep({
  values,
  errors,
  patch,
  setValues,
  setErrors,
  classOptions,
  subjectOptions,
  gradeOptions,
  previewStudent,
  fileInputRef,
  handlePhotoChange,
}: BasicDetailsStepProps) {
  return (
    <>
      <div className={styles.editPhotoRow}>
        <StudentAvatar student={previewStudent} size="edit" />
        <div className={styles.editPhotoCopy}>
          <p className={styles.editPhotoTitle}>Profile photo</p>
          <p className={styles.editPhotoHint}>
            JPG, PNG, WEBP, or GIF · up to 2 MB
          </p>
          <div className={styles.editPhotoActions}>
            <button
              type="button"
              className={listStyles.secondaryBtn}
              onClick={() => fileInputRef.current?.click()}
            >
              {values.photoUrl ? 'Change photo' : 'Upload photo'}
            </button>
            {values.photoUrl ? (
              <button
                type="button"
                className={listStyles.secondaryBtn}
                onClick={() => patch('photoUrl', null)}
              >
                Remove
              </button>
            ) : null}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            className={styles.fileInput}
            accept={STUDENT_PHOTO_ACCEPT}
            onChange={(e) => {
              void handlePhotoChange(e.target.files?.[0]);
              e.target.value = '';
            }}
          />
        </div>
      </div>

      <div className={styles.formGrid}>
        <label className={modalStyles.modalField}>
          <span className={modalStyles.modalLabel}>
            Full name<span className={modalStyles.requiredMark}>*</span>
          </span>
          <input
            className={`${modalStyles.modalInput} ${errors.fullName ? modalStyles.fieldError : ''}`}
            type="text"
            value={values.fullName}
            onChange={(e) => patch('fullName', e.target.value)}
            placeholder="Student full name"
            maxLength={80}
            autoComplete="off"
          />
          {errors.fullName ? <span className={modalStyles.inlineError}>{errors.fullName}</span> : null}
        </label>

        <label className={modalStyles.modalField}>
          <span className={modalStyles.modalLabel}>Status</span>
          <CustomSelect
            className={modalStyles.modalInput}
            value={values.status}
            onChange={(value) => patch('status', value as StudentStatus)}
            options={STATUSES}
          />
        </label>
      </div>

      <div className={styles.editGuardianBlock}>
        <p className={styles.editGuardianLabel}>Class Enrollments</p>
        {(values.enrolledClasses || []).map((cls, index) => (
          <div key={index} style={{ marginBottom: '1rem' }}>
            <div className={styles.formGrid}>
              <label className={modalStyles.modalField}>
                <span className={modalStyles.modalLabel}>
                  Class<span className={modalStyles.requiredMark}>*</span>
                </span>
                <CustomSelect
                  className={`${modalStyles.modalInput} ${errors[`classLabel_${index}`] ? modalStyles.fieldError : ''}`}
                  value={cls.classLabel}
                  onChange={(nextClass) => {
                    setValues((prev) => {
                      const next = [...(prev.enrolledClasses || [])];
                      next[index] = {
                        ...next[index],
                        classLabel: nextClass,
                        gradeLevel: gradeLevelFromClassLabel(nextClass),
                      };
                      return { ...prev, enrolledClasses: next };
                    });
                  }}
                  options={classOptions}
                />
                {errors[`classLabel_${index}`] ? <span className={modalStyles.inlineError}>{errors[`classLabel_${index}`]}</span> : null}
              </label>

              <label className={modalStyles.modalField}>
                <span className={modalStyles.modalLabel}>
                  Subject<span className={modalStyles.requiredMark}>*</span>
                </span>
                <CustomSelect
                  className={`${modalStyles.modalInput} ${errors[`subject_${index}`] ? modalStyles.fieldError : ''}`}
                  value={cls.subject}
                  onChange={(value) => {
                    setValues((prev) => {
                      const next = [...(prev.enrolledClasses || [])];
                      next[index] = { ...next[index], subject: value };
                      return { ...prev, enrolledClasses: next };
                    });
                  }}
                  options={subjectOptions}
                />
                {errors[`subject_${index}`] ? <span className={modalStyles.inlineError}>{errors[`subject_${index}`]}</span> : null}
              </label>
            </div>

            <label className={modalStyles.modalField}>
              <span className={modalStyles.modalLabel}>
                Grade level<span className={modalStyles.requiredMark}>*</span>
              </span>
              <CustomSelect
                className={`${modalStyles.modalInput} ${errors[`gradeLevel_${index}`] ? modalStyles.fieldError : ''}`}
                value={cls.gradeLevel}
                onChange={(value) => {
                  setValues((prev) => {
                    const next = [...(prev.enrolledClasses || [])];
                    next[index] = { ...next[index], gradeLevel: value };
                    return { ...prev, enrolledClasses: next };
                  });
                }}
                options={gradeOptions}
              />
              {errors[`gradeLevel_${index}`] ? <span className={modalStyles.inlineError}>{errors[`gradeLevel_${index}`]}</span> : null}
            </label>
            
            {index > 0 && (
              <button
                type="button"
                className={styles.editAddGuardian}
                style={{ marginTop: '0.5rem', color: '#ff8a8a', borderColor: '#ff8a8a' }}
                onClick={() => {
                  setValues((prev) => {
                    const next = [...(prev.enrolledClasses || [])];
                    next.splice(index, 1);
                    return { ...prev, enrolledClasses: next };
                  });
                }}
              >
                - Remove class
              </button>
            )}
          </div>
        ))}
        
        <button
          type="button"
          className={styles.editAddGuardian}
          onClick={() =>
            setValues((prev) => ({
              ...prev,
              enrolledClasses: [...(prev.enrolledClasses || []), { classLabel: '', subject: '', gradeLevel: '' }],
            }))
          }
        >
          + Add another class
        </button>
      </div>


      <div className={styles.formGrid}>
        <label className={modalStyles.modalField}>
          <span className={modalStyles.modalLabel}>
            Student phone<span className={modalStyles.requiredMark}>*</span>
          </span>
          <input
            className={`${modalStyles.modalInput} ${errors.phone ? modalStyles.fieldError : ''}`}
            type="tel"
            value={values.phone}
            onChange={(e) => patch('phone', e.target.value.replace(/\D/g, ''))}
            placeholder="09XX XXX XXXX"
            maxLength={11}
          />
          {errors.phone ? <span className={modalStyles.inlineError}>{errors.phone}</span> : null}
        </label>

        <label className={modalStyles.modalField}>
          <span className={modalStyles.modalLabel}>Student email</span>
          <input
            className={`${modalStyles.modalInput} ${errors.email ? modalStyles.fieldError : ''}`}
            type="email"
            value={values.email}
            onChange={(e) => patch('email', e.target.value)}
            onBlur={() => {
              if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
                setErrors((prev) => ({ ...prev, email: 'Enter a valid student email address.' }));
              } else {
                setErrors((prev) => {
                  const next = { ...prev };
                  delete next.email;
                  return next;
                });
              }
            }}
            placeholder="student@email.com"
            maxLength={80}
          />
          {errors.email ? <span className={modalStyles.inlineError}>{errors.email}</span> : null}
        </label>
      </div>

      <label className={modalStyles.modalField}>
        <span className={modalStyles.modalLabel}>Home address</span>
        <input
          className={modalStyles.modalInput}
          type="text"
          value={values.address}
          onChange={(e) => patch('address', e.target.value)}
          placeholder="Street, barangay, city"
          maxLength={160}
        />
      </label>
    </>
  );
}
