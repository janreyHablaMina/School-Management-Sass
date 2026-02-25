import React from 'react';
import styles from '../../SchoolDetailView.module.css';

export const EnrollmentTrendCard = () => (
  <div className={`${styles.detailCard} ${styles.colSpan4}`}>
    <div className={styles.detailCardHeader}>
      <h3 className={styles.detailCardTitle}>Student Enrollment Trend</h3>
      <div style={{ position: 'relative' }}>
        <select
          className={styles.chartSelect}
          style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem', appearance: 'none', paddingRight: '1.5rem' }}
        >
          <option>Last 6 Months</option>
        </select>
        <span
          style={{
            position: 'absolute',
            right: '0.5rem',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '0.6rem',
            opacity: 0.5,
            pointerEvents: 'none',
          }}
        >
          ▼
        </span>
      </div>
    </div>
    <div style={{ height: '200px', width: '100%', position: 'relative', marginTop: '1rem' }}>
      <svg width="100%" height="100%" viewBox="0 0 400 200" fill="none" preserveAspectRatio="none" style={{ filter: 'url(#chalk-wobble)' }}>
        {/* Grid */}
        <line x1="30" y1="20"  x2="380" y2="20"  stroke="rgba(240, 239, 237, 0.05)" strokeDasharray="4 4" />
        <line x1="30" y1="60"  x2="380" y2="60"  stroke="rgba(240, 239, 237, 0.05)" strokeDasharray="4 4" />
        <line x1="30" y1="100" x2="380" y2="100" stroke="rgba(240, 239, 237, 0.05)" strokeDasharray="4 4" />
        <line x1="30" y1="140" x2="380" y2="140" stroke="rgba(240, 239, 237, 0.05)" strokeDasharray="4 4" />
        <line x1="30" y1="180" x2="380" y2="180" stroke="rgba(240, 239, 237, 0.15)" strokeWidth="1.5" />
        <line x1="30" y1="10"  x2="30"  y2="180" stroke="rgba(240, 239, 237, 0.15)" strokeWidth="1.5" />

        {/* Line */}
        <path d="M 60 140 L 120 125 L 180 115 L 240 100 L 300 90 L 360 85" fill="none" stroke="#84a9ff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="60"  cy="140" r="4" fill="#84a9ff" />
        <circle cx="120" cy="125" r="4" fill="#84a9ff" />
        <circle cx="180" cy="115" r="4" fill="#84a9ff" />
        <circle cx="240" cy="100" r="4" fill="#84a9ff" />
        <circle cx="300" cy="90"  r="4" fill="#84a9ff" />
        <circle cx="360" cy="85"  r="4" fill="#84a9ff" />

        {/* Labels */}
        <g fill="rgba(240, 239, 237, 0.45)" fontSize="10">
          <text x="50"  y="195">Dec &apos;24</text>
          <text x="110" y="195">Jan &apos;25</text>
          <text x="170" y="195">Feb &apos;25</text>
          <text x="230" y="195">Mar &apos;25</text>
          <text x="290" y="195">Apr &apos;25</text>
          <text x="350" y="195">May &apos;25</text>

          <text x="10" y="183">0</text>
          <text x="10" y="143">100</text>
          <text x="10" y="103">200</text>
          <text x="10" y="63">300</text>
          <text x="10" y="23">400</text>
        </g>
      </svg>
    </div>
  </div>
);
