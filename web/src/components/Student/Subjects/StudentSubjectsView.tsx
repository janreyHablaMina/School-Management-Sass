'use client';

import React, { useState } from 'react';
import {
  ChalkBadge, DataTable, SummaryMetrics, listStyles,
  RowActionsMenu, ResourceBulkBar, RowSelectCell, SelectAllCheckbox,
  type DataTableColumn
} from '@/components/ui/shared';
import { PageHeader } from '@/components/ui/shared';
import { SchoolAdminDirectoryFilters } from '@/components/SchoolAdmin/shared/SchoolAdminDirectoryFilters';
import { SUBJECTS_DATA, SCHEDULE_DATA, SUMMARY_DATA, ATTENDANCE_SUBJECT_DATA } from '@/lib/mock/studentProfile.mock';

const COLUMNS: DataTableColumn[] = [
  { id: 'subject', label: 'Subject' },
  { id: 'teacher', label: 'Teacher' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'units', label: 'Units' },
  { id: 'attendance', label: 'Attendance' },
  { id: 'grade', label: 'Q1 Grade' },
  { id: 'status', label: 'Status' },
  { id: 'actions', label: 'Actions' },
];

const GRADE_DESCRIPTOR = (g: number): { label: string; color: string } => {
  if (g >= 98) return { label: 'Outstanding', color: '#5cc789' };
  if (g >= 90) return { label: 'Very Good', color: '#84a9ff' };
  if (g >= 85) return { label: 'Good', color: '#b68eff' };
  if (g >= 80) return { label: 'Satisfactory', color: '#ffab6b' };
  if (g >= 75) return { label: 'Fairly Satisfactory', color: '#f5c842' };
  return { label: 'Did Not Meet Expectations', color: '#ff7e93' };
};

