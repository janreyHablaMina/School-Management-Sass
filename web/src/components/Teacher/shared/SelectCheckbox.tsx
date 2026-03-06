'use client';

import type { ChangeEventHandler } from 'react';
import styles from './listPage.module.css';

interface SelectAllCheckboxProps {
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  label: string;
}

export function SelectAllCheckbox({ checked, onChange, label }: SelectAllCheckboxProps) {
  return (
    <input
      type="checkbox"
      className={styles.checkbox}
      checked={checked}
      onChange={onChange}
      aria-label={label}
    />
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
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
    >
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={selected}
        onChange={onToggle}
        aria-label={label}
      />
    </td>
  );
}
