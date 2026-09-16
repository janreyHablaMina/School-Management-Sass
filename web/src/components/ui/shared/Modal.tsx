'use client';

import React from 'react';
import { useEscapeKey } from '@/lib/hooks';
import { useLockWorkspaceScroll } from '@/lib/hooks';
import modalStyles from './modal.module.css';

interface ModalProps {
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

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export function Modal({
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
}: ModalProps) {
  useLockWorkspaceScroll();
  useEscapeKey(onClose);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

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

  if (!mounted) return null;

  return createPortal(
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
    </div>,
    document.body
  );
}
