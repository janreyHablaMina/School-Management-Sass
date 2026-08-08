'use client';

import React from 'react';
import type { GradeClassSection } from '@/types/teacherGrades';
import { GradeClassCard } from './GradeClassCard';
import styles from '../grades.module.css';

interface GradeClassGridProps {
  classes: GradeClassSection[];
  onOpen: (id: string) => void;
}

export function GradeClassGrid({ classes, onOpen }: GradeClassGridProps) {
  return (
    <div className={styles.classGrid}>
      {classes.map((cls) => (
        <GradeClassCard key={cls.id} cls={cls} onOpen={onOpen} />
      ))}
    </div>
  );
}
