'use client';

import { useEffect, useState, type RefObject } from 'react';

/** Tracks whether a workspace (or window) has scrolled past a small threshold. */
export function useWorkspaceScroll(workspaceRef: RefObject<HTMLElement | null>, threshold = 10) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = workspaceRef.current?.scrollTop ?? 0;
      setIsScrolled(scrollTop > threshold || window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll, true);
    return () => window.removeEventListener('scroll', handleScroll, true);
  }, [workspaceRef, threshold]);

  return isScrolled;
}
