'use client';

import React from 'react';

import { listStyles, TeacherModal } from './index';
import styles from './confirmActionModal.module.css';

interface ConfirmActionModalProps {
  /** The main title shown in the modal (item name or "3 lessons") */
  title: string;
  /** Subtitle / copy line shown under title */
  copy?: string;
  /** Singular label for the item type, e.g. "lesson", "assignment", "class" */
  itemLabel: string;
  /** Number of items for bulk actions. Defaults to 1 (single). */
  count?: number;
  actionType: 'archive' | 'delete';
  onCancel: () => void;
  onConfirm: () => void;
  children?: React.ReactNode;
}

export function ConfirmActionModal({
  title,
  copy,
  itemLabel,
  count = 1,
  actionType,
  onCancel,
  onConfirm,
  children,
}: ConfirmActionModalProps) {
  const isBulk = count > 1;
  const isArchive = actionType === 'archive';
  const actionWord = isArchive ? 'Archive' : 'Delete';
  const pluralLabel = count === 1 ? itemLabel : `${itemLabel}s`;
  const confirmLabel = isBulk ? `${actionWord} ${count}` : `${actionWord} ${itemLabel}`;

  return (
    <TeacherModal
      titleId={`confirm-${actionType}-${itemLabel}-title`}
      eyebrow={`${actionWord} ${itemLabel}`}
      title={title}
      copy={copy}
      onClose={onCancel}
      showClose
      footer={
        <>
          <button type="button" className={listStyles.secondaryBtn} onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className={styles.dangerBtn} onClick={onConfirm}>
            {confirmLabel}
          </button>
        </>
      }
    >
      <p className={styles.confirmCopy}>
        {isBulk ? (
          <>
            <strong>{count}</strong> selected {pluralLabel} will{' '}
            {isArchive
              ? 'move to Archived and leave your Active list. You can restore them anytime from the Archived filter.'
              : 'be permanently deleted. This action cannot be undone.'}
          </>
        ) : (
          <>
            This {itemLabel} will{' '}
            {isArchive
              ? 'move to Archived and leave your Active list. You can restore it anytime from the Archived filter.'
              : 'be permanently deleted. This action cannot be undone.'}
          </>
        )}
      </p>
      {children}
    </TeacherModal>
  );
}
