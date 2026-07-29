import React from 'react';
import styles from '../../studentProfile.module.css';
import { SUBJECTS_DATA, SCHEDULE_DATA, SUMMARY_DATA, RANKING_DATA } from '../../data/mockData';

export const AcademicTab: React.FC = () => {
  return (
    <>
      <div className={styles.academicGrid}>
        {/* Left Column */}
        <div className={styles.leftColumn} style={{ display: 'flex', flexDirection: 'column' }}>
          
          {/* Subjects Table */}
          <div className={styles.infoCard} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div className={styles.academicSectionTitle}>Subjects This School Year</div>
            
            <div className={styles.academicTableWrapper}>
              <table className={styles.academicTable}>
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Teacher</th>
                    <th>Units</th>
                    <th>Quarter</th>
                    <th>Final Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {SUBJECTS_DATA.map((subject) => (
                    <tr key={subject.id}>
                      <td>
                        <div className={styles.subjectCell}>
                          <div className={styles.subjectIcon} style={{ background: subject.iconBg, color: subject.iconColor }}>
                            {subject.icon}
                          </div>
                          {subject.name}
                        </div>
                      </td>
                      <td>{subject.teacher}</td>
                      <td>{subject.units.toFixed(1)}</td>
                      <td className={styles.gradeCell}>{subject.quarterGrade}</td>
                      <td className={styles.gradeCell}>{subject.finalGrade}</td>
                    </tr>
                  ))}
                  <tr className={styles.unitsTotalRow}>
                    <td colSpan={2}>Total</td>
                    <td>11.0</td>
                    <td style={{ color: '#5cc789' }}>90.13</td>
                    <td style={{ color: '#5cc789' }}>90.25</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'auto' }}>
              <button className={styles.outlineBtn}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                View Full Report Card
              </button>
            </div>
          </div>

        </div>

        {/* Right Column */}
        <div className={styles.rightColumn} style={{ display: 'flex', flexDirection: 'column' }}>
          
          {/* Academic Summary */}
          <div className={styles.infoCard} style={{ marginBottom: '1.5rem', padding: '1.2rem' }}>
            <div className={styles.academicSectionTitle}>Academic Summary</div>
            
            <div className={styles.summaryGrid}>
              {SUMMARY_DATA.map((summary) => (
                <div key={summary.id} className={styles.summaryCard}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <div className={styles.summaryCardIcon} style={{ background: summary.iconBg, color: summary.iconColor }}>
                      {summary.icon}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span className={styles.summaryCardLabel}>{summary.label}</span>
                      <span className={styles.summaryCardValue} style={summary.label === 'Academic Standing' ? { fontSize: '1rem' } : {}}>
                        {summary.value}
                      </span>
                    </div>
                  </div>
                  <span className={styles.summaryCardSub} style={{ color: summary.subTextColor, fontWeight: summary.label === 'Academic Standing' ? 400 : 500 }}>
                    {summary.subText}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Ranking & Honors */}
          <div className={styles.infoCard} style={{ padding: '1.2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div className={styles.academicSectionTitle}>Ranking & Honors</div>
            
            {RANKING_DATA.map((ranking) => (
              <div key={ranking.id} className={styles.rankingCard}>
                <div className={styles.summaryCardIcon} style={{ background: ranking.iconBg, color: ranking.iconColor }}>
                  {ranking.icon}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span className={styles.summaryCardLabel}>{ranking.label}</span>
                  <span className={styles.summaryCardValue} style={{ fontSize: '1.2rem' }}>{ranking.value}</span>
                  <span className={styles.summaryCardSub} style={{ color: 'rgba(240,239,237,0.5)', fontWeight: 400 }}>{ranking.subText}</span>
                </div>
              </div>
            ))}

            <div style={{ marginTop: 'auto', paddingTop: '0.5rem' }}>
              <button className={styles.linkBtn}>
                View All Honors &rarr;
              </button>
            </div>
          </div>

        </div>
      </div>
      
      {/* Class Schedule Table (Full Width) */}
      <div className={styles.infoCard} style={{ marginTop: '1.5rem' }}>
        <div className={styles.academicSectionTitle}>Class Schedule</div>
        
        <div className={styles.academicTableWrapper}>
          <table className={styles.academicTable}>
            <thead>
              <tr>
                <th>Time</th>
                <th>Subject</th>
                <th>Teacher</th>
                <th>Room</th>
                <th>Day</th>
              </tr>
            </thead>
            <tbody>
              {SCHEDULE_DATA.map((schedule) => (
                <tr key={schedule.id}>
                  <td style={{ fontWeight: 600 }}>{schedule.time}</td>
                  <td style={{ color: '#84a9ff', fontWeight: 500 }}>{schedule.subject}</td>
                  <td>{schedule.teacher}</td>
                  <td>{schedule.room}</td>
                  <td>{schedule.day}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div style={{ marginTop: '0.5rem' }}>
          <button className={styles.linkBtn}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            View Full Schedule &rarr;
          </button>
        </div>
      </div>
    </>
  );
};
