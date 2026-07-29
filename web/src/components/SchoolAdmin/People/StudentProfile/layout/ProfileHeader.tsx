import React from 'react';
import styles from '../studentProfile.module.css';
import { Student } from '../shared/types';
import { DetailRow } from '../shared/SharedComponents';

interface ProfileHeaderProps {
  onBack: () => void;
  student: Student;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ onBack, student }) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <>
<div className={styles.breadcrumbs}>
        <span className={styles.breadcrumbLink} onClick={onBack}>Students</span>
        <span>&gt;</span>
        <span className={styles.breadcrumbActive}>Student Profile</span>
      </div>

      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1>Student Profile</h1>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.backBtn} onClick={onBack}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            Back to Students
          </button>
          <button className={styles.editBtn}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon></svg>
            Edit Student
          </button>
          <button className={styles.moreBtn}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
          </button>
        </div>
      </div>

      {/* Header Grid */}
      <div className={styles.headerGrid}>
        {/* Avatar Card */}
        <div className={styles.infoCard}>
          <div className={styles.avatarTopHalf}>
            <div className={styles.avatarProfileBlock}>
              <div className={styles.avatarCircle} style={{ borderColor: student.avatarColor }}>
                <span style={{ color: student.avatarColor }}>{getInitials(student.name)}</span>
                <div className={styles.statusDot}></div>
              </div>
            </div>
            <div className={styles.nameAndBadge}>
              <h2>{student.name}</h2>
              <span className={styles.statusBadge}>{student.status} Student</span>
            </div>
          </div>
          
          <div className={styles.avatarBottomHalf}>
            <div className={styles.avatarMetaGrid}>
                <DetailRow label="Grade & Section" value={student.gradeSection} />
                <DetailRow label="Student ID" value={student.studentId} />
                <DetailRow label="LRN" value="123456789101" />
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className={styles.infoCard}>
          <div className={styles.infoCardHeader}>
            <div className={styles.infoCardIcon}>👤</div>
            <span className={styles.infoCardTitle}>Personal Information</span>
          </div>
          <div className={styles.detailsGrid}>
            <DetailRow label="Date of Birth" value="March 15, 2009" />
            <DetailRow label="Age" value="16 years old" />
            <DetailRow label="Gender" value="Male" />
            <DetailRow label="Nationality" value="Filipino" />
            <DetailRow label="Blood Type" value="O+" />
          </div>
        </div>

        {/* School Information */}
        <div className={styles.infoCard}>
          <div className={styles.infoCardHeader}>
            <div className={styles.infoCardIcon} style={{ background: 'rgba(92, 199, 137, 0.1)', color: '#5cc789' }}>🏛️</div>
            <span className={styles.infoCardTitle}>School Information</span>
          </div>
          <div className={styles.detailsGrid}>
            <DetailRow label="Adviser" value="Mrs. Liza Mendoza" />
            <DetailRow label="School Year" value="2025 - 2026" />
            <DetailRow label="Modality" value="Face-to-Face" />
            <DetailRow label="Club" value="Science Club" />
          </div>
        </div>
      </div>
    </>
  );
};
