'use client';

import type { StudentGuardian, TeacherStudentRow } from '@/types/teacherStudents';
import { listStyles, TeacherModal } from '../../shared';
import {
  openGuardianChannel,
  type GuardianContactChannel,
} from '../utils';
import styles from '../students.module.css';

const CHANNELS: Array<{
  id: GuardianContactChannel;
  icon: string;
  label: string;
  hint: string;
  featured?: boolean;
}> = [
  {
    id: 'app',
    icon: '💬',
    label: 'App message',
    hint: 'Send in Teachify (parents app)',
    featured: true,
  },
  {
    id: 'email',
    icon: '✉️',
    label: 'Email',
    hint: 'Open your email app',
  },
  {
    id: 'sms',
    icon: '📱',
    label: 'SMS',
    hint: 'Text message to phone',
  },
  {
    id: 'call',
    icon: '📞',
    label: 'Call',
    hint: 'Dial guardian phone',
  },
];

interface ContactGuardianModalProps {
  student: TeacherStudentRow;
  guardian: StudentGuardian;
  onClose: () => void;
  onAppMessage?: (guardian: StudentGuardian) => void;
}

export function ContactGuardianModal({
  student,
  guardian,
  onClose,
  onAppMessage,
}: ContactGuardianModalProps) {
  const handleChannel = (channel: GuardianContactChannel) => {
    if (channel === 'app') {
      onAppMessage?.(guardian);
      onClose();
      return;
    }
    openGuardianChannel(channel, student, guardian);
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
        Choose how to reach them. App message will use Teachify once messaging is
        connected.
      </p>
      <div className={styles.contactChannelGrid}>
        {CHANNELS.map((channel) => (
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
