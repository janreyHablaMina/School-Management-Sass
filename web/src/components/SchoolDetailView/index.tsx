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
