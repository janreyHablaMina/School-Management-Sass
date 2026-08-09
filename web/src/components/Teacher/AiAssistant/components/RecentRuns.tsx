import React from 'react';
import type { AiRecentRun } from '@/types/teacherAiAssistant';
import styles from '../aiAssistant.module.css';

interface RecentRunsProps {
  runs: AiRecentRun[];
  onSelect: (run: AiRecentRun) => void;
}

export function RecentRuns({ runs, onSelect }: RecentRunsProps) {
  return (
    <div className={`${styles.panel} ${styles.recentPanel}`}>
      <div className={styles.recentHeader}>
        <p className={styles.recentEyebrow}>History</p>
        <h3 className={styles.recentTitle}>Recent runs</h3>
      </div>
      {runs.length === 0 ? (
        <p className={styles.recentEmpty}>Generated work will show up here.</p>
      ) : (
        <ul className={styles.recentList}>
          {runs.map((run) => (
            <li key={run.id}>
              <button type="button" className={styles.recentItem} onClick={() => onSelect(run)}>
                <span className={styles.recentIcon}>{run.toolIcon}</span>
                <span className={styles.recentBody}>
                  <span className={styles.recentItemTitle}>{run.toolTitle}</span>
                  <span className={styles.recentPreview}>{run.preview}</span>
                  <span className={styles.recentMeta}>
                    {run.classroom} · {run.createdAt}
                    {run.creditsSpent > 0 ? ` · ${run.creditsSpent} cr` : ' · Free'}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
