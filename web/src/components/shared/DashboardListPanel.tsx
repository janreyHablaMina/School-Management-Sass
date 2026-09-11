import React from 'react';
import styles from './dashboardListPanel.module.css';

export interface DashboardListItem {
  id: string | number;
  title: string;
  description: string;
  color: string;
  badge: string;
  icon?: string;
  month?: string;
  day?: string;
  meta?: string;
}

interface DashboardListPanelProps {
  title: string;
  items: DashboardListItem[];
  footerLabel: string;
}

export function DashboardListPanel({ title, items, footerLabel }: DashboardListPanelProps) {
  return (
    <section className={styles.panel}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
      </div>
      <div className={styles.list}>
        {items.map((item) => (
          <div key={item.id} className={styles.row}>
            <div
              className={styles.markerBox}
              style={{ borderColor: `${item.color}88`, color: item.color }}
            >
              {item.month && item.day ? (
                <>
                  <span className={styles.markerMonth}>{item.month}</span>
                  <span className={styles.markerDay}>{item.day}</span>
                </>
              ) : (
                item.icon
              )}
            </div>
            <div className={styles.content}>
              <div className={styles.titleRow}>
                <p className={styles.itemTitle}>{item.title}</p>
              </div>
              <p className={styles.description}>{item.description}</p>
              {item.meta && <span className={styles.meta}>{item.meta}</span>}
            </div>
            <span
              className={styles.badge}
              style={{ color: item.color, borderColor: `${item.color}55` }}
            >
              {item.badge}
            </span>
          </div>
        ))}
      </div>
      <button type="button" className={styles.footerLink}>
        {footerLabel}
      </button>
    </section>
  );
}
