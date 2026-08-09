'use client';

import React, { useState } from 'react';
import { listStyles, modalStyles, TeacherModal } from '../../shared';

interface ChangePasswordModalProps {
  onClose: () => void;
  onSaved: () => void;
}

export function ChangePasswordModal({ onClose, onSaved }: ChangePasswordModalProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [nextPassword, setNextPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!currentPassword || !nextPassword || !confirmPassword) {
      setError('Fill in all password fields.');
      return;
    }
    if (nextPassword.length < 8) {
      setError('New password must be at least 8 characters.');
      return;
    }
    if (nextPassword !== confirmPassword) {
      setError('New password and confirmation do not match.');
      return;
    }

    onSaved();
    onClose();
  };

  return (
    <TeacherModal
      titleId="change-password-title"
      eyebrow="Security"
      title="Change password"
      copy="This is a demo form. Changes stay in this browser session only."
      onClose={onClose}
      as="form"
      onSubmit={handleSubmit}
      showClose
      footer={
        <>
          <button type="button" className={listStyles.secondaryBtn} onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className={listStyles.primaryBtn}>
            Update password
          </button>
        </>
      }
    >
      <label className={modalStyles.modalField}>
        <span className={modalStyles.modalLabel}>Current password</span>
        <input
          className={modalStyles.modalInput}
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          autoComplete="current-password"
        />
      </label>

      <label className={modalStyles.modalField}>
        <span className={modalStyles.modalLabel}>New password</span>
        <input
          className={modalStyles.modalInput}
          type="password"
          value={nextPassword}
          onChange={(e) => setNextPassword(e.target.value)}
          autoComplete="new-password"
        />
      </label>

      <label className={modalStyles.modalField}>
        <span className={modalStyles.modalLabel}>Confirm new password</span>
        <input
          className={modalStyles.modalInput}
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete="new-password"
        />
      </label>

      {error ? <p className={modalStyles.modalError}>{error}</p> : null}
    </TeacherModal>
  );
}
