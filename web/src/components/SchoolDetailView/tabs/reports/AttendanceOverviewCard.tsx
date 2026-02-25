import React from 'react';
import styles from '../../SchoolDetailView.module.css';

export const AttendanceOverviewCard = () => (
  <div className={`${styles.detailCard} ${styles.colSpan4}`}>
    <div className={styles.detailCardHeader}>
      <h3 className={styles.detailCardTitle}>Attendance Overview</h3>
      <div style={{ position: 'relative' }}>
        <select className={styles.chartSelect} style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem', appearance: 'none', paddingRight: '1.5rem' }}>
          <option>This Month</option>
        </select>
        <span style={{ position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)', fontSize: '0.6rem', opacity: 0.5, pointerEvents: 'none' }}>▼</span>
      </div>
    </div>
    <div className={styles.donutWrapper}>
      <div style={{ width: '140px', height: '140px', position: 'relative', flexShrink: 0 }}>
        <svg width="100%" height="100%" viewBox="0 0 120 120" style={{ filter: 'url(#chalk-wobble)' }}>
          <circle cx="60" cy="60" r="45" fill="none" stroke="#4df58a" strokeWidth="12" strokeDasharray="261.2 282.74" strokeDashoffset="0" transform="rotate(-90 60 60)" strokeLinecap="round" />
          <circle cx="60" cy="60" r="45" fill="none" stroke="#f5c842" strokeWidth="12" strokeDasharray="15.8 282.74" strokeDashoffset="-261.2" transform="rotate(-90 60 60)" strokeLinecap="round" />
          <circle cx="60" cy="60" r="45" fill="none" stroke="#ff8a8a" strokeWidth="12" strokeDasharray="5.6 282.74" strokeDashoffset="-277" transform="rotate(-90 60 60)" strokeLinecap="round" />
        </svg>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>92.4%</span>
          <span style={{ fontSize: '0.7rem', color: 'rgba(240, 239, 237, 0.6)' }}>Average Rate</span>
        </div>
      </div>
      <div className={styles.legendList} style={{ fontSize: '0.8rem' }}>
        {[
          { label: 'Present', value: '92.4%', color: '#4df58a' },
          { label: 'Late', value: '5.6%', color: '#f5c842' },
          { label: 'Absent', value: '2.0%', color: '#ff8a8a' },
        ].map(item => (
          <div key={item.label} className={styles.legendItem}>
            <span className={styles.legendColorLabel}><span className={styles.legendDot} style={{ background: item.color }} /> {item.label}</span>
            <span className={styles.legendValue}>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

