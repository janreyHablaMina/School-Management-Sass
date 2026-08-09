'use client';

import { toClassFocus, type TeacherNavRequest } from '@/lib/teacher/classFocus';
import type { MyClassRow } from '@/types/myClasses';
import { listStyles } from '../../shared';
import { ClassDetailHeader } from './ClassDetailHeader';
import { ClassPulse } from './ClassPulse';
import { ClassQuickActions } from './ClassQuickActions';
import { ClassSpotlight } from './ClassSpotlight';

interface ClassDetailViewProps {
  cls: MyClassRow;
  onBack: () => void;
  onEdit?: () => void;
  onNavigate?: (request: TeacherNavRequest | string) => void;
}

export function ClassDetailView({
  cls,
  onBack,
  onEdit,
  onNavigate,
}: ClassDetailViewProps) {
  const classFocus = toClassFocus(cls);

  return (
    <div className={listStyles.page}>
      <ClassDetailHeader
        cls={cls}
        onBack={onBack}
        onEdit={onEdit}
        onAddLesson={() => onNavigate?.({ tab: 'Lessons', classFocus })}
      />

      <ClassSpotlight cls={cls} />
      <ClassQuickActions cls={cls} onNavigate={onNavigate} />
      <ClassPulse cls={cls} onNavigate={onNavigate} />
    </div>
  );
}
