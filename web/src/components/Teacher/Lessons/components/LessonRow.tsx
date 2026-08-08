'use client';

import React, { useState } from 'react';
import {
  ActionDropdown,
  ActionDropdownItem,
  ActionDropdownSeparator,
} from '@/components/ui/ActionDropdown';
import { listStyles } from '../../shared';
import { lessonStatusAccent, lessonTypeAccent } from '../utils';
import styles from '../lessons.module.css';
import type { TeacherLessonRow } from '@/types/teacherLessons';

const ROW_ACTIONS = ['📋 Duplicate Lesson', '📤 Share Lesson', '📦 Archive Lesson'] as const;

interface LessonRowProps {
  lesson: TeacherLessonRow;
}

export function LessonRow({ lesson }: LessonRowProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const typeColor = lessonTypeAccent(lesson.type);
  const statusColor = lessonStatusAccent(lesson.status);

  return (
    <tr>
      <td>
        <div className={styles.lessonCell}>
          <div
            className={styles.lessonIcon}
            style={{
              background: `${lesson.accent}22`,
              color: lesson.accent,
              borderColor: `${lesson.accent}55`,
            }}
          >
            {lesson.icon}
          </div>
          <div className={styles.lessonMeta}>
            <p className={styles.lessonTitle}>{lesson.title}</p>
            <p className={styles.lessonDesc}>{lesson.description}</p>
            <p className={styles.lessonDuration}>⏱ {lesson.durationMins} mins</p>
          </div>
        </div>
      </td>
      <td>
        <div className={styles.classCell}>
          <p className={styles.classLabel}>{lesson.classLabel}</p>
          <p className={styles.classSubject}>{lesson.subject}</p>
        </div>
      </td>
      <td>
        <span
          className={styles.typeBadge}
          style={{
            color: typeColor,
            borderColor: `${typeColor}88`,
            background: `${typeColor}18`,
          }}
        >
          {lesson.type}
        </span>
      </td>
      <td>
        <div className={styles.statusCell}>
          <span className={styles.statusLabel} style={{ color: statusColor }}>
            {lesson.status}
          </span>
          <span className={styles.statusDate}>{lesson.statusDate}</span>
        </div>
      </td>
      <td>
        <div className={styles.updatedCell}>
          <div className={styles.updatedAvatar}>SJ</div>
          <div className={styles.updatedMeta}>
            <p className={styles.updatedDate}>{lesson.updatedAt}</p>
            <p className={styles.updatedBy}>by {lesson.updatedBy}</p>
          </div>
        </div>
      </td>
      <td>
        <div className={`${listStyles.actionsCell} ${styles.rowActions}`}>
          <button type="button" className={styles.iconBtn} aria-label={`View ${lesson.title}`}>
            👁
          </button>
          <button type="button" className={styles.iconBtn} aria-label={`Edit ${lesson.title}`}>
            ✎
          </button>
          <div className={listStyles.menuWrap}>
            <button
              type="button"
              className={listStyles.moreBtn}
              aria-label={`More actions for ${lesson.title}`}
              onClick={() => setMenuOpen((open) => !open)}
            >
              ⋮
            </button>
            <ActionDropdown isOpen={menuOpen} onClose={closeMenu}>
              {ROW_ACTIONS.map((label) => (
                <ActionDropdownItem
                  key={label}
                  isDanger={label.includes('Archive')}
                  onClick={closeMenu}
                >
                  {label}
                </ActionDropdownItem>
              ))}
              <ActionDropdownSeparator />
              <ActionDropdownItem isDanger onClick={closeMenu}>
                🗑 Delete Lesson
              </ActionDropdownItem>
            </ActionDropdown>
          </div>
        </div>
      </td>
    </tr>
  );
}
