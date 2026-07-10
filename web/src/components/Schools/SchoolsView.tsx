'use client';

import React, { useState } from 'react';
import styles from '@/app/admin/admin.module.css';
import { School } from '@/types/school';
import { schoolsData } from '@/lib/data/schools';
import { ConfirmModal } from '@/components/ui/ConfirmModal';

interface SchoolsViewProps {
  onSelectSchool: (school: School) => void;
  onAddSchool?: () => void;
}

export const SchoolsView: React.FC<SchoolsViewProps> = ({ onSelectSchool, onAddSchool }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPlan, setSelectedPlan] = useState('all');
  const [activeSchoolDropdownId, setActiveSchoolDropdownId] = useState<number | null>(null);
  const [selectedSchools, setSelectedSchools] = useState<string[]>([]);
  
  const [confirmModalData, setConfirmModalData] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({ isOpen: false, title: '', message: '', onConfirm: () => {} });

  const filteredSchools = schoolsData.filter((school) => {
    const matchesStatus = selectedStatus === 'all' || school.status.toLowerCase() === selectedStatus.toLowerCase();
    const matchesPlan = selectedPlan === 'all' || school.plan.toLowerCase() === selectedPlan.toLowerCase();
    const matchesSearch =
      school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      school.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      school.plan.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesPlan && matchesSearch;
  });

  return (
    <>
      {/* Schools Stats Grid */}
      <section className={styles.schoolsStatsGrid}>
        {[
          { label: 'Total Schools', icon: '🏫', value: '24', badge: '▲ +3 this month', badgeClass: styles.trendUp },
          { label: 'Active Schools', icon: '🟢', value: '22', badge: '▲ 91.67%', badgeClass: styles.trendUp },
          { label: 'Pending Schools', icon: '⏳', value: '2', badge: '● 8.33%', badgeClass: styles.trendFlat, customBadgeStyle: { color: '#f5c842', borderColor: 'rgba(245,200,66,0.3)', background: 'rgba(245,200,66,0.05)' } },
          { label: 'Inactive Schools', icon: '🔴', value: '0', badge: '■ 0%', badgeClass: styles.trendDown, customBadgeStyle: { color: '#ff8a8a', borderColor: 'rgba(255,138,138,0.3)', background: 'rgba(255,138,138,0.05)' } },
          { label: 'Total Students', icon: '👥', value: '12,540', badge: '▲ +320 this month', badgeClass: styles.trendUp },
        ].map((stat) => (
          <div key={stat.label} className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <span className={styles.metricLabel}>{stat.label}</span>
              <span className={styles.metricIcon}>{stat.icon}</span>
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

      {/* All Schools Registry Table */}
      <div className={styles.tableCard} style={{ marginTop: '1.2rem', flex: 1, minHeight: '520px' }}>
        {/* Toolbar */}
        <div className={styles.schoolsToolbar}>
          <div className={styles.toolbarLeft}>
            <h3 className={styles.tableTitle} style={{ fontSize: '1.45rem' }}>All Schools</h3>
          </div>
          <div className={styles.toolbarRight}>
            {selectedSchools.length > 0 ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginRight: '0.5rem' }}>
                <span style={{ color: 'rgba(240, 239, 237, 0.85)', fontSize: '0.95rem' }}>
                  {selectedSchools.length} selected
                </span>
                <button 
                  onClick={() => {
                    setConfirmModalData({
                      isOpen: true,
                      title: 'Delete Selected Schools',
                      message: `Are you sure you want to delete ${selectedSchools.length} selected schools? This action cannot be undone.`,
                      onConfirm: () => {
                        setConfirmModalData(prev => ({ ...prev, isOpen: false }));
                        setSelectedSchools([]);
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
                <select className={styles.chartSelect} value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="expiring soon">Expiring Soon</option>
                  <option value="expired">Expired</option>
                </select>
                <select className={styles.chartSelect} value={selectedPlan} onChange={(e) => setSelectedPlan(e.target.value)}>
                  <option value="all">All Plans</option>
                  <option value="school plan">School Plan</option>
                  <option value="district plan">District Plan</option>
                  <option value="enterprise plan">Enterprise Plan</option>
                </select>
              </>
            )}
            <button className={styles.toolbarAddBtn} onClick={() => onAddSchool && onAddSchool()}>
              <span>+</span> Add New School
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className={styles.tableWrapper}>
          <table className={styles.dashboardTable}>
            <thead>
              <tr>
                <th style={{ width: '40px', paddingLeft: '1.5rem' }}>
                  <input 
                    type="checkbox" 
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedSchools(filteredSchools.map(s => s.name));
                      } else {
                        setSelectedSchools([]);
                      }
                    }}
                    checked={selectedSchools.length > 0 && selectedSchools.length === filteredSchools.length}
                  />
                </th>
                <th>School Name</th>
                <th>Status</th>
                <th>Subscription Plan</th>
                <th>Joined Date</th>
                <th>Renewal Date</th>
                <th>Monthly Revenue</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSchools.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '3rem', color: 'rgba(240, 239, 237, 0.4)' }}>
                    No schools found matching your search.
                  </td>
                </tr>
              ) : (
                filteredSchools.map((school, i) => (
                  <tr key={i} className={styles.clickableRow} onClick={() => onSelectSchool(school)}>
                    <td style={{ paddingLeft: '1.5rem' }} onClick={(e) => e.stopPropagation()}>
                      <input 
                        type="checkbox" 
                        checked={selectedSchools.includes(school.name)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedSchools([...selectedSchools, school.name]);
                          } else {
                            setSelectedSchools(selectedSchools.filter(name => name !== school.name));
                          }
                        }}
                      />
                    </td>
                    <td>
                      <span className={styles.schoolNameColMain}>{school.name}</span>
                      <span className={styles.schoolNameColSub}>{school.location}</span>
                    </td>
                    <td>
                      <span
                        className={`${styles.statusBadge} ${
                          school.status === 'Active' ? styles.statusActive :
                          school.status === 'Expiring Soon' ? styles.statusExpiring :
                          school.status === 'Expired' ? styles.statusExpired : styles.statusExpiring
                        }`}
                        style={school.status === 'Pending' ? { background: 'rgba(245,200,66,0.08)', borderColor: 'rgba(245,200,66,0.4)', color: '#f5c842' } : {}}
                      >
                        {school.status}
                      </span>
                    </td>
                    <td>
                      <span className={styles.planNameText}>{school.plan}</span>
                      <span className={styles.planLimitText}>{school.limit}</span>
                    </td>
                    <td>{school.joined}</td>
                    <td>
                      <div>{school.renewal}</div>
                      {school.renewalBadge && (
                        <span className={`${styles.badgeSubtext} ${school.renewalBadgeColor ? (styles as Record<string, string>)[school.renewalBadgeColor] : ''}`}>
                          {school.renewalBadge}
                        </span>
                      )}
                    </td>
                    <td>
                      <div>{school.revenue}</div>
                      {school.revenueBadge && (
                        <span className={styles.revenueExtraBadge}>{school.revenueBadge}</span>
                      )}
                    </td>
                    <td>
                      <div className={styles.actionsGroup} style={{ position: 'relative' }}>
                        <button
                          className={styles.actionIconBtn}
                          onClick={(e) => { e.stopPropagation(); setActiveSchoolDropdownId(activeSchoolDropdownId === i ? null : i); }}
                        >
                          ⋮
                        </button>
                        {activeSchoolDropdownId === i && (
                          <>
                            <div className={styles.dropdownOverlay} onClick={(e) => { e.stopPropagation(); setActiveSchoolDropdownId(null); }} />
                            <div className={`${styles.actionDropdownMenu} ${(filteredSchools.length > 4 && i >= filteredSchools.length - 2) ? styles.actionDropdownMenuUp : ''}`}>
                              <button onClick={(e) => { e.stopPropagation(); setActiveSchoolDropdownId(null); onSelectSchool(school); }} className={styles.actionDropdownItem}>
                                👁️ View Details
                              </button>
                              <button onClick={(e) => { e.stopPropagation(); setActiveSchoolDropdownId(null); alert(`Editing school ${school.name}...`); }} className={styles.actionDropdownItem}>
                                ✏️ Edit
                              </button>
                              <button onClick={(e) => { 
                                e.stopPropagation(); 
                                setActiveSchoolDropdownId(null); 
                                setConfirmModalData({
                                  isOpen: true,
                                  title: 'Delete School',
                                  message: `Are you sure you want to delete the school ${school.name}? This action cannot be undone.`,
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
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className={styles.schoolsPagination}>
          <span className={styles.paginationText}>Showing 1 to 8 of 24 schools</span>
          <div className={styles.paginationButtons}>
            <button className={styles.pageBtn} onClick={() => alert('Previous page...')}>&lt;</button>
            <button className={`${styles.pageBtn} ${styles.pageBtnActive}`}>1</button>
            <button className={styles.pageBtn} onClick={() => alert('Page 2...')}>2</button>
            <button className={styles.pageBtn} onClick={() => alert('Page 3...')}>3</button>
            <button className={styles.pageBtn} onClick={() => alert('Next page...')}>&gt;</button>
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
