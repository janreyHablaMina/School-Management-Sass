'use client';

import React from 'react';
import styles from '../settings.module.css';

interface SettingsToggleProps {
  label: string;
  hint: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function SettingsToggle({ label, hint, checked, onChange }: SettingsToggleProps) {
  return (
    <label className={`${styles.toggleRow} ${checked ? styles.toggleRowOn : ''}`}>
      <span className={styles.toggleCopy}>
        <span className={styles.toggleLabel}>{label}</span>
        <span className={styles.toggleHint}>{hint}</span>
      </span>
      <span className={styles.switch}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className={styles.switchTrack} aria-hidden>
          <span className={styles.switchThumb} />
        </span>
      </span>
    </label>
  );
}
