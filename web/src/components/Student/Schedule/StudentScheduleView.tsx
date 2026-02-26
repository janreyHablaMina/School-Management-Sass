import React from 'react';
import styles from './studentSchedule.module.css';
import uiStyles from '@/components/ui/ui.module.css';
import { SCHEDULE_DATA, SUMMARY_DATA } from '@/lib/mock/studentProfile.mock';
import { Download, ChevronLeft, ChevronRight, Calendar, Users, BookOpen, Clock, FileText } from 'lucide-react';
import { PageHeader, listStyles } from '@/components/ui/shared';

export const StudentScheduleView = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const dayShort = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const times = [
    { label: '7:00 AM', period: '8:00 AM', hourNum: 7 },
    { label: '8:00 AM', period: '9:00 AM', hourNum: 8 },
    { label: '9:00 AM', period: '10:00 AM', hourNum: 9 },
    { label: '10:00 AM', period: '11:00 AM', hourNum: 10 },
    { label: '11:00 AM', period: '12:00 PM', hourNum: 11 },
    { label: '12:00 PM', period: '1:00 PM', hourNum: 12 },
    { label: '1:00 PM', period: '2:00 PM', hourNum: 13 },
    { label: '2:00 PM', period: '3:00 PM', hourNum: 14 },
    { label: '3:00 PM', period: '4:00 PM', hourNum: 15 },
  ];

  const getColorClass = (subject: string) => {
    if (subject.includes('Math')) return styles.eventClassPurple;
    if (subject.includes('English')) return styles.eventClassBlue;
    if (subject.includes('Science')) return styles.eventClassYellow;
    if (subject.includes('Filipino')) return styles.eventClassGreen;
    if (subject.includes('History')) return styles.eventClassRed;
    return styles.eventClassPurple;
  };

  const getEventForCell = (dayStr: string, hourNum: number) => {
    const dayPrefix = dayStr.substring(0, 3);
    return SCHEDULE_DATA.find(e => {
      // e.g. "07:30 AM - 08:30 AM"
      const startTimeStr = e.time.split(' - ')[0]; // "07:30 AM"
      const isPM = startTimeStr.includes('PM');
      let eventHour = parseInt(startTimeStr.split(':')[0]);
      if (isPM && eventHour !== 12) eventHour += 12;
      if (!isPM && eventHour === 12) eventHour = 0; // Edge case
      
      return e.day.includes(dayPrefix) && eventHour === hourNum;
    });
  };

  const renderEvent = (event: typeof SCHEDULE_DATA[0]) => {
    return (
      <div className={`${styles.eventBlock} ${getColorClass(event.subject)}`}>
        <span className={styles.eventTitle}>{event.subject}</span>
        <span className={styles.eventSubtitle}>{event.room} • {event.teacher.split(' ').pop()}</span>
        <span className={styles.eventTime}>{event.time}</span>
      </div>
    );
  };

  return (
    <div className={listStyles.page}>
      <PageHeader
        title="Class Schedule"
        subtitle="Your weekly schedule of classes."
      >
        <button className={`${uiStyles.btnBase} ${uiStyles.btnSm} ${uiStyles.btnSecondary}`}>
          <Download size={14} /> Download
        </button>
      </PageHeader>

      <div className={uiStyles.tabLayoutContainer}>
        <div className={uiStyles.tabLeftCol}>
          <div className={styles.card} style={{ marginBottom: 0 }}>
            <div className={styles.cardHeader}>
              <div>
                <h3 className={styles.cardTitle}>Weekly Schedule</h3>
                <p className={styles.cardSubtitle}>Your regular class schedule for this semester.</p>
              </div>
              <div className={styles.headerActions}>
                <div className={styles.datePicker}>
                  <button><ChevronLeft size={16} /></button>
                  <span><Calendar size={14} /> May 19 - May 25, 2025</span>
                  <button><ChevronRight size={16} /></button>
                </div>
              </div>
            </div>

            <div className={styles.calendarGrid}>
              <div className={styles.calendarHeader}>
                <div className={styles.calendarHeaderCell} style={{ fontSize: '0.65rem', color: 'rgba(240, 239, 237, 0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Time
                </div>
                {days.map((day, idx) => {
                  const date = 19 + idx; // Example dates
                  return (
                    <div key={day} className={styles.calendarHeaderCell}>
                      <div className={styles.dayName}>{day}</div>
                      <div className={styles.dayDate}>May {date}</div>
                    </div>
                  );
                })}
              </div>

              <div className={styles.calendarBody}>
                {times.map((time) => (
                  <div key={time.label} className={styles.timeRow}>
                    <div className={styles.timeCell}>
                      <div className={styles.timeMain}>{time.label}</div>
                      <div>{time.period}</div>
                    </div>
                    {days.map(day => {
                      const event = getEventForCell(day, time.hourNum);
                      
                      // Also add lunch break visually
                      let content = event ? renderEvent(event) : null;
                      if (!event && time.hourNum === 12 && day !== 'Saturday' && day !== 'Sunday') {
                        content = <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 500, color: 'rgba(240, 239, 237, 0.4)', height: '100%' }}>Lunch Break</div>;
                      }

                      return (
                        <div key={`${day}-${time.label}`} className={styles.dayCell}>
                          {content || ((day === 'Saturday' || day === 'Sunday') ? <div style={{textAlign: 'center', color: 'rgba(240,239,237,0.2)', paddingTop: '1rem'}}>-</div> : null)}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.legend}>
              <div className={styles.legendItem}><div className={`${styles.legendDot} ${styles.dotPurple}`}></div> Math</div>
              <div className={styles.legendItem}><div className={`${styles.legendDot} ${styles.dotBlue}`}></div> English</div>
              <div className={styles.legendItem}><div className={`${styles.legendDot} ${styles.dotYellow}`}></div> Science</div>
              <div className={styles.legendItem}><div className={`${styles.legendDot} ${styles.dotGreen}`}></div> Language</div>
              <div className={styles.legendItem}><div className={`${styles.legendDot} ${styles.dotRed}`}></div> Humanities</div>
            </div>
          </div>
        </div>

        <div className={uiStyles.tabRightCol}>
          <div className={styles.summaryLoadGroup}>
            {/* Schedule Summary */}
            <div className={styles.card} style={{ marginBottom: 0 }}>
              <h3 className={styles.cardTitle}>Schedule Summary</h3>
              <div className={styles.summaryGrid} style={{ marginTop: '1rem' }}>
                <div className={styles.summaryCard}>
                  <div className={`${styles.summaryIcon} ${styles.summaryIconPurple}`}>
                    <BookOpen size={20} />
                  </div>
                  <div className={styles.summaryInfo}>
                    <h4>8</h4>
                    <p>Total Subjects</p>
                  </div>
                </div>
                <div className={styles.summaryCard}>
                  <div className={`${styles.summaryIcon} ${styles.summaryIconBlue}`}>
                    <Users size={20} />
                  </div>
                  <div className={styles.summaryInfo}>
                    <h4>11.0</h4>
                    <p>Total Units</p>
                  </div>
                </div>
                <div className={styles.summaryCard}>
                  <div className={`${styles.summaryIcon} ${styles.summaryIconGreen}`}>
                    <Clock size={20} />
                  </div>
                  <div className={styles.summaryInfo}>
                    <h4>24</h4>
                    <p>Hours / Week</p>
                  </div>
                </div>
                <div className={styles.summaryCard}>
                  <div className={`${styles.summaryIcon} ${styles.summaryIconYellow}`}>
                    <Calendar size={20} />
                  </div>
                  <div className={styles.summaryInfo}>
                    <h4>5</h4>
                    <p>Days / Week</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Subject Load */}
          <div className={`${styles.card} ${styles.cardFlex}`} style={{ marginBottom: 0, flex: 1 }}>
            <h3 className={styles.cardTitle}>Subject Breakdown</h3>
            <div className={styles.subjectLoadContainer}>
              <div className={styles.chartPlaceholder}>
                <div className={styles.chartInner}>Total: 11.0 Units</div>
              </div>
              <div className={styles.loadLegend}>
                <div className={styles.loadItem}>
                  <div className={styles.loadLabel}>
                    <div className={`${styles.legendDot} ${styles.dotPurple}`}></div>
                    Math & Science
                  </div>
                  <div className={styles.loadValue}>3.0 Units (27%)</div>
                </div>
                <div className={styles.loadItem}>
                  <div className={styles.loadLabel}>
                    <div className={`${styles.legendDot} ${styles.dotBlue}`}></div>
                    English & Lit
                  </div>
                  <div className={styles.loadValue}>3.0 Units (27%)</div>
                </div>
                <div className={styles.loadItem}>
                  <div className={styles.loadLabel}>
                    <div className={`${styles.legendDot} ${styles.dotGreen}`}></div>
                    Languages
                  </div>
                  <div className={styles.loadValue}>1.5 Units (14%)</div>
                </div>
                <div className={styles.loadItem}>
                  <div className={styles.loadLabel}>
                    <div className={`${styles.legendDot} ${styles.dotRed}`}></div>
                    Humanities
                  </div>
                  <div className={styles.loadValue}>3.5 Units (32%)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

