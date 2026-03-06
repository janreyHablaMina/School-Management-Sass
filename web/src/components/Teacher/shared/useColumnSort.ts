'use client';

import { useState } from 'react';

export type SortDirection = 'asc' | 'desc';
export type SortConfig<K extends string> = {
  key: K;
  direction: SortDirection;
} | null;

export function useColumnSort<K extends string>() {
  const [sortConfig, setSortConfig] = useState<SortConfig<K>>(null);

  const handleSort = (key: K) => {
    setSortConfig((current) => {
      if (current && current.key === key) {
        if (current.direction === 'asc') return { key, direction: 'desc' };
        return null;
      }
      return { key, direction: 'asc' };
    });
  };

  return {
    sortConfig,
    sortKey: (sortConfig?.key ?? null) as K | null,
    sortDirection: (sortConfig?.direction ?? 'asc') as SortDirection,
    handleSort,
    setSortConfig,
  };
}

export function compareSortValues(left: unknown, right: unknown): number {
  if (typeof left === 'number' && typeof right === 'number') return left - right;
  return String(left ?? '').localeCompare(String(right ?? ''), undefined, {
    numeric: true,
    sensitivity: 'base',
  });
}

export function sortByConfig<T, K extends string>(
  items: T[],
  sortConfig: SortConfig<K>,
  getValue: (item: T, key: K) => unknown,
  tieBreak?: (a: T, b: T) => number,
): T[] {
  if (!sortConfig) return items;
  const sorted = [...items];
  sorted.sort((a, b) => {
    let cmp = compareSortValues(
      getValue(a, sortConfig.key),
      getValue(b, sortConfig.key),
    );
    if (cmp === 0 && tieBreak) cmp = tieBreak(a, b);
    return sortConfig.direction === 'asc' ? cmp : -cmp;
  });
  return sorted;
}
