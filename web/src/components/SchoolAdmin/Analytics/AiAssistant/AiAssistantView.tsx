'use client';

import React, { useMemo, useState, useCallback } from 'react';
import {
  listStyles,
  PageHeader,
  SummaryMetrics,
  DataTable,
  type DataTableColumn,
  Toast,
  SelectAllCheckbox,
  RowSelectCell,
  ResourceBulkBar,
} from '@/components/ui/shared';
import { adminTeacherCreditsMock, type TeacherCredit } from '@/lib/mock/adminAiAssistant.mock';

export function AiAssistantView() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const metrics = useMemo(() => {
    const totalTeachers = adminTeacherCreditsMock.length;
    const totalAllocated = adminTeacherCreditsMock.reduce((sum, t) => sum + t.totalCredits, 0);
    const totalUsed = adminTeacherCreditsMock.reduce((sum, t) => sum + t.creditsUsed, 0);
    const totalLeft = totalAllocated - totalUsed;
    
    return [
      {
        label: 'Total Teachers',
        value: totalTeachers.toString(),
        subtitle: 'With AI access',
        icon: '👨‍🏫',
        accent: '#84a9ff',
      },
      {
        label: 'Allocated Credits',
        value: totalAllocated.toLocaleString(),
        subtitle: 'Across all teachers',
        icon: '📊',
        accent: '#b68eff',
      },
      {
        label: 'Credits Used',
        value: totalUsed.toLocaleString(),
        subtitle: 'This billing cycle',
        icon: '📈',
        accent: '#ffab6b',
      },
      {
        label: 'Credits Left',
        value: totalLeft.toLocaleString(),
        subtitle: 'Available to use',
        icon: '✅',
        accent: '#5cc789',
      }
    ];
  }, []);

  const columns: DataTableColumn[] = [
    { id: 'teacher', label: 'Teacher', sortable: true },
    { id: 'department', label: 'Department', sortable: true },
    { id: 'creditsUsed', label: 'Credits Used', sortable: true },
    { id: 'creditsLeft', label: 'Credits Left', sortable: true },
    { id: 'totalCredits', label: 'Total Credits', sortable: true },
    { id: 'usageBar', label: 'Usage' },
  ];

  const handleRequestCredits = () => {
    // Mock sending request to super admin
    setToastMessage('Request sent to Super Admin to purchase more credits.');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleAll = useCallback(() => {
    if (selectedIds.size === adminTeacherCreditsMock.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(adminTeacherCreditsMock.map((t) => t.id)));
    }
  }, [selectedIds.size]);

  const handleToggleOne = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleBulkAllocate = () => {
    setToastMessage(`Allocated additional credits to ${selectedIds.size} teacher(s).`);
    setSelectedIds(new Set());
    setTimeout(() => setToastMessage(null), 3000);
  };

  const isAllSelected = 
    adminTeacherCreditsMock.length > 0 && selectedIds.size === adminTeacherCreditsMock.length;

  return (
    <div className={listStyles.page}>
      <PageHeader
        title="PieYah Assistant (AI Credits)"
        subtitle="Manage and monitor AI credit usage across all teachers."
      >
        <button
          type="button"
          className={listStyles.primaryBtn}
          onClick={handleRequestCredits}
        >
          Buy More Credits
        </button>
      </PageHeader>
      
      {toastMessage && (
        <Toast
          message={toastMessage}
          type="success"
          onClose={() => setToastMessage(null)}
        />
      )}

      <SummaryMetrics metrics={metrics} columns={4} />

      <ResourceBulkBar
        selectedCount={selectedIds.size}
        itemLabel="teacher"
        onClearSelection={() => setSelectedIds(new Set())}
        actions={[
          {
            label: 'Give Credits',
            onClick: handleBulkAllocate,
          }
        ]}
      />

      <div className={listStyles.tableWrap}>
        <DataTable 
          columns={columns}
          leadingHeader={
            <SelectAllCheckbox
              checked={isAllSelected}
              onChange={handleToggleAll}
              label="Select all"
            />
          }
        >
          {adminTeacherCreditsMock.map((row) => {
            const percent = Math.min(100, (row.creditsUsed / row.totalCredits) * 100);
            const isHigh = percent > 85;
            const color = isHigh ? 'var(--danger-color)' : 'var(--primary-color)';
            const isSelected = selectedIds.has(row.id);

            return (
              <tr key={row.id} className={isSelected ? listStyles.selectedRow : ''}>
                <RowSelectCell
                  selected={isSelected}
                  onToggle={() => handleToggleOne(row.id)}
                  label={`Select ${row.name}`}
                />
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img 
                      src={row.avatar} 
                      alt={row.name}
                      style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontWeight: 500 }}>{row.name}</span>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{row.email}</span>
                    </div>
                  </div>
                </td>
                <td>{row.department}</td>
                <td>
                  <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>
                    {row.creditsUsed.toLocaleString()}
                  </span>
                </td>
                <td>
                  <span style={{ fontWeight: 500, color: 'var(--success-color)' }}>
                    {row.creditsLeft.toLocaleString()}
                  </span>
                </td>
                <td>{row.totalCredits.toLocaleString()}</td>
                <td>
                  <div style={{ width: 100, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      <span>{Math.round(percent)}%</span>
                    </div>
                    <div style={{ height: 6, background: 'var(--bg-tertiary)', borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: percent + '%', background: color }} />
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </DataTable>
      </div>
    </div>
  );
}
