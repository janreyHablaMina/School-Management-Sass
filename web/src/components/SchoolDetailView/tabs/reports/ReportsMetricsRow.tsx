import React from 'react';
import styles from '../../SchoolDetailView.module.css';
import { METRIC_CARDS } from './reportsTab.mock';

export const ReportsMetricsRow = () => (
  <div className={styles.studentsTopGrid} style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
    {METRIC_CARDS.map((m) => (
      <div
        key={m.label}
        className={styles.detailCard}
        style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.2rem' }}
      >
        <div
          className={styles.studentMetricIcon}
          style={{ background: m.iconBg, color: m.iconColor, borderColor: 'transparent' }}
        >
          {m.icon}
        </div>
        <div>
          <div style={{ fontSize: '0.75rem', color: 'rgba(240, 239, 237, 0.6)', marginBottom: '0.2rem' }}>
            {m.label}
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f0efed' }}>{m.value}</div>
          <div style={{ fontSize: '0.7rem', color: m.deltaColor, marginTop: '0.2rem' }}>{m.delta}</div>
        </div>
      </div>
    ))}
  </div>
);
