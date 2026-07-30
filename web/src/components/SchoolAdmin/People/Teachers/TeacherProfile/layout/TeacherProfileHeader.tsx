import React from 'react';
import styles from '../teacherProfile.module.css';
import { Teacher } from '@/lib/mock/teachers.mock';

interface TeacherProfileHeaderProps {
  teacher: Teacher;
}

export const TeacherProfileHeader: React.FC<TeacherProfileHeaderProps> = ({ teacher }) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <div className={styles.profileHeaderCard}>
      <div className={styles.avatarSection}>
        <div className={styles.avatarImageWrapper} style={{ borderColor: teacher.departmentColor }}>
          {teacher.avatar ? (
            <img src={teacher.avatar} alt={teacher.name} className={styles.avatarImage} />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', background: 'rgba(255,255,255,0.05)', color: teacher.departmentColor }}>
              {getInitials(teacher.name)}
            </div>
          )}
          <div className={styles.statusIndicator} style={{ backgroundColor: teacher.status === 'Active' ? '#34d399' : '#f59e0b' }}></div>
        </div>
      </div>
      
      <div className={styles.infoSection}>
        <div className={styles.nameRow}>
          <h2>{teacher.name}</h2>
          <span className={styles.statusBadge} style={{ backgroundColor: teacher.statusBg, color: teacher.statusColor }}>
            {teacher.status} Teacher
          </span>
        </div>
        
        <div className={styles.detailsGrid}>
          {/* Column 1 */}
          <div>
            <div className={styles.detailItem}>
              <div className={styles.detailIcon}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              </div>
              <div className={styles.detailText}>
                <span className={styles.detailLabel}>Employee ID</span>
                <span className={styles.detailValue}>{teacher.employeeId}</span>
              </div>
            </div>
            <div className={styles.detailItem} style={{ marginTop: '1rem' }}>
              <div className={styles.detailIcon}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
              </div>
              <div className={styles.detailText}>
                <span className={styles.detailLabel}>Department</span>
                <span className={styles.detailValue}>{teacher.department}</span>
              </div>
            </div>
            <div className={styles.detailItem} style={{ marginTop: '1rem' }}>
              <div className={styles.detailIcon}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              </div>
              <div className={styles.detailText}>
                <span className={styles.detailLabel}>Position</span>
                <span className={styles.detailValue}>{teacher.position || 'Teacher'}</span>
              </div>
            </div>
          </div>

          {/* Column 2 */}
          <div>
            <div className={styles.detailItem}>
              <div className={styles.detailIcon}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </div>
              <div className={styles.detailText}>
                <span className={styles.detailLabel}>Email</span>
                <span className={styles.detailValue}>{teacher.email}</span>
              </div>
            </div>
            <div className={styles.detailItem} style={{ marginTop: '1rem' }}>
              <div className={styles.detailIcon}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </div>
              <div className={styles.detailText}>
                <span className={styles.detailLabel}>Phone</span>
                <span className={styles.detailValue}>{teacher.phone || 'N/A'}</span>
              </div>
            </div>
            <div className={styles.detailItem} style={{ marginTop: '1rem' }}>
              <div className={styles.detailIcon}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              </div>
              <div className={styles.detailText}>
                <span className={styles.detailLabel}>Address</span>
                <span className={styles.detailValue} style={{ fontSize: '0.8rem', lineHeight: '1.2' }}>{teacher.address || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Column 3 */}
          <div>
            <div className={styles.detailItem}>
              <div className={styles.detailIcon}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              </div>
              <div className={styles.detailText}>
                <span className={styles.detailLabel}>Date Hired</span>
                <span className={styles.detailValue}>{teacher.dateHired || 'N/A'}</span>
              </div>
            </div>
            <div className={styles.detailItem} style={{ marginTop: '1rem' }}>
              <div className={styles.detailIcon}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
              </div>
              <div className={styles.detailText}>
                <span className={styles.detailLabel}>Employment Type</span>
                <span className={styles.detailValue}>{teacher.employmentType || 'Full-time'}</span>
              </div>
            </div>
            <div className={styles.detailItem} style={{ marginTop: '1rem' }}>
              <div className={styles.detailIcon}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
              </div>
              <div className={styles.detailText}>
                <span className={styles.detailLabel}>Highest Education</span>
                <span className={styles.detailValue} style={{ fontSize: '0.8rem', lineHeight: '1.2' }}>{teacher.highestEducation || 'N/A'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
