'use client';

import { useMemo, useRef, useState } from 'react';

interface UsePagedListOptions<TItem, TFilters extends Record<string, unknown>> {
  items: TItem[];
  initialFilters: TFilters;
  pageSize: number;
  filterFn: (item: TItem, filters: TFilters) => boolean;
}

export function usePagedList<TItem, TFilters extends Record<string, unknown>>({
  items,
  initialFilters,
  pageSize,
  filterFn,
}: UsePagedListOptions<TItem, TFilters>) {
  const [filters, setFilters] = useState(initialFilters);
  const [page, setPage] = useState(1);
  const filterFnRef = useRef(filterFn);
  filterFnRef.current = filterFn;

  const filteredItems = useMemo(
    () => items.filter((item) => filterFnRef.current(item, filters)),
    [items, filters]
  );

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const filteredCount = filteredItems.length;

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredItems.slice(start, start + pageSize);
  }, [filteredItems, currentPage, pageSize]);

  const setFilter = <K extends keyof TFilters>(key: K, value: TFilters[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const clearFilters = () => {
    setFilters(initialFilters);
    setPage(1);
  };

  const rangeStart = filteredCount === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const rangeEnd = Math.min(currentPage * pageSize, filteredCount);

  return {
    filters,
    setFilter,
    clearFilters,
    filteredCount,
    paginatedItems,
    page: currentPage,
    totalPages,
    setPage,
    rangeStart,
    rangeEnd,
  };
}
