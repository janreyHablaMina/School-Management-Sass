import { useMemo, useState } from 'react';
import { schoolAdminMockData } from '@/lib/mock/schoolAdmin.mock';

export type ClassSectionRecord = (typeof schoolAdminMockData.classesSections)[number];
export type ClassSectionSortKey =
  | 'name'
  | 'gradeLevel'
  | 'adviser'
  | 'studentCount'
  | 'attendanceRate'
  | 'subjects'
  | 'status';

const PAGE_SIZE = 10;

function valueForSort(item: ClassSectionRecord, key: ClassSectionSortKey) {
  return item[key];
}

export function useClassesSections() {
  const [searchTerm, setSearchTerm] = useState('');
  const [gradeFilter, setGradeFilter] = useState('All Grades');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedClassSections, setSelectedClassSections] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: ClassSectionSortKey;
    direction: 'asc' | 'desc';
  } | null>(null);

  const handleSort = (key: ClassSectionSortKey) => {
    setSortConfig((current) => {
      if (current && current.key === key) {
        if (current.direction === 'asc') return { key, direction: 'desc' };
        return null;
      }
      return { key, direction: 'asc' };
    });
  };

  const filteredClassSections = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    let items = schoolAdminMockData.classesSections.filter((item) => {
      const matchesSearch =
        normalizedSearch === '' ||
        item.name.toLowerCase().includes(normalizedSearch) ||
        item.adviser.toLowerCase().includes(normalizedSearch) ||
        item.room.toLowerCase().includes(normalizedSearch) ||
        item.section.toLowerCase().includes(normalizedSearch);

      const matchesGrade = gradeFilter === 'All Grades' || item.gradeLevel === gradeFilter;
      const matchesStatus = statusFilter === 'All Status' || item.status === statusFilter;

      return matchesSearch && matchesGrade && matchesStatus;
    });

    if (sortConfig) {
      items = [...items].sort((a, b) => {
        const left = valueForSort(a, sortConfig.key);
        const right = valueForSort(b, sortConfig.key);
        const comparison =
          typeof left === 'number' && typeof right === 'number'
            ? left - right
            : String(left).localeCompare(String(right), undefined, {
                numeric: true,
                sensitivity: 'base',
              });

        return sortConfig.direction === 'asc' ? comparison : -comparison;
      });
    }

    return items;
  }, [gradeFilter, searchTerm, sortConfig, statusFilter]);

  const totalCount = filteredClassSections.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const page = Math.min(currentPage, totalPages);
  const classSections = filteredClassSections.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedClassSections(classSections.map((item) => item.id));
      return;
    }
    setSelectedClassSections([]);
  };

  const handleSelectClassSection = (id: string) => {
    setSelectedClassSections((current) =>
      current.includes(id)
        ? current.filter((itemId) => itemId !== id)
        : [...current, id],
    );
  };

  const resetFilters = () => {
    setSearchTerm('');
    setGradeFilter('All Grades');
    setStatusFilter('All Status');
    setCurrentPage(1);
  };

  return {
    searchTerm,
    setSearchTerm,
    gradeFilter,
    setGradeFilter,
    statusFilter,
    setStatusFilter,
    currentPage: page,
    setCurrentPage,
    selectedClassSections,
    handleSelectAll,
    handleSelectClassSection,
    handleSort,
    sortKey: sortConfig?.key ?? null,
    sortDirection: sortConfig?.direction ?? 'asc',
    classSections,
    totalCount,
    totalPages,
    rangeStart: totalCount === 0 ? 0 : (page - 1) * PAGE_SIZE + 1,
    rangeEnd: Math.min(page * PAGE_SIZE, totalCount),
    resetFilters,
    hasActiveFilters:
      searchTerm !== '' ||
      gradeFilter !== 'All Grades' ||
      statusFilter !== 'All Status',
  };
}
