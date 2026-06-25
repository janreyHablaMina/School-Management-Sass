'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import styles from './admin.module.css';
import { SchoolDetailView } from '../../components/SchoolDetailView';

/* ────────────────────────────────────────────────────────────
   Chalkboard SVG Filter for hand-drawn/wobbly aesthetic
   ──────────────────────────────────────────────────────────── */
const ChalkFilter = () => (
  <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }}>
    <defs>
      <filter id="chalk-wobble">
        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
  </svg>
);

/* ────────────────────────────────────────────────────────────
   SVG Chalk Charts with Displacement Wobble Filters
   ──────────────────────────────────────────────────────────── */

// 1. Large Line Chart for "Schools Overview"
const ChalkLineChart = () => (
  <svg width="100%" height="100%" viewBox="0 0 500 180" fill="none" style={{ filter: 'url(#chalk-wobble)' }}>
    {/* Grid lines */}
    <line x1="40" y1="30" x2="480" y2="30" stroke="rgba(240, 239, 237, 0.12)" strokeWidth="1" strokeDasharray="3 3" />
    <line x1="40" y1="70" x2="480" y2="70" stroke="rgba(240, 239, 237, 0.12)" strokeWidth="1" strokeDasharray="3 3" />
    <line x1="40" y1="110" x2="480" y2="110" stroke="rgba(240, 239, 237, 0.12)" strokeWidth="1" strokeDasharray="3 3" />
    <line x1="40" y1="150" x2="480" y2="150" stroke="rgba(240, 239, 237, 0.22)" strokeWidth="1.5" />
    <line x1="40" y1="20" x2="40" y2="150" stroke="rgba(240, 239, 237, 0.22)" strokeWidth="1.5" />

    {/* Chart Line Path */}
    <path
      d="M 40 120 Q 110 100 180 90 T 320 85 T 410 75 T 480 65"
      fill="none"
      stroke="rgba(132, 169, 255, 0.85)"
      strokeWidth="2.5"
      strokeLinecap="round"
    />

    {/* Highlight circle on May 16 */}
    <circle cx="210" cy="88" r="5" fill="#f5c842" stroke="#08120d" strokeWidth="2" />
    <line x1="210" y1="88" x2="210" y2="150" stroke="rgba(245, 200, 66, 0.35)" strokeWidth="1" strokeDasharray="2 2" />

    {/* Tooltip on May 16 */}
    <g transform="translate(220, 60)">
      <rect x="0" y="0" width="110" height="32" rx="4" fill="rgba(8, 18, 13, 0.9)" stroke="rgba(240, 239, 237, 0.25)" strokeWidth="1" />
      <text x="8" y="13" fill="rgba(240, 239, 237, 0.42)" fontSize="8" fontWeight="600">MAY 16, 2025</text>
      <text x="8" y="24" fill="rgba(240, 239, 237, 0.95)" fontSize="9" fontWeight="700">Total Schools: 24</text>
    </g>

    {/* X Axis Labels */}
    <g fill="rgba(240, 239, 237, 0.45)" fontSize="8" fontWeight="600">
      <text x="35" y="165">May 1</text>
      <text x="110" y="165">May 6</text>
      <text x="190" y="165">May 11</text>
      <text x="270" y="165">May 16</text>
      <text x="350" y="165">May 21</text>
      <text x="420" y="165">May 26</text>
      <text x="470" y="165">May 31</text>
    </g>

    {/* Y Axis Labels */}
    <g fill="rgba(240, 239, 237, 0.45)" fontSize="8" fontWeight="600" textAnchor="end">
      <text x="30" y="33">30</text>
      <text x="30" y="73">20</text>
      <text x="30" y="113">10</text>
      <text x="30" y="153">0</text>
    </g>
  </svg>
);

// 2. Donut Chart for "Subscription Status"
const ChalkDonutChart = () => (
  <svg width="100%" height="100%" viewBox="0 0 120 120" style={{ filter: 'url(#chalk-wobble)' }}>
    {/* Base circle background */}
    <circle cx="60" cy="60" r="38" fill="none" stroke="rgba(240, 239, 237, 0.05)" strokeWidth="10" />

    {/* Expired Segment (4.17% = 1/24) */}
    <circle
      cx="60" cy="60" r="38"
      fill="none"
      stroke="#e05e5e"
      strokeWidth="10"
      strokeDasharray="10 238.76"
      strokeDashoffset="-228.76"
      strokeLinecap="round"
    />

    {/* Expiring Soon Segment (4.17% = 1/24) */}
    <circle
      cx="60" cy="60" r="38"
      fill="none"
      stroke="#f5c842"
      strokeWidth="10"
      strokeDasharray="10 238.76"
      strokeDashoffset="-218.76"
      strokeLinecap="round"
    />

    {/* Active Segment (91.67% = 22/24) */}
    <circle
      cx="60" cy="60" r="38"
      fill="none"
      stroke="#8affad"
      strokeWidth="10"
      strokeDasharray="218.76 238.76"
      strokeDashoffset="0"
      strokeLinecap="round"
    />

    {/* Inner Label values (Total) */}
    <text x="60" y="58" fill="#f5c842" fontSize="20" fontWeight="700" fontFamily="Caveat, cursive" textAnchor="middle">24</text>
    <text x="60" y="70" fill="rgba(240, 239, 237, 0.42)" fontSize="8" fontWeight="700" textAnchor="middle">TOTAL</text>
  </svg>
);

