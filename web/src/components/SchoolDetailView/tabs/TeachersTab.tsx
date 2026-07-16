import React, { useState } from 'react';
import styles from '../SchoolDetailView.module.css';
import { Teacher } from '@/types/school';

export const TeachersTab = ({
  mockTeachers
}: {
  mockTeachers: Teacher[];
}) => {
  const [activeTeacherDropdownId, setActiveTeacherDropdownId] = useState<number | null>(null);
  const [selectedTeachers, setSelectedTeachers] = useState<string[]>([]);

  return (
    <section className={styles.detailBodyGrid} style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
      {/* Top 5 Cards */}
      <div className={styles.studentsTopGrid} style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
        {/* Card 1: Total Teachers */}
        <div className={styles.detailCard} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className={styles.studentMetricHeader}>
            <div className={styles.studentMetricIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'url(#chalk-wobble)' }}>
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <span className={styles.infoLabel}>Total Teachers</span>
          </div>
          <h2 className={styles.studentMetricVal}>45</h2>
          <span className={styles.studentMetricSub} style={{ color: '#4df58a' }}>+3 this month</span>
        </div>

        {/* Card 2: Full-time Teachers */}
        <div className={styles.detailCard} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className={styles.studentMetricHeader}>
            <div className={styles.studentMetricIcon} style={{ color: '#4df58a' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'url(#chalk-wobble)' }}>
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="8.5" cy="7" r="4" />
                <line x1="20" y1="8" x2="20" y2="14" />
                <line x1="23" y1="11" x2="17" y2="11" />
              </svg>
            </div>
            <span className={styles.infoLabel}>Full-time Teachers</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <h2 className={styles.studentMetricVal}>38</h2>
            <span style={{ color: 'rgba(240, 239, 237, 0.45)', fontSize: '0.85rem' }}>(84.4%)</span>
          </div>
        </div>

        {/* Card 3: Part-time Teachers */}
        <div className={styles.detailCard} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className={styles.studentMetricHeader}>
            <div className={styles.studentMetricIcon} style={{ color: '#84a9ff' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'url(#chalk-wobble)' }}>
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <span className={styles.infoLabel}>Part-time Teachers</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <h2 className={styles.studentMetricVal}>7</h2>
            <span style={{ color: 'rgba(240, 239, 237, 0.45)', fontSize: '0.85rem' }}>(15.6%)</span>
          </div>
        </div>

        {/* Card 4: Active Teachers */}
        <div className={styles.detailCard} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className={styles.studentMetricHeader}>
            <div className={styles.studentMetricIcon} style={{ color: '#4df58a', border: '1px solid #4df58a', borderRadius: '50%', padding: '2px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <span className={styles.infoLabel}>Active Teachers</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <h2 className={styles.studentMetricVal}>43</h2>
            <span style={{ color: 'rgba(240, 239, 237, 0.45)', fontSize: '0.85rem' }}>(95.6%)</span>
          </div>
          <span className={styles.studentMetricSub} style={{ color: '#4df58a' }}>+2 this month</span>
        </div>

        {/* Card 5: Inactive Teachers */}
        <div className={styles.detailCard} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className={styles.studentMetricHeader}>
            <div className={styles.studentMetricIcon} style={{ color: '#ff8a8a', border: '1px solid #ff8a8a', borderRadius: '50%', padding: '2px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="8.5" cy="7" r="4" />
                <line x1="18" y1="8" x2="23" y2="13" />
                <line x1="23" y1="8" x2="18" y2="13" />
              </svg>
            </div>
            <span className={styles.infoLabel}>Inactive Teachers</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <h2 className={styles.studentMetricVal}>2</h2>
            <span style={{ color: 'rgba(240, 239, 237, 0.45)', fontSize: '0.85rem' }}>(4.4%)</span>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className={styles.studentsActionBar}>
        <h3 className={styles.studentsActionTitle}>All Teachers (45)</h3>
        <div className={styles.studentsActionControls}>
          {selectedTeachers.length > 0 ? (
            <>
              <span style={{ color: 'rgba(240, 239, 237, 0.85)', fontSize: '0.85rem', fontWeight: 500, marginRight: '0.5rem' }}>
                {selectedTeachers.length} selected
              </span>
              <button 
                className={styles.proGhostBtn} 
                style={{ padding: '0.5rem 1rem', color: '#ff8a8a', borderColor: 'rgba(255, 138, 138, 0.3)' }}
                onClick={() => { alert(`Deleting ${selectedTeachers.length} teachers...`); setSelectedTeachers([]); }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.4rem', verticalAlign: 'middle' }}>
                  <path d="M3 6h18" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
                Delete Selected
              </button>
            </>
          ) : (
            <>
              <input type="text" placeholder="Search teachers..." className={styles.studentSearchInput} />
              <button className={styles.proGhostBtn} style={{ padding: '0.5rem 1rem' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.4rem', verticalAlign: 'middle' }}>
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                </svg>
                Filter
              </button>
              <button className={styles.proGhostBtn} style={{ padding: '0.5rem 1rem' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.4rem', verticalAlign: 'middle' }}>
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Export
              </button>
            </>
          )}
          <button className={styles.proPrimaryBtn} style={{ padding: '0.5rem 1rem' }}>
            + Add Teacher
          </button>
        </div>
      </div>

      {/* Table */}
      <div className={styles.studentsTableWrapper}>
        <table className={styles.studentsTable}>
          <thead>
            <tr>
              <th style={{ width: '40px', textAlign: 'center' }}>
                <input 
                  type="checkbox" 
                  checked={selectedTeachers.length === mockTeachers.length && mockTeachers.length > 0}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedTeachers(mockTeachers.map(t => t.id));
                    } else {
                      setSelectedTeachers([]);
                    }
                  }}
                />
              </th>
              <th>Teacher Name</th>
              <th>Teacher ID</th>
              <th>Subject(s)</th>
              <th>Position</th>
              <th>Employment Type</th>
              <th>Status</th>
              <th>Joined Date</th>
              <th style={{ textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockTeachers.map((t, i) => (
              <tr key={i}>
                <td style={{ textAlign: 'center' }}>
                  <input 
                    type="checkbox" 
                    checked={selectedTeachers.includes(t.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedTeachers([...selectedTeachers, t.id]);
                      } else {
                        setSelectedTeachers(selectedTeachers.filter(id => id !== t.id));
                      }
                    }}
                  />
                </td>
                <td>
                  <div className={styles.studentProfileCell}>
                    <div className={styles.studentAvatar} style={{ background: t.gender === 'Male' ? '#84a9ff' : '#ff8a8a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0a1911', fontWeight: 'bold', fontSize: '0.75rem' }}>
                      {t.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2)}
                    </div>
                    <span className={styles.studentName}>{t.name}</span>
                  </div>
                </td>
                <td style={{ color: 'rgba(240, 239, 237, 0.6)' }}>{t.id}</td>
                <td>{t.subject}</td>
                <td>{t.position}</td>
                <td>
                  <span className={t.type === 'Full-time' ? "status-badge active" : "status-badge pending"} style={{ fontSize: '0.65rem', padding: '2px 6px', background: t.type === 'Full-time' ? 'rgba(77, 245, 138, 0.1)' : 'rgba(132, 169, 255, 0.1)', color: t.type === 'Full-time' ? '#4df58a' : '#84a9ff' }}>
                    {t.type}
                  </span>
                </td>
                <td>
                  {t.status === 'Active' ? (
                    <span className="status-badge active" style={{ fontSize: '0.65rem', padding: '2px 6px' }}>Active</span>
                  ) : (
                    <span className="status-badge inactive" style={{ fontSize: '0.65rem', padding: '2px 6px' }}>Inactive</span>
                  )}
                </td>
                <td style={{ color: 'rgba(240, 239, 237, 0.6)' }}>{t.join}</td>
                <td style={{ textAlign: 'center' }}>
                  <div style={{ position: 'relative' }}>
                    <button 
                      style={{ background: 'transparent', border: 'none', color: 'rgba(240, 239, 237, 0.6)', cursor: 'pointer', padding: '0.2rem 0.5rem', borderRadius: '4px' }}
                      onClick={(e) => { e.stopPropagation(); setActiveTeacherDropdownId(activeTeacherDropdownId === i ? null : i); }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="12" cy="5" r="1" />
                        <circle cx="12" cy="19" r="1" />
                      </svg>
                    </button>
                    {activeTeacherDropdownId === i && (
                      <>
                        <div className={styles.dropdownOverlay} onClick={(e) => { e.stopPropagation(); setActiveTeacherDropdownId(null); }} />
                        <div className={`${styles.actionDropdownMenu} ${(i >= 5) ? styles.actionDropdownMenuUp : ''}`}>
                          <button onClick={(e) => { e.stopPropagation(); setActiveTeacherDropdownId(null); alert(`Viewing teacher ${t.name}...`); }} className={styles.actionDropdownItem}>
                            👁️ View Details
                          </button>
                          <button onClick={(e) => { e.stopPropagation(); setActiveTeacherDropdownId(null); alert(`Editing teacher ${t.name}...`); }} className={styles.actionDropdownItem}>
                            ✏️ Edit
                          </button>
                          <button onClick={(e) => { e.stopPropagation(); setActiveTeacherDropdownId(null); alert(`Deleting teacher ${t.name}...`); }} className={`${styles.actionDropdownItem} ${styles.actionDropdownItemDelete}`}>
                            🗑️ Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className={styles.paginationWrapper}>
        <span>Showing 1 to 8 of 45 teachers</span>
        <div className={styles.paginationControls}>
          <button className={styles.pageBtn} disabled>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button className={`${styles.pageBtn} ${styles.active}`}>1</button>
          <button className={styles.pageBtn}>2</button>
          <button className={styles.pageBtn}>3</button>
          <button className={styles.pageBtn} style={{ border: 'none', background: 'transparent' }}>...</button>
          <button className={styles.pageBtn}>6</button>
          <button className={styles.pageBtn}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};
