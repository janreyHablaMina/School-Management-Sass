import React from 'react';
import styles from './ui.module.css';

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, hint, error, options, placeholder, className = '', ...props }, ref) => {
    return (
      <div className={`${styles.formGroup} ${className}`}>
        {label && (
          <label className={styles.formLabel}>
            {label} {props.required && <span style={{ color: '#ff5252' }}>*</span>}
          </label>
        )}
        <select
          ref={ref}
          className={`${styles.inputBase} ${styles.selectInput}`}
          style={error ? { borderColor: '#ff5252' } : {}}
          {...props}
        >
          {placeholder && (
            <option value="" className={styles.selectOption} disabled={props.required}>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className={styles.selectOption}>
              {opt.label}
            </option>
          ))}
        </select>
        {(hint || error) && (
          <span className={styles.formHint} style={error ? { color: '#ff5252' } : {}}>
            {error || hint}
          </span>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
