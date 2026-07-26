import React from 'react';
import styles from '../studentProfile.module.css';

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
                <tr>
                  <td>
                    <div className={styles.subjectCell}>
                      <div className={styles.subjectIcon} style={{ background: 'rgba(182, 142, 255, 0.1)', color: '#b68eff' }}>📐</div>
                      General Mathematics
                    </div>
                  </td>
                  <td>Mr. Richard Gomez</td>
                  <td>1.5</td>
                  <td className={styles.gradeCell}>92</td>
                  <td className={styles.gradeCell}>90</td>
                </tr>
                <tr>
                  <td>
                    <div className={styles.subjectCell}>
                      <div className={styles.subjectIcon} style={{ background: 'rgba(132, 169, 255, 0.1)', color: '#84a9ff' }}>📖</div>
                      English for Academic Purposes
                    </div>
                  </td>
                  <td>Ms. Anna Reyes</td>
                  <td>1.5</td>
                  <td className={styles.gradeCell}>88</td>
                  <td className={styles.gradeCell}>87</td>
                </tr>
                <tr>
                  <td>
                    <div className={styles.subjectCell}>
                      <div className={styles.subjectIcon} style={{ background: 'rgba(255, 171, 107, 0.1)', color: '#ffab6b' }}>🔬</div>
                      Physical Science
                    </div>
                  </td>
                  <td>Mr. James Cruz</td>
                  <td>1.5</td>
                  <td className={styles.gradeCell}>85</td>
                  <td className={styles.gradeCell}>86</td>
                </tr>
                <tr>
                  <td>
                    <div className={styles.subjectCell}>
                      <div className={styles.subjectIcon} style={{ background: 'rgba(92, 199, 137, 0.1)', color: '#5cc789' }}>🗣️</div>
                      Filipino sa Piling Larangan
                    </div>
                  </td>
                  <td>Ms. Carla Santos</td>
                  <td>1.5</td>
                  <td className={styles.gradeCell}>91</td>
                  <td className={styles.gradeCell}>92</td>
                </tr>
                <tr>
                  <td>
                    <div className={styles.subjectCell}>
                      <div className={styles.subjectIcon} style={{ background: 'rgba(182, 142, 255, 0.1)', color: '#b68eff' }}>🌍</div>
                      World History
                    </div>
                  </td>
                  <td>Mr. Daniel Tan</td>
                  <td>1.5</td>
                  <td className={styles.gradeCell}>87</td>
                  <td className={styles.gradeCell}>88</td>
                </tr>
                <tr>
                  <td>
                    <div className={styles.subjectCell}>
                      <div className={styles.subjectIcon} style={{ background: 'rgba(132, 169, 255, 0.1)', color: '#84a9ff' }}>💻</div>
                      Computer Programming 1
                    </div>
                  </td>
                  <td>Ms. Liza Mendoza</td>
                  <td>1.5</td>
                  <td className={styles.gradeCell}>93</td>
                  <td className={styles.gradeCell}>94</td>
                </tr>
                <tr>
                  <td>
                    <div className={styles.subjectCell}>
                      <div className={styles.subjectIcon} style={{ background: 'rgba(255, 126, 147, 0.1)', color: '#ff7e93' }}>🏃</div>
                      Physical Education and Health
                    </div>
                  </td>
                  <td>Mr. Mark Garcia</td>
                  <td>1.0</td>
                  <td className={styles.gradeCell}>95</td>
                  <td className={styles.gradeCell}>95</td>
                </tr>
                <tr>
                  <td>
                    <div className={styles.subjectCell}>
                      <div className={styles.subjectIcon} style={{ background: 'rgba(245, 200, 66, 0.1)', color: '#f5c842' }}>✝️</div>
                      Christian Living Education
                    </div>
                  </td>
                  <td>Rev. John Paul</td>
                  <td>1.0</td>
                  <td className={styles.gradeCell}>90</td>
                  <td className={styles.gradeCell}>90</td>
                </tr>
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
            <div className={styles.summaryCard}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <div className={styles.summaryCardIcon} style={{ background: 'rgba(182, 142, 255, 0.1)', color: '#b68eff' }}>🎓</div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span className={styles.summaryCardLabel}>General Average</span>
                  <span className={styles.summaryCardValue}>89.15</span>
                </div>
              </div>
              <span className={styles.summaryCardSub} style={{ color: '#b68eff' }}>Very Good</span>
            </div>
            
            <div className={styles.summaryCard}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <div className={styles.summaryCardIcon} style={{ background: 'rgba(92, 199, 137, 0.1)', color: '#5cc789' }}>📈</div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span className={styles.summaryCardLabel}>GPA</span>
                  <span className={styles.summaryCardValue}>3.41</span>
                </div>
              </div>
              <span className={styles.summaryCardSub}>Very Good</span>
            </div>
            
            <div className={styles.summaryCard}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <div className={styles.summaryCardIcon} style={{ background: 'rgba(132, 169, 255, 0.1)', color: '#84a9ff' }}>📘</div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span className={styles.summaryCardLabel}>Total Units Earned</span>
                  <span className={styles.summaryCardValue}>11.0</span>
                </div>
              </div>
              <span className={styles.summaryCardSub} style={{ color: '#84a9ff' }}>This School Year</span>
            </div>
            
            <div className={styles.summaryCard}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <div className={styles.summaryCardIcon} style={{ background: 'rgba(255, 171, 107, 0.1)', color: '#ffab6b' }}>🏅</div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span className={styles.summaryCardLabel}>Academic Standing</span>
                  <span className={styles.summaryCardValue} style={{ fontSize: '1rem' }}>Very Good</span>
                </div>
              </div>
              <span className={styles.summaryCardSub} style={{ color: 'rgba(240,239,237,0.5)', fontWeight: 400 }}>With Honors</span>
            </div>
          </div>
        </div>

        {/* Ranking & Honors */}
        <div className={styles.infoCard} style={{ padding: '1.2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div className={styles.academicSectionTitle}>Ranking & Honors</div>
          
          <div className={styles.rankingCard}>
            <div className={styles.summaryCardIcon} style={{ background: 'rgba(182, 142, 255, 0.1)', color: '#b68eff' }}>🏆</div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span className={styles.summaryCardLabel}>Class Ranking</span>
              <span className={styles.summaryCardValue} style={{ fontSize: '1.2rem' }}>12 of 58</span>
              <span className={styles.summaryCardSub} style={{ color: 'rgba(240,239,237,0.5)', fontWeight: 400 }}>Top 20.7%</span>
            </div>
          </div>

          <div className={styles.rankingCard}>
            <div className={styles.summaryCardIcon} style={{ background: 'rgba(245, 200, 66, 0.1)', color: '#f5c842' }}>🎖️</div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span className={styles.summaryCardLabel}>Honors</span>
              <span className={styles.summaryCardValue} style={{ fontSize: '1.2rem' }}>With Honors</span>
              <span className={styles.summaryCardSub} style={{ color: 'rgba(240,239,237,0.5)', fontWeight: 400 }}>Q1 Grading</span>
            </div>
          </div>

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
              <tr>
                <td style={{ fontWeight: 600 }}>07:30 AM - 08:30 AM</td>
                <td style={{ color: '#84a9ff', fontWeight: 500 }}>General Mathematics</td>
                <td>Mr. Richard Gomez</td>
                <td>Room 201</td>
                <td>Mon, Wed, Fri</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>08:30 AM - 09:30 AM</td>
                <td style={{ color: '#84a9ff', fontWeight: 500 }}>English for Academic Purposes</td>
                <td>Ms. Anna Reyes</td>
                <td>Room 205</td>
                <td>Mon, Wed, Fri</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>09:30 AM - 10:30 AM</td>
                <td style={{ color: '#84a9ff', fontWeight: 500 }}>Physical Science</td>
                <td>Mr. James Cruz</td>
                <td>Science Lab 1</td>
                <td>Tue, Thu</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>10:30 AM - 11:30 AM</td>
                <td style={{ color: '#84a9ff', fontWeight: 500 }}>Filipino sa Piling Larangan</td>
                <td>Ms. Carla Santos</td>
                <td>Room 204</td>
                <td>Tue, Thu</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>01:00 PM - 02:00 PM</td>
                <td style={{ color: '#84a9ff', fontWeight: 500 }}>World History</td>
                <td>Mr. Daniel Tan</td>
                <td>Room 203</td>
                <td>Mon, Wed</td>
              </tr>
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
