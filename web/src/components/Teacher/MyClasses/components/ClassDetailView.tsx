'use client';

import { toClassFocus, type TeacherNavRequest } from '@/lib/teacher/classFocus';
import type { MyClassRow } from '@/types/myClasses';
import { listStyles } from '../../shared';

interface ClassDetailViewProps {
  cls: MyClassRow;
  onBack: () => void;
  onEdit?: () => void;
  onInvite?: () => void;
  onNavigate?: (request: TeacherNavRequest | string) => void;
}

export function ClassDetailView({
  cls,
  onBack,
}: ClassDetailViewProps) {
  return (
    <div className={listStyles.page} style={{ padding: '2rem' }}>
      <button type="button" className={listStyles.backBtn} onClick={onBack} style={{ marginBottom: '2rem' }}>
        <span aria-hidden>‹</span> Back to My Classes
      </button>
      
      <h1 style={{ color: '#fff', fontSize: '2rem' }}>
        Detailed View: {cls.subject} ({cls.gradeSection})
      </h1>
      <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: '1rem' }}>
        (This page is currently empty and will be designed later)
      </p>
    </div>
  );
}
