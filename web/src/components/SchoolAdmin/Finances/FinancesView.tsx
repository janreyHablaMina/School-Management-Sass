'use client';
import React from 'react';
import styles from './finances.module.css';
import { DashboardHeader } from '@/components/shared/DashboardHeader';
import { DashboardMetrics } from '@/components/shared/DashboardMetrics';

export const FinancesView: React.FC = () => {
  const mockPayments = [
    { id: '1', student: 'Mia Thermopolis', type: 'Tuition Fee (Q1)', amount: '$1,200.00', status: 'Paid', date: 'Oct 1, 2026' },
    { id: '2', student: 'Harry Potter', type: 'Miscellaneous Fee', amount: '$150.00', status: 'Pending', date: 'Oct 5, 2026' },
    { id: '3', student: 'Percy Jackson', type: 'Field Trip', amount: '$45.00', status: 'Overdue', date: 'Sep 20, 2026' },
    { id: '4', student: 'Katniss Everdeen', type: 'Tuition Fee (Q1)', amount: '$1,200.00', status: 'Paid', date: 'Oct 2, 2026' },
    { id: '5', student: 'Peter Parker', type: 'Uniform Fee', amount: '$85.00', status: 'Pending', date: 'Oct 10, 2026' },
  ];

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Paid': return styles.statusPaid;
      case 'Pending': return styles.statusPending;
      case 'Overdue': return styles.statusOverdue;
      default: return '';
    }
  };

  return (
    <div className={styles.container}>
      <DashboardHeader
        name="Sophia"
        description="Manage school finances, tuition payments, and miscellaneous fees."
      />

      <DashboardMetrics
        columns={4}
        metrics={[
          { label: 'Total Revenue', value: '$45,200', growth: '+12% this month', growthClass: 'green' },
          { label: 'Pending Payments', value: '$8,450', growth: '32 students', growthClass: 'yellow' },
          { label: 'Overdue Fees', value: '$1,200', growth: 'Requires attention', growthClass: 'yellow' },
          { label: 'Miscellaneous Collected', value: '$4,150', growth: 'View details →', growthClass: 'green' },
        ]}
      />

      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <h3 className={styles.tableTitle}>Recent Transactions</h3>
        </div>
        
        <div className={styles.tableWrapper}>
          <table className={styles.financesTable}>
            <thead>
              <tr>
                <th>Student</th>
                <th>Fee Type</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {mockPayments.map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.student}</td>
                  <td>{payment.type}</td>
                  <td className={styles.amount}>{payment.amount}</td>
                  <td>{payment.date}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${getStatusClass(payment.status)}`}>
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
