'use client';

import { useEffect } from 'react';
import styles from './teacherToast.module.css';

interface TeacherToastProps {
  title: string;
  message?: string;
  onClose?: () => void;
  durationMs?: number;
}

export function TeacherToast({ title, message, onClose, durationMs = 3000 }: TeacherToastProps) {
  useEffect(() => {
    if (!onClose || durationMs <= 0) return;
    const timer = setTimeout(onClose, durationMs);
    return () => clearTimeout(timer);
  }, [onClose, durationMs]);
  return (
    <div className={styles.toast} role="status" aria-live="polite">
      <span className={styles.toastIcon} aria-hidden>
        ✓
      </span>
      <div className={styles.toastBody}>
        <p className={styles.toastTitle}>{title}</p>
        {message ? <p className={styles.toastCopy}>{message}</p> : null}
      </div>
      {onClose ? (
        <button
          type="button"
          className={styles.toastClose}
          onClick={onClose}
          aria-label="Dismiss"
        >
          ✕
        </button>
      ) : null}
    </div>
  );
}
