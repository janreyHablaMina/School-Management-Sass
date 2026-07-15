import React from 'react';
import styles from './ui.module.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, error, className = '', ...props }, ref) => {
    return (
      <div className={`${styles.formGroup} ${className}`}>
        {label && (
          <label className={styles.formLabel}>
            {label} {props.required && <span style={{ color: '#ff5252' }}>*</span>}
          </label>
        )}
        <input
          ref={ref}
          className={styles.inputBase}
          style={error ? { borderColor: '#ff5252' } : {}}
          {...props}
        />
        {(hint || error) && (
          <span className={styles.formHint} style={error ? { color: '#ff5252' } : {}}>
            {error || hint}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
