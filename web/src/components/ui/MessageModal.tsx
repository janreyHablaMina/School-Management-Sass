import React, { useState } from 'react';
import { TeacherModal, listStyles } from '@/components/ui/shared';
import styles from './messageModal.module.css';

export interface MessageData {
  targets: string[];
  channel: string;
}

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipientCount: number;
  onSend: (data: MessageData) => void;
}

const CHANNELS = [
  { id: 'app', icon: '💬', label: 'App message', hint: 'Send in Eskwelahan +', featured: true },
  { id: 'email', icon: '✉️', label: 'Email', hint: 'Open your email app' },
  { id: 'sms', icon: '📱', label: 'SMS', hint: 'Text message to phone' },
  { id: 'call', icon: '📞', label: 'Call', hint: 'Dial phone number' },
];

export const MessageModal: React.FC<MessageModalProps> = ({
  isOpen,
  onClose,
  recipientCount,
  onSend,
}) => {
  const [targets, setTargets] = useState<string[]>(['parent']);

  if (!isOpen) return null;

  const toggleTarget = (val: string) => {
    setTargets(prev => prev.includes(val) ? prev.filter(t => t !== val) : [...prev, val]);
  };

  return (
    <TeacherModal
      titleId="contact-modal-title"
      eyebrow="Contact"
      title={`Message ${recipientCount} recipient${recipientCount !== 1 ? 's' : ''}`}
      copy="Choose how to reach them. App message will use Eskwelahan + once messaging is connected."
      onClose={onClose}
      showClose
      footer={
        <button type="button" className={listStyles.secondaryBtn} onClick={onClose}>
          Cancel
        </button>
      }
    >
      <div className={styles.targetSelector}>
        <span className={styles.targetLabel}>Send message to:</span>
        <div className={styles.targetGroup}>
          <label className={styles.targetOption}>
            <input 
              type="checkbox" 
              name="messageTarget" 
              value="student" 
              checked={targets.includes('student')}
              onChange={() => toggleTarget('student')}
            />
            Student
          </label>
          <label className={styles.targetOption}>
            <input 
              type="checkbox" 
              name="messageTarget" 
              value="parent" 
              checked={targets.includes('parent')}
              onChange={() => toggleTarget('parent')}
            />
            Parent / Guardian
          </label>
          <label className={styles.targetOption}>
            <input 
              type="checkbox" 
              name="messageTarget" 
              value="teacher" 
              checked={targets.includes('teacher')}
              onChange={() => toggleTarget('teacher')}
            />
            Teacher
          </label>
        </div>
      </div>

      <div className={styles.channelGrid}>
        {CHANNELS.map((channel) => (
          <button
            key={channel.id}
            type="button"
            className={`${styles.channelBtn} ${channel.featured ? styles.featuredChannel : ''}`}
            onClick={() => onSend({ targets, channel: channel.id })}
          >
            <span className={styles.channelIcon} aria-hidden>{channel.icon}</span>
            <span className={styles.channelText}>
              <span className={styles.channelLabel}>{channel.label}</span>
              <span className={styles.channelHint}>{channel.hint}</span>
            </span>
          </button>
        ))}
      </div>
    </TeacherModal>
  );
};
