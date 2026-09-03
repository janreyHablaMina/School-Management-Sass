'use client';

import { toClassFocus, type TeacherNavRequest } from '@/lib/teacher/classFocus';
import type { MyClassRow } from '@/types/myClasses';
import { CLASS_QUICK_ACTIONS } from '../classQuickActions';
import styles from '../myClasses.module.css';

interface ClassQuickActionsProps {
  cls: MyClassRow;
  onNavigate?: (request: TeacherNavRequest | string) => void;
}

export function ClassQuickActions({ cls, onNavigate }: ClassQuickActionsProps) {
  const featured = CLASS_QUICK_ACTIONS.filter((action) => action.featured);
  const more = CLASS_QUICK_ACTIONS.filter((action) => !action.featured);
  const classFocus = toClassFocus(cls);

  const openAction = (tab: string, aiToolId?: number) => {
    onNavigate?.({ tab, aiToolId, classFocus });
  };

  return (
    <section className={styles.quickActions} aria-label="Class quick actions">
      <div className={styles.quickIntro}>
        <div>
          <h2 className={styles.quickTitle}>Jump in</h2>
          <p className={styles.quickEyebrow}>What would you like to do today?</p>
        </div>
      </div>

      <div className={styles.featuredGrid}>
        {featured.map((action, index) => {
          const isPrimary = index === 0;
          return (
            <button
              key={action.id}
              type="button"
              className={`${styles.featuredCard} ${isPrimary ? styles.primaryCard : ''}`}
              onClick={() => openAction(action.tab, action.aiToolId)}
            >
              <div 
                className={styles.cardIconBox} 
                style={{ 
                  background: action.accent, 
                  boxShadow: `0 4px 20px ${action.accent}50` 
                }}
              >
                <span className={styles.cardIcon}>{action.icon}</span>
              </div>
              <div className={styles.cardContent}>
                <span className={styles.cardLabel}>{action.label}</span>
                <span className={styles.cardHint}>{action.hint}</span>
              </div>
              {isPrimary && (
                <div 
                  className={styles.cardGlow} 
                  style={{ background: `radial-gradient(circle at bottom right, ${action.accent}30, transparent 60%)` }} 
                />
              )}
            </button>
          );
        })}
      </div>

      <div className={styles.moreRow}>
        <span className={styles.moreLabel}>Also open</span>
        <div className={styles.moreLinks}>
          {more.map((action) => (
            <button
              key={action.id}
              type="button"
              className={styles.moreLink}
              onClick={() => openAction(action.tab, action.aiToolId)}
            >
              <span aria-hidden>{action.icon}</span>
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
