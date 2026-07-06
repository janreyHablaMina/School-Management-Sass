import React from 'react';
import styles from '../SchoolDetailView.module.css';

export const ReportsTab = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Filters and Export Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.8rem', color: 'rgba(240, 239, 237, 0.6)' }}>Report Category</label>
            <div style={{ position: 'relative', width: '200px' }}>
              <select className={styles.chartSelect} style={{ width: '100%', background: 'rgba(10, 25, 17, 0.4)', fontFamily: 'inherit', fontSize: '0.85rem', appearance: 'none', paddingRight: '2rem' }}>
                <option>All Reports</option>
                <option>Academic</option>
                <option>Attendance</option>
                <option>AI Usage</option>
              </select>
              <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', fontSize: '0.7rem', opacity: 0.5, pointerEvents: 'none' }}>▼</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.8rem', color: 'rgba(240, 239, 237, 0.6)' }}>Date Range</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(10, 25, 17, 0.4)', border: '1px solid rgba(240, 239, 237, 0.2)', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.85rem' }}>
              <span>📅</span>
              <span>May 1, 2025 - May 31, 2025</span>
              <span style={{ fontSize: '0.7rem', opacity: 0.5 }}>▼</span>
            </div>
          </div>
        </div>
        <button className={styles.proGhostBtn} style={{ padding: '0.6rem 1.2rem', gap: '0.5rem' }}>
          <span>📥</span> Export Report
        </button>
      </div>

      {/* 6 Metric Cards Row */}
      <div className={styles.studentsTopGrid} style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        
        {/* Metric 1 */}
        <div className={styles.detailCard} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.2rem' }}>
          <div className={styles.studentMetricIcon} style={{ background: 'rgba(132, 169, 255, 0.1)', color: '#84a9ff', borderColor: 'transparent' }}>👥</div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(240, 239, 237, 0.6)', marginBottom: '0.2rem' }}>Total Students</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f0efed' }}>512</div>
            <div style={{ fontSize: '0.7rem', color: '#4df58a', marginTop: '0.2rem' }}>↑ 18 (3.7%) vs Apr 1</div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className={styles.detailCard} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.2rem' }}>
          <div className={styles.studentMetricIcon} style={{ background: 'rgba(77, 245, 138, 0.1)', color: '#4df58a', borderColor: 'transparent' }}>👨‍🏫</div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(240, 239, 237, 0.6)', marginBottom: '0.2rem' }}>Total Teachers</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f0efed' }}>45</div>
            <div style={{ fontSize: '0.7rem', color: '#4df58a', marginTop: '0.2rem' }}>↑ 3 (7.1%) vs Apr 1</div>
          </div>
        </div>

        {/* Metric 3 */}
        <div className={styles.detailCard} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.2rem' }}>
          <div className={styles.studentMetricIcon} style={{ background: 'rgba(132, 169, 255, 0.1)', color: '#84a9ff', borderColor: 'transparent' }}>🏫</div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(240, 239, 237, 0.6)', marginBottom: '0.2rem' }}>Total Sections</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f0efed' }}>18</div>
            <div style={{ fontSize: '0.7rem', color: 'rgba(240, 239, 237, 0.45)', marginTop: '0.2rem' }}>− 0 (0%) vs Apr 1</div>
          </div>
        </div>

        {/* Metric 4 */}
        <div className={styles.detailCard} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.2rem' }}>
          <div className={styles.studentMetricIcon} style={{ background: 'rgba(245, 200, 66, 0.1)', color: '#f5c842', borderColor: 'transparent' }}>📊</div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(240, 239, 237, 0.6)', marginBottom: '0.2rem' }}>Attendance Rate</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f0efed' }}>92.4%</div>
            <div style={{ fontSize: '0.7rem', color: '#4df58a', marginTop: '0.2rem' }}>↑ 4.2% vs Apr 1</div>
          </div>
        </div>


      </div>

      {/* Middle 3 Cards Row */}
      <div className={styles.detailBodyGrid}>
        
        {/* Student Enrollment Trend */}
        <div className={`${styles.detailCard} ${styles.colSpan4}`}>
          <div className={styles.detailCardHeader}>
            <h3 className={styles.detailCardTitle}>Student Enrollment Trend</h3>
            <div style={{ position: 'relative' }}>
              <select className={styles.chartSelect} style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem', appearance: 'none', paddingRight: '1.5rem' }}>
                <option>Last 6 Months</option>
              </select>
              <span style={{ position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)', fontSize: '0.6rem', opacity: 0.5, pointerEvents: 'none' }}>▼</span>
            </div>
          </div>
          <div style={{ height: '200px', width: '100%', position: 'relative', marginTop: '1rem' }}>
             <svg width="100%" height="100%" viewBox="0 0 400 200" fill="none" preserveAspectRatio="none" style={{ filter: 'url(#chalk-wobble)' }}>
               {/* Grid */}
               <line x1="30" y1="20" x2="380" y2="20" stroke="rgba(240, 239, 237, 0.05)" strokeDasharray="4 4" />
               <line x1="30" y1="60" x2="380" y2="60" stroke="rgba(240, 239, 237, 0.05)" strokeDasharray="4 4" />
               <line x1="30" y1="100" x2="380" y2="100" stroke="rgba(240, 239, 237, 0.05)" strokeDasharray="4 4" />
               <line x1="30" y1="140" x2="380" y2="140" stroke="rgba(240, 239, 237, 0.05)" strokeDasharray="4 4" />
               <line x1="30" y1="180" x2="380" y2="180" stroke="rgba(240, 239, 237, 0.15)" strokeWidth="1.5" />
               <line x1="30" y1="10" x2="30" y2="180" stroke="rgba(240, 239, 237, 0.15)" strokeWidth="1.5" />
               
               {/* Line */}
               <path d="M 60 140 L 120 125 L 180 115 L 240 100 L 300 90 L 360 85" fill="none" stroke="#84a9ff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
               <circle cx="60" cy="140" r="4" fill="#84a9ff" />
               <circle cx="120" cy="125" r="4" fill="#84a9ff" />
               <circle cx="180" cy="115" r="4" fill="#84a9ff" />
               <circle cx="240" cy="100" r="4" fill="#84a9ff" />
               <circle cx="300" cy="90" r="4" fill="#84a9ff" />
               <circle cx="360" cy="85" r="4" fill="#84a9ff" />

               {/* Labels */}
               <g fill="rgba(240, 239, 237, 0.45)" fontSize="10">
                 <text x="50" y="195">Dec '24</text>
                 <text x="110" y="195">Jan '25</text>
                 <text x="170" y="195">Feb '25</text>
                 <text x="230" y="195">Mar '25</text>
                 <text x="290" y="195">Apr '25</text>
                 <text x="350" y="195">May '25</text>
                 
                 <text x="10" y="183">0</text>
                 <text x="10" y="143">100</text>
                 <text x="10" y="103">200</text>
                 <text x="10" y="63">300</text>
                 <text x="10" y="23">400</text>
               </g>
             </svg>
          </div>
        </div>

        {/* Student Distribution */}
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
              <div className={styles.legendItem}>
                <span className={styles.legendColorLabel}><span className={styles.legendDot} style={{ background: '#84a9ff' }} /> Grade 7</span>
                <span className={styles.legendValue}>128 <span style={{ color: 'rgba(240, 239, 237, 0.45)' }}>(25.0%)</span></span>
              </div>
              <div className={styles.legendItem}>
                <span className={styles.legendColorLabel}><span className={styles.legendDot} style={{ background: '#b884ff' }} /> Grade 8</span>
                <span className={styles.legendValue}>130 <span style={{ color: 'rgba(240, 239, 237, 0.45)' }}>(25.4%)</span></span>
              </div>
              <div className={styles.legendItem}>
                <span className={styles.legendColorLabel}><span className={styles.legendDot} style={{ background: '#f5c842' }} /> Grade 9</span>
                <span className={styles.legendValue}>126 <span style={{ color: 'rgba(240, 239, 237, 0.45)' }}>(24.6%)</span></span>
              </div>
              <div className={styles.legendItem}>
                <span className={styles.legendColorLabel}><span className={styles.legendDot} style={{ background: '#ff8a8a' }} /> Grade 10</span>
                <span className={styles.legendValue}>128 <span style={{ color: 'rgba(240, 239, 237, 0.45)' }}>(25.0%)</span></span>
              </div>
            </div>
          </div>
        </div>

        {/* Attendance Overview */}
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
                {/* Present 92.4% -> 261.2 */}
                <circle cx="60" cy="60" r="45" fill="none" stroke="#4df58a" strokeWidth="12" strokeDasharray="261.2 282.74" strokeDashoffset="0" transform="rotate(-90 60 60)" strokeLinecap="round" />
                {/* Late 5.6% -> 15.8 */}
                <circle cx="60" cy="60" r="45" fill="none" stroke="#f5c842" strokeWidth="12" strokeDasharray="15.8 282.74" strokeDashoffset="-261.2" transform="rotate(-90 60 60)" strokeLinecap="round" />
                {/* Absent 2.0% -> 5.6 */}
                <circle cx="60" cy="60" r="45" fill="none" stroke="#ff8a8a" strokeWidth="12" strokeDasharray="5.6 282.74" strokeDashoffset="-277" transform="rotate(-90 60 60)" strokeLinecap="round" />
              </svg>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>92.4%</span>
                <span style={{ fontSize: '0.7rem', color: 'rgba(240, 239, 237, 0.6)' }}>Average Rate</span>
              </div>
            </div>
            <div className={styles.legendList} style={{ fontSize: '0.8rem' }}>
              <div className={styles.legendItem}>
                <span className={styles.legendColorLabel}><span className={styles.legendDot} style={{ background: '#4df58a' }} /> Present</span>
                <span className={styles.legendValue}>92.4%</span>
              </div>
              <div className={styles.legendItem}>
                <span className={styles.legendColorLabel}><span className={styles.legendDot} style={{ background: '#f5c842' }} /> Late</span>
                <span className={styles.legendValue}>5.6%</span>
              </div>
              <div className={styles.legendItem}>
                <span className={styles.legendColorLabel}><span className={styles.legendDot} style={{ background: '#ff8a8a' }} /> Absent</span>
                <span className={styles.legendValue}>2.0%</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom 3 Cards Row */}
      <div className={styles.detailBodyGrid}>
        
        {/* Top Performing Sections */}
        <div className={`${styles.detailCard} ${styles.colSpan4}`}>
          <div className={styles.detailCardHeader}>
            <h3 className={styles.detailCardTitle}>Top Performing Sections</h3>
            <span style={{ fontSize: '0.72rem', color: 'rgba(240,239,237,0.4)', fontStyle: 'italic' }}>by Average Grade</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1.2rem' }}>
            {[
              { rank: 1, section: '10A - St. John', avg: 92.45, medal: '#f5c842' },
              { rank: 2, section: '9A - St. Francis', avg: 90.12, medal: '#c0c0c0' },
              { rank: 3, section: '8A - St. Benedict', avg: 89.33, medal: '#cd7f32' },
              { rank: 4, section: '7A - St. Augustine', avg: 88.76, medal: 'rgba(240,239,237,0.3)' },
              { rank: 5, section: '9B - St. Therese', avg: 87.91, medal: 'rgba(240,239,237,0.3)' },
            ].map((row) => (
              <div key={row.rank} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.9rem',
                padding: '0.7rem 0.9rem',
                background: row.rank <= 3 ? `rgba(${row.rank === 1 ? '245,200,66' : row.rank === 2 ? '192,192,192' : '205,127,50'}, 0.06)` : 'rgba(240,239,237,0.02)',
                borderRadius: '10px',
                border: `1px solid ${row.rank <= 3 ? `rgba(${row.rank === 1 ? '245,200,66' : row.rank === 2 ? '192,192,192' : '205,127,50'}, 0.2)` : 'rgba(240,239,237,0.05)'}`,
              }}>
                {/* Rank Badge */}
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: row.rank <= 3 ? row.medal : 'rgba(240,239,237,0.05)',
                  border: `2px solid ${row.medal}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: row.rank <= 3 ? '1rem' : '0.75rem',
                  fontWeight: 'bold',
                  color: row.rank === 1 ? '#1a1200' : row.rank <= 3 ? '#1a1a1a' : 'rgba(240,239,237,0.6)',
                  flexShrink: 0,
                }}>
                  {row.rank <= 3 ? ['🥇','🥈','🥉'][row.rank - 1] : row.rank}
                </div>

                {/* Section + Bar */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#f0efed' }}>{row.section}</span>
                  <div style={{ width: '100%', height: '4px', background: 'rgba(240,239,237,0.08)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${(row.avg / 100) * 100}%`,
                      background: row.rank === 1 ? '#f5c842' : row.rank === 2 ? '#c0c0c0' : row.rank === 3 ? '#cd7f32' : '#84a9ff',
                      borderRadius: '2px',
                      transition: 'width 0.5s ease',
                    }} />
                  </div>
                </div>

                {/* Score */}
                <div style={{
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  color: row.rank === 1 ? '#f5c842' : row.rank === 2 ? '#c0c0c0' : row.rank === 3 ? '#cd7f32' : 'rgba(240,239,237,0.8)',
                  minWidth: '3.5rem',
                  textAlign: 'right',
                  flexShrink: 0,
                }}>
                  {row.avg}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Usage Summary */}
        <div className={`${styles.detailCard} ${styles.colSpan4}`} style={{ display: 'flex', flexDirection: 'column' }}>
          <div className={styles.detailCardHeader} style={{ marginBottom: '1.5rem' }}>
            <h3 className={styles.detailCardTitle}>AI Usage Summary</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', flex: 1 }}>
            {[
              { name: 'AI Quiz Generator', icon: '📝', count: 45, pct: 45, color: '#b884ff' },
              { name: 'AI Assignment Generator', icon: '📑', count: 20, pct: 20, color: '#ff8a8a' },
              { name: 'AI Reviewer Generator', icon: '🕵️', count: 20, pct: 20, color: '#84a9ff' },
              { name: 'AI Lesson Summary', icon: '📚', count: 10, pct: 10, color: '#84a9ff' },
              { name: 'AI Rubric Generator', icon: '✨', count: 5, pct: 5, color: '#84a9ff' },
            ].map((feature, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
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

        {/* Reports List */}
        <div className={`${styles.detailCard} ${styles.colSpan4}`}>
          <div className={styles.detailCardHeader}>
            <h3 className={styles.detailCardTitle}>Reports List</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
            {[
              { title: 'Student Enrollment Report', desc: 'Detailed report of student enrollment and demographics' },
              { title: 'Teacher Activity Report', desc: 'Overview of teacher activities and engagement' },
              { title: 'Attendance Report', desc: 'Detailed attendance summary and trends' },
              { title: 'Academic Performance Report', desc: 'Student performance and grade analysis' },
              { title: 'AI Usage Report', desc: 'Detailed AI features usage and credit consumption' },
            ].map((report, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.8rem', background: 'rgba(240, 239, 237, 0.02)', border: '1px solid rgba(240, 239, 237, 0.05)', borderRadius: '8px' }}>
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

      </div>

      {/* Footer Info */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0', fontSize: '0.75rem', color: 'rgba(240, 239, 237, 0.45)' }}>
        <span>Showing reports for May 1, 2025 - May 31, 2025</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>Data is updated as of May 31, 2025 11:59 PM</span>
          <span style={{ cursor: 'pointer' }}>🔄</span>
        </div>
      </div>

    </div>
  );
};
