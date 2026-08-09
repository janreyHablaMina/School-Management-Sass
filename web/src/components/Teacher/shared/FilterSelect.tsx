import React from 'react';
import styles from './listPage.module.css';

interface FilterSelectProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  fullWidth?: boolean;
}

export function FilterSelect({
  label,
  value,
  options,
  onChange,
  fullWidth = false,
}: FilterSelectProps) {
  return (
    <label className={`${styles.filterField} ${fullWidth ? styles.filterFieldFull : ''}`}>
      <span className={styles.filterLabel}>{label}</span>
      <select
        className={styles.filterSelect}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
