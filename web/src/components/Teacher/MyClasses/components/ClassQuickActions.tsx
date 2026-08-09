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
          <p className={styles.quickEyebrow}>Quick actions</p>
          <h2 className={styles.quickTitle}>Jump in</h2>
        </div>
      </div>

      <div className={styles.featuredRow}>
        {featured.map((action) => (
          <button
            key={action.id}
            type="button"
            className={styles.featuredTile}
            onClick={() => openAction(action.tab, action.aiToolId)}
          >
            <span className={styles.featuredMark} style={{ background: action.accent }} />
            <span className={styles.featuredIcon}>{action.icon}</span>
            <span className={styles.featuredLabel}>{action.label}</span>
            <span className={styles.featuredHint}>{action.hint}</span>
          </button>
        ))}
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
