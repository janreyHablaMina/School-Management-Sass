'use client';

import { useEffect, useId, useMemo, useRef, useState, type FormEvent } from 'react';
import type { TeacherLessonRow } from '@/types/teacherLessons';
import { listStyles, modalStyles, TeacherModal } from '../../shared';

export const UNASSIGNED_CLASS_LABEL = 'Unassigned';

export interface SaveLessonDetails {
  title: string;
  classLabels: string[];
  subject: string;
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
  const dropdownId = useId();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState(suggestedTitle);
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [classQuery, setClassQuery] = useState('');
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  useEffect(() => {
    if (!dropdownOpen) return;
    searchRef.current?.focus();

    const onPointerDown = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [dropdownOpen]);

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
        <div className={modalStyles.multiSelect} ref={dropdownRef}>
          <button
            type="button"
            id={dropdownId}
            className={modalStyles.multiSelectTrigger}
            aria-haspopup="listbox"
            aria-expanded={dropdownOpen}
            onClick={() => setDropdownOpen((open) => !open)}
          >
            <span className={modalStyles.multiSelectTriggerText}>{dropdownLabel}</span>
            <span className={modalStyles.multiSelectCaret} aria-hidden />
          </button>

          {dropdownOpen ? (
            <div
              className={modalStyles.multiSelectPanel}
              role="listbox"
              aria-multiselectable="true"
              aria-labelledby={dropdownId}
            >
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

      {error ? <p className={modalStyles.modalError}>{error}</p> : null}
    </TeacherModal>
  );
}
