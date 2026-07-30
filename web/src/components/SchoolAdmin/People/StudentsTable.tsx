import React, { useState } from 'react';
import styles from './students.module.css';
import layoutStyles from '../shared/layout.module.css';
import { ActionDropdown, ActionDropdownItem, ActionDropdownSeparator } from '@/components/ui/ActionDropdown';
import { SortKey } from './useStudents';

interface Student {
  id: string;
  name: string;
  email: string;
  studentId: string;
  gradeSection: string;
  parentGuardian: string;
  contact: string;
  status: string;
  dateEnrolled: string;
  avatarColor: string;
}

interface StudentsTableProps {
  students: Student[];
  totalCount: number;
  selectedStudents: string[];
  onSelectAll: (checked: boolean) => void;
  onSelectStudent: (id: string) => void;
  onSort: (key: SortKey) => void;
  getSortIcon: (key: SortKey) => string;
  onViewDetails: (student: Student) => void;
}

export const StudentsTable: React.FC<StudentsTableProps> = ({
  students,
  totalCount,
  selectedStudents,
  onSelectAll,
  onSelectStudent,
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
          <h2>Student List</h2>
          <p>Showing {students.length} students</p>
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
                  checked={selectedStudents.length === students.length && students.length > 0}
                  onChange={(e) => onSelectAll(e.target.checked)}
                />
              </th>
              <th onClick={() => onSort('name')} style={{ cursor: 'pointer' }}>Student <span className={styles.sortIcon}>{getSortIcon('name')}</span></th>
              <th onClick={() => onSort('studentId')} style={{ cursor: 'pointer' }}>Student ID <span className={styles.sortIcon}>{getSortIcon('studentId')}</span></th>
              <th onClick={() => onSort('gradeSection')} style={{ cursor: 'pointer' }}>Grade & Section <span className={styles.sortIcon}>{getSortIcon('gradeSection')}</span></th>
              <th onClick={() => onSort('parentGuardian')} style={{ cursor: 'pointer' }}>Parent / Guardian <span className={styles.sortIcon}>{getSortIcon('parentGuardian')}</span></th>
              <th>Contact</th>
              <th onClick={() => onSort('status')} style={{ cursor: 'pointer' }}>Status <span className={styles.sortIcon}>{getSortIcon('status')}</span></th>
              <th onClick={() => onSort('dateEnrolled')} style={{ cursor: 'pointer' }}>Date Enrolled <span className={styles.sortIcon}>{getSortIcon('dateEnrolled')}</span></th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => {
              const isLastTwo = students.length > 4 && index >= students.length - 2;
              
              return (
                <tr 
                  key={student.id} 
                  onClick={() => onViewDetails(student)}
                  style={{ cursor: 'pointer' }}
                  className={styles.tableRow}
                >
                  <td onClick={(e) => e.stopPropagation()}>
                    <input 
                      type="checkbox" 
                      checked={selectedStudents.includes(student.id)}
                      onChange={() => onSelectStudent(student.id)}
                    />
                  </td>
                  <td>
                    <div className={styles.studentCell}>
                      <div className={styles.avatar} style={{ background: student.avatarColor }}>
                        {getInitials(student.name)}
                      </div>
                      <div className={styles.studentInfo}>
                        <span className={styles.studentName}>{student.name}</span>
                        <span className={styles.studentEmail}>{student.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>{student.studentId}</td>
                  <td>{student.gradeSection}</td>
                  <td>{student.parentGuardian}</td>
                  <td>{student.contact}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${student.status === 'Active' ? styles.statusActive : styles.statusInactive}`}>
                      {student.status}
                    </span>
                  </td>
                  <td>{student.dateEnrolled}</td>
                  <td style={{ position: 'relative' }}>
                    <button className={styles.actionIconBtn} onClick={(e) => { e.stopPropagation(); setActiveDropdown(activeDropdown === student.id ? null : student.id); }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                    </button>
                    
                    <ActionDropdown 
                      isOpen={activeDropdown === student.id}
                      onClose={() => setActiveDropdown(null)}
                      openUpwards={isLastTwo}
                    >
                      <ActionDropdownItem onClick={(e) => { e.stopPropagation(); setActiveDropdown(null); onViewDetails(student); }}>
                        👁️ View Details
                      </ActionDropdownItem>
                      <ActionDropdownItem onClick={(e) => { e.stopPropagation(); setActiveDropdown(null); }}>
                        ✏️ Edit Student
                      </ActionDropdownItem>
                      <ActionDropdownItem onClick={(e) => { e.stopPropagation(); setActiveDropdown(null); }}>
                        📝 Manage Grades
                      </ActionDropdownItem>
                      <ActionDropdownItem onClick={(e) => { e.stopPropagation(); setActiveDropdown(null); }}>
                        📅 View Attendance
                      </ActionDropdownItem>
                      <ActionDropdownItem onClick={(e) => { e.stopPropagation(); setActiveDropdown(null); }}>
                        📞 Contact Parent
                      </ActionDropdownItem>
                      
                      <ActionDropdownSeparator />
                      
                      <ActionDropdownItem isDanger onClick={(e) => { e.stopPropagation(); setActiveDropdown(null); }}>
                        🗑️ Delete Student
                      </ActionDropdownItem>
                    </ActionDropdown>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className={layoutStyles.tableFooter}>
        <div className={layoutStyles.paginationInfo}>
          Showing 1 to {students.length} of {totalCount} students
        </div>
        <div className={layoutStyles.paginationControls}>
          <button className={layoutStyles.pageBtn}>&lt;</button>
          <button className={`${layoutStyles.pageBtn} ${layoutStyles.pageBtnActive}`}>1</button>
          <button className={layoutStyles.pageBtn}>2</button>
          <button className={layoutStyles.pageBtn}>3</button>
          <span className={layoutStyles.pageEllipsis}>...</span>
          <button className={layoutStyles.pageBtn}>125</button>
          <button className={layoutStyles.pageBtn}>&gt;</button>
          <select className={styles.pageSizeSelect}>
            <option>10 / page</option>
          </select>
        </div>
      </div>
    </div>
  );
};
