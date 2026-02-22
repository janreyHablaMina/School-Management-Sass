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
import { PAYMENT_HISTORY_LIST, PAYMENT_HISTORY_STATS } from '@/lib/mock/studentProfile.mock';
import { Download, FileText } from 'lucide-react';
import uiStyles from '@/components/ui/ui.module.css';

const COLUMNS: DataTableColumn[] = [
  { id: 'date', label: 'Date & Time' },
  { id: 'description', label: 'Description' },
  { id: 'receiptNo', label: 'Reference / OR No.' },
  { id: 'method', label: 'Payment Method' },
  { id: 'amount', label: 'Amount' },
  { id: 'status', label: 'Status' },
  { id: 'actions', label: 'Actions' },
];

const TABS = ['All Transactions', 'Completed', 'Failed'];

export function StudentPaymentHistoryView() {
  const [activeTab, setActiveTab] = useState('All Transactions');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = PAYMENT_HISTORY_LIST.filter(payment => {
    // Tab match
    const matchTab = activeTab === 'All Transactions' || payment.status === activeTab;
    
    // Search match
    const matchSearch = payment.description.toLowerCase().includes(search.toLowerCase()) ||
      payment.receiptNo.toLowerCase().includes(search.toLowerCase()) ||
      payment.method.toLowerCase().includes(search.toLowerCase());

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
    { label: 'Total Remitted', value: PAYMENT_HISTORY_STATS.totalRemitted, subtitle: 'Total successful payments', icon: '💰', accent: '#5cc789' },
    { label: 'Last Payment Date', value: PAYMENT_HISTORY_STATS.lastPaymentDate, subtitle: 'Most recent activity', icon: '📅', accent: '#84a9ff' },
    { label: 'Last Amount Paid', value: PAYMENT_HISTORY_STATS.lastPaymentAmount, subtitle: 'Cleared successfully', icon: '📈', accent: '#b68eff' },
    { label: 'Official Receipts', value: PAYMENT_HISTORY_STATS.receiptsGenerated.toString(), subtitle: 'Available to download', icon: '🧾', accent: '#f5c842' },
  ];

  const getStatusColor = (status: string) => {
    if (status === 'Completed') return '#5cc789';
    if (status === 'Pending') return '#f5c842';
    if (status === 'Failed') return '#ff7e93';
    return '#84a9ff';
  };

  return (
    <div className={listStyles.page}>
      <PageHeader
        title="Payment History"
        subtitle="View your past transactions, download official receipts, and monitor payment statuses."
      >
        <button className={`${uiStyles.btnBase} ${uiStyles.btnSm} ${uiStyles.btnSecondary}`}>
          <Download size={14} /> Download Statement of Account
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
        searchPlaceholder="Search descriptions, reference numbers, or methods..."
        searchAriaLabel="Search transactions"
        selects={[]}
        hasActiveFilters={search !== ''}
        onReset={() => setSearch('')}
      />

      <ResourceBulkBar
        selectedCount={selected.length}
        itemLabel="transaction"
        onClearSelection={() => setSelected([])}
        actions={[
          { label: 'Download Receipts', onClick: () => {} },
        ]}
      />

      <DataTable
        columns={COLUMNS}
        minWidth={1100}
        leadingHeader={
          <SelectAllCheckbox
            checked={allVisibleSelected}
            onChange={(e) => handleSelectAll(e.target.checked)}
            label="Select all"
          />
        }
      >
        {filtered.map((payment) => (
          <tr
            key={payment.id}
            className={`${listStyles.clickableRow}${selected.includes(payment.id) ? ` ${listStyles.rowSelected}` : ''}`}
          >
            <RowSelectCell
              selected={selected.includes(payment.id)}
              onToggle={() => handleSelectOne(payment.id)}
              label={`Select transaction ${payment.receiptNo}`}
            />

            {/* Date & Time */}
            <td>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#f0efed' }}>{payment.date.split(' - ')[0]}</div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(240,239,237,0.5)' }}>{payment.date.split(' - ')[1]}</div>
            </td>

            {/* Description */}
            <td>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: payment.iconBg, color: payment.iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>
                  {payment.icon}
                </div>
                <span style={{ fontWeight: 500, fontSize: '0.9rem', color: '#f0efed' }}>{payment.description}</span>
              </div>
            </td>

            {/* Reference No */}
            <td>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileText size={14} color="rgba(240,239,237,0.4)" />
                <span style={{ fontSize: '0.85rem', color: 'rgba(240,239,237,0.85)', fontFamily: 'monospace' }}>
                  {payment.receiptNo}
                </span>
              </div>
            </td>

            {/* Method */}
            <td>
              <span style={{ fontSize: '0.85rem', color: 'rgba(240,239,237,0.6)' }}>{payment.method}</span>
            </td>

            {/* Amount */}
            <td>
              <span style={{ fontWeight: 600, fontSize: '0.9rem', color: payment.status === 'Completed' ? '#5cc789' : '#f0efed' }}>
                {payment.amount}
              </span>
            </td>

            {/* Status */}
            <td>
              <ChalkBadge label={payment.status} accent={getStatusColor(payment.status)} />
            </td>

            {/* Actions */}
            <td onClick={(e) => e.stopPropagation()}>
              <RowActionsMenu
                label={`Actions for ${payment.receiptNo}`}
                actions={[
                  { icon: '👁️', label: 'View Details' },
                  ...(payment.status === 'Completed' ? [{ icon: '🧾', label: 'Download Receipt' }] : []),
                  ...(payment.status === 'Failed' ? [{ icon: '💳', label: 'Retry Payment' }] : []),
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
              No transactions found.
            </td>
          </tr>
        )}
      </DataTable>
    </div>
  );
}
