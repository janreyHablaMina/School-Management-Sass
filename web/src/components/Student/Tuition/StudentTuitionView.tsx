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
import { FEE_BREAKDOWN, PAYMENT_SCHEDULE, TUITION_STATS } from '@/lib/mock/studentProfile.mock';
import { CreditCard, Download, Printer } from 'lucide-react';
import uiStyles from '@/components/ui/ui.module.css';

const BREAKDOWN_COLUMNS: DataTableColumn[] = [
  { id: 'description', label: 'Fee Description' },
  { id: 'type', label: 'Type' },
  { id: 'amount', label: 'Amount' },
];

const SCHEDULE_COLUMNS: DataTableColumn[] = [
  { id: 'term', label: 'Term / Milestone' },
  { id: 'dueDate', label: 'Due Date' },
  { id: 'amount', label: 'Amount Due' },
  { id: 'status', label: 'Status' },
  { id: 'datePaid', label: 'Date Paid' },
  { id: 'actions', label: 'Actions' },
];

const TABS = ['Payment Schedule', 'Fee Breakdown'];

export function StudentTuitionView() {
  const [activeTab, setActiveTab] = useState('Payment Schedule');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string[]>([]);

  // Filtering for Fee Breakdown
  const filteredBreakdown = FEE_BREAKDOWN.filter(fee => {
    return fee.description.toLowerCase().includes(search.toLowerCase()) ||
      fee.type.toLowerCase().includes(search.toLowerCase());
  });

  // Filtering for Payment Schedule
  const filteredSchedule = PAYMENT_SCHEDULE.filter(sched => {
    return sched.term.toLowerCase().includes(search.toLowerCase()) ||
      sched.status.toLowerCase().includes(search.toLowerCase());
  });

  const currentData = activeTab === 'Payment Schedule' ? filteredSchedule : filteredBreakdown;
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
    { label: 'Outstanding Balance', value: TUITION_STATS.outstandingBalance, subtitle: 'Total remaining to pay', icon: '💰', accent: '#f5c842' },
    { label: 'Next Due Date', value: TUITION_STATS.nextDeadline, subtitle: `Amount: ${TUITION_STATS.nextAmountDue}`, icon: '📅', accent: '#ff7e93' },
    { label: 'Total Paid', value: TUITION_STATS.totalPaid, subtitle: 'Total remitted this year', icon: '✅', accent: '#5cc789' },
    { label: 'Total Assessment', value: TUITION_STATS.totalAssessment, subtitle: 'For current school year', icon: '📄', accent: '#84a9ff' },
  ];

  const getStatusColor = (status: string) => {
    if (status === 'Paid') return '#5cc789';
    if (status === 'Pending' || status === 'Overdue') return '#ff7e93';
    return '#84a9ff'; // Upcoming
  };

  return (
    <div className={listStyles.page}>
      <PageHeader
        title="Tuition & Fees"
        subtitle="View your current financial assessment, payment schedule, and outstanding balances."
      >
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className={`${uiStyles.btnBase} ${uiStyles.btnSm} ${uiStyles.btnSecondary}`}>
            <Printer size={14} /> Print Statement
          </button>
          <button className={`${uiStyles.btnBase} ${uiStyles.btnSm} ${uiStyles.btnPrimary}`}>
            <CreditCard size={14} /> Pay Now
          </button>
        </div>
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
        searchPlaceholder={activeTab === 'Payment Schedule' ? "Search terms or statuses..." : "Search fees..."}
        searchAriaLabel="Search finances"
        selects={[]}
        hasActiveFilters={search !== ''}
        onReset={() => setSearch('')}
      />

      <ResourceBulkBar
        selectedCount={selected.length}
        itemLabel={activeTab === 'Payment Schedule' ? "schedule item" : "fee item"}
        onClearSelection={() => setSelected([])}
        actions={[
          { label: 'Download Summary', onClick: () => {} },
        ]}
      />

      {activeTab === 'Payment Schedule' ? (
        <DataTable
          columns={SCHEDULE_COLUMNS}
          minWidth={900}
          leadingHeader={
            <SelectAllCheckbox
              checked={allVisibleSelected}
              onChange={(e) => handleSelectAll(e.target.checked)}
              label="Select all"
            />
          }
        >
          {filteredSchedule.map((sched) => (
            <tr
              key={sched.id}
              className={`${listStyles.clickableRow}${selected.includes(sched.id) ? ` ${listStyles.rowSelected}` : ''}`}
            >
              <RowSelectCell
                selected={selected.includes(sched.id)}
                onToggle={() => handleSelectOne(sched.id)}
                label={`Select term ${sched.term}`}
              />

              {/* Term */}
              <td>
                <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#f0efed' }}>{sched.term}</span>
              </td>

              {/* Due Date */}
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.85rem', color: 'rgba(240,239,237,0.85)' }}>{sched.dueDate}</span>
                </div>
              </td>

              {/* Amount */}
              <td>
                <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#f5c842' }}>{sched.amount}</span>
              </td>

              {/* Status */}
              <td>
                <ChalkBadge label={sched.status} accent={getStatusColor(sched.status)} />
              </td>

              {/* Date Paid */}
              <td>
                <span style={{ fontSize: '0.85rem', color: 'rgba(240,239,237,0.6)' }}>{sched.datePaid}</span>
              </td>

              {/* Actions */}
              <td onClick={(e) => e.stopPropagation()}>
                <RowActionsMenu
                  label={`Actions for ${sched.term}`}
                  actions={[
                    ...(sched.status !== 'Paid' ? [{ icon: '💳', label: 'Pay Installment' }] : [{ icon: '🧾', label: 'View Receipt' }]),
                  ]}
                  dangerActions={[]}
                  onAction={() => {}}
                />
              </td>
            </tr>
          ))}
          {filteredSchedule.length === 0 && (
            <tr>
              <td colSpan={SCHEDULE_COLUMNS.length + 1} style={{ textAlign: 'center', padding: '3rem', color: 'rgba(240,239,237,0.4)' }}>
                No payment schedules found.
              </td>
            </tr>
          )}
        </DataTable>
      ) : (
        <DataTable
          columns={BREAKDOWN_COLUMNS}
          minWidth={800}
          leadingHeader={
            <SelectAllCheckbox
              checked={allVisibleSelected}
              onChange={(e) => handleSelectAll(e.target.checked)}
              label="Select all"
            />
          }
        >
          {filteredBreakdown.map((fee) => (
            <tr
              key={fee.id}
              className={`${listStyles.clickableRow}${selected.includes(fee.id) ? ` ${listStyles.rowSelected}` : ''}`}
            >
              <RowSelectCell
                selected={selected.includes(fee.id)}
                onToggle={() => handleSelectOne(fee.id)}
                label={`Select ${fee.description}`}
              />

              {/* Description */}
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: fee.iconBg, color: fee.iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>
                    {fee.icon}
                  </div>
                  <span style={{ fontWeight: 500, fontSize: '0.9rem', color: '#f0efed' }}>{fee.description}</span>
                </div>
              </td>

              {/* Type */}
              <td>
                <span style={{ fontSize: '0.85rem', color: 'rgba(240,239,237,0.6)' }}>{fee.type}</span>
              </td>

              {/* Amount */}
              <td>
                <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#f0efed' }}>{fee.amount}</span>
              </td>
            </tr>
          ))}
          {filteredBreakdown.length === 0 && (
            <tr>
              <td colSpan={BREAKDOWN_COLUMNS.length + 1} style={{ textAlign: 'center', padding: '3rem', color: 'rgba(240,239,237,0.4)' }}>
                No fees found.
              </td>
            </tr>
          )}
          {filteredBreakdown.length > 0 && (
            <tr style={{ borderTop: '2px solid rgba(240,239,237,0.1)' }}>
              <td colSpan={2}></td>
              <td>
                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', padding: '1rem 0' }}>
                  <span style={{ fontSize: '0.85rem', color: 'rgba(240,239,237,0.6)', marginRight: '1rem' }}>Total Assessment</span>
                  <span style={{ fontWeight: 700, fontSize: '1.1rem', color: '#f5c842' }}>{TUITION_STATS.totalAssessment}</span>
                </div>
              </td>
            </tr>
          )}
        </DataTable>
      )}
    </div>
  );
}
