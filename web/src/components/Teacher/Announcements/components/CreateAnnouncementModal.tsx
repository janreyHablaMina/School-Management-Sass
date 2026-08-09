'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import { listStyles, modalStyles, useLockWorkspaceScroll } from '../../shared';
import type {
  AnnouncementPublishMode,
  AnnouncementType,
  CreateAnnouncementInput,
} from '@/types/teacherAnnouncements';
import styles from '../announcements.module.css';

interface CreateAnnouncementModalProps {
  classrooms: string[];
  onCancel: () => void;
  onCreate: (input: CreateAnnouncementInput) => void;
}

type AudienceMode = 'all' | 'selected';

const TYPES: AnnouncementType[] = ['General', 'Reminder', 'Event', 'Urgent'];

const PUBLISH_MODES: Array<{ value: AnnouncementPublishMode; label: string }> = [
  { value: 'publish', label: 'Publish now' },
  { value: 'draft', label: 'Save draft' },
  { value: 'schedule', label: 'Schedule' },
];

export function CreateAnnouncementModal({
  classrooms,
  onCancel,
  onCreate,
}: CreateAnnouncementModalProps) {
  const dropdownId = useId();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<AnnouncementType>('General');
  const [audienceMode, setAudienceMode] = useState<AudienceMode>('selected');
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [includeParents, setIncludeParents] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [publishMode, setPublishMode] = useState<AnnouncementPublishMode>('publish');
  const [scheduledAt, setScheduledAt] = useState('');
  const [error, setError] = useState<string | null>(null);

  useLockWorkspaceScroll();

  useEffect(() => {
    if (!dropdownOpen) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [dropdownOpen]);

  const toggleClass = (classroom: string) => {
    setSelectedClasses((prev) =>
      prev.includes(classroom) ? prev.filter((c) => c !== classroom) : [...prev, classroom],
    );
  };

  const dropdownLabel =
    selectedClasses.length === 0
      ? 'Select classrooms'
      : selectedClasses.length === 1
        ? selectedClasses[0]
        : selectedClasses.length === classrooms.length
          ? 'All listed classrooms'
          : `${selectedClasses.length} classrooms selected`;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();
    const allClasses = audienceMode === 'all';

    if (!trimmedTitle) {
      setError('Add a title for this announcement.');
      return;
    }
    if (!trimmedDescription) {
      setError('Write a short message for your audience.');
      return;
    }
    if (!allClasses && selectedClasses.length === 0 && !includeParents) {
      setError('Select at least one classroom, or include Parents.');
      return;
    }
    if (publishMode === 'schedule' && !scheduledAt) {
      setError('Pick a date to schedule this announcement.');
      return;
    }

    onCreate({
      title: trimmedTitle,
      description: trimmedDescription,
      type,
      classrooms: allClasses ? [] : selectedClasses,
      includeParents,
      allClasses,
      pinned,
      publishMode,
      scheduledAt: publishMode === 'schedule' ? scheduledAt : undefined,
    });
  };

  const submitLabel =
    publishMode === 'publish'
      ? 'Publish announcement'
      : publishMode === 'schedule'
        ? 'Schedule announcement'
        : 'Save draft';

  return (
    <div
      className={modalStyles.modalOverlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-announcement-title"
    >
      <form className={modalStyles.modalCard} onSubmit={handleSubmit}>
        <p className={modalStyles.modalEyebrow}>New announcement</p>
        <h2 id="create-announcement-title" className={modalStyles.modalTitle}>
          Create announcement
        </h2>
        <p className={modalStyles.modalCopy}>
          Write your update, choose who should see it, then publish, save a draft, or schedule it.
        </p>

        <label className={modalStyles.modalField}>
          <span className={modalStyles.modalLabel}>Title</span>
          <input
            className={modalStyles.modalInput}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Quiz in Mathematics"
            maxLength={120}
          />
        </label>

        <label className={modalStyles.modalField}>
          <span className={modalStyles.modalLabel}>Message</span>
          <textarea
            className={modalStyles.modalTextarea}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What should students or parents know?"
            rows={4}
            maxLength={500}
          />
        </label>

        <div className={modalStyles.modalField}>
          <span className={modalStyles.modalLabel}>Type</span>
          <div className={modalStyles.chipRow}>
            {TYPES.map((option) => (
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
          <span className={modalStyles.modalLabel}>Assign to classrooms</span>
          <div className={styles.radioGroup} role="radiogroup" aria-label="Audience mode">
            <label className={styles.radioOption}>
              <input
                type="radio"
                name="audience-mode"
                checked={audienceMode === 'all'}
                onChange={() => {
                  setAudienceMode('all');
                  setSelectedClasses([]);
                  setDropdownOpen(false);
                }}
              />
              <span>All Classes</span>
            </label>
            <label className={styles.radioOption}>
              <input
                type="radio"
                name="audience-mode"
                checked={audienceMode === 'selected'}
                onChange={() => setAudienceMode('selected')}
              />
              <span>Select classrooms</span>
            </label>
          </div>

          {audienceMode === 'selected' ? (
            <div className={styles.dropdown} ref={dropdownRef}>
              <button
                type="button"
                id={dropdownId}
                className={styles.dropdownTrigger}
                aria-haspopup="listbox"
                aria-expanded={dropdownOpen}
                onClick={() => setDropdownOpen((open) => !open)}
              >
                <span>{dropdownLabel}</span>
                <span className={styles.dropdownCaret} aria-hidden>
                  ▾
                </span>
              </button>

              {dropdownOpen ? (
                <div className={styles.dropdownMenu} role="listbox" aria-multiselectable="true">
                  {classrooms.map((classroom) => {
                    const checked = selectedClasses.includes(classroom);
                    return (
                      <label
                        key={classroom}
                        className={`${styles.dropdownOption} ${
                          checked ? styles.dropdownOptionActive : ''
                        }`}
                        role="option"
                        aria-selected={checked}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleClass(classroom)}
                        />
                        <span>{classroom}</span>
                      </label>
                    );
                  })}
                </div>
              ) : null}
            </div>
          ) : null}

          <label className={styles.parentsCheck}>
            <input
              type="checkbox"
              checked={includeParents}
              onChange={(e) => setIncludeParents(e.target.checked)}
            />
            <span>Also send to Parents</span>
          </label>
        </div>

        <div className={modalStyles.modalField}>
          <span className={modalStyles.modalLabel}>When to send</span>
          <div className={modalStyles.chipRow}>
            {PUBLISH_MODES.map((mode) => (
              <button
                key={mode.value}
                type="button"
                className={`${modalStyles.choiceChip} ${
                  publishMode === mode.value ? modalStyles.choiceChipActive : ''
                }`}
                onClick={() => setPublishMode(mode.value)}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>

        {publishMode === 'schedule' ? (
          <label className={modalStyles.modalField}>
            <span className={modalStyles.modalLabel}>Schedule date</span>
            <input
              className={modalStyles.modalInput}
              type="date"
              value={scheduledAt}
              onChange={(e) => setScheduledAt(e.target.value)}
            />
          </label>
        ) : null}

        <label className={styles.checkRow}>
          <input
            type="checkbox"
            checked={pinned}
            onChange={(e) => setPinned(e.target.checked)}
          />
          <span>Pin this announcement to the top</span>
        </label>

        {error ? <p className={modalStyles.modalError}>{error}</p> : null}

        <div className={modalStyles.modalActions}>
          <button type="button" className={listStyles.secondaryBtn} onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className={listStyles.primaryBtn}>
            {submitLabel}
          </button>
        </div>
      </form>
    </div>
  );
}
