import React, { useState } from 'react';
import styles from '../students.module.css';
import { ActionDropdown, ActionDropdownItem, ActionDropdownSeparator } from '@/components/ui/ActionDropdown';
import { SortKey } from './useTeachers';
import { Teacher } from '@/lib/mock/teachers.mock';

interface TeachersTableProps {
  teachers: Teacher[];
  totalCount: number;
  selectedTeachers: string[];
  onSelectAll: (checked: boolean) => void;
  onSelectTeacher: (id: string) => void;
  onSort: (key: SortKey) => void;
  getSortIcon: (key: SortKey) => string;
  onViewDetails: (teacher: Teacher) => void;
}

export const TeachersTable: React.FC<TeachersTableProps> = ({
  teachers,
  totalCount,
  selectedTeachers,
  onSelectAll,
  onSelectTeacher,
  onSort,
  getSortIcon,
  onViewDetails
}) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <div className={styles.tableSection}>
      <div className={styles.tableHeader}>
        <div className={styles.tableHeaderLeft}>
          <h2>Teacher List</h2>
          <p>Showing {teachers.length} teachers</p>
        </div>
        <div className={styles.tableActions}>
          <button className={styles.exportBtn}>
            <svg className={styles.iconGreen} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="8" y1="13" x2="16" y2="13"></line><line x1="8" y1="17" x2="16" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            Export Excel
          </button>
          <button className={styles.exportBtn}>
            <svg className={styles.iconRed} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            Export PDF
          </button>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className={styles.studentsTable}>
          <thead>
            <tr>
              <th style={{ width: '40px' }}>
                <input 
                  type="checkbox" 
                  checked={selectedTeachers.length === teachers.length && teachers.length > 0}
                  onChange={(e) => onSelectAll(e.target.checked)}
                />
              </th>
              <th onClick={() => onSort('name')} style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>TEACHER <span className={styles.sortIcon}>{getSortIcon('name')}</span></th>
              <th onClick={() => onSort('employeeId')} style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>EMPLOYEE ID <span className={styles.sortIcon}>{getSortIcon('employeeId')}</span></th>
              <th onClick={() => onSort('department')} style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>DEPARTMENT <span className={styles.sortIcon}>{getSortIcon('department')}</span></th>
              <th onClick={() => onSort('subjects')} style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>SUBJECTS <span className={styles.sortIcon}>{getSortIcon('subjects')}</span></th>
              <th onClick={() => onSort('classes')} style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>CLASSES <span className={styles.sortIcon}>{getSortIcon('classes')}</span></th>
              <th onClick={() => onSort('status')} style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>STATUS <span className={styles.sortIcon}>{getSortIcon('status')}</span></th>
              <th onClick={() => onSort('lastActiveDate')} style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>LAST ACTIVE <span className={styles.sortIcon}>{getSortIcon('lastActiveDate')}</span></th>
              <th style={{ whiteSpace: 'nowrap' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher, index) => {
              const isLastTwo = teachers.length > 4 && index >= teachers.length - 2;
              
              return (
                <tr 
                  key={teacher.id} 
                  onClick={() => onViewDetails(teacher)}
                  style={{ cursor: 'pointer' }}
                  className={styles.tableRow}
                >
                  <td onClick={(e) => e.stopPropagation()}>
                    <input 
                      type="checkbox" 
                      checked={selectedTeachers.includes(teacher.id)}
                      onChange={() => onSelectTeacher(teacher.id)}
                    />
                  </td>
                  <td>
                    <div className={styles.studentCell}>
                      <div className={styles.avatar} style={{ background: teacher.departmentColor, color: '#fff' }}>
                        {teacher.avatar ? (
                          <img src={teacher.avatar} alt={teacher.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                        ) : (
                          getInitials(teacher.name)
                        )}
                      </div>
                      <div className={styles.studentInfo}>
                        <span className={styles.studentName}>{teacher.name}</span>
                        <span className={styles.studentEmail}>{teacher.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>{teacher.employeeId}</td>
                  <td>
                    <span style={{ color: teacher.departmentColor, fontWeight: 500 }}>
                      {teacher.department}
                    </span>
                  </td>
                  <td>{teacher.subjects}</td>
                  <td>{teacher.classes}</td>
                  <td>
                    <span className={styles.statusBadge} style={{ background: teacher.statusBg, color: teacher.statusColor }}>
                      {teacher.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span>{teacher.lastActiveDate}</span>
                      <span className={styles.subText}>{teacher.lastActiveTime}</span>
                    </div>
                  </td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <div style={{ position: 'relative' }}>
                      <button 
                        className={styles.actionBtn}
                        onClick={() => setActiveDropdown(activeDropdown === teacher.id ? null : teacher.id)}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                      </button>
                      
                      <ActionDropdown 
                        isOpen={activeDropdown === teacher.id}
                        onClose={() => setActiveDropdown(null)}
                        direction={isLastTwo ? 'up' : 'down'}
                      >
                        <ActionDropdownItem 
                          icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>} 
                          label="View Profile" 
                          onClick={() => {
                            setActiveDropdown(null);
                            onViewDetails(teacher);
                          }} 
                        />
                        <ActionDropdownItem 
                          icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>} 
                          label="Edit Teacher" 
                          onClick={() => setActiveDropdown(null)} 
                        />
                        <ActionDropdownItem 
                          icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>} 
                          label="Send Message" 
                          onClick={() => setActiveDropdown(null)} 
                        />
                        <ActionDropdownSeparator />
                        <ActionDropdownItem 
                          icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"></path><line x1="18" y1="9" x2="12" y2="15"></line><line x1="12" y1="9" x2="18" y2="15"></line></svg>} 
                          label="Deactivate Account" 
                          variant="danger"
                          onClick={() => setActiveDropdown(null)} 
                        />
                      </ActionDropdown>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className={styles.tableFooter}>
        <div className={styles.paginationInfo}>
          Showing 1 to {teachers.length} of {totalCount} teachers
        </div>
        <div className={styles.paginationControls}>
          <button className={styles.pageBtn} disabled>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <button className={`${styles.pageBtn} ${styles.pageBtnActive}`}>1</button>
          <button className={styles.pageBtn}>2</button>
          <button className={styles.pageBtn}>3</button>
          <span className={styles.pageEllipsis}>...</span>
          <button className={styles.pageBtn}>5</button>
          <button className={styles.pageBtn}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
      </div>
    </div>
  );
};
