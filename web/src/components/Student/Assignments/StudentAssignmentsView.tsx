'use client';

import React, { useState } from 'react';
import {
  ChalkBadge, DataTable, SummaryMetrics, listStyles,
  RowActionsMenu, ResourceBulkBar, RowSelectCell, SelectAllCheckbox,
  type DataTableColumn
} from '@/components/ui/shared';
import { PageHeader } from '@/components/ui/shared';
import { SchoolAdminDirectoryFilters } from '@/components/SchoolAdmin/shared/SchoolAdminDirectoryFilters';
import { ListTabs } from '@/components/ui/shared/ListTabs';
import { ASSESSMENT_LIST, ASSESSMENT_STATS, ASSESSMENT_CATEGORIES } from '@/lib/mock/studentProfile.mock';
import { Download } from 'lucide-react';
import uiStyles from '@/components/ui/ui.module.css';

const COLUMNS: DataTableColumn[] = [
  { id: 'assessment', label: 'Assessment' },
  { id: 'subject', label: 'Subject & Type' },
  { id: 'dueDate', label: 'Due Date' },
  { id: 'status', label: 'Status' },
  { id: 'score', label: 'Score' },
  { id: 'actions', label: 'Actions' },
];

const TABS = ['All', 'Pending', 'Submitted', 'Graded'];

export function StudentAssignmentsView() {
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('All Subjects');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [selected, setSelected] = useState<string[]>([]);

  const hasActiveFilters = search !== '' || subjectFilter !== 'All Subjects' || typeFilter !== 'All Types';
  const subjects = ['All Subjects', ...Array.from(new Set(ASSESSMENT_LIST.map(a => a.subject)))];

  const filtered = ASSESSMENT_LIST.filter(assessment => {
    // Tab match
    const matchTab = activeTab === 'All' || assessment.status === activeTab;
    
    // Search match
    const matchSearch = assessment.title.toLowerCase().includes(search.toLowerCase()) ||
      assessment.subtitle.toLowerCase().includes(search.toLowerCase()) ||
      assessment.subject.toLowerCase().includes(search.toLowerCase());
      
    // Dropdown match
    const matchSubject = subjectFilter === 'All Subjects' || assessment.subject === subjectFilter;
    const matchType = typeFilter === 'All Types' || assessment.type === typeFilter;

    return matchTab && matchSearch && matchSubject && matchType;
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

  const summaryMetrics = [
    { label: 'Overall Average', value: ASSESSMENT_STATS.overall.value, subtitle: ASSESSMENT_STATS.overall.label, icon: '📈', accent: ASSESSMENT_STATS.overall.color },
    { label: 'Completed', value: ASSESSMENT_STATS.completed.value, subtitle: ASSESSMENT_STATS.completed.subText, icon: ASSESSMENT_STATS.completed.icon, accent: ASSESSMENT_STATS.completed.iconColor },
    { label: 'Pending', value: ASSESSMENT_STATS.pending.value, subtitle: ASSESSMENT_STATS.pending.subText, icon: ASSESSMENT_STATS.pending.icon, accent: ASSESSMENT_STATS.pending.iconColor },
    { label: 'Overdue', value: ASSESSMENT_STATS.overdue.value, subtitle: ASSESSMENT_STATS.overdue.subText, icon: ASSESSMENT_STATS.overdue.icon, accent: ASSESSMENT_STATS.overdue.iconColor },
  ];

  return (
    <div className={listStyles.page}>
      <PageHeader
        title="Assignments"
        subtitle="Manage and track all your tasks, homework, quizzes, and exams."
      >
        <button className={`${uiStyles.btnBase} ${uiStyles.btnSm} ${uiStyles.btnSecondary}`}>
          <Download size={14} /> Download Report
        </button>
      </PageHeader>

      <SummaryMetrics
        metrics={summaryMetrics}
        columns={4}
      />

      <ListTabs
        tabs={TABS}
        value={activeTab}
        onChange={setActiveTab}
      />

      <SchoolAdminDirectoryFilters
        searchTerm={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search assignments, quizzes..."
        searchAriaLabel="Search assessments"
        selects={[
          {
            label: 'Subject',
            value: subjectFilter,
            onChange: setSubjectFilter,
            options: subjects,
          },
          {
            label: 'Type',
            value: typeFilter,
            onChange: setTypeFilter,
            options: ['All Types', ...ASSESSMENT_CATEGORIES.filter(c => c !== 'All')],
          },
        ]}
        hasActiveFilters={hasActiveFilters}
        onReset={() => {
          setSearch('');
          setSubjectFilter('All Subjects');
          setTypeFilter('All Types');
        }}
      />

      <ResourceBulkBar
        selectedCount={selected.length}
        itemLabel="assignment"
        onClearSelection={() => setSelected([])}
        actions={[
          { label: 'Mark as Submitted', onClick: () => {} },
          { label: 'Download Files', onClick: () => {} },
        ]}
      />

      <DataTable
        columns={COLUMNS}
        minWidth={1000}
        leadingHeader={
          <SelectAllCheckbox
            checked={allVisibleSelected}
            onChange={(e) => handleSelectAll(e.target.checked)}
            label="Select all visible assignments"
          />
        }
      >
        {filtered.map((assessment) => {
          return (
            <tr
              key={assessment.id}
              className={`${listStyles.clickableRow}${selected.includes(assessment.id) ? ` ${listStyles.rowSelected}` : ''}`}
            >
              <RowSelectCell
                selected={selected.includes(assessment.id)}
                onToggle={() => handleSelectOne(assessment.id)}
                label={`Select ${assessment.title}`}
              />

              {/* Assessment (Title + Subtitle) */}
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: assessment.typeBg, color: assessment.typeColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>
                    {assessment.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#f0efed' }}>{assessment.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(240,239,237,0.5)' }}>{assessment.subtitle}</div>
                  </div>
                </div>
              </td>

              {/* Subject & Type */}
              <td>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                  <span style={{ fontSize: '0.85rem', color: 'rgba(240,239,237,0.85)', fontWeight: 500 }}>{assessment.subject}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: assessment.typeColor }} />
                    <span style={{ fontSize: '0.75rem', color: 'rgba(240,239,237,0.5)' }}>{assessment.type}</span>
                  </div>
                </div>
              </td>

              {/* Due Date */}
              <td>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'rgba(240,239,237,0.8)', fontWeight: 500 }}>{assessment.dueDay}</div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(240,239,237,0.45)' }}>{assessment.dueDate}</div>
                </div>
              </td>

              {/* Status */}
              <td>
                <ChalkBadge label={assessment.status} accent={assessment.statusColor} />
              </td>

              {/* Score */}
              <td>
                {assessment.score !== '-' ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#f0efed' }}>
                      {assessment.score}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'rgba(240,239,237,0.5)' }}>{assessment.scorePercent}</span>
                  </div>
                ) : (
                  <span style={{ fontSize: '0.85rem', color: 'rgba(240,239,237,0.4)' }}>-</span>
                )}
              </td>

              {/* Actions */}
              <td onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
                <RowActionsMenu
                  label={`Actions for ${assessment.title}`}
                  actions={[
                    { icon: '👁️', label: 'View Details' },
                    { icon: '📤', label: 'Submit Work' },
                    { icon: '⬇️', label: 'Download Attachment' },
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

