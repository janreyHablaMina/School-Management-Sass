'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './admin.module.css';

interface SchoolTenant {
  id: string;
  name: string;
  domain: string;
  students: number;
  tier: 'Basic' | 'Pro' | 'Enterprise';
  status: 'Active' | 'Suspended';
}

const mockSchools: SchoolTenant[] = [
  { id: '1', name: 'Oakwood Academy', domain: 'oakwood.schoolsaas.com', students: 1200, tier: 'Pro', status: 'Active' },
  { id: '2', name: 'Beacon Hill Prep', domain: 'beaconhill.schoolsaas.com', students: 450, tier: 'Basic', status: 'Active' },
  { id: '3', name: 'Horizon Heights', domain: 'horizon.schoolsaas.com', students: 3100, tier: 'Enterprise', status: 'Active' },
  { id: '4', name: 'Summit Science Charter', domain: 'summit.schoolsaas.com', students: 820, tier: 'Pro', status: 'Suspended' },
  { id: '5', name: 'Pinecrest Montessori', domain: 'pinecrest.schoolsaas.com', students: 320, tier: 'Basic', status: 'Active' },
];

export default function AdminDashboard() {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/login');
  };

  const handleCreateSchool = () => {
    alert('Create School Tenant form coming soon.');
  };

  const handleSystemUpdate = () => {
    alert('System update broadcast trigger coming soon.');
  };

  return (
    <main className={styles.page}>
      {/* ---------- Header Bar ---------- */}
      <header className={styles.headerBar}>
        <div className={styles.headerTitle}>
          <span>🎓</span> SchoolSaaS Owner Console
        </div>
        <div className={styles.headerActions}>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            Log Out
          </button>
        </div>
      </header>

      {/* ---------- Main Content ---------- */}
      <div className={styles.mainContainer}>
        
        {/* ---------- Metrics Grid ---------- */}
        <section className={styles.metricsGrid}>
          <div className={styles.metricCard}>
            <div className={styles.metricLabel}>Total Schools / Tenants</div>
            <div className={`${styles.metricValue} ${styles.metricValueYellow}`}>24</div>
            <div className={styles.metricBadge}>+3 this week</div>
          </div>
          
          <div className={styles.metricCard}>
            <div className={styles.metricLabel}>Total Active Students</div>
            <div className={styles.metricValue}>12,480</div>
          </div>
          
          <div className={styles.metricCard}>
            <div className={styles.metricLabel}>Monthly Recurring Revenue</div>
            <div className={`${styles.metricValue} ${styles.metricValueGreen}`}>$18,650</div>
          </div>
          
          <div className={styles.metricCard}>
            <div className={styles.metricLabel}>System Status</div>
            <div className={styles.metricValue}>99.98%</div>
            <div className={styles.metricBadge}>Healthy</div>
          </div>
        </section>

        {/* ---------- Layout Split ---------- */}
        <div className={styles.layoutSplit}>
          
          {/* Left Panel: School Ledger */}
          <section className={styles.boardPanel}>
            <h2 className={styles.panelTitle}>📂 Active School Tenants Ledger</h2>
            
            <div className={styles.tableContainer}>
              <table className={styles.schoolTable}>
                <thead>
                  <tr>
                    <th>School / Tenant Name</th>
                    <th>Subdomain</th>
                    <th>Students</th>
                    <th>Subscription Tier</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockSchools.map((school) => (
                    <tr key={school.id}>
                      <td>
                        <span className={styles.schoolName}>{school.name}</span>
                      </td>
                      <td>{school.domain}</td>
                      <td>{school.students.toLocaleString()}</td>
                      <td>
                        <span className={`${styles.tierBadge} ${
                          school.tier === 'Enterprise' ? styles.tierEnterprise :
                          school.tier === 'Pro' ? styles.tierPro : styles.tierBasic
                        }`}>
                          {school.tier}
                        </span>
                      </td>
                      <td>
                        <span className={styles.statusIndicator}>
                          <span className={`${styles.statusDot} ${
                            school.status === 'Active' ? styles.statusActive : styles.statusSuspended
                          }`} />
                          {school.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Right Panel: Sticky Notes Panel */}
          <div className={styles.stickyPanel}>
            {/* Sticky Note 1: Create School */}
            <div className={styles.stickyNote}>
              <h3 className={styles.stickyTitle}>New Tenant Registration</h3>
              <p className={styles.stickyBody}>
                Provision a new school workspace instantly. Onboarding generates their custom subdomain, database schema, and admin credentials automatically.
              </p>
              <button onClick={handleCreateSchool} className={styles.stickyActionBtn}>
                + Onboard New School
              </button>
            </div>

            {/* Sticky Note 2: System Update */}
            <div className={styles.stickyNote}>
              <h3 className={styles.stickyTitle}>Platform Status & Updates</h3>
              <p className={styles.stickyBody}>
                Send maintenance notifications or push system updates to all active school workspaces globally. Scheduled update cycles are active.
              </p>
              <button onClick={handleSystemUpdate} className={styles.stickyActionBtn}>
                Broadcast System Update
              </button>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}
