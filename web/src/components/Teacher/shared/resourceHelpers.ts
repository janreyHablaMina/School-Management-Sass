export function rateBarColor(rate: number, midAccent = '#84a9ff'): string {
  if (rate >= 90) return '#5cc789';
  if (rate >= 70) return midAccent;
  if (rate >= 50) return '#f5a623';
  return '#ff7e93';
}

export function accentFromMap(
  map: Record<string, string>,
  key: string,
  fallback = '#f0efed'
): string {
  return map[key] ?? fallback;
}

export function matchesSearch(query: string, fields: string[]): boolean {
  const q = query.trim().toLowerCase();
  return !q || fields.some((field) => field.toLowerCase().includes(q));
}

export function matchesAllOrExact(selected: string, value: string, allLabel: string): boolean {
  return selected === allLabel || value === selected;
}

type SortableByCreated = { createdSortKey: string; title: string; dueSortKey?: string };

export function sortByCreatedOrTitle<T extends SortableByCreated>(
  items: T[],
  sort: string
): T[] {
  const sorted = [...items];

  if (sort === 'Oldest First') {
    sorted.sort((a, b) => a.createdSortKey.localeCompare(b.createdSortKey));
    return sorted;
  }

  if (sort === 'Due Date') {
    sorted.sort((a, b) => (a.dueSortKey ?? '').localeCompare(b.dueSortKey ?? ''));
    return sorted;
  }

  if (sort === 'Title A-Z') {
    sorted.sort((a, b) => a.title.localeCompare(b.title));
    return sorted;
  }

  sorted.sort((a, b) => b.createdSortKey.localeCompare(a.createdSortKey));
  return sorted;
}
