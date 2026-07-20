'use client';

import React from 'react';
import styles from './subscriptionAnalytics.module.css';
import adminStyles from '@/app/admin/admin.module.css';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { ChalkDistributionDonut, ChalkGrowthLineChart, ChalkHorizontalBarChart } from '@/components/ChalkCharts';

export const SubscriptionAnalyticsView = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className={styles.analyticsContainer}>
      {/* Header */}
      <div className={styles.headerRow}>
        <div>
          <div className={styles.breadcrumb}>
            <span onClick={onBack} className={styles.breadcrumbLink}>Reports</span> &gt; Subscription Analytics
          </div>
          <h2 className={styles.pageTitle}>Subscription Analytics</h2>
          <p className={styles.pageDesc}>Analyze subscription performance, growth, renewals, and revenue across all schools.</p>
        </div>
        <div className={styles.headerActions}>
          <div className={styles.datePicker}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            May 20, 2026 - Jun 20, 2026
          </div>
          <Button variant="ghost" onClick={() => alert('Export PDF: Coming soon')}>Export PDF</Button>
          <Button variant="ghost" onClick={() => alert('Print: Coming soon')}>Print</Button>
        </div>
      </div>

      {/* Filters */}
      <div className={styles.filterRow}>
        <Select className={styles.noMargin} options={[{label: 'All Dates', value: 'all'}]} value="all" style={{ flex: 1, minWidth: '110px' }} />
        <Select className={styles.noMargin} options={[{label: 'All Plans', value: 'all'}]} value="all" style={{ flex: 1, minWidth: '110px' }} />
        <Select className={styles.noMargin} options={[{label: 'All Statuses', value: 'all'}]} value="all" style={{ flex: 1, minWidth: '110px' }} />
        <Select className={styles.noMargin} options={[{label: 'All Regions', value: 'all'}]} value="all" style={{ flex: 1, minWidth: '110px' }} />
        <Select className={styles.noMargin} options={[{label: 'All School Types', value: 'all'}]} value="all" style={{ flex: 1, minWidth: '110px' }} />
        <div style={{ flex: 1.5, display: 'flex', gap: '0.5rem', alignItems: 'center', justifyContent: 'flex-end', minWidth: '100px' }}>
          <Button variant="ghost">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '0.4rem' }}>
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Clear
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <section className={adminStyles.metricsGrid}>
        {[
          { label: 'Total Active Schools', value: '96', growth: '↑ 5% vs last month', growthClass: adminStyles.growthGreen, icon: '🏫' },
          { label: 'Trial Schools', value: '22', growth: '↑ 12% vs last month', growthClass: adminStyles.growthGreen, icon: '⏱️' },
          { label: 'Expired Schools', value: '6', growth: '↓ 2% vs last month', growthClass: adminStyles.growthGreen, icon: '⚠️' },
          { label: 'Suspended Schools', value: '4', growth: '— 0% vs last month', growthClass: adminStyles.growthGray, icon: '🚫' },
          { label: 'Renewal Rate', value: '94.2%', growth: '↑ 1.1% vs last month', growthClass: adminStyles.growthGreen, icon: '🔄' },
          { label: 'MRR', value: '₱359,850', growth: '↑ 8.4% vs last month', growthClass: adminStyles.growthGreen, icon: '💳' },
        ].map((m, i) => (
          <div key={i} className={adminStyles.metricCard}>
            <div className={adminStyles.metricTop}>
              <div className={adminStyles.metricLabel}>{m.label}</div>
              <div className={adminStyles.metricIconSm}>{m.icon}</div>
            </div>
            <div className={adminStyles.metricValue} style={{ fontSize: '1.4rem' }}>{m.value}</div>
            <div className={`${adminStyles.metricGrowth} ${m.growthClass}`}>{m.growth}</div>
          </div>
        ))}
      </section>

      {/* Analytics Charts Row */}
      <div className={`${styles.rowGrid} ${styles.rowThreeCols}`}>
        {/* Status Distribution */}
        <Card>
          <CardHeader title="Subscription Status Distribution" />
          <CardBody>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1rem' }}>
              <div style={{ width: '150px', height: '150px', position: 'relative' }}>
                 <ChalkDistributionDonut total="128" label="Schools" val1={75} val2={17.2} color1="#5cc789" color2="#f5c842" />
              </div>
              
              <div className={styles.legendList} style={{ width: '100%', marginTop: '1rem' }}>
                <div className={styles.legendRow}>
                  <span style={{ color: 'rgba(240, 239, 237, 0.8)' }}><span style={{ color: '#5cc789' }}>●</span> Active</span>
                  <span style={{ fontWeight: 600 }}>96 (75%)</span>
                </div>
                <div className={styles.legendRow}>
                  <span style={{ color: 'rgba(240, 239, 237, 0.8)' }}><span style={{ color: '#f5c842' }}>●</span> Trial</span>
                  <span style={{ fontWeight: 600 }}>22 (17.2%)</span>
                </div>
                <div className={styles.legendRow}>
                  <span style={{ color: 'rgba(240, 239, 237, 0.8)' }}><span style={{ color: '#ff6b6b' }}>●</span> Expired</span>
                  <span style={{ fontWeight: 600 }}>6 (4.7%)</span>
                </div>
                <div className={styles.legendRow}>
                  <span style={{ color: 'rgba(240, 239, 237, 0.8)' }}><span style={{ color: 'rgba(240, 239, 237, 0.4)' }}>●</span> Suspended</span>
                  <span style={{ fontWeight: 600 }}>4 (3.1%)</span>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Growth Line Chart */}
        <Card>
          <CardHeader title="Subscription Growth" description="Monthly subscription growth." />
          <CardBody>
            <div style={{ height: '250px', marginTop: '1rem' }}>
              <ChalkGrowthLineChart />
            </div>
          </CardBody>
        </Card>

        {/* Monthly Revenue Bar Chart (reusing HorizontalBarChart for now) */}
        <Card>
          <CardHeader title="Monthly Revenue" description="Monthly subscription revenue." />
          <CardBody>
            <div style={{ height: '250px', marginTop: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
               <ChalkHorizontalBarChart />
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Subscription Overview Table */}
      <Card>
        <CardHeader title="Subscription Overview" description="Detailed list of all school subscriptions." />
        <CardBody>
          <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
            <table className={styles.rankingTable} style={{ marginTop: 0 }}>
              <thead>
                <tr>
                  <th style={{ whiteSpace: 'nowrap' }}>School Name</th>
                  <th style={{ whiteSpace: 'nowrap' }}>Current Plan</th>
                  <th style={{ whiteSpace: 'nowrap' }}>Student Count</th>
                  <th style={{ whiteSpace: 'nowrap' }}>Renewal Date</th>
                  <th style={{ whiteSpace: 'nowrap' }}>Monthly Fee</th>
                  <th style={{ whiteSpace: 'nowrap' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { n: 'ABC Learning Academy', p: 'Premium Plan', s: '2,560', r: 'Aug 15, 2026', f: '₱45,000', st: 'Active', c: '#5cc789' },
                  { n: 'Bright Future School', p: 'Standard Plan', s: '1,200', r: 'Sep 01, 2026', f: '₱20,000', st: 'Active', c: '#5cc789' },
                  { n: 'Global Excellence School', p: 'Basic Plan', s: '500', r: 'Jul 28, 2026', f: '₱10,000', st: 'Trial', c: '#f5c842' },
                  { n: 'Knowledge Union Academy', p: 'Premium Plan', s: '1,800', r: 'Oct 12, 2026', f: '₱35,000', st: 'Active', c: '#5cc789' },
                ].map((row, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 500 }}>{row.n}</td>
                    <td>{row.p}</td>
                    <td>{row.s}</td>
                    <td>{row.r}</td>
                    <td>{row.f}</td>
                    <td><span style={{ color: row.c }}>●</span> {row.st}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>

      {/* Upcoming Renewals & Expired Schools */}
      <div className={`${styles.rowGrid} ${styles.rowTwoCols}`}>
        <Card>
          <CardHeader title="Upcoming Renewals" description="Schools expiring within the next 30 days." />
          <CardBody>
            <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
              <table className={styles.rankingTable} style={{ marginTop: 0 }}>
                <thead>
                  <tr>
                    <th style={{ whiteSpace: 'nowrap' }}>School</th>
                    <th style={{ whiteSpace: 'nowrap' }}>Renewal Date</th>
                    <th style={{ whiteSpace: 'nowrap' }}>Days Remaining</th>
                    <th style={{ whiteSpace: 'nowrap' }}>Current Plan</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { n: 'City High School', r: 'Jul 24, 2026', d: '3 days', p: 'Standard Plan', c: '#ff6b6b' },
                    { n: 'Global Excellence School', r: 'Jul 28, 2026', d: '7 days', p: 'Basic Plan', c: '#ff6b6b' },
                    { n: 'Westside Academy', r: 'Aug 05, 2026', d: '15 days', p: 'Premium Plan', c: '#f5c842' },
                  ].map((row, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 500 }}>{row.n}</td>
                      <td>{row.r}</td>
                      <td style={{ color: row.c, fontWeight: 600 }}>{row.d}</td>
                      <td>{row.p}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Expired Schools" description="Schools whose subscriptions have lapsed." />
          <CardBody>
            <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
              <table className={styles.rankingTable} style={{ marginTop: 0 }}>
                <thead>
                  <tr>
                    <th style={{ whiteSpace: 'nowrap' }}>School</th>
                    <th style={{ whiteSpace: 'nowrap' }}>Expiration Date</th>
                    <th style={{ whiteSpace: 'nowrap' }}>Days Expired</th>
                    <th style={{ whiteSpace: 'nowrap' }}>Recommended Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { n: 'Pioneer Institute', r: 'Jun 15, 2026', d: '36 days', a: 'Send Final Reminder' },
                    { n: 'Lakeside High', r: 'Jul 01, 2026', d: '20 days', a: 'Call Admin' },
                    { n: 'Summit Academy', r: 'Jul 18, 2026', d: '3 days', a: 'Automated Email' },
                  ].map((row, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 500 }}>{row.n}</td>
                      <td>{row.r}</td>
                      <td style={{ color: '#ff6b6b' }}>{row.d}</td>
                      <td><Button variant="ghost" style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem', color: '#84a9ff' }}>{row.a}</Button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Revenue Breakdown, Trends, Top Paying */}
      <div className={`${styles.rowGrid} ${styles.rowThreeColsEqual}`}>
        <Card>
          <CardHeader title="Revenue Breakdown" description="Revenue by category." />
          <CardBody>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1rem' }}>
              <div style={{ width: '150px', height: '150px', position: 'relative' }}>
                 <ChalkDistributionDonut total="₱359k" label="Revenue" val1={70} val2={20} color1="#b884ff" color2="#4df58a" />
              </div>
              
              <div className={styles.legendList} style={{ width: '100%', marginTop: '1rem' }}>
                <div className={styles.legendRow}>
                  <span style={{ color: 'rgba(240, 239, 237, 0.8)' }}><span style={{ color: '#b884ff' }}>●</span> Base Plans</span>
                  <span style={{ fontWeight: 600 }}>₱251,895 (70%)</span>
                </div>
                <div className={styles.legendRow}>
                  <span style={{ color: 'rgba(240, 239, 237, 0.8)' }}><span style={{ color: '#4df58a' }}>●</span> Student Add-ons</span>
                  <span style={{ fontWeight: 600 }}>₱71,970 (20%)</span>
                </div>
                <div className={styles.legendRow}>
                  <span style={{ color: 'rgba(240, 239, 237, 0.8)' }}><span style={{ color: '#84a9ff' }}>●</span> AI Credits</span>
                  <span style={{ fontWeight: 600 }}>₱35,985 (10%)</span>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Renewal Trends" description="Renewed vs Expired vs Cancelled." />
          <CardBody>
             <div style={{ height: '250px', marginTop: '1rem' }}>
              <ChalkGrowthLineChart />
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Top Paying Schools" description="Highest MRR contributors." />
          <CardBody>
             <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
              <table className={styles.rankingTable} style={{ marginTop: 0 }}>
                <thead>
                  <tr>
                    <th style={{ whiteSpace: 'nowrap' }}>School</th>
                    <th style={{ whiteSpace: 'nowrap', textAlign: 'right' }}>MRR</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { n: 'ABC Learning Academy', v: '₱45,000' },
                    { n: 'Knowledge Union', v: '₱35,000' },
                    { n: 'Metro Science High', v: '₱28,500' },
                    { n: 'Bright Future School', v: '₱25,000' },
                    { n: 'St. Jude College', v: '₱22,000' },
                  ].map((row, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 500 }}>
                        <span className={styles.rankBadge}>{i+1}</span> {row.n}
                      </td>
                      <td style={{ textAlign: 'right', fontWeight: 600, color: '#f5c842' }}>{row.v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Insights Panel */}
      <Card>
        <CardHeader title="AI Business Insights" description="Automated insights based on your subscription data." />
        <CardBody>
          <ul style={{ margin: '1rem 0 0 0', padding: '0 0 0 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', color: 'rgba(240, 239, 237, 0.85)' }}>
            <li><strong style={{ color: '#5cc789' }}>Growth:</strong> Active subscriptions increased by 5% compared to last month.</li>
            <li><strong style={{ color: '#f5c842' }}>Action Required:</strong> 3 schools are approaching renewal within the next 15 days.</li>
            <li><strong style={{ color: '#84a9ff' }}>Revenue:</strong> MRR has grown by 8.4% largely due to Premium Plan upgrades.</li>
            <li><strong style={{ color: '#b884ff' }}>Trends:</strong> AI Credit purchases are up 15% this quarter, led by ABC Learning Academy.</li>
            <li><strong style={{ color: '#ff6b6b' }}>Risk:</strong> Global Excellence School is on trial and hasn't logged in for 5 days. Consider outreach.</li>
          </ul>
        </CardBody>
      </Card>

      {/* Footer */}
      <div style={{ fontSize: '0.75rem', color: 'rgba(240, 239, 237, 0.4)', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
        Last synchronized: {new Date().toLocaleString()}
      </div>
    </div>
  );
};
