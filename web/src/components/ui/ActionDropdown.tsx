import React from 'react';
import styles from './ui.module.css';

interface ActionDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  openUpwards?: boolean;
  children: React.ReactNode;
}

export const ActionDropdown: React.FC<ActionDropdownProps> = ({ 
  isOpen, 
  onClose, 
  openUpwards = false,
  children 
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div 
        className={styles.dropdownOverlay} 
        onClick={(e) => { 
          e.stopPropagation(); 
          onClose(); 
        }} 
      />
      <div 
        className={`${styles.actionDropdownMenu} ${openUpwards ? styles.actionDropdownMenuUp : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </>
  );
};

export const ActionDropdownItem: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { isDanger?: boolean }> = ({ 
  isDanger, 
  className, 
  onClick,
  ...props 
}) => {
  return (
    <button 
      onClick={(e) => {
        if (onClick) onClick(e);
      }}
      className={`${styles.actionDropdownItem} ${isDanger ? styles.actionDropdownItemDelete : ''} ${className || ''}`}
      {...props}
    />
  );
};

export const ActionDropdownSeparator: React.FC = () => {
  return <div className={styles.dropdownSeparator} />;
};
