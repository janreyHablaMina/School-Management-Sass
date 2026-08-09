'use client';

import type { TeacherStudentRow } from '@/types/teacherStudents';
import styles from '../students.module.css';

type AvatarSize = 'row' | 'dossier' | 'edit';

interface StudentAvatarProps {
  student: Pick<TeacherStudentRow, 'fullName' | 'initials' | 'avatarAccent' | 'photoUrl'>;
  size?: AvatarSize;
}

const SIZE_CLASS: Record<AvatarSize, string> = {
  row: styles.avatar,
  dossier: styles.dossierAvatar,
  edit: styles.editPhotoPreview,
};

export function StudentAvatar({ student, size = 'row' }: StudentAvatarProps) {
  const photoUrl = student.photoUrl ?? null;

  return (
    <div
      className={SIZE_CLASS[size]}
      style={{
        background: `${student.avatarAccent}22`,
        color: student.avatarAccent,
        borderColor:
          size === 'dossier' ? `${student.avatarAccent}77` : `${student.avatarAccent}66`,
      }}
    >
      {photoUrl ? (
        <img src={photoUrl} alt="" className={styles.avatarImage} />
      ) : (
        <span aria-hidden>{student.initials}</span>
      )}
    </div>
  );
}
