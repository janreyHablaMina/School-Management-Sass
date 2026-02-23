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
import { DOCUMENT_LIST, DOCUMENT_STATS } from '@/lib/mock/studentProfile.mock';
import { UploadCloud, Folder } from 'lucide-react';
import uiStyles from '@/components/ui/ui.module.css';

const COLUMNS: DataTableColumn[] = [
  { id: 'document', label: 'Document Name' },
  { id: 'category', label: 'Category' },
  { id: 'uploadedDate', label: 'Date Uploaded' },
  { id: 'uploadedBy', label: 'Uploaded By' },
  { id: 'status', label: 'Status' },
  { id: 'actions', label: 'Actions' },
];

const TABS = ['All Documents', 'Verified', 'Pending', 'Missing'];

export function StudentDocumentsView() {
  const [activeTab, setActiveTab] = useState('All Documents');
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [selected, setSelected] = useState<string[]>([]);

  const categories = ['All Categories', ...Array.from(new Set(DOCUMENT_LIST.map(d => d.category)))];

  const filtered = DOCUMENT_LIST.filter(doc => {
    // Tab match
    const matchTab = activeTab === 'All Documents' || doc.status === activeTab;
    
    // Search match
    const matchSearch = doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.uploadedBy.toLowerCase().includes(search.toLowerCase());
      
    // Category match
    const matchCategory = categoryFilter === 'All Categories' || doc.category === categoryFilter;

    return matchTab && matchSearch && matchCategory;
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
    { label: DOCUMENT_STATS.total.label, value: DOCUMENT_STATS.total.value.toString(), subtitle: DOCUMENT_STATS.total.subText, icon: '📁', accent: '#84a9ff' },
    { label: DOCUMENT_STATS.verified.label, value: DOCUMENT_STATS.verified.value.toString(), subtitle: DOCUMENT_STATS.verified.subText, icon: '✅', accent: '#5cc789' },
    { label: DOCUMENT_STATS.pending.label, value: DOCUMENT_STATS.pending.value.toString(), subtitle: DOCUMENT_STATS.pending.subText, icon: '⏳', accent: '#f5c842' },
    { label: DOCUMENT_STATS.missing.label, value: DOCUMENT_STATS.missing.value.toString(), subtitle: DOCUMENT_STATS.missing.subText, icon: '⚠️', accent: '#ff7e93' },
  ];

  const getStatusColor = (status: string) => {
    if (status === 'Verified') return '#5cc789';
    if (status === 'Pending') return '#f5c842';
    if (status === 'Missing') return '#ff7e93';
    return '#84a9ff';
  };

  return (
    <div className={listStyles.page}>
      <PageHeader
        title="My Documents"
        subtitle="Manage your academic records, certificates, IDs, and other school-required documents."
      >
        <button className={`${uiStyles.btnBase} ${uiStyles.btnSm} ${uiStyles.btnPrimary}`}>
          <UploadCloud size={14} /> Upload Document
        </button>
      </PageHeader>

      <SummaryMetrics
        metrics={summaryMetrics}
        columns={4}
      />

      <div style={{ marginTop: '2rem' }}>
        <ListTabs
          tabs={TABS}
          value={activeTab}
          onChange={(tab) => {
            setActiveTab(tab);
            setSelected([]);
          }}
        />
      </div>

      <SchoolAdminDirectoryFilters
        searchTerm={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search document names or uploaders..."
        searchAriaLabel="Search documents"
        selects={[
          {
            label: 'Category',
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
        itemLabel="document"
        onClearSelection={() => setSelected([])}
        actions={[
          { label: 'Download Selected', onClick: () => {} },
        ]}
      />

      <DataTable
        columns={COLUMNS}
        minWidth={1000}
        leadingHeader={
          <SelectAllCheckbox
            checked={allVisibleSelected}
            onChange={(e) => handleSelectAll(e.target.checked)}
            label="Select all visible documents"
          />
        }
      >
        {filtered.map((doc) => {
          return (
            <tr
              key={doc.id}
              className={`${listStyles.clickableRow}${selected.includes(doc.id) ? ` ${listStyles.rowSelected}` : ''}`}
            >
              <RowSelectCell
                selected={selected.includes(doc.id)}
                onToggle={() => handleSelectOne(doc.id)}
                label={`Select ${doc.name}`}
              />

              {/* Document Name */}
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: doc.categoryBg, color: doc.categoryColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>
                    {doc.icon}
                  </div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#f0efed' }}>
                    {doc.name}
                  </div>
                </div>
              </td>

              {/* Category */}
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Folder size={14} color={doc.categoryColor} />
                  <span style={{ fontSize: '0.85rem', color: 'rgba(240,239,237,0.85)' }}>
                    {doc.category}
                  </span>
                </div>
              </td>

              {/* Date */}
              <td>
                <div style={{ whiteSpace: 'pre-line', fontSize: '0.85rem', color: 'rgba(240,239,237,0.8)' }}>
                  {doc.uploadedDate}
                </div>
              </td>

              {/* Uploaded By */}
              <td>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                  <span style={{ fontSize: '0.85rem', color: '#f0efed' }}>{doc.uploadedBy}</span>
                  {doc.uploadedByRole && (
                    <span style={{ fontSize: '0.75rem', color: 'rgba(240,239,237,0.5)' }}>{doc.uploadedByRole}</span>
                  )}
                </div>
              </td>

              {/* Status */}
              <td>
                <ChalkBadge label={doc.status} accent={getStatusColor(doc.status)} />
              </td>

              {/* Actions */}
              <td onClick={(e) => e.stopPropagation()}>
                <RowActionsMenu
                  label={`Actions for ${doc.name}`}
                  actions={[
                    ...(doc.status !== 'Missing' ? [{ icon: '👁️', label: 'Preview Document' }, { icon: '⬇️', label: 'Download' }] : [{ icon: '📤', label: 'Upload Now' }])
                  ]}
                  dangerActions={
                    doc.status === 'Pending' ? [{ icon: '🗑️', label: 'Delete' }] : []
                  }
                  onAction={() => {}}
                />
              </td>
            </tr>
          );
        })}
        {filtered.length === 0 && (
          <tr>
            <td colSpan={COLUMNS.length + 1} style={{ textAlign: 'center', padding: '3rem 1rem', color: 'rgba(240,239,237,0.4)' }}>
              No documents match your filters.
            </td>
          </tr>
        )}
      </DataTable>
    </div>
  );
}
