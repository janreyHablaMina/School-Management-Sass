'use client';

import { useEffect, useState } from 'react';

interface UseRowSelectionOptions<TId extends string | number> {
  visibleIds: TId[];
  /** Clears selection when this value changes (e.g. filters + page). */
  resetKey?: unknown;
}

export function useRowSelection<TId extends string | number>({
  visibleIds,
  resetKey,
}: UseRowSelectionOptions<TId>) {
  const [selectedIds, setSelectedIds] = useState<TId[]>([]);

  useEffect(() => {
    setSelectedIds([]);
  }, [resetKey]);

  const allVisibleSelected =
    visibleIds.length > 0 && visibleIds.every((id) => selectedIds.includes(id));

  const toggle = (id: TId) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const toggleAllVisible = () => {
    if (allVisibleSelected) {
      setSelectedIds((prev) => prev.filter((id) => !visibleIds.includes(id)));
      return;
    }
    setSelectedIds((prev) => Array.from(new Set([...prev, ...visibleIds])));
  };

  const clearSelection = () => setSelectedIds([]);

  return {
    selectedIds,
    selectedCount: selectedIds.length,
    allVisibleSelected,
    toggle,
    toggleAllVisible,
    clearSelection,
    setSelectedIds,
  };
}
