'use client';

import React from 'react';
import { Card, CardHeader, CardBody } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ChalkLineChart, ChalkBarChart, ChalkDistributionDonut, ChalkRadialGauge } from '../ChalkCharts';
import styles from './reports.module.css';

export const ReportsView: React.FC = () => {
  return (
    <div className={styles.reportsContainer}>
      
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.titleArea}>
          <div className={styles.iconWrapper}>📊</div>
          <div>
            <h2 className={styles.title}>Reports</h2>
            <p className={styles.subtitle}>Overview of your platform performance and usage.</p>
          </div>
        </div>
        <div className={styles.datePicker}>
          📅 May 20, 2026 - Jun 20, 2026 <span>▼</span>
        </div>
      </div>

      {/* Top Metrics Row */}
      <div className={styles.metricsRow}>
        <Card>
          <div className={styles.metricCard}>
            <div className={styles.metricIcon} style={{ background: 'rgba(132, 169, 255, 0.1)', color: '#84a9ff' }}>🏫</div>
            <div className={styles.metricContent}>
              <span className={styles.metricLabel}>Total Schools</span>
              <h3 className={styles.metricValue}>128</h3>
              <span className={`${styles.metricGrowth} ${styles.growthPositive}`}>↑ 12% vs last 30 days</span>
            </div>
          </div>
        </Card>
        
        <Card>
          <div className={styles.metricCard}>
            <div className={styles.metricIcon} style={{ background: 'rgba(92, 199, 137, 0.1)', color: '#5cc789' }}>👥</div>
            <div className={styles.metricContent}>
              <span className={styles.metricLabel}>Total Students</span>
              <h3 className={styles.metricValue}>24,560</h3>
              <span className={`${styles.metricGrowth} ${styles.growthPositive}`}>↑ 8.6% vs last 30 days</span>
            </div>
          </div>
        </Card>

        <Card>
          <div className={styles.metricCard}>
            <div className={styles.metricIcon} style={{ background: 'rgba(245, 200, 66, 0.1)', color: '#f5c842' }}>👨‍🏫</div>
            <div className={styles.metricContent}>
              <span className={styles.metricLabel}>Total Teachers</span>
              <h3 className={styles.metricValue}>2,450</h3>
              <span className={`${styles.metricGrowth} ${styles.growthPositive}`}>↑ 7.3% vs last 30 days</span>
            </div>
          </div>
        </Card>

        <Card>
          <div className={styles.metricCard}>
            <div className={styles.metricIcon} style={{ background: 'rgba(74, 144, 226, 0.1)', color: '#4a90e2' }}>💳</div>
            <div className={styles.metricContent}>
              <span className={styles.metricLabel}>Monthly Revenue</span>
              <h3 className={styles.metricValue}>₱359,850</h3>
              <span className={`${styles.metricGrowth} ${styles.growthPositive}`}>↑ 15.4% vs last 30 days</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Growth Charts Row */}
      <div className={styles.twoColRow}>
        <Card>
          <CardHeader 
            title="Schools Growth" 
            description="Total number of active schools over time."
          />
          <CardBody className={styles.chartBody}>
            <ChalkLineChart />
          </CardBody>
        </Card>

        <Card>
          <CardHeader 
            title="New Schools" 
            description="New schools added each month."
          />
          <CardBody className={styles.chartBody}>
            <ChalkBarChart />
          </CardBody>
        </Card>
      </div>

      {/* Distribution Row */}
      <div className={styles.threeColRow}>
        <Card>
          <CardHeader title="Student Distribution by Grade Level" />
          <CardBody className={styles.donutBody}>
            <div style={{ width: '160px', height: '160px' }}>
              <ChalkDistributionDonut total="24,560" label="Students" val1={52.4} val2={47.6} color1="#b388ff" color2="#ff6b6b" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'rgba(240, 239, 237, 0.8)' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#b388ff' }} />
                  Grades 7-10 (JHS)
                </div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', marginTop: '0.2rem', paddingLeft: '1.2rem' }}>12,850 (52.4%)</div>
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'rgba(240, 239, 237, 0.8)' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff6b6b' }} />
                  Grades 11-12 (SHS)
                </div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', marginTop: '0.2rem', paddingLeft: '1.2rem' }}>11,710 (47.6%)</div>
              </div>
            </div>
          </CardBody>
          <div style={{ textAlign: 'center', padding: '1rem', borderTop: '1px solid rgba(240, 239, 237, 0.05)', color: '#84a9ff', fontSize: '0.9rem', cursor: 'pointer' }}>
            View Full Report →
          </div>
        </Card>

        <Card>
          <CardHeader title="Subscription Status" />
          <CardBody className={styles.donutBody}>
            <div style={{ width: '160px', height: '160px' }}>
              <ChalkDistributionDonut total="128" label="Schools" val1={75} val2={17.2} color1="#5cc789" color2="#f5c842" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'rgba(240, 239, 237, 0.8)' }}><span style={{ color: '#5cc789' }}>●</span> Active</span>
                <span style={{ fontWeight: 600 }}>96 (75%)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'rgba(240, 239, 237, 0.8)' }}><span style={{ color: '#f5c842' }}>●</span> Trial</span>
                <span style={{ fontWeight: 600 }}>22 (17.2%)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'rgba(240, 239, 237, 0.8)' }}><span style={{ color: '#ff6b6b' }}>●</span> Expired</span>
                <span style={{ fontWeight: 600 }}>6 (4.7%)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'rgba(240, 239, 237, 0.8)' }}><span style={{ color: 'rgba(240, 239, 237, 0.4)' }}>●</span> Suspended</span>
                <span style={{ fontWeight: 600 }}>4 (3.1%)</span>
              </div>
            </div>
          </CardBody>
          <div style={{ textAlign: 'center', padding: '1rem', borderTop: '1px solid rgba(240, 239, 237, 0.05)', color: '#84a9ff', fontSize: '0.9rem', cursor: 'pointer' }}>
            View Full Report →
          </div>
        </Card>

        <Card>
          <CardHeader title="AI Credits Usage" />
          <CardBody className={styles.donutBody}>
            <div style={{ position: 'relative', width: '160px', height: '160px' }}>
              <ChalkRadialGauge />
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '1.4rem', color: '#f5c842' }}>68,250</h3>
                <p style={{ margin: 0, fontSize: '0.75rem', color: 'rgba(240, 239, 237, 0.6)' }}>Credits Used</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'rgba(240, 239, 237, 0.6)' }}>Total Credits</span>
                <span style={{ fontWeight: 600 }}>150,000</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'rgba(240, 239, 237, 0.6)' }}>Used</span>
                <span style={{ fontWeight: 600 }}>68,250 (45.5%)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'rgba(240, 239, 237, 0.6)' }}>Remaining</span>
                <span style={{ fontWeight: 600 }}>81,750 (54.5%)</span>
              </div>
            </div>
          </CardBody>
          <div style={{ textAlign: 'center', padding: '1rem', borderTop: '1px solid rgba(240, 239, 237, 0.05)', color: '#84a9ff', fontSize: '0.9rem', cursor: 'pointer' }}>
            View Full Report →
          </div>
        </Card>
      </div>

      {/* Bottom Lists Row */}
      <div className={styles.twoColRow} style={{ gridTemplateColumns: '2fr 1fr' }}>
        <Card>
          <CardHeader title="Top 5 Schools by Student Count" />
          <CardBody>
            <table className={styles.schoolsTable}>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>School</th>
                  <th>Students</th>
                  <th>Teachers</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><span className={styles.rankBadge}>1</span></td>
                  <td style={{ fontWeight: 500 }}>ABC Learning Academy</td>
                  <td>2,560</td>
                  <td>240</td>
                  <td><Badge variant="green">Active</Badge></td>
                </tr>
                <tr>
                  <td><span className={styles.rankBadge}>2</span></td>
                  <td style={{ fontWeight: 500 }}>Bright Future School</td>
                  <td>2,340</td>
                  <td>210</td>
                  <td><Badge variant="green">Active</Badge></td>
                </tr>
                <tr>
                  <td><span className={styles.rankBadge}>3</span></td>
                  <td style={{ fontWeight: 500 }}>Global Excellence School</td>
                  <td>1,980</td>
                  <td>180</td>
                  <td><Badge variant="green">Active</Badge></td>
                </tr>
                <tr>
                  <td><span className={styles.rankBadge}>4</span></td>
                  <td style={{ fontWeight: 500 }}>Knowledge Union Academy</td>
                  <td>1,750</td>
                  <td>165</td>
                  <td><Badge variant="green">Active</Badge></td>
                </tr>
                <tr>
                  <td><span className={styles.rankBadge}>5</span></td>
                  <td style={{ fontWeight: 500 }}>New Horizon School</td>
                  <td>1,620</td>
                  <td>150</td>
                  <td><Badge variant="yellow">Trial</Badge></td>
                </tr>
              </tbody>
            </table>
            <div style={{ textAlign: 'center', marginTop: '1.5rem', color: '#84a9ff', fontSize: '0.9rem', cursor: 'pointer' }}>
              View Full Report →
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Quick Reports" />
          <div style={{ padding: '0 1rem 1rem 1rem' }}>
            <div className={styles.quickReportItem}>
              <div className={styles.quickReportLeft}>
                <div className={styles.quickReportIcon} style={{ background: 'rgba(132, 169, 255, 0.1)', color: '#84a9ff' }}>📈</div>
                <div>
                  <h4 className={styles.quickReportTitle}>Revenue Report</h4>
                  <p className={styles.quickReportDesc}>View detailed revenue analytics</p>
                </div>
              </div>
              <div style={{ color: 'rgba(240, 239, 237, 0.4)' }}>›</div>
            </div>
            
            <div className={styles.quickReportItem}>
              <div className={styles.quickReportLeft}>
                <div className={styles.quickReportIcon} style={{ background: 'rgba(74, 144, 226, 0.1)', color: '#4a90e2' }}>🏫</div>
                <div>
                  <h4 className={styles.quickReportTitle}>School Activity Report</h4>
                  <p className={styles.quickReportDesc}>See school activities and engagement</p>
                </div>
              </div>
              <div style={{ color: 'rgba(240, 239, 237, 0.4)' }}>›</div>
            </div>

            <div className={styles.quickReportItem}>
              <div className={styles.quickReportLeft}>
                <div className={styles.quickReportIcon} style={{ background: 'rgba(92, 199, 137, 0.1)', color: '#5cc789' }}>👥</div>
                <div>
                  <h4 className={styles.quickReportTitle}>User Activity Report</h4>
                  <p className={styles.quickReportDesc}>View platform user activities</p>
                </div>
              </div>
              <div style={{ color: 'rgba(240, 239, 237, 0.4)' }}>›</div>
            </div>

            <div className={styles.quickReportItem} style={{ borderBottom: 'none' }}>
              <div className={styles.quickReportLeft}>
                <div className={styles.quickReportIcon} style={{ background: 'rgba(245, 200, 66, 0.1)', color: '#f5c842' }}>📝</div>
                <div>
                  <h4 className={styles.quickReportTitle}>Subscription Report</h4>
                  <p className={styles.quickReportDesc}>View subscription and billing details</p>
                </div>
              </div>
              <div style={{ color: 'rgba(240, 239, 237, 0.4)' }}>›</div>
            </div>
          </div>
        </Card>
      </div>

    </div>
  );
};
