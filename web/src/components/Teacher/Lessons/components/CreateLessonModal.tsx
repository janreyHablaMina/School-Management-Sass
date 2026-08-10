'use client';

import { useState, type FormEvent } from 'react';
import { listStyles, modalStyles, TeacherModal } from '../../shared';
import type { LessonGeneratorSession } from '../types';
import {
  getCreateLessonError,
  LESSON_CREATE_STATUSES,
  LESSON_TYPES,
  type CreateLessonInput,
} from '../utils';

type CreateLessonStep = 'choose' | 'manual';

interface CreateLessonModalProps {
  classes: string[];
  subjects: string[];
  initialClassLabel?: string;
  initialSubject?: string;
  onCancel: () => void;
  onCreate: (input: CreateLessonInput) => void;
  onStartGenerator?: (session: LessonGeneratorSession) => void;
}

export function CreateLessonModal({
  classes,
  subjects,
  initialClassLabel = '',
  initialSubject = '',
  onCancel,
  onCreate,
  onStartGenerator,
}: CreateLessonModalProps) {
  const classOptions = classes.filter((item) => item !== 'All Classes');
  const subjectOptions = subjects.filter((item) => item !== 'All Subjects');

  const [step, setStep] = useState<CreateLessonStep>('choose');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [classLabel, setClassLabel] = useState(
    initialClassLabel && initialClassLabel !== 'All Classes'
      ? initialClassLabel
      : classOptions[0] ?? '',
  );
  const [subject, setSubject] = useState(
    initialSubject && initialSubject !== 'All Subjects'
      ? initialSubject
      : subjectOptions[0] ?? '',
  );
  const [type, setType] = useState<CreateLessonInput['type']>('Text Lesson');
  const [status, setStatus] =
    useState<CreateLessonInput['status']>('Draft');
  const [durationMins, setDurationMins] = useState(45);
  const [error, setError] = useState<string | null>(null);

  const startGenerator = (mode: LessonGeneratorSession['mode']) => {
    if (!onStartGenerator) return;
    if (!classLabel.trim() || !subject.trim()) {
      setError('Choose a class and subject filter on Lessons, then try again.');
      return;
    }
    onStartGenerator({
      mode,
      classLabel,
      subject,
      durationMins,
      initialPrompt: '',
    });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (step !== 'manual') return;

    const input: CreateLessonInput = {
      title,
      description,
      classLabel,
      subject,
      type,
      status,
      durationMins,
    };
    const validationError = getCreateLessonError(input);
    if (validationError) {
      setError(validationError);
      return;
    }
    onCreate(input);
  };

  const goBack = () => {
    setError(null);
    setStep('choose');
  };

  if (step === 'choose') {
    return (
      <TeacherModal
        titleId="create-lesson-title"
        eyebrow="Lessons"
        title="Create lesson"
        copy="How do you want to start this lesson?"
        onClose={onCancel}
        cardClassName={modalStyles.modalCardWide}
        showClose
        footer={
          <button type="button" className={listStyles.secondaryBtn} onClick={onCancel}>
            Cancel
          </button>
        }
      >
        <div className={modalStyles.pathGrid}>
          <button
            type="button"
            className={modalStyles.pathCard}
            onClick={() => startGenerator('generate')}
            disabled={!onStartGenerator}
          >
            <span className={modalStyles.pathIcon} aria-hidden>
              ✨
            </span>
            <p className={modalStyles.pathTitle}>Generate with AI</p>
            <p className={modalStyles.pathCopy}>
              Open Lesson studio and chat to draft a lesson for your class.
            </p>
          </button>

          <button
            type="button"
            className={modalStyles.pathCard}
            onClick={() => startGenerator('upload')}
            disabled={!onStartGenerator}
          >
            <span className={modalStyles.pathIcon} aria-hidden>
              📎
            </span>
            <p className={modalStyles.pathTitle}>Upload files</p>
            <p className={modalStyles.pathCopy}>
              Open Lesson studio, attach a PDF/PPT/Word file, then generate.
            </p>
          </button>
        </div>

        {error ? <p className={modalStyles.modalError}>{error}</p> : null}

        <button
          type="button"
          className={modalStyles.pathLink}
          onClick={() => {
            setError(null);
            setStep('manual');
          }}
        >
          Or create manually
        </button>
      </TeacherModal>
    );
  }

  return (
    <TeacherModal
      titleId="create-lesson-manual-title"
      eyebrow="Create manually"
      title="Lesson details"
      copy="Fill in the lesson yourself and save it to your class."
      onClose={onCancel}
      as="form"
      onSubmit={handleSubmit}
      cardClassName={modalStyles.modalCardWide}
      showClose
      footer={
        <>
          <button type="button" className={listStyles.secondaryBtn} onClick={goBack}>
            Back
          </button>
          <button type="submit" className={listStyles.primaryBtn}>
            {status === 'Published' ? 'Publish lesson' : 'Save draft'}
          </button>
        </>
      }
    >
      <label className={modalStyles.modalField}>
        <span className={modalStyles.modalLabel}>Class</span>
        <select
          className={modalStyles.modalInput}
          value={classLabel}
          onChange={(e) => setClassLabel(e.target.value)}
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
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        >
          {subjectOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label className={modalStyles.modalField}>
        <span className={modalStyles.modalLabel}>Title</span>
        <input
          className={modalStyles.modalInput}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Linear Equations"
          maxLength={100}
        />
      </label>

      <label className={modalStyles.modalField}>
        <span className={modalStyles.modalLabel}>Description</span>
        <textarea
          className={modalStyles.modalTextarea}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What will students learn?"
          rows={3}
          maxLength={280}
        />
      </label>

      <label className={modalStyles.modalField}>
        <span className={modalStyles.modalLabel}>Duration (minutes)</span>
        <input
          className={modalStyles.modalInput}
          type="number"
          min={5}
          max={240}
          step={5}
          value={durationMins}
          onChange={(e) => setDurationMins(Number(e.target.value))}
        />
      </label>

      <div className={modalStyles.modalField}>
        <span className={modalStyles.modalLabel}>Lesson type</span>
        <div className={modalStyles.chipRow}>
          {LESSON_TYPES.map((option) => (
            <button
              key={option}
              type="button"
              className={`${modalStyles.choiceChip} ${
                type === option ? modalStyles.choiceChipActive : ''
              }`}
              onClick={() => setType(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className={modalStyles.modalField}>
        <span className={modalStyles.modalLabel}>Status</span>
        <div className={modalStyles.chipRow}>
          {LESSON_CREATE_STATUSES.map((option) => (
            <button
              key={option}
              type="button"
              className={`${modalStyles.choiceChip} ${
                status === option ? modalStyles.choiceChipActive : ''
              }`}
              onClick={() => setStatus(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {error ? <p className={modalStyles.modalError}>{error}</p> : null}
    </TeacherModal>
  );
}
