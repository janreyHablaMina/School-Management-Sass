import React, { useState } from 'react';
import styles from './students.module.css';
import { schoolAdminMockData } from '@/lib/data/schoolAdminMockData';

export const StudentsView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <div className={styles.studentsContainer}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <h1>Students</h1>
          <p>Manage student information, enrollment, and academic records.</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.importBtn}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
            Import Students
          </button>
          <button className={styles.addBtn}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Add Student
          </button>
          <button className={styles.moreBtn}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
            More
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className={styles.metricsGrid}>
        {[
          { label: 'Total Students', value: '1,245', sub: '8.6% vs last month', growth: true, icon: '👥', iconBg: 'rgba(132, 169, 255, 0.1)', color: '#84a9ff' },
          { label: 'Male Students', value: '642', sub: '51.6% of total', growth: false, icon: '👨‍🎓', iconBg: 'rgba(92, 199, 137, 0.1)', color: '#5cc789' },
          { label: 'Female Students', value: '603', sub: '48.4% of total', growth: false, icon: '👩‍🎓', iconBg: 'rgba(255, 126, 147, 0.1)', color: '#ff7e93' },
          { label: 'New Enrollments', value: '56', sub: '12.0% vs last month', growth: true, icon: '📝', iconBg: 'rgba(255, 171, 107, 0.1)', color: '#ffab6b' },
          { label: 'Promoted Students', value: '1,180', sub: '95.7% of total', growth: false, icon: '🏅', iconBg: 'rgba(245, 200, 66, 0.1)', color: '#f5c842' },
          { label: 'With Incomplete Info', value: '18', sub: 'View list', growth: false, isLink: true, icon: '📄', iconBg: 'rgba(182, 142, 255, 0.1)', color: '#b68eff' },
        ].map((metric, idx) => (
          <div key={idx} className={styles.metricCard}>
            <div className={styles.metricTop}>
              <div className={styles.metricIconWrapper} style={{ background: metric.iconBg, color: metric.color }}>
                {metric.icon}
              </div>
              <span className={styles.metricLabel}>{metric.label}</span>
            </div>
            <div className={styles.metricValue}>{metric.value}</div>
            <div className={styles.metricBottom}>
              {metric.growth && <span className={styles.growthGreen}>↑ {metric.sub.split(' ')[0]}</span>}
              <span className={metric.isLink ? styles.linkText : styles.subText}>
                {metric.growth ? metric.sub.substring(metric.sub.indexOf(' ')) : metric.sub}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Filters Row */}
      <div className={styles.filtersRow}>
        <div className={styles.searchWrapper}>
          <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input 
            type="text" 
            placeholder="Search student name, ID, or email..." 
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select className={styles.filterSelect}><option>All Grade Levels</option></select>
        <select className={styles.filterSelect}><option>All Sections</option></select>
        <select className={styles.filterSelect}><option>All Status</option></select>
        <select className={styles.filterSelect}><option>All Gender</option></select>
        <button className={styles.filterBtn}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
          Filters
        </button>
        <button className={styles.clearBtn}>Clear</button>
      </div>

      {/* Table Section */}
      <div className={styles.tableSection}>
        <div className={styles.tableHeader}>
          <div className={styles.tableHeaderLeft}>
            <h2>Student List</h2>
            <p>Showing {schoolAdminMockData.students.length} students</p>
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
                <th style={{ width: '40px' }}><input type="checkbox" /></th>
                <th>Student <span className={styles.sortIcon}>↕</span></th>
                <th>Student ID <span className={styles.sortIcon}>↕</span></th>
                <th>Grade & Section <span className={styles.sortIcon}>↕</span></th>
                <th>Parent / Guardian <span className={styles.sortIcon}>↕</span></th>
                <th>Contact</th>
                <th>Status <span className={styles.sortIcon}>↕</span></th>
                <th>Date Enrolled <span className={styles.sortIcon}>↕</span></th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {schoolAdminMockData.students.map((student) => (
                <tr key={student.id}>
                  <td><input type="checkbox" /></td>
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
                  <td>
                    <button className={styles.actionBtn}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className={styles.pagination}>
          <div className={styles.pageInfo}>
            Showing 1 to 10 of 1,245 students
          </div>
          <div className={styles.pageControls}>
            <button className={styles.pageBtn}>&lt;</button>
            <button className={`${styles.pageBtn} ${styles.active}`}>1</button>
            <button className={styles.pageBtn}>2</button>
            <button className={styles.pageBtn}>3</button>
            <span className={styles.pageDots}>...</span>
            <button className={styles.pageBtn}>125</button>
            <button className={styles.pageBtn}>&gt;</button>
            <select className={styles.pageSizeSelect}>
              <option>10 / page</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
