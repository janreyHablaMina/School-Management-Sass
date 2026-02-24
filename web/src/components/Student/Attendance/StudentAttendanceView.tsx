'use client';

import React, { useState } from 'react';
import {
  ChalkBadge, DataTable, SummaryMetrics, listStyles,
  RowActionsMenu, ResourceBulkBar, RowSelectCell, SelectAllCheckbox,
  type DataTableColumn
} from '@/components/ui/shared';
import { PageHeader } from '@/components/ui/shared';
import { SchoolAdminDirectoryFilters } from '@/components/SchoolAdmin/shared/SchoolAdminDirectoryFilters';
import { ATTENDANCE_OVERVIEW_DATA, ATTENDANCE_SUBJECT_DATA } from '@/lib/mock/studentProfile.mock';
import { Download, CalendarCheck, Clock, AlertTriangle } from 'lucide-react';
import uiStyles from '@/components/ui/ui.module.css';

const COLUMNS: DataTableColumn[] = [
  { id: 'subject', label: 'Subject' },
  { id: 'teacher', label: 'Teacher' },
  { id: 'present', label: 'Present' },
  { id: 'late', label: 'Late' },
  { id: 'absent', label: 'Absent' },
  { id: 'rate', label: 'Attendance Rate' },
  { id: 'status', label: 'Status' },
];

export function StudentAttendanceView() {
  const [search, setSearch] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('All Subjects');
  const [selected, setSelected] = useState<string[]>([]);

  const subjects = ['All Subjects', ...Array.from(new Set(ATTENDANCE_SUBJECT_DATA.map(a => a.subject)))];

  const filtered = ATTENDANCE_SUBJECT_DATA.filter(attendance => {
    // Search match
    const matchSearch = attendance.subject.toLowerCase().includes(search.toLowerCase()) ||
      attendance.teacher.toLowerCase().includes(search.toLowerCase());
      
    // Dropdown match
    const matchSubject = subjectFilter === 'All Subjects' || attendance.subject === subjectFilter;

    return matchSearch && matchSubject;
  });

  const allVisibleSelected = filtered.length > 0 && filtered.every(a => selected.includes(a.id));

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelected(prev => Array.from(new Set([...prev, ...filtered.map(a => a.id)])));
    } else {
      setSelected(prev => prev.filter(id => !filtered.map(a => a.id).includes(id)));
    }
  };

  const handleSelectOne = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const summaryMetrics = ATTENDANCE_OVERVIEW_DATA.map(a => ({
    label: a.label,
    value: a.value,
    subtitle: a.subText,
    icon: a.icon,
    accent: a.iconColor
  }));

  const getStatus = (rate: number) => {
    if (rate >= 95) return { label: 'Excellent', color: '#5cc789' };
    if (rate >= 90) return { label: 'Good', color: '#84a9ff' };
    if (rate >= 80) return { label: 'Warning', color: '#f5c842' };
    return { label: 'Critical', color: '#ff7e93' };
  };

  return (
    <div className={listStyles.page}>
      <PageHeader
        title="Attendance"
        subtitle="Track your overall attendance, days present, tardiness, and absences across all subjects."
      >
        <button className={`${uiStyles.btnBase} ${uiStyles.btnSm} ${uiStyles.btnSecondary}`}>
          <Download size={14} /> Download Report
        </button>
      </PageHeader>

      <SummaryMetrics
        metrics={summaryMetrics}
        columns={4}
      />

      <div style={{ marginTop: '2rem' }} />

      <SchoolAdminDirectoryFilters
        searchTerm={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search subjects or teachers..."
        searchAriaLabel="Search attendance records"
        selects={[
          {
            label: 'Subject',
            value: subjectFilter,
            onChange: setSubjectFilter,
            options: subjects,
          }
        ]}
        hasActiveFilters={search !== '' || subjectFilter !== 'All Subjects'}
        onReset={() => {
          setSearch('');
          setSubjectFilter('All Subjects');
        }}
      />

      <ResourceBulkBar
        selectedCount={selected.length}
        itemLabel="subject record"
        onClearSelection={() => setSelected([])}
        actions={[
          { label: 'Export Selected', onClick: () => {} },
        ]}
      />

      <DataTable
        columns={COLUMNS}
        minWidth={900}
        leadingHeader={
          <SelectAllCheckbox
            checked={allVisibleSelected}
            onChange={(e) => handleSelectAll(e.target.checked)}
            label="Select all visible items"
          />
        }
      >
        {filtered.map((attendance) => {
          const status = getStatus(attendance.rate);

          return (
            <tr
              key={attendance.id}
              className={`${listStyles.clickableRow}${selected.includes(attendance.id) ? ` ${listStyles.rowSelected}` : ''}`}
            >
              <RowSelectCell
                selected={selected.includes(attendance.id)}
                onToggle={() => handleSelectOne(attendance.id)}
                label={`Select ${attendance.subject}`}
              />

              {/* Subject */}
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: attendance.iconBg, color: attendance.iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>
                    {attendance.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#f0efed' }}>{attendance.subject}</div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(240,239,237,0.5)', whiteSpace: 'pre-line', marginTop: '0.1rem' }}>
                      {attendance.schedule.split('\n')[0]}
                    </div>
                  </div>
                </div>
              </td>

              {/* Teacher */}
              <td>
                <span style={{ fontSize: '0.85rem', color: 'rgba(240,239,237,0.8)' }}>{attendance.teacher}</span>
              </td>

              {/* Present */}
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CalendarCheck size={14} color="#5cc789" />
                  <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#f0efed' }}>{attendance.daysPresent}</span>
                </div>
              </td>

              {/* Late */}
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Clock size={14} color={attendance.daysLate > 0 ? "#f5c842" : "rgba(240,239,237,0.4)"} />
                  <span style={{ fontSize: '0.9rem', fontWeight: 600, color: attendance.daysLate > 0 ? '#f5c842' : 'rgba(240,239,237,0.5)' }}>
                    {attendance.daysLate}
                  </span>
                </div>
              </td>

              {/* Absent */}
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <AlertTriangle size={14} color={attendance.daysAbsent > 0 ? "#ff7e93" : "rgba(240,239,237,0.4)"} />
                  <span style={{ fontSize: '0.9rem', fontWeight: 600, color: attendance.daysAbsent > 0 ? '#ff7e93' : 'rgba(240,239,237,0.5)' }}>
                    {attendance.daysAbsent}
                  </span>
                </div>
              </td>

              {/* Rate */}
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '1rem', fontWeight: 700, color: status.color }}>
                    {attendance.rate}%
                  </span>
                  <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden', minWidth: '60px', maxWidth: '80px' }}>
                    <div style={{ height: '100%', width: `${attendance.rate}%`, background: status.color, borderRadius: '2px' }} />
                  </div>
                </div>
              </td>

              {/* Status */}
              <td>
                <ChalkBadge label={status.label} accent={status.color} />
              </td>
            </tr>
          );
        })}
      </DataTable>
    </div>
  );
}

