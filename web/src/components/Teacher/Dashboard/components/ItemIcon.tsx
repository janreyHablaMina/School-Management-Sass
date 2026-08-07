import React from 'react';
import styles from '../dashboard.module.css';

interface ItemIconProps {
  icon: string;
  bg: string;
  color: string;
}

export function ItemIcon({ icon, bg, color }: ItemIconProps) {
  return (
    <div className={styles.itemIcon} style={{ background: bg, color }}>
      {icon}
    </div>
  );
}
