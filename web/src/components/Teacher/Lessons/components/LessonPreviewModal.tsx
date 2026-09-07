import React from 'react';
import { TeacherModal } from '../../shared/TeacherModal';
import type { TeacherLessonRow } from '@/types/teacherLessons';
import styles from './lessonPreviewModal.module.css';

interface LessonPreviewModalProps {
  lesson: TeacherLessonRow;
  onClose: () => void;
}

export function LessonPreviewModal({ lesson, onClose }: LessonPreviewModalProps) {
  const renderPreview = () => {
    switch (lesson.type) {
      case 'Video Lesson':
        return (
          <div className={styles.videoPreview}>
            <div className={styles.videoPlaceholder}>
              <svg className={styles.playIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" />
              </svg>
              <p>Video Player Placeholder</p>
            </div>
            <div className={styles.videoDetails}>
              <h4>{lesson.title}</h4>
              <p>Duration: {lesson.durationMins} minutes</p>
            </div>
          </div>
        );
      
      case 'PDF':
      case 'Document':
      case 'Presentation':
        return (
          <div className={styles.documentPreview}>
            <div className={styles.documentToolbar}>
              <span>{lesson.title}.pdf</span>
              <div className={styles.documentActions}>
                <button>Zoom In</button>
                <button>Zoom Out</button>
                <button>Download</button>
              </div>
            </div>
            <div className={styles.documentViewer}>
              <div className={styles.documentPage}>
                <h2>{lesson.title}</h2>
                <p>Mock document content preview.</p>
                <div className={styles.mockLines}>
                  <div className={styles.mockLine} />
                  <div className={styles.mockLine} style={{ width: '85%' }} />
                  <div className={styles.mockLine} style={{ width: '90%' }} />
                  <div className={styles.mockLine} style={{ width: '60%' }} />
                </div>
              </div>
            </div>
          </div>
        );

      case 'Link':
        return (
          <div className={styles.linkPreview}>
            <div className={styles.linkCard}>
              <div className={styles.linkIcon}>🔗</div>
              <div className={styles.linkInfo}>
                <h4>{lesson.title}</h4>
                <a href="#" className={styles.linkUrl}>https://example.com/lesson/{lesson.id}</a>
              </div>
            </div>
            <button className={styles.openLinkBtn}>Open Link in New Tab</button>
          </div>
        );

      case 'Text Lesson':
      default:
        return (
          <div className={styles.textPreview}>
            <h2>{lesson.title}</h2>
            <div className={styles.textBody}>
              <p>This is a placeholder for a text-based lesson. In a real application, the rich text content of the lesson would be rendered here.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <TeacherModal
      titleId={`preview-${lesson.id}`}
      eyebrow="Lesson Preview"
      title={lesson.title}
      onClose={onClose}
      cardClassName={styles.previewModalCard}
    >
      <div className={styles.previewContainer}>
        {renderPreview()}
      </div>
    </TeacherModal>
  );
}
