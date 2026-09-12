import { useMemo, useState } from 'react';
import { schoolAdminMockData } from '@/lib/mock/schoolAdmin.mock';

export type ParentRecord = (typeof schoolAdminMockData.parents)[number];
export type ParentSortKey =
  | 'name'
  | 'relationship'
  | 'studentName'
  | 'grade'
  | 'status'
  | 'lastLogin';

const PAGE_SIZE = 10;

function valueForSort(parent: ParentRecord, key: ParentSortKey) {
  if (key === 'grade') return parent.gradeSection;
  return parent[key];
}

export function useParents() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [relationshipFilter, setRelationshipFilter] = useState('All Relationships');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedParents, setSelectedParents] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: ParentSortKey;
    direction: 'asc' | 'desc';
  } | null>(null);

  const handleSort = (key: ParentSortKey) => {
    setSortConfig((current) => {
      if (current && current.key === key) {
        if (current.direction === 'asc') return { key, direction: 'desc' };
        return null;
      }
      return { key, direction: 'asc' };
    });
  };

  const filteredParents = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    let parents = schoolAdminMockData.parents.filter((parent) => {
      const matchesSearch =
        normalizedSearch === '' ||
        parent.name.toLowerCase().includes(normalizedSearch) ||
        parent.email.toLowerCase().includes(normalizedSearch) ||
        parent.contact.toLowerCase().includes(normalizedSearch) ||
        parent.studentName.toLowerCase().includes(normalizedSearch) ||
        parent.studentId.toLowerCase().includes(normalizedSearch);

      const matchesStatus =
        statusFilter === 'All Status' || parent.status === statusFilter;

      const matchesRelationship =
        relationshipFilter === 'All Relationships' ||
        parent.relationship === relationshipFilter;

      return matchesSearch && matchesStatus && matchesRelationship;
    });

    if (sortConfig) {
      parents = [...parents].sort((a, b) => {
        const left = String(valueForSort(a, sortConfig.key));
        const right = String(valueForSort(b, sortConfig.key));
        const comparison = left.localeCompare(right, undefined, {
          numeric: true,
          sensitivity: 'base',
        });
        return sortConfig.direction === 'asc' ? comparison : -comparison;
      });
    }

    return parents;
  }, [relationshipFilter, searchTerm, sortConfig, statusFilter]);

  const totalCount = filteredParents.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const page = Math.min(currentPage, totalPages);
  const pagedParents = filteredParents.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedParents(pagedParents.map((parent) => parent.id));
      return;
    }
    setSelectedParents([]);
  };

  const handleSelectParent = (id: string) => {
    setSelectedParents((current) =>
      current.includes(id)
        ? current.filter((parentId) => parentId !== id)
        : [...current, id],
    );
  };

  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('All Status');
    setRelationshipFilter('All Relationships');
    setCurrentPage(1);
  };

  return {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    relationshipFilter,
    setRelationshipFilter,
    currentPage: page,
    setCurrentPage,
    selectedParents,
    handleSelectAll,
    handleSelectParent,
    handleSort,
    sortKey: sortConfig?.key ?? null,
    sortDirection: sortConfig?.direction ?? 'asc',
    parents: pagedParents,
    totalCount,
    totalPages,
    rangeStart: totalCount === 0 ? 0 : (page - 1) * PAGE_SIZE + 1,
    rangeEnd: Math.min(page * PAGE_SIZE, totalCount),
    resetFilters,
    hasActiveFilters:
      searchTerm !== '' ||
      statusFilter !== 'All Status' ||
      relationshipFilter !== 'All Relationships',
  };
}
