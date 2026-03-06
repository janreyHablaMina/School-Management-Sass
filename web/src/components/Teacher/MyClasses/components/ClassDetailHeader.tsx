'use client';

import type { MyClassRow } from '@/types/myClasses';
import { ChalkBadge, ClassHubHeader, classHubStyles, listStyles } from '../../shared';

interface ClassDetailHeaderProps {
  cls: MyClassRow;
  onBack: () => void;
  onEdit?: () => void;
  onInvite?: () => void;
  onAddLesson?: () => void;
}

export function ClassDetailHeader({
  cls,
  onBack,
  onEdit,
  onInvite,
  onAddLesson,
}: ClassDetailHeaderProps) {
  return (
    <ClassHubHeader
      subject={cls.subject}
      icon={cls.icon}
      accent={cls.accent}
      onBack={onBack}
      titleExtra={
        <ChalkBadge
          label={cls.status}
          accent={cls.status === 'Active' ? '#5cc789' : '#8a9a90'}
        />
      }
      meta={
        <>
          {cls.gradeSection}
          <span className={classHubStyles.metaDot}>·</span>
          {cls.room}
          <span className={classHubStyles.metaDot}>·</span>
          {cls.academicYear}
        </>
      }
      actions={
        <>
          {onEdit ? (
            <button type="button" className={listStyles.secondaryBtn} onClick={onEdit}>
              Edit Class
            </button>
          ) : null}
          {onInvite ? (
            <button type="button" className={listStyles.secondaryBtn} onClick={onInvite}>
              Invite student
            </button>
          ) : null}
          <button type="button" className={listStyles.primaryBtn} onClick={onAddLesson}>
            + Add Lesson
          </button>
        </>
      }
    />
  );
}
