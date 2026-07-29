import React from 'react';
import styles from '../../studentProfile.module.css';
import { UPCOMING_DEADLINES } from '../../../../../../lib/mock/studentProfile.mock';
import { InfoCard } from '../../shared/SharedComponents';

export const AssessmentFooter: React.FC = () => {
  return (
    <div className={styles.assessmentsFooterGrid}>
      
      <InfoCard title="Grade Impact" icon="📈" iconBg="rgba(132, 169, 255, 0.1)" iconColor="#84a9ff">
        <span style={{ fontSize: '0.75rem', color: 'rgba(240, 239, 237, 0.5)' }}>Based on current assessments</span>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f0efed' }}>88.45%</span>
            <span style={{ fontSize: '0.85rem', color: 'rgba(240, 239, 237, 0.5)' }}>Current Average</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#5cc789', background: 'rgba(92, 199, 137, 0.1)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>↑ 2.35%</span>
            <span style={{ fontSize: '0.75rem', color: 'rgba(240, 239, 237, 0.5)', marginTop: '0.2rem' }}>vs last 30 days</span>
          </div>
        </div>
        
        {/* Chalk-style line chart mimicking Monthly Revenue */}
        <div className={styles.gradeImpactGraph} style={{ position: 'relative' }}>
          <svg width="100%" height="100%" viewBox="0 35 200 55" fill="none" preserveAspectRatio="none">
            <defs>
              <linearGradient id="lineGrad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="rgba(182, 142, 255, 0.4)" />
                <stop offset="100%" stopColor="rgba(182, 142, 255, 0)" />
              </linearGradient>
            </defs>
            <path d="M 0 75 C 40 75, 60 70, 100 70 C 140 70, 160 35, 200 35 L 200 90 L 0 90 Z" fill="url(#lineGrad)" />
            <path d="M 0 75 C 40 75, 60 70, 100 70 C 140 70, 160 35, 200 35" fill="none" stroke="#b68eff" strokeWidth="2.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          </svg>
          {/* HTML/CSS dot tracking the exact end point of the graph (Y=35, which is top: 0 in this viewBox) */}
          <div style={{ position: 'absolute', right: '0', top: '0', width: '10px', height: '10px', background: '#b68eff', borderRadius: '50%', transform: 'translate(50%, -50%)', border: '2px solid #08120d' }}></div>
        </div>
      </InfoCard>

      <InfoCard title="Upcoming Deadlines" icon="⏰" iconBg="rgba(245, 200, 66, 0.1)" iconColor="#f5c842" headerRight={<span style={{ fontSize: '0.75rem', color: '#b68eff', fontWeight: 600, cursor: 'pointer' }}>View All</span>}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {UPCOMING_DEADLINES.map(deadline => (
            <div key={deadline.id} className={styles.deadlineItem}>
              <div className={styles.deadlineIcon}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={deadline.iconColor} strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              </div>
              <div className={styles.deadlineContent}>
                <span className={styles.deadlineTitle}>{deadline.title}</span>
                <span className={styles.deadlineSubject}>{deadline.subject}</span>
                <span className={styles.deadlineDate}>{deadline.date}</span>
              </div>
            </div>
          ))}
        </div>
      </InfoCard>

    </div>
  );
};
