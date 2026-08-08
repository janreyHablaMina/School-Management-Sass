'use client';

import React, { useState } from 'react';
import {
  ActionDropdown,
  ActionDropdownItem,
  ActionDropdownSeparator,
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
}

export function RowActionsMenu({
  label,
  actions,
  dangerActions = [],
}: RowActionsMenuProps) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <div className={styles.actionsCell}>
      <div className={styles.menuWrap}>
        <button
          type="button"
          className={styles.moreBtn}
          aria-label={label}
          onClick={() => setOpen((value) => !value)}
        >
          ⋮
        </button>
        <ActionDropdown isOpen={open} onClose={close}>
          {actions.map((action) => (
            <ActionDropdownItem key={action.label} icon={action.icon} onClick={close}>
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
                  onClick={close}
                >
                  {action.label}
                </ActionDropdownItem>
              ))}
            </>
          ) : null}
        </ActionDropdown>
      </div>
    </div>
  );
}
