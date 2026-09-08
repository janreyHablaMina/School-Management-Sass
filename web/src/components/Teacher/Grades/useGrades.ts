'use client';

import { useEffect, useMemo, useState } from 'react';
import { teacherGradesPageMock } from '@/lib/mock/teacherGrades.mock';
import {
  findClassIdByFocus,
  findGradeByStudentFocus,
  type TeacherClassFocus,
  type TeacherStudentFocus,
} from '@/lib/teacher/classFocus';
import type {
  GradeSort,
  GradeStatus,
  GradeTab,
  TeacherGradeRow,
} from '@/types/teacherGrades';
import {
  bindColumnSort,
  matchesAllOrExact,
  matchesSearch,
  sortWithColumnOverride,
  useColumnSort,
  usePagedList,
  useRowSelection,
} from '../shared';

const PAGE_SIZE = 8;
const EMPTY_GRADES: TeacherGradeRow[] = [];

const DEFAULT_FILTERS = {
  searchTerm: '',
  tab: 'All Grades' as GradeTab,
  status: 'All Status' as 'All Status' | GradeStatus,
  type: 'All Terms',
  sort: 'Highest First' as GradeSort,
};

export type GradesFiltersState = typeof DEFAULT_FILTERS;

export type GradeSortKey =
  | 'fullName'
  | 'classLabel'
  | 'term'
  | 'overallScore'
  | 'letterGrade'
  | 'trend'
  | 'status';

function matchesTab(row: TeacherGradeRow, tab: GradeTab) {
  switch (tab) {
    case 'Needs Attention':
      return row.status === 'Needs Attention' || row.overallScore < 75;
    case 'Top Performers':
      return row.letterGrade === 'A' || row.letterGrade === 'A-';
    case 'Incomplete':
      return row.status === 'Incomplete';
    default:
      return true;
  }
}

function matchesGrade(row: TeacherGradeRow, filters: GradesFiltersState) {
  return (
    matchesSearch(filters.searchTerm, [row.fullName, row.studentCode, row.subject]) &&
    matchesTab(row, filters.tab) &&
    matchesAllOrExact(filters.status, row.status, 'All Status') &&
    matchesAllOrExact(filters.type, row.term, 'All Terms')
  );
}

function gradeSortValue(row: TeacherGradeRow, key: GradeSortKey): unknown {
  return row[key];
}

function sortGradesByFilter(items: TeacherGradeRow[], filters: GradesFiltersState) {
  const next = [...items];
  switch (filters.sort) {
    case 'Lowest First':
      return next.sort((a, b) => a.overallScore - b.overallScore);
    case 'Name A-Z':
      return next.sort((a, b) => a.fullName.localeCompare(b.fullName));
    default:
      return next.sort((a, b) => b.overallScore - a.overallScore);
  }
}

