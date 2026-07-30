import React from 'react';
import styles from './teacherClassesTab.module.css';
import { Teacher } from '@/lib/mock/teachers.mock';

interface TeacherClassesTabProps {
  teacher: Teacher;
}

export const TeacherClassesTab: React.FC<TeacherClassesTabProps> = ({ teacher }) => {
  return (
    <div className={styles.classesLayout}>
      {/* Left Column */}
      <div>
        {/* Classes Handled */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h3 className={styles.cardTitle}>Classes Handled (SY 2025-2026)</h3>
              <p className={styles.cardSubtitle}>List of all classes and sections handled by the teacher this school year.</p>
            </div>
            <div className={styles.headerActions}>
              <div className={styles.searchWrapper}>
                <input type="text" placeholder="Search class or section..." className={styles.searchInput} />
                <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </div>
              <button className={styles.exportBtn}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                Export
              </button>
            </div>
          </div>

          <table className={styles.table}>
            <thead>
              <tr>
                <th>Class / Section</th>
                <th>Grade Level</th>
                <th>Subject</th>
                <th>Students</th>
                <th>Schedule</th>
                <th>Room</th>
                <th>Adviser</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className={styles.avatarCell}>
                    <div className={styles.avatar}>ST</div>
                    <div>
                      <div className={styles.className}>STEM 11 - A</div>
                      <div className={styles.classSection}>Section A</div>
                    </div>
                  </div>
                </td>
                <td>Grade 11</td>
                <td>General Biology 1</td>
                <td>32</td>
                <td>
                  <div className={styles.scheduleDays}>Mon, Wed, Fri</div>
                  <div className={styles.scheduleTime}>7:30 AM - 8:30 AM</div>
                </td>
                <td>Science Lab 1</td>
                <td>
                  <div className={styles.adviserCheck}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                  </div>
                </td>
                <td><span className={styles.statusActive}>Active</span></td>
                <td>
                  <button className={styles.actionBtn}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <div className={styles.avatarCell}>
                    <div className={styles.avatar}>ST</div>
                    <div>
                      <div className={styles.className}>STEM 11 - B</div>
                      <div className={styles.classSection}>Section B</div>
                    </div>
                  </div>
                </td>
                <td>Grade 11</td>
                <td>General Biology 1</td>
                <td>30</td>
                <td>
                  <div className={styles.scheduleDays}>Tue, Thu</div>
                  <div className={styles.scheduleTime}>8:30 AM - 9:30 AM</div>
                </td>
                <td>Science Lab 1</td>
                <td>
                  <div className={styles.adviserCheck}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                  </div>
                </td>
                <td><span className={styles.statusActive}>Active</span></td>
                <td>
                  <button className={styles.actionBtn}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <div className={styles.avatarCell}>
                    <div className={styles.avatar}>ST</div>
                    <div>
                      <div className={styles.className}>STEM 12 - A</div>
                      <div className={styles.classSection}>Section A</div>
                    </div>
                  </div>
                </td>
                <td>Grade 12</td>
                <td>Research in Science</td>
                <td>34</td>
                <td>
                  <div className={styles.scheduleDays}>Mon, Wed</div>
                  <div className={styles.scheduleTime}>9:45 AM - 10:45 AM</div>
                </td>
                <td>Science Lab 2</td>
                <td>
                  <div className={styles.adviserCheck}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                  </div>
                </td>
                <td><span className={styles.statusActive}>Active</span></td>
                <td>
                  <button className={styles.actionBtn}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <div className={styles.avatarCell}>
                    <div className={styles.avatar}>ST</div>
                    <div>
                      <div className={styles.className}>STEM 12 - B</div>
                      <div className={styles.classSection}>Section B</div>
                    </div>
                  </div>
                </td>
                <td>Grade 12</td>
                <td>Research in Science</td>
                <td>32</td>
                <td>
                  <div className={styles.scheduleDays}>Tue, Thu</div>
                  <div className={styles.scheduleTime}>1:00 PM - 2:00 PM</div>
                </td>
                <td>Science Lab 2</td>
                <td>
                  <div className={styles.adviserCheck}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                  </div>
                </td>
                <td><span className={styles.statusActive}>Active</span></td>
                <td>
                  <button className={styles.actionBtn}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <div className={styles.avatarCell}>
                    <div className={`${styles.avatar} ${styles.avatarGE}`}>GE</div>
                    <div>
                      <div className={styles.className}>STEM 12 - A</div>
                      <div className={styles.classSection}>Section A</div>
                    </div>
                  </div>
                </td>
                <td>Grade 12</td>
                <td>General Biology 2</td>
                <td>28</td>
                <td>
                  <div className={styles.scheduleDays}>Fri</div>
                  <div className={styles.scheduleTime}>10:45 AM - 11:45 AM</div>
                </td>
                <td>Science Lab 1</td>
                <td style={{ color: 'rgba(240, 239, 237, 0.4)', textAlign: 'center' }}>—</td>
                <td><span className={styles.statusActive}>Active</span></td>
                <td>
                  <button className={styles.actionBtn}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <div className={styles.pagination}>
            <span>Showing 1 to 5 of 5 classes</span>
            <div className={styles.pageControls}>
              <button className={styles.pageBtn}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
              </button>
              <button className={`${styles.pageBtn} ${styles.active}`}>1</button>
              <button className={styles.pageBtn}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Recent Class Activities */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Recent Class Activities</h3>
          
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>Activity</th>
                <th>Details</th>
                <th>Class / Section</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className={styles.scheduleDays}>May 20, 2025</div>
                  <div className={styles.scheduleTime}>02:15 PM</div>
                </td>
                <td>
                  <div className={styles.activityTitle}>
                    <div className={`${styles.activityIcon} ${styles.activityPurple}`}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                    </div>
                    Posted Announcement
                  </div>
                </td>
                <td className={styles.activityDesc}>Posted reminder about the lab activity on Friday.</td>
                <td className={styles.activityDesc}>STEM 11 - A</td>
              </tr>
              <tr>
                <td>
                  <div className={styles.scheduleDays}>May 19, 2025</div>
                  <div className={styles.scheduleTime}>10:30 AM</div>
                </td>
                <td>
                  <div className={styles.activityTitle}>
                    <div className={`${styles.activityIcon} ${styles.activityBlue}`}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    </div>
                    Submitted Grades
                  </div>
                </td>
                <td className={styles.activityDesc}>Submitted Quarterly Grades for General Biology 1.</td>
                <td className={styles.activityDesc}>STEM 11 - B</td>
              </tr>
              <tr>
                <td>
                  <div className={styles.scheduleDays}>May 18, 2025</div>
                  <div className={styles.scheduleTime}>09:05 AM</div>
                </td>
                <td>
                  <div className={styles.activityTitle}>
                    <div className={`${styles.activityIcon} ${styles.activityYellow}`}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                    </div>
                    Created Assignment
                  </div>
                </td>
                <td className={styles.activityDesc}>Created new assignment: Cell Structure Diagram.</td>
                <td className={styles.activityDesc}>STEM 12 - A</td>
              </tr>
              <tr>
                <td>
                  <div className={styles.scheduleDays}>May 16, 2025</div>
                  <div className={styles.scheduleTime}>04:20 PM</div>
                </td>
                <td>
                  <div className={styles.activityTitle}>
                    <div className={`${styles.activityIcon} ${styles.activityGreen}`}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                    </div>
                    Uploaded Document
                  </div>
                </td>
                <td className={styles.activityDesc}>Uploaded lecture notes: Photosynthesis.</td>
                <td className={styles.activityDesc}>STEM 12 - B</td>
              </tr>
            </tbody>
          </table>
          <a href="#" className={styles.viewAllLink}>View all class activities →</a>
        </div>
      </div>

      {/* Right Column */}
      <div>
        {/* Classes Summary */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Classes Summary</h3>
          <div className={styles.summaryGrid}>
            <div className={styles.summaryCard}>
              <div className={`${styles.summaryIcon} ${styles.summaryIconPurple}`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </div>
              <div className={styles.summaryInfo}>
                <h4>4</h4>
                <p>Classes Handled</p>
                <span>This School Year</span>
              </div>
            </div>
            <div className={styles.summaryCard}>
              <div className={`${styles.summaryIcon} ${styles.summaryIconGreen}`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </div>
              <div className={styles.summaryInfo}>
                <h4>128</h4>
                <p>Total Students</p>
                <span>Across All Classes</span>
              </div>
            </div>
            <div className={styles.summaryCard}>
              <div className={`${styles.summaryIcon} ${styles.summaryIconYellow}`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              </div>
              <div className={styles.summaryInfo}>
                <h4>2</h4>
                <p>Subjects Taught</p>
                <span>This School Year</span>
              </div>
            </div>
            <div className={styles.summaryCard}>
              <div className={`${styles.summaryIcon} ${styles.summaryIconBlue}`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              </div>
              <div className={styles.summaryInfo}>
                <h4>16</h4>
                <p>Total Periods / Week</p>
                <span>All Classes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Advisory Class */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Advisory Class</h3>
          <div className={styles.advisoryCard}>
            <div className={styles.advisoryLeft}>
              <div className={styles.advisoryAvatar}>ST</div>
              <div className={styles.advisoryInfo}>
                <div className={styles.advisoryTitle}>STEM 11 - A</div>
                <div className={styles.advisorySection}>Section A</div>
                <div className={styles.advisoryDate}>Adviser Since: June 15, 2021</div>
              </div>
            </div>
            <div className={styles.advisoryRight}>
              <div className={styles.advisoryCount}>32</div>
              <div className={styles.advisoryLabel}>Students</div>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className={styles.card}>
          <div className={styles.notesHeader}>
            <h3 className={styles.cardTitle} style={{ margin: 0 }}>Notes</h3>
            <button className={styles.addNoteBtn}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              Add Note
            </button>
          </div>
          <div className={styles.emptyNotes}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            <p>No notes added yet.</p>
            <span>Click "Add Note" to add notes about this teacher's classes.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