// 3. Mini Line Chart for "Monthly Revenue"
const ChalkMiniLineChart = () => (
  <svg width="100%" height="100%" viewBox="0 0 200 90" fill="none" style={{ filter: 'url(#chalk-wobble)' }}>
    <path
      d="M 10 70 Q 50 60 90 65 T 140 50 T 190 35"
      fill="none"
      stroke="rgba(74, 144, 226, 0.85)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="190" cy="35" r="4" fill="#f5c842" stroke="#08120d" strokeWidth="1.5" />
    <path
      d="M 10 70 L 50 60 L 90 65 L 140 50 L 190 35 L 190 85 L 10 85 Z"
      fill="rgba(74, 144, 226, 0.05)"
    />
  </svg>
);

// 4. Large Circle Gauge for "AI Credits Usage" (Radial progress)
const ChalkRadialGauge = () => (
  <svg width="100%" height="100%" viewBox="0 0 120 120" style={{ filter: 'url(#chalk-wobble)' }}>
    {/* Background dashed circle */}
    <circle
      cx="60"
      cy="60"
      r="42"
      fill="none"
      stroke="rgba(240, 239, 237, 0.08)"
      strokeWidth="8"
      strokeDasharray="4 4"
    />
    
    {/* Foreground credit progress circle (24.9% of circumference 263.89) */}
    <circle
      cx="60"
      cy="60"
      r="42"
      fill="none"
      stroke="#f5c842"
      strokeWidth="8"
      strokeDasharray="65.7 263.89"
      strokeDashoffset="65.7"
      strokeLinecap="round"
      transform="rotate(-90 60 60)"
    />
  </svg>
);

/* ────────────────────────────────────────────────────────────
   Sidebar Tab Groups Configurations
   ──────────────────────────────────────────────────────────── */
interface NavItemProps {
  label: string;
  icon: string;
  active: boolean;
  onClick: () => void;
}

