'use client';

import React, { useState, useRef, useEffect } from 'react';
import styles from './ui.module.css';
import { ActionDropdown } from './ActionDropdown';

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: (string | { value: string; label: string })[];
  className?: string;
}

export function CustomSelect({ value, onChange, options, className }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [fixedStyle, setFixedStyle] = useState<{ top?: number; bottom?: number; left: number; width: number } | null>(null);

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      if (spaceBelow < 260 && spaceAbove > spaceBelow) {
        setFixedStyle({
          bottom: window.innerHeight - rect.top + 8,
          left: rect.left,
          width: rect.width,
        });
      } else {
        setFixedStyle({
          top: rect.bottom + 8,
          left: rect.left,
          width: rect.width,
        });
      }
    }
  }, [isOpen]);

  const getLabel = (val: string) => {
    const opt = options.find(o => typeof o === 'string' ? o === val : o.value === val);
    if (!opt) return val;
    return typeof opt === 'string' ? opt : opt.label;
  };

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className={`${styles.customSelectBtn} ${className || ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{getLabel(value) || 'Select option'}</span>
        <span className={styles.customSelectArrow}>▼</span>
      </button>
      
      <ActionDropdown
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        fixedStyle={
          fixedStyle
            ? { top: fixedStyle.top, bottom: fixedStyle.bottom, left: fixedStyle.left }
            : null
        }
      >
        <div style={{ width: fixedStyle?.width }} className={styles.customSelectMenu}>
          {options.map((opt) => {
            const optValue = typeof opt === 'string' ? opt : opt.value;
            const optLabel = typeof opt === 'string' ? opt : opt.label;
            return (
              <button
                key={optValue}
                type="button"
                className={`${styles.customSelectOption} ${optValue === value ? styles.customSelectOptionSelected : ''}`}
                onClick={() => {
                  onChange(optValue);
                  setIsOpen(false);
                }}
              >
                {optLabel}
              </button>
            );
          })}
        </div>
      </ActionDropdown>
    </>
  );
}
