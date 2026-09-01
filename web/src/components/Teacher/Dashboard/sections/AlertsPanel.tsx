import React from 'react';
import styles from '../dashboard.module.css';
import { PanelHeader } from '../components/PanelHeader';
import { getInitials } from '../../utils';
import type { AttentionItem } from '@/types/teacherPortal';

interface AlertsPanelProps {
  attentionItems: AttentionItem[];
  onViewAll?: () => void;
  onSelectStudent?: (id: number) => void;
}

export function AlertsPanel({
  attentionItems,
  onViewAll,
  onSelectStudent,
}: AlertsPanelProps) {
  return (
    <div className={`${styles.panel} ${styles.alertsPanel}`}>
      <PanelHeader
        title="Needs Attention"
        right={
          <span className={styles.attentionBadge}>{attentionItems.length}</span>
        }
      />

      <div className={styles.attentionList}>
        {attentionItems.length === 0 && (
          <div className={styles.alertsEmpty}>
            <span className={styles.alertsEmptyIcon}>✅</span>
            <p>All students are on track!</p>
          </div>
        )}
        {attentionItems.slice(0, 4).map((item) => (
          <div
            key={item.id}
            className={styles.attentionRow}
            onClick={() => (onSelectStudent ? onSelectStudent(item.id) : onViewAll?.())}
          >
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
      <button type="button" className={styles.panelFooterLink} onClick={onViewAll}>
        View all students ›
      </button>
    </div>
  );
}