export function StudentSubjectsView() {
  const [search, setSearch] = useState('');
  const [teacherFilter, setTeacherFilter] = useState('All Teachers');
  const [gradeFilter, setGradeFilter] = useState('All Grades');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [selected, setSelected] = useState<string[]>([]);

  const hasActiveFilters = search !== '' || teacherFilter !== 'All Teachers' || gradeFilter !== 'All Grades' || statusFilter !== 'All Status';
  const teachers = ['All Teachers', ...Array.from(new Set(SUBJECTS_DATA.map(s => s.teacher)))];

  const filtered = SUBJECTS_DATA.filter(subject => {
    const matchSearch = subject.name.toLowerCase().includes(search.toLowerCase()) ||
      subject.teacher.toLowerCase().includes(search.toLowerCase());
    const matchTeacher = teacherFilter === 'All Teachers' || subject.teacher === teacherFilter;
    const matchGrade = gradeFilter === 'All Grades' ||
      (gradeFilter === '90 - 100 (Very Good / Outstanding)' && subject.quarterGrade >= 90) ||
      (gradeFilter === '85 - 89 (Good)' && subject.quarterGrade >= 85 && subject.quarterGrade < 90) ||
      (gradeFilter === '80 - 84 (Satisfactory)' && subject.quarterGrade >= 80 && subject.quarterGrade < 85) ||
      (gradeFilter === 'Below 80' && subject.quarterGrade < 80);
    const matchStatus = statusFilter === 'All Status';
    return matchSearch && matchTeacher && matchGrade && matchStatus;
  });

  const allVisibleSelected = filtered.length > 0 && filtered.every(s => selected.includes(s.id));

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelected(prev => Array.from(new Set([...prev, ...filtered.map(s => s.id)])));
    } else {
      setSelected(prev => prev.filter(id => !filtered.map(s => s.id).includes(id)));
    }
  };

  const handleSelectOne = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div className={listStyles.page}>
      <PageHeader
        title="My Subjects"
        subtitle="View all your enrolled subjects, teachers, schedules, and grades for this school year."
      />

      <SummaryMetrics
        metrics={SUMMARY_DATA.map(s => ({
          label: s.label,
          value: s.value,
          subtitle: s.subText,
          icon: s.icon,
          accent: s.iconColor,
        }))}
        columns={4}
      />

      <SchoolAdminDirectoryFilters
        searchTerm={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search subjects or teachers..."
        searchAriaLabel="Search subjects"
        selects={[
          {
            label: 'Teacher',
            value: teacherFilter,
            onChange: setTeacherFilter,
            options: teachers,
          },
          {
            label: 'Grade Range',
            value: gradeFilter,
            onChange: setGradeFilter,
            options: [
              'All Grades',
              '90 - 100 (Very Good / Outstanding)',
              '85 - 89 (Good)',
              '80 - 84 (Satisfactory)',
              'Below 80',
            ],
          },
          {
            label: 'Status',
            value: statusFilter,
            onChange: setStatusFilter,
            options: ['All Status', 'Active', 'Incomplete'],
          },
        ]}
        hasActiveFilters={hasActiveFilters}
        onReset={() => {
          setSearch('');
          setTeacherFilter('All Teachers');
          setGradeFilter('All Grades');
          setStatusFilter('All Status');
        }}
      />

      <ResourceBulkBar
        selectedCount={selected.length}
        itemLabel="subject"
        onClearSelection={() => setSelected([])}
        actions={[
          { label: 'Export Grades', onClick: () => {} },
          { label: 'View Assignments', onClick: () => {} },
        ]}
      />

      <DataTable
        columns={COLUMNS}
        minWidth={1000}
        leadingHeader={
          <SelectAllCheckbox
            checked={allVisibleSelected}
            onChange={(e) => handleSelectAll(e.target.checked)}
            label="Select all visible subjects"
          />
        }
      >
        {filtered.map((subject) => {
          const sched = SCHEDULE_DATA.find(s => s.subject === subject.name);
          const attendance = ATTENDANCE_SUBJECT_DATA.find(a => a.subject === subject.name);
          const desc = GRADE_DESCRIPTOR(subject.quarterGrade);
          const attendanceRate = attendance?.rate ?? 95;
          const attendanceColor = attendanceRate >= 90 ? '#5cc789' : attendanceRate >= 80 ? '#f5c842' : '#ff7e93';

          return (
            <tr
              key={subject.id}
              className={`${listStyles.clickableRow}${selected.includes(subject.id) ? ` ${listStyles.rowSelected}` : ''}`}
            >
              <RowSelectCell
                selected={selected.includes(subject.id)}
                onToggle={() => handleSelectOne(subject.id)}
                label={`Select ${subject.name}`}
              />

              {/* Subject */}
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: subject.iconBg, color: subject.iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>
                    {subject.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#f0efed' }}>{subject.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(240,239,237,0.5)' }}>Grade 11 · STEM-A</div>
                  </div>
                </div>
              </td>

              {/* Teacher */}
              <td>
                <span style={{ fontSize: '0.875rem', color: 'rgba(240,239,237,0.8)' }}>{subject.teacher}</span>
              </td>

              {/* Schedule */}
              <td>
                {sched ? (
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'rgba(240,239,237,0.8)', fontWeight: 500 }}>{sched.day}</div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(240,239,237,0.45)' }}>{sched.time}</div>
                  </div>
                ) : (
                  <span style={{ fontSize: '0.8rem', color: 'rgba(240,239,237,0.3)' }}>TBA</span>
                )}
              </td>

              {/* Units */}
              <td>
                <span style={{ fontSize: '0.875rem', color: 'rgba(240,239,237,0.7)' }}>{subject.units}</span>
              </td>

              {/* Attendance */}
              <td>
                <ChalkBadge label={`${attendanceRate}%`} accent={attendanceColor} />
              </td>

              {/* Grade */}
              <td>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
                  <span style={{ fontSize: '1.2rem', fontWeight: 700, color: desc.color, fontFamily: 'Caveat, cursive', lineHeight: 1 }}>
                    {subject.quarterGrade}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'rgba(240,239,237,0.5)' }}>{desc.label}</span>
                </div>
              </td>

              {/* Status */}
              <td>
                <ChalkBadge label="Active" accent="#5cc789" />
              </td>

              {/* Actions */}
              <td onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
                <RowActionsMenu
                  label={`Actions for ${subject.name}`}
                  actions={[
                    { icon: '👁️', label: 'View Details' },
                    { icon: '📝', label: 'View Assignments' },
                    { icon: '🎓', label: 'View Grades' },
                  ]}
                  dangerActions={[]}
                  onAction={() => {}}
                />
              </td>
            </tr>
          );
        })}
      </DataTable>
    </div>
  );
}
