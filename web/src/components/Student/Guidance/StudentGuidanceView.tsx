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
import { GUIDANCE_APPOINTMENTS, DISCIPLINARY_RECORDS, GUIDANCE_STATS } from '@/lib/mock/studentProfile.mock';
import { CalendarPlus, MessageSquare } from 'lucide-react';
import uiStyles from '@/components/ui/ui.module.css';

const APPOINTMENT_COLUMNS: DataTableColumn[] = [
  { id: 'date', label: 'Date & Time' },
  { id: 'type', label: 'Session Type' },
  { id: 'counselor', label: 'Counselor' },
  { id: 'notes', label: 'Notes' },
  { id: 'status', label: 'Status' },
  { id: 'actions', label: 'Actions' },
];

const DISCIPLINARY_COLUMNS: DataTableColumn[] = [
  { id: 'date', label: 'Date' },
  { id: 'incident', label: 'Incident' },
  { id: 'reportedBy', label: 'Reported By' },
  { id: 'action', label: 'Action Taken' },
  { id: 'status', label: 'Status' },
  { id: 'actions', label: 'Actions' },
];

const TABS = ['Appointments', 'Disciplinary Records'];

export function StudentGuidanceView() {
  const [activeTab, setActiveTab] = useState('Appointments');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string[]>([]);

  // Filtering for Appointments
  const filteredAppointments = GUIDANCE_APPOINTMENTS.filter(appt => {
    return appt.type.toLowerCase().includes(search.toLowerCase()) ||
      appt.counselor.toLowerCase().includes(search.toLowerCase()) ||
      appt.notes.toLowerCase().includes(search.toLowerCase());
  });

  // Filtering for Disciplinary
  const filteredDisciplinary = DISCIPLINARY_RECORDS.filter(record => {
    return record.incident.toLowerCase().includes(search.toLowerCase()) ||
      record.reportedBy.toLowerCase().includes(search.toLowerCase()) ||
      record.action.toLowerCase().includes(search.toLowerCase());
  });

  const currentData = activeTab === 'Appointments' ? filteredAppointments : filteredDisciplinary;
  const allVisibleSelected = currentData.length > 0 && currentData.every(a => selected.includes(a.id));

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelected(prev => Array.from(new Set([...prev, ...currentData.map(a => a.id)])));
    } else {
      setSelected(prev => prev.filter(id => !currentData.map(a => a.id).includes(id)));
    }
  };

  const handleSelectOne = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const summaryMetrics = [
    { label: 'Assigned Counselor', value: GUIDANCE_STATS.counselor, subtitle: 'Primary contact', icon: '👤', accent: '#84a9ff' },
    { label: 'Upcoming Appts', value: GUIDANCE_STATS.upcomingAppointments.toString(), subtitle: 'Scheduled sessions', icon: '📅', accent: '#5cc789' },
    { label: 'Completed Sessions', value: GUIDANCE_STATS.completedSessions.toString(), subtitle: 'This school year', icon: '✅', accent: '#b68eff' },
    { label: 'Disciplinary Status', value: GUIDANCE_STATS.disciplinaryStatus, subtitle: 'No active sanctions', icon: '⚖️', accent: GUIDANCE_STATS.disciplinaryStatus === 'Clear' ? '#5cc789' : '#ff7e93' },
  ];

  const getStatusColor = (status: string) => {
    if (status === 'Completed' || status === 'Resolved' || status === 'Clear') return '#5cc789';
    if (status === 'Upcoming') return '#84a9ff';
    if (status === 'Active' || status === 'Pending') return '#f5c842';
    return '#ff7e93';
  };

  return (
    <div className={listStyles.page}>
      <PageHeader
        title="Guidance Office"
        subtitle="Schedule counseling sessions, view appointment history, and check your disciplinary records."
      >
        <button className={`${uiStyles.btnBase} ${uiStyles.btnSm} ${uiStyles.btnPrimary}`}>
          <CalendarPlus size={14} /> Request Appointment
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
        searchPlaceholder={activeTab === 'Appointments' ? "Search appointments, counselors, or notes..." : "Search incidents or actions..."}
        searchAriaLabel="Search guidance records"
        selects={[]}
        hasActiveFilters={search !== ''}
        onReset={() => setSearch('')}
      />

      <ResourceBulkBar
        selectedCount={selected.length}
        itemLabel={activeTab === 'Appointments' ? "appointment" : "record"}
        onClearSelection={() => setSelected([])}
        actions={[
          { label: 'Download Selected', onClick: () => {} },
        ]}
      />

      {activeTab === 'Appointments' ? (
        <DataTable
          columns={APPOINTMENT_COLUMNS}
          minWidth={1000}
          leadingHeader={
            <SelectAllCheckbox
              checked={allVisibleSelected}
              onChange={(e) => handleSelectAll(e.target.checked)}
              label="Select all appointments"
            />
          }
        >
          {filteredAppointments.map((appt) => (
            <tr
              key={appt.id}
              className={`${listStyles.clickableRow}${selected.includes(appt.id) ? ` ${listStyles.rowSelected}` : ''}`}
            >
              <RowSelectCell
                selected={selected.includes(appt.id)}
                onToggle={() => handleSelectOne(appt.id)}
                label={`Select appointment on ${appt.date}`}
              />

              {/* Date & Time */}
              <td>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#f0efed' }}>{appt.date.split(' - ')[0]}</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(240,239,237,0.5)' }}>{appt.date.split(' - ')[1]}</div>
              </td>

              {/* Type */}
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: appt.iconBg, color: appt.iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>
                    {appt.icon}
                  </div>
                  <span style={{ fontSize: '0.85rem', color: 'rgba(240,239,237,0.85)' }}>{appt.type}</span>
                </div>
              </td>

              {/* Counselor */}
              <td>
                <span style={{ fontSize: '0.85rem', color: 'rgba(240,239,237,0.85)' }}>{appt.counselor}</span>
              </td>

              {/* Notes */}
              <td>
                <span style={{ fontSize: '0.85rem', color: 'rgba(240,239,237,0.6)' }}>{appt.notes}</span>
              </td>

              {/* Status */}
              <td>
                <ChalkBadge label={appt.status} accent={getStatusColor(appt.status)} />
              </td>

              {/* Actions */}
              <td onClick={(e) => e.stopPropagation()}>
                <RowActionsMenu
                  label={`Actions for appointment on ${appt.date}`}
                  actions={[
                    { icon: '👁️', label: 'View Details' },
                    ...(appt.status === 'Upcoming' ? [{ icon: '📅', label: 'Reschedule' }] : []),
                  ]}
                  dangerActions={
                    appt.status === 'Upcoming' ? [{ icon: '❌', label: 'Cancel Appointment' }] : []
                  }
                  onAction={() => {}}
                />
              </td>
            </tr>
          ))}
          {filteredAppointments.length === 0 && (
            <tr>
              <td colSpan={APPOINTMENT_COLUMNS.length + 1} style={{ textAlign: 'center', padding: '3rem', color: 'rgba(240,239,237,0.4)' }}>
                No appointments found.
              </td>
            </tr>
          )}
        </DataTable>
      ) : (
        <DataTable
          columns={DISCIPLINARY_COLUMNS}
          minWidth={1000}
          leadingHeader={
            <SelectAllCheckbox
              checked={allVisibleSelected}
              onChange={(e) => handleSelectAll(e.target.checked)}
              label="Select all records"
            />
          }
        >
          {filteredDisciplinary.map((record) => (
            <tr
              key={record.id}
              className={`${listStyles.clickableRow}${selected.includes(record.id) ? ` ${listStyles.rowSelected}` : ''}`}
            >
              <RowSelectCell
                selected={selected.includes(record.id)}
                onToggle={() => handleSelectOne(record.id)}
                label={`Select record for ${record.incident}`}
              />

              {/* Date */}
              <td>
                <span style={{ fontSize: '0.85rem', color: 'rgba(240,239,237,0.85)' }}>{record.date}</span>
              </td>

              {/* Incident */}
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: record.iconBg, color: record.iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>
                    {record.icon}
                  </div>
                  <span style={{ fontWeight: 500, fontSize: '0.85rem', color: '#f0efed' }}>{record.incident}</span>
                </div>
              </td>

              {/* Reported By */}
              <td>
                <span style={{ fontSize: '0.85rem', color: 'rgba(240,239,237,0.85)' }}>{record.reportedBy}</span>
              </td>

              {/* Action Taken */}
              <td>
                <span style={{ fontSize: '0.85rem', color: 'rgba(240,239,237,0.6)' }}>{record.action}</span>
              </td>

              {/* Status */}
              <td>
                <ChalkBadge label={record.status} accent={getStatusColor(record.status)} />
              </td>

              {/* Actions */}
              <td onClick={(e) => e.stopPropagation()}>
                <RowActionsMenu
                  label={`Actions for record ${record.incident}`}
                  actions={[
                    { icon: '👁️', label: 'View Incident Report' },
                  ]}
                  dangerActions={[]}
                  onAction={() => {}}
                />
              </td>
            </tr>
          ))}
          {filteredDisciplinary.length === 0 && (
            <tr>
              <td colSpan={DISCIPLINARY_COLUMNS.length + 1} style={{ textAlign: 'center', padding: '3rem', color: 'rgba(240,239,237,0.4)' }}>
                No disciplinary records found. Great job!
              </td>
            </tr>
          )}
        </DataTable>
      )}
    </div>
  );
}

