import React from 'react';
import styles from '../dashboard.module.css';
import { PanelHeader } from '../components/PanelHeader';
import { ItemIcon } from '../components/ItemIcon';
import type { AiTool, AiUsage } from '@/types/teacherPortal';

interface AiAssistantPanelProps {
  aiCredits: number;
  aiUsage: AiUsage;
  aiTools: AiTool[];
  onOpenAssistant?: () => void;
}

export function AiAssistantPanel({
  aiCredits,
  aiUsage,
  aiTools,
  onOpenAssistant,
}: AiAssistantPanelProps) {
  return (
    <div className={`${styles.panel} ${styles.aiPanel} ${styles.areaAi}`}>
      <PanelHeader
        title="AI Teaching Assistant"
        right={
          <span className={styles.aiCreditsHint}>✨ {aiCredits.toLocaleString()} left</span>
        }
      />

      <div className={styles.aiUsageBox}>
        <div className={styles.aiUsageTop}>
          <span>Credits used this month</span>
          <span>
            {aiUsage.used} / {aiUsage.total}
          </span>
        </div>
        <div className={styles.aiUsageTrack}>
          <div className={styles.aiUsageFill} style={{ width: `${aiUsage.percent}%` }} />
        </div>
      </div>

      <div className={styles.aiToolList}>
        {aiTools.map((tool) => (
          <button
            type="button"
            key={tool.id}
            className={styles.aiToolRow}
            onClick={onOpenAssistant}
          >
            <ItemIcon icon={tool.icon} bg={tool.iconBg} color={tool.iconColor} />
            <div className={styles.aiToolContent}>
              <span className={styles.aiToolTitle}>{tool.title}</span>
              <span className={styles.aiToolDesc}>{tool.desc}</span>
            </div>
            <span className={styles.aiToolCredits}>{tool.credits}</span>
            <span className={styles.aiToolArrow}>›</span>
          </button>
        ))}
      </div>
      <button type="button" className={styles.panelFooterLink} onClick={onOpenAssistant}>
        View all AI tools ›
      </button>
    </div>
  );
}
