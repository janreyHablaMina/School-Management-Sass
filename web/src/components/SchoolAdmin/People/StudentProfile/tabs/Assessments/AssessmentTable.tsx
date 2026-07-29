import React, { useState } from 'react';
import styles from '../../studentProfile.module.css';
import { ASSESSMENT_LIST } from '../../../../../../lib/mock/studentProfile.mock';

const ASSESSMENT_CATEGORIES = ['All', 'Assignments', 'Quizzes', 'Exams', 'Projects', 'Labs', 'Worksheets', 'Performance'];

export const AssessmentTable: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter assessments based on active category and search term
  const filteredAssessments = ASSESSMENT_LIST.filter(assessment => {
    // 1. Category Filter
    let matchesCategory = true;
    if (activeCategory !== 'All') {
      if (activeCategory === 'Assignments') matchesCategory = assessment.type === 'Assignment';
      else if (activeCategory === 'Quizzes') matchesCategory = assessment.type === 'Quiz';
      else if (activeCategory === 'Exams') matchesCategory = assessment.type === 'Exam';
      else if (activeCategory === 'Projects') matchesCategory = assessment.type === 'Project';
      else if (activeCategory === 'Labs') matchesCategory = assessment.type === 'Laboratory Activity';
      else if (activeCategory === 'Worksheets') matchesCategory = assessment.type === 'Worksheet';
      else if (activeCategory === 'Performance') matchesCategory = assessment.type === 'Performance Task';
    }

    // 2. Search Filter
    let matchesSearch = true;
    if (searchTerm.trim() !== '') {
      const lowerSearch = searchTerm.toLowerCase();
      matchesSearch = 
        assessment.title.toLowerCase().includes(lowerSearch) ||
        assessment.subject.toLowerCase().includes(lowerSearch) ||
        assessment.type.toLowerCase().includes(lowerSearch) ||
        assessment.teacher.toLowerCase().includes(lowerSearch);
    }

    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {/* Tabs and Search */}
      <div className={styles.tabsHeader} style={{ marginTop: '2rem', borderBottom: '1px solid rgba(240, 239, 237, 0.1)', paddingBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className={styles.hideScrollbar} style={{ display: 'flex', gap: '1.5rem', overflowX: 'auto', flex: 1, paddingBottom: '0.5rem' }}>
          {ASSESSMENT_CATEGORIES.map(category => (
            <button 
              key={category}
              className={`${styles.categoryBtn} ${activeCategory === category ? styles.categoryBtnActive : ''}`}
              onClick={() => setActiveCategory(category)}
              style={{ whiteSpace: 'nowrap' }}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', marginLeft: '2rem' }}>
          <div className={styles.searchWrapper} style={{ width: '320px' }}>
            <span className={styles.searchIcon}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </span>
            <input 
              type="text" 
              placeholder="Search assessments..." 
              className={styles.searchInput} 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className={styles.outlineBtn}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
            Filter
          </button>
        </div>
      </div>

      {/* Main Table */}
      <div className={styles.assessmentsBottomGrid}>
        <div>
          <div className={`${styles.attendanceTableWrapper} ${styles.hideScrollbar}`}>
            <table className={styles.attendanceTable}>
              <thead>
                <tr>
                  <th>TITLE</th>
                  <th>TYPE</th>
                  <th>SUBJECT</th>
                  <th>TEACHER</th>
                  <th>DUE DATE</th>
                  <th>STATUS</th>
                  <th>SCORE</th>
                </tr>
              </thead>
              <tbody>
                {filteredAssessments.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className={styles.subjectCell}>
                        <div className={styles.subjectIcon} style={{ background: item.typeBg, color: item.typeColor }}>{item.icon}</div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontWeight: 600 }}>{item.title}</span>
                          <span className={styles.titleSubtitle}>{item.subtitle}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={styles.assessmentTypeBadge} style={{ background: item.typeBg, color: item.typeColor }}>
                        {item.type}
                      </span>
                    </td>
                    <td>{item.subject}</td>
                    <td>{item.teacher}</td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span>{item.dueDate}</span>
                        <span className={styles.titleSubtitle}>{item.dueDay}</span>
                      </div>
                    </td>
                    <td>
                      <span className={styles.assessmentStatusBadge} style={{ background: item.statusBg, color: item.statusColor }}>
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontWeight: 600 }}>{item.score}</span>
                        <span className={styles.titleSubtitle}>{item.scorePercent}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ fontSize: '0.85rem', color: 'rgba(240, 239, 237, 0.5)', marginTop: '1rem' }}>
            Showing {filteredAssessments.length > 0 ? 1 : 0} to {filteredAssessments.length} of {ASSESSMENT_LIST.length} assessments
          </div>
        </div>
      </div>
    </>
  );
};
