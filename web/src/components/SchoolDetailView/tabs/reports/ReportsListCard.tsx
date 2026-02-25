import React from 'react';
import styles from '../../SchoolDetailView.module.css';
import { REPORT_ITEMS } from './reportsTab.mock';

export const ReportsListCard = () => (
  <div className={`${styles.detailCard} ${styles.colSpan4}`}>
    <div className={styles.detailCardHeader}>
      <h3 className={styles.detailCardTitle}>Reports List</h3>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
      {REPORT_ITEMS.map((report) => (
        <div key={report.title} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.8rem', background: 'rgba(240, 239, 237, 0.02)', border: '1px solid rgba(240, 239, 237, 0.05)', borderRadius: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ color: 'rgba(240, 239, 237, 0.4)' }}>📄</div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#f0efed' }}>{report.title}</span>
              <span style={{ fontSize: '0.7rem', color: 'rgba(240, 239, 237, 0.5)' }}>{report.desc}</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', color: 'rgba(240, 239, 237, 0.6)' }}>
            <button style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: '0.2rem' }}>👁️</button>
            <button style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: '0.2rem' }}>⬇️</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

