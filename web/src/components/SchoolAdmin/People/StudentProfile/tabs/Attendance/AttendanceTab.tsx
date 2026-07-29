import React from 'react';
import styles from '../../studentProfile.module.css';
import { ATTENDANCE_OVERVIEW_DATA, ATTENDANCE_CHART_DATA, ATTENDANCE_SUBJECT_DATA } from '../../data/mockData';

export const AttendanceTab: React.FC = () => {
  // Helper to determine bar color based on rate
  const getBarColor = (rate: number) => {
    if (rate >= 90) return '#5cc789'; // Green
    if (rate >= 80) return '#f5c842'; // Yellow
    return '#ff7e93'; // Red
  };

  return (
    <>
      {/* Top Grid: Overview Cards & Monthly Chart */}
      <div className={styles.attendanceGridTop}>
        
        {/* Left: Overview Cards */}
        <div className={styles.infoCard}>
          <div className={styles.academicSectionTitle}>Attendance Overview</div>
          <div className={styles.attendanceOverviewGrid} style={{ marginTop: '1rem' }}>
            {ATTENDANCE_OVERVIEW_DATA.map((item) => (
              <div key={item.id} className={styles.summaryCard} style={{ padding: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <div className={styles.summaryCardIcon} style={{ background: item.iconBg, color: item.iconColor }}>
                    {item.icon}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span className={styles.summaryCardLabel}>{item.label}</span>
                    <span className={styles.summaryCardValue} style={{ fontSize: '1.2rem' }}>{item.value}</span>
                  </div>
                </div>
                <span className={styles.summaryCardSub} style={{ color: 'rgba(240,239,237,0.5)', marginTop: '0.5rem', display: 'block' }}>
                  {item.subText}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Summary by Month Chart */}
        <div className={styles.infoCard}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className={styles.academicSectionTitle}>Attendance Summary by Month</div>
            <select className={styles.customSelect}>
              <option>This School Year</option>
            </select>
          </div>
          
          <div className={styles.chartContainer}>
            <div className={styles.chartArea}>
              <div className={styles.yAxis}>
                <span>100%</span>
                <span>75%</span>
                <span>50%</span>
                <span>25%</span>
                <span>0%</span>
              </div>
              
              {ATTENDANCE_CHART_DATA.map((data, index) => (
                <div key={index} className={styles.barCol}>
                  <div 
                    className={styles.bar} 
                    style={{ 
                      height: `${data.rate}%`, 
                      backgroundColor: getBarColor(data.rate) 
                    }} 
                  />
                  <span className={styles.barLabel}>{data.month}</span>
                </div>
              ))}
            </div>
            
            <div className={styles.chartLegend}>
              <div className={styles.legendItem}>
                <div className={styles.legendDot} style={{ backgroundColor: '#5cc789' }}></div>
                <span>90% - 100%</span>
              </div>
              <div className={styles.legendItem}>
                <div className={styles.legendDot} style={{ backgroundColor: '#f5c842' }}></div>
                <span>80% - 89%</span>
              </div>
              <div className={styles.legendItem}>
                <div className={styles.legendDot} style={{ backgroundColor: '#ff7e93' }}></div>
                <span>Below 80%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Subject Table & Details */}
      <div className={styles.attendanceGridBottom}>
        
        {/* Left: Subject Table */}
        <div className={styles.infoCard}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className={styles.academicSectionTitle}>Attendance by Subject / Class</div>
            <div style={{ display: 'flex', gap: '0.8rem' }}>
              <select className={styles.customSelect}>
                <option>This School Year</option>
              </select>
              <button className={styles.outlineBtn} style={{ padding: '0.3rem 0.8rem' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                Export
              </button>
            </div>
          </div>

          <div className={styles.attendanceTableWrapper}>
            <table className={styles.attendanceTable}>
              <thead>
                <tr>
                  <th>Subject / Class</th>
                  <th>Teacher</th>
                  <th>Schedule</th>
                  <th>Present</th>
                  <th>Late</th>
                  <th>Absent</th>
                  <th>Attendance Rate</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {ATTENDANCE_SUBJECT_DATA.map((row) => (
                  <tr key={row.id}>
                    <td>
                      <div className={styles.subjectCell}>
                        <div className={styles.subjectIcon} style={{ background: row.iconBg, color: row.iconColor, width: '24px', height: '24px', fontSize: '12px' }}>
                          {row.icon}
                        </div>
                        <span style={{ fontWeight: 500, fontSize: '0.85rem' }}>{row.subject}</span>
                      </div>
                    </td>
                    <td style={{ fontSize: '0.85rem' }}>{row.teacher}</td>
                    <td style={{ fontSize: '0.85rem' }}>{row.schedule}</td>
                    <td style={{ color: '#5cc789', fontWeight: 600, textAlign: 'center' }}>{row.daysPresent}</td>
                    <td style={{ color: '#f5c842', fontWeight: 600, textAlign: 'center' }}>{row.daysLate}</td>
                    <td style={{ color: '#ff7e93', fontWeight: 600, textAlign: 'center' }}>{row.daysAbsent}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div className={styles.progressBarContainer}>
                          <div className={styles.progressBarFill} style={{ width: `${row.rate}%`, backgroundColor: getBarColor(row.rate) }} />
                        </div>
                        <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{row.rate}%</span>
                      </div>
                    </td>
                    <td style={{ color: 'rgba(240,239,237,0.4)', cursor: 'pointer' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
