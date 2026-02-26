import React from 'react';
import styles from '../../teacherProfile.module.css';
import { Megaphone, CheckCircle, FileText } from 'lucide-react';
import { teacherActivitiesData } from '@/lib/mock/teacherOverview.mock';

const getIconForType = (type: string) => {
  switch (type) {
    case 'announcement':
      return { icon: <Megaphone size={14} color="#111" />, bg: '#8b5cf6' };
    case 'grading':
      return { icon: <CheckCircle size={14} color="#111" />, bg: '#34d399' };
    case 'attendance':
      return { icon: <FileText size={14} color="#111" />, bg: '#ffab6b' };
    default:
      return { icon: <CheckCircle size={14} color="#111" />, bg: '#84a9ff' };
  }
};

export const RecentActivitiesCard: React.FC = () => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3>Recent Activities</h3>
        <a href="#" className={styles.viewAll}>View all history</a>
      </div>
      
      <div className={styles.timeline} style={{ marginTop: '0.5rem' }}>
        {teacherActivitiesData.map(activity => {
          const { icon, bg } = getIconForType(activity.type);
          return (
            <div key={activity.id} className={styles.timelineItem}>
              <div 
                className={styles.timelineDot} 
                style={{ 
                  background: bg, 
                  borderColor: bg, 
                  width: '24px', 
                  height: '24px', 
                  borderRadius: '6px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  marginLeft: '-7px', 
                  marginTop: '0' 
                }}
              >
                {icon}
              </div>
              <div className={styles.timelineContent}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div className={styles.timelineTitle}>{activity.title}</div>
                    <div className={styles.timelineSub}>{activity.sub}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className={styles.timelineTime}>{activity.time.split(',')[0]}</div>
                    {activity.time.split(',')[1] && (
                      <div className={styles.timelineSub} style={{ fontSize: '0.65rem' }}>
                        {activity.time.split(',')[1]}
                      </div>
                    )}
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

