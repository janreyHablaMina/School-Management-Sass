'use client';

import type { GradeClassSection } from '@/types/teacherGrades';
import { ClassHubHeader, classHubStyles, listStyles } from '../../shared';

interface GradesDetailHeaderProps {
  cls: GradeClassSection;
  onBack: () => void;
}

export function GradesDetailHeader({ cls, onBack }: GradesDetailHeaderProps) {
  return (
    <ClassHubHeader
      subject={cls.subject}
      icon={cls.icon}
      accent={cls.accent}
      onBack={onBack}
      meta={
        <>
          {cls.gradeSection}
          <span className={classHubStyles.metaDot}>·</span>
          {cls.room}
          <span className={classHubStyles.metaDot}>·</span>
          Avg {cls.classAverage.toFixed(1)}%
        </>
      }
      actions={
        <>
          <button type="button" className={listStyles.secondaryBtn}>
            ⬇ Export Grades
          </button>
          <button type="button" className={listStyles.primaryBtn}>
            + Enter Grades
          </button>
        </>
      }
    />
  );
}
