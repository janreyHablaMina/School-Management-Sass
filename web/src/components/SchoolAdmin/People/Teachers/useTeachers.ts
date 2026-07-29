import { useState, useMemo } from 'react';
import { TEACHERS_LIST, Teacher } from '@/lib/mock/teachers.mock';

export type SortKey = 'name' | 'employeeId' | 'department' | 'subjects' | 'classes' | 'status' | 'lastActiveDate';

export const useTeachers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All Departments');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTeachers, setSelectedTeachers] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: 'asc' | 'desc' } | null>(null);

  const handleSort = (key: SortKey) => {
    setSortConfig(current => {
      if (current && current.key === key) {
        if (current.direction === 'asc') return { key, direction: 'desc' };
        return null;
      }
      return { key, direction: 'asc' };
    });
  };

  const getSortIcon = (key: SortKey) => {
    if (!sortConfig || sortConfig.key !== key) return '↕';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  const sortedTeachers = useMemo(() => {
    let sortableItems = [...TEACHERS_LIST];
    
    // Search Filter
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      sortableItems = sortableItems.filter(t => 
        t.name.toLowerCase().includes(lowerSearch) || 
        t.employeeId.toLowerCase().includes(lowerSearch) || 
        t.email.toLowerCase().includes(lowerSearch)
      );
    }

    // Department Filter
    if (departmentFilter !== 'All Departments') {
      sortableItems = sortableItems.filter(t => t.department === departmentFilter);
    }

    // Status Filter
    if (statusFilter !== 'All Status') {
      sortableItems = sortableItems.filter(t => t.status === statusFilter);
    }
    
    // Sort
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    
    return sortableItems;
  }, [searchTerm, departmentFilter, statusFilter, sortConfig]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedTeachers(sortedTeachers.map(t => t.id));
    } else {
      setSelectedTeachers([]);
    }
  };

  const handleSelectTeacher = (id: string) => {
    setSelectedTeachers(prev => 
      prev.includes(id) ? prev.filter(tId => tId !== id) : [...prev, id]
    );
  };

  return {
    searchTerm,
    setSearchTerm,
    departmentFilter,
    setDepartmentFilter,
    statusFilter,
    setStatusFilter,
    currentPage,
    setCurrentPage,
    selectedTeachers,
    handleSelectAll,
    handleSelectTeacher,
    handleSort,
    getSortIcon,
    sortedTeachers,
    totalCount: TEACHERS_LIST.length
  };
};
