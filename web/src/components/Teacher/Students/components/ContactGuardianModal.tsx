'use client';

import type { StudentGuardian, TeacherStudentRow } from '@/types/teacherStudents';
import { listStyles, TeacherModal } from '../../shared';
import {
  GUARDIAN_CHANNELS,
  openGuardianChannel,
  type GuardianContactChannel,
} from '../contactChannels';
import styles from '../students.module.css';

interface ContactGuardianModalProps {
  student: TeacherStudentRow;
  guardian: StudentGuardian;
  onClose: () => void;
  /** Called when a channel produces a toast (e.g. app-message stub). */
  onNotice?: (notice: { title: string; message: string }) => void;
}

export function ContactGuardianModal({
  student,
  guardian,
  onClose,
  onNotice,
}: ContactGuardianModalProps) {
  const handleChannel = (channel: GuardianContactChannel) => {
    const notice = openGuardianChannel(channel, student, guardian);
    if (notice) onNotice?.(notice);
    onClose();
  };

  return (
    <TeacherModal
      titleId="contact-guardian-title"
      eyebrow="Contact guardian"
      title={guardian.name}
      copy={`${guardian.relationship}${guardian.occupation ? ` · ${guardian.occupation}` : ''} · ${student.fullName}`}
      onClose={onClose}
      showClose
      footer={
        <button type="button" className={listStyles.secondaryBtn} onClick={onClose}>
          Cancel
        </button>
      }
    >
      <p className={styles.contactModalCopy}>
        Choose how to reach them. App message will use Eskwelahan + once messaging is
        connected.
      </p>
      <div className={styles.contactChannelGrid}>
        {GUARDIAN_CHANNELS.map((channel) => (
          <button
            key={channel.id}
            type="button"
            className={
              channel.featured
                ? `${styles.contactChannel} ${styles.contactChannelFeatured}`
                : styles.contactChannel
            }
            onClick={() => handleChannel(channel.id)}
          >
            <span className={styles.contactChannelIcon} aria-hidden>
              {channel.icon}
            </span>
            <span className={styles.contactChannelText}>
              <span className={styles.contactChannelLabel}>{channel.label}</span>
              <span className={styles.contactChannelHint}>{channel.hint}</span>
            </span>
          </button>
        ))}
      </div>
    </TeacherModal>
  );
}
