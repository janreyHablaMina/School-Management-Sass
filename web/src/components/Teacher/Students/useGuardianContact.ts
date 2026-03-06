'use client';

import { useEffect, useState } from 'react';
import type { StudentGuardian, TeacherStudentRow } from '@/types/teacherStudents';
import {
  openGuardianChannel,
  type GuardianContactChannel,
} from './contactChannels';
import { primaryGuardian } from './studentDisplay';

interface GuardianContactTarget {
  student: TeacherStudentRow;
  guardian: StudentGuardian;
}

interface GuardianToast {
  title: string;
  message?: string;
}

export function useGuardianContact() {
  const [target, setTarget] = useState<GuardianContactTarget | null>(null);
  const [toast, setToast] = useState<GuardianToast | null>(null);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3500);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const openContact = (
    student: TeacherStudentRow,
    guardian?: StudentGuardian | null,
  ) => {
    const next = guardian ?? primaryGuardian(student);
    if (!next) return;
    setTarget({ student, guardian: next });
  };

  const closeContact = () => setTarget(null);

  const runChannel = (
    channel: GuardianContactChannel,
    student: TeacherStudentRow,
    guardian: StudentGuardian,
  ) => {
    const notice = openGuardianChannel(channel, student, guardian);
    if (notice) setToast(notice);
  };

  return {
    target,
    openContact,
    closeContact,
    runChannel,
    showToast: (notice: GuardianToast) => setToast(notice),
    toast,
    dismissToast: () => setToast(null),
  };
}
