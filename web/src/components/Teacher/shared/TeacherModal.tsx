'use client';

import React from 'react';
import { useEscapeKey } from './useEscapeKey';
import { useLockWorkspaceScroll } from './useLockWorkspaceScroll';
import modalStyles from './teacherModal.module.css';

interface TeacherModalProps {
  titleId: string;
  eyebrow: string;
  title: string;
  copy?: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  cardClassName?: string;
  as?: 'div' | 'form';
  onSubmit?: (event: React.FormEvent) => void;
  showClose?: boolean;
}

export function TeacherModal({
  titleId,
  eyebrow,
  title,
  copy,
  onClose,
  children,
  footer,
  cardClassName,
  as = 'div',
  onSubmit,
  showClose = false,
}: TeacherModalProps) {
  useLockWorkspaceScroll();
  useEscapeKey(onClose);

  const cardClass = [modalStyles.modalCard, cardClassName].filter(Boolean).join(' ');

  const body = (
    <>
      <div className={modalStyles.modalHeader}>
        <div>
          <p className={modalStyles.modalEyebrow}>{eyebrow}</p>
          <h2 id={titleId} className={modalStyles.modalTitle}>
            {title}
          </h2>
          {copy ? <p className={modalStyles.modalCopy}>{copy}</p> : null}
        </div>
        {showClose ? (
          <button
            type="button"
            className={modalStyles.modalClose}
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        ) : null}
      </div>
      {children}
      {footer ? <div className={modalStyles.modalActions}>{footer}</div> : null}
    </>
  );

  return (
    <div
      className={modalStyles.modalOverlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={onClose}
    >
      {as === 'form' ? (
        <form className={cardClass} onSubmit={onSubmit} onClick={(event) => event.stopPropagation()}>
          {body}
        </form>
      ) : (
        <div className={cardClass} onClick={(event) => event.stopPropagation()}>
          {body}
        </div>
      )}
    </div>
  );
}