const NavLinkItem: React.FC<NavItemProps> = ({ label, icon, active, onClick }) => (
  <button
    onClick={onClick}
    className={`${styles.navItem} ${active ? styles.navItemActive : ''}`}
  >
    <span className={styles.navIcon}>{icon}</span>
    <span>{label}</span>
  </button>
);

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [selectedSchool, setSelectedSchool] = useState<any>(null);
  const [detailTab, setDetailTab] = useState('Overview');
  
  const handleSetActiveTab = (tab: string) => {
    setActiveTab(tab);
    setSelectedSchool(null);
  };

  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [activeSchoolDropdownId, setActiveSchoolDropdownId] = useState<number | null>(null);
  const [activeRecentSchoolDropdownId, setActiveRecentSchoolDropdownId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPlan, setSelectedPlan] = useState('all');
  const [isScrolled, setIsScrolled] = useState(false);
  const workspaceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const workspace = workspaceRef.current;
      const scrollTop = workspace ? workspace.scrollTop : 0;
      const scrollY = window.scrollY;

      if (scrollTop > 10 || scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, true);
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, []);

  const handleLogout = () => {
    router.push('/login');
  };

  const menuGroups = [
    {
      title: 'Management',
      items: [
        { label: 'Schools', icon: '🏫' },
        { label: 'Subscriptions', icon: '📝' },
        { label: 'Billing', icon: '💳' },
        { label: 'AI Credits', icon: '⚡' },
        { label: 'Users', icon: '👤' },
        { label: 'Support Tickets', icon: '🎫' },
      ],
    },
    {
      title: 'Analytics',
      items: [
        { label: 'Platform Analytics', icon: '📊' },
        { label: 'AI Usage', icon: '⚙️' },
        { label: 'Reports', icon: '📁' },
      ],
    },
    {
      title: 'System',
      items: [
        { label: 'Settings', icon: '⚙️' },
        { label: 'Logs', icon: '📋' },
        { label: 'Activity Logs', icon: '📜' },
      ],
    },
  ];

  return (
    <div className={styles.adminLayout}>
      <ChalkFilter />

      {/* ────────────────── Sidebar Navigation ────────────────── */}
      <aside className={styles.sidebar}>
        {/* Profile Header */}
        <div className={styles.logoSection}>
          <span className={styles.logoIcon}>🎓</span>
          <div className={styles.logoTextContainer}>
            <span className={styles.logoMainText}>School<span>SaaS</span></span>
            <span className={styles.logoSubText}>Super Admin</span>
          </div>
        </div>

        {/* Sidebar Nav Items */}
        <div className={styles.navSection}>
          {/* Main Dashboard Tab */}
          <NavLinkItem
            label="Dashboard"
            icon="🏠"
            active={activeTab === 'Dashboard'}
            onClick={() => handleSetActiveTab('Dashboard')}
          />

          {menuGroups.map((group) => (
            <div key={group.title} className={styles.navGroup}>
              <div className={styles.groupTitle}>{group.title}</div>
              {group.items.map((item) => (
                <NavLinkItem
                  key={item.label}
                  label={item.label}
                  icon={item.icon}
                  active={activeTab === item.label}
                  onClick={() => handleSetActiveTab(item.label)}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Sidebar Footer Widget: AI Credits */}
        <div className={styles.sidebarCredits}>
          <div className={styles.creditsLabel}>
            <span>AI Credits Usage</span>
            <span className={styles.creditsPercent}>24.9%</span>
          </div>
          <div className={styles.progressBarOuter}>
            <div className={styles.progressBarInner} style={{ width: '24.9%' }} />
          </div>
          <p className={styles.creditsNumbers}>12,450 / 50,000 credits</p>
          <button className={styles.creditsBtn} onClick={() => handleSetActiveTab('AI Credits')}>
            Manage AI Credits
          </button>
        </div>
      </aside>

      {/* ────────────────── Main Workspace ────────────────── */}
      <section ref={workspaceRef} className={styles.mainWorkspace}>
        {/* Top Bar */}
        <header className={`${styles.topBar} ${isScrolled ? styles.topBarScrolled : ''}`}>
          <div className={styles.titleArea}>
            <h1 className={styles.pageTitle}>{activeTab === 'Schools' && selectedSchool ? selectedSchool.name : activeTab}</h1>
            <span className={styles.pageSubtitle}>
              {activeTab === 'Dashboard' ? 'Welcome back, Super Admin!' :
               activeTab === 'Schools' ? (
                 selectedSchool ? (
                   <span>
                     <span style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => setSelectedSchool(null)}>Schools</span> &gt; <span style={{ color: '#f5c842' }}>{selectedSchool.name}</span>
                   </span>
                 ) : 'Dashboard > Schools'
               ) : `Management panel for ${activeTab}`}
            </span>
          </div>

          <div className={styles.topActions}>
            {/* Search Box */}
            <div className={styles.searchBox}>
              <span className={styles.searchIcon}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </span>
              <input type="text" placeholder="Search schools, users..." className={styles.searchInput} />
            </div>

            {/* Notification Bell */}
            <button className={styles.bellButton} aria-label="Notifications">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <span className={styles.bellBadge}>12</span>
            </button>

            {/* Profile Avatar with Dropdown */}
            <div className={styles.profileContainer}>
              <button 
                onClick={() => setShowProfileDropdown(!showProfileDropdown)} 
                className={styles.profileBadge}
                aria-haspopup="true"
                aria-expanded={showProfileDropdown}
              >
                <div className={styles.profileAvatar}>SA</div>
                <span className={styles.profileNameText}>Super Admin</span>
                <span className={styles.profileChevron}>▾</span>
              </button>

              {showProfileDropdown && (
                <>
                  <div className={styles.dropdownOverlay} onClick={() => setShowProfileDropdown(false)} />
                  <div className={styles.dropdownMenu}>
                    <button onClick={() => { setShowProfileDropdown(false); alert('My Profile settings coming soon.'); }} className={styles.dropdownItem}>
                      👤 My Profile
                    </button>
                    <button onClick={() => { setShowProfileDropdown(false); alert('Change Password form coming soon.'); }} className={styles.dropdownItem}>
                      🔑 Change Password
                    </button>
                    <div className={styles.dropdownSeparator} />
                    <button onClick={handleLogout} className={`${styles.dropdownItem} ${styles.dropdownLogout}`}>
                      🚪 Log Out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {activeTab === 'Dashboard' ? (
          <>
            {/* Control toolbar row */}
            <div className={styles.controlRow}>
              <div className={styles.dateRangeSelector}>
                📅 May 1 – May 31, 2025 ▾
              </div>
              <button className={styles.exportReportBtn} onClick={() => alert('Exporting report as PDF...')}>
                📥 Export Report
              </button>
            </div>

            {/* 6 Metrics Grid */}
            <section className={styles.metricsGrid}>
              <div className={styles.metricCard}>
                <div className={styles.metricLabel}>Total Schools</div>
                <div className={styles.metricValue}>24</div>
                <div className={`${styles.metricGrowth} ${styles.growthYellow}`}>+3 this month</div>
              </div>

              <div className={styles.metricCard}>
                <div className={styles.metricLabel}>Total Students</div>
                <div className={styles.metricValue}>12,540</div>
                <div className={`${styles.metricGrowth} ${styles.growthGreen}`}>+320 this month</div>
              </div>

              <div className={styles.metricCard}>
                <div className={styles.metricLabel}>Total Teachers</div>
                <div className={styles.metricValue}>1,024</div>
                <div className={`${styles.metricGrowth} ${styles.growthGreen}`}>+18 this month</div>
              </div>

              <div className={styles.metricCard}>
                <div className={styles.metricLabel}>Total Parents</div>
                <div className={styles.metricValue}>9,312</div>
                <div className={`${styles.metricGrowth} ${styles.growthGreen}`}>+210 this month</div>
              </div>

              <div className={styles.metricCard}>
                <div className={styles.metricLabel}>Active Subscriptions</div>
                <div className={styles.metricValue}>22</div>
                <div className={`${styles.metricGrowth} ${styles.growthYellow}`}>91.67% of schools</div>
              </div>

              <div className={styles.metricCard}>
                <div className={styles.metricLabel}>Monthly Revenue</div>
                <div className={styles.metricValue}>₱65,978</div>
                <div className={`${styles.metricGrowth} ${styles.growthGreen}`}>+12.5% vs last month</div>
              </div>
            </section>

            {/* Row 2: Charts Row */}
            <section className={styles.chartsRow}>
              {/* Schools growth overview */}
              <div className={styles.chartCard}>
                <div className={styles.chartHeader}>
                  <h3 className={styles.chartTitle}>Schools Overview</h3>
                  <select className={styles.chartSelect} defaultValue="month">
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="year">This Year</option>
                  </select>
                </div>
                <div className={styles.chartCanvas}>
                  <ChalkLineChart />
                </div>
              </div>

              {/* Subscriptions donut ratio */}
              <div className={styles.chartCard}>
                <div className={styles.chartHeader}>
                  <h3 className={styles.chartTitle}>Subscription Status</h3>
                </div>
                <div className={`${styles.chartCanvas} ${styles.donutCanvas}`}>
                  <ChalkDonutChart />
                </div>
                <div className={styles.donutLegend}>
                  <div className={styles.legendItem}>
                    <span className={styles.legendLabel}>
                      <span className={styles.legendDot} style={{ background: '#8affad' }} /> Active
                    </span>
                    <span className={styles.legendValue}>22 (91.67%)</span>
                  </div>
                  <div className={styles.legendItem}>
                    <span className={styles.legendLabel}>
                      <span className={styles.legendDot} style={{ background: '#f5c842' }} /> Expiring Soon
                    </span>
                    <span className={styles.legendValue}>1 (4.17%)</span>
                  </div>
                  <div className={styles.legendItem}>
                    <span className={styles.legendLabel}>
                      <span className={styles.legendDot} style={{ background: '#e05e5e' }} /> Expired
                    </span>
                    <span className={styles.legendValue}>1 (4.17%)</span>
                  </div>
                </div>
                <button className={styles.viewLink} onClick={() => handleSetActiveTab('Subscriptions')}>
                  View All Subscriptions →
                </button>
              </div>

              {/* Monthly Revenue chart */}
              <div className={styles.chartCard}>
                <div className={styles.chartHeader}>
                  <h3 className={styles.chartTitle}>Monthly Revenue</h3>
                </div>
                <div className={styles.revenueValContainer}>
                  <div className={styles.revMainVal}>₱65,978</div>
                  <div className={styles.revSubVal}>+12.5% vs last month</div>
                </div>
                <div className={styles.chartCanvas}>
                  <ChalkMiniLineChart />
                </div>
                <div className={styles.revFooterStats}>
                  <div className={styles.revStatBlock}>
                    <span className={styles.revStatLabel}>Last Month</span>
                    <span className={styles.revStatValue}>₱58,634</span>
                  </div>
                  <div className={styles.revStatBlock}>
                    <span className={styles.revStatLabel}>This Month</span>
                    <span className={styles.revStatValue}>₱65,978</span>
                  </div>
                  <div className={styles.revStatBlock}>
                    <span className={styles.revStatLabel}>Growth</span>
                    <span className={`${styles.revStatValue} ${styles.revStatValueHighlight}`}>12.5%</span>
                  </div>
                </div>
                <button className={styles.viewLink} onClick={() => handleSetActiveTab('Billing')}>
                  View Billing Reports →
                </button>
              </div>
            </section>

            {/* Row 3: Bottom Listings Row */}
            <section className={styles.bottomRow}>
              {/* Recent Schools Table */}
              <div className={styles.tableCard}>
                <div className={styles.tableHeader}>
                  <h3 className={styles.tableTitle}>Recent Schools</h3>
                </div>
                <div className={styles.tableWrapper}>
                  <table className={styles.dashboardTable}>
                    <thead>
                      <tr>
                        <th>School Name</th>
                        <th>Status</th>
                        <th>Joined</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: "St. Mary's Academy", status: "Active", plan: "School Plan", joined: "May 31, 2025" },
                        { name: "Greenfield High School", status: "Active", plan: "School Plan", joined: "May 30, 2025" },
                        { name: "Riverside National HS", status: "Active", plan: "School Plan", joined: "May 28, 2025" },
                        { name: "Bright Future School", status: "Expiring Soon", plan: "School Plan", joined: "May 27, 2025" },
                        { name: "Unity Christian School", status: "Expired", plan: "School Plan", joined: "May 25, 2025" },
                        { name: "Faith Academy", status: "Active", plan: "School Plan", joined: "May 20, 2025" },
                      ].map((school, i) => (
                        <tr key={i} className={styles.clickableRow} onClick={() => { handleSetActiveTab('Schools'); setSelectedSchool(school); }}>
                          <td className={styles.schoolNameCol}>{school.name}</td>
                          <td>
                            <span className={`${styles.statusBadge} ${
                              school.status === 'Active' ? styles.statusActive :
                              school.status === 'Expiring Soon' ? styles.statusExpiring : styles.statusExpired
                            }`}>
                              {school.status}
                            </span>
                          </td>
                          <td>{school.joined}</td>
                          <td>
                            <div className={styles.actionsGroup} style={{ position: 'relative' }}>
                              <button className={styles.actionIconBtn} onClick={(e) => { e.stopPropagation(); setActiveRecentSchoolDropdownId(activeRecentSchoolDropdownId === i ? null : i); }}>
                                ⋮
                              </button>
                              {activeRecentSchoolDropdownId === i && (
                                <>
                                  <div className={styles.dropdownOverlay} onClick={(e) => { e.stopPropagation(); setActiveRecentSchoolDropdownId(null); }} />
                                  <div className={`${styles.actionDropdownMenu} ${i >= 4 ? styles.actionDropdownMenuUp : ''}`}>
                                    <button onClick={(e) => { e.stopPropagation(); setActiveRecentSchoolDropdownId(null); handleSetActiveTab('Schools'); setSelectedSchool(school); }} className={styles.actionDropdownItem}>
                                      👁️ View Details
                                    </button>
                                    <button onClick={(e) => { e.stopPropagation(); setActiveRecentSchoolDropdownId(null); alert(`Editing school ${school.name}...`); }} className={styles.actionDropdownItem}>
                                      ✏️ Edit
                                    </button>
                                    <button onClick={(e) => { e.stopPropagation(); setActiveRecentSchoolDropdownId(null); alert(`Deleting school ${school.name}...`); }} className={`${styles.actionDropdownItem} ${styles.actionDropdownItemDelete}`}>
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
                <button className={styles.viewLink} onClick={() => handleSetActiveTab('Schools')}>
                  View All Schools →
                </button>
              </div>

              {/* AI Credits circular progress */}
              <div className={styles.radialCard}>
                <div className={styles.chartHeader} style={{ width: '100%' }}>
                  <h3 className={styles.chartTitle}>AI Credits Usage</h3>
                </div>
                <div className={styles.gaugeContainer}>
                  <ChalkRadialGauge />
                  <div className={styles.gaugeTextCenter}>
                    <span className={styles.gaugePercent}>24.9%</span>
                    <span className={styles.gaugeValText}>Total Credits Used</span>
                  </div>
                </div>
                <div className={styles.radialStats}>
                  <div className={styles.radialStatItem}>
                    <span className={styles.radialStatLabel}>Used</span>
                    <span className={`${styles.radialStatVal} ${styles.radialStatValHighlight}`}>12,450</span>
                  </div>
                  <div className={styles.radialStatItem}>
                    <span className={styles.radialStatLabel}>Remaining</span>
                    <span className={styles.radialStatVal}>37,550</span>
                  </div>
                  <div className={styles.radialStatItem}>
                    <span className={styles.radialStatLabel}>Total</span>
                    <span className={styles.radialStatVal}>50,000</span>
                  </div>
                </div>
                <button className={styles.viewLink} onClick={() => handleSetActiveTab('AI Credits')}>
                  Manage AI Credits →
                </button>
              </div>

              {/* Recent SASS Activities timeline */}
              <div className={styles.activitiesCard}>
                <div className={styles.chartHeader}>
                  <h3 className={styles.chartTitle}>Recent Activities</h3>
                </div>
                <ul className={styles.timelineList}>
                  {[
                    { text: "New school registered: St. Mary's Academy", time: "2 hours ago", color: styles.timelineDot },
                    { text: "Subscription renewed: Greenfield High School", time: "5 hours ago", color: styles.timelineDotBlue },
                    { text: "AI credits purchased: Riverside National HS", time: "1 day ago", color: styles.timelineDotBlue },
                    { text: "New teacher added: Bright Future School", time: "1 day ago", color: styles.timelineDot },
                    { text: "Subscription expired: Unity Christian School", time: "2 days ago", color: styles.timelineDotRed },
                  ].map((activity, i) => (
                    <li key={i} className={styles.timelineItem}>
                      <span className={`${styles.timelineDot} ${activity.color}`} />
                      <span className={styles.timelineText}>{activity.text}</span>
                      <span className={styles.timelineTime}>{activity.time}</span>
                    </li>
                  ))}
                </ul>
                <button className={styles.viewLink} onClick={() => alert('Viewing all platform activity logs...')}>
                  View All Activities →
                </button>
              </div>
            </section>
          </>
        ) : activeTab === 'Schools' ? (
          selectedSchool ? (
            <SchoolDetailView
              school={selectedSchool}
              onBack={() => setSelectedSchool(null)}
              detailTab={detailTab}
              setDetailTab={setDetailTab}
            />
          ) : (
            <>
              {/* 1. Schools Stats Grid */}
            <section className={styles.schoolsStatsGrid}>
              {/* Total Schools */}
              <div className={styles.metricCard}>
                <div className={styles.metricHeader}>
                  <span className={styles.metricLabel}>Total Schools</span>
                  <span className={styles.metricIcon}>🏫</span>
                </div>
                <div className={styles.metricValContainer}>
                  <span className={styles.metricVal}>24</span>
                  <span className={`${styles.trendBadge} ${styles.trendUp}`}>
                    ▲ +3 this month
                  </span>
                </div>
              </div>

              {/* Active Schools */}
              <div className={styles.metricCard}>
                <div className={styles.metricHeader}>
                  <span className={styles.metricLabel}>Active Schools</span>
                  <span className={styles.metricIcon}>🟢</span>
                </div>
                <div className={styles.metricValContainer}>
                  <span className={styles.metricVal}>22</span>
                  <span className={`${styles.trendBadge} ${styles.trendUp}`}>
                    ▲ 91.67%
                  </span>
                </div>
              </div>

              {/* Pending Schools */}
              <div className={styles.metricCard}>
                <div className={styles.metricHeader}>
                  <span className={styles.metricLabel}>Pending Schools</span>
                  <span className={styles.metricIcon}>⏳</span>
                </div>
                <div className={styles.metricValContainer}>
                  <span className={styles.metricVal}>2</span>
                  <span className={`${styles.trendBadge} ${styles.trendFlat}`} style={{ color: '#f5c842', borderColor: 'rgba(245,200,66,0.3)', background: 'rgba(245,200,66,0.05)' }}>
                    ● 8.33%
                  </span>
                </div>
              </div>

              {/* Inactive Schools */}
              <div className={styles.metricCard}>
                <div className={styles.metricHeader}>
                  <span className={styles.metricLabel}>Inactive Schools</span>
                  <span className={styles.metricIcon}>🔴</span>
                </div>
                <div className={styles.metricValContainer}>
                  <span className={styles.metricVal}>0</span>
                  <span className={`${styles.trendBadge} ${styles.trendDown}`} style={{ color: '#ff8a8a', borderColor: 'rgba(255,138,138,0.3)', background: 'rgba(255,138,138,0.05)' }}>
                    ■ 0%
                  </span>
                </div>
              </div>

              {/* Total Students */}
              <div className={styles.metricCard}>
                <div className={styles.metricHeader}>
                  <span className={styles.metricLabel}>Total Students</span>
                  <span className={styles.metricIcon}>👥</span>
                </div>
                <div className={styles.metricValContainer}>
                  <span className={styles.metricVal}>12,540</span>
                  <span className={`${styles.trendBadge} ${styles.trendUp}`}>
                    ▲ +320 this month
                  </span>
                </div>
              </div>
            </section>

            {/* 2. All Schools Registry Table card */}
            <div className={styles.tableCard} style={{ marginTop: '1.2rem', flex: 1, minHeight: '520px' }}>
              {/* Table Header Section with Toolbar */}
              <div className={styles.schoolsToolbar}>
                <div className={styles.toolbarLeft}>
                  <h3 className={styles.tableTitle} style={{ fontSize: '1.45rem' }}>All Schools</h3>
                </div>
                <div className={styles.toolbarRight}>
                  {/* Permanent Search Input */}
                  <div className={styles.filterSearchWrapper}>
                    <span className={styles.filterSearchIcon}>🔍</span>
                    <input
                      type="text"
                      placeholder="Search schools..."
                      className={styles.filterSearchInput}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  {/* Status Dropdown */}
                  <select className={styles.chartSelect} value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="expiring soon">Expiring Soon</option>
                    <option value="expired">Expired</option>
                  </select>

                  {/* Plan Dropdown */}
                  <select className={styles.chartSelect} value={selectedPlan} onChange={(e) => setSelectedPlan(e.target.value)}>
                    <option value="all">All Plans</option>
                    <option value="school plan">School Plan</option>
                    <option value="district plan">District Plan</option>
                    <option value="enterprise plan">Enterprise Plan</option>
                  </select>

                  <button className={styles.toolbarAddBtn} onClick={() => alert('Add New School logic...')}>
                    <span>+</span> Add New School
                  </button>
                </div>
              </div>

              {/* Data Table */}
              <div className={styles.tableWrapper}>
                <table className={styles.dashboardTable}>
                  <thead>
                    <tr>
                      <th>School Name</th>
                      <th>Status</th>
                      <th>Subscription Plan</th>
                      <th>Joined Date</th>
                      <th>Renewal Date</th>
                      <th>Monthly Revenue</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(() => {
                      const filteredSchools = [
                        {
                          name: "St. Mary's Academy",
                          location: "Manila, Metro Manila",
                          status: "Active",
                          plan: "School Plan",
                          limit: "Up to 500 students",
                          students: 512,
                          teachers: 45,
                          joined: "May 31, 2025",
                          renewal: "May 31, 2025",
                          renewalBadge: "Today",
                          renewalBadgeColor: styles.badgeSubtextGreen,
                          revenue: "₱2,999",
                          revenueBadge: null
                        },
                        {
                          name: "Greenfield High School",
                          location: "Cebu City, Cebu",
                          status: "Active",
                          plan: "School Plan",
                          limit: "Up to 500 students",
                          students: 326,
                          teachers: 28,
                          joined: "May 30, 2025",
                          renewal: "Jun 30, 2025",
                          renewalBadge: "30 days left",
                          renewalBadgeColor: styles.badgeSubtextGreen,
                          revenue: "₱2,999",
                          revenueBadge: null
                        },
                        {
                          name: "Riverside National HS",
                          location: "Davao City, Davao del Sur",
                          status: "Active",
                          plan: "District Plan",
                          limit: "Up to 2000 students",
                          students: 846,
                          teachers: 67,
                          joined: "May 28, 2025",
                          renewal: "Jun 28, 2025",
                          renewalBadge: "28 days left",
                          renewalBadgeColor: styles.badgeSubtextGreen,
                          revenue: "₱3,999",
                          revenueBadge: "+500 students"
                        },
                        {
                          name: "Bright Future School",
                          location: "Bacolod City, Negros Occidental",
                          status: "Expiring Soon",
                          plan: "School Plan",
                          limit: "Up to 500 students",
                          students: 458,
                          teachers: 39,
                          joined: "May 27, 2025",
                          renewal: "Jun 5, 2025",
                          renewalBadge: "5 days left",
                          renewalBadgeColor: styles.badgeSubtextOrange,
                          revenue: "₱2,999",
                          revenueBadge: null
                        },
                        {
                          name: "Unity Christian School",
                          location: "Taguig City, Metro Manila",
                          status: "Expired",
                          plan: "School Plan",
                          limit: "Up to 500 students",
                          students: 234,
                          teachers: 21,
                          joined: "May 25, 2025",
                          renewal: "May 25, 2025",
                          renewalBadge: "Expired",
                          renewalBadgeColor: styles.badgeSubtextRed,
                          revenue: "₱2,999",
                          revenueBadge: null
                        },
                        {
                          name: "Faith Academy",
                          location: "Iloilo City, Iloilo",
                          status: "Active",
                          plan: "School Plan",
                          limit: "Up to 500 students",
                          students: 298,
                          teachers: 34,
                          joined: "May 20, 2025",
                          renewal: "Jun 20, 2025",
                          renewalBadge: "20 days left",
                          renewalBadgeColor: styles.badgeSubtextGreen,
                          revenue: "₱2,999",
                          revenueBadge: null
                        },
                        {
                          name: "St. Joseph High School",
                          location: "Butuan City, Agusan del Norte",
                          status: "Pending",
                          plan: "District Plan",
                          limit: "Up to 2000 students",
                          students: 0,
                          teachers: 0,
                          joined: "May 15, 2025",
                          renewal: "-",
                          renewalBadge: null,
                          renewalBadgeColor: null,
                          revenue: "-",
                          revenueBadge: null
                        },
                        {
                          name: "New Horizon School",
                          location: "General Santos City",
                          status: "Pending",
                          plan: "Enterprise Plan",
                          limit: "Unlimited students",
                          students: 0,
                          teachers: 0,
                          joined: "May 14, 2025",
                          renewal: "-",
                          renewalBadge: null,
                          renewalBadgeColor: null,
                          revenue: "-",
                          revenueBadge: null
                        }
                      ].filter(school => {
                        const matchesStatus = selectedStatus === 'all' || school.status.toLowerCase() === selectedStatus.toLowerCase();
                        const matchesPlan = selectedPlan === 'all' || school.plan.toLowerCase() === selectedPlan.toLowerCase();
                        const matchesSearch = school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                              school.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                              school.plan.toLowerCase().includes(searchQuery.toLowerCase());
                        return matchesStatus && matchesPlan && matchesSearch;
                      });

                      if (filteredSchools.length === 0) {
                        return (
                          <tr>
                            <td colSpan={7} style={{ textAlign: 'center', padding: '3rem', color: 'rgba(240, 239, 237, 0.4)' }}>
                              No schools found matching your search.
                            </td>
                          </tr>
                        );
                      }


                      return filteredSchools.map((school, i) => (
                        <tr key={i} className={styles.clickableRow} onClick={() => setSelectedSchool(school)}>
                          <td>
                            <span className={styles.schoolNameColMain}>{school.name}</span>
                            <span className={styles.schoolNameColSub}>{school.location}</span>
                          </td>
                          <td>
                            <span className={`${styles.statusBadge} ${
                              school.status === 'Active' ? styles.statusActive :
                              school.status === 'Expiring Soon' ? styles.statusExpiring :
                              school.status === 'Expired' ? styles.statusExpired : styles.statusExpiring
                            }`} style={school.status === 'Pending' ? { background: 'rgba(245,200,66,0.08)', borderColor: 'rgba(245,200,66,0.4)', color: '#f5c842' } : {}}>
                              {school.status}
                            </span>
                          </td>
                          <td>
                            <span className={styles.planNameText}>{school.plan}</span>
                            <span className={styles.planLimitText}>{school.limit}</span>
                          </td>
                          <td>{school.joined}</td>
                          <td>
                            <div>{school.renewal}</div>
                            {school.renewalBadge && (
                              <span className={`${styles.badgeSubtext} ${school.renewalBadgeColor}`}>
                                {school.renewalBadge}
                              </span>
                            )}
                          </td>
                          <td>
                            <div>{school.revenue}</div>
                            {school.renewalBadge && (
                              <span className={styles.revenueExtraBadge}>
                                {school.revenueBadge}
                              </span>
                            )}
                          </td>
                          <td>
                            <div className={styles.actionsGroup} style={{ position: 'relative' }}>
                              <button className={styles.actionIconBtn} onClick={(e) => { e.stopPropagation(); setActiveSchoolDropdownId(activeSchoolDropdownId === i ? null : i); }}>
                                ⋮
                              </button>
                              {activeSchoolDropdownId === i && (
                                <>
                                  <div className={styles.dropdownOverlay} onClick={(e) => { e.stopPropagation(); setActiveSchoolDropdownId(null); }} />
                                  <div className={`${styles.actionDropdownMenu} ${(filteredSchools.length > 4 && i >= filteredSchools.length - 2) ? styles.actionDropdownMenuUp : ''}`}>
                                    <button onClick={(e) => { e.stopPropagation(); setActiveSchoolDropdownId(null); setSelectedSchool(school); }} className={styles.actionDropdownItem}>
                                      👁️ View Details
                                    </button>
                                    <button onClick={(e) => { e.stopPropagation(); setActiveSchoolDropdownId(null); alert(`Editing school ${school.name}...`); }} className={styles.actionDropdownItem}>
                                      ✏️ Edit
                                    </button>
                                    <button onClick={(e) => { e.stopPropagation(); setActiveSchoolDropdownId(null); alert(`Deleting school ${school.name}...`); }} className={`${styles.actionDropdownItem} ${styles.actionDropdownItemDelete}`}>
                                      🗑️ Delete
                                    </button>
                                  </div>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ));
                    })()}
                  </tbody>
                </table>
              </div>

              {/* Table Pagination Footer */}
              <div className={styles.schoolsPagination}>
                <span className={styles.paginationText}>Showing 1 to 8 of 24 schools</span>
                <div className={styles.paginationButtons}>
                  <button className={styles.pageBtn} onClick={() => alert('Previous page...')}>&lt;</button>
                  <button className={`${styles.pageBtn} ${styles.pageBtnActive}`}>1</button>
                  <button className={styles.pageBtn} onClick={() => alert('Page 2...')}>2</button>
                  <button className={styles.pageBtn} onClick={() => alert('Page 3...')}>3</button>
                  <button className={styles.pageBtn} onClick={() => alert('Next page...')}>&gt;</button>
                </div>
              </div>
            </div>
          </>
          )
        ) : (
          /* Coming Soon placeholder tabs for SASS console content */
          <div style={{
            border: '2.2px solid rgba(240, 239, 237, 0.45)',
            borderRadius: '12px 14px 10px 13px / 14px 10px 13px 10px',
            padding: '2.5rem',
            background: 'rgba(10, 25, 17, 0.2)',
            transform: 'rotate(-0.5deg)',
            marginTop: '2rem',
            textAlign: 'center'
          }}>
            <h2 style={{ fontFamily: 'Caveat, cursive', fontSize: '2.4rem', color: '#f5c842', margin: 0 }}>
              🏫 {activeTab} Control Board
            </h2>
            <p style={{ fontSize: '1rem', color: 'rgba(240, 239, 237, 0.65)', maxWidth: '500px', margin: '1rem auto 0 auto', lineHeight: '1.6' }}>
              This section provides SASS platform-wide configurations, ledgers, and management interfaces for your school portal system. Integration with the database console is currently in progress.
            </p>
            <button
              onClick={() => setActiveTab('Dashboard')}
              style={{
                fontFamily: 'Caveat, cursive',
                fontSize: '1.25rem',
                fontWeight: '700',
                padding: '0.4rem 1.2rem',
                background: '#f5c842',
                border: '1.8px solid #2e2e2e',
                color: '#0b1a13',
                borderRadius: '6px 4px 5px 3px / 5px 3px 6px 4px',
                cursor: 'pointer',
                marginTop: '1.5rem',
                boxShadow: '1px 2px 4px rgba(0,0,0,0.15)'
              }}
            >
              ← Back to Main Dashboard
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
