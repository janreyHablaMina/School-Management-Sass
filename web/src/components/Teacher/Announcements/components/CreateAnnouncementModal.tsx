'use client';

import React, { useState } from 'react';
import { listStyles } from '../../shared';
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
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<AnnouncementType>('General');
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [allClasses, setAllClasses] = useState(false);
  const [includeParents, setIncludeParents] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [publishMode, setPublishMode] = useState<AnnouncementPublishMode>('publish');
  const [scheduledAt, setScheduledAt] = useState('');
  const [error, setError] = useState<string | null>(null);

  const toggleClass = (classroom: string) => {
    setAllClasses(false);
    setSelectedClasses((prev) =>
      prev.includes(classroom) ? prev.filter((c) => c !== classroom) : [...prev, classroom],
    );
  };

  const handleAllClasses = () => {
    setAllClasses((prev) => !prev);
    setSelectedClasses([]);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();
    const hasAudience = allClasses || selectedClasses.length > 0 || includeParents;

    if (!trimmedTitle) {
      setError('Add a title for this announcement.');
      return;
    }
    if (!trimmedDescription) {
      setError('Write a short message for your audience.');
      return;
    }
    if (!hasAudience) {
      setError('Assign at least one classroom, All Classes, or Parents.');
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

  return (
    <div
      className={styles.modalOverlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-announcement-title"
    >
      <form className={styles.modalCard} onSubmit={handleSubmit}>
        <p className={styles.modalEyebrow}>New announcement</p>
        <h2 id="create-announcement-title" className={styles.modalTitle}>
          Create announcement
        </h2>
        <p className={styles.modalCopy}>
          Write your update, choose who should see it, then publish, save a draft, or schedule it.
        </p>

        <label className={styles.modalField}>
          <span className={styles.modalLabel}>Title</span>
          <input
            className={styles.modalInput}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Quiz in Mathematics"
            maxLength={120}
          />
        </label>

        <label className={styles.modalField}>
          <span className={styles.modalLabel}>Message</span>
          <textarea
            className={styles.modalTextarea}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What should students or parents know?"
            rows={4}
            maxLength={500}
          />
        </label>

        <div className={styles.modalField}>
          <span className={styles.modalLabel}>Type</span>
          <div className={styles.chipRow}>
            {TYPES.map((option) => (
              <button
                key={option}
                type="button"
                className={`${styles.choiceChip} ${type === option ? styles.choiceChipActive : ''}`}
                onClick={() => setType(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.modalField}>
          <span className={styles.modalLabel}>Assign to classrooms</span>
          <div className={styles.chipRow}>
            <button
              type="button"
              className={`${styles.choiceChip} ${allClasses ? styles.choiceChipActive : ''}`}
              onClick={handleAllClasses}
            >
              All Classes
            </button>
            {classrooms.map((classroom) => (
              <button
                key={classroom}
                type="button"
                className={`${styles.choiceChip} ${
                  !allClasses && selectedClasses.includes(classroom) ? styles.choiceChipActive : ''
                }`}
                onClick={() => toggleClass(classroom)}
              >
                {classroom}
              </button>
            ))}
            <button
              type="button"
              className={`${styles.choiceChip} ${includeParents ? styles.choiceChipActive : ''}`}
              onClick={() => setIncludeParents((prev) => !prev)}
            >
              Parents
            </button>
          </div>
        </div>

        <div className={styles.modalField}>
          <span className={styles.modalLabel}>When to send</span>
          <div className={styles.chipRow}>
            {PUBLISH_MODES.map((mode) => (
              <button
                key={mode.value}
                type="button"
                className={`${styles.choiceChip} ${
                  publishMode === mode.value ? styles.choiceChipActive : ''
                }`}
                onClick={() => setPublishMode(mode.value)}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>

        {publishMode === 'schedule' ? (
          <label className={styles.modalField}>
            <span className={styles.modalLabel}>Schedule date</span>
            <input
              className={styles.modalInput}
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

        {error ? <p className={styles.modalError}>{error}</p> : null}

        <div className={styles.modalActions}>
          <button type="button" className={listStyles.secondaryBtn} onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className={listStyles.primaryBtn}>
            {publishMode === 'publish'
              ? 'Publish announcement'
              : publishMode === 'schedule'
                ? 'Schedule announcement'
                : 'Save draft'}
          </button>
        </div>
      </form>
    </div>
  );
}
