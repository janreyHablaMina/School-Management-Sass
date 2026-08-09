'use client';

import React from 'react';
import styles from '../settings.module.css';

interface SettingsSectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export function SettingsSection({ title, description, children }: SettingsSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        <p className={styles.sectionCopy}>{description}</p>
      </div>
      <div className={styles.sectionBody}>{children}</div>
    </section>
  );
}
