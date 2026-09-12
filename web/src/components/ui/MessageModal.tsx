import React, { useState } from 'react';
import styles from './messageModal.module.css';
import uiStyles from './ui.module.css';

export interface MessageData {
  sendToStudent: boolean;
  sendToParent: boolean;
  subject: string;
  message: string;
}

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipientCount: number;
  onSend: (data: MessageData) => void;
}

export const MessageModal: React.FC<MessageModalProps> = ({
  isOpen,
  onClose,
  recipientCount,
  onSend,
}) => {
  const [sendToStudent, setSendToStudent] = useState(true);
  const [sendToParent, setSendToParent] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSend = () => {
    onSend({ sendToStudent, sendToParent, subject, message });
    // Reset state after send
    setSubject('');
    setMessage('');
    setSendToStudent(true);
    setSendToParent(false);
  };

  const handleClose = () => {
    setSubject('');
    setMessage('');
    setSendToStudent(true);
    setSendToParent(false);
    onClose();
  };

  const isSendDisabled = (!sendToStudent && !sendToParent) || !message.trim();

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3 className={styles.title}>📧 Send Message</h3>
        
        <div className={styles.recipients}>
          Sending to {recipientCount} selected student{recipientCount !== 1 ? 's' : ''}
        </div>

        <div className={styles.toggles}>
          <label className={styles.toggleLabel}>
            <input 
              type="checkbox" 
              className={styles.checkbox}
              checked={sendToStudent}
              onChange={(e) => setSendToStudent(e.target.checked)}
            />
            Student(s)
          </label>
          <label className={styles.toggleLabel}>
            <input 
              type="checkbox" 
              className={styles.checkbox}
              checked={sendToParent}
              onChange={(e) => setSendToParent(e.target.checked)}
            />
            Parent(s) / Guardian(s)
          </label>
        </div>

        <div className={uiStyles.formGroup}>
          <label className={uiStyles.formLabel}>Subject</label>
          <input 
            type="text" 
            className={uiStyles.inputBase} 
            placeholder="Message Subject (Optional)"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        <div className={uiStyles.formGroup}>
          <label className={uiStyles.formLabel}>Message</label>
          <textarea 
            className={`${uiStyles.inputBase} ${styles.textarea}`}
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={handleClose}>Cancel</button>
          <button 
            className={styles.sendBtn} 
            onClick={handleSend}
            disabled={isSendDisabled}
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};
