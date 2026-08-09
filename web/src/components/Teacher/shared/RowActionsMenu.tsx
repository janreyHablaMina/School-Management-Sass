'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import {
  ActionDropdown,
  ActionDropdownItem,
  ActionDropdownSeparator,
  type ActionDropdownFixedStyle,
} from '@/components/ui/ActionDropdown';
import styles from './listPage.module.css';

export interface RowActionItem {
  icon: string;
  label: string;
}

interface RowActionsMenuProps {
  label: string;
  actions: readonly RowActionItem[];
  dangerActions?: readonly RowActionItem[];
  onAction?: (label: string) => void;
}

const MENU_ESTIMATED_HEIGHT = 260;
const MENU_GAP = 6;

function positionForTrigger(trigger: HTMLElement): ActionDropdownFixedStyle {
  const rect = trigger.getBoundingClientRect();
  const spaceBelow = window.innerHeight - rect.bottom;
  const openUpwards =
    spaceBelow < MENU_ESTIMATED_HEIGHT && rect.top > MENU_ESTIMATED_HEIGHT;

  return {
    right: Math.max(8, window.innerWidth - rect.right),
    ...(openUpwards
      ? { bottom: Math.max(8, window.innerHeight - rect.top + MENU_GAP) }
      : { top: rect.bottom + MENU_GAP }),
  };
}

export function RowActionsMenu({
  label,
  actions,
  dangerActions = [],
  onAction,
}: RowActionsMenuProps) {
  const [open, setOpen] = useState(false);
  const [fixedStyle, setFixedStyle] = useState<ActionDropdownFixedStyle | null>(
    null,
  );
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = () => {
    setOpen(false);
    setFixedStyle(null);
  };

  const updatePosition = () => {
    const trigger = triggerRef.current;
    if (!trigger) return;
    setFixedStyle(positionForTrigger(trigger));
  };

  useLayoutEffect(() => {
    if (!open) return;
    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [open]);

  const handleAction = (actionLabel: string) => {
    onAction?.(actionLabel);
    close();
  };

  return (
    <div className={styles.actionsCell}>
      <div className={styles.menuWrap}>
        <button
          ref={triggerRef}
          type="button"
          className={styles.moreBtn}
          aria-label={label}
          aria-expanded={open}
          onClick={() => {
            if (open) {
              close();
              return;
            }
            const trigger = triggerRef.current;
            if (!trigger) return;
            setFixedStyle(positionForTrigger(trigger));
            setOpen(true);
          }}
        >
          ⋮
        </button>
        {open && fixedStyle ? (
          <ActionDropdown isOpen onClose={close} fixedStyle={fixedStyle}>
            {actions.map((action) => (
              <ActionDropdownItem
                key={action.label}
                icon={action.icon}
                onClick={() => handleAction(action.label)}
              >
                {action.label}
              </ActionDropdownItem>
            ))}
            {dangerActions.length > 0 ? (
              <>
                <ActionDropdownSeparator />
                {dangerActions.map((action) => (
                  <ActionDropdownItem
                    key={action.label}
                    icon={action.icon}
                    isDanger
                    onClick={() => handleAction(action.label)}
                  >
                    {action.label}
                  </ActionDropdownItem>
                ))}
              </>
            ) : null}
          </ActionDropdown>
        ) : null}
      </div>
    </div>
  );
}
