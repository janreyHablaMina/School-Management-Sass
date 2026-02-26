import React, { useState } from 'react';
import { SchoolAdminDirectoryPage } from '../shared/SchoolAdminDirectoryPage';
import { ChalkBadge, DataTable, type DataTableColumn, RowSelectCell, SelectAllCheckbox, RowActionsMenu, ResourceBulkBar, listStyles } from '@/components/ui/shared';

const COLUMNS: DataTableColumn[] = [
  { id: 'student', label: 'Student' },
  { id: 'type', label: 'Fee Type' },
  { id: 'amount', label: 'Amount' },
  { id: 'date', label: 'Date' },
  { id: 'status', label: 'Status' },
  { id: 'actions', label: 'Actions' },
];

function getInitials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
}

export const FinancesView: React.FC = () => {
  const [selectedPayments, setSelectedPayments] = useState<string[]>([]);

  const mockPayments = [
    { id: '1', student: 'Mia Thermopolis', studentId: 'S2025-0001', type: 'Tuition Fee (Q1)', amount: '$1,200.00', status: 'Paid', date: 'Oct 1, 2026', avatarColor: '#84a9ff' },
    { id: '2', student: 'Harry Potter', studentId: 'S2025-0002', type: 'Miscellaneous Fee', amount: '$150.00', status: 'Pending', date: 'Oct 5, 2026', avatarColor: '#ff7e93' },
    { id: '3', student: 'Percy Jackson', studentId: 'S2025-0003', type: 'Field Trip', amount: '$45.00', status: 'Overdue', date: 'Sep 20, 2026', avatarColor: '#f5c842' },
    { id: '4', student: 'Katniss Everdeen', studentId: 'S2025-0004', type: 'Tuition Fee (Q1)', amount: '$1,200.00', status: 'Paid', date: 'Oct 2, 2026', avatarColor: '#b68eff' },
    { id: '5', student: 'Peter Parker', studentId: 'S2025-0005', type: 'Uniform Fee', amount: '$85.00', status: 'Pending', date: 'Oct 10, 2026', avatarColor: '#5cc789' },
  ];

  const getStatusAccent = (status: string) => {
    switch (status) {
      case 'Paid': return '#5cc789';
      case 'Pending': return '#f5c842';
      case 'Overdue': return '#ff7e93';
      default: return '#84a9ff';
    }
  };

  const allVisibleSelected = selectedPayments.length === mockPayments.length && mockPayments.length > 0;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedPayments(mockPayments.map((p) => p.id));
    } else {
      setSelectedPayments([]);
    }
  };

  const handleSelectPayment = (id: string) => {
    setSelectedPayments((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  return (
    <SchoolAdminDirectoryPage
      title="Finances"
      subtitle="Manage school finances, tuition payments, and miscellaneous fees."
      metrics={[
        { title: 'Total Revenue', value: '$45,200', subtitle: '+12% this month', iconName: '💰', iconColor: '#5cc789', iconBg: 'rgba(92, 199, 137, 0.1)' },
        { title: 'Pending Payments', value: '$8,450', subtitle: '32 students', iconName: '⏳', iconColor: '#f5c842', iconBg: 'rgba(245, 200, 66, 0.1)' },
        { title: 'Overdue Fees', value: '$1,200', subtitle: 'Requires attention', iconName: '⚠️', iconColor: '#ff7e93', iconBg: 'rgba(255, 126, 147, 0.1)' },
        { title: 'Misc Collected', value: '$4,150', subtitle: 'View details', iconName: '📎', iconColor: '#84a9ff', iconBg: 'rgba(132, 169, 255, 0.1)' },
      ]}
      metricColumns={4}
      pagination={{
        rangeStart: 1,
        rangeEnd: 5,
        total: 5,
        page: 1,
        totalPages: 1,
        itemLabel: 'transactions',
        onPageChange: () => {},
      }}
      actionButton={{ label: 'Export Report', onClick: () => {} }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <ResourceBulkBar
          selectedCount={selectedPayments.length}
          itemLabel="payment"
          onClearSelection={() => setSelectedPayments([])}
          actions={[
            { label: 'Send Reminder', onClick: () => {} },
            { label: 'Mark as Paid', onClick: () => {} },
          ]}
        />

        <DataTable
          columns={COLUMNS}
          minWidth={900}
          leadingHeader={
            <SelectAllCheckbox
              checked={allVisibleSelected}
              onChange={(e) => handleSelectAll(e.target.checked)}
              label="Select all payments"
            />
          }
        >
          {mockPayments.map((payment) => (
            <tr
              key={payment.id}
              className={`${listStyles.clickableRow}${selectedPayments.includes(payment.id) ? ` ${listStyles.rowSelected}` : ''}`}
            >
              <RowSelectCell
                selected={selectedPayments.includes(payment.id)}
                onToggle={() => handleSelectPayment(payment.id)}
                label={`Select payment for ${payment.student}`}
              />
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: payment.avatarColor,
                      color: 'rgba(0,0,0,0.6)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 600,
                      fontSize: '0.8rem',
                    }}
                  >
                    {getInitials(payment.student)}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontWeight: 500 }}>{payment.student}</span>
                    <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>ID: {payment.studentId}</span>
                  </div>
                </div>
              </td>
              <td>{payment.type}</td>
              <td style={{ fontWeight: 500 }}>{payment.amount}</td>
              <td>{payment.date}</td>
              <td>
                <ChalkBadge label={payment.status} accent={getStatusAccent(payment.status)} />
              </td>
              <td onClick={(e) => e.stopPropagation()}>
                <RowActionsMenu
                  label={`Actions for ${payment.student}'s payment`}
                  actions={[
                    { icon: '📄', label: 'View Invoice' },
                    { icon: '📧', label: 'Send Reminder' },
                  ]}
                  onAction={() => {}}
                />
              </td>
            </tr>
          ))}
        </DataTable>
      </div>
    </SchoolAdminDirectoryPage>
  );
};
