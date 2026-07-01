import React from 'react';
import styles from '../SchoolDetailView.module.css';

export const AICreditsTab = ({
  mockAICreditHistory
}: {
  mockAICreditHistory: any[];
}) => {
  return (
    <section className={styles.detailBodyGrid} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top 4 Cards */}
      <div className={styles.studentsTopGrid} style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        
        {/* Card 1: AI Credits Overview */}
        <div className={styles.detailCard} style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 className={styles.detailCardTitle} style={{ marginBottom: '1.5rem' }}>AI Credits Overview</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            {/* Donut Chart */}
            <div style={{ width: '120px', height: '120px', position: 'relative' }}>
              <svg width="100%" height="100%" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="rgba(240, 239, 237, 0.1)"
                  strokeWidth="4"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#b884ff"
                  strokeWidth="4"
                  strokeDasharray="100, 100"
                />
              </svg>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#f0efed' }}>100 <span style={{ fontSize: '0.8rem', color: 'rgba(240, 239, 237, 0.6)' }}>/ 100</span></span>
                <span style={{ fontSize: '0.65rem', color: 'rgba(240, 239, 237, 0.6)', marginTop: '0.2rem' }}>Credits Used</span>
              </div>
            </div>
            
            {/* Legend */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.8rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'rgba(240, 239, 237, 0.85)' }}><span style={{ color: '#b884ff' }}>●</span> Total Credits</span>
                <span style={{ fontWeight: 'bold' }}>100</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'rgba(240, 239, 237, 0.85)' }}><span style={{ color: '#84a9ff' }}>●</span> Used Credits</span>
                <span>100 (100%)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'rgba(240, 239, 237, 0.85)' }}><span style={{ color: '#4df58a' }}>●</span> Remaining</span>
                <span>0 (0%)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'rgba(240, 239, 237, 0.85)' }}><span style={{ color: '#f5c842' }}>●</span> Resets On</span>
                <span>Jun 30, 2025</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Usage This Month */}
        <div className={styles.detailCard} style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 className={styles.detailCardTitle} style={{ marginBottom: '1rem' }}>Usage This Month</h3>
          <h2 className={styles.studentMetricVal}>100</h2>
          <span style={{ fontSize: '0.8rem', color: 'rgba(240, 239, 237, 0.6)' }}>Credits Used</span>
          <span style={{ color: '#4df58a', fontSize: '0.8rem', marginTop: '0.5rem', fontWeight: 500 }}>↑ 15.4% vs last month</span>
          
          <div style={{ flex: 1, position: 'relative', marginTop: '1rem' }}>
            <svg width="100%" height="60" viewBox="0 0 200 60" preserveAspectRatio="none" style={{ filter: 'url(#chalk-wobble)' }}>
              <path d="M0,50 L40,40 L80,45 L120,20 L160,30 L200,5" fill="none" stroke="#b884ff" strokeWidth="3" />
              <circle cx="200" cy="5" r="4" fill="#b884ff" />
            </svg>
          </div>
          
          <span style={{ fontSize: '0.75rem', color: 'rgba(240, 239, 237, 0.45)', marginTop: '0.5rem' }}>May 1 - May 31, 2025</span>
        </div>

        {/* Card 3: Top AI Features Used */}
        <div className={styles.detailCard} style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 className={styles.detailCardTitle} style={{ marginBottom: '1rem' }}>Top AI Features Used</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {[
              { name: 'AI Quiz Generator', count: 45, pct: 45, color: '#b884ff' },
              { name: 'AI Assignment Generator', count: 20, pct: 20, color: '#84a9ff' },
              { name: 'AI Reviewer Generator', count: 20, pct: 20, color: '#4df58a' },
              { name: 'AI Lesson Summary', count: 10, pct: 10, color: '#f5c842' },
              { name: 'AI Rubric Generator', count: 5, pct: 5, color: '#ff8a8a' },
            ].map((feature, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                  <span style={{ color: 'rgba(240, 239, 237, 0.85)' }}>{feature.name}</span>
                  <span>{feature.count} <span style={{ color: 'rgba(240, 239, 237, 0.45)' }}>({feature.pct}%)</span></span>
                </div>
                <div style={{ width: '100%', height: '4px', background: 'rgba(240, 239, 237, 0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${feature.pct}%`, background: feature.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card 4: Add / Manage AI Credits */}
        <div className={styles.detailCard} style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 className={styles.detailCardTitle} style={{ marginBottom: '1rem' }}>Add / Manage AI Credits</h3>
          <p style={{ fontSize: '0.85rem', color: 'rgba(240, 239, 237, 0.6)', marginBottom: '1.5rem' }}>
            Need more credits for this school?
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <button className={styles.proPrimaryBtn} style={{ padding: '0.6rem 1rem', width: '100%' }}>
              + Add AI Credits
            </button>
            <button className={styles.proGhostBtn} style={{ padding: '0.6rem 1rem', width: '100%', justifyContent: 'center' }}>
              Credit History
            </button>
          </div>
          
          <div style={{ marginTop: 'auto', paddingTop: '1.5rem' }}>
            <p style={{ fontSize: '0.75rem', color: 'rgba(240, 239, 237, 0.45)' }}>Current Plan Includes</p>
            <p style={{ fontSize: '0.85rem', fontWeight: 500, color: 'rgba(240, 239, 237, 0.85)' }}>100 credits / month</p>
          </div>
        </div>
      </div>

      {/* Credits Reset Banner */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        background: 'rgba(132, 169, 255, 0.05)', 
        border: '1px solid rgba(132, 169, 255, 0.2)', 
        borderRadius: '8px', 
        padding: '1rem 1.5rem' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ 
            width: '32px', height: '32px', borderRadius: '50%', 
            background: 'rgba(132, 169, 255, 0.15)', color: '#84a9ff', 
            display: 'flex', alignItems: 'center', justifyContent: 'center' 
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          </div>
          <div>
            <h4 style={{ margin: 0, fontSize: '0.9rem', color: '#f0efed' }}>Credits Reset</h4>
            <p style={{ margin: '0.2rem 0 0', fontSize: '0.85rem', color: 'rgba(240, 239, 237, 0.6)' }}>
              AI credits are reset every month based on the school's subscription plan.
            </p>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ margin: 0, fontSize: '0.75rem', color: 'rgba(240, 239, 237, 0.45)' }}>Next reset on</p>
          <p style={{ margin: '0.2rem 0 0', fontSize: '0.9rem', fontWeight: 500, color: '#f0efed' }}>
            June 30, 2025 <span style={{ color: '#4df58a' }}>(30 days left)</span>
          </p>
        </div>
      </div>

      {/* History Table Card */}
      <div className={styles.detailCard}>
        <div className={styles.detailCardHeader}>
          <h3 className={styles.detailCardTitle}>AI Credits Usage History</h3>
        </div>
        
        <div className={styles.studentsTableWrapper} style={{ borderTop: '1px solid rgba(240, 239, 237, 0.1)', paddingTop: '1rem', marginTop: '1rem' }}>
          <table className={styles.studentsTable}>
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>Feature Used</th>
                <th>Description</th>
                <th style={{ textAlign: 'center' }}>Credits Used</th>
                <th>Used By</th>
              </tr>
            </thead>
            <tbody>
              {mockAICreditHistory.map((item, i) => (
                <tr key={i}>
                  <td style={{ color: 'rgba(240, 239, 237, 0.85)' }}>{item.date}</td>
                  <td style={{ color: 'rgba(240, 239, 237, 0.85)', fontWeight: 500 }}>{item.feature}</td>
                  <td style={{ color: 'rgba(240, 239, 237, 0.6)' }}>{item.description}</td>
                  <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{item.credits}</td>
                  <td>
                    <div className={styles.studentProfileCell} style={{ gap: '0.8rem' }}>
                      <div className={styles.studentAvatar} style={{ 
                        background: `${item.avatarColor}20`, 
                        color: item.avatarColor, 
                        display: 'flex', alignItems: 'center', justifyContent: 'center', 
                        fontWeight: 'bold', fontSize: '0.75rem', border: `1px solid ${item.avatarColor}40` 
                      }}>
                        {item.initials}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span className={styles.studentName}>{item.user}</span>
                        <span style={{ fontSize: '0.75rem', color: 'rgba(240, 239, 237, 0.45)' }}>{item.role}</span>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className={styles.paginationWrapper} style={{ paddingTop: '1rem', marginTop: '1rem', borderTop: '1px solid rgba(240, 239, 237, 0.1)' }}>
          <span>Showing 1 to 5 of 25 records</span>
          <div className={styles.paginationControls}>
            <button className={styles.pageBtn} disabled>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button className={`${styles.pageBtn} ${styles.active}`}>1</button>
            <button className={styles.pageBtn}>2</button>
            <button className={styles.pageBtn}>3</button>
            <button className={styles.pageBtn} style={{ border: 'none', background: 'transparent' }}>...</button>
            <button className={styles.pageBtn}>5</button>
            <button className={styles.pageBtn}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
