'use client';

import React from 'react';
import { createPortal } from 'react-dom';
import styles from './ui.module.css';

export interface ActionDropdownFixedStyle {
  top?: number;
  bottom?: number;
  right: number;
}

interface ActionDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  openUpwards?: boolean;
  /** When set, menu is portaled to body with fixed coords (escapes table overflow). */
  fixedStyle?: ActionDropdownFixedStyle | null;
  children: React.ReactNode;
}

export const ActionDropdown: React.FC<ActionDropdownProps> = ({
  isOpen,
  onClose,
  openUpwards = false,
  fixedStyle = null,
  children,
}) => {
  if (!isOpen) return null;

  const menu = (
    <>
      <div
        className={styles.dropdownOverlay}
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      />
      <div
        className={[
          styles.actionDropdownMenu,
          openUpwards ? styles.actionDropdownMenuUp : '',
          fixedStyle ? styles.actionDropdownMenuFixed : '',
        ]
          .filter(Boolean)
          .join(' ')}
        style={
          fixedStyle
            ? {
                top: fixedStyle.top,
                bottom: fixedStyle.bottom,
                right: fixedStyle.right,
              }
            : undefined
        }
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </>
  );

  if (fixedStyle && typeof document !== 'undefined') {
    return createPortal(menu, document.body);
  }

  return menu;
};

export const ActionDropdownItem: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    isDanger?: boolean;
    icon?: string;
  }
> = ({ isDanger, icon, className, onClick, children, ...props }) => {
  return (
    <button
      onClick={(e) => {
        if (onClick) onClick(e);
      }}
      className={`${styles.actionDropdownItem} ${isDanger ? styles.actionDropdownItemDelete : ''} ${className || ''}`}
      {...props}
    >
      {icon ? <span className={styles.actionDropdownIcon}>{icon}</span> : null}
      <span className={styles.actionDropdownLabel}>{children}</span>
    </button>
  );
};

export const ActionDropdownSeparator: React.FC = () => {
  return <div className={styles.dropdownSeparator} />;
};
