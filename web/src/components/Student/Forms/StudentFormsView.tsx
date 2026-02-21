'use client';

import React, { useState } from 'react';
import {
  ChalkBadge, DataTable, SummaryMetrics, listStyles,
  RowActionsMenu, ResourceBulkBar, RowSelectCell, SelectAllCheckbox,
  type DataTableColumn
} from '@/components/ui/shared';
import { PageHeader } from '@/components/ui/shared';
import { SchoolAdminDirectoryFilters } from '@/components/SchoolAdmin/shared/SchoolAdminDirectoryFilters';
import { DOWNLOADABLE_FORMS, FORMS_STATS } from '@/lib/mock/studentProfile.mock';
import { Download, FileText, Folder } from 'lucide-react';
import uiStyles from '@/components/ui/ui.module.css';

const COLUMNS: DataTableColumn[] = [
  { id: 'title', label: 'Form Title' },
  { id: 'category', label: 'Department / Category' },
  { id: 'fileInfo', label: 'File Type & Size' },
  { id: 'lastUpdated', label: 'Last Updated' },
  { id: 'actions', label: 'Actions' },
];

export function StudentFormsView() {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [selected, setSelected] = useState<string[]>([]);

  const categories = ['All Categories', ...Array.from(new Set(DOWNLOADABLE_FORMS.map(f => f.category)))];

  const filtered = DOWNLOADABLE_FORMS.filter(form => {
    // Search match
    const matchSearch = form.title.toLowerCase().includes(search.toLowerCase()) ||
      form.category.toLowerCase().includes(search.toLowerCase());
      
    // Category match
    const matchCategory = categoryFilter === 'All Categories' || form.category === categoryFilter;

    return matchSearch && matchCategory;
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
    { label: 'Total Available Forms', value: FORMS_STATS.totalForms.toString(), subtitle: 'Across all departments', icon: '📁', accent: '#84a9ff' },
    { label: 'Recently Updated', value: FORMS_STATS.newForms.toString(), subtitle: 'Updated this month', icon: '✨', accent: '#5cc789' },
    { label: 'Most Downloaded', value: FORMS_STATS.mostDownloaded, subtitle: 'Popular request', icon: '📈', accent: '#f5c842' },
  ];

  const getFormatColor = (format: string) => {
    if (format === 'PDF') return '#ff7e93';
    if (format === 'DOCX') return '#84a9ff';
    return '#5cc789';
  };

  return (
    <div className={listStyles.page}>
      <PageHeader
        title="Downloadable Forms"
        subtitle="Access official school forms, requests, and documents needed for various procedures."
      >
        <button className={`${uiStyles.btnBase} ${uiStyles.btnSm} ${uiStyles.btnSecondary}`}>
          <Download size={14} /> Download All as ZIP
        </button>
      </PageHeader>

      <SummaryMetrics
        metrics={summaryMetrics}
      />

      <div style={{ marginTop: '2rem' }}></div>

      <SchoolAdminDirectoryFilters
        searchTerm={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search form titles or keywords..."
        searchAriaLabel="Search forms"
        selects={[
          {
            label: 'Department',
            value: categoryFilter,
            onChange: setCategoryFilter,
            options: categories,
          }
        ]}
        hasActiveFilters={search !== '' || categoryFilter !== 'All Categories'}
        onReset={() => {
          setSearch('');
          setCategoryFilter('All Categories');
        }}
      />

      <ResourceBulkBar
        selectedCount={selected.length}
        itemLabel="form"
        onClearSelection={() => setSelected([])}
        actions={[
          { label: 'Download Selected', onClick: () => {} },
        ]}
      />

      <DataTable
        columns={COLUMNS}
        minWidth={900}
        leadingHeader={
          <SelectAllCheckbox
            checked={allVisibleSelected}
            onChange={(e) => handleSelectAll(e.target.checked)}
            label="Select all forms"
          />
        }
      >
        {filtered.map((form) => (
          <tr
            key={form.id}
            className={`${listStyles.clickableRow}${selected.includes(form.id) ? ` ${listStyles.rowSelected}` : ''}`}
          >
            <RowSelectCell
              selected={selected.includes(form.id)}
              onToggle={() => handleSelectOne(form.id)}
              label={`Select ${form.title}`}
            />

            {/* Title */}
            <td>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: form.iconBg, color: form.iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                  {form.icon}
                </div>
                <span style={{ fontWeight: 600, fontSize: '0.95rem', color: '#f0efed' }}>{form.title}</span>
              </div>
            </td>

            {/* Category */}
            <td>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Folder size={14} color="rgba(240,239,237,0.5)" />
                <span style={{ fontSize: '0.85rem', color: 'rgba(240,239,237,0.85)' }}>{form.category}</span>
              </div>
            </td>

            {/* File Info */}
            <td>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ChalkBadge label={form.format} accent={getFormatColor(form.format)} />
                <span style={{ fontSize: '0.75rem', color: 'rgba(240,239,237,0.5)' }}>{form.size}</span>
              </div>
            </td>

            {/* Last Updated */}
            <td>
              <span style={{ fontSize: '0.85rem', color: 'rgba(240,239,237,0.6)' }}>
                {form.lastUpdated}
              </span>
            </td>

            {/* Actions */}
            <td onClick={(e) => e.stopPropagation()}>
              <RowActionsMenu
                label={`Actions for ${form.title}`}
                actions={[
                  { icon: '⬇️', label: `Download ${form.format}` },
                  { icon: '👁️', label: 'Preview Form' },
                ]}
                dangerActions={[]}
                onAction={() => {}}
              />
            </td>
          </tr>
        ))}
        {filtered.length === 0 && (
          <tr>
            <td colSpan={COLUMNS.length + 1} style={{ textAlign: 'center', padding: '3rem', color: 'rgba(240,239,237,0.4)' }}>
              No forms match your search criteria.
            </td>
          </tr>
        )}
      </DataTable>
    </div>
  );
}

