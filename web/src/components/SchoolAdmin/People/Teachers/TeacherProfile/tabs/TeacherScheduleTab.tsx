import React from 'react';
import styles from './teacherScheduleTab.module.css';
import uiStyles from '@/components/ui/ui.module.css';
import { Teacher, mockTeacherSchedule, ScheduleEvent } from '@/lib/mock/teachers.mock';
import { Download, ChevronLeft, ChevronRight, Calendar, Users, BookOpen, Clock, FileText, Plus } from 'lucide-react';

interface TeacherScheduleTabProps {
  teacher: Teacher;
}

export const TeacherScheduleTab: React.FC<TeacherScheduleTabProps> = ({ teacher }) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const times = [
    { label: '7:00 AM', period: '8:00 AM' },
    { label: '8:00 AM', period: '9:00 AM' },
    { label: '9:00 AM', period: '10:00 AM' },
    { label: '10:00 AM', period: '11:00 AM' },
    { label: '11:00 AM', period: '12:00 PM' },
    { label: '12:00 PM', period: '1:00 PM' },
    { label: '1:00 PM', period: '2:00 PM' },
    { label: '2:00 PM', period: '3:00 PM' },
    { label: '3:00 PM', period: '4:00 PM' },
    { label: '4:00 PM', period: '5:00 PM' },
  ];

  // Helper to determine the hour prefix to match events roughly to rows
  const getHourMatch = (timeLabel: string) => {
    return timeLabel.split(':')[0]; 
  };

  const renderEvent = (event: ScheduleEvent | undefined) => {
    if (!event) return null;

    let eventClass = '';
    if (event.type === 'class') {
      eventClass = event.title.includes('Biology 1') ? styles.eventClassBlue : styles.eventClassGreen;
    } else if (event.type === 'advisory') eventClass = styles.eventAdvisory;
    else if (event.type === 'prep') eventClass = styles.eventPrep;
    else if (event.type === 'grading') eventClass = styles.eventGrading;
    else if (event.type === 'office') eventClass = styles.eventOffice;
    else if (event.type === 'meeting') eventClass = styles.eventMeeting;
    else if (event.type === 'break') {
      return (
        <div className={styles.eventBreak}>
          Break
        </div>
      );
    }

    return (
      <div className={`${styles.eventBlock} ${eventClass}`}>
        <span className={styles.eventTitle}>{event.title}</span>
        {event.subtitle && <span className={styles.eventSubtitle}>{event.subtitle}</span>}
        <span className={styles.eventTime}>{event.startTime} - {event.endTime}</span>
      </div>
    );
  };

  return (
    <div className={uiStyles.tabLayoutContainer}>
      
      <div className={uiStyles.tabLeftCol}>
        <div className={styles.card} style={{ marginBottom: 0 }}>
          <div className={styles.cardHeader}>
            <div>
              <h3 className={styles.cardTitle}>Weekly Schedule</h3>
              <p className={styles.cardSubtitle}>View the regular class schedule for this teacher.</p>
            </div>
            <div className={styles.headerActions}>
              <div className={styles.datePicker}>
                <button><ChevronLeft size={16} /></button>
                <span><Calendar size={14} /> May 19 - May 25, 2025</span>
                <button><ChevronRight size={16} /></button>
              </div>
              <button className={`${uiStyles.btnBase} ${uiStyles.btnSm} ${uiStyles.btnSecondary}`}>
                <Download size={14} /> Download
              </button>
            </div>
          </div>

          <div className={styles.calendarGrid}>
            <div className={styles.calendarHeader}>
              <div className={styles.calendarHeaderCell} style={{ fontSize: '0.65rem', color: 'rgba(240, 239, 237, 0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Time
              </div>
              {days.map((day, idx) => {
                const date = 19 + idx; // Fake dates matching the screenshot
                return (
                  <div key={day} className={styles.calendarHeaderCell}>
                    <div className={styles.dayName}>{day}</div>
                    <div className={styles.dayDate}>May {date}</div>
                  </div>
                );
              })}
            </div>

            <div className={styles.calendarBody}>
              {times.map((time, rowIdx) => (
                <div key={time.label} className={styles.timeRow}>
                  <div className={styles.timeCell}>
                    <div className={styles.timeMain}>{time.label}</div>
                    <div>{time.period}</div>
                  </div>
                  {days.map(day => {
                    // Very simple matching based on start time hour
                    const hourStr = getHourMatch(time.label);
                    // Match AM/PM roughly
                    let hourNum = parseInt(hourStr);
                    if (time.label.includes('PM') && hourNum !== 12) hourNum += 12;
                    
                    const event = mockTeacherSchedule.find(e => {
                      if (e.day !== day) return false;
                      const eventHour = parseInt(e.startTime.split(':')[0]);
                      return eventHour === hourNum || (eventHour === 12 && hourNum === 12);
                    });

                    // We will just place it in the cell if it starts in this hour
                    return (
                      <div key={`${day}-${time.label}`} className={styles.dayCell}>
                        {event ? renderEvent(event) : (day === 'Saturday' ? <div style={{textAlign: 'center', color: 'rgba(240,239,237,0.2)', paddingTop: '1rem'}}>-</div> : null)}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.legend}>
            <div className={styles.legendItem}><div className={`${styles.legendDot} ${styles.dotBlue}`}></div> General Biology 1</div>
            <div className={styles.legendItem}><div className={`${styles.legendDot} ${styles.dotBlue}`}></div> General Biology 2</div>
            <div className={styles.legendItem}><div className={`${styles.legendDot} ${styles.dotGreen}`}></div> Research in Science</div>
            <div className={styles.legendItem}><div className={`${styles.legendDot} ${styles.dotYellow}`}></div> Advisory</div>
            <div className={styles.legendItem}><div className={`${styles.legendDot} ${styles.dotGray}`}></div> Other</div>
            <div className={styles.legendItem}><div className={`${styles.legendDot} ${styles.dotRed}`}></div> Meeting / Activity</div>
          </div>
        </div>
      </div>

      <div className={uiStyles.tabRightCol}>
        
        {/* Schedule Summary */}
        <div className={styles.card} style={{ marginBottom: 0 }}>
          <h3 className={styles.cardTitle}>Schedule Summary</h3>
          <div className={styles.summaryGrid} style={{ marginTop: '1rem' }}>
            <div className={styles.summaryCard}>
              <div className={`${styles.summaryIcon} ${styles.summaryIconPurple}`}>
                <Users size={20} />
              </div>
              <div className={styles.summaryInfo}>
                <h4>16</h4>
                <p>Total Periods / Week</p>
              </div>
            </div>
            <div className={styles.summaryCard}>
              <div className={`${styles.summaryIcon} ${styles.summaryIconGreen}`}>
                <BookOpen size={20} />
              </div>
              <div className={styles.summaryInfo}>
                <h4>6</h4>
                <p>Subjects Handled</p>
              </div>
            </div>
            <div className={styles.summaryCard}>
              <div className={`${styles.summaryIcon} ${styles.summaryIconYellow}`}>
                <BookOpen size={20} />
              </div>
              <div className={styles.summaryInfo}>
                <h4>4</h4>
                <p>Classes Handled</p>
              </div>
            </div>
            <div className={styles.summaryCard}>
              <div className={`${styles.summaryIcon} ${styles.summaryIconBlue}`}>
                <Clock size={20} />
              </div>
              <div className={styles.summaryInfo}>
                <h4>28</h4>
                <p>Total Hours / Week</p>
              </div>
            </div>
          </div>
        </div>

        {/* Teaching Load */}
        <div className={styles.card} style={{ marginBottom: 0 }}>
          <h3 className={styles.cardTitle}>Teaching Load</h3>
          <div className={styles.teachingLoadContainer}>
            <div className={styles.chartPlaceholder}>
              <div className={styles.chartInner}>Total: 28 hrs / week</div>
            </div>
            <div className={styles.loadLegend}>
              <div className={styles.loadItem}>
                <div className={styles.loadLabel}>
                  <div className={`${styles.legendDot} ${styles.dotBlue}`}></div>
                  General Biology 1
                </div>
                <div className={styles.loadValue}>8 hrs (29%)</div>
              </div>
              <div className={styles.loadItem}>
                <div className={styles.loadLabel}>
                  <div className={`${styles.legendDot} ${styles.dotBlue}`}></div>
                  General Biology 2
                </div>
                <div className={styles.loadValue}>4 hrs (14%)</div>
              </div>
              <div className={styles.loadItem}>
                <div className={styles.loadLabel}>
                  <div className={`${styles.legendDot} ${styles.dotGreen}`}></div>
                  Research in Science
                </div>
                <div className={styles.loadValue}>8 hrs (29%)</div>
              </div>
              <div className={styles.loadItem}>
                <div className={styles.loadLabel}>
                  <div className={`${styles.legendDot} ${styles.dotPurple}`}></div>
                  Other Activities
                </div>
                <div className={styles.loadValue}>8 hrs (28%)</div>
              </div>
              <div className={styles.loadTotal}>
                Total: 28 hours / week
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className={styles.card} style={{ marginBottom: 0 }}>
          <div className={styles.notesHeader}>
            <h3 className={styles.cardTitle} style={{ margin: 0 }}>Notes</h3>
            <button className={`${uiStyles.btnBase} ${uiStyles.btnSm} ${uiStyles.btnSecondary}`} style={{ borderColor: 'rgba(182, 142, 255, 0.5)', color: '#b68eff' }}>
              <Plus size={14} /> Add Note
            </button>
          </div>
          <div className={styles.emptyNotes}>
            <FileText size={40} />
            <p>No notes added yet.</p>
            <span>Click "Add Note" to add notes about this teacher's schedule.</span>
          </div>
        </div>

      </div>

    </div>
  );
};
