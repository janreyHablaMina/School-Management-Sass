import React from 'react';
import styles from './listPage.module.css';

interface ClassMetaProps {
  classLabel: string;
  /** When set, supports multi-class lessons with a compact +N badge. */
  classLabels?: string[];
  subject: string;
}

export function ClassMeta({ classLabel, classLabels, subject }: ClassMetaProps) {
  const labels =
    classLabels && classLabels.length > 0
      ? classLabels
      : classLabel
        ? [classLabel]
        : [];
  const primary = labels[0] ?? classLabel;
  const extra = Math.max(0, labels.length - 1);
  const allClassesTitle = labels.join(', ');

  return (
    <div className={styles.classMeta} title={extra > 0 ? allClassesTitle : undefined}>
      <div className={styles.classMetaPrimaryRow}>
        <p className={styles.classMetaLabel}>{primary}</p>
        {extra > 0 ? (
          <span className={styles.classMetaCount} aria-label={`${extra} more classes`}>
            +{extra}
          </span>
        ) : null}
      </div>
      <p className={styles.classMetaSubject}>{subject}</p>
    </div>
  );
}
