import React from 'react';
import styles from '../dashboard.module.css';
import { PanelHeader } from '../components/PanelHeader';
import { getInitials } from '../../utils';
import type { AttentionItem, ClassPerformance } from '@/types/teacherPortal';

interface StudentOverviewPanelProps {
  classPerformance: ClassPerformance[];
  attentionItems: AttentionItem[];
  onViewReport?: () => void;
}

export function StudentOverviewPanel({
  classPerformance,
  attentionItems,
  onViewReport,
}: StudentOverviewPanelProps) {
  return (
    <div className={`${styles.panel} ${styles.overviewPanel} ${styles.areaOverview}`}>
      <PanelHeader title="Student Overview" />

      {/* Compact summary strip */}
      <div className={styles.overviewStatStrip}>
        <div className={styles.overviewStatChip}>
          <span className={styles.overviewStatChipValue}>128</span>
          <span className={styles.overviewStatChipLabel}>Total Students</span>
        </div>
        <div className={styles.overviewStatChipDivider} />
        <div className={styles.overviewStatChip}>
          <span className={styles.overviewStatChipValue} style={{ color: '#5cc789' }}>92%</span>
          <span className={styles.overviewStatChipLabel}>Attendance Today</span>
        </div>
        <div className={styles.overviewStatChipDivider} />
        <div className={styles.overviewStatChip}>
          <span className={styles.overviewStatChipValue} style={{ color: '#f5a623' }}>4</span>
          <span className={styles.overviewStatChipLabel}>At-Risk Students</span>
        </div>
        <div className={styles.overviewStatChipDivider} />
        <div className={styles.overviewStatChip}>
          <span className={styles.overviewStatChipValue} style={{ color: '#84a9ff' }}>78%</span>
          <span className={styles.overviewStatChipLabel}>Submissions</span>
        </div>
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
      <button type="button" className={styles.panelFooterLink} onClick={onViewReport}>
        View full report ›
      </button>
    </div>
  );
}
