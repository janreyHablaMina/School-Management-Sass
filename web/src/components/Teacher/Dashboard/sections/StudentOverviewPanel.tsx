import React from 'react';
import styles from '../dashboard.module.css';
import { PanelHeader } from '../components/PanelHeader';
import { MiniSparkline } from '../components/MiniSparkline';
import { getInitials } from '../../utils';
import type { AttentionItem, ClassPerformance, OverviewStat } from '@/types/teacherPortal';

interface StudentOverviewPanelProps {
  studentOverview: OverviewStat[];
  classPerformance: ClassPerformance[];
  attentionItems: AttentionItem[];
}

export function StudentOverviewPanel({
  studentOverview,
  classPerformance,
  attentionItems,
}: StudentOverviewPanelProps) {
  return (
    <div className={`${styles.panel} ${styles.overviewPanel} ${styles.areaOverview}`}>
      <PanelHeader
        title="Student Overview"
        right={
          <button type="button" className={styles.panelLink}>
            View report
          </button>
        }
      />

      <div className={styles.overviewGrid}>
        {studentOverview.map((item) => (
          <div key={item.id} className={styles.overviewCard}>
            <span className={styles.overviewLabel}>{item.label}</span>
            <div className={styles.overviewValueRow}>
              <span className={styles.overviewValue}>{item.value}</span>
              <span className={`${styles.overviewChange} ${item.up ? styles.up : styles.down}`}>
                {item.up ? '↑' : '↓'} {item.change}
              </span>
            </div>
            <MiniSparkline path={item.path} stroke={item.stroke} />
          </div>
        ))}
      </div>

      <div className={styles.overviewSplit}>
        <div className={styles.performanceBlock}>
          <div className={styles.overviewSubHeader}>
            <span>Class Performance</span>
          </div>
          <div className={styles.performanceList}>
            {classPerformance.map((cls) => (
              <div key={cls.id} className={styles.performanceRow}>
                <div className={styles.performanceMeta}>
                  <span className={styles.performanceName}>{cls.name}</span>
                  <span className={styles.performanceSubject}>{cls.subject}</span>
                </div>
                <div className={styles.performanceBarTrack}>
                  <div
                    className={styles.performanceBarFill}
                    style={{ width: `${cls.score}%`, background: cls.color }}
                  />
                </div>
                <span className={styles.performanceScore} style={{ color: cls.color }}>
                  {cls.score}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.attentionBlock}>
          <div className={styles.overviewSubHeader}>
            <span>Needs Attention</span>
            <span className={styles.attentionBadge}>{attentionItems.length}</span>
          </div>
          <div className={styles.attentionList}>
            {attentionItems.map((item) => (
              <div key={item.id} className={styles.attentionRow}>
                <div className={styles.attentionAvatar}>{getInitials(item.name)}</div>
                <div className={styles.attentionContent}>
                  <p className={styles.attentionName}>{item.name}</p>
                  <p className={styles.attentionDetail}>{item.detail}</p>
                </div>
                <span
                  className={styles.attentionTag}
                  style={{ color: item.tagColor, borderColor: `${item.tagColor}66` }}
                >
                  {item.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
