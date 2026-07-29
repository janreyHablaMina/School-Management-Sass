import React from 'react';
import styles from './HistoryTab.module.css';
import { 
  Activity, FileText, Calendar, User, BookOpen, 
  Users, MessageSquare, Shield, Download, 
  ChevronLeft, ChevronRight, MoreHorizontal, UserPlus 
} from 'lucide-react';
import { InfoCard, StatBox } from '../../shared/SharedComponents';
import { ACTIVITY_HISTORY, HISTORY_STATS, ACTIVITY_BREAKDOWN, ADVISOR_NOTES } from '../../../../../../lib/mock/studentProfile.mock';

export const HistoryTab: React.FC = () => {

  // Helper to map icon string to Lucide component
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'activity': return <Activity size={16} />;
      case 'file-text': return <FileText size={16} />;
      case 'calendar': return <Calendar size={16} />;
      case 'user': return <User size={16} />;
      case 'book-open': return <BookOpen size={16} />;
      case 'users': return <Users size={16} />;
      case 'message-square': return <MessageSquare size={16} />;
      case 'shield': return <Shield size={16} />;
      case 'user-plus': return <UserPlus size={16} />;
      default: return <Activity size={16} />;
    }
  };

  // Compute conic gradient for donut chart
  let currentPercent = 0;
  const gradientStops = ACTIVITY_BREAKDOWN.map(item => {
    const start = currentPercent;
    currentPercent += item.percentage;
    return `${item.color} ${start}%, ${item.color} ${currentPercent}%`;
  }).join(', ');
  const donutBackground = `conic-gradient(${gradientStops})`;

  return (
    <div className={styles.historyGrid}>
      
      {/* Left Column: Activity History */}
      <div className={styles.leftCol}>
        <div className={styles.historyHeader}>
          <span className={styles.title}>Activity History</span>
          <span className={styles.subtitle}>A record of important activities and changes related to the student's academic journey.</span>
        </div>

        <div className={styles.controlsRow}>
          <button className={styles.controlItem}>
            All Activities <ChevronRight size={14} style={{ transform: 'rotate(90deg)' }} />
          </button>
          
          <button className={styles.controlItem}>
            May 1, 2025 - May 30, 2026 <Calendar size={14} />
          </button>

          <div className={styles.controlItem} style={{ padding: '0.5rem 0.8rem' }}>
            <Activity size={14} style={{ color: 'rgba(240, 239, 237, 0.4)' }} />
            <input type="text" placeholder="Search in history..." className={styles.searchInput} />
          </div>

          <button className={styles.exportBtn}>
            <Download size={14} /> Export
          </button>
        </div>

        <div className={styles.historyTableWrapper}>
          <table className={styles.historyTable}>
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>Activity</th>
                <th>Description</th>
                <th>Performed By</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {ACTIVITY_HISTORY.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className={styles.dateTimeCol}>
                      <span className={styles.dateText}>{item.dateStr}</span>
                      <span className={styles.timeText}>{item.timeStr}</span>
                    </div>
                  </td>
                  <td>
                    <div className={styles.activityFlex}>
                      <div className={styles.activityIconBox} style={{ background: item.activityIconBg, color: item.activityIconColor }}>
                        {getIcon(item.activityIcon)}
                      </div>
                      <span className={styles.activityTitle}>{item.activityTitle}</span>
                    </div>
                  </td>
                  <td>
                    <div className={styles.descFlex}>
                      <span className={styles.descText}>{item.description}</span>
                      {item.badgeText && (
                        <span className={styles.badge} style={{ color: item.badgeColor, background: item.badgeBg }}>
                          {item.badgeText}
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className={styles.personCol}>
                      <span className={styles.personName}>{item.performedBy}</span>
                      <span className={styles.personRole}>{item.role}</span>
                    </div>
                  </td>
                  <td>
                    <button className={styles.actionBtn}>
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.pagination}>
            <span className={styles.pageInfo}>Showing 1 to 8 of 8 activities</span>
            <div className={styles.pageControls}>
              <button className={styles.pageBtn}><ChevronLeft size={14} /></button>
              <button className={`${styles.pageBtn} ${styles.active}`}>1</button>
              <button className={styles.pageBtn}><ChevronRight size={14} /></button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Sidebar */}
      <div className={styles.rightCol}>
        {/* History Overview */}
        <InfoCard title="History Overview">
          <div className={styles.statsGrid}>
            {HISTORY_STATS.map(stat => (
              <StatBox key={stat.id} {...stat} icon={getIcon(stat.icon) as any} />
            ))}
          </div>
        </InfoCard>

        {/* Activity Breakdown */}
        <InfoCard title="Activity Breakdown">
          <div className={styles.donutWrapper}>
            <div className={styles.donutChart} style={{ background: donutBackground }}></div>
            
            <div className={styles.donutLegend}>
              {ACTIVITY_BREAKDOWN.map((item, idx) => (
                <div key={idx} className={styles.legendItem}>
                  <div className={styles.legendFlex}>
                    <div className={styles.legendDot} style={{ background: item.color }}></div>
                    <span className={styles.legendLabel}>{item.label}</span>
                  </div>
                  <span className={styles.legendValue}>{item.count} ({item.percentage}%)</span>
                </div>
              ))}
            </div>
          </div>
        </InfoCard>

        {/* Recent Advisor Notes */}
        <InfoCard 
          title="Recent Advisor Notes" 
          icon={<FileText size={16} />} 
          iconBg="rgba(182, 142, 255, 0.1)" 
          iconColor="#b68eff"
          headerRight={<button className={styles.viewAllBtn}>View All</button>}
        >
          <div className={styles.notesContent}>
            <div className={styles.notesDateTime}>
              {ADVISOR_NOTES.dateStr} • {ADVISOR_NOTES.timeStr}
            </div>
            <div className={styles.notesText}>
              {ADVISOR_NOTES.content}
            </div>
            <div className={styles.notesAuthor}>
              <img src={ADVISOR_NOTES.avatarUrl} alt={ADVISOR_NOTES.advisorName} className={styles.authorAvatar} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span className={styles.authorName}>{ADVISOR_NOTES.advisorName}</span>
                <span className={styles.authorRole}>{ADVISOR_NOTES.advisorRole}</span>
              </div>
            </div>
          </div>
        </InfoCard>
      </div>

    </div>
  );
};
