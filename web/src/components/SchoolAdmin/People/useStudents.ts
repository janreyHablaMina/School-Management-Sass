import { useState, useMemo } from 'react';
import { schoolAdminMockData } from '@/lib/mock/schoolAdmin.mock';

export type SortKey = 'name' | 'studentId' | 'grade' | 'section' | 'parentGuardian' | 'status' | 'dateEnrolled';

export const useStudents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
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

  const sortedStudents = useMemo(() => {
    let sortableItems = [...schoolAdminMockData.students];
    
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      sortableItems = sortableItems.filter(s => 
        s.name.toLowerCase().includes(lowerSearch) || 
        s.studentId.toLowerCase().includes(lowerSearch) || 
        s.email.toLowerCase().includes(lowerSearch)
      );
    }
    
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        let valA: any = a[sortConfig.key as keyof typeof a];
        let valB: any = b[sortConfig.key as keyof typeof b];

        if (sortConfig.key === 'grade') {
          valA = a.gradeSection.split(' - ')[0] || a.gradeSection;
          valB = b.gradeSection.split(' - ')[0] || b.gradeSection;
        } else if (sortConfig.key === 'section') {
          valA = a.gradeSection.split(' - ')[1] || '';
          valB = b.gradeSection.split(' - ')[1] || '';
        }

        if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
        if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    
    return sortableItems;
  }, [searchTerm, sortConfig]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedStudents(sortedStudents.map(s => s.id));
    } else {
      setSelectedStudents([]);
    }
  };

  const handleSelectStudent = (id: string) => {
    setSelectedStudents(prev => 
      prev.includes(id) ? prev.filter(sId => sId !== id) : [...prev, id]
    );
  };

  return {
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    selectedStudents,
    handleSelectAll,
    handleSelectStudent,
    handleSort,
    sortKey: sortConfig?.key ?? null,
    sortDirection: sortConfig?.direction ?? 'asc',
    getSortIcon,
    sortedStudents,
    totalCount: schoolAdminMockData.students.length
  };
};
