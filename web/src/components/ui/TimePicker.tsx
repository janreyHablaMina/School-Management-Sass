'use client';

import React, { useState, useRef, useEffect } from 'react';
import styles from './ui.module.css';
import { ActionDropdown } from './ActionDropdown';

interface TimePickerProps {
  value: string; // HH:mm (24-hour format)
  onChange: (value: string) => void;
  className?: string;
}

export function TimePicker({ value, onChange, className }: TimePickerProps) {
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

  const [hourRaw, minuteRaw] = (value || '08:00').split(':');
  const hour24 = parseInt(hourRaw, 10) || 8;
  const minute = parseInt(minuteRaw, 10) || 0;
  
  const currentPeriod = hour24 >= 12 ? 'PM' : 'AM';
  let currentHour12 = hour24 % 12;
  if (currentHour12 === 0) currentHour12 = 12;

  const hours = Array.from({ length: 12 }).map((_, i) => i + 1);
  const minutes = Array.from({ length: 60 }).map((_, i) => i);
  const periods = ['AM', 'PM'];

  const handleHourChange = (h: number) => {
    let newH = h;
    if (currentPeriod === 'PM' && newH !== 12) newH += 12;
    if (currentPeriod === 'AM' && newH === 12) newH = 0;
    onChange(`${String(newH).padStart(2, '0')}:${String(minute).padStart(2, '0')}`);
  };

  const handleMinuteChange = (m: number) => {
    onChange(`${String(hour24).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
  };

  const handlePeriodChange = (p: string) => {
    if (p === currentPeriod) return;
    let newH = hour24;
    if (p === 'PM') newH = (newH % 12) + 12;
    if (p === 'AM') newH = newH % 12;
    if (newH === 24) newH = 12;
    if (p === 'PM' && currentHour12 === 12) newH = 12;
    if (p === 'AM' && currentHour12 === 12) newH = 0;
    onChange(`${String(newH).padStart(2, '0')}:${String(minute).padStart(2, '0')}`);
  };

  return (
    <>
      <button
        ref={buttonRef}
        type='button'
        className={`${styles.customSelectBtn} ${className || ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>
          {String(currentHour12).padStart(2, '0')}:{String(minute).padStart(2, '0')} {currentPeriod}
        </span>
        <span className={styles.timePickerIcon}>⏰</span>
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
        <div className={styles.timePickerMenu}>
          <div className={styles.timePickerColumn}>
            {hours.map((h) => (
              <button
                key={h}
                type='button'
                className={`${styles.timePickerOption} ${h === currentHour12 ? styles.timePickerOptionSelected : ''}`}
                onClick={() => handleHourChange(h)}
              >
                {String(h).padStart(2, '0')}
              </button>
            ))}
          </div>
          <div className={styles.timePickerColumn}>
            {minutes.map((m) => (
              <button
                key={m}
                type='button'
                className={`${styles.timePickerOption} ${m === minute ? styles.timePickerOptionSelected : ''}`}
                onClick={() => handleMinuteChange(m)}
              >
                {String(m).padStart(2, '0')}
              </button>
            ))}
          </div>
          <div className={styles.timePickerColumn}>
            {periods.map((p) => (
              <button
                key={p}
                type='button'
                className={`${styles.timePickerOption} ${p === currentPeriod ? styles.timePickerOptionSelected : ''}`}
                onClick={() => handlePeriodChange(p)}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </ActionDropdown>
    </>
  );
}
