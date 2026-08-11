'use client';

import { useEffect, useId, useMemo, useRef, useState, type FormEvent } from 'react';
import type { LessonType, TeacherLessonRow } from '@/types/teacherLessons';
import { listStyles, modalStyles, TeacherModal } from '../../shared';
import {
  AI_LESSON_SAVE_TYPE_HINTS,
  AI_LESSON_SAVE_TYPE_LABELS,
  AI_LESSON_SAVE_TYPES,
  lessonTypeIcon,
} from '../utils';

export const UNASSIGNED_CLASS_LABEL = 'Unassigned';

export interface SaveLessonDetails {
  title: string;
  classLabels: string[];
  subject: string;
  type: LessonType;
}

interface SaveLessonTitleModalProps {
  suggestedTitle: string;
  classOptions: string[];
  /** Used quietly when saving — not shown in the modal. */
  defaultSubject?: string;
  initialClassLabel?: string;
  onCancel: () => void;
  onConfirm: (details: SaveLessonDetails) => TeacherLessonRow[];
  onDone: (lessons: TeacherLessonRow[]) => void;
}

export function SaveLessonTitleModal({
  suggestedTitle,
  classOptions,
  defaultSubject = 'English',
  onCancel,
  onConfirm,
  onDone,
}: SaveLessonTitleModalProps) {
  const assignId = useId();
  const typeId = useId();
  const assignRef = useRef<HTMLDivElement>(null);
  const typeRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState(suggestedTitle);
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [lessonType, setLessonType] =
    useState<(typeof AI_LESSON_SAVE_TYPES)[number]>('PDF');
  const [assignOpen, setAssignOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);
  const [classQuery, setClassQuery] = useState('');
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  useEffect(() => {
    if (!assignOpen) return;
    searchRef.current?.focus();

    const onPointerDown = (event: MouseEvent) => {
      if (!assignRef.current?.contains(event.target as Node)) {
        setAssignOpen(false);
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [assignOpen]);

  useEffect(() => {
    if (!typeOpen) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!typeRef.current?.contains(event.target as Node)) {
        setTypeOpen(false);
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [typeOpen]);

  const filteredClasses = useMemo(() => {
    const query = classQuery.trim().toLowerCase();
    if (!query) return classOptions;
    return classOptions.filter((option) => option.toLowerCase().includes(query));
  }, [classOptions, classQuery]);

  const dropdownLabel =
    selectedClasses.length === 0
      ? 'Not assigned'
      : selectedClasses.length === 1
        ? selectedClasses[0]
        : `${selectedClasses.length} classes selected`;

  const toggleClass = (option: string) => {
    setSelectedClasses((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option],
    );
    if (error) setError(null);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const cleaned = title.trim();
    if (!cleaned) {
      setError('Add a title for this lesson.');
      return;
    }

    const classLabels =
      selectedClasses.length > 0 ? selectedClasses : [UNASSIGNED_CLASS_LABEL];

    onDone(
      onConfirm({
        title: cleaned,
        classLabels,
        subject: defaultSubject.trim() || 'English',
        type: lessonType,
      }),
    );
  };

  return (
    <TeacherModal
      titleId="save-lesson-title"
      eyebrow="Save lesson"
      title="What is the title?"
      copy="Name this lesson. Optionally assign it to one or more classes."
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

      <div className={modalStyles.modalField}>
        <span className={modalStyles.modalLabel}>Assign</span>
        <div className={modalStyles.multiSelect} ref={assignRef}>
          <button
            type="button"
            id={assignId}
            className={modalStyles.multiSelectTrigger}
            aria-haspopup="listbox"
            aria-expanded={assignOpen}
            onClick={() => {
              setTypeOpen(false);
              setAssignOpen((open) => !open);
            }}
          >
            <span className={modalStyles.multiSelectTriggerText}>{dropdownLabel}</span>
            <span className={modalStyles.multiSelectCaret} aria-hidden />
          </button>

          {assignOpen ? (
            <div
              className={modalStyles.multiSelectPanel}
              role="listbox"
              aria-multiselectable="true"
              aria-labelledby={assignId}
            >
              <div className={modalStyles.multiSelectHeader}>
                <span className={modalStyles.multiSelectHeaderLabel}>
                  {selectedClasses.length === 0
                    ? 'Select classes'
                    : `${selectedClasses.length} selected`}
                </span>
                <button
                  type="button"
                  className={modalStyles.multiSelectClose}
                  aria-label="Close"
                  onClick={() => setAssignOpen(false)}
                >
                  ×
                </button>
              </div>
              <input
                ref={searchRef}
                className={modalStyles.multiSelectSearch}
                type="search"
                value={classQuery}
                onChange={(e) => setClassQuery(e.target.value)}
                placeholder="Search classes…"
                aria-label="Search classes"
              />
              <div className={modalStyles.multiSelectList}>
                {filteredClasses.length === 0 ? (
                  <p className={modalStyles.multiSelectEmpty}>No classes match your search.</p>
                ) : (
                  filteredClasses.map((option) => {
                    const checked = selectedClasses.includes(option);
                    return (
                      <label
                        key={option}
                        className={`${modalStyles.multiSelectOption} ${
                          checked ? modalStyles.multiSelectOptionActive : ''
                        }`}
                        role="option"
                        aria-selected={checked}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleClass(option)}
                        />
                        <span>{option}</span>
                      </label>
                    );
                  })
                )}
              </div>
              <div className={modalStyles.multiSelectFooter}>
                <button
                  type="button"
                  className={modalStyles.multiSelectDone}
                  onClick={() => setAssignOpen(false)}
                >
                  Done
                </button>
              </div>
            </div>
          ) : null}
        </div>

        {selectedClasses.length > 0 ? (
          <div className={modalStyles.selectedTags}>
            {selectedClasses.map((option) => (
              <span key={option} className={modalStyles.selectedTag}>
                {option}
                <button
                  type="button"
                  className={modalStyles.selectedTagRemove}
                  aria-label={`Remove ${option}`}
                  onClick={() => toggleClass(option)}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        ) : null}
      </div>

      <div className={modalStyles.modalField}>
        <span className={modalStyles.modalLabel}>Type</span>
        <div className={modalStyles.multiSelect} ref={typeRef}>
          <button
            type="button"
            id={typeId}
            className={modalStyles.multiSelectTrigger}
            aria-haspopup="listbox"
            aria-expanded={typeOpen}
            onClick={() => {
              setAssignOpen(false);
              setTypeOpen((open) => !open);
            }}
          >
            <span className={modalStyles.multiSelectTriggerText}>
              {lessonTypeIcon(lessonType)} {AI_LESSON_SAVE_TYPE_LABELS[lessonType]}
            </span>
            <span className={modalStyles.multiSelectCaret} aria-hidden />
          </button>

          {typeOpen ? (
            <div
              className={modalStyles.multiSelectPanel}
              role="listbox"
              aria-labelledby={typeId}
            >
              <div className={modalStyles.multiSelectList}>
                {AI_LESSON_SAVE_TYPES.map((option) => {
                  const selected = lessonType === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      role="option"
                      aria-selected={selected}
                      className={`${modalStyles.selectOption} ${
                        selected ? modalStyles.selectOptionActive : ''
                      }`}
                      onClick={() => {
                        setLessonType(option);
                        setTypeOpen(false);
                      }}
                    >
                      <span className={modalStyles.selectOptionIcon} aria-hidden>
                        {lessonTypeIcon(option)}
                      </span>
                      <span className={modalStyles.selectOptionCopy}>
                        <span className={modalStyles.selectOptionLabel}>
                          {AI_LESSON_SAVE_TYPE_LABELS[option]}
                        </span>
                        <span className={modalStyles.selectOptionHint}>
                          {AI_LESSON_SAVE_TYPE_HINTS[option]}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {error ? <p className={modalStyles.modalError}>{error}</p> : null}
    </TeacherModal>
  );
}