export function useGrades(options?: {
  classFocus?: TeacherClassFocus | null;
  studentFocus?: TeacherStudentFocus | null;
}) {
  const { metrics, filterOptions, tabs } = teacherGradesPageMock;
  const [classes, setClasses] = useState(() =>
    teacherGradesPageMock.classes.map((cls) => ({
      ...cls,
      grades: cls.grades.map((grade) => ({ ...grade })),
    })),
  );

  const initialClassId = findClassIdByFocus(classes, options?.classFocus);
  const initialClass = classes.find((item) => item.id === initialClassId) ?? null;
  const initialGradeId =
    findGradeByStudentFocus(initialClass?.grades ?? [], options?.studentFocus)?.id ?? null;

  const [selectedClassId, setSelectedClassId] = useState<string | null>(initialClassId);
  const [selectedGradeId, setSelectedGradeId] = useState<string | null>(initialGradeId);
  const [toast, setToast] = useState<{ title: string; message?: string } | null>(null);
  const { sortConfig, sortKey, sortDirection, handleSort: toggleSort } =
    useColumnSort<GradeSortKey>();

  const selectedClass = useMemo(
    () => classes.find((item) => item.id === selectedClassId) ?? null,
    [classes, selectedClassId],
  );

  const classGrades = selectedClass?.grades ?? EMPTY_GRADES;
  const classIds = useMemo(() => classes.map((cls) => cls.id), [classes]);

  const selectedGrade = useMemo(
    () => classGrades.find((item) => item.id === selectedGradeId) ?? null,
    [classGrades, selectedGradeId],
  );

  const list = usePagedList({
    items: classGrades,
    initialFilters: DEFAULT_FILTERS,
    pageSize: PAGE_SIZE,
    filterFn: matchesGrade,
    sortFn: (items, filters) =>
      sortWithColumnOverride(
        items,
        sortConfig,
        gradeSortValue,
        sortGradesByFilter,
        filters,
        (a, b) => a.fullName.localeCompare(b.fullName),
      ),
    sortDeps: sortConfig,
  });

  const paginatedGrades = list.paginatedItems;
  const visibleIds = useMemo(
    () => paginatedGrades.map((grade) => grade.id),
    [paginatedGrades],
  );

  const {
    selectedIds,
    allVisibleSelected,
    toggle,
    toggleAllVisible,
    clearSelection,
  } = useRowSelection({
    visibleIds,
    resetKey: selectedClassId,
  });
  const {
    selectedIds: selectedClassIds,
    allVisibleSelected: allVisibleClassesSelected,
    toggle: toggleClassSelection,
    toggleAllVisible: toggleAllVisibleClasses,
    clearSelection: clearClassSelection,
  } = useRowSelection<string>({
    visibleIds: classIds,
    resetKey: 'grades-class-list',
  });

  const handleSort = bindColumnSort(toggleSort, list.setPage);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3500);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const flagSelectedForReview = () => {
    if (selectedIds.length === 0 || !selectedClassId) return;
    const idSet = new Set(selectedIds);
    setClasses((prev) =>
      prev.map((cls) => {
        if (cls.id !== selectedClassId) return cls;
        let flagged = 0;
        const grades = cls.grades.map((grade) => {
          if (!idSet.has(grade.id) || grade.status === 'Needs Attention') return grade;
          flagged += 1;
          return { ...grade, status: 'Needs Attention' as const };
        });
        if (flagged === 0) return cls;
        return {
          ...cls,
          grades,
          needsAttention: grades.filter((g) => g.status === 'Needs Attention').length,
        };
      }),
    );
    clearSelection();
  };

  const exportSelectedGradebooks = () => {
    if (selectedClassIds.length === 0) return;
    setToast({
      title: 'Gradebooks exported',
      message: `${selectedClassIds.length} gradebook${
        selectedClassIds.length === 1 ? '' : 's'
      } prepared for export.`,
    });
    clearClassSelection();
  };

  const openClass = (id: string) => {
    setSelectedGradeId(null);
    setSelectedClassId(id);
    list.clearFilters();
  };

  const backToClasses = () => {
    setSelectedGradeId(null);
    setSelectedClassId(null);
    list.clearFilters();
  };

  const openGrade = (id: string) => setSelectedGradeId(id);

  const backToGradebook = () => setSelectedGradeId(null);

  const enterGrades = (id: string) => openClass(id);

  const exportGradebook = (id: string) => {
    const source = classes.find((cls) => cls.id === id);
    if (!source) return;
    setToast({
      title: 'Gradebook exported',
      message: `${source.subject} - ${source.gradeSection} is ready for export.`,
    });
  };

  const viewClassSummary = (id: string) => {
    const source = classes.find((cls) => cls.id === id);
    if (!source) return;
    setToast({
      title: 'Class summary',
      message: `${source.classAverage.toFixed(1)}% average - ${
        source.needsAttention
      } at risk - ${source.incomplete} incomplete.`,
    });
  };

  return {
    metrics,
    classes,
    tabs,
    filterOptions,
    selectedClass,
    selectedGrade,
    openClass,
    enterGrades,
    exportGradebook,
    viewClassSummary,
    openGrade,
    backToClasses,
    backToGradebook,
    ...list,
    paginatedGrades,
    sortKey,
    sortDirection,
    handleSort,
    selectedIds,
    selectedClassIds,
    allVisibleSelected,
    allVisibleClassesSelected,
    toggleStudent: toggle,
    toggleClassSelection,
    toggleAllVisible,
    toggleAllVisibleClasses,
    clearSelection,
    clearClassSelection,
    flagSelectedForReview,
    exportSelectedGradebooks,
    toast,
    dismissToast: () => setToast(null),
  };
}
