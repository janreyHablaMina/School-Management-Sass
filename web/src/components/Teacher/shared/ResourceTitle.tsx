import React from 'react';
import styles from './listPage.module.css';

interface ResourceTitleProps {
  icon?: string;
  accent?: string;
  title: string;
  description?: string;
  footer?: React.ReactNode;
}

export function ResourceTitle({
  icon,
  accent = 'currentColor',
  title,
  description,
  footer,
}: ResourceTitleProps) {
  return (
    <div className={styles.resourceTitle}>
      {icon && (
        <div
          className={styles.resourceIcon}
          style={{
            background: `${accent}22`,
            color: accent,
            borderColor: `${accent}55`,
          }}
        >
          {icon}
        </div>
      )}
      <div className={styles.resourceMeta}>
        <p className={styles.resourceName}>{title}</p>
        {description && <p className={styles.resourceDesc}>{description}</p>}
        {footer && <div className={styles.resourceFooter}>{footer}</div>}
      </div>
    </div>
  );
}
