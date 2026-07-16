import React, { useState } from 'react';
import styles from '../SchoolDetailView.module.css';
import { Section } from '@/types/school';

export const SectionsTab = ({
  mockSections
}: {
  mockSections: Section[];
}) => {
  const [activeSectionDropdownId, setActiveSectionDropdownId] = useState<number | null>(null);
  const [selectedSections, setSelectedSections] = useState<string[]>([]);

  return (
    <section className={styles.detailBodyGrid} style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
      {/* Top 5 Cards */}
      <div className={styles.studentsTopGrid} style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
        {/* Card 1: Total Sections */}
        <div className={styles.detailCard} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className={styles.studentMetricHeader}>
            <div className={styles.studentMetricIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'url(#chalk-wobble)' }}>
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
            </div>
            <span className={styles.infoLabel}>Total Sections</span>
          </div>
          <h2 className={styles.studentMetricVal}>18</h2>
          <span className={styles.studentMetricSub} style={{ color: '#4df58a' }}>+1 this month</span>
        </div>

        {/* Card 2: Active Sections */}
        <div className={styles.detailCard} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className={styles.studentMetricHeader}>
            <div className={styles.studentMetricIcon} style={{ color: '#4df58a' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'url(#chalk-wobble)' }}>
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <span className={styles.infoLabel}>Active Sections</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <h2 className={styles.studentMetricVal}>18</h2>
            <span style={{ color: 'rgba(240, 239, 237, 0.45)', fontSize: '0.85rem' }}>(100%)</span>
          </div>
          <span className={styles.studentMetricSub} style={{ color: '#4df58a' }}>+1 this month</span>
        </div>

        {/* Card 3: Full Capacity */}
        <div className={styles.detailCard} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className={styles.studentMetricHeader}>
            <div className={styles.studentMetricIcon} style={{ color: '#ff8a8a' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'url(#chalk-wobble)' }}>
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            </div>
            <span className={styles.infoLabel}>Full Capacity Sections</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <h2 className={styles.studentMetricVal}>2</h2>
            <span style={{ color: 'rgba(240, 239, 237, 0.45)', fontSize: '0.85rem' }}>(11.1%)</span>
          </div>
        </div>

        {/* Card 4: Near Capacity */}
        <div className={styles.detailCard} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className={styles.studentMetricHeader}>
            <div className={styles.studentMetricIcon} style={{ color: '#f5c842' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <span className={styles.infoLabel}>Near Capacity Sections</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <h2 className={styles.studentMetricVal}>4</h2>
            <span style={{ color: 'rgba(240, 239, 237, 0.45)', fontSize: '0.85rem' }}>(22.2%)</span>
          </div>
          <span style={{ color: 'rgba(240, 239, 237, 0.45)', fontSize: '0.75rem', marginTop: '0.2rem' }}>80% or more capacity</span>
        </div>

        {/* Card 5: Average Section Size */}
        <div className={styles.detailCard} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className={styles.studentMetricHeader}>
            <div className={styles.studentMetricIcon} style={{ color: '#84a9ff' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            </div>
            <span className={styles.infoLabel}>Average Section Size</span>
          </div>
          <h2 className={styles.studentMetricVal}>28.4</h2>
          <span style={{ color: 'rgba(240, 239, 237, 0.45)', fontSize: '0.75rem', marginTop: '0.2rem' }}>Students per section</span>
        </div>
      </div>

      {/* Action Bar */}
      <div className={styles.studentsActionBar}>
        <h3 className={styles.studentsActionTitle}>All Sections (18)</h3>
        <div className={styles.studentsActionControls}>
          {selectedSections.length > 0 ? (
            <>
              <span style={{ color: 'rgba(240, 239, 237, 0.85)', fontSize: '0.85rem', fontWeight: 500, marginRight: '0.5rem' }}>
                {selectedSections.length} selected
              </span>
              <button 
                className={styles.proGhostBtn} 
                style={{ padding: '0.5rem 1rem', color: '#ff8a8a', borderColor: 'rgba(255, 138, 138, 0.3)' }}
                onClick={() => { alert(`Deleting ${selectedSections.length} sections...`); setSelectedSections([]); }}
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
              <input type="text" placeholder="Search sections..." className={styles.studentSearchInput} />
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
            + Add Section
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
                  checked={selectedSections.length === mockSections.length && mockSections.length > 0}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedSections(mockSections.map(s => s.id));
                    } else {
                      setSelectedSections([]);
                    }
                  }}
                />
              </th>
              <th>Section Name</th>
              <th>Grade Level</th>
              <th>Adviser / Teacher</th>
              <th style={{ textAlign: 'center' }}>Students</th>
              <th style={{ textAlign: 'center' }}>Capacity</th>
              <th>Utilization</th>
              <th>School Year</th>
              <th style={{ textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockSections.map((s, i) => {
              // Determine status and colors based on the data
              const colorMap: Record<string, string> = {
                'Active': '#4df58a',
                'Near Capacity': '#f5c842',
                'Full Capacity': '#ff8a8a',
              };
              
              const color = colorMap[s.status] || '#84a9ff';

              // Generate a badge color for the short name
              // E.g., 7A, 7B use a light purple/blue
              const shortBadgeBg = (s.short.startsWith('7') || s.short.startsWith('9')) ? 'rgba(132, 169, 255, 0.15)' : 'rgba(184, 132, 255, 0.15)';
              const shortBadgeColor = (s.short.startsWith('7') || s.short.startsWith('9')) ? '#84a9ff' : '#b884ff';

              return (
                <tr key={i}>
                  <td style={{ textAlign: 'center' }}>
                    <input 
                      type="checkbox" 
                      checked={selectedSections.includes(s.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedSections([...selectedSections, s.id]);
                        } else {
                          setSelectedSections(selectedSections.filter(id => id !== s.id));
                        }
                      }}
                    />
                  </td>
                  <td>
                    <div className={styles.studentAvatar} style={{ background: shortBadgeBg, color: shortBadgeColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.8rem', borderRadius: '6px', border: `1px solid ${shortBadgeColor}40` }}>
                      {s.short}
                    </div>
                  </td>
                  <td style={{ color: 'rgba(240, 239, 237, 0.85)' }}>{s.name}</td>
                  <td style={{ color: 'rgba(240, 239, 237, 0.85)' }}>{s.adviser}</td>
                  <td style={{ textAlign: 'center', fontWeight: 500 }}>{s.students}</td>
                  <td style={{ textAlign: 'center', color: 'rgba(240, 239, 237, 0.6)' }}>{s.capacity}</td>
                  <td style={{ minWidth: '100px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'rgba(240, 239, 237, 0.85)' }}>{s.utilization}%</span>
                      <div style={{ width: '100%', height: '4px', background: 'rgba(240, 239, 237, 0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${s.utilization}%`, background: color }} />
                      </div>
                    </div>
                  </td>
                  <td style={{ color: 'rgba(240, 239, 237, 0.6)' }}>{s.year}</td>
                  <td style={{ textAlign: 'center' }}>
                    <div style={{ position: 'relative' }}>
                      <button 
                        style={{ background: 'transparent', border: 'none', color: 'rgba(240, 239, 237, 0.6)', cursor: 'pointer', padding: '0.2rem 0.5rem', borderRadius: '4px' }}
                        onClick={(e) => { e.stopPropagation(); setActiveSectionDropdownId(activeSectionDropdownId === i ? null : i); }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="1" />
                          <circle cx="12" cy="5" r="1" />
                          <circle cx="12" cy="19" r="1" />
                        </svg>
                      </button>
                      {activeSectionDropdownId === i && (
                        <>
                          <div className={styles.dropdownOverlay} onClick={(e) => { e.stopPropagation(); setActiveSectionDropdownId(null); }} />
                          <div className={`${styles.actionDropdownMenu} ${(i >= 5) ? styles.actionDropdownMenuUp : ''}`}>
                            <button onClick={(e) => { e.stopPropagation(); setActiveSectionDropdownId(null); alert(`Viewing section ${s.name}...`); }} className={styles.actionDropdownItem}>
                              👁️ View Details
                            </button>
                            <button onClick={(e) => { e.stopPropagation(); setActiveSectionDropdownId(null); alert(`Editing section ${s.name}...`); }} className={styles.actionDropdownItem}>
                              ✏️ Edit
                            </button>
                            <button onClick={(e) => { e.stopPropagation(); setActiveSectionDropdownId(null); alert(`Deleting section ${s.name}...`); }} className={`${styles.actionDropdownItem} ${styles.actionDropdownItemDelete}`}>
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
      <div className={styles.paginationWrapper}>
        <span>Showing 1 to 8 of 18 sections</span>
        <div className={styles.paginationControls}>
          <button className={styles.pageBtn} disabled>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button className={`${styles.pageBtn} ${styles.active}`}>1</button>
          <button className={styles.pageBtn}>2</button>
          <button className={styles.pageBtn}>3</button>
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
