'use client';

import React from 'react';
import type { AttendanceClassSection } from '@/types/teacherAttendance';
import { AttendanceClassCard } from './AttendanceClassCard';
import styles from '../attendance.module.css';

interface AttendanceClassGridProps {
  classes: AttendanceClassSection[];
  onOpen: (id: string) => void;
}

export function AttendanceClassGrid({ classes, onOpen }: AttendanceClassGridProps) {
  return (
    <div className={styles.classGrid}>
      {classes.map((cls) => (
        <AttendanceClassCard key={cls.id} cls={cls} onOpen={onOpen} />
      ))}
    </div>
  );
}
