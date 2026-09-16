'use client';

import { useEffect } from 'react';

/** Prevents page + teacher workspace scroll while a modal is open. */
export function useLockWorkspaceScroll() {
  useEffect(() => {
    const workspace = document.querySelector<HTMLElement>('section[class*="mainWorkspace"]');
    const previousWorkspaceOverflow = workspace?.style.overflow ?? '';
    const previousBodyOverflow = document.body.style.overflow;

    if (workspace) workspace.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    return () => {
      if (workspace) workspace.style.overflow = previousWorkspaceOverflow;
      document.body.style.overflow = previousBodyOverflow;
    };
  }, []);
}
