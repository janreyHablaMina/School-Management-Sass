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
import { CLEARANCE_LIST, CLEARANCE_STATS } from '@/lib/mock/studentProfile.mock';
import { Download } from 'lucide-react';
import uiStyles from '@/components/ui/ui.module.css';

const COLUMNS: DataTableColumn[] = [
  { id: 'department', label: 'Department' },
  { id: 'signatory', label: 'Signatory' },
  { id: 'date', label: 'Date Cleared' },
  { id: 'status', label: 'Status' },
  { id: 'remarks', label: 'Remarks' },
  { id: 'actions', label: 'Actions' },
];

const TABS = ['All', 'Cleared', 'Pending', 'Overdue'];

export function StudentClearanceView() {
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = CLEARANCE_LIST.filter(clearance => {
    // Tab match
    const matchTab = activeTab === 'All' || clearance.status === activeTab;

    // Search match
    const matchSearch = clearance.department.toLowerCase().includes(search.toLowerCase()) ||
      clearance.signatory.toLowerCase().includes(search.toLowerCase()) ||
      clearance.remarks.toLowerCase().includes(search.toLowerCase());
      
    return matchTab && matchSearch;
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

  const clearedPercent = Math.round((CLEARANCE_STATS.clearedCount / CLEARANCE_STATS.totalCount) * 100);

  const summaryMetrics = [
    { label: 'Overall Status', value: CLEARANCE_STATS.overall, subtitle: 'Requires Action', icon: '📋', accent: CLEARANCE_STATS.overall === 'Cleared' ? '#5cc789' : '#f5c842' },
    { label: 'Progress', value: `${clearedPercent}%`, subtitle: `${CLEARANCE_STATS.clearedCount} of ${CLEARANCE_STATS.totalCount} Cleared`, icon: '📈', accent: '#84a9ff' },
    { label: 'Pending Approvals', value: (CLEARANCE_STATS.totalCount - CLEARANCE_STATS.clearedCount).toString(), subtitle: 'Follow up required', icon: '⏱️', accent: '#ffab6b' },
    { label: 'Overdue Items', value: '0', subtitle: 'No overdue fines', icon: '⚠️', accent: '#ff7e93' },
  ];

  const getStatusColor = (status: string) => {
    if (status === 'Cleared') return '#5cc789';
    if (status === 'Pending') return '#f5c842';
    if (status === 'Overdue') return '#ff7e93';
    return '#84a9ff';
  };

  return (
    <div className={listStyles.page}>
      <PageHeader
        title="Clearance Status"
        subtitle="Monitor your end-of-year or graduation clearance requirements across school departments."
      >
        <button className={`${uiStyles.btnBase} ${uiStyles.btnSm} ${uiStyles.btnSecondary}`}>
          <Download size={14} /> Download Clearance Slip
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
        searchPlaceholder="Search departments, signatories, or remarks..."
        searchAriaLabel="Search clearance records"
        selects={[]}
        hasActiveFilters={search !== ''}
        onReset={() => {
          setSearch('');
        }}
      />

      <ResourceBulkBar
        selectedCount={selected.length}
        itemLabel="clearance record"
        onClearSelection={() => setSelected([])}
        actions={[
          { label: 'Follow up Selected', onClick: () => {} },
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
        {filtered.map((clearance) => {
          return (
            <tr
              key={clearance.id}
              className={`${listStyles.clickableRow}${selected.includes(clearance.id) ? ` ${listStyles.rowSelected}` : ''}`}
            >
              <RowSelectCell
                selected={selected.includes(clearance.id)}
                onToggle={() => handleSelectOne(clearance.id)}
                label={`Select ${clearance.department}`}
              />

              {/* Department */}
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: clearance.iconBg, color: clearance.iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>
                    {clearance.icon}
                  </div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#f0efed' }}>
                    {clearance.department}
                  </div>
                </div>
              </td>

              {/* Signatory */}
              <td>
                <span style={{ fontSize: '0.9rem', color: 'rgba(240,239,237,0.85)' }}>{clearance.signatory}</span>
              </td>

              {/* Date */}
              <td>
                <span style={{ fontSize: '0.85rem', color: 'rgba(240,239,237,0.6)' }}>
                  {clearance.date}
                </span>
              </td>

              {/* Status */}
              <td>
                <ChalkBadge label={clearance.status} accent={getStatusColor(clearance.status)} />
              </td>

              {/* Remarks */}
              <td>
                <span style={{ fontSize: '0.85rem', color: 'rgba(240,239,237,0.6)' }}>
                  {clearance.remarks}
                </span>
              </td>

              {/* Actions */}
              <td onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
                <RowActionsMenu
                  label={`Actions for ${clearance.department}`}
                  actions={[
                    { icon: '📩', label: 'Message Signatory' },
                    { icon: '📝', label: 'Submit Requirement' },
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
              No records found.
            </td>
          </tr>
        )}
      </DataTable>
    </div>
  );
}
