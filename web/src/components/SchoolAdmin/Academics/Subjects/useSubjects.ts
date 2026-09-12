import { useMemo, useState } from 'react';
import { schoolAdminMockData } from '@/lib/mock/schoolAdmin.mock';

export type SubjectRecord = (typeof schoolAdminMockData.subjects)[number];
export type SubjectSortKey =
  | 'name'
  | 'code'
  | 'department'
  | 'assignedTeachers'
  | 'classSections'
  | 'units'
  | 'status';

const PAGE_SIZE = 10;

function valueForSort(subject: SubjectRecord, key: SubjectSortKey) {
  return subject[key];
}

export function useSubjects() {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All Departments');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: SubjectSortKey;
    direction: 'asc' | 'desc';
  } | null>(null);

  const departments = useMemo(
    () => [
      'All Departments',
      ...Array.from(new Set(schoolAdminMockData.subjects.map((subject) => subject.department))),
    ],
    [],
  );

  const handleSort = (key: SubjectSortKey) => {
    setSortConfig((current) => {
      if (current && current.key === key) {
        if (current.direction === 'asc') return { key, direction: 'desc' };
        return null;
      }
      return { key, direction: 'asc' };
    });
  };

  const filteredSubjects = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    let items = schoolAdminMockData.subjects.filter((subject) => {
      const matchesSearch =
        normalizedSearch === '' ||
        subject.name.toLowerCase().includes(normalizedSearch) ||
        subject.code.toLowerCase().includes(normalizedSearch) ||
        subject.department.toLowerCase().includes(normalizedSearch) ||
        subject.gradeLevels.toLowerCase().includes(normalizedSearch);

      const matchesDepartment =
        departmentFilter === 'All Departments' || subject.department === departmentFilter;
      const matchesStatus = statusFilter === 'All Status' || subject.status === statusFilter;

      return matchesSearch && matchesDepartment && matchesStatus;
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
  }, [departmentFilter, searchTerm, sortConfig, statusFilter]);

  const totalCount = filteredSubjects.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const page = Math.min(currentPage, totalPages);
  const subjects = filteredSubjects.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedSubjects(subjects.map((subject) => subject.id));
      return;
    }
    setSelectedSubjects([]);
  };

  const handleSelectSubject = (id: string) => {
    setSelectedSubjects((current) =>
      current.includes(id)
        ? current.filter((subjectId) => subjectId !== id)
        : [...current, id],
    );
  };

  const resetFilters = () => {
    setSearchTerm('');
    setDepartmentFilter('All Departments');
    setStatusFilter('All Status');
    setCurrentPage(1);
  };

  return {
    searchTerm,
    setSearchTerm,
    departmentFilter,
    setDepartmentFilter,
    statusFilter,
    setStatusFilter,
    departments,
    currentPage: page,
    setCurrentPage,
    selectedSubjects,
    handleSelectAll,
    handleSelectSubject,
    handleSort,
    sortKey: sortConfig?.key ?? null,
    sortDirection: sortConfig?.direction ?? 'asc',
    subjects,
    totalCount,
    totalPages,
    rangeStart: totalCount === 0 ? 0 : (page - 1) * PAGE_SIZE + 1,
    rangeEnd: Math.min(page * PAGE_SIZE, totalCount),
    resetFilters,
    hasActiveFilters:
      searchTerm !== '' ||
      departmentFilter !== 'All Departments' ||
      statusFilter !== 'All Status',
  };
}
