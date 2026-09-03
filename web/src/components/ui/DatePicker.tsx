'use client';

import { useState, useRef } from 'react';
import styles from './ui.module.css';
import { ActionDropdown } from './ActionDropdown';

interface DatePickerProps {
  value: string; // YYYY-MM-DD
  onChange: (value: string) => void;
  minDate?: string;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DATE_PICKER_MENU_WIDTH = 260;

export function DatePicker({ value, onChange, minDate }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [fixedStyle, setFixedStyle] = useState<{ top?: number; bottom?: number; left: number } | null>(null);

  // Parse current value
  const parsedDate = value ? new Date(`${value}T12:00:00Z`) : new Date();
  
  const [viewMonth, setViewMonth] = useState(parsedDate.getUTCMonth());
  const [viewYear, setViewYear] = useState(parsedDate.getUTCFullYear());

  const handleToggle = () => {
    if (isOpen) {
      setIsOpen(false);
      setFixedStyle(null);
      return;
    }
    // Calculate position synchronously before opening
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const alignedLeft = Math.min(
        rect.left,
        window.innerWidth - DATE_PICKER_MENU_WIDTH - 8,
      );

      if (spaceBelow < 280 && spaceAbove > spaceBelow) {
        setFixedStyle({
          bottom: window.innerHeight - rect.top + 8,
          left: Math.max(8, alignedLeft),
        });
      } else {
        setFixedStyle({
          top: rect.bottom + 8,
          left: Math.max(8, alignedLeft),
        });
      }
    }
    setIsOpen(true);
  };

  const getDaysInMonth = (year: number, month: number) => new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(Date.UTC(year, month, 1)).getUTCDay();

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const selectDate = (day: number) => {
    const y = viewYear;
    const m = String(viewMonth + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    const newDateStr = `${y}-${m}-${d}`;
    onChange(newDateStr);
    setIsOpen(false);
    setFixedStyle(null);
  };

  const formatDisplay = () => {
    if (!value) return 'Select date';
    const d = new Date(`${value}T12:00:00Z`);
    return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
  };

  const isBeforeMin = (y: number, m: number, d: number) => {
    if (!minDate) return false;
    const compareStr = `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    return compareStr < minDate;
  };

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className={`${styles.customSelectBtn} ${isOpen ? styles.selectTriggerOpen : ''}`}
        onClick={handleToggle}
        style={{ minHeight: 42 }}
      >
        <span>{formatDisplay()}</span>
        <span className={styles.timePickerIcon}>📅</span>
      </button>

      <ActionDropdown
        isOpen={isOpen && !!fixedStyle}
        onClose={() => { setIsOpen(false); setFixedStyle(null); }}
        fixedStyle={fixedStyle}
        menuClassName={styles.actionDropdownMenuNoPadding}
      >
        <div className={styles.datePickerMenu}>
          <div className={styles.datePickerHeader}>
            <button type="button" className={styles.datePickerNav} onClick={prevMonth}>‹</button>
            <span className={styles.datePickerTitle}>{MONTHS[viewMonth]} {viewYear}</span>
            <button type="button" className={styles.datePickerNav} onClick={nextMonth}>›</button>
          </div>
          <div className={styles.datePickerGrid}>
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
              <div key={day} className={styles.datePickerDayName}>{day}</div>
            ))}
            
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isSelected = value === `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const disabled = isBeforeMin(viewYear, viewMonth, day);
              
              return (
                <button
                  key={day}
                  type="button"
                  disabled={disabled}
                  className={`${styles.datePickerDay} ${isSelected ? styles.datePickerDaySelected : ''} ${disabled ? styles.datePickerDayDisabled : ''}`}
                  onClick={() => selectDate(day)}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      </ActionDropdown>
    </>
  );
}
