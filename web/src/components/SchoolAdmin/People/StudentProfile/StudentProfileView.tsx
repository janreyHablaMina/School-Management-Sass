import React, { useState } from 'react';
import styles from './studentProfile.module.css';

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

interface StudentProfileViewProps {
  student: Student;
  onBack: () => void;
}

export const StudentProfileView: React.FC<StudentProfileViewProps> = ({ student, onBack }) => {
  const [activeTab, setActiveTab] = useState('Overview');

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const tabs = ['Overview', 'Academic', 'Attendance', 'Assignments', 'Grades', 'Documents', 'Parent / Guardian', 'History'];

  return (
    <div className={styles.container}>
      {/* Breadcrumbs */}
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
              <h2>{student.name}</h2>
              <span className={styles.statusBadge}>{student.status} Student</span>
            </div>
            <div className={styles.avatarExtraBlock}>
              {/* Reserved for future 2nd column data */}
            </div>
          </div>
          
          <div className={styles.avatarBottomHalf}>
            <div className={styles.avatarMetaGrid}>
                <div className={styles.metaItem}>
                  <svg className={styles.metaIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                  <div className={styles.metaText}>
                    <span className={styles.metaLabel}>Grade & Section</span>
                    <span className={styles.metaVal}>{student.gradeSection}</span>
                  </div>
                </div>
                <div className={styles.metaItem}>
                  <svg className={styles.metaIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  <div className={styles.metaText}>
                    <span className={styles.metaLabel}>Student ID</span>
                    <span className={styles.metaVal}>{student.studentId}</span>
                  </div>
                </div>
                <div className={styles.metaItem}>
                  <svg className={styles.metaIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                  <div className={styles.metaText}>
                    <span className={styles.metaLabel}>LRN</span>
                    <span className={styles.metaVal}>123456789101</span>
                  </div>
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
              <span>Date of Birth</span>
              <span>March 15, 2009</span>
            </div>
            <div className={styles.detailRow}>
              <span>Age</span>
              <span>16 years old</span>
            </div>
            <div className={styles.detailRow}>
              <span>Gender</span>
              <span>Male</span>
            </div>
            <div className={styles.detailRow}>
              <span>Nationality</span>
              <span>Filipino</span>
            </div>
            <div className={styles.detailRow}>
              <span>Blood Type</span>
              <span>O+</span>
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
              <span>Adviser</span>
              <span>Mrs. Liza Mendoza</span>
            </div>
            <div className={styles.detailRow}>
              <span>School Year</span>
              <span>2025 - 2026</span>
            </div>
            <div className={styles.detailRow}>
              <span>Date Enrolled</span>
              <span>{student.dateEnrolled}</span>
            </div>
            <div className={styles.detailRow}>
              <span>Status</span>
              <span style={{ color: '#5cc789' }}>{student.status}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabsContainer}>
        {tabs.map(tab => (
          <button 
            key={tab} 
            className={`${styles.tabBtn} ${activeTab === tab ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'Overview' && (
        <div className={styles.overviewGrid}>
          {/* Enrollment Info */}
          <div className={styles.infoCard}>
            <div className={styles.infoCardHeader}>
              <div className={styles.infoCardIcon} style={{ background: 'rgba(132, 169, 255, 0.1)', color: '#84a9ff' }}>📅</div>
              <span className={styles.infoCardTitle}>Enrollment Information</span>
            </div>
            <div className={styles.detailsGrid}>
              <div className={styles.detailRow}>
                <span>Date Enrolled</span>
                <span>{student.dateEnrolled}</span>
              </div>
              <div className={styles.detailRow}>
                <span>School Year</span>
                <span>2025 - 2026</span>
              </div>
              <div className={styles.detailRow}>
                <span>Status</span>
                <span className={styles.statusBadge}>{student.status}</span>
              </div>
              <div className={styles.detailRow}>
                <span>Previous School</span>
                <span>Quezon City Science High School</span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className={styles.infoCard}>
            <div className={styles.infoCardHeader}>
              <div className={styles.infoCardIcon} style={{ background: 'rgba(245, 200, 66, 0.1)', color: '#f5c842' }}>📞</div>
              <span className={styles.infoCardTitle}>Contact Information</span>
            </div>
            <div className={styles.detailsGrid}>
              <div className={styles.detailRow} style={{ gridColumn: '1 / -1' }}>
                <span>Address</span>
                <span>123 Sampaguita St., Barangay 12, Quezon City</span>
              </div>
              <div className={styles.detailRow}>
                <span>Contact Number</span>
                <span>{student.contact}</span>
              </div>
              <div className={styles.detailRow}>
                <span>Email</span>
                <span>{student.email}</span>
              </div>
            </div>
          </div>

          {/* Parent/Guardian */}
          <div className={styles.infoCard}>
            <div className={styles.infoCardHeader}>
              <div className={styles.infoCardIcon} style={{ background: 'rgba(255, 126, 147, 0.1)', color: '#ff7e93' }}>👥</div>
              <span className={styles.infoCardTitle}>Parent / Guardian</span>
            </div>
            <div className={styles.detailsGrid}>
              <div className={styles.detailRow}>
                <span>Father</span>
                <span>Pedro Dela Cruz</span>
              </div>
              <div className={styles.detailRow}>
                <span>0917 876 5432</span>
              </div>
              <div className={styles.detailRow}>
                <span>Mother</span>
                <span>Maria Dela Cruz</span>
              </div>
              <div className={styles.detailRow}>
                <span>0908 765 4321</span>
              </div>
              <div className={styles.detailRow}>
                <span>Guardian</span>
                <span>None</span>
              </div>
              <div className={styles.detailRow}>
                <span>-</span>
              </div>
              <div className={styles.detailRow}>
                <span>Emergency Contact</span>
                <span>{student.parentGuardian} (Father)</span>
              </div>
              <div className={styles.detailRow}>
                <span>{student.contact}</span>
              </div>
            </div>
          </div>

          {/* Quick Statistics */}
          <div className={styles.infoCard}>
            <div className={styles.infoCardHeader}>
              <div className={styles.infoCardIcon} style={{ background: 'rgba(255, 171, 107, 0.1)', color: '#ffab6b' }}>📊</div>
              <span className={styles.infoCardTitle}>Quick Statistics</span>
            </div>
            <div className={styles.statsRow}>
              <div className={styles.statBox}>
                <div className={styles.statIcon} style={{ background: 'rgba(245, 200, 66, 0.1)', color: '#f5c842' }}>🏅</div>
                <div className={styles.statLabel}>General Average</div>
                <div className={styles.statVal}>89.15</div>
                <div className={styles.statSub}>Very Good</div>
              </div>
              <div className={styles.statBox}>
                <div className={styles.statIcon} style={{ background: 'rgba(92, 199, 137, 0.1)', color: '#5cc789' }}>📅</div>
                <div className={styles.statLabel}>Attendance</div>
                <div className={styles.statVal}>96%</div>
                <div className={styles.statSub}>This School Year</div>
              </div>
              <div className={styles.statBox}>
                <div className={styles.statIcon} style={{ background: 'rgba(132, 169, 255, 0.1)', color: '#84a9ff' }}>📖</div>
                <div className={styles.statLabel}>Subjects</div>
                <div className={styles.statVal}>8</div>
                <div className={styles.statSub}>This School Year</div>
              </div>
              <div className={styles.statBox}>
                <div className={styles.statIcon} style={{ background: 'rgba(182, 142, 255, 0.1)', color: '#b68eff' }}>📋</div>
                <div className={styles.statLabel}>Assignments</div>
                <div className={styles.statVal}>12 / 13</div>
                <div className={styles.statSub}>Submitted</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab !== 'Overview' && (
        <div className={styles.infoCard}>
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'rgba(240,239,237,0.4)' }}>
            <h3>{activeTab} Module</h3>
            <p>This module is currently under development.</p>
          </div>
        </div>
      )}
    </div>
  );
};
