'use client';

import { useEffect, useState } from 'react';
import type { TeacherNavRequest } from '@/lib/teacher/classFocus';
import type { TeacherStudentRow } from '@/types/teacherStudents';
import { listStyles, TeacherToast } from '@/components/ui/shared';;
import { useGuardianContact } from '../useGuardianContact';
import { toStudentGradesNav } from '../studentDisplay';
import { MessageModal } from '@/components/ui/MessageModal';
import {
  StudentDossierBody,
  StudentDossierHero,
  type DossierTab,
} from './dossier';
import dossierStyles from './dossier/dossier.module.css';

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
  const [tab, setTab] = useState<DossierTab>('overview');
  const {
    target,
    openContact,
    closeContact,
    runChannel,
    showToast,
    toast,
    dismissToast,
  } = useGuardianContact();

  useEffect(() => {
    setTab('overview');
  }, [student.id]);

  return (
    <div className={listStyles.page}>
      <div className={dossierStyles.dossier}>
        <StudentDossierHero
          student={student}
          onBack={onBack}
          onContact={() => openContact(student)}
          onViewGrades={() => onNavigate?.(toStudentGradesNav(student))}
        />

        <StudentDossierBody
          student={student}
          activeTab={tab}
          onTabChange={setTab}
          onNavigate={onNavigate}
          onContact={() => openContact(student)}
          onGuardianChannel={(guardian, channel) =>
            runChannel(channel, student, guardian)
          }
        />
      </div>

      {target ? (
        <MessageModal
          isOpen={true}
          onClose={closeContact}
          recipientCount={1}
          hideTeacherOption
          onSend={(data) => {
            showToast({
              title: 'Message ready',
              message: `Draft to ${data.targets.join(', ')} via ${data.channel} will open soon.`,
            });
            closeContact();
          }}
        />
      ) : null}

      {toast ? (
        <TeacherToast
          title={toast.title}
          message={toast.message}
          onClose={dismissToast}
        />
      ) : null}
    </div>
  );
}
