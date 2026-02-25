import React from 'react';
import styles from '../../SchoolDetailView.module.css';

export const StudentDistributionCard = () => (
  <div className={`${styles.detailCard} ${styles.colSpan4}`}>
    <div className={styles.detailCardHeader}>
      <h3 className={styles.detailCardTitle}>Student Distribution by Grade Level</h3>
    </div>
    <div className={styles.donutWrapper}>
      <div style={{ width: '140px', height: '140px', position: 'relative', flexShrink: 0 }}>
        <svg width="100%" height="100%" viewBox="0 0 120 120" style={{ filter: 'url(#chalk-wobble)' }}>
          <circle cx="60" cy="60" r="45" fill="none" stroke="#84a9ff" strokeWidth="12" strokeDasharray="70.68 282.74" strokeDashoffset="0" transform="rotate(-90 60 60)" />
          <circle cx="60" cy="60" r="45" fill="none" stroke="#b884ff" strokeWidth="12" strokeDasharray="71.8 282.74" strokeDashoffset="-70.68" transform="rotate(-90 60 60)" />
          <circle cx="60" cy="60" r="45" fill="none" stroke="#f5c842" strokeWidth="12" strokeDasharray="69.55 282.74" strokeDashoffset="-142.48" transform="rotate(-90 60 60)" />
          <circle cx="60" cy="60" r="45" fill="none" stroke="#ff8a8a" strokeWidth="12" strokeDasharray="70.7 282.74" strokeDashoffset="-212.03" transform="rotate(-90 60 60)" />
        </svg>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>512</span>
          <span style={{ fontSize: '0.7rem', color: 'rgba(240, 239, 237, 0.6)' }}>Students</span>
        </div>
      </div>
      <div className={styles.legendList} style={{ fontSize: '0.8rem' }}>
        {[
          { label: 'Grade 7', value: '128', pct: '25.0%', color: '#84a9ff' },
          { label: 'Grade 8', value: '130', pct: '25.4%', color: '#b884ff' },
          { label: 'Grade 9', value: '126', pct: '24.6%', color: '#f5c842' },
          { label: 'Grade 10', value: '128', pct: '25.0%', color: '#ff8a8a' },
        ].map(item => (
          <div key={item.label} className={styles.legendItem}>
            <span className={styles.legendColorLabel}><span className={styles.legendDot} style={{ background: item.color }} /> {item.label}</span>
            <span className={styles.legendValue}>{item.value} <span style={{ color: 'rgba(240, 239, 237, 0.45)' }}>({item.pct})</span></span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

