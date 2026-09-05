import React from 'react';
import styles from './listPage.module.css';
import { CustomSelect } from '@/components/ui/CustomSelect';

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
      <CustomSelect
        value={value}
        onChange={onChange}
        options={options}
      />
    </label>
  );
}
