'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import type { TeacherLessonRow } from '@/types/teacherLessons';
import { listStyles, modalStyles, TeacherModal } from '../../shared';

export interface SaveLessonDetails {
  title: string;
  classLabel: string;
  subject: string;
}

interface SaveLessonTitleModalProps {
  suggestedTitle: string;
  classOptions: string[];
  /** Used quietly when saving — not shown in the modal. */
  defaultSubject?: string;
  initialClassLabel?: string;
  onCancel: () => void;
  onConfirm: (details: SaveLessonDetails) => TeacherLessonRow;
  onDone: (lesson: TeacherLessonRow) => void;
}

export function SaveLessonTitleModal({
  suggestedTitle,
  classOptions,
  defaultSubject = 'English',
  initialClassLabel = '',
  onCancel,
  onConfirm,
  onDone,
}: SaveLessonTitleModalProps) {
  const [title, setTitle] = useState(suggestedTitle);
  const [classLabel, setClassLabel] = useState(
    initialClassLabel && classOptions.includes(initialClassLabel)
      ? initialClassLabel
      : classOptions[0] ?? '',
  );
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const cleaned = title.trim();
    if (!cleaned) {
      setError('Add a title for this lesson.');
      return;
    }
    if (!classLabel.trim()) {
      setError('Choose a class to assign this lesson.');
      return;
    }
    onDone(
      onConfirm({
        title: cleaned,
        classLabel,
        subject: defaultSubject.trim() || 'English',
      }),
    );
  };

  return (
    <TeacherModal
      titleId="save-lesson-title"
      eyebrow="Save lesson"
      title="What is the title?"
      copy="Name this lesson and assign it to a class."
      onClose={onCancel}
      as="form"
      onSubmit={handleSubmit}
      cardClassName={modalStyles.modalCardNarrow}
      showClose
      footer={
        <>
          <button type="button" className={listStyles.secondaryBtn} onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className={listStyles.primaryBtn}>
            Save as Lesson
          </button>
        </>
      }
    >
      <label className={modalStyles.modalField}>
        <span className={modalStyles.modalLabel}>Lesson title</span>
        <input
          ref={inputRef}
          className={modalStyles.modalInput}
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError(null);
          }}
          placeholder="e.g. Life of Jose Rizal"
          maxLength={100}
        />
      </label>

      <label className={modalStyles.modalField}>
        <span className={modalStyles.modalLabel}>Assign to class</span>
        <select
          className={modalStyles.modalInput}
          value={classLabel}
          onChange={(e) => {
            setClassLabel(e.target.value);
            if (error) setError(null);
          }}
        >
          {classOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      {error ? <p className={modalStyles.modalError}>{error}</p> : null}
    </TeacherModal>
  );
}
