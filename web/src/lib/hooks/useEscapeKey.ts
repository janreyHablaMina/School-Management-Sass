'use client';

import { useEffect, useEffectEvent } from 'react';

/** Calls `onEscape` when the user presses Escape. */
export function useEscapeKey(onEscape: () => void) {
  const handleEscape = useEffectEvent(onEscape);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handleEscape();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [handleEscape]);
}
