'use client';

import React, { useState } from 'react';
import styles from '@/app/admin/admin.module.css';
import { mockSubscriptions } from './data';
import { ConfirmModal } from '@/components/ui/ConfirmModal';

export const SubscriptionsView = ({ onSelectSchool, onAddSubscription }: { onSelectSchool?: (schoolName: string) => void, onAddSubscription?: () => void }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);
  const [selectedSubscriptions, setSelectedSubscriptions] = useState<string[]>([]);
  
  const [confirmModalData, setConfirmModalData] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({ isOpen: false, title: '', message: '', onConfirm: () => {} });

  // Filtering
  const filteredSubscriptions = mockSubscriptions.filter((sub) => {
    const matchesStatus = selectedStatus === 'all' || sub.status.toLowerCase() === selectedStatus.toLowerCase();
    const matchesPlan = selectedPlan === 'all' || sub.plan.toLowerCase() === selectedPlan.toLowerCase();
    const matchesSearch =
      sub.schoolName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.schoolId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.plan.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesPlan && matchesSearch;
  });

  return (
    <>
      {/* Subscriptions Stats Grid */}
      <section className={styles.schoolsStatsGrid}>
        {[
          { label: 'Total Revenue (All Time)', icon: '💼', value: '₱2,456,780.00', badge: '▲ +12.5% vs last month', badgeClass: styles.trendUp },
          { label: 'Monthly Recurring Revenue (MRR)', icon: '📈', value: '₱325,450.00', badge: '▲ +8.4% vs last month', badgeClass: styles.trendUp },
          { label: 'Active Subscriptions', icon: '✅', value: '156', badge: '▲ +6 this month', badgeClass: styles.trendUp },
          { label: 'Expiring Soon (30 Days)', icon: '⏳', value: '18', badge: 'View expiring', badgeClass: styles.trendFlat, customBadgeStyle: { color: '#f5c842', borderColor: 'rgba(245,200,66,0.3)', background: 'rgba(245,200,66,0.05)', cursor: 'pointer', textDecoration: 'underline' } },
          { label: 'Cancelled Subscriptions', icon: '❌', value: '7', badge: '▼ -2 this month', badgeClass: styles.trendDown, customBadgeStyle: { color: '#ff8a8a', borderColor: 'rgba(255,138,138,0.3)', background: 'rgba(255,138,138,0.05)' } },
        ].map((stat) => (
          <div key={stat.label} className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <span className={styles.metricLabel}>{stat.label}</span>
              <span className={styles.metricIcon} style={{ fontSize: '1.4rem' }}>{stat.icon}</span>
            </div>
            <div className={styles.metricValContainer}>
              <span className={styles.metricVal}>{stat.value}</span>
              <span className={`${styles.trendBadge} ${stat.badgeClass}`} style={stat.customBadgeStyle}>
                {stat.badge}
              </span>
            </div>
          </div>
        ))}
      </section>

      {/* Subscriptions Registry Table */}
      <div className={styles.tableCard} style={{ marginTop: '1.2rem', flex: 1, minHeight: '520px', position: 'relative' }}>
        {/* Toolbar */}
        <div className={styles.schoolsToolbar}>
          <div className={styles.toolbarLeft}>
            <h3 className={styles.tableTitle} style={{ fontSize: '1.45rem' }}>All Subscriptions ({filteredSubscriptions.length})</h3>
          </div>
          <div className={styles.toolbarRight}>
            {selectedSubscriptions.length > 0 ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginRight: '0.5rem' }}>
                <span style={{ color: 'rgba(240, 239, 237, 0.85)', fontSize: '0.95rem' }}>
                  {selectedSubscriptions.length} selected
                </span>
                <button 
                  onClick={() => {
                    setConfirmModalData({
                      isOpen: true,
                      title: 'Delete Selected Subscriptions',
                      message: `Are you sure you want to delete ${selectedSubscriptions.length} selected subscriptions? This action cannot be undone.`,
                      onConfirm: () => {
                        // Implement actual delete logic here
                        setConfirmModalData(prev => ({ ...prev, isOpen: false }));
                        setSelectedSubscriptions([]);
                      }
                    });
                  }}
                  style={{ 
                  background: 'transparent', border: '1px solid rgba(255, 138, 138, 0.4)', 
                  color: '#ff8a8a', padding: '0.5rem 1rem', borderRadius: '4px', 
                  display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem',
                  transition: 'all 0.2s'
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                  Delete Selected
                </button>
              </div>
            ) : (
              <>
                <div className={styles.filterSearchWrapper}>
                  <span className={styles.filterSearchIcon}>🔍</span>
                  <input
                    type="text"
                    placeholder="Search schools..."
                    className={styles.filterSearchInput}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <select className={styles.chartSelect} value={selectedPlan} onChange={(e) => setSelectedPlan(e.target.value)}>
                  <option value="all">All Plans</option>
                  <option value="school plan">School Plan</option>
                  <option value="basic plan">Basic Plan</option>
                  <option value="pro plan">Pro Plan</option>
                </select>
                <select className={styles.chartSelect} value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="expiring soon">Expiring Soon</option>
                  <option value="expired">Expired</option>
                </select>
                
                <button className={styles.chartSelect} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'transparent' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
                  </svg>
                  More Filters
                </button>
                <button className={styles.chartSelect} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'transparent' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                  </svg>
                  Export
                </button>
              </>
            )}

            <button className={styles.toolbarAddBtn} onClick={() => onAddSubscription && onAddSubscription()}>
              <span>+</span> Add Subscription
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className={styles.tableWrapper}>
          <table className={styles.dashboardTable}>
            <thead>
              <tr>
                <th style={{ width: '40px', textAlign: 'center', paddingLeft: '1.5rem' }}>
                  <input 
                    type="checkbox" 
                    checked={selectedSubscriptions.length === filteredSubscriptions.length && filteredSubscriptions.length > 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedSubscriptions(filteredSubscriptions.map(s => s.schoolId));
                      } else {
                        setSelectedSubscriptions([]);
                      }
                    }}
                  />
                </th>
                <th>School</th>
                <th>Plan</th>
                <th>Students</th>
                <th>Renewal Date</th>
                <th>Status</th>
                <th>Amount</th>
                <th style={{ textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubscriptions.map((sub, index) => {
                // Determine Plan badge styles
                const planColorMap: Record<string, string> = {
                  'School Plan': '#84a9ff',
                  'Basic Plan': '#b884ff',
                  'Pro Plan': '#f5c842',
                };
                const planBgMap: Record<string, string> = {
                  'School Plan': 'rgba(132, 169, 255, 0.1)',
                  'Basic Plan': 'rgba(184, 132, 255, 0.1)',
                  'Pro Plan': 'rgba(245, 200, 66, 0.1)',
                };
                const pColor = planColorMap[sub.plan] || '#84a9ff';
                const pBg = planBgMap[sub.plan] || 'rgba(132, 169, 255, 0.1)';

                // Determine Status badge styles
                const statusColorMap: Record<string, string> = {
                  'Active': '#4df58a',
                  'Expiring Soon': '#f5c842',
                  'Expired': '#ff8a8a',
                };
                const statusBgMap: Record<string, string> = {
                  'Active': 'rgba(77, 245, 138, 0.1)',
                  'Expiring Soon': 'rgba(245, 200, 66, 0.1)',
                  'Expired': 'rgba(255, 138, 138, 0.1)',
                };
                const sColor = statusColorMap[sub.status] || '#4df58a';
                const sBg = statusBgMap[sub.status] || 'rgba(77, 245, 138, 0.1)';

                // Colorful avatars
                const avatarColors = [
                  { c: '#84a9ff', bg: 'rgba(132, 169, 255, 0.15)' },
                  { c: '#b884ff', bg: 'rgba(184, 132, 255, 0.15)' },
                  { c: '#f5c842', bg: 'rgba(245, 200, 66, 0.15)' },
                  { c: '#4df58a', bg: 'rgba(77, 245, 138, 0.15)' },
                  { c: '#ff8a8a', bg: 'rgba(255, 138, 138, 0.15)' },
                  { c: '#ffb366', bg: 'rgba(255, 179, 102, 0.15)' }
                ];
                const avatarStyle = avatarColors[index % avatarColors.length];

                return (
                  <tr 
                    key={index} 
                    onClick={() => onSelectSchool && onSelectSchool(sub.schoolName)} 
                    style={{ cursor: 'pointer' }}
                    className={styles.dashboardTableRow}
                  >
                    <td style={{ textAlign: 'center', paddingLeft: '1.5rem' }} onClick={(e) => e.stopPropagation()}>
                      <input 
                        type="checkbox" 
                        checked={selectedSubscriptions.includes(sub.schoolId)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedSubscriptions([...selectedSubscriptions, sub.schoolId]);
                          } else {
                            setSelectedSubscriptions(selectedSubscriptions.filter(id => id !== sub.schoolId));
                          }
                        }}
                      />
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <div style={{ 
                          width: '32px', height: '32px', borderRadius: '50%', 
                          background: avatarStyle.bg, color: avatarStyle.c, 
                          display: 'flex', alignItems: 'center', justifyContent: 'center', 
                          fontWeight: 'bold', fontSize: '0.9rem', border: `1px solid ${avatarStyle.c}40`
                        }}>
                          {sub.schoolName.charAt(0)}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                          <span style={{ fontWeight: 600, color: '#f0efed' }}>{sub.schoolName}</span>
                          <span style={{ fontSize: '0.75rem', color: 'rgba(240, 239, 237, 0.45)' }}>{sub.schoolId}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="status-badge" style={{ fontSize: '0.7rem', padding: '2px 8px', background: pBg, color: pColor, borderColor: 'transparent' }}>
                        {sub.plan}
                      </span>
                    </td>
                    <td style={{ color: 'rgba(240, 239, 237, 0.85)' }}>{sub.students}</td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ color: 'rgba(240, 239, 237, 0.85)' }}>{sub.renewalDate}</span>
                        <span style={{ fontSize: '0.7rem', color: sColor, marginTop: '0.2rem' }}>
                          {sub.status === 'Expired' ? 'Expired' : `${sub.daysLeft} days left`}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className="status-badge" style={{ fontSize: '0.7rem', padding: '2px 8px', background: sBg, color: sColor, borderColor: 'transparent' }}>
                        {sub.status}
                      </span>
                    </td>
                    <td style={{ color: sub.status === 'Expired' ? '#ff8a8a' : 'rgba(240, 239, 237, 0.85)', fontWeight: 500 }}>
                      {sub.amount}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <div className={styles.actionsGroup} style={{ position: 'relative' }}>
                        <button
                          className={styles.actionIconBtn}
                          onClick={(e) => { e.stopPropagation(); setActiveDropdownId(activeDropdownId === sub.schoolId ? null : sub.schoolId); }}
                        >
                          ⋮
                        </button>
                        
                        {activeDropdownId === sub.schoolId && (
                          <>
                            <div className={styles.dropdownOverlay} onClick={(e) => { e.stopPropagation(); setActiveDropdownId(null); }} />
                            <div className={`${styles.actionDropdownMenu} ${(filteredSubscriptions.length > 4 && index >= filteredSubscriptions.length - 2) ? styles.actionDropdownMenuUp : ''}`}>
                              <button onClick={(e) => { 
                                e.stopPropagation(); 
                                setActiveDropdownId(null); 
                                if (onSelectSchool) onSelectSchool(sub.schoolName); 
                              }} className={styles.actionDropdownItem}>
                                👁️ View Details
                              </button>
                              <button onClick={(e) => { e.stopPropagation(); setActiveDropdownId(null); }} className={styles.actionDropdownItem}>
                                ✏️ Edit
                              </button>
                              <button onClick={(e) => { e.stopPropagation(); setActiveDropdownId(null); }} className={styles.actionDropdownItem}>
                                🚫 Cancel Subscription
                              </button>
                              <button onClick={(e) => { e.stopPropagation(); setActiveDropdownId(null); }} className={styles.actionDropdownItem}>
                                ⏸️ Suspend School
                              </button>
                              <button onClick={(e) => { 
                                e.stopPropagation(); 
                                setActiveDropdownId(null); 
                                setConfirmModalData({
                                  isOpen: true,
                                  title: 'Delete Subscription',
                                  message: `Are you sure you want to delete the subscription for ${sub.schoolName}? This action cannot be undone.`,
                                  onConfirm: () => {
                                    // Implement actual delete logic here
                                    setConfirmModalData(prev => ({ ...prev, isOpen: false }));
                                  }
                                });
                              }} className={`${styles.actionDropdownItem} ${styles.actionDropdownItemDelete}`}>
                                🗑️ Delete
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', padding: '0 1rem', fontSize: '0.8rem', color: 'rgba(240, 239, 237, 0.6)' }}>
          <span>Showing 1 to {filteredSubscriptions.length} of 156 subscriptions</span>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className={styles.chartSelect} style={{ padding: '0.3rem 0.6rem', minWidth: 'unset' }}>&lt;</button>
            <button className={styles.chartSelect} style={{ padding: '0.3rem 0.6rem', minWidth: 'unset', background: 'rgba(132, 169, 255, 0.1)', color: '#84a9ff', borderColor: 'transparent' }}>1</button>
            <button className={styles.chartSelect} style={{ padding: '0.3rem 0.6rem', minWidth: 'unset' }}>2</button>
            <button className={styles.chartSelect} style={{ padding: '0.3rem 0.6rem', minWidth: 'unset' }}>3</button>
            <span style={{ padding: '0.3rem 0.6rem' }}>...</span>
            <button className={styles.chartSelect} style={{ padding: '0.3rem 0.6rem', minWidth: 'unset' }}>20</button>
            <button className={styles.chartSelect} style={{ padding: '0.3rem 0.6rem', minWidth: 'unset' }}>&gt;</button>
          </div>
        </div>
      </div>

      <ConfirmModal 
        isOpen={confirmModalData.isOpen}
        title={confirmModalData.title}
        message={confirmModalData.message}
        onConfirm={confirmModalData.onConfirm}
        onCancel={() => setConfirmModalData(prev => ({ ...prev, isOpen: false }))}
      />
    </>
  );
};
