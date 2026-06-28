import React, { useState } from 'react';
import styles from '../SchoolDetailView.module.css';

export const StudentsTab = ({
  mockStudents
}: {
  mockStudents: any[];
}) => {
  const [activeStudentDropdownId, setActiveStudentDropdownId] = useState<number | null>(null);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

  return (
    <section className={styles.detailBodyGrid} style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
      {/* Top 4 Cards */}
      <div className={styles.studentsTopGrid}>
        {/* Card 1: Total Students */}
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
            <span className={styles.infoLabel}>Total Students</span>
          </div>
          <h2 className={styles.studentMetricVal}>512</h2>
          <span className={styles.studentMetricSub}>+18 this month</span>
        </div>

        {/* Card 2: By Gender */}
        <div className={styles.detailCard}>
          <span className={styles.infoLabel} style={{ marginBottom: '1rem', display: 'block' }}>By Gender</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ width: '80px', height: '80px', position: 'relative' }}>
              <svg width="100%" height="100%" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#84a9ff"
                  strokeWidth="4"
                  strokeDasharray="50, 100"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#ff8a8a"
                  strokeWidth="4"
                  strokeDasharray="50, 100"
                  strokeDashoffset="-50"
                />
              </svg>
            </div>
            <div className={styles.gradeList} style={{ flex: 1 }}>
              <div className={styles.gradeRow}>
                <div className={styles.gradeLabel}>
                  <div className={styles.gradeDot} style={{ background: '#84a9ff' }} />
                  <span style={{ color: '#84a9ff', fontWeight: 'bold' }}>256</span>
                </div>
                <span>Male (50.0%)</span>
              </div>
              <div className={styles.gradeRow}>
                <div className={styles.gradeLabel}>
                  <div className={styles.gradeDot} style={{ background: '#ff8a8a' }} />
                  <span style={{ color: '#ff8a8a', fontWeight: 'bold' }}>256</span>
                </div>
                <span>Female (50.0%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: By Grade Level */}
        <div className={styles.detailCard}>
          <span className={styles.infoLabel} style={{ marginBottom: '0.8rem', display: 'block' }}>By Grade Level</span>
          <div className={styles.gradeList}>
            <div className={styles.gradeRow}>
              <div className={styles.gradeLabel}>
                <div className={styles.gradeDot} style={{ background: '#84a9ff' }} />
                Grade 7
              </div>
              <span className={styles.gradeCount}>128</span>
              <span className={styles.gradePercent}>(25.0%)</span>
            </div>
            <div className={styles.gradeRow}>
              <div className={styles.gradeLabel}>
                <div className={styles.gradeDot} style={{ background: '#4df58a' }} />
                Grade 8
              </div>
              <span className={styles.gradeCount}>130</span>
              <span className={styles.gradePercent}>(25.4%)</span>
            </div>
            <div className={styles.gradeRow}>
              <div className={styles.gradeLabel}>
                <div className={styles.gradeDot} style={{ background: '#f5c842' }} />
                Grade 9
              </div>
              <span className={styles.gradeCount}>126</span>
              <span className={styles.gradePercent}>(24.6%)</span>
            </div>
            <div className={styles.gradeRow}>
              <div className={styles.gradeLabel}>
                <div className={styles.gradeDot} style={{ background: '#b884ff' }} />
                Grade 10
              </div>
              <span className={styles.gradeCount}>128</span>
              <span className={styles.gradePercent}>(25.0%)</span>
            </div>
          </div>
        </div>

        {/* Card 4: Status / New */}
        <div className={styles.detailCard} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'center' }}>
          <div className={styles.gradeRow}>
            <span className={styles.infoLabel}>Active Students</span>
            <div>
              <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#f0efed', marginRight: '0.4rem' }}>498</span>
              <span style={{ color: 'rgba(240, 239, 237, 0.45)', fontSize: '0.8rem' }}>(97.3%)</span>
            </div>
          </div>
          <div className={styles.gradeRow}>
            <span className={styles.infoLabel}>Inactive Students</span>
            <div>
              <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#f0efed', marginRight: '0.4rem' }}>14</span>
              <span style={{ color: 'rgba(240, 239, 237, 0.45)', fontSize: '0.8rem' }}>(2.7%)</span>
            </div>
          </div>
          <div style={{ height: '1px', background: 'rgba(240, 239, 237, 0.1)', margin: '0.2rem 0' }} />
          <div className={styles.gradeRow}>
            <div className={styles.studentMetricHeader} style={{ marginBottom: 0 }}>
              <div className={styles.studentMetricIcon} style={{ width: '28px', height: '28px', color: '#4df58a' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="8.5" cy="7" r="4" />
                  <line x1="20" y1="8" x2="20" y2="14" />
                  <line x1="23" y1="11" x2="17" y2="11" />
                </svg>
              </div>
              <span className={styles.infoLabel}>New This Month</span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#f0efed', display: 'block' }}>18</span>
              <span className={styles.studentMetricSub} style={{ fontSize: '0.65rem' }}>+18 this month</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className={styles.studentsActionBar}>
        <h3 className={styles.studentsActionTitle}>All Students (512)</h3>
        <div className={styles.studentsActionControls}>
          {selectedStudents.length > 0 ? (
            <>
              <span style={{ color: 'rgba(240, 239, 237, 0.85)', fontSize: '0.85rem', fontWeight: 500, marginRight: '0.5rem' }}>
                {selectedStudents.length} selected
              </span>
              <button 
                className={styles.proGhostBtn} 
                style={{ padding: '0.5rem 1rem', color: '#ff8a8a', borderColor: 'rgba(255, 138, 138, 0.3)' }}
                onClick={() => { alert(`Deleting ${selectedStudents.length} students...`); setSelectedStudents([]); }}
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
              <input type="text" placeholder="Search students..." className={styles.studentSearchInput} />
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
            + Add Student
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
                  checked={selectedStudents.length === mockStudents.length && mockStudents.length > 0}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedStudents(mockStudents.map(s => s.id));
                    } else {
                      setSelectedStudents([]);
                    }
                  }}
                />
              </th>
              <th>Student Name</th>
              <th>Student ID</th>
              <th>Grade & Section</th>
              <th>Gender</th>
              <th>Date of Birth</th>
              <th>Status</th>
              <th>Joined Date</th>
              <th style={{ textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockStudents.map((s, i) => (
              <tr key={i}>
                <td style={{ textAlign: 'center' }}>
                  <input 
                    type="checkbox" 
                    checked={selectedStudents.includes(s.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedStudents([...selectedStudents, s.id]);
                      } else {
                        setSelectedStudents(selectedStudents.filter(id => id !== s.id));
                      }
                    }}
                  />
                </td>
                <td>
                  <div className={styles.studentProfileCell}>
                    <div className={styles.studentAvatar} style={{ background: s.gender === 'Male' ? '#84a9ff' : '#ff8a8a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0a1911', fontWeight: 'bold', fontSize: '0.75rem' }}>
                      {s.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2)}
                    </div>
                    <span className={styles.studentName}>{s.name}</span>
                  </div>
                </td>
                <td style={{ color: 'rgba(240, 239, 237, 0.6)' }}>{s.id}</td>
                <td>{s.grade}</td>
                <td className={s.gender === 'Female' ? styles.studentGender + ' ' + styles.female : styles.studentGender}>{s.gender}</td>
                <td style={{ color: 'rgba(240, 239, 237, 0.6)' }}>{s.dob}</td>
                <td>
                  {s.status === 'Active' ? (
                    <span className="status-badge active" style={{ fontSize: '0.65rem', padding: '2px 6px' }}>Active</span>
                  ) : (
                    <span className="status-badge inactive" style={{ fontSize: '0.65rem', padding: '2px 6px' }}>Inactive</span>
                  )}
                </td>
                <td style={{ color: 'rgba(240, 239, 237, 0.6)' }}>{s.join}</td>
                <td style={{ textAlign: 'center' }}>
                  <div style={{ position: 'relative' }}>
                    <button 
                      style={{ background: 'transparent', border: 'none', color: 'rgba(240, 239, 237, 0.6)', cursor: 'pointer', padding: '0.2rem 0.5rem', borderRadius: '4px' }}
                      onClick={(e) => { e.stopPropagation(); setActiveStudentDropdownId(activeStudentDropdownId === i ? null : i); }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="12" cy="5" r="1" />
                        <circle cx="12" cy="19" r="1" />
                      </svg>
                    </button>
                    {activeStudentDropdownId === i && (
                      <>
                        <div className={styles.dropdownOverlay} onClick={(e) => { e.stopPropagation(); setActiveStudentDropdownId(null); }} />
                        <div className={`${styles.actionDropdownMenu} ${(i >= 5) ? styles.actionDropdownMenuUp : ''}`}>
                          <button onClick={(e) => { e.stopPropagation(); setActiveStudentDropdownId(null); alert(`Viewing student ${s.name}...`); }} className={styles.actionDropdownItem}>
                            👁️ View Details
                          </button>
                          <button onClick={(e) => { e.stopPropagation(); setActiveStudentDropdownId(null); alert(`Editing student ${s.name}...`); }} className={styles.actionDropdownItem}>
                            ✏️ Edit
                          </button>
                          <button onClick={(e) => { e.stopPropagation(); setActiveStudentDropdownId(null); alert(`Deleting student ${s.name}...`); }} className={`${styles.actionDropdownItem} ${styles.actionDropdownItemDelete}`}>
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
        <span>Showing 1 to 8 of 512 students</span>
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
          <button className={styles.pageBtn}>64</button>
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
