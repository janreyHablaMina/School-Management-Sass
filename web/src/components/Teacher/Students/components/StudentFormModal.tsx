'use client';

import { useRef, useState, type FormEvent } from 'react';
import type {
  StudentGuardianFormInput,
  StudentProfileFormInput,
  StudentStatus,
  TeacherStudentRow,
} from '@/types/teacherStudents';
import { listStyles, modalStyles, TeacherModal } from '../../shared';
import {
  emptyGuardianInput,
  emptyStudentFormValues,
  getStudentFormStepError,
  gradeLevelFromClassLabel,
  initialsFromName,
  readStudentPhotoFile,
  STUDENT_EDIT_STEPS,
  STUDENT_PHOTO_ACCEPT,
  studentToFormValues,
  type StudentEditStep,
} from '../studentForm';
import styles from '../students.module.css';
import { StudentAvatar } from './StudentAvatar';

const STATUSES: StudentStatus[] = ['Active', 'At Risk', 'Inactive'];
const LAST_STEP = STUDENT_EDIT_STEPS.length - 1;

interface StudentFormModalProps {
  mode: 'create' | 'edit';
  student?: TeacherStudentRow | null;
  classes: string[];
  subjects: string[];
  gradeLevels: string[];
  onCancel: () => void;
  onSubmit: (input: StudentProfileFormInput) => void;
}

