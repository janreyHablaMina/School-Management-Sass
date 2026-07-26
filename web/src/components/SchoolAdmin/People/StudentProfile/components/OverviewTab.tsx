import React from 'react';
import styles from '../studentProfile.module.css';
import { Student } from './types';

interface OverviewTabProps {
  student: Student;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ student }) => {
  return (
    <>
        <div className={styles.overviewGrid}>
          {/* Enrollment Info */}
          <div className={styles.infoCard}>
            <div className={styles.infoCardHeader}>
              <div className={styles.infoCardIcon} style={{ background: 'rgba(132, 169, 255, 0.1)', color: '#84a9ff' }}>📅</div>
              <span className={styles.infoCardTitle}>Enrollment Information</span>
            </div>
            <div className={styles.detailsGrid}>
              <div className={styles.detailRow}>
                <span>Enrollment Type</span>
                <span>Transferee</span>
              </div>
              <div className={styles.detailRow}>
                <span>Admission Date</span>
                <span>{student.dateEnrolled}</span>
              </div>
              <div className={styles.detailRow}>
                <span>Curriculum</span>
                <span>Basic Education (K-12)</span>
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', padding: '0.5rem 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {/* Avatar */}
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(255,126,147,0.8), rgba(182,142,255,0.8))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: '1.1rem', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                  PD
                </div>
                {/* Info */}
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <span style={{ fontSize: '1.05rem', color: '#f0efed', fontWeight: 600 }}>Pedro Dela Cruz</span>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#ff7e93', fontWeight: 600, marginTop: '2px', letterSpacing: '0.5px' }}>Primary Guardian • Father</span>
                </div>
                {/* Status Badge */}
                <div style={{ background: 'rgba(92, 199, 137, 0.1)', color: '#5cc789', fontSize: '0.65rem', padding: '4px 8px', borderRadius: '4px', fontWeight: 700, border: '1px solid rgba(92, 199, 137, 0.2)', textTransform: 'uppercase' }}>
                  Active
                </div>
              </div>

              {/* Contact Information & Icons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', background: 'rgba(255, 255, 255, 0.02)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', color: 'rgba(240, 239, 237, 0.6)' }}>Primary Contact</span>
                  <span style={{ fontSize: '0.9rem', color: '#f0efed', fontFamily: 'monospace', letterSpacing: '0.5px' }}>0917 876 5432</span>
                </div>
                
                {/* Contact Action Buttons */}
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.2rem' }}>
                  <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', background: 'rgba(132, 169, 255, 0.1)', border: '1px solid rgba(132, 169, 255, 0.2)', padding: '0.5rem', borderRadius: '6px', color: '#84a9ff', cursor: 'pointer', transition: 'all 0.2s' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>Call</span>
                  </button>
                  <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', background: 'rgba(92, 199, 137, 0.1)', border: '1px solid rgba(92, 199, 137, 0.2)', padding: '0.5rem', borderRadius: '6px', color: '#5cc789', cursor: 'pointer', transition: 'all 0.2s' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>SMS</span>
                  </button>
                  <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', background: 'rgba(182, 142, 255, 0.1)', border: '1px solid rgba(182, 142, 255, 0.2)', padding: '0.5rem', borderRadius: '6px', color: '#b68eff', cursor: 'pointer', transition: 'all 0.2s' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>Chat</span>
                  </button>
                  <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', background: 'rgba(255, 171, 107, 0.1)', border: '1px solid rgba(255, 171, 107, 0.2)', padding: '0.5rem', borderRadius: '6px', color: '#ffab6b', cursor: 'pointer', transition: 'all 0.2s' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>Email</span>
                  </button>
                </div>
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
    </>
  );
};
