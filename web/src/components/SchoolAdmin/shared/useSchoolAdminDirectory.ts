'use client';

import { useMemo } from 'react';
import {
  sortByConfig,
  useColumnSort,
  usePagedList,
  useRowSelection,
} from '@/components/Teacher/shared';

interface UseSchoolAdminDirectoryOptions<
  TItem,
  TSortKey extends string,
  TFilters extends Record<string, unknown>,
> {
  items: TItem[];
  initialFilters: TFilters;
  pageSize?: number;
  getId: (item: TItem) => string;
  filterItem: (item: TItem, filters: TFilters) => boolean;
  getSortValue: (item: TItem, key: TSortKey) => unknown;
}

export function useSchoolAdminDirectory<
  TItem,
  TSortKey extends string,
  TFilters extends Record<string, unknown>,
>({
  items,
  initialFilters,
  pageSize = 10,
  getId,
  filterItem,
  getSortValue,
}: UseSchoolAdminDirectoryOptions<TItem, TSortKey, TFilters>) {
  const { sortConfig, sortKey, sortDirection, handleSort } =
    useColumnSort<TSortKey>();

  const {
    filters,
    setFilter,
    clearFilters,
    isDirty,
    filteredCount,
    paginatedItems,
    page,
    totalPages,
    setPage,
    rangeStart,
    rangeEnd,
  } = usePagedList({
    items,
    initialFilters,
    pageSize,
    filterFn: filterItem,
    sortFn: (filteredItems) =>
      sortByConfig(filteredItems, sortConfig, getSortValue),
    sortDeps: sortConfig,
  });

  const visibleIds = useMemo(
    () => paginatedItems.map((item) => getId(item)),
    [getId, paginatedItems],
  );

  const {
    selectedIds,
    toggle,
    clearSelection,
    setSelectedIds,
  } = useRowSelection({
    visibleIds,
    resetKey: `${page}|${JSON.stringify(filters)}`,
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(visibleIds);
      return;
    }
    clearSelection();
  };

  return {
    filters,
    setFilter,
    clearFilters,
    isDirty,
    filteredCount,
    paginatedItems,
    page,
    totalPages,
    setPage,
    rangeStart,
    rangeEnd,
    selectedIds,
    handleSelectAll,
    handleSelectItem: toggle,
    clearSelection,
    handleSort,
    sortKey,
    sortDirection,
  };
}
