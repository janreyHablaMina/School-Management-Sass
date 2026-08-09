'use client';

import type { TeacherNavRequest } from '@/lib/teacher/classFocus';
import type { MyClassRow } from '@/types/myClasses';
import { listStyles } from '../../shared';
import { ClassDetailHeader } from './ClassDetailHeader';
import { ClassPulse } from './ClassPulse';
import { ClassQuickActions } from './ClassQuickActions';
import { ClassSpotlight } from './ClassSpotlight';

interface ClassDetailViewProps {
  cls: MyClassRow;
  onBack: () => void;
  onNavigate?: (request: TeacherNavRequest | string) => void;
}

export function ClassDetailView({ cls, onBack, onNavigate }: ClassDetailViewProps) {
  const classFocus = {
    gradeSection: cls.gradeSection,
    subject: cls.subject,
    gradeLevel: cls.gradeLevel,
  };

  return (
    <div className={listStyles.page}>
      <ClassDetailHeader
        cls={cls}
        onBack={onBack}
        onAddLesson={() => onNavigate?.({ tab: 'Lessons', classFocus })}
      />

      <ClassSpotlight cls={cls} />
      <ClassQuickActions cls={cls} onNavigate={onNavigate} />
      <ClassPulse cls={cls} onNavigate={onNavigate} />
    </div>
  );
}
