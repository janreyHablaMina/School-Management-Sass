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
import { LIBRARY_BOOKS, LIBRARY_STATS } from '@/lib/mock/studentProfile.mock';
import { BookOpen, Search, Download } from 'lucide-react';
import uiStyles from '@/components/ui/ui.module.css';

const COLUMNS: DataTableColumn[] = [
  { id: 'title', label: 'Book Title & Author' },
  { id: 'category', label: 'Category' },
  { id: 'format', label: 'Format' },
  { id: 'dueDate', label: 'Due Date' },
  { id: 'status', label: 'Status' },
  { id: 'actions', label: 'Actions' },
];

const TABS = ['All Books', 'Physical Books', 'E-Books'];

export function StudentLibraryView() {
  const [activeTab, setActiveTab] = useState('All Books');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = LIBRARY_BOOKS.filter(book => {
    // Tab match
    const matchTab = activeTab === 'All Books' || 
      (activeTab === 'Physical Books' && book.format === 'Physical') ||
      (activeTab === 'E-Books' && book.format === 'E-Book');
    
    // Search match
    const matchSearch = book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase()) ||
      book.category.toLowerCase().includes(search.toLowerCase());

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

  const summaryMetrics = [
    { label: 'Borrowed Books', value: LIBRARY_STATS.borrowedBooks.toString(), subtitle: 'Currently in possession', icon: '📚', accent: '#84a9ff' },
    { label: 'Overdue Items', value: LIBRARY_STATS.overdueBooks.toString(), subtitle: 'Please return immediately', icon: '⚠️', accent: '#ff7e93' },
    { label: 'Library Fines', value: LIBRARY_STATS.libraryFines, subtitle: 'Unpaid penalties', icon: '🪙', accent: '#f5c842' },
    { label: 'Books Read', value: LIBRARY_STATS.totalRead.toString(), subtitle: 'Total academic year', icon: '📖', accent: '#5cc789' },
  ];

  const getStatusColor = (status: string) => {
    if (status === 'Returned' || status === 'Available') return '#5cc789';
    if (status === 'Overdue') return '#ff7e93';
    if (status === 'Downloaded') return '#b68eff';
    return '#84a9ff'; // Borrowed
  };

  return (
    <div className={listStyles.page}>
      <PageHeader
        title="Library & E-Books"
        subtitle="Manage your borrowed physical books, access e-books, and check your library fines."
      >
        <button className={`${uiStyles.btnBase} ${uiStyles.btnSm} ${uiStyles.btnPrimary}`}>
          <Search size={14} /> Browse Catalog
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
            setSearch('');
          }}
        />
      </div>

      <SchoolAdminDirectoryFilters
        searchTerm={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search titles, authors, or categories..."
        searchAriaLabel="Search books"
        selects={[]}
        hasActiveFilters={search !== ''}
        onReset={() => setSearch('')}
      />

      <ResourceBulkBar
        selectedCount={selected.length}
        itemLabel="book"
        onClearSelection={() => setSelected([])}
        actions={[
          { label: 'Renew Selected', onClick: () => {} },
        ]}
      />

      <DataTable
        columns={COLUMNS}
        minWidth={1000}
        leadingHeader={
          <SelectAllCheckbox
            checked={allVisibleSelected}
            onChange={(e) => handleSelectAll(e.target.checked)}
            label="Select all"
          />
        }
      >
        {filtered.map((book) => (
          <tr
            key={book.id}
            className={`${listStyles.clickableRow}${selected.includes(book.id) ? ` ${listStyles.rowSelected}` : ''}${book.status === 'Overdue' ? ` ${listStyles.rowUnread}` : ''}`}
            style={{ backgroundColor: book.status === 'Overdue' ? 'rgba(255, 126, 147, 0.05)' : undefined }}
          >
            <RowSelectCell
              selected={selected.includes(book.id)}
              onToggle={() => handleSelectOne(book.id)}
              label={`Select book ${book.title}`}
            />

            {/* Title & Author */}
            <td>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: book.iconBg, color: book.iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                  {book.icon}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', color: book.status === 'Overdue' ? '#ff7e93' : '#f0efed' }}>{book.title}</div>
                  <div style={{ fontSize: '0.8rem', color: 'rgba(240,239,237,0.6)', marginTop: '0.2rem' }}>By {book.author}</div>
                </div>
              </div>
            </td>

            {/* Category */}
            <td>
              <span style={{ fontSize: '0.85rem', color: 'rgba(240,239,237,0.85)' }}>{book.category}</span>
            </td>

            {/* Format */}
            <td>
              <span style={{ fontSize: '0.85rem', color: 'rgba(240,239,237,0.85)' }}>
                {book.format === 'E-Book' ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><BookOpen size={14} color="#b68eff" /> E-Book</span>
                ) : (
                  book.format
                )}
              </span>
            </td>

            {/* Due Date */}
            <td>
              <span style={{ fontSize: '0.85rem', color: book.status === 'Overdue' ? '#ff7e93' : 'rgba(240,239,237,0.6)' }}>
                {book.dueDate}
              </span>
            </td>

            {/* Status */}
            <td>
              <ChalkBadge label={book.status} accent={getStatusColor(book.status)} />
            </td>

            {/* Actions */}
            <td onClick={(e) => e.stopPropagation()}>
              <RowActionsMenu
                label={`Actions for ${book.title}`}
                actions={[
                  { icon: '👁️', label: 'View Details' },
                  ...(book.format === 'Physical' && book.status === 'Borrowed' ? [{ icon: '📅', label: 'Request Renewal' }] : []),
                  ...(book.format === 'E-Book' ? [{ icon: '⬇️', label: 'Download EPUB/PDF' }] : []),
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
              No books found matching your criteria.
            </td>
          </tr>
        )}
      </DataTable>
    </div>
  );
}

