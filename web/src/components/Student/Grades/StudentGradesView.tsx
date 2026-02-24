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
import { SUBJECT_GRADES, GRADES_GENERAL_AVERAGE, GRADES_CLASS_RANK, GRADING_SCALE } from '@/lib/mock/studentProfile.mock';
import { Download, FileText } from 'lucide-react';
import uiStyles from '@/components/ui/ui.module.css';

const COLUMNS: DataTableColumn[] = [
  { id: 'subject', label: 'Subject' },
  { id: 'q1', label: '1st Qtr' },
  { id: 'q2', label: '2nd Qtr' },
  { id: 'q3', label: '3rd Qtr' },
  { id: 'q4', label: '4th Qtr' },
  { id: 'final', label: 'Final Grade' },
  { id: 'remarks', label: 'Remarks' },
  { id: 'actions', label: 'Actions' },
];

const TABS = ['School Year 2024-2025', 'Previous Years'];

export function StudentGradesView() {
  const [activeTab, setActiveTab] = useState('School Year 2024-2025');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string[]>([]);

  // Filtering
  const filtered = SUBJECT_GRADES.filter(subject => {
    if (activeTab === 'Previous Years') return false; // empty for now
    
    // Search match
    const matchSearch = subject.subject.toLowerCase().includes(search.toLowerCase()) ||
      subject.teacher.toLowerCase().includes(search.toLowerCase());
      
    return matchSearch;
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
    { label: 'General Average', value: GRADES_GENERAL_AVERAGE.value, subtitle: GRADES_GENERAL_AVERAGE.descriptiveRating, icon: '🏆', accent: GRADES_GENERAL_AVERAGE.color },
    { label: 'Class Rank', value: GRADES_CLASS_RANK.rank, subtitle: GRADES_CLASS_RANK.percentile, icon: '🏅', accent: GRADES_CLASS_RANK.color },
    { label: 'Highest Grade', value: '95', subtitle: 'P.E. and Health', icon: '📈', accent: '#5cc789' },
    { label: 'Subjects Passed', value: '8 / 8', subtitle: '100% Passing Rate', icon: '✅', accent: '#5cc789' },
  ];

  return (
    <div className={listStyles.page}>
      <PageHeader
        title="Grades (Form 138)"
        subtitle="View your academic performance, quarterly grades, and final averages."
      >
        <button className={`${uiStyles.btnBase} ${uiStyles.btnSm} ${uiStyles.btnSecondary}`}>
          <Download size={14} /> Download Form 138
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
        searchPlaceholder="Search subjects..."
        searchAriaLabel="Search subjects"
        selects={[]}
        hasActiveFilters={search !== ''}
        onReset={() => {
          setSearch('');
        }}
      />

      <ResourceBulkBar
        selectedCount={selected.length}
        itemLabel="subject"
        onClearSelection={() => setSelected([])}
        actions={[
          { label: 'Export Selected', onClick: () => {} },
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
        {filtered.map((subjectGrade) => {
          return (
            <tr
              key={subjectGrade.id}
              className={`${listStyles.clickableRow}${selected.includes(subjectGrade.id) ? ` ${listStyles.rowSelected}` : ''}`}
            >
              <RowSelectCell
                selected={selected.includes(subjectGrade.id)}
                onToggle={() => handleSelectOne(subjectGrade.id)}
                label={`Select ${subjectGrade.subject}`}
              />

              {/* Subject */}
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: subjectGrade.iconBg, color: subjectGrade.iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>
                    {subjectGrade.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#f0efed' }}>{subjectGrade.subject}</div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(240,239,237,0.5)' }}>{subjectGrade.teacher}</div>
                  </div>
                </div>
              </td>

              {/* Q1 */}
              <td><span style={{ fontSize: '0.9rem', color: '#f0efed', fontWeight: 500 }}>{subjectGrade.q1}</span></td>
              {/* Q2 */}
              <td><span style={{ fontSize: '0.9rem', color: '#f0efed', fontWeight: 500 }}>{subjectGrade.q2}</span></td>
              {/* Q3 */}
              <td><span style={{ fontSize: '0.9rem', color: '#f0efed', fontWeight: 500 }}>{subjectGrade.q3}</span></td>
              {/* Q4 */}
              <td><span style={{ fontSize: '0.9rem', color: '#f0efed', fontWeight: 500 }}>{subjectGrade.q4}</span></td>

              {/* Final Grade */}
              <td>
                <span style={{ fontSize: '1.1rem', color: '#f0efed', fontWeight: 700 }}>
                  {subjectGrade.final}
                </span>
              </td>

              {/* Remarks */}
              <td>
                <ChalkBadge label={subjectGrade.remarks} accent={subjectGrade.remarkColor} />
              </td>

              {/* Actions */}
              <td onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
                <RowActionsMenu
                  label={`Actions for ${subjectGrade.subject}`}
                  actions={[
                    { icon: '👁️', label: 'View Subject' },
                    { icon: '📄', label: 'Teacher Remarks' },
                  ]}
                  dangerActions={[]}
                  onAction={() => {}}
                />
              </td>
            </tr>
          );
        })}
        {filtered.length === 0 && (
          <tr>
            <td colSpan={COLUMNS.length + 1} style={{ textAlign: 'center', padding: '3rem 1rem', color: 'rgba(240,239,237,0.4)' }}>
              No grades available for this selection.
            </td>
          </tr>
        )}
      </DataTable>
      
      {/* Grading Scale Legend */}
      <div style={{ marginTop: '2rem', background: 'rgba(0,0,0,0.15)', border: '1px solid rgba(240,239,237,0.05)', borderRadius: '12px', padding: '1.5rem' }}>
        <h4 style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', fontWeight: 600, color: '#f0efed' }}>Grading Scale</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {GRADING_SCALE.map((scale, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: scale.color }} />
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 500, color: '#f0efed' }}>{scale.range}</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(240,239,237,0.5)' }}>{scale.rating} ({scale.equivalent})</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
