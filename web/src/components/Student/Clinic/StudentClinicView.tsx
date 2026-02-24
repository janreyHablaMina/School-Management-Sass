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
import { CLINIC_VISITS, CLINIC_STATS, MEDICAL_REQUIREMENTS } from '@/lib/mock/studentProfile.mock';
import { HeartPulse, Download, FileText } from 'lucide-react';
import uiStyles from '@/components/ui/ui.module.css';

const VISIT_COLUMNS: DataTableColumn[] = [
  { id: 'date', label: 'Date & Time' },
  { id: 'type', label: 'Visit Type' },
  { id: 'reason', label: 'Reason / Diagnosis' },
  { id: 'treatment', label: 'Treatment' },
  { id: 'attendedBy', label: 'Attended By' },
  { id: 'status', label: 'Status' },
  { id: 'actions', label: 'Actions' },
];

const REQ_COLUMNS: DataTableColumn[] = [
  { id: 'requirement', label: 'Requirement' },
  { id: 'dateSubmitted', label: 'Date Submitted' },
  { id: 'status', label: 'Status' },
  { id: 'actions', label: 'Actions' },
];

const TABS = ['Visit History', 'Medical Requirements'];

export function StudentClinicView() {
  const [activeTab, setActiveTab] = useState('Visit History');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string[]>([]);

  // Filtering for Visit History
  const filteredVisits = CLINIC_VISITS.filter(visit => {
    return visit.type.toLowerCase().includes(search.toLowerCase()) ||
      visit.reason.toLowerCase().includes(search.toLowerCase()) ||
      visit.diagnosis.toLowerCase().includes(search.toLowerCase()) ||
      visit.attendedBy.toLowerCase().includes(search.toLowerCase());
  });

  // Filtering for Requirements
  const filteredReqs = MEDICAL_REQUIREMENTS.filter(req => {
    return req.requirement.toLowerCase().includes(search.toLowerCase()) ||
      req.status.toLowerCase().includes(search.toLowerCase());
  });

  const currentData = activeTab === 'Visit History' ? filteredVisits : filteredReqs;
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
    { label: 'Health Status', value: CLINIC_STATS.healthStatus, subtitle: 'Medical clearance', icon: '❤️', accent: '#5cc789' },
    { label: 'Last Visit', value: CLINIC_STATS.lastVisit, subtitle: 'Most recent checkup', icon: '📅', accent: '#84a9ff' },
    { label: 'Blood Type', value: CLINIC_STATS.bloodType, subtitle: 'On record', icon: '🩸', accent: '#ff7e93' },
    { label: 'BMI', value: CLINIC_STATS.bmi, subtitle: 'Latest measurement', icon: '⚖️', accent: '#b68eff' },
  ];

  const getStatusColor = (status: string) => {
    if (status === 'Cleared' || status === 'Resolved' || status === 'Compliant') return '#5cc789';
    if (status === 'Missing') return '#ff7e93';
    return '#f5c842'; // Pending
  };

  return (
    <div className={listStyles.page}>
      <PageHeader
        title="Clinic & Health"
        subtitle="Access your health records, view clinic visit history, and manage medical requirements."
      >
        <button className={`${uiStyles.btnBase} ${uiStyles.btnSm} ${uiStyles.btnSecondary}`}>
          <Download size={14} /> Download Medical Record
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
        searchPlaceholder={activeTab === 'Visit History' ? "Search visits, diagnoses, or staff..." : "Search requirements..."}
        searchAriaLabel="Search health records"
        selects={[]}
        hasActiveFilters={search !== ''}
        onReset={() => setSearch('')}
      />

      <ResourceBulkBar
        selectedCount={selected.length}
        itemLabel={activeTab === 'Visit History' ? "visit record" : "requirement"}
        onClearSelection={() => setSelected([])}
        actions={[
          { label: 'Export Selected', onClick: () => {} },
        ]}
      />

      {activeTab === 'Visit History' ? (
        <DataTable
          columns={VISIT_COLUMNS}
          minWidth={1000}
          leadingHeader={
            <SelectAllCheckbox
              checked={allVisibleSelected}
              onChange={(e) => handleSelectAll(e.target.checked)}
              label="Select all visits"
            />
          }
        >
          {filteredVisits.map((visit) => (
            <tr
              key={visit.id}
              className={`${listStyles.clickableRow}${selected.includes(visit.id) ? ` ${listStyles.rowSelected}` : ''}`}
            >
              <RowSelectCell
                selected={selected.includes(visit.id)}
                onToggle={() => handleSelectOne(visit.id)}
                label={`Select visit on ${visit.date}`}
              />

              {/* Date & Time */}
              <td>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#f0efed' }}>{visit.date.split(' - ')[0]}</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(240,239,237,0.5)' }}>{visit.date.split(' - ')[1]}</div>
              </td>

              {/* Type */}
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: visit.iconBg, color: visit.iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>
                    {visit.icon}
                  </div>
                  <span style={{ fontSize: '0.85rem', color: 'rgba(240,239,237,0.85)' }}>{visit.type}</span>
                </div>
              </td>

              {/* Reason / Diagnosis */}
              <td>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                  <span style={{ fontSize: '0.85rem', color: '#f0efed' }}>{visit.reason}</span>
                  <span style={{ fontSize: '0.75rem', color: 'rgba(240,239,237,0.5)' }}>{visit.diagnosis}</span>
                </div>
              </td>

              {/* Treatment */}
              <td>
                <span style={{ fontSize: '0.85rem', color: 'rgba(240,239,237,0.85)' }}>{visit.treatment}</span>
              </td>

              {/* Attended By */}
              <td>
                <span style={{ fontSize: '0.85rem', color: 'rgba(240,239,237,0.85)' }}>{visit.attendedBy}</span>
              </td>

              {/* Status */}
              <td>
                <ChalkBadge label={visit.status} accent={getStatusColor(visit.status)} />
              </td>

              {/* Actions */}
              <td onClick={(e) => e.stopPropagation()}>
                <RowActionsMenu
                  label={`Actions for visit on ${visit.date}`}
                  actions={[
                    { icon: '👁️', label: 'View Details' },
                    { icon: '🖨️', label: 'Print Note' },
                  ]}
                  dangerActions={[]}
                  onAction={() => {}}
                />
              </td>
            </tr>
          ))}
          {filteredVisits.length === 0 && (
            <tr>
              <td colSpan={VISIT_COLUMNS.length + 1} style={{ textAlign: 'center', padding: '3rem', color: 'rgba(240,239,237,0.4)' }}>
                No clinic visits found.
              </td>
            </tr>
          )}
        </DataTable>
      ) : (
        <DataTable
          columns={REQ_COLUMNS}
          minWidth={800}
          leadingHeader={
            <SelectAllCheckbox
              checked={allVisibleSelected}
              onChange={(e) => handleSelectAll(e.target.checked)}
              label="Select all requirements"
            />
          }
        >
          {filteredReqs.map((req) => (
            <tr
              key={req.id}
              className={`${listStyles.clickableRow}${selected.includes(req.id) ? ` ${listStyles.rowSelected}` : ''}`}
            >
              <RowSelectCell
                selected={selected.includes(req.id)}
                onToggle={() => handleSelectOne(req.id)}
                label={`Select ${req.requirement}`}
              />

              {/* Requirement */}
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '1.2rem' }}>{req.icon}</span>
                  <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#f0efed' }}>{req.requirement}</span>
                </div>
              </td>

              {/* Date Submitted */}
              <td>
                <span style={{ fontSize: '0.85rem', color: 'rgba(240,239,237,0.6)' }}>{req.dateSubmitted}</span>
              </td>

              {/* Status */}
              <td>
                <ChalkBadge label={req.status} accent={getStatusColor(req.status)} />
              </td>

              {/* Actions */}
              <td onClick={(e) => e.stopPropagation()}>
                <RowActionsMenu
                  label={`Actions for ${req.requirement}`}
                  actions={[
                    ...(req.status === 'Compliant' ? [{ icon: '👁️', label: 'View Document' }] : [{ icon: '📤', label: 'Upload Document' }])
                  ]}
                  dangerActions={[]}
                  onAction={() => {}}
                />
              </td>
            </tr>
          ))}
          {filteredReqs.length === 0 && (
            <tr>
              <td colSpan={REQ_COLUMNS.length + 1} style={{ textAlign: 'center', padding: '3rem', color: 'rgba(240,239,237,0.4)' }}>
                No medical requirements found.
              </td>
            </tr>
          )}
        </DataTable>
      )}
    </div>
  );
}