export function StudentFormModal({
  mode,
  student = null,
  classes,
  subjects,
  gradeLevels,
  onCancel,
  onSubmit,
}: StudentFormModalProps) {
  const isCreate = mode === 'create';
  const classOptions = classes.filter((item) => item !== 'All Classes');
  const gradeOptions = gradeLevels.filter((item) => item !== 'All Grades');
  const subjectOptions =
    subjects.length > 0
      ? subjects
      : ['Mathematics', 'English', 'Science', 'Filipino', 'Araling Panlipunan'];

  const [step, setStep] = useState<StudentEditStep>(0);
  const [values, setValues] = useState<StudentProfileFormInput>(() =>
    student
      ? studentToFormValues(student)
      : emptyStudentFormValues({
          classLabel: classOptions[0] ?? '',
          subject: subjectOptions[0] ?? 'Mathematics',
          gradeLevel:
            gradeOptions[0] ??
            gradeLevelFromClassLabel(classOptions[0] ?? 'Grade 7 - Section A'),
        }),
  );
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const patch = <K extends keyof StudentProfileFormInput>(
    key: K,
    value: StudentProfileFormInput[K],
  ) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const previewStudent = {
    fullName: values.fullName || 'New student',
    initials: initialsFromName(values.fullName) || (student?.initials ?? 'ST'),
    avatarAccent: student?.avatarAccent ?? '#f5c842',
    photoUrl: values.photoUrl,
  };

  const updateGuardian = (
    index: number,
    key: keyof StudentGuardianFormInput,
    value: string,
  ) => {
    setValues((prev) => ({
      ...prev,
      guardians: prev.guardians.map((item, i) =>
        i === index ? { ...item, [key]: value } : item,
      ),
    }));
  };

  const handlePhotoChange = async (file: File | undefined) => {
    if (!file) return;
    try {
      const next = await readStudentPhotoFile(file);
      patch('photoUrl', next);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not use that photo.');
    }
  };

  const validateStep = (nextStep: StudentEditStep) =>
    getStudentFormStepError(nextStep, values, {
      requireClassPlacement: isCreate,
    });

  const goNext = () => {
    const validationError = validateStep(step);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    setStep((prev) => Math.min(prev + 1, LAST_STEP) as StudentEditStep);
  };

  const goBack = () => {
    setError(null);
    setStep((prev) => Math.max(prev - 1, 0) as StudentEditStep);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (step < LAST_STEP) {
      goNext();
      return;
    }

    const validationError = validateStep(2);
    if (validationError) {
      setError(validationError);
      return;
    }

    onSubmit(values);
  };

  const stepCopy =
    step === 0
      ? isCreate
        ? 'Photo, class placement, and basic details.'
        : 'Photo and basic student details.'
      : step === 1
        ? 'Parent contacts and emergency reach-out.'
        : 'Allergies, medical info, and classroom notes.';

  const titlePrefix = isCreate ? 'Add student' : student?.fullName ?? 'Student';

  return (
    <TeacherModal
      titleId={isCreate ? 'create-student-title' : 'edit-student-title'}
      eyebrow="Students"
      title={isCreate ? 'Add student' : 'Edit student profile'}
      copy={`${titlePrefix} · Step ${step + 1} of ${STUDENT_EDIT_STEPS.length} · ${stepCopy}`}
      onClose={onCancel}
      as="form"
      onSubmit={handleSubmit}
      cardClassName={modalStyles.modalCardWide}
      showClose
      footer={
        <>
          {step === 0 ? (
            <button type="button" className={listStyles.secondaryBtn} onClick={onCancel}>
              Cancel
            </button>
          ) : (
            <button type="button" className={listStyles.secondaryBtn} onClick={goBack}>
              Back
            </button>
          )}
          {step < LAST_STEP ? (
            <button type="submit" className={listStyles.primaryBtn}>
              Next
            </button>
          ) : (
            <button type="submit" className={listStyles.primaryBtn}>
              {isCreate ? 'Add student' : 'Save changes'}
            </button>
          )}
        </>
      }
    >
      <ol className={styles.editSteps} aria-label="Student form steps">
        {STUDENT_EDIT_STEPS.map((item) => {
          const isActive = item.id === step;
          const isDone = item.id < step;
          return (
            <li
              key={item.id}
              className={
                isActive
                  ? `${styles.editStep} ${styles.editStepActive}`
                  : isDone
                    ? `${styles.editStep} ${styles.editStepDone}`
                    : styles.editStep
              }
              aria-current={isActive ? 'step' : undefined}
            >
              <span className={styles.editStepIndex}>{item.id + 1}</span>
              <span className={styles.editStepLabel}>{item.label}</span>
            </li>
          );
        })}
      </ol>

      {step === 0 ? (
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
              <span className={modalStyles.modalLabel}>Full name</span>
              <input
                className={modalStyles.modalInput}
                type="text"
                value={values.fullName}
                onChange={(e) => patch('fullName', e.target.value)}
                placeholder="Student full name"
                maxLength={80}
                autoComplete="off"
              />
            </label>

            <label className={modalStyles.modalField}>
              <span className={modalStyles.modalLabel}>Status</span>
              <select
                className={modalStyles.modalInput}
                value={values.status}
                onChange={(e) => patch('status', e.target.value as StudentStatus)}
              >
                {STATUSES.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {isCreate ? (
            <>
              <div className={styles.formGrid}>
                <label className={modalStyles.modalField}>
                  <span className={modalStyles.modalLabel}>Class</span>
                  <select
                    className={modalStyles.modalInput}
                    value={values.classLabel ?? ''}
                    onChange={(e) => {
                      const nextClass = e.target.value;
                      setValues((prev) => ({
                        ...prev,
                        classLabel: nextClass,
                        gradeLevel: gradeLevelFromClassLabel(nextClass),
                      }));
                    }}
                  >
                    {classOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>

                <label className={modalStyles.modalField}>
                  <span className={modalStyles.modalLabel}>Subject</span>
                  <select
                    className={modalStyles.modalInput}
                    value={values.subject ?? ''}
                    onChange={(e) => patch('subject', e.target.value)}
                  >
                    {subjectOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className={modalStyles.modalField}>
                <span className={modalStyles.modalLabel}>Grade level</span>
                <select
                  className={modalStyles.modalInput}
                  value={values.gradeLevel ?? ''}
                  onChange={(e) => patch('gradeLevel', e.target.value)}
                >
                  {gradeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            </>
          ) : null}

          <div className={styles.formGrid}>
            <label className={modalStyles.modalField}>
              <span className={modalStyles.modalLabel}>Student phone</span>
              <input
                className={modalStyles.modalInput}
                type="tel"
                value={values.phone}
                onChange={(e) => patch('phone', e.target.value)}
                placeholder="09XX XXX XXXX"
                maxLength={40}
              />
            </label>

            <label className={modalStyles.modalField}>
              <span className={modalStyles.modalLabel}>Student email</span>
              <input
                className={modalStyles.modalInput}
                type="email"
                value={values.email}
                onChange={(e) => patch('email', e.target.value)}
                placeholder="student@email.com"
                maxLength={80}
              />
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
      ) : null}

      {step === 1 ? (
        <>
          {values.guardians.map((guardian, index) => (
            <div key={`guardian-${index}`} className={styles.editGuardianBlock}>
              <p className={styles.editGuardianLabel}>
                {index === 0 ? 'Primary guardian' : `Guardian ${index + 1}`}
              </p>
              <div className={styles.formGrid}>
                <label className={modalStyles.modalField}>
                  <span className={modalStyles.modalLabel}>Name</span>
                  <input
                    className={modalStyles.modalInput}
                    type="text"
                    value={guardian.name}
                    onChange={(e) => updateGuardian(index, 'name', e.target.value)}
                    placeholder="Guardian full name"
                    maxLength={80}
                  />
                </label>
                <label className={modalStyles.modalField}>
                  <span className={modalStyles.modalLabel}>Relationship</span>
                  <input
                    className={modalStyles.modalInput}
                    type="text"
                    value={guardian.relationship}
                    onChange={(e) =>
                      updateGuardian(index, 'relationship', e.target.value)
                    }
                    placeholder="Father, Mother, Guardian…"
                    maxLength={40}
                  />
                </label>
              </div>
              <div className={styles.formGrid}>
                <label className={modalStyles.modalField}>
                  <span className={modalStyles.modalLabel}>Contact number</span>
                  <input
                    className={modalStyles.modalInput}
                    type="tel"
                    value={guardian.phone}
                    onChange={(e) => updateGuardian(index, 'phone', e.target.value)}
                    placeholder="09XX XXX XXXX"
                    maxLength={40}
                  />
                </label>
                <label className={modalStyles.modalField}>
                  <span className={modalStyles.modalLabel}>Email</span>
                  <input
                    className={modalStyles.modalInput}
                    type="email"
                    value={guardian.email}
                    onChange={(e) => updateGuardian(index, 'email', e.target.value)}
                    placeholder="parent@email.com"
                    maxLength={80}
                  />
                </label>
              </div>
              <label className={modalStyles.modalField}>
                <span className={modalStyles.modalLabel}>Occupation</span>
                <input
                  className={modalStyles.modalInput}
                  type="text"
                  value={guardian.occupation}
                  onChange={(e) => updateGuardian(index, 'occupation', e.target.value)}
                  placeholder="Optional"
                  maxLength={60}
                />
              </label>
            </div>
          ))}

          {values.guardians.length < 3 ? (
            <button
              type="button"
              className={styles.editAddGuardian}
              onClick={() =>
                setValues((prev) => ({
                  ...prev,
                  guardians: [...prev.guardians, emptyGuardianInput()],
                }))
              }
            >
              + Add another guardian
            </button>
          ) : null}

          <p className={styles.editSectionTitle}>Emergency contact</p>

          <div className={styles.formGrid}>
            <label className={modalStyles.modalField}>
              <span className={modalStyles.modalLabel}>Name</span>
              <input
                className={modalStyles.modalInput}
                type="text"
                value={values.emergencyContact.name}
                onChange={(e) =>
                  patch('emergencyContact', {
                    ...values.emergencyContact,
                    name: e.target.value,
                  })
                }
                placeholder="Emergency contact name"
                maxLength={80}
              />
            </label>
            <label className={modalStyles.modalField}>
              <span className={modalStyles.modalLabel}>Relationship</span>
              <input
                className={modalStyles.modalInput}
                type="text"
                value={values.emergencyContact.relationship}
                onChange={(e) =>
                  patch('emergencyContact', {
                    ...values.emergencyContact,
                    relationship: e.target.value,
                  })
                }
                placeholder="Father, Aunt…"
                maxLength={40}
              />
            </label>
          </div>

          <label className={modalStyles.modalField}>
            <span className={modalStyles.modalLabel}>Contact number</span>
            <input
              className={modalStyles.modalInput}
              type="tel"
              value={values.emergencyContact.phone}
              onChange={(e) =>
                patch('emergencyContact', {
                  ...values.emergencyContact,
                  phone: e.target.value,
                })
              }
              placeholder="09XX XXX XXXX"
              maxLength={40}
            />
          </label>
        </>
      ) : null}

      {step === 2 ? (
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
        </>
      ) : null}

      {error ? <p className={modalStyles.modalError}>{error}</p> : null}
    </TeacherModal>
  );
}
