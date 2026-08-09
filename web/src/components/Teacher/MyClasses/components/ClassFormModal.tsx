'use client';

import { useState, type FormEvent } from 'react';
import type { ClassFormInput } from '@/types/myClasses';
import { listStyles, modalStyles, TeacherModal } from '../../shared';
import {
  CLASS_WEEKDAYS,
  type ClassFormValues,
  getClassFormError,
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
  const [error, setError] = useState<string | null>(null);

  const isEdit = mode === 'edit';
  const listId = isEdit ? 'edit-class' : 'create-class';

  const toggleDay = (day: string) => {
    setDays((prev) =>
      prev.includes(day) ? prev.filter((item) => item !== day) : [...prev, day],
    );
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const orderedDays = CLASS_WEEKDAYS.filter((day) => days.includes(day));
    const validationError = getClassFormError({
      subject,
      gradeLevel,
      section,
      academicYear,
      room,
      days: orderedDays,
      startTime,
      endTime,
    });

    if (validationError) {
      setError(validationError);
      return;
    }

    onSubmit({
      subject,
      gradeLevel,
      section,
      academicYear,
      room,
      days: [...orderedDays],
      startTime,
      endTime,
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
      <div className={styles.createClassGrid}>
        <label className={modalStyles.modalField}>
          <span className={modalStyles.modalLabel}>Subject</span>
          <input
            className={modalStyles.modalInput}
            type="text"
            list={`${listId}-subjects`}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g. Mathematics or Filipino"
            maxLength={60}
            autoComplete="off"
          />
          <datalist id={`${listId}-subjects`}>
            {subjectSuggestions.map((option) => (
              <option key={option} value={option} />
            ))}
          </datalist>
        </label>

        <label className={modalStyles.modalField}>
          <span className={modalStyles.modalLabel}>Section</span>
          <input
            className={modalStyles.modalInput}
            type="text"
            list={`${listId}-sections`}
            value={section}
            onChange={(e) => setSection(e.target.value)}
            placeholder="e.g. A, Love, or ICT"
            maxLength={40}
            autoComplete="off"
          />
          <datalist id={`${listId}-sections`}>
            <option value="A" />
            <option value="B" />
            <option value="C" />
            <option value="D" />
            <option value="ICT" />
          </datalist>
        </label>
      </div>

      <div className={styles.createClassGrid}>
        <label className={modalStyles.modalField}>
          <span className={modalStyles.modalLabel}>Grade level</span>
          <select
            className={modalStyles.modalInput}
            value={gradeLevel}
            onChange={(e) => setGradeLevel(e.target.value)}
          >
            {gradeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className={modalStyles.modalField}>
          <span className={modalStyles.modalLabel}>Academic year</span>
          <select
            className={modalStyles.modalInput}
            value={academicYear}
            onChange={(e) => setAcademicYear(e.target.value)}
          >
            {yearOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className={modalStyles.modalField}>
        <span className={modalStyles.modalLabel}>Room</span>
        <input
          className={modalStyles.modalInput}
          type="text"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          placeholder="e.g. Room 201"
          maxLength={40}
        />
      </label>

      <div className={modalStyles.modalField}>
        <span className={modalStyles.modalLabel}>Class days</span>
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
      </div>

      <div className={styles.createClassGrid}>
        <label className={modalStyles.modalField}>
          <span className={modalStyles.modalLabel}>Start time</span>
          <input
            className={modalStyles.modalInput}
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </label>

        <label className={modalStyles.modalField}>
          <span className={modalStyles.modalLabel}>End time</span>
          <input
            className={modalStyles.modalInput}
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </label>
      </div>

      {error ? <p className={modalStyles.modalError}>{error}</p> : null}
    </TeacherModal>
  );
}
