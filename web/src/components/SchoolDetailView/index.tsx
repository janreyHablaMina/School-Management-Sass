'use client';

import React from 'react';
import styles from './SchoolDetailView.module.css';

const getSchoolDetails = (schoolName: string) => {
  if (schoolName === "St. Mary's Academy") {
    return {
      principal: "Sr. Maria Theresa Santos",
      email: "info@stmarysacademy.edu.ph",
      phone: "(02) 8123 4567",
      address: "123 Rizal Avenue, Manila, Metro Manila 1000",
      schoolYear: "2024 - 2025",
      id: "SCH-00024",
      sections: 18,
      planLimit: "Up to 500 students",
      paymentMethod: "MasterCard •••• 4242",
      creditsUsed: 100,
      creditsTotal: 100,
      creditsReset: "June 31, 2025",
      activities: [
        { text: "New teacher Juan Dela Cruz was added", time: "May 31, 2025 • 10:30 AM" },
        { text: "Grade 7 - St. Benedict section was created", time: "May 30, 2025 • 03:15 PM" },
        { text: "New assignment \"Math Worksheet 1\" was posted", time: "May 30, 2025 • 02:45 PM" },
        { text: "Quiz \"Science Quiz Bee\" was created", time: "May 29, 2025 • 11:20 AM" },
        { text: "Attendance for May 29 was recorded", time: "May 28, 2025 • 09:10 AM" }
      ],
      creditsBreakdown: [
        { tool: "AI Quiz Generator", count: 45 },
        { tool: "AI Assignment Generator", count: 20 },
        { tool: "AI Reviewer Generator", count: 20 },
        { tool: "AI Lesson Summary", count: 10 },
        { tool: "AI Rubric Generator", count: 5 }
      ]
    };
  }
  
  return {
    principal: "Dr. Juanito dela Cruz",
    email: `contact@${schoolName.toLowerCase().replace(/[^a-z0-9]/g, '')}.edu.ph`,
    phone: "(02) 8987 6543",
    address: "University Boulevard, City Center",
    schoolYear: "2024 - 2025",
    id: "SCH-00" + Math.floor(Math.random() * 90000 + 10000),
    sections: 12,
    planLimit: "Up to 500 students",
    paymentMethod: "Visa •••• 9876",
    creditsUsed: 42,
    creditsTotal: 100,
    creditsReset: "June 30, 2025",
    activities: [
      { text: "Academic calendar updated", time: "May 28, 2025 • 08:30 AM" },
      { text: "Teacher roster finalized", time: "May 25, 2025 • 02:15 PM" }
    ],
    creditsBreakdown: [
      { tool: "AI Quiz Generator", count: 25 },
      { tool: "AI Assignment Generator", count: 12 },
      { tool: "AI Lesson Summary", count: 5 }
    ]
  };
};

