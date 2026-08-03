import React from 'react';
import styles from '../teacherProfile.module.css';
import { Teacher } from '@/lib/mock/teachers.mock';
import { Table } from '@/components/ui/Table';
import { 
  Users, GraduationCap, Star, CheckCircle, Clock, MapPin, 
  Calendar, Heart, Globe, MessageCircle, FileText, Award, 
  BookOpen, Megaphone, User
} from 'lucide-react';

interface TeacherOverviewTabProps {
  teacher: Teacher;
}

export const TeacherOverviewTab: React.FC<TeacherOverviewTabProps> = ({ teacher }) => {

  const classesData = [
    { class: 'STEM 11 - A', grade: 'Grade 11', students: 32, adviser: true },
    { class: 'STEM 11 - B', grade: 'Grade 11', students: 30, adviser: true },
    { class: 'STEM 12 - A', grade: 'Grade 12', students: 34, adviser: false },
    { class: 'STEM 12 - B', grade: 'Grade 12', students: 32, adviser: false },
  ];

  const subjectsData = [
    { subject: 'General Biology 1', grade: 'Grade 11', periods: 5, students: 62 },
    { subject: 'General Biology 2', grade: 'Grade 12', periods: 5, students: 64 },
    { subject: 'Research in Science', grade: 'Grade 11', periods: 3, students: 62 },
    { subject: 'Practical Research 1', grade: 'Grade 12', periods: 3, students: 64 },
  ];

  return (
    <div>
      <div className={styles.overviewLayout}>

        <div className={styles.classesAndSubjectsRow}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3>Classes Handled (SY 2025-2026)</h3>
              <a href="#" className={styles.viewAll}>View all classes</a>
            </div>
            
            <Table
              columns={[
                { header: 'Class / Section', accessor: 'class', render: (item) => <span style={{ fontWeight: 500 }}>{item.class}</span> },
                { header: 'Grade Level', accessor: 'grade' },
                { header: 'Students', accessor: 'students' },
                { header: 'Adviser', accessor: 'adviser', render: (item) => item.adviser ? <CheckCircle size={14} color="#34d399" /> : <span style={{ color: 'rgba(240, 239, 237, 0.4)' }}>-</span> },
              ]}
              data={classesData}
              keyExtractor={(item) => item.class}
            />

            <div className={styles.internalMetrics}>
              <div className={styles.internalMetricCard}>
                <div className={styles.internalMetricIcon} style={{ color: '#84a9ff' }}><BookOpen size={20} /></div>
                <div className={styles.internalMetricValue} style={{ color: '#84a9ff' }}>4</div>
                <div className={styles.internalMetricLabel}>Classes</div>
              </div>
              <div className={styles.internalMetricCard}>
                <div className={styles.internalMetricIcon} style={{ color: '#5cc789' }}><Users size={20} /></div>
                <div className={styles.internalMetricValue} style={{ color: '#5cc789' }}>128</div>
                <div className={styles.internalMetricLabel}>Total Students</div>
              </div>
              <div className={styles.internalMetricCard}>
                <div className={styles.internalMetricIcon} style={{ color: '#ff7e93' }}><Star size={20} /></div>
                <div className={styles.internalMetricValue} style={{ color: '#ff7e93' }}>2</div>
                <div className={styles.internalMetricLabel}>Advisory Classes</div>
              </div>
              <div className={styles.internalMetricCard}>
                <div className={styles.internalMetricIcon} style={{ color: '#8b5cf6' }}><CheckCircle size={20} /></div>
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
                <Table
                  columns={[
                    { header: 'Subject', accessor: 'subject', render: (item) => <span style={{ fontWeight: 500 }}>{item.subject}</span> },
                    { header: 'Grade Level', accessor: 'grade' },
                    { header: 'Periods/Week', accessor: 'periods' },
                    { header: 'Total Students', accessor: 'students' },
                  ]}
                  data={subjectsData}
                  keyExtractor={(item) => item.subject}
                />
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
                          <MapPin size={12} /> Sci-Lab 1
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <Users size={12} /> 32
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
                          <MapPin size={12} /> Room 302
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <Users size={12} /> 28
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
                  <Megaphone size={14} color="#111" />
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
                  <CheckCircle size={14} color="#111" />
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
          
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3>About Teacher</h3>
            </div>
            <p className={styles.bioText}>
              {teacher.aboutBio || 'No bio available.'}
            </p>
            
            <div className={styles.aboutList}>
              <div className={styles.aboutItem}>
                <div className={styles.aboutIcon}><User size={16} /></div>
                <div className={styles.aboutLabel}>Gender</div>
                <div className={styles.aboutValue}>{teacher.gender || 'N/A'}</div>
              </div>
              <div className={styles.aboutItem}>
                <div className={styles.aboutIcon}><Calendar size={16} /></div>
                <div className={styles.aboutLabel}>Date of Birth</div>
                <div className={styles.aboutValue}>{teacher.dateOfBirth || 'N/A'}</div>
              </div>
              <div className={styles.aboutItem}>
                <div className={styles.aboutIcon}><Heart size={16} /></div>
                <div className={styles.aboutLabel}>Civil Status</div>
                <div className={styles.aboutValue}>{teacher.civilStatus || 'N/A'}</div>
              </div>
              <div className={styles.aboutItem}>
                <div className={styles.aboutIcon}><Globe size={16} /></div>
                <div className={styles.aboutLabel}>Citizenship</div>
                <div className={styles.aboutValue}>{teacher.citizenship || 'N/A'}</div>
              </div>
              <div className={styles.aboutItem}>
                <div className={styles.aboutIcon}><MessageCircle size={16} /></div>
                <div className={styles.aboutLabel}>Languages</div>
                <div className={styles.aboutValue} style={{ fontSize: '0.8rem' }}>{teacher.languages || 'N/A'}</div>
              </div>
              <div className={styles.aboutItem}>
                <div className={styles.aboutIcon}><Award size={16} /></div>
                <div className={styles.aboutLabel}>Specialization</div>
                <div className={styles.aboutValue} style={{ fontSize: '0.8rem' }}>{teacher.specialization || 'N/A'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.performanceRow}>
        <div className={styles.card} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6', padding: '1rem', borderRadius: '12px' }}>
            <Star size={24} />
          </div>
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'Caveat, cursive', marginBottom: '0.25rem' }}>4.88 / 5.00</div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>Average Class Rating</div>
            <div style={{ fontSize: '0.7rem', color: 'rgba(240,239,237,0.5)' }}>From student feedback</div>
          </div>
        </div>
        
        <div className={styles.card} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'rgba(52, 211, 153, 0.1)', color: '#34d399', padding: '1rem', borderRadius: '12px' }}>
            <Calendar size={24} />
          </div>
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'Caveat, cursive', marginBottom: '0.25rem' }}>96%</div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>Average Attendance Rate</div>
            <div style={{ fontSize: '0.7rem', color: 'rgba(240,239,237,0.5)' }}>Across all classes</div>
          </div>
        </div>

        <div className={styles.card} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'rgba(255, 171, 107, 0.1)', color: '#ffab6b', padding: '1rem', borderRadius: '12px' }}>
            <FileText size={24} />
          </div>
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'Caveat, cursive', marginBottom: '0.25rem' }}>92%</div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>Average Submission Rate</div>
            <div style={{ fontSize: '0.7rem', color: 'rgba(240,239,237,0.5)' }}>Assignments & Activities</div>
          </div>
        </div>

        <div className={styles.card} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'rgba(132, 169, 255, 0.1)', color: '#84a9ff', padding: '1rem', borderRadius: '12px' }}>
            <GraduationCap size={24} />
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
