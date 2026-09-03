import styles from '../myClasses.module.css';

interface Session {
  day: string;
  startTime: string; // HH:mm (24hr)
  endTime: string; // HH:mm (24hr)
}

interface WeeklyCalendarGridProps {
  sessions: Session[];
  accentColor: string;
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const START_HOUR = 7; // 7 AM
const END_HOUR = 17; // 5 PM

function timeToHours(timeStr: string): number {
  const [hh, mm] = timeStr.split(':').map(Number);
  return hh + mm / 60;
}

export function WeeklyCalendarGrid({ sessions, accentColor }: WeeklyCalendarGridProps) {
  // We add +1 to cover the end hour line
  const hours = Array.from({ length: END_HOUR - START_HOUR + 1 }, (_, i) => START_HOUR + i);

  return (
    <div className={styles.calendarGridContainer}>
      {/* Time axis */}
      <div className={styles.calendarTimeAxis}>
        {hours.map((hour) => (
          <div key={hour} className={styles.calendarTimeLabel}>
            {hour === 12 ? '12 PM' : hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className={styles.calendarDaysWrapper}>
        {DAYS.map((day) => {
          const daySessions = sessions.filter((s) => s.day.startsWith(day));
          
          return (
            <div key={day} className={styles.calendarDayColumn}>
              <div className={styles.calendarDayHeader}>{day}</div>
              <div className={styles.calendarDayContent}>
                {hours.map((hour) => (
                  <div key={`line-${hour}`} className={styles.calendarHourLine} />
                ))}
                
                {daySessions.map((session, idx) => {
                  const startH = timeToHours(session.startTime);
                  const endH = timeToHours(session.endTime);
                  const topPercent = ((startH - START_HOUR) / (END_HOUR - START_HOUR)) * 100;
                  const heightPercent = ((endH - startH) / (END_HOUR - START_HOUR)) * 100;
                  
                  return (
                    <div
                      key={idx}
                      className={styles.calendarSessionBlock}
                      style={{
                        top: `${Math.max(0, topPercent)}%`,
                        height: `${heightPercent}%`,
                        backgroundColor: `${accentColor}22`,
                        borderColor: `${accentColor}88`,
                        color: accentColor,
                      }}
                    >
                      <div className={styles.calendarSessionTime}>
                        {formatTime(session.startTime)} - {formatTime(session.endTime)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function formatTime(timeStr: string): string {
  const [hh, mm] = timeStr.split(':');
  let h = Number(hh);
  const period = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${h}:${mm} ${period}`;
}
