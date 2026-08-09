'use client';

import React from 'react';
import type { SettingsSection } from '@/types/teacherSettings';
import { SECTION_META } from '../settingsMeta';
import styles from '../settings.module.css';

interface SettingsNavProps {
  active: SettingsSection;
  onChange: (section: SettingsSection) => void;
}

export function SettingsNav({ active, onChange }: SettingsNavProps) {
  return (
    <aside className={styles.navPanel}>
      <p className={styles.navEyebrow}>Workspace</p>
      <h3 className={styles.navTitle}>Account</h3>
      <nav className={styles.nav} aria-label="Settings sections">
        {SECTION_META.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`${styles.navBtn} ${active === item.id ? styles.navBtnActive : ''}`}
            onClick={() => onChange(item.id)}
          >
            <span className={styles.navIcon} aria-hidden>
              {item.icon}
            </span>
            <span className={styles.navText}>
              <span className={styles.navLabel}>{item.id}</span>
              <span className={styles.navHint}>{item.hint}</span>
            </span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
