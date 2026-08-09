'use client';

import { useEffect, useState } from 'react';
import type { TeacherNavRequest } from '@/lib/teacher/classFocus';
import type { StudentGuardian, TeacherStudentRow } from '@/types/teacherStudents';
import { listStyles, TeacherToast } from '../../shared';
import {
  openGuardianChannel,
  primaryGuardian,
  toStudentClassFocus,
  type GuardianContactChannel,
} from '../utils';
import styles from '../students.module.css';
import { ContactGuardianModal } from './ContactGuardianModal';
import {
  StudentDossierBody,
  type DossierTab,
} from './StudentDossierBody';
import { StudentDossierHero } from './StudentDossierHero';

interface StudentDetailViewProps {
  student: TeacherStudentRow;
  onBack: () => void;
  onNavigate?: (request: TeacherNavRequest | string) => void;
}

export function StudentDetailView({
  student,
  onBack,
  onNavigate,
}: StudentDetailViewProps) {
  const classFocus = toStudentClassFocus(student);
  const [tab, setTab] = useState<DossierTab>('overview');
  const [contactGuardian, setContactGuardian] = useState<StudentGuardian | null>(
    null,
  );
  const [toast, setToast] = useState<{ title: string; message?: string } | null>(
    null,
  );

  useEffect(() => {
    setTab('overview');
  }, [student.id]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3500);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const handleAppMessage = (guardian: StudentGuardian) => {
    const notice = openGuardianChannel('app', student, guardian);
    if (notice) setToast(notice);
  };

  const handleGuardianChannel = (
    guardian: StudentGuardian,
    channel: GuardianContactChannel,
  ) => {
    if (channel === 'app') {
      handleAppMessage(guardian);
      return;
    }
    openGuardianChannel(channel, student, guardian);
  };

  const openPrimaryContact = () => {
    const guardian = primaryGuardian(student);
    if (guardian) setContactGuardian(guardian);
  };

  return (
    <div className={listStyles.page}>
      <div className={styles.dossier}>
        <StudentDossierHero
          student={student}
          onBack={onBack}
          onContact={openPrimaryContact}
          onViewGrades={() => onNavigate?.({ tab: 'Grades', classFocus })}
        />

        <StudentDossierBody
          student={student}
          activeTab={tab}
          onTabChange={setTab}
          onNavigate={onNavigate}
          onContact={openPrimaryContact}
          onGuardianChannel={handleGuardianChannel}
        />
      </div>

      {contactGuardian ? (
        <ContactGuardianModal
          student={student}
          guardian={contactGuardian}
          onClose={() => setContactGuardian(null)}
          onAppMessage={handleAppMessage}
        />
      ) : null}

      {toast ? (
        <TeacherToast
          title={toast.title}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      ) : null}
    </div>
  );
}
