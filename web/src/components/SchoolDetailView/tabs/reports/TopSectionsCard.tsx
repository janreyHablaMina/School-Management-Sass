import React from 'react';
import styles from '../../SchoolDetailView.module.css';
import { SECTION_RANKINGS } from './reportsTab.mock';

export const TopSectionsCard = () => (
  <div className={`${styles.detailCard} ${styles.colSpan4}`}>
    <div className={styles.detailCardHeader}>
      <h3 className={styles.detailCardTitle}>Top Performing Sections</h3>
      <span style={{ fontSize: '0.72rem', color: 'rgba(240,239,237,0.4)', fontStyle: 'italic' }}>by Average Grade</span>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1.2rem' }}>
      {SECTION_RANKINGS.map((row) => {
        const rankColor = row.rank === 1 ? '245,200,66' : row.rank === 2 ? '192,192,192' : '205,127,50';
        const isTop3 = row.rank <= 3;
        return (
          <div key={row.rank} style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', padding: '0.7rem 0.9rem', background: isTop3 ? `rgba(${rankColor}, 0.06)` : 'rgba(240,239,237,0.02)', borderRadius: '10px', border: `1px solid ${isTop3 ? `rgba(${rankColor}, 0.2)` : 'rgba(240,239,237,0.05)'}` }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: isTop3 ? row.medal : 'rgba(240,239,237,0.05)', border: `2px solid ${row.medal}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: isTop3 ? '1rem' : '0.75rem', fontWeight: 'bold', color: row.rank === 1 ? '#1a1200' : isTop3 ? '#1a1a1a' : 'rgba(240,239,237,0.6)', flexShrink: 0 }}>
              {isTop3 ? ['🥇', '🥈', '🥉'][row.rank - 1] : row.rank}
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#f0efed' }}>{row.section}</span>
              <div style={{ width: '100%', height: '4px', background: 'rgba(240,239,237,0.08)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${row.avg}%`, background: row.rank === 1 ? '#f5c842' : row.rank === 2 ? '#c0c0c0' : row.rank === 3 ? '#cd7f32' : '#84a9ff', borderRadius: '2px', transition: 'width 0.5s ease' }} />
              </div>
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 'bold', color: row.rank === 1 ? '#f5c842' : row.rank === 2 ? '#c0c0c0' : row.rank === 3 ? '#cd7f32' : 'rgba(240,239,237,0.8)', minWidth: '3.5rem', textAlign: 'right', flexShrink: 0 }}>
              {row.avg}
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

