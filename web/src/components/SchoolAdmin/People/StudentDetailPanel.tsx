import React from 'react';
import styles from './students.module.css';

interface Student {
  id: string;
  name: string;
  email: string;
  studentId: string;
  gradeSection: string;
  parentGuardian: string;
  contact: string;
  status: string;
  dateEnrolled: string;
  avatarColor: string;
}

interface StudentDetailPanelProps {
  student: Student;
  onClose: () => void;
}

export const StudentDetailPanel: React.FC<StudentDetailPanelProps> = ({ student, onClose }) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <>
      <div className={styles.panelOverlay} onClick={onClose} />
      <div className={styles.sidePanel}>
        <div className={styles.panelHeader}>
          <div className={styles.panelHeaderLeft}>
            <div className={styles.panelAvatar} style={{ background: student.avatarColor }}>
              {getInitials(student.name)}
            </div>
            <div className={styles.panelTitle}>
              <h3>{student.name}</h3>
              <p>Student ID: {student.studentId}</p>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <div className={styles.panelContent}>
          <div className={styles.detailSection}>
            <h4 className={styles.detailSectionTitle}>Academic Info</h4>
            <div className={styles.detailGrid}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Grade & Section</span>
                <span className={styles.detailValue}>{student.gradeSection}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Status</span>
                <span className={styles.detailValue} style={{ color: student.status === 'Active' ? '#5cc789' : '#ff7e93' }}>
                  {student.status}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Date Enrolled</span>
                <span className={styles.detailValue}>{student.dateEnrolled}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Track / Strand</span>
                <span className={styles.detailValue}>STEM</span>
              </div>
            </div>
          </div>

          <div className={styles.detailSection}>
            <h4 className={styles.detailSectionTitle}>Contact Details</h4>
            <div className={styles.detailGrid}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Email Address</span>
                <span className={styles.detailValue}>{student.email}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Phone</span>
                <span className={styles.detailValue}>{student.contact}</span>
              </div>
              <div className={styles.detailItem} style={{ gridColumn: '1 / -1' }}>
                <span className={styles.detailLabel}>Home Address</span>
                <span className={styles.detailValue}>123 Chalkboard Avenue, Education City</span>
              </div>
            </div>
          </div>

          <div className={styles.detailSection}>
            <h4 className={styles.detailSectionTitle}>Parent / Guardian</h4>
            <div className={styles.detailGrid}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Primary Contact</span>
                <span className={styles.detailValue}>{student.parentGuardian}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Relationship</span>
                <span className={styles.detailValue}>Mother</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Contact Number</span>
                <span className={styles.detailValue}>{student.contact}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.panelFooter}>
          <button className={styles.editBtn}>✏️ Edit</button>
          <button className={styles.primaryBtn}>📝 Manage Grades</button>
        </div>
      </div>
    </>
  );
};
