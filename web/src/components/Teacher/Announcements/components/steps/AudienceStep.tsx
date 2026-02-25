'use client';

import React from 'react';
import { modalStyles } from '@/components/ui/shared';
import type { AnnouncementType } from '@/types/teacherAnnouncements';
import styles from '../../announcements.module.css';

export const TYPES: AnnouncementType[] = ['General', 'Reminder', 'Event', 'Urgent'];

type AudienceMode = 'all' | 'selected';

interface AudienceStepProps {
  type: AnnouncementType;
  setType: (value: AnnouncementType) => void;
  audienceMode: AudienceMode;
  setAudienceMode: (value: AudienceMode) => void;
  selectedClasses: string[];
  setSelectedClasses: (value: string[]) => void;
  classSearch: string;
  setClassSearch: (value: string) => void;
  includeParents: boolean;
  setIncludeParents: (value: boolean) => void;
  classrooms: string[];
  dropdownOpen: boolean;
  setDropdownOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  dropdownId: string;
  dropdownLabel: string;
  filteredClassrooms: string[];
  toggleClass: (classroom: string) => void;
}

export function AudienceStep({
  type,
  setType,
  audienceMode,
  setAudienceMode,
  selectedClasses,
  setSelectedClasses,
  classSearch,
  setClassSearch,
  includeParents,
  setIncludeParents,
  classrooms: _classrooms,
  dropdownOpen,
  setDropdownOpen,
  dropdownRef,
  dropdownId,
  dropdownLabel,
  filteredClassrooms,
  toggleClass,
}: AudienceStepProps) {
  return (
    <>
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
              <span className={styles.dropdownCaret} aria-hidden />
            </button>

            {dropdownOpen ? (
              <div
                className={styles.dropdownMenu}
                role="listbox"
                aria-multiselectable="true"
              >
                <input
                  className={styles.classSearchInput}
                  type="search"
                  value={classSearch}
                  onChange={(e) => setClassSearch(e.target.value)}
                  placeholder="Search class..."
                  aria-label="Search classrooms"
                />
                {filteredClassrooms.length > 0 ? (
                  filteredClassrooms.map((classroom) => {
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
                  })
                ) : (
                  <p className={styles.dropdownEmpty}>No classes found.</p>
                )}
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
    </>
  );
}
