'use client';

import { useMemo, useState } from 'react';
import { myClassesPageMock } from '@/lib/mock/myClasses.mock';
import type { ClassStatus } from '@/types/myClasses';

const PAGE_SIZE = 6;

export function useMyClasses() {
  const { metrics, classes, filterOptions } = myClassesPageMock;

  const [searchTerm, setSearchTerm] = useState('');
  const [academicYear, setAcademicYear] = useState('2026 - 2027');
  const [gradeLevel, setGradeLevel] = useState(filterOptions.gradeLevels[0]);
  const [subject, setSubject] = useState(filterOptions.subjects[0]);
  const [status, setStatus] = useState<(typeof filterOptions.statuses)[number]>('Active');
  const [page, setPage] = useState(1);

  const filteredClasses = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();

    return classes.filter((cls) => {
      const matchesSearch =
        !q ||
        cls.subject.toLowerCase().includes(q) ||
        cls.gradeSection.toLowerCase().includes(q) ||
        cls.room.toLowerCase().includes(q);

      const matchesYear =
        academicYear === 'All Years' || cls.academicYear === academicYear;
      const matchesGrade =
        gradeLevel === 'All Grades' || cls.gradeLevel === gradeLevel;
      const matchesSubject =
        subject === 'All Subjects' || cls.subject === subject;
      const matchesStatus =
        status === 'All Status' || cls.status === (status as ClassStatus);

      return matchesSearch && matchesYear && matchesGrade && matchesSubject && matchesStatus;
    });
  }, [classes, searchTerm, academicYear, gradeLevel, subject, status]);

  const totalPages = Math.max(1, Math.ceil(filteredClasses.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  const paginatedClasses = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredClasses.slice(start, start + PAGE_SIZE);
  }, [filteredClasses, currentPage]);

  const clearFilters = () => {
    setSearchTerm('');
    setAcademicYear('2026 - 2027');
    setGradeLevel('All Grades');
    setSubject('All Subjects');
    setStatus('Active');
    setPage(1);
  };

  const updateFilter =
    <T,>(setter: (value: T) => void) =>
    (value: T) => {
      setter(value);
      setPage(1);
    };

  return {
    metrics,
    filterOptions,
    searchTerm,
    setSearchTerm: updateFilter(setSearchTerm),
    academicYear,
    setAcademicYear: updateFilter(setAcademicYear),
    gradeLevel,
    setGradeLevel: updateFilter(setGradeLevel),
    subject,
    setSubject: updateFilter(setSubject),
    status,
    setStatus: updateFilter(setStatus),
    clearFilters,
    filteredCount: filteredClasses.length,
    paginatedClasses,
    page: currentPage,
    totalPages,
    setPage,
    pageSize: PAGE_SIZE,
  };
}
