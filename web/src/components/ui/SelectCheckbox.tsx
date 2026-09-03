'use client';

import type { ChangeEventHandler } from 'react';
import styles from './ui.module.css';

interface SelectAllCheckboxProps {
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  label: string;
}

export function SelectAllCheckbox({ checked, onChange, label }: SelectAllCheckboxProps) {
  return (
    <label className={styles.checkboxWrapper} aria-label={label}>
      <input
        type="checkbox"
        className={styles.checkboxInput}
        checked={checked}
        onChange={onChange}
      />
      <div className={styles.checkboxVisual}>
        <div className={styles.radioDot} />
      </div>
    </label>
  );
}

interface RowSelectCellProps {
  selected: boolean;
  onToggle: () => void;
  label: string;
}

export function RowSelectCell({ selected, onToggle, label }: RowSelectCellProps) {
  return (
    <td
      className={styles.checkCell}
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.stopPropagation();
          onToggle();
        }
      }}
    >
      <label className={styles.checkboxWrapper} aria-label={label} onClick={(e) => e.stopPropagation()}>
        <input
          type="checkbox"
          className={styles.checkboxInput}
          checked={selected}
          onChange={onToggle}
        />
        <div className={styles.checkboxVisual}>
          <div className={styles.radioDot} />
        </div>
      </label>
    </td>
  );
}
