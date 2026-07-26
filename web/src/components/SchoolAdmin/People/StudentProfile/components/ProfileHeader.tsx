import React from 'react';
import styles from '../studentProfile.module.css';
import { Student } from './types';

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
                <div className={styles.detailRow}>
                  <span className={styles.rowLabel}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg> Grade & Section</span>
                  <span className={styles.rowValue}>{student.gradeSection}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.rowLabel}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg> Student ID</span>
                  <span className={styles.rowValue}>{student.studentId}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.rowLabel}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg> LRN</span>
                  <span className={styles.rowValue}>123456789101</span>
                </div>
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
            <div className={styles.detailRow}>
              <span className={styles.rowLabel}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg> Date of Birth</span>
              <span className={styles.rowValue}>March 15, 2009</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.rowLabel}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> Age</span>
              <span className={styles.rowValue}>16 years old</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.rowLabel}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> Gender</span>
              <span className={styles.rowValue}>Male</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.rowLabel}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg> Nationality</span>
              <span className={styles.rowValue}>Filipino</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.rowLabel}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"></path></svg> Blood Type</span>
              <span className={styles.rowValue}>O+</span>
            </div>
          </div>
        </div>

        {/* School Information */}
        <div className={styles.infoCard}>
          <div className={styles.infoCardHeader}>
            <div className={styles.infoCardIcon} style={{ background: 'rgba(92, 199, 137, 0.1)', color: '#5cc789' }}>🏛️</div>
            <span className={styles.infoCardTitle}>School Information</span>
          </div>
          <div className={styles.detailsGrid}>
            <div className={styles.detailRow}>
              <span className={styles.rowLabel}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg> Adviser</span>
              <span className={styles.rowValue}>Mrs. Liza Mendoza</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.rowLabel}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg> School Year</span>
              <span className={styles.rowValue}>2025 - 2026</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.rowLabel}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg> Modality</span>
              <span className={styles.rowValue}>Face-to-Face</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.rowLabel}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg> Club</span>
              <span className={styles.rowValue}>Science Club</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
