import React, { useState } from 'react';
import styles from '../studentProfile.module.css';
import { ASSESSMENT_STATS, ASSESSMENT_LIST, UPCOMING_DEADLINES } from './mockData';
import { InfoCard } from './SharedComponents';

const ASSESSMENT_CATEGORIES = ['All', 'Assignments', 'Quizzes', 'Exams', 'Projects', 'Labs', 'Worksheets', 'Performance'];

export const AssessmentsTab: React.FC = () => {
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
      {/* Top Stats Grid */}
      <div className={styles.assessmentsTopGrid}>
        
        {/* Overall Performance */}
        <InfoCard title="Overall Performance" icon="📊" iconBg="rgba(92, 199, 137, 0.1)" iconColor="#5cc789">
          <div className={styles.donutChartWrapper}>
            <div className={styles.donutChart}></div>
            <div className={styles.donutInfo}>
              <span className={styles.donutValue}>{ASSESSMENT_STATS.overall.value}</span>
              <span className={styles.donutSub}>{ASSESSMENT_STATS.overall.subText}</span>
              <span className={styles.donutLabel} style={{ color: ASSESSMENT_STATS.overall.color }}>{ASSESSMENT_STATS.overall.label}</span>
            </div>
          </div>
        </InfoCard>

        {/* Completed */}
        <InfoCard title="Completed" icon={ASSESSMENT_STATS.completed.icon} iconBg={ASSESSMENT_STATS.completed.iconBg} iconColor={ASSESSMENT_STATS.completed.iconColor}>
          <div className={styles.donutInfo} style={{ marginTop: '0.5rem' }}>
            <span className={styles.donutValue}>{ASSESSMENT_STATS.completed.value}</span>
            <span className={styles.donutSub}>{ASSESSMENT_STATS.completed.subText}</span>
          </div>
        </InfoCard>

        {/* Pending */}
        <InfoCard title="Pending" icon={ASSESSMENT_STATS.pending.icon} iconBg={ASSESSMENT_STATS.pending.iconBg} iconColor={ASSESSMENT_STATS.pending.iconColor}>
          <div className={styles.donutInfo} style={{ marginTop: '0.5rem' }}>
            <span className={styles.donutValue}>{ASSESSMENT_STATS.pending.value}</span>
            <span className={styles.donutSub}>{ASSESSMENT_STATS.pending.subText}</span>
          </div>
        </InfoCard>

        {/* Overdue */}
        <InfoCard title="Overdue" icon={ASSESSMENT_STATS.overdue.icon} iconBg={ASSESSMENT_STATS.overdue.iconBg} iconColor={ASSESSMENT_STATS.overdue.iconColor}>
          <div className={styles.donutInfo} style={{ marginTop: '0.5rem' }}>
            <span className={styles.donutValue}>{ASSESSMENT_STATS.overdue.value}</span>
            <span className={styles.donutSub}>{ASSESSMENT_STATS.overdue.subText}</span>
          </div>
        </InfoCard>
      </div>

      {/* Tabs and Search */}
      <div className={styles.tabsHeader} style={{ marginTop: '2rem', borderBottom: '1px solid rgba(240, 239, 237, 0.1)', paddingBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '1.5rem', overflowX: 'auto', flex: 1, paddingBottom: '0.5rem' }}>
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
            Filters
          </button>
        </div>
      </div>

      {/* Bottom Grid Layout */}
      <div className={styles.assessmentsBottomGrid}>
        
        {/* Left Table Area */}
        <div>
          <div className={styles.attendanceTableWrapper}>
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
                  <th></th>
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
                    <td>
                      <button style={{ background: 'transparent', border: 'none', color: 'rgba(240, 239, 237, 0.5)', cursor: 'pointer' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                      </button>
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

      {/* Footer Info Panels */}
      <div className={styles.assessmentsFooterGrid}>
        
        <InfoCard title="Grade Impact" icon="📈" iconBg="rgba(132, 169, 255, 0.1)" iconColor="#84a9ff">
          <span style={{ fontSize: '0.75rem', color: 'rgba(240, 239, 237, 0.5)' }}>Based on current assessments</span>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f0efed' }}>88.45%</span>
              <span style={{ fontSize: '0.85rem', color: 'rgba(240, 239, 237, 0.5)' }}>Current Average</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#5cc789', background: 'rgba(92, 199, 137, 0.1)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>↑ 2.35%</span>
              <span style={{ fontSize: '0.75rem', color: 'rgba(240, 239, 237, 0.5)', marginTop: '0.2rem' }}>vs last 30 days</span>
            </div>
          </div>
          
          {/* Chalk-style line chart mimicking Monthly Revenue */}
          <div className={styles.gradeImpactGraph} style={{ position: 'relative' }}>
            <svg width="100%" height="100%" viewBox="0 35 200 55" fill="none" preserveAspectRatio="none">
              <defs>
                <linearGradient id="lineGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="rgba(182, 142, 255, 0.4)" />
                  <stop offset="100%" stopColor="rgba(182, 142, 255, 0)" />
                </linearGradient>
              </defs>
              <path d="M 0 75 C 40 75, 60 70, 100 70 C 140 70, 160 35, 200 35 L 200 90 L 0 90 Z" fill="url(#lineGrad)" />
              <path d="M 0 75 C 40 75, 60 70, 100 70 C 140 70, 160 35, 200 35" fill="none" stroke="#b68eff" strokeWidth="2.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            </svg>
            {/* HTML/CSS dot tracking the exact end point of the graph (Y=35, which is top: 0 in this viewBox) */}
            <div style={{ position: 'absolute', right: '0', top: '0', width: '10px', height: '10px', background: '#b68eff', borderRadius: '50%', transform: 'translate(50%, -50%)', border: '2px solid #08120d' }}></div>
          </div>
        </InfoCard>

        <InfoCard title="Upcoming Deadlines" icon="⏰" iconBg="rgba(245, 200, 66, 0.1)" iconColor="#f5c842" headerRight={<span style={{ fontSize: '0.75rem', color: '#b68eff', fontWeight: 600, cursor: 'pointer' }}>View All</span>}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {UPCOMING_DEADLINES.map(deadline => (
              <div key={deadline.id} className={styles.deadlineItem}>
                <div className={styles.deadlineIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={deadline.iconColor} strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                </div>
                <div className={styles.deadlineContent}>
                  <span className={styles.deadlineTitle}>{deadline.title}</span>
                  <span className={styles.deadlineSubject}>{deadline.subject}</span>
                  <span className={styles.deadlineDate}>{deadline.date}</span>
                </div>
              </div>
            ))}
          </div>
        </InfoCard>

      </div>
    </>
  );
};
