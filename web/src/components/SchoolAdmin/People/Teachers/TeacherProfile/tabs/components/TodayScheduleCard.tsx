import React from 'react';
import styles from '../../teacherProfile.module.css';
import { MapPin, Users } from 'lucide-react';
import { teacherScheduleData } from '@/lib/mock/teacherOverview.mock';

export const TodayScheduleCard: React.FC = () => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3>Today's Schedule</h3>
        <a href="#" className={styles.viewAll}>View full schedule</a>
      </div>
      
      <div className={styles.timeline}>
        {teacherScheduleData.map((schedule, index) => {
          const isOngoing = schedule.status === 'ongoing';
          return (
            <div key={schedule.id} className={styles.timelineItem}>
              <div className={`${styles.timelineDot} ${isOngoing ? styles.timelineDotActive : ''}`}></div>
              <div className={styles.timelineContent} style={{ width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div className={styles.timelineTime} style={isOngoing ? { color: '#8b5cf6', fontWeight: 600 } : {}}>
                    {schedule.time}
                  </div>
                  {isOngoing && <span className={styles.statusOngoing}>Ongoing</span>}
                </div>
                <div style={{ 
                  background: isOngoing ? 'rgba(139, 92, 246, 0.08)' : 'rgba(240, 239, 237, 0.02)', 
                  padding: '0.85rem 1rem', 
                  borderRadius: '8px', 
                  marginTop: '0.25rem', 
                  border: isOngoing ? '1px solid rgba(139, 92, 246, 0.2)' : '1px solid rgba(240, 239, 237, 0.05)' 
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <div className={styles.timelineTitle} style={{ fontSize: isOngoing ? '0.95rem' : '0.9rem', color: isOngoing ? '#fff' : 'rgba(240, 239, 237, 0.9)' }}>
                      {schedule.subject}
                    </div>
                    <div className={styles.timelineTitle} style={{ color: isOngoing ? '#8b5cf6' : 'rgba(240, 239, 237, 0.4)', fontSize: '0.75rem' }}>
                      {schedule.period}
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className={styles.timelineSub} style={{ color: isOngoing ? 'rgba(240, 239, 237, 0.7)' : 'rgba(240, 239, 237, 0.5)' }}>
                      {schedule.section}
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: isOngoing ? 'rgba(240, 239, 237, 0.6)' : 'rgba(240, 239, 237, 0.4)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <MapPin size={12} /> {schedule.room}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Users size={12} /> {schedule.students}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

