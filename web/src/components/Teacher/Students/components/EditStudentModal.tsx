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
  getStudentFormStepError,
  initialsFromName,
  readStudentPhotoFile,
  STUDENT_EDIT_STEPS,
  STUDENT_PHOTO_ACCEPT,
  studentToFormValues,
  type StudentEditStep,
  type StudentProfileFormValues,
} from '../utils';
import styles from '../students.module.css';
import { StudentAvatar } from './StudentAvatar';

const STATUSES: StudentStatus[] = ['Active', 'At Risk', 'Inactive'];
const LAST_STEP = STUDENT_EDIT_STEPS.length - 1;

const EMPTY_GUARDIAN: StudentGuardianFormInput = {
  name: '',
  relationship: 'Parent',
  phone: '',
  email: '',
  occupation: '',
};

interface EditStudentModalProps {
  student: TeacherStudentRow;
  onCancel: () => void;
  onSubmit: (input: StudentProfileFormInput) => void;
}

export function EditStudentModal({
  student,
  onCancel,
  onSubmit,
}: EditStudentModalProps) {
  const initial = studentToFormValues(student);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState<StudentEditStep>(0);
  const [fullName, setFullName] = useState(initial.fullName);
  const [phone, setPhone] = useState(initial.phone);
  const [email, setEmail] = useState(initial.email);
  const [status, setStatus] = useState<StudentStatus>(initial.status);
  const [address, setAddress] = useState(initial.address);
  const [allergies, setAllergies] = useState(initial.allergies);
  const [medicalNotes, setMedicalNotes] = useState(initial.medicalNotes);
  const [teacherNotes, setTeacherNotes] = useState(initial.teacherNotes);
  const [photoUrl, setPhotoUrl] = useState<string | null>(initial.photoUrl);
  const [guardians, setGuardians] = useState(initial.guardians);
  const [emergencyContact, setEmergencyContact] = useState(initial.emergencyContact);
  const [error, setError] = useState<string | null>(null);

  const formValues = (): StudentProfileFormValues => ({
    fullName,
    phone,
    email,
    status,
    address,
    allergies,
    medicalNotes,
    teacherNotes,
    photoUrl,
    guardians,
    emergencyContact,
  });

  const previewStudent = {
    fullName,
    initials: initialsFromName(fullName) || student.initials,
    avatarAccent: student.avatarAccent,
    photoUrl,
  };

  const updateGuardian = (
    index: number,
    key: keyof StudentGuardianFormInput,
    value: string,
  ) => {
    setGuardians((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [key]: value } : item)),
    );
  };

  const handlePhotoChange = async (file: File | undefined) => {
    if (!file) return;
    try {
      const next = await readStudentPhotoFile(file);
      setPhotoUrl(next);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not use that photo.');
    }
  };

  const goNext = () => {
    const validationError = getStudentFormStepError(step, formValues());
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

    const values = formValues();
    const validationError = getStudentFormStepError(2, values);
    if (validationError) {
      setError(validationError);
      return;
    }

    onSubmit(values);
  };

  const stepCopy =
    step === 0
      ? 'Photo and basic student details.'
      : step === 1
        ? 'Parent contacts and emergency reach-out.'
        : 'Allergies, medical info, and classroom notes.';

  return (
    <TeacherModal
      titleId="edit-student-title"
      eyebrow="Students"
      title="Edit student profile"
      copy={`${student.fullName} · Step ${step + 1} of ${STUDENT_EDIT_STEPS.length} · ${stepCopy}`}
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
              Save changes
            </button>
          )}
        </>
      }
    >
      <ol className={styles.editSteps} aria-label="Edit profile steps">
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
                  {photoUrl ? 'Change photo' : 'Upload photo'}
                </button>
                {photoUrl ? (
                  <button
                    type="button"
                    className={listStyles.secondaryBtn}
                    onClick={() => setPhotoUrl(null)}
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
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Student full name"
                maxLength={80}
                autoComplete="off"
              />
            </label>

            <label className={modalStyles.modalField}>
              <span className={modalStyles.modalLabel}>Status</span>
              <select
                className={modalStyles.modalInput}
                value={status}
                onChange={(e) => setStatus(e.target.value as StudentStatus)}
              >
                {STATUSES.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className={styles.formGrid}>
            <label className={modalStyles.modalField}>
              <span className={modalStyles.modalLabel}>Student phone</span>
              <input
                className={modalStyles.modalInput}
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="09XX XXX XXXX"
                maxLength={40}
              />
            </label>

            <label className={modalStyles.modalField}>
              <span className={modalStyles.modalLabel}>Student email</span>
              <input
                className={modalStyles.modalInput}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Street, barangay, city"
              maxLength={160}
            />
          </label>
        </>
      ) : null}

      {step === 1 ? (
        <>
          {guardians.map((guardian, index) => (
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

          {guardians.length < 3 ? (
            <button
              type="button"
              className={styles.editAddGuardian}
              onClick={() => setGuardians((prev) => [...prev, { ...EMPTY_GUARDIAN }])}
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
                value={emergencyContact.name}
                onChange={(e) =>
                  setEmergencyContact((prev) => ({ ...prev, name: e.target.value }))
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
                value={emergencyContact.relationship}
                onChange={(e) =>
                  setEmergencyContact((prev) => ({
                    ...prev,
                    relationship: e.target.value,
                  }))
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
              value={emergencyContact.phone}
              onChange={(e) =>
                setEmergencyContact((prev) => ({ ...prev, phone: e.target.value }))
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
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
              placeholder="None on file"
              maxLength={120}
            />
          </label>

          <label className={modalStyles.modalField}>
            <span className={modalStyles.modalLabel}>Medical notes</span>
            <textarea
              className={modalStyles.modalTextarea}
              value={medicalNotes}
              onChange={(e) => setMedicalNotes(e.target.value)}
              placeholder="Health notes for classroom awareness"
              maxLength={400}
              rows={3}
            />
          </label>

          <label className={modalStyles.modalField}>
            <span className={modalStyles.modalLabel}>Teacher notes</span>
            <textarea
              className={modalStyles.modalTextarea}
              value={teacherNotes}
              onChange={(e) => setTeacherNotes(e.target.value)}
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
