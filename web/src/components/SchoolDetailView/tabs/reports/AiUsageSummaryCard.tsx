import React from 'react';
import styles from '../../SchoolDetailView.module.css';
import { AI_FEATURES } from './reportsTab.mock';

export const AiUsageSummaryCard = () => (
  <div className={`${styles.detailCard} ${styles.colSpan4}`} style={{ display: 'flex', flexDirection: 'column' }}>
    <div className={styles.detailCardHeader} style={{ marginBottom: '1.5rem' }}>
      <h3 className={styles.detailCardTitle}>AI Usage Summary</h3>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', flex: 1 }}>
      {AI_FEATURES.map((feature) => (
        <div key={feature.name} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: 'rgba(240, 239, 237, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>
            {feature.icon}
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
              <span style={{ color: 'rgba(240, 239, 237, 0.85)' }}>{feature.name}</span>
              <span>{feature.count} <span style={{ color: 'rgba(240, 239, 237, 0.45)' }}>({feature.pct}%)</span></span>
            </div>
            <div style={{ width: '100%', height: '4px', background: 'rgba(240, 239, 237, 0.1)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${feature.pct}%`, background: feature.color }} />
            </div>
          </div>
        </div>
      ))}
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(240, 239, 237, 0.1)', fontWeight: 'bold' }}>
      <span>Total Credits Used This Month</span>
      <span style={{ color: '#84a9ff' }}>100 / 100</span>
    </div>
  </div>
);

