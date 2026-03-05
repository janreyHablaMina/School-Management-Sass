'use client';

import { useState, type FormEvent } from 'react';
import type { TeacherClassFocus, TeacherNavRequest } from '@/lib/teacher/classFocus';
import { listStyles, modalStyles, TeacherModal } from '../../shared';
import {
  buildGenerateLessonPrompt,
  GENERATE_LESSON_AI_TOOL_ID,
  getCreateLessonError,
  LESSON_CREATE_STATUSES,
  LESSON_TYPES,
  type CreateLessonInput,
} from '../utils';

interface CreateLessonModalProps {
  classes: string[];
  subjects: string[];
  initialClassLabel?: string;
  initialSubject?: string;
  onCancel: () => void;
  onCreate: (input: CreateLessonInput) => void;
  onGenerateWithAi?: (request: TeacherNavRequest) => void;
}

function classFocusFromSelection(
  classLabel: string,
  subject: string,
): TeacherClassFocus {
  const gradeMatch = classLabel.match(/Grade\s+\d+/i);
  return {
    gradeSection: classLabel,
    subject,
    gradeLevel: gradeMatch?.[0],
  };
}

export function CreateLessonModal({
  classes,
  subjects,
  initialClassLabel = '',
  initialSubject = '',
  onCancel,
  onCreate,
  onGenerateWithAi,
}: CreateLessonModalProps) {
  const classOptions = classes.filter((item) => item !== 'All Classes');
  const subjectOptions = subjects.filter((item) => item !== 'All Subjects');

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
  const [topic, setTopic] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
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

  const handleGenerateWithAi = () => {
    if (!onGenerateWithAi) return;
    if (!classLabel.trim() || !subject.trim()) {
      setError('Choose a class and subject before generating with AI.');
      return;
    }
    onGenerateWithAi({
      tab: 'AI Assistant',
      aiToolId: GENERATE_LESSON_AI_TOOL_ID,
      classFocus: classFocusFromSelection(classLabel, subject),
      aiPrompt: buildGenerateLessonPrompt({
        subject,
        classLabel,
        durationMins,
        topic,
      }),
    });
  };

  return (
    <TeacherModal
      titleId="create-lesson-title"
      eyebrow="Lessons"
      title="Create lesson"
      copy="Pick the class, then generate with AI or fill in the details yourself."
      onClose={onCancel}
      as="form"
      onSubmit={handleSubmit}
      cardClassName={modalStyles.modalCardWide}
      showClose
      footer={
        <>
          <button type="button" className={listStyles.secondaryBtn} onClick={onCancel}>
            Cancel
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
        <span className={modalStyles.modalLabel}>Topic (optional for AI)</span>
        <input
          className={modalStyles.modalInput}
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g. comparing fractions, linear equations"
          maxLength={100}
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

      {onGenerateWithAi ? (
        <div className={modalStyles.modalField}>
          <span className={modalStyles.modalLabel}>AI Assistant</span>
          <button
            type="button"
            className={listStyles.secondaryBtn}
            onClick={handleGenerateWithAi}
            style={{ width: '100%', justifyContent: 'center' }}
          >
            Generate with AI
          </button>
          <p className={modalStyles.modalHint}>
            Prefills Generate Lesson for {subject || 'this subject'}
            {topic.trim() ? ` · ${topic.trim()}` : ''}.
          </p>
        </div>
      ) : null}

      <p className={modalStyles.modalMeta}>Or create manually</p>

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
