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
import { STUDENT_ANNOUNCEMENTS_LIST, STUDENT_ANNOUNCEMENTS_STATS } from '@/lib/mock/studentProfile.mock';
import { Megaphone, Mail, Bell } from 'lucide-react';
import uiStyles from '@/components/ui/ui.module.css';

const COLUMNS: DataTableColumn[] = [
  { id: 'announcement', label: 'Announcement' },
  { id: 'sender', label: 'Sender' },
  { id: 'date', label: 'Date' },
  { id: 'status', label: 'Status' },
  { id: 'actions', label: 'Actions' },
];

const TABS = ['All Messages', 'Unread', 'System Notices', 'Class Updates'];

export function StudentAnnouncementsView() {
  const [activeTab, setActiveTab] = useState('All Messages');
  const [search, setSearch] = useState('');
  const [senderFilter, setSenderFilter] = useState('All Senders');
  const [selected, setSelected] = useState<string[]>([]);

  const senderRoles = ['All Senders', 'System Owner', 'School Admin', 'Teacher'];

  const filtered = STUDENT_ANNOUNCEMENTS_LIST.filter(ann => {
    // Tab match
    let matchTab = true;
    if (activeTab === 'Unread') matchTab = !ann.isRead;
    if (activeTab === 'System Notices') matchTab = ann.senderRole === 'System Owner';
    if (activeTab === 'Class Updates') matchTab = ann.senderRole === 'Teacher';
    
    // Search match
    const matchSearch = ann.title.toLowerCase().includes(search.toLowerCase()) ||
      ann.message.toLowerCase().includes(search.toLowerCase()) ||
      ann.sender.toLowerCase().includes(search.toLowerCase());
      
    // Sender match
    const matchSender = senderFilter === 'All Senders' || ann.senderRole === senderFilter;

    return matchTab && matchSearch && matchSender;
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
    { label: 'Unread Messages', value: STUDENT_ANNOUNCEMENTS_STATS.unreadCount.toString(), subtitle: 'Requires attention', icon: '📬', accent: '#ff7e93' },
    { label: 'Total Received', value: STUDENT_ANNOUNCEMENTS_STATS.totalCount.toString(), subtitle: 'This school year', icon: '📥', accent: '#84a9ff' },
    { label: 'Important Notices', value: STUDENT_ANNOUNCEMENTS_STATS.importantCount.toString(), subtitle: 'Pinned announcements', icon: '📌', accent: '#f5c842' },
  ];

  const getRoleColor = (role: string) => {
    if (role === 'System Owner') return '#ff7e93';
    if (role === 'School Admin') return '#f5c842';
    if (role === 'Teacher') return '#84a9ff';
    return '#b68eff';
  };

  return (
    <div className={listStyles.page}>
      <PageHeader
        title="Announcements"
        subtitle="Stay updated with the latest news, notices, and class updates from teachers and admins."
      >
        <button className={`${uiStyles.btnBase} ${uiStyles.btnSm} ${uiStyles.btnSecondary}`}>
          <Mail size={14} /> Mark All as Read
        </button>
      </PageHeader>

      <SummaryMetrics
        metrics={summaryMetrics}
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
        searchPlaceholder="Search titles, messages, or senders..."
        searchAriaLabel="Search announcements"
        selects={[
          {
            label: 'Sender Role',
            value: senderFilter,
            onChange: setSenderFilter,
            options: senderRoles,
          }
        ]}
        hasActiveFilters={search !== '' || senderFilter !== 'All Senders'}
        onReset={() => {
          setSearch('');
          setSenderFilter('All Senders');
        }}
      />

      <ResourceBulkBar
        selectedCount={selected.length}
        itemLabel="announcement"
        onClearSelection={() => setSelected([])}
        actions={[
          { label: 'Mark as Read', onClick: () => {} },
          { label: 'Archive', onClick: () => {} },
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
        {filtered.map((ann) => {
          return (
            <tr
              key={ann.id}
              className={`${listStyles.clickableRow}${selected.includes(ann.id) ? ` ${listStyles.rowSelected}` : ''}${!ann.isRead ? ' ' + listStyles.rowUnread : ''}`}
              style={{ backgroundColor: !ann.isRead ? 'rgba(255, 126, 147, 0.05)' : undefined }}
            >
              <RowSelectCell
                selected={selected.includes(ann.id)}
                onToggle={() => handleSelectOne(ann.id)}
                label={`Select ${ann.title}`}
              />

              {/* Announcement */}
              <td style={{ width: '45%' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: ann.iconBg, color: ann.iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0, marginTop: '0.2rem' }}>
                    {ann.icon}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {!ann.isRead && <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ff7e93' }} />}
                      <div style={{ fontWeight: !ann.isRead ? 700 : 600, fontSize: '0.95rem', color: !ann.isRead ? '#fff' : '#f0efed' }}>{ann.title}</div>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: !ann.isRead ? 'rgba(255,255,255,0.85)' : 'rgba(240,239,237,0.6)', marginTop: '0.3rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.4 }}>
                      {ann.message}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(240,239,237,0.4)', marginTop: '0.3rem' }}>
                      Category: {ann.category}
                    </div>
                  </div>
                </div>
              </td>

              {/* Sender */}
              <td>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <span style={{ fontSize: '0.9rem', color: '#f0efed', fontWeight: 500 }}>{ann.sender}</span>
                  <ChalkBadge label={ann.senderRole} accent={getRoleColor(ann.senderRole)} />
                </div>
              </td>

              {/* Date */}
              <td>
                <span style={{ fontSize: '0.85rem', color: 'rgba(240,239,237,0.8)' }}>
                  {ann.date}
                </span>
              </td>

              {/* Status */}
              <td>
                <span style={{ fontSize: '0.85rem', color: !ann.isRead ? '#ff7e93' : 'rgba(240,239,237,0.5)', fontWeight: !ann.isRead ? 600 : 400 }}>
                  {ann.isRead ? 'Read' : 'Unread'}
                </span>
              </td>

              {/* Actions */}
              <td onClick={(e) => e.stopPropagation()}>
                <RowActionsMenu
                  label={`Actions for ${ann.title}`}
                  actions={[
                    { icon: '👁️', label: 'View Full Message' },
                    ...(ann.isRead ? [{ icon: '✉️', label: 'Mark as Unread' }] : [{ icon: '📖', label: 'Mark as Read' }]),
                    { icon: '📁', label: 'Archive' }
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
              No announcements match your filters.
            </td>
          </tr>
        )}
      </DataTable>
    </div>
  );
}

