'use client';

import type { ReactNode } from 'react';
import styles from './classHub.module.css';

interface ClassHubHeaderProps {
  subject: string;
  icon: string;
  accent: string;
  meta: ReactNode;
  onBack: () => void;
  titleExtra?: ReactNode;
  actions?: ReactNode;
  backLabel?: string;
}

export function ClassHubHeader({
  subject,
  icon,
  accent,
  meta,
  onBack,
  titleExtra,
  actions,
  backLabel = '← All classes',
}: ClassHubHeaderProps) {
  return (
    <header className={styles.detailHeader}>
      <button type="button" className={styles.backLink} onClick={onBack}>
        {backLabel}
      </button>

      <div className={styles.detailHeaderRow}>
        <div className={styles.detailIdentity}>
          <div
            className={styles.detailIcon}
            style={{
              background: `${accent}22`,
              color: accent,
              borderColor: `${accent}66`,
            }}
          >
            {icon}
          </div>
          <div>
            {titleExtra ? (
              <div className={styles.detailTitleRow}>
                <h1 className={styles.detailTitle}>{subject}</h1>
                {titleExtra}
              </div>
            ) : (
              <h1 className={styles.detailTitle}>{subject}</h1>
            )}
            <p className={styles.detailMeta}>{meta}</p>
          </div>
        </div>

        {actions ? <div className={styles.detailActions}>{actions}</div> : null}
      </div>
    </header>
  );
}

export { styles as classHubStyles };
