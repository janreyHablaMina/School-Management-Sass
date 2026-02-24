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
import { ASSESSMENT_LIST } from '@/lib/mock/studentProfile.mock';
import { Download } from 'lucide-react';
import uiStyles from '@/components/ui/ui.module.css';

const COLUMNS: DataTableColumn[] = [
  { id: 'assessment', label: 'Assessment' },
  { id: 'subject', label: 'Subject & Type' },
  { id: 'dueDate', label: 'Schedule / Deadline' },
  { id: 'status', label: 'Status' },
  { id: 'score', label: 'Score' },
  { id: 'actions', label: 'Actions' },
];

const TABS = ['All', 'Upcoming', 'Completed', 'Graded'];

export function StudentQuizzesExamsView() {
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('All Subjects');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [selected, setSelected] = useState<string[]>([]);

  // Base list containing ONLY Quizzes and Exams
  const baseList = ASSESSMENT_LIST.filter(a => a.type === 'Quiz' || a.type === 'Exam');
  const subjects = ['All Subjects', ...Array.from(new Set(baseList.map(a => a.subject)))];
  const types = ['All Types', 'Quiz', 'Exam'];

  const hasActiveFilters = search !== '' || subjectFilter !== 'All Subjects' || typeFilter !== 'All Types';

  const filtered = baseList.filter(assessment => {
    // Map internal statuses to tabs for quizzes/exams (Pending -> Upcoming, Submitted -> Completed)
    let mappedStatus = assessment.status;
    if (mappedStatus === 'Pending' || mappedStatus === 'In Progress') mappedStatus = 'Upcoming';
    if (mappedStatus === 'Submitted') mappedStatus = 'Completed';

    const matchTab = activeTab === 'All' || mappedStatus === activeTab;
    
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

  // Dynamically compute summary from baseList
  const completedCount = baseList.filter(a => a.status === 'Graded' || a.status === 'Submitted').length;
  const upcomingCount = baseList.filter(a => a.status === 'Pending' || a.status === 'In Progress').length;
  
  const summaryMetrics = [
    { label: 'Overall Average', value: '92.5%', subtitle: 'Very Good', icon: '📈', accent: '#5cc789' },
    { label: 'Completed', value: completedCount.toString(), subtitle: `of ${baseList.length} total`, icon: '✅', accent: '#5cc789' },
    { label: 'Upcoming', value: upcomingCount.toString(), subtitle: 'need preparation', icon: '⏱️', accent: '#f5c842' },
    { label: 'Missed', value: '0', subtitle: 'past due', icon: '⚠️', accent: '#ff7e93' },
  ];

  return (
    <div className={listStyles.page}>
      <PageHeader
        title="Quizzes & Exams"
        subtitle="Track your upcoming tests, midterms, finals, and review your scores."
      >
        <button className={`${uiStyles.btnBase} ${uiStyles.btnSm} ${uiStyles.btnSecondary}`}>
          <Download size={14} /> Download Record
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
        searchPlaceholder="Search quizzes or exams..."
        searchAriaLabel="Search quizzes and exams"
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
            options: types,
          },
        ]}
        hasActiveFilters={hasActiveFilters || subjectFilter !== 'All Subjects' || typeFilter !== 'All Types'}
        onReset={() => {
          setSearch('');
          setSubjectFilter('All Subjects');
          setTypeFilter('All Types');
        }}
      />

      <ResourceBulkBar
        selectedCount={selected.length}
        itemLabel="assessment"
        onClearSelection={() => setSelected([])}
        actions={[
          { label: 'Export Results', onClick: () => {} },
        ]}
      />

      <DataTable
        columns={COLUMNS}
        minWidth={1000}
        leadingHeader={
          <SelectAllCheckbox
            checked={allVisibleSelected}
            onChange={(e) => handleSelectAll(e.target.checked)}
            label="Select all visible items"
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
                    { icon: '🎓', label: 'Review Score' },
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
