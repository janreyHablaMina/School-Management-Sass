import React from 'react';
import styles from './listPage.module.css';

interface ClassMetaProps {
  classLabel: string;
  subject: string;
}

export function ClassMeta({ classLabel, subject }: ClassMetaProps) {
  return (
    <div className={styles.classMeta}>
      <p className={styles.classMetaLabel}>{classLabel}</p>
      <p className={styles.classMetaSubject}>{subject}</p>
    </div>
  );
}
