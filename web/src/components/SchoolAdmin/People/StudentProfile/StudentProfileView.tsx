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
              <span className={styles.rowLabel}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg> Date Enrolled</span>
              <span className={styles.rowValue}>{student.dateEnrolled}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.rowLabel}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg> Status</span>
              <span className={styles.rowValue} style={{ color: '#5cc789' }}>{student.status}</span>
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
