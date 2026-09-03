'use client';

import { useState, type FormEvent } from 'react';
import type { ClassFormInput } from '@/types/myClasses';
import { listStyles, modalStyles, TeacherModal } from '../../shared';
import {
  CLASS_WEEKDAYS,
  type ClassFormValues,
  getClassFormErrors,
  TIME_OPTIONS,
  formatTimeLabel,
} from '../utils';
import styles from '../myClasses.module.css';

interface ClassFormModalProps {
  mode: 'create' | 'edit';
  subjects: string[];
  gradeLevels: string[];
  academicYears: string[];
  initialValues?: Partial<ClassFormValues>;
  onCancel: () => void;
  onSubmit: (input: ClassFormInput) => void;
}

import { CustomSelect } from '@/components/ui/CustomSelect';
import { TimePicker } from '@/components/ui/TimePicker';

export function ClassFormModal({
  mode,
  subjects,
  gradeLevels,
  academicYears,
  initialValues,
  onCancel,
  onSubmit,
}: ClassFormModalProps) {
  const subjectSuggestions = subjects.filter((item) => item !== 'All Subjects');
  const gradeOptions = gradeLevels.filter((item) => item !== 'All Grades');
  const yearOptions = academicYears.filter((item) => item !== 'All Years');

  const [subject, setSubject] = useState(initialValues?.subject ?? '');
  const [gradeLevel, setGradeLevel] = useState(
    initialValues?.gradeLevel ?? gradeOptions[0] ?? 'Grade 7',
  );
  const [section, setSection] = useState(initialValues?.section ?? '');
  const [academicYear, setAcademicYear] = useState(
    initialValues?.academicYear ?? yearOptions[0] ?? '2026 - 2027',
  );
  const [room, setRoom] = useState(initialValues?.room ?? '');
  const [days, setDays] = useState<string[]>(
    initialValues?.days ?? ['Mon', 'Wed', 'Fri'],
  );
  const [startTime, setStartTime] = useState(initialValues?.startTime ?? '08:00');
  const [endTime, setEndTime] = useState(initialValues?.endTime ?? '09:00');
  const [coverImage, setCoverImage] = useState<string | undefined>(initialValues?.coverImage);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isEdit = mode === 'edit';
  const listId = isEdit ? 'edit-class' : 'create-class';

  const toggleDay = (day: string) => {
    setDays((prev) =>
      prev.includes(day) ? prev.filter((item) => item !== day) : [...prev, day],
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCoverImage(url);
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const orderedDays = CLASS_WEEKDAYS.filter((day) => days.includes(day));
    const validationErrors = getClassFormErrors({
      subject,
      gradeLevel,
      section,
      academicYear,
      room,
      days: orderedDays,
      startTime,
      endTime,
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    onSubmit({
      subject,
      gradeLevel,
      section,
      academicYear,
      room,
      days: [...orderedDays],
      startTime,
      endTime,
      coverImage,
    });
  };

  return (
    <TeacherModal
      titleId={`${listId}-title`}
      eyebrow="My Classes"
      title={isEdit ? 'Edit classroom' : 'Create classroom'}
      copy={
        isEdit
          ? 'Update this class schedule, room, or section. Student progress stays the same.'
          : 'Set up a new class with schedule, room, and section. You can add students later.'
      }
      onClose={onCancel}
      as="form"
      onSubmit={handleSubmit}
      cardClassName={modalStyles.modalCardWide}
      footer={
        <>
          <button type="button" className={listStyles.secondaryBtn} onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className={listStyles.primaryBtn}>
            {isEdit ? 'Save changes' : 'Create class'}
          </button>
        </>
      }
    >
      <div className={styles.imageUploadBox}>
        {coverImage ? (
          <img src={coverImage} alt="Cover" className={styles.imageUploadPreview} />
        ) : (
          <div className={styles.imageUploadPreview}>
            <span role="img" aria-label="placeholder">
              🎨
            </span>
          </div>
        )}
        <div>
          <label className={styles.imageUploadBtn}>
            Upload class cover
            <input 
              type="file" 
              accept="image/*" 
              style={{ display: 'none' }} 
              onChange={handleImageUpload} 
            />
          </label>
          <p className={styles.imageUploadText}>We'll generate a beautiful icon if you don't upload an image.</p>
        </div>
      </div>
      <div className={styles.createClassGrid}>
        <label className={modalStyles.modalField}>
          <span className={modalStyles.modalLabel}>Subject<span className={modalStyles.requiredMark}>*</span></span>
          <input
            className={modalStyles.modalInput}
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g. Mathematics or Filipino"
            maxLength={60}
            autoComplete="off"
          />
          {errors.subject && <span className={modalStyles.fieldError}>{errors.subject}</span>}
        </label>

        <label className={modalStyles.modalField}>
          <span className={modalStyles.modalLabel}>Section<span className={modalStyles.requiredMark}>*</span></span>
          <input
            className={modalStyles.modalInput}
            type="text"
            value={section}
            onChange={(e) => setSection(e.target.value)}
            placeholder="e.g. A, Love, or ICT"
            maxLength={40}
            autoComplete="off"
          />
          {errors.section && <span className={modalStyles.fieldError}>{errors.section}</span>}
        </label>
      </div>

      <div className={styles.createClassGrid}>
        <label className={modalStyles.modalField}>
          <span className={modalStyles.modalLabel}>Grade level<span className={modalStyles.requiredMark}>*</span></span>
          <CustomSelect
            value={gradeLevel}
            onChange={setGradeLevel}
            options={gradeOptions}
          />
          {errors.gradeLevel && <span className={modalStyles.fieldError}>{errors.gradeLevel}</span>}
        </label>

        <label className={modalStyles.modalField}>
          <span className={modalStyles.modalLabel}>Academic year<span className={modalStyles.requiredMark}>*</span></span>
          <CustomSelect
            value={academicYear}
            onChange={setAcademicYear}
            options={yearOptions}
          />
          {errors.academicYear && <span className={modalStyles.fieldError}>{errors.academicYear}</span>}
        </label>
      </div>

      <label className={modalStyles.modalField}>
        <span className={modalStyles.modalLabel}>Room<span className={modalStyles.requiredMark}>*</span></span>
        <input
          className={modalStyles.modalInput}
          type="text"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          placeholder="e.g. Room 201"
          maxLength={40}
        />
        {errors.room && <span className={modalStyles.fieldError}>{errors.room}</span>}
      </label>

      <div className={modalStyles.modalField}>
        <span className={modalStyles.modalLabel}>Class days<span className={modalStyles.requiredMark}>*</span></span>
        <div className={modalStyles.chipRow}>
          {CLASS_WEEKDAYS.map((day) => (
            <button
              key={day}
              type="button"
              className={`${modalStyles.choiceChip} ${
                days.includes(day) ? modalStyles.choiceChipActive : ''
              }`}
              onClick={() => toggleDay(day)}
            >
              {day}
            </button>
          ))}
        </div>
        {errors.days && <span className={modalStyles.fieldError}>{errors.days}</span>}
      </div>

      <div className={styles.createClassGrid}>
        <label className={modalStyles.modalField}>
          <span className={modalStyles.modalLabel}>Start time<span className={modalStyles.requiredMark}>*</span></span>
          <TimePicker
            value={startTime}
            onChange={setStartTime}
          />
          {errors.startTime && <span className={modalStyles.fieldError}>{errors.startTime}</span>}
        </label>

        <label className={modalStyles.modalField}>
          <span className={modalStyles.modalLabel}>End time<span className={modalStyles.requiredMark}>*</span></span>
          <TimePicker
            value={endTime}
            onChange={setEndTime}
          />
          {errors.endTime && <span className={modalStyles.fieldError}>{errors.endTime}</span>}
        </label>
      </div>
    </TeacherModal>
  );
}
