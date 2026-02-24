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
import { CLUBS_LIST, CLUBS_STATS } from '@/lib/mock/studentProfile.mock';
import { Compass, Users, Clock } from 'lucide-react';
import uiStyles from '@/components/ui/ui.module.css';

const COLUMNS: DataTableColumn[] = [
  { id: 'club', label: 'Club / Organization' },
  { id: 'category', label: 'Category' },
  { id: 'adviser', label: 'Adviser' },
  { id: 'schedule', label: 'Meeting Schedule' },
  { id: 'status', label: 'Status' },
  { id: 'actions', label: 'Actions' },
];

const TABS = ['My Clubs', 'Discover All'];

export function StudentClubsView() {
  const [activeTab, setActiveTab] = useState('My Clubs');
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [selected, setSelected] = useState<string[]>([]);

  const categories = ['All Categories', ...Array.from(new Set(CLUBS_LIST.map(c => c.category)))];

  const filtered = CLUBS_LIST.filter(club => {
    // Tab match
    if (activeTab === 'My Clubs' && club.status === 'Available') return false;
    
    // Search match
    const matchSearch = club.name.toLowerCase().includes(search.toLowerCase()) ||
      club.description.toLowerCase().includes(search.toLowerCase()) ||
      club.adviser.toLowerCase().includes(search.toLowerCase());
      
    // Category match
    const matchCategory = categoryFilter === 'All Categories' || club.category === categoryFilter;

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
    { label: 'Active Memberships', value: CLUBS_STATS.activeMemberships.toString(), subtitle: 'Current clubs', icon: '🎯', accent: '#5cc789' },
    { label: 'Pending Applications', value: CLUBS_STATS.pendingApplications.toString(), subtitle: 'Awaiting approval', icon: '⏳', accent: '#f5c842' },
    { label: 'Available Clubs', value: CLUBS_STATS.availableClubs.toString(), subtitle: 'Explore and join', icon: '🔍', accent: '#84a9ff' },
  ];

  const getStatusColor = (status: string) => {
    if (status === 'Active') return '#5cc789';
    if (status === 'Pending') return '#f5c842';
    if (status === 'Available') return '#84a9ff';
    return '#b68eff';
  };

  return (
    <div className={listStyles.page}>
      <PageHeader
        title="Clubs & Organizations"
        subtitle="Manage your extra-curricular activities, leadership roles, and discover new organizations to join."
      >
        <button className={`${uiStyles.btnBase} ${uiStyles.btnSm} ${uiStyles.btnPrimary}`}>
          <Compass size={14} /> Browse Directory
        </button>
      </PageHeader>

      <SummaryMetrics
        metrics={summaryMetrics}
      />

      <div style={{ marginTop: '2rem' }}>
        <ListTabs
          tabs={TABS}
          value={activeTab}
          onChange={setActiveTab}
        />
      </div>

      <SchoolAdminDirectoryFilters
        searchTerm={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search clubs, orgs, or advisers..."
        searchAriaLabel="Search clubs"
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
        itemLabel="club"
        onClearSelection={() => setSelected([])}
        actions={[
          { label: 'Leave Selected', onClick: () => {} },
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
        {filtered.map((club) => {
          return (
            <tr
              key={club.id}
              className={`${listStyles.clickableRow}${selected.includes(club.id) ? ` ${listStyles.rowSelected}` : ''}`}
            >
              <RowSelectCell
                selected={selected.includes(club.id)}
                onToggle={() => handleSelectOne(club.id)}
                label={`Select ${club.name}`}
              />

              {/* Club Info */}
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: club.iconBg, color: club.iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                    {club.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#f0efed' }}>{club.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(240,239,237,0.5)', marginTop: '0.2rem', maxWidth: '250px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {club.description}
                    </div>
                  </div>
                </div>
              </td>

              {/* Category */}
              <td>
                <span style={{ fontSize: '0.85rem', color: 'rgba(240,239,237,0.8)' }}>
                  {club.category}
                </span>
              </td>

              {/* Adviser */}
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Users size={14} color="rgba(240,239,237,0.4)" />
                  <span style={{ fontSize: '0.85rem', color: 'rgba(240,239,237,0.85)' }}>
                    {club.adviser}
                  </span>
                </div>
              </td>

              {/* Schedule */}
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Clock size={14} color="rgba(240,239,237,0.4)" />
                  <span style={{ fontSize: '0.85rem', color: 'rgba(240,239,237,0.85)' }}>
                    {club.schedule}
                  </span>
                </div>
              </td>

              {/* Status / Role */}
              <td>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.4rem' }}>
                  <ChalkBadge label={club.status} accent={getStatusColor(club.status)} />
                  {club.role !== '-' && (
                    <span style={{ fontSize: '0.75rem', color: 'rgba(240,239,237,0.6)', fontWeight: 500 }}>
                      Role: {club.role}
                    </span>
                  )}
                </div>
              </td>

              {/* Actions */}
              <td onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
                <RowActionsMenu
                  label={`Actions for ${club.name}`}
                  actions={[
                    { icon: '👁️', label: 'View Club Profile' },
                    ...(club.status === 'Available' ? [{ icon: '✏️', label: 'Apply to Join' }] : []),
                    ...(club.status === 'Active' ? [{ icon: '🚪', label: 'Leave Club' }] : []),
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
              No clubs match your filters.
            </td>
          </tr>
        )}
      </DataTable>
    </div>
  );
}
