'use client';

import React, { useState } from 'react';
import { listStyles, modalStyles, useEscapeKey, useLockWorkspaceScroll } from '../../shared';
import type { CalendarEventType, CreateCalendarEventInput } from '@/types/teacherCalendar';
import { CALENDAR_EVENT_TYPES, formatTimeInput } from '../utils';
import styles from '../calendar.module.css';

interface CreateEventModalProps {
  defaultDateKey: string;
  classrooms: string[];
  onCancel: () => void;
  onCreate: (input: CreateCalendarEventInput) => void;
}

export function CreateEventModal({
  defaultDateKey,
  classrooms,
  onCancel,
  onCreate,
}: CreateEventModalProps) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<CalendarEventType>('Event');
  const [dateKey, setDateKey] = useState(defaultDateKey);
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('09:00');
  const [classLabel, setClassLabel] = useState(classrooms[0] ?? 'All Classes');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState<string | null>(null);

  useLockWorkspaceScroll();
  useEscapeKey(onCancel);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (!trimmedTitle) {
      setError('Add a title for this event.');
      return;
    }
    if (!dateKey) {
      setError('Pick a date for this event.');
      return;
    }
    if (!startTime) {
      setError('Add a start time.');
      return;
    }
    if (endTime && endTime < startTime) {
      setError('End time must be after the start time.');
      return;
    }
    if (!trimmedDescription) {
      setError('Add a short description.');
      return;
    }
    if (!classLabel) {
      setError('Choose a class or audience.');
      return;
    }

    onCreate({
      title: trimmedTitle,
      type,
      classLabel,
      dateKey,
      startTime: formatTimeInput(startTime),
      endTime: endTime ? formatTimeInput(endTime) : undefined,
      location: location.trim() || undefined,
      description: trimmedDescription,
      notes: notes.trim() || undefined,
    });
  };

  return (
    <div
      className={modalStyles.modalOverlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-event-title"
      onClick={onCancel}
    >
      <form
        className={`${modalStyles.modalCard} ${styles.createEventCard}`}
        onSubmit={handleSubmit}
        onClick={(event) => event.stopPropagation()}
      >
        <p className={modalStyles.modalEyebrow}>New calendar item</p>
        <h2 id="create-event-title" className={modalStyles.modalTitle}>
          Add event
        </h2>
        <p className={modalStyles.modalCopy}>
          Schedule a class, deadline, or school event on your teacher calendar.
        </p>

        <label className={modalStyles.modalField}>
          <span className={modalStyles.modalLabel}>Title</span>
          <input
            className={modalStyles.modalInput}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Parent-Teacher Meeting"
            maxLength={120}
          />
        </label>

        <div className={modalStyles.modalField}>
          <span className={modalStyles.modalLabel}>Type</span>
          <div className={modalStyles.chipRow}>
            {CALENDAR_EVENT_TYPES.map((option) => (
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

        <div className={styles.createEventGrid}>
          <label className={modalStyles.modalField}>
            <span className={modalStyles.modalLabel}>Date</span>
            <input
              className={modalStyles.modalInput}
              type="date"
              value={dateKey}
              onChange={(e) => setDateKey(e.target.value)}
            />
          </label>

          <label className={modalStyles.modalField}>
            <span className={modalStyles.modalLabel}>Class / audience</span>
            <select
              className={modalStyles.modalInput}
              value={classLabel}
              onChange={(e) => setClassLabel(e.target.value)}
            >
              {classrooms.map((classroom) => (
                <option key={classroom} value={classroom}>
                  {classroom}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className={styles.createEventGrid}>
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

        <label className={modalStyles.modalField}>
          <span className={modalStyles.modalLabel}>Location (optional)</span>
          <input
            className={modalStyles.modalInput}
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Room 201"
            maxLength={80}
          />
        </label>

        <label className={modalStyles.modalField}>
          <span className={modalStyles.modalLabel}>Description</span>
          <textarea
            className={modalStyles.modalTextarea}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What should you remember about this event?"
            rows={3}
            maxLength={400}
          />
        </label>

        <label className={modalStyles.modalField}>
          <span className={modalStyles.modalLabel}>Notes (optional)</span>
          <input
            className={modalStyles.modalInput}
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. Print handouts beforehand"
            maxLength={160}
          />
        </label>

        {error ? <p className={modalStyles.modalError}>{error}</p> : null}

        <div className={modalStyles.modalActions}>
          <button type="button" className={listStyles.secondaryBtn} onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className={listStyles.primaryBtn}>
            Save event
          </button>
        </div>
      </form>
    </div>
  );
}
