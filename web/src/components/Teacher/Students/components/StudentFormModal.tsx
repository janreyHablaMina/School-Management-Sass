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
import { CustomSelect } from '@/components/ui/CustomSelect';
import { BasicDetailsStep } from './student-form/BasicDetailsStep';
import { FamilyContactsStep } from './student-form/FamilyContactsStep';
import { MedicalNotesStep } from './student-form/MedicalNotesStep';

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
  const [errors, setErrors] = useState<Record<string, string>>({});
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
      setErrors((prev) => ({ ...prev, photo: '' }));
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        photo: err instanceof Error ? err.message : 'Could not use that photo.',
      }));
    }
  };

  const validateStep = (nextStep: StudentEditStep) =>
    getStudentFormStepError(nextStep, values, {
      requireClassPlacement: isCreate,
    });

  const goNext = () => {
    const stepErrors = validateStep(step);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    setStep((prev) => Math.min(prev + 1, LAST_STEP) as StudentEditStep);
  };

  const goBack = () => {
    setErrors({});
    setStep((prev) => Math.max(prev - 1, 0) as StudentEditStep);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (step < LAST_STEP) {
      goNext();
      return;
    }

    const stepErrors = validateStep(2);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
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
        <BasicDetailsStep
          values={values}
          errors={errors}
          patch={patch}
          setValues={setValues}
          setErrors={setErrors}
          classOptions={classOptions}
          subjectOptions={subjectOptions}
          gradeOptions={gradeOptions}
          previewStudent={previewStudent}
          fileInputRef={fileInputRef}
          handlePhotoChange={handlePhotoChange}
        />
      ) : null}

      {step === 1 ? (
        <FamilyContactsStep
          values={values}
          errors={errors}
          patch={patch}
          setValues={setValues}
          setErrors={setErrors}
          updateGuardian={updateGuardian}
        />
      ) : null}

      {step === 2 ? (
        <MedicalNotesStep values={values} patch={patch} />
      ) : null}

      {/* Global errors are removed; using inline errors on individual fields */}
    </TeacherModal>
  );
}