export const SchoolDetailView = ({
  school,
  onBack,
  detailTab,
  setDetailTab,
}: {
  school: any;
  onBack: () => void;
  detailTab: string;
  setDetailTab: (tab: string) => void;
}) => {
  const details = getSchoolDetails(school.name);
  const totalStudents = school.students || 512;
  const totalTeachers = school.teachers || 45;
  const totalSections = details.sections || 18;

  const subTabs = [
    'Overview',
    'Subscription',
    'Students',
    'Teachers',
    'Sections',
    'AI Credits',
    'Reports',
    'Settings',
  ];

  return (
    <div>
      {/* Detail Header Panel */}
      <section className={styles.detailHeader}>
        <div className={styles.detailHeaderLeft}>
          <div className={styles.emblemWrapper}>
            <svg width="48" height="48" viewBox="0 0 100 100" style={{ filter: 'url(#chalk-wobble)' }}>
              <path
                d="M 50 10 C 70 12, 85 10, 85 35 C 85 65, 50 90, 50 90 C 50 90, 15 65, 15 35 C 15 10, 30 12, 50 10 Z"
                fill="rgba(245, 200, 66, 0.1)"
                stroke="#f5c842"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M 22 35 L 78 35 M 50 10 L 50 90"
                stroke="rgba(240, 239, 237, 0.4)"
                strokeWidth="2"
                strokeDasharray="2 3"
              />
              <path
                d="M 40 48 Q 50 44 60 48 M 40 55 Q 50 51 60 55 M 50 48 L 50 58"
                fill="none"
                stroke="#ff8a8a"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div>
            <div className={styles.schoolTitleRow}>
              <h2 className={styles.schoolMainName}>{school.name}</h2>
              <span className={`status-badge active`}>{school.status}</span>
            </div>
            <div className={styles.schoolSubInfo}>
              <span className={styles.schoolSubInfoItem}>📍 {school.location}</span>
              <span className={styles.schoolSubInfoItem}>🆔 ID: {details.id}</span>
              <span className={styles.schoolSubInfoItem}>📅 Joined: {school.joined}</span>
            </div>
          </div>
        </div>

        {/* Stats Tiles Grid */}
        <div className={styles.detailStatsGrid}>
          <div className={styles.detailStatsTile}>
            <span className={styles.detailStatsVal}>{totalStudents}</span>
            <span className={styles.detailStatsLabel}>Students</span>
          </div>
          <div className={styles.detailStatsTile}>
            <span className={styles.detailStatsVal}>{totalTeachers}</span>
            <span className={styles.detailStatsLabel}>Teachers</span>
          </div>
          <div className={styles.detailStatsTile}>
            <span className={styles.detailStatsVal}>{totalSections}</span>
            <span className={styles.detailStatsLabel}>Sections</span>
          </div>
          <div className={styles.detailStatsTile}>
            <span className={styles.detailStatsVal}>{school.revenue || '₱2,999'}</span>
            <span className={styles.detailStatsLabel}>Monthly Rev</span>
          </div>
          <div className={styles.detailStatsTile}>
            <span className={styles.detailStatsVal} style={{ fontSize: '1.25rem', color: '#84a9ff' }}>
              {school.plan || 'School Plan'}
            </span>
            <span className={styles.detailStatsLabel}>Plan</span>
          </div>
        </div>
      </section>

      {/* Sub Tabs Bar */}
      <nav className={styles.detailTabsBar}>
        {subTabs.map((tab) => (
          <button
            key={tab}
            className={`${styles.detailTabButton} ${detailTab === tab ? styles.detailTabButtonActive : ''}`}
            onClick={() => setDetailTab(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>

      {/* Tab Contents */}
      {detailTab === 'Overview' ? (
        <section className={styles.detailBodyGrid}>
          {/* Student Overview Chart Card */}
          <div className={`${styles.detailCard} ${styles.colSpan4}`}>
            <div className={styles.detailCardHeader}>
              <h3 className={styles.detailCardTitle}>Student Overview</h3>
              <span className={styles.detailCardLink} onClick={() => setDetailTab('Students')}>View Details</span>
            </div>
            
            <div className={styles.donutWrapper}>
              <div className={styles.donutChartContainer}>
                <svg width="100%" height="100%" viewBox="0 0 120 120" style={{ filter: 'url(#chalk-wobble)' }}>
                  <circle cx="60" cy="60" r="45" fill="none" stroke="#84a9ff" strokeWidth="12" strokeDasharray="70.68 282.74" strokeDashoffset="0" transform="rotate(-90 60 60)" />
                  <circle cx="60" cy="60" r="45" fill="none" stroke="#f5c842" strokeWidth="12" strokeDasharray="71.8 282.74" strokeDashoffset="-70.68" transform="rotate(-90 60 60)" />
                  <circle cx="60" cy="60" r="45" fill="none" stroke="#4df58a" strokeWidth="12" strokeDasharray="69.55 282.74" strokeDashoffset="-142.48" transform="rotate(-90 60 60)" />
                  <circle cx="60" cy="60" r="45" fill="none" stroke="#ff8a8a" strokeWidth="12" strokeDasharray="70.7 282.74" strokeDashoffset="-212.03" transform="rotate(-90 60 60)" />
                </svg>
                <div className={styles.donutCenterText}>
                  <span className={styles.donutCenterVal}>{totalStudents}</span>
                  <span className={styles.donutCenterLabel}>Students</span>
                </div>
              </div>

              <div className={styles.legendList}>
                <div className={styles.legendItem}>
                  <div className={styles.legendColorLabel}>
                    <span className={styles.legendDot} style={{ background: '#84a9ff' }} />
                    <span>Grade 7</span>
                  </div>
                  <span className={styles.legendValue}>128 (25.0%)</span>
                </div>
                <div className={styles.legendItem}>
                  <div className={styles.legendColorLabel}>
                    <span className={styles.legendDot} style={{ background: '#f5c842' }} />
                    <span>Grade 8</span>
                  </div>
                  <span className={styles.legendValue}>130 (25.4%)</span>
                </div>
                <div className={styles.legendItem}>
                  <div className={styles.legendColorLabel}>
                    <span className={styles.legendDot} style={{ background: '#4df58a' }} />
                    <span>Grade 9</span>
                  </div>
                  <span className={styles.legendValue}>126 (24.6%)</span>
                </div>
                <div className={styles.legendItem}>
                  <div className={styles.legendColorLabel}>
                    <span className={styles.legendDot} style={{ background: '#ff8a8a' }} />
                    <span>Grade 10</span>
                  </div>
                  <span className={styles.legendValue}>128 (25.0%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Teacher Overview Chart Card */}
          <div className={`${styles.detailCard} ${styles.colSpan4}`}>
            <div className={styles.detailCardHeader}>
              <h3 className={styles.detailCardTitle}>Teacher Overview</h3>
              <span className={styles.detailCardLink} onClick={() => setDetailTab('Teachers')}>View Details</span>
            </div>

            <div className={styles.donutWrapper}>
              <div className={styles.donutChartContainer}>
                <svg width="100%" height="100%" viewBox="0 0 120 120" style={{ filter: 'url(#chalk-wobble)' }}>
                  <circle cx="60" cy="60" r="45" fill="none" stroke="#84a9ff" strokeWidth="12" strokeDasharray="238.6 282.74" strokeDashoffset="0" transform="rotate(-90 60 60)" />
                  <circle cx="60" cy="60" r="45" fill="none" stroke="#f5c842" strokeWidth="12" strokeDasharray="44.1 282.74" strokeDashoffset="-238.6" transform="rotate(-90 60 60)" />
                </svg>
                <div className={styles.donutCenterText}>
                  <span className={styles.donutCenterVal}>{totalTeachers}</span>
                  <span className={styles.donutCenterLabel}>Teachers</span>
                </div>
              </div>

              <div className={styles.legendList}>
                <div className={styles.legendItem}>
                  <div className={styles.legendColorLabel}>
                    <span className={styles.legendDot} style={{ background: '#84a9ff' }} />
                    <span>Full-time</span>
                  </div>
                  <span className={styles.legendValue}>38 (84.4%)</span>
                </div>
                <div className={styles.legendItem}>
                  <div className={styles.legendColorLabel}>
                    <span className={styles.legendDot} style={{ background: '#f5c842' }} />
                    <span>Part-time</span>
                  </div>
                  <span className={styles.legendValue}>7 (15.6%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* School Information Card */}
          <div className={`${styles.detailCard} ${styles.colSpan4}`}>
            <div className={styles.detailCardHeader}>
              <h3 className={styles.detailCardTitle}>School Information</h3>
            </div>
            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Principal</span>
                <span className={styles.infoValue}>{details.principal}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Email</span>
                <span className={styles.infoValue}>{details.email}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Phone</span>
                <span className={styles.infoValue}>{details.phone}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Address</span>
                <span className={styles.infoValue} style={{ maxWidth: '170px', fontSize: '0.8rem' }}>{details.address}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>School Year</span>
                <span className={styles.infoValue}>{details.schoolYear}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Status</span>
                <span className={styles.infoValue} style={{ color: '#4df58a', fontWeight: 'bold' }}>Active</span>
              </div>
            </div>
          </div>

          {/* Subscription & Billing Card */}
          <div className={`${styles.detailCard} ${styles.colSpan4}`}>
            <div className={styles.detailCardHeader}>
              <h3 className={styles.detailCardTitle}>Subscription & Billing</h3>
            </div>
            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Current Plan</span>
                <span className={styles.infoValue}>{details.planLimit}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Billing Cycle</span>
                <span className={styles.infoValue}>Monthly</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Monthly Fee</span>
                <span className={styles.infoValue}>{school.revenue || '₱2,999'}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Renewal Date</span>
                <span className={styles.infoValue}>{details.creditsReset} <span className="status-badge pending" style={{ fontSize: '0.65rem', padding: '1px 4px' }}>Today</span></span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Payment Method</span>
                <span className={styles.infoValue}>{details.paymentMethod}</span>
              </div>
            </div>
            <div style={{ marginTop: '1.2rem', textAlign: 'center' }}>
              <button className="chalk-btn" style={{ fontSize: '0.9rem', padding: '0.35rem 1rem' }} onClick={() => setDetailTab('Subscription')}>
                View Subscription
              </button>
            </div>
          </div>

          {/* AI Credits Card */}
          <div className={`${styles.detailCard} ${styles.colSpan4}`}>
            <div className={styles.detailCardHeader}>
              <h3 className={styles.detailCardTitle}>AI Credits Usage</h3>
              <span className={styles.detailCardLink} onClick={() => setDetailTab('AI Credits')}>View Details</span>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.4rem', fontFamily: 'Caveat, cursive' }}>
                <span style={{ fontWeight: 'bold', color: '#f5c842' }}>{details.creditsUsed} / {details.creditsTotal} credits used</span>
              </div>
              <div className="progress-bar-container" style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden', height: '6px' }}>
                <div className="progress-bar-fill" style={{ width: `${(details.creditsUsed / details.creditsTotal) * 100}%`, height: '100%', background: '#84a9ff' }} />
              </div>
              <span style={{ fontSize: '0.7rem', color: 'rgba(240, 239, 237, 0.4)', marginTop: '0.3rem', display: 'block' }}>Resets on {details.creditsReset}</span>
            </div>
            <div className={styles.creditList}>
              {details.creditsBreakdown.map((item, idx) => (
                <div key={idx} className={styles.creditItem}>
                  <span className={styles.creditTool}>{item.tool}</span>
                  <span className={styles.creditCount}>{item.count} credits</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity Card */}
          <div className={`${styles.detailCard} ${styles.colSpan4}`}>
            <div className={styles.detailCardHeader}>
              <h3 className={styles.detailCardTitle}>Recent Activity</h3>
              <span className={styles.detailCardLink} onClick={() => alert('Viewing all logs for ' + school.name)}>View All</span>
            </div>
            <div className={styles.activityList}>
              {details.activities.map((act, idx) => (
                <div key={idx} className={styles.activityItem}>
                  <span className={styles.activityDot} style={{ background: idx === 0 ? '#4df58a' : idx === 1 ? '#84a9ff' : '#f5c842' }} />
                  <div className={styles.activityContent}>
                    <span className={styles.activityText}>{act.text}</span>
                    <span className={styles.activityTime}>{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Overview Card */}
          <div className={`${styles.detailCard} ${styles.colSpan12}`}>
            <div className={styles.detailCardHeader}>
              <h3 className={styles.detailCardTitle}>Revenue Overview</h3>
              <select className={styles.chartSelect} defaultValue="6months">
                <option value="6months">Last 6 Months</option>
                <option value="year">Year 2025</option>
              </select>
            </div>
            
            <div className={styles.revenueRowContent}>
              <div className={styles.revenueLeftCol}>
                <span className={styles.revenueVal}>₱32,989</span>
                <span className={styles.revenueSub}>Total Revenue (All Time)</span>
                <span className={styles.revenueTrend}>
                  ↑ 12.5% vs last month
                </span>
              </div>

              <div className={styles.revenueChartArea} style={{ flex: 1, marginTop: 0 }}>
                <svg width="100%" height="100%" viewBox="0 0 1200 180" fill="none" style={{ filter: 'url(#chalk-wobble)' }}>
                  <line x1="40" y1="30" x2="1160" y2="30" stroke="rgba(240, 239, 237, 0.08)" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="40" y1="70" x2="1160" y2="70" stroke="rgba(240, 239, 237, 0.08)" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="40" y1="110" x2="1160" y2="110" stroke="rgba(240, 239, 237, 0.08)" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="40" y1="150" x2="1160" y2="150" stroke="rgba(240, 239, 237, 0.18)" strokeWidth="1.5" />
                  <line x1="40" y1="20" x2="40" y2="150" stroke="rgba(240, 239, 237, 0.18)" strokeWidth="1.5" />

                  <text x="65" y="168" fill="rgba(240, 239, 237, 0.45)" fontSize="9">Dec 2024</text>
                  <text x="279" y="168" fill="rgba(240, 239, 237, 0.45)" fontSize="9">Jan 2025</text>
                  <text x="493" y="168" fill="rgba(240, 239, 237, 0.45)" fontSize="9">Feb 2025</text>
                  <text x="707" y="168" fill="rgba(240, 239, 237, 0.45)" fontSize="9">Mar 2025</text>
                  <text x="921" y="168" fill="rgba(240, 239, 237, 0.45)" fontSize="9">Apr 2025</text>
                  <text x="1135" y="168" fill="rgba(240, 239, 237, 0.45)" fontSize="9">May 2025</text>

                  <path
                    d="M 65 140 L 279 105 L 493 98 L 707 112 L 921 80 L 1135 60"
                    fill="none"
                    stroke="#84a9ff"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <circle cx="65" cy="140" r="4.5" fill="#f5c842" stroke="#08120d" strokeWidth="1.5" />
                  <circle cx="279" cy="105" r="4.5" fill="#f5c842" stroke="#08120d" strokeWidth="1.5" />
                  <circle cx="493" cy="98" r="4.5" fill="#f5c842" stroke="#08120d" strokeWidth="1.5" />
                  <circle cx="707" cy="112" r="4.5" fill="#f5c842" stroke="#08120d" strokeWidth="1.5" />
                  <circle cx="921" cy="80" r="4.5" fill="#f5c842" stroke="#08120d" strokeWidth="1.5" />
                  <circle cx="1135" cy="60" r="4.5" fill="#f5c842" stroke="#08120d" strokeWidth="1.5" />

                  <text x="65" y="125" fill="#f5c842" fontSize="9" fontWeight="bold" textAnchor="middle">₱10k</text>
                  <text x="279" y="90" fill="#f5c842" fontSize="9" fontWeight="bold" textAnchor="middle">₱20k</text>
                  <text x="493" y="83" fill="#f5c842" fontSize="9" fontWeight="bold" textAnchor="middle">₱22k</text>
                  <text x="707" y="97" fill="#f5c842" fontSize="9" fontWeight="bold" textAnchor="middle">₱18k</text>
                  <text x="921" y="65" fill="#f5c842" fontSize="9" fontWeight="bold" textAnchor="middle">₱29k</text>
                  <text x="1135" y="45" fill="#f5c842" fontSize="9" fontWeight="bold" textAnchor="middle">₱33k</text>
                </svg>
              </div>
            </div>
          </div>
        </section>
      ) : detailTab === 'Subscription' ? (
        <section className={styles.detailBodyGrid}>
          {/* 1. Current Subscription Card (span 7) */}
          <div className={`${styles.detailCard} ${styles.colSpan8}`} style={{ gridColumn: 'span 7' }}>
            <div className={styles.detailCardHeader}>
              <h3 className={styles.detailCardTitle}>Current Subscription</h3>
              <span className="status-badge active">Active</span>
            </div>
            <div className={styles.subscriptionSplit}>
              <div className={styles.subCardBadge}>
                <svg className={styles.badgeCrown} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'url(#chalk-wobble)' }}>
                  <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" fill="rgba(245, 200, 66, 0.1)"/>
                  <path d="M3 20h18"/>
                </svg>
                <h4 className={styles.badgePlanTitle}>School Plan</h4>
                <span className={styles.badgePlanSub}>Up to 500 students</span>
                <span className={styles.badgePlanPrice}>₱2,999<span className={styles.badgePlanUnit}>/month</span></span>
              </div>
              <div className={styles.infoList} style={{ flex: 1 }}>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Status</span>
                  <span className={styles.infoValue} style={{ color: '#4df58a', fontWeight: 'bold' }}>Active</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Billing Cycle</span>
                  <span className={styles.infoValue}>Monthly</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Current Period</span>
                  <span className={styles.infoValue}>May 31, 2025 – Jun 30, 2025</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Renewal Date</span>
                  <span className={styles.infoValue}>Jun 30, 2025 <span style={{ color: '#4df58a' }}>(30 days left)</span></span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Monthly Fee</span>
                  <span className={styles.infoValue}>₱3,999 <span style={{ fontSize: '0.7rem', color: 'rgba(240, 239, 237, 0.4)' }}>(incl. Add-ons)</span></span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Payment Method</span>
                  <span className={styles.infoValue}>💳 MasterCard •••• 4242</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Last Payment</span>
                  <span className={styles.infoValue}>May 31, 2025 <span className="status-badge active" style={{ fontSize: '0.65rem', padding: '1px 5px', marginLeft: '0.4rem' }}>Paid</span></span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Next Payment</span>
                  <span className={styles.infoValue}>Jun 30, 2025</span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Subscription Usage Card (span 5) */}
          <div className={`${styles.detailCard} ${styles.colSpan4}`} style={{ gridColumn: 'span 5' }}>
            <div className={styles.detailCardHeader}>
              <h3 className={styles.detailCardTitle}>Subscription Usage</h3>
              <span className={styles.detailCardLink}>As of May 31, 2025</span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginTop: '0.5rem' }}>
              <div className={styles.usageProgressRow}>
                <div className={styles.usageRowHeader}>
                  <span className={styles.usageRowLabel}>Students</span>
                  <span className={styles.usageRowVal}>
                    <span style={{ color: '#ff8a8a', fontWeight: 'bold' }}>512</span> / 500
                  </span>
                  <span className={styles.usageRowPercent} style={{ color: '#ff8a8a' }}>102%</span>
                </div>
                <div className={styles.progressBarOuter}>
                  <div className={styles.progressBarInner} style={{ width: '100%', background: '#ff8a8a' }} />
                </div>
              </div>

              <div className={styles.usageProgressRow}>
                <div className={styles.usageRowHeader}>
                  <span className={styles.usageRowLabel}>Teachers</span>
                  <span className={styles.usageRowVal}>45 / Unlimited</span>
                  <span className={styles.usageRowPercent} style={{ color: 'rgba(240, 239, 237, 0.45)' }}>-</span>
                </div>
                <div className={styles.progressBarOuter}>
                  <div className={styles.progressBarInner} style={{ width: '35%', background: '#84a9ff' }} />
                </div>
              </div>

              <div className={styles.usageProgressRow}>
                <div className={styles.usageRowHeader}>
                  <span className={styles.usageRowLabel}>Parent Accounts</span>
                  <span className={styles.usageRowVal}>620 / Unlimited</span>
                  <span className={styles.usageRowPercent} style={{ color: 'rgba(240, 239, 237, 0.45)' }}>-</span>
                </div>
                <div className={styles.progressBarOuter}>
                  <div className={styles.progressBarInner} style={{ width: '55%', background: '#84a9ff' }} />
                </div>
              </div>

              <div className={styles.usageProgressRow}>
                <div className={styles.usageRowHeader}>
                  <span className={styles.usageRowLabel}>AI Credits (Included)</span>
                  <span className={styles.usageRowVal}>100 / 100</span>
                  <span className={styles.usageRowPercent} style={{ color: '#4df58a' }}>100%</span>
                </div>
                <div className={styles.progressBarOuter}>
                  <div className={styles.progressBarInner} style={{ width: '100%', background: '#4df58a' }} />
                </div>
              </div>
            </div>
          </div>

          {/* 3. Add-ons & Extras Card (span 8) */}
          <div className={`${styles.detailCard} ${styles.colSpan8}`}>
            <div className={styles.detailCardHeader}>
              <h3 className={styles.detailCardTitle}>Add-ons & Extras</h3>
            </div>
            
            <div className={styles.addonGrid}>
              <div className={styles.addonSubCard}>
                <div className={styles.addonHeader}>
                  <div className={styles.addonIconBox}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'url(#chalk-wobble)' }}>
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <h4 className={styles.addonTitle}>Additional Students</h4>
                </div>
                <p className={styles.addonDesc}>
                  You have 1 additional student slot addon package (adds 500 student capacity).
                </p>
                <div className={styles.infoList}>
                  <div className={styles.addonMetricRow}>
                    <span className={styles.addonMetricLabel}>Total Allowed Students</span>
                    <span className={styles.addonMetricVal}>1,000</span>
                  </div>
                  <div className={styles.addonMetricRow}>
                    <span className={styles.addonMetricLabel}>Additional Cost</span>
                    <span className={styles.addonMetricVal} style={{ color: '#f5c842' }}>₱1,000 / month</span>
                  </div>
                </div>
                <button className="chalk-btn" style={{ padding: '0.4rem', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                  Manage Additional Students
                </button>
              </div>

              <div className={styles.addonSubCard}>
                <div className={styles.addonHeader}>
                  <div className={styles.addonIconBox}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'url(#chalk-wobble)' }}>
                      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                    </svg>
                  </div>
                  <h4 className={styles.addonTitle}>Additional AI Credits</h4>
                </div>
                <p className={styles.addonDesc}>
                  You have 200 additional AI credits active for this billing cycle.
                </p>
                <div className={styles.infoList}>
                  <div className={styles.addonMetricRow}>
                    <span className={styles.addonMetricLabel}>Total Additional Credits</span>
                    <span className={styles.addonMetricVal}>200</span>
                  </div>
                  <div className={styles.addonMetricRow}>
                    <span className={styles.addonMetricLabel}>Additional Cost</span>
                    <span className={styles.addonMetricVal} style={{ color: '#f5c842' }}>₱398 / month</span>
                  </div>
                </div>
                <button className="chalk-btn" style={{ padding: '0.4rem', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                  Manage AI Credits
                </button>
              </div>
            </div>
          </div>

          {/* 4. Billing Actions Card (span 4) */}
          <div className={`${styles.detailCard} ${styles.colSpan4}`}>
            <div className={styles.detailCardHeader}>
              <h3 className={styles.detailCardTitle}>Billing Actions</h3>
            </div>
            
            <div className={styles.actionList}>
              <div className={styles.actionRow}>
                <div className={styles.actionRowContent}>
                  <div className={styles.actionIcon}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                    </svg>
                  </div>
                  <div className={styles.actionTextContainer}>
                    <span className={styles.actionLabelTitle}>Upgrade / Change Plan</span>
                    <span className={styles.actionLabelSub}>Upgrade or downgrade plan</span>
                  </div>
                </div>
                <span className={styles.actionChevron}>❯</span>
              </div>

              <div className={styles.actionRow}>
                <div className={styles.actionRowContent}>
                  <div className={styles.actionIcon}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                      <line x1="1" y1="10" x2="23" y2="10" />
                    </svg>
                  </div>
                  <div className={styles.actionTextContainer}>
                    <span className={styles.actionLabelTitle}>Update Payment Method</span>
                    <span className={styles.actionLabelSub}>Update billing information</span>
                  </div>
                </div>
                <span className={styles.actionChevron}>❯</span>
              </div>

              <div className={styles.actionRow}>
                <div className={styles.actionRowContent}>
                  <div className={styles.actionIcon}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10 9 9 9 8 9" />
                    </svg>
                  </div>
                  <div className={styles.actionTextContainer}>
                    <span className={styles.actionLabelTitle}>View Invoices</span>
                    <span className={styles.actionLabelSub}>View and download past invoices</span>
                  </div>
                </div>
                <span className={styles.actionChevron}>❯</span>
              </div>

              <div className={`${styles.actionRow} ${styles.actionRowDelete}`}>
                <div className={styles.actionRowContent}>
                  <div className={styles.actionIcon}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
                      <line x1="12" y1="2" x2="12" y2="12" />
                    </svg>
                  </div>
                  <div className={styles.actionTextContainer}>
                    <span className={styles.actionLabelTitle} style={{ color: '#ff8a8a' }}>Cancel Subscription</span>
                    <span className={styles.actionLabelSub}>Cancel subscription service</span>
                  </div>
                </div>
                <span className={styles.actionChevron}>❯</span>
              </div>
            </div>
          </div>

          {/* 5. Subscription History Card (span 8) */}
          <div className={`${styles.detailCard} ${styles.colSpan8}`}>
            <div className={styles.detailCardHeader}>
              <h3 className={styles.detailCardTitle}>Subscription History</h3>
            </div>
            
            <div className={styles.historyTableWrapper}>
              <table className={styles.historyTable}>
                <thead>
                  <tr>
                    <th>Invoice #</th>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Payment Method</th>
                    <th>Receipt</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.invoiceNum}>INV-2025-00056</td>
                    <td>May 31, 2025</td>
                    <td>School Plan - Monthly (May 31 – Jun 30, 2025)</td>
                    <td style={{ fontWeight: 'bold' }}>₱3,999</td>
                    <td><span className="status-badge active" style={{ fontSize: '0.65rem', padding: '1px 5px' }}>Paid</span></td>
                    <td>💳 •••• 4242</td>
                    <td>
                      <button className={styles.downloadIconBtn}>
                        📥
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.invoiceNum}>INV-2025-00045</td>
                    <td>Apr 30, 2025</td>
                    <td>School Plan - Monthly (Apr 30 – May 31, 2025)</td>
                    <td style={{ fontWeight: 'bold' }}>₱3,999</td>
                    <td><span className="status-badge active" style={{ fontSize: '0.65rem', padding: '1px 5px' }}>Paid</span></td>
                    <td>💳 •••• 4242</td>
                    <td>
                      <button className={styles.downloadIconBtn}>
                        📥
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.invoiceNum}>INV-2025-00034</td>
                    <td>Mar 31, 2025</td>
                    <td>School Plan - Monthly (Mar 31 – Apr 30, 2025)</td>
                    <td style={{ fontWeight: 'bold' }}>₱2,999</td>
                    <td><span className="status-badge active" style={{ fontSize: '0.65rem', padding: '1px 5px' }}>Paid</span></td>
                    <td>💳 •••• 4242</td>
                    <td>
                      <button className={styles.downloadIconBtn}>
                        📥
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={styles.historyFooterLink}>
              <span className={styles.detailCardLink} onClick={() => alert('Loading full invoice database...')}>View All Invoices</span>
            </div>
          </div>

          {/* 6. Upcoming Renewal Card (span 4) */}
          <div className={`${styles.detailCard} ${styles.colSpan4}`}>
            <div className={styles.renewalBox}>
              <div className={styles.renewalHeader}>
                <div className={styles.renewalIconBox}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'url(#chalk-wobble)' }}>
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <h4 className={styles.renewalTitle}>Upcoming Renewal</h4>
              </div>
              
              <div className={styles.renewalText}>
                Your subscription will renew on:
                <span className={styles.renewalDateVal}>June 30, 2025</span>
              </div>

              <div className={styles.renewalBadgeRow}>
                <span className="status-badge pending" style={{ fontSize: '0.75rem', padding: '2px 6px' }}>30 days left</span>
              </div>

              <p className={styles.renewalSubtext}>
                Make sure your payment method is active to avoid service interruption.
              </p>

              <button className="chalk-btn" style={{ width: '100%', padding: '0.45rem', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                Send Renewal Reminder
              </button>
            </div>
          </div>
        </section>
      ) : detailTab === 'Students' ? (
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
                  <th style={{ width: '40px', textAlign: 'center' }}><input type="checkbox" /></th>
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
                {[
                  { name: 'Juan Miguel Dela Cruz', id: 'STU-2025-0001', grade: 'Grade 7 - St. Augustine', gender: 'Male', dob: 'Mar 12, 2011', status: 'Active', join: 'May 31, 2025' },
                  { name: 'Maria Sofia Reyes', id: 'STU-2025-0002', grade: 'Grade 7 - St. Augustine', gender: 'Female', dob: 'Jul 24, 2011', status: 'Active', join: 'May 31, 2025' },
                  { name: 'Rafael Antonio Garcia', id: 'STU-2025-0003', grade: 'Grade 8 - St. Benedict', gender: 'Male', dob: 'Feb 5, 2011', status: 'Active', join: 'May 31, 2025' },
                  { name: 'Angela Marie Santos', id: 'STU-2025-0004', grade: 'Grade 8 - St. Benedict', gender: 'Female', dob: 'Oct 18, 2010', status: 'Active', join: 'May 31, 2025' },
                  { name: 'Gabriel Matthew Lim', id: 'STU-2025-0005', grade: 'Grade 9 - St. Francis', gender: 'Male', dob: 'Jan 7, 2010', status: 'Active', join: 'May 31, 2025' },
                  { name: 'Kimberly Anne Tan', id: 'STU-2025-0006', grade: 'Grade 9 - St. Francis', gender: 'Female', dob: 'Aug 30, 2009', status: 'Inactive', join: 'May 31, 2025' },
                  { name: 'Liam Nathaniel Co', id: 'STU-2025-0007', grade: 'Grade 10 - St. John', gender: 'Male', dob: 'May 14, 2009', status: 'Active', join: 'May 31, 2025' },
                  { name: 'Beatriz Isabella Cruz', id: 'STU-2025-0008', grade: 'Grade 10 - St. John', gender: 'Female', dob: 'Nov 3, 2009', status: 'Active', join: 'May 31, 2025' },
                ].map((s, i) => (
                  <tr key={i}>
                    <td style={{ textAlign: 'center' }}><input type="checkbox" /></td>
                    <td>
                      <div className={styles.studentProfileCell}>
                        <div className={styles.studentAvatar} style={{ background: s.gender === 'Male' ? '#84a9ff' : '#ff8a8a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0a1911', fontWeight: 'bold', fontSize: '0.75rem' }}>
                          {s.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
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
                      <button style={{ background: 'transparent', border: 'none', color: 'rgba(240, 239, 237, 0.6)', cursor: 'pointer' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="1" />
                          <circle cx="12" cy="5" r="1" />
                          <circle cx="12" cy="19" r="1" />
                        </svg>
                      </button>
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
              <span style={{ margin: '0 0.5rem' }}>...</span>
              <button className={styles.pageBtn}>64</button>
              <button className={styles.pageBtn}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        </section>
      ) : (
        <div style={{
          border: '2px solid rgba(240, 239, 237, 0.45)',
          borderRadius: '12px 14px 10px 13px / 14px 10px 13px 10px',
          padding: '3rem',
          background: 'rgba(10, 25, 17, 0.1)',
          textAlign: 'center',
          marginTop: '1rem'
        }}>
          <h3 style={{ fontFamily: 'Caveat, cursive', fontSize: '2rem', color: '#f5c842', marginBottom: '1rem' }}>
            {detailTab} Management
          </h3>
          <p style={{ color: 'rgba(240,239,237,0.6)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
            This section is currently under development. Here you will manage all {detailTab.toLowerCase()} settings and view full logs for {school.name}.
          </p>
          <button className="chalk-btn" onClick={onBack}>
            Back to registry
          </button>
        </div>
      )}
    </div>
  );
};
