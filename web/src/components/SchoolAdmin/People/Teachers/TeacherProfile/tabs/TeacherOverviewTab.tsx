import React from 'react';
import styles from '../teacherProfile.module.css';
import { Teacher } from '@/lib/mock/teachers.mock';

interface TeacherOverviewTabProps {
  teacher: Teacher;
}

export const TeacherOverviewTab: React.FC<TeacherOverviewTabProps> = ({ teacher }) => {
  return (
    <div>
      <div className={styles.overviewLayout}>
        {/* Left Column (Removed) */}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3>Classes Handled (SY 2025-2026)</h3>
              <a href="#" className={styles.viewAll}>View all classes</a>
            </div>
            
            <table className={styles.miniTable}>
              <thead>
                <tr>
                  <th>Class / Section</th>
                  <th>Grade Level</th>
                  <th>Students</th>
                  <th>Adviser</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontWeight: 500 }}>STEM 11 - A</td>
                  <td>Grade 11</td>
                  <td>32</td>
                  <td style={{ color: '#34d399' }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg></td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 500 }}>STEM 11 - B</td>
                  <td>Grade 11</td>
                  <td>30</td>
                  <td style={{ color: '#34d399' }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg></td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 500 }}>STEM 12 - A</td>
                  <td>Grade 12</td>
                  <td>34</td>
                  <td style={{ color: 'rgba(240, 239, 237, 0.4)' }}>-</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 500 }}>STEM 12 - B</td>
                  <td>Grade 12</td>
                  <td>32</td>
                  <td style={{ color: 'rgba(240, 239, 237, 0.4)' }}>-</td>
                </tr>
              </tbody>
            </table>

            <div className={styles.internalMetrics}>
              <div className={styles.internalMetricCard}>
                <div className={styles.internalMetricIcon} style={{ color: '#84a9ff' }}>👥</div>
                <div className={styles.internalMetricValue} style={{ color: '#84a9ff' }}>4</div>
                <div className={styles.internalMetricLabel}>Classes</div>
              </div>
              <div className={styles.internalMetricCard}>
                <div className={styles.internalMetricIcon} style={{ color: '#5cc789' }}>👨‍🎓</div>
                <div className={styles.internalMetricValue} style={{ color: '#5cc789' }}>128</div>
                <div className={styles.internalMetricLabel}>Total Students</div>
              </div>
              <div className={styles.internalMetricCard}>
                <div className={styles.internalMetricIcon} style={{ color: '#ff7e93' }}>🏅</div>
                <div className={styles.internalMetricValue} style={{ color: '#ff7e93' }}>2</div>
                <div className={styles.internalMetricLabel}>Advisory Classes</div>
              </div>
              <div className={styles.internalMetricCard}>
                <div className={styles.internalMetricIcon} style={{ color: '#8b5cf6' }}>✅</div>
                <div className={styles.internalMetricValue} style={{ color: '#8b5cf6' }}>96%</div>
                <div className={styles.internalMetricLabel}>Attendance Rate</div>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3>Subjects Handled</h3>
              <a href="#" className={styles.viewAll}>View all subjects</a>
            </div>
            
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <table className={styles.miniTable} style={{ marginBottom: 0 }}>
                  <thead>
                    <tr>
                      <th>Subject</th>
                      <th>Grade Level</th>
                      <th>Periods/Week</th>
                      <th>Total Students</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ fontWeight: 500 }}>General Biology 1</td>
                      <td>Grade 11</td>
                      <td>5</td>
                      <td>62</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 500 }}>General Biology 2</td>
                      <td>Grade 12</td>
                      <td>5</td>
                      <td>64</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 500 }}>Research in Science</td>
                      <td>Grade 11</td>
                      <td>3</td>
                      <td>62</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 500 }}>Practical Research 1</td>
                      <td>Grade 12</td>
                      <td>3</td>
                      <td>64</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style={{ width: '120px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontSize: '0.7rem', color: 'rgba(240, 239, 237, 0.5)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Periods/Week</span>
                <div className={styles.subjectsChart}>
                  {/* CSS Pie Chart representation */}
                  <div style={{ 
                    width: '100px', 
                    height: '100px', 
                    borderRadius: '50%', 
                    background: 'conic-gradient(#8b5cf6 0% 40%, #5cc789 40% 70%, #ffab6b 70% 90%, #84a9ff 90% 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 'inset 0 0 0 10px rgba(0,0,0,0.2)'
                  }}>
                    <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: '#1c1c1c', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'Caveat, cursive' }}>16</span>
                      <span style={{ fontSize: '0.7rem', color: 'rgba(240,239,237,0.5)' }}>Periods</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.threeColumnRow}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3>Today's Schedule</h3>
              <a href="#" className={styles.viewAll}>View full schedule</a>
            </div>
            
            <div className={styles.timeline}>
              <div className={styles.timelineItem}>
                <div className={styles.timelineDot}></div>
                <div className={styles.timelineContent} style={{ width: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className={styles.timelineTime}>07:30 AM - 08:30 AM</div>
                  </div>
                  <div style={{ background: 'rgba(240, 239, 237, 0.02)', padding: '0.85rem 1rem', borderRadius: '8px', marginTop: '0.25rem', border: '1px solid rgba(240, 239, 237, 0.05)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                      <div className={styles.timelineTitle} style={{ fontSize: '0.9rem', color: 'rgba(240, 239, 237, 0.9)' }}>General Biology 1</div>
                      <div className={styles.timelineTitle} style={{ color: 'rgba(240, 239, 237, 0.4)', fontSize: '0.75rem' }}>Period 1</div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div className={styles.timelineSub} style={{ color: 'rgba(240, 239, 237, 0.5)' }}>STEM 11 - A</div>
                      <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: 'rgba(240, 239, 237, 0.4)' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                          Sci-Lab 1
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                          32
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.timelineItem}>
                <div className={styles.timelineDot}></div>
                <div className={styles.timelineContent} style={{ width: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className={styles.timelineTime}>08:30 AM - 09:30 AM</div>
                  </div>
                  <div style={{ background: 'rgba(240, 239, 237, 0.02)', padding: '0.85rem 1rem', borderRadius: '8px', marginTop: '0.25rem', border: '1px solid rgba(240, 239, 237, 0.05)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                      <div className={styles.timelineTitle} style={{ fontSize: '0.9rem', color: 'rgba(240, 239, 237, 0.9)' }}>General Biology 1</div>
                      <div className={styles.timelineTitle} style={{ color: 'rgba(240, 239, 237, 0.4)', fontSize: '0.75rem' }}>Period 2</div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div className={styles.timelineSub} style={{ color: 'rgba(240, 239, 237, 0.5)' }}>STEM 11 - B</div>
                      <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: 'rgba(240, 239, 237, 0.4)' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                          Sci-Lab 1
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                          32
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.timelineItem}>
                <div className={`${styles.timelineDot} ${styles.timelineDotActive}`}></div>
                <div className={styles.timelineContent} style={{ width: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className={styles.timelineTime} style={{ color: '#8b5cf6', fontWeight: 600 }}>09:45 AM - 10:45 AM</div>
                    <span className={styles.statusOngoing}>Ongoing</span>
                  </div>
                  <div style={{ background: 'rgba(139, 92, 246, 0.08)', padding: '0.85rem 1rem', borderRadius: '8px', marginTop: '0.25rem', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                      <div className={styles.timelineTitle} style={{ fontSize: '0.95rem', color: '#fff' }}>Research in Science</div>
                      <div className={styles.timelineTitle} style={{ color: '#8b5cf6', fontSize: '0.75rem' }}>Period 3</div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div className={styles.timelineSub} style={{ color: 'rgba(240, 239, 237, 0.7)' }}>STEM 11 - A</div>
                      <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: 'rgba(240, 239, 237, 0.6)' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                          Room 302
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                          28
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.timelineItem}>
                <div className={styles.timelineDot}></div>
                <div className={styles.timelineContent} style={{ width: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className={styles.timelineTime}>10:45 AM - 11:45 AM</div>
                  </div>
                  <div style={{ background: 'rgba(240, 239, 237, 0.015)', padding: '0.85rem 1rem', borderRadius: '8px', marginTop: '0.25rem', border: '1px solid rgba(240, 239, 237, 0.03)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                      <div className={styles.timelineTitle} style={{ fontSize: '0.9rem', color: 'rgba(240, 239, 237, 0.6)' }}>Research in Science</div>
                      <div className={styles.timelineTitle} style={{ color: 'rgba(240, 239, 237, 0.3)', fontSize: '0.75rem' }}>Period 4</div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div className={styles.timelineSub} style={{ color: 'rgba(240, 239, 237, 0.4)' }}>STEM 11 - B</div>
                      <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: 'rgba(240, 239, 237, 0.3)' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                          Room 302
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                          25
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.timelineItem}>
                <div className={styles.timelineDot}></div>
                <div className={styles.timelineContent} style={{ width: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className={styles.timelineTime}>01:00 PM - 02:00 PM</div>
                  </div>
                  <div style={{ background: 'rgba(240, 239, 237, 0.015)', padding: '0.85rem 1rem', borderRadius: '8px', marginTop: '0.25rem', border: '1px solid rgba(240, 239, 237, 0.03)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                      <div className={styles.timelineTitle} style={{ fontSize: '0.9rem', color: 'rgba(240, 239, 237, 0.6)' }}>General Biology 2</div>
                      <div className={styles.timelineTitle} style={{ color: 'rgba(240, 239, 237, 0.3)', fontSize: '0.75rem' }}>Period 5</div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div className={styles.timelineSub} style={{ color: 'rgba(240, 239, 237, 0.4)' }}>STEM 12 - A</div>
                      <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: 'rgba(240, 239, 237, 0.3)' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                          Room 405
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                          30
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3>Recent Activities</h3>
              <a href="#" className={styles.viewAll}>View all history</a>
            </div>
            
            <div className={styles.timeline} style={{ marginTop: '0.5rem' }}>
              <div className={styles.timelineItem}>
                <div className={styles.timelineDot} style={{ background: '#8b5cf6', borderColor: '#8b5cf6', width: '24px', height: '24px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '-7px', marginTop: '0' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                </div>
                <div className={styles.timelineContent}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div className={styles.timelineTitle}>Posted Announcement</div>
                      <div className={styles.timelineSub}>General Biology 1 - Quiz Schedule</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div className={styles.timelineTime}>May 20, 2025</div>
                      <div className={styles.timelineSub} style={{ fontSize: '0.65rem' }}>02:15 PM</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.timelineItem}>
                <div className={styles.timelineDot} style={{ background: '#34d399', borderColor: '#34d399', width: '24px', height: '24px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '-7px', marginTop: '0' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                </div>
                <div className={styles.timelineContent}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div className={styles.timelineTitle}>Submitted Grades</div>
                      <div className={styles.timelineSub}>Research in Science - Quiz 1</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div className={styles.timelineTime}>May 19, 2025</div>
                      <div className={styles.timelineSub} style={{ fontSize: '0.65rem' }}>10:30 AM</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* About Teacher Card (moved) */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3>About Teacher</h3>
            </div>
            <p className={styles.bioText}>
              {teacher.aboutBio || 'No bio available.'}
            </p>
            
            <div className={styles.aboutList}>
              <div className={styles.aboutItem}>
                <div className={styles.aboutIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </div>
                <div className={styles.aboutLabel}>Gender</div>
                <div className={styles.aboutValue}>{teacher.gender || 'N/A'}</div>
              </div>
              <div className={styles.aboutItem}>
                <div className={styles.aboutIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                </div>
                <div className={styles.aboutLabel}>Date of Birth</div>
                <div className={styles.aboutValue}>{teacher.dateOfBirth || 'N/A'}</div>
              </div>
              <div className={styles.aboutItem}>
                <div className={styles.aboutIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
                </div>
                <div className={styles.aboutLabel}>Civil Status</div>
                <div className={styles.aboutValue}>{teacher.civilStatus || 'N/A'}</div>
              </div>
              <div className={styles.aboutItem}>
                <div className={styles.aboutIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                </div>
                <div className={styles.aboutLabel}>Citizenship</div>
                <div className={styles.aboutValue}>{teacher.citizenship || 'N/A'}</div>
              </div>
              <div className={styles.aboutItem}>
                <div className={styles.aboutIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                </div>
                <div className={styles.aboutLabel}>Languages</div>
                <div className={styles.aboutValue} style={{ fontSize: '0.8rem' }}>{teacher.languages || 'N/A'}</div>
              </div>
              <div className={styles.aboutItem}>
                <div className={styles.aboutIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                </div>
                <div className={styles.aboutLabel}>Specialization</div>
                <div className={styles.aboutValue} style={{ fontSize: '0.8rem' }}>{teacher.specialization || 'N/A'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Performance Summary */}
      <div className={styles.performanceRow}>
        <div className={styles.card} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6', padding: '1rem', borderRadius: '12px' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          </div>
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'Caveat, cursive', marginBottom: '0.25rem' }}>4.88 / 5.00</div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>Average Class Rating</div>
            <div style={{ fontSize: '0.7rem', color: 'rgba(240,239,237,0.5)' }}>From student feedback</div>
          </div>
        </div>
        
        <div className={styles.card} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'rgba(52, 211, 153, 0.1)', color: '#34d399', padding: '1rem', borderRadius: '12px' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          </div>
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'Caveat, cursive', marginBottom: '0.25rem' }}>96%</div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>Average Attendance Rate</div>
            <div style={{ fontSize: '0.7rem', color: 'rgba(240,239,237,0.5)' }}>Across all classes</div>
          </div>
        </div>

        <div className={styles.card} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'rgba(255, 171, 107, 0.1)', color: '#ffab6b', padding: '1rem', borderRadius: '12px' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          </div>
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'Caveat, cursive', marginBottom: '0.25rem' }}>92%</div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>Average Submission Rate</div>
            <div style={{ fontSize: '0.7rem', color: 'rgba(240,239,237,0.5)' }}>Assignments & Activities</div>
          </div>
        </div>

        <div className={styles.card} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'rgba(132, 169, 255, 0.1)', color: '#84a9ff', padding: '1rem', borderRadius: '12px' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
          </div>
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'Caveat, cursive', marginBottom: '0.25rem' }}>8</div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>Professional Development</div>
            <div style={{ fontSize: '0.7rem', color: 'rgba(240,239,237,0.5)' }}>Hours Completed</div>
          </div>
        </div>
      </div>
    </div>
  );
};
