'use client';

import React from 'react';
import styles from './studentAnalytics.module.css';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';
import { ChalkDistributionDonut, ChalkHorizontalBarChart, ChalkGrowthLineChart } from '@/components/ChalkCharts';

export const StudentAnalyticsView = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className={styles.analyticsContainer}>
      {/* Header */}
      <div className={styles.headerRow}>
        <div>
          <div className={styles.breadcrumb}>
            <span onClick={onBack} className={styles.breadcrumbLink}>Reports</span> &gt; Student Analytics
          </div>
          <h2 className={styles.pageTitle}>Student Analytics</h2>
          <p className={styles.pageDesc}>Detailed insights about students across all schools.</p>
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
          <Button variant="ghost" onClick={() => alert('Export Excel: Coming soon')}>Export Excel</Button>
          <Button variant="ghost" onClick={() => alert('Print: Coming soon')}>Print</Button>
        </div>
      </div>

      {/* Filters */}
      <div className={styles.filterRow}>
        <Select options={[{label: 'All Schools', value: 'all'}]} value="all" style={{ minWidth: '150px' }} />
        <Select options={[{label: 'All Regions', value: 'all'}]} value="all" style={{ minWidth: '150px' }} />
        <Select options={[{label: 'All Types', value: 'all'}]} value="all" style={{ minWidth: '150px' }} />
        <Select options={[{label: 'All Grades', value: 'all'}]} value="all" style={{ minWidth: '150px' }} />
        <Select options={[{label: '2025 - 2026', value: '25-26'}]} value="25-26" style={{ minWidth: '150px' }} />
        <Button variant="ghost" style={{ marginLeft: 'auto' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '0.4rem' }}>
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Clear Filters
        </Button>
      </div>

      {/* KPIs */}
      <div className={styles.kpiRow}>
        <div className={styles.kpiCard}>
          <div className={styles.kpiTop}>
            <div className={styles.kpiIconBox} style={{ background: 'rgba(184, 132, 255, 0.1)', color: '#b884ff' }}>👥</div>
            <span className={styles.kpiLabel}>Total Students</span>
          </div>
          <p className={styles.kpiValue}>24,560</p>
          <span className={styles.kpiTrendUp}>↑ 8.6% vs last 30 days</span>
        </div>

        <div className={styles.kpiCard}>
          <div className={styles.kpiTop}>
            <div className={styles.kpiIconBox} style={{ background: 'rgba(132, 169, 255, 0.1)', color: '#84a9ff' }}>🎓</div>
            <span className={styles.kpiLabel}>Junior High Students</span>
          </div>
          <p className={styles.kpiValue}>15,240</p>
          <span className={styles.kpiTrendUp}>↑ 7.8% vs last 30 days</span>
        </div>

        <div className={styles.kpiCard}>
          <div className={styles.kpiTop}>
            <div className={styles.kpiIconBox} style={{ background: 'rgba(77, 245, 138, 0.1)', color: '#4df58a' }}>🎓</div>
            <span className={styles.kpiLabel}>Senior High Students</span>
          </div>
          <p className={styles.kpiValue}>9,320</p>
          <span className={styles.kpiTrendUp}>↑ 10.2% vs last 30 days</span>
        </div>

        <div className={styles.kpiCard}>
          <div className={styles.kpiTop}>
            <div className={styles.kpiIconBox} style={{ background: 'rgba(245, 200, 66, 0.1)', color: '#f5c842' }}>🏫</div>
            <span className={styles.kpiLabel}>Avg Students per School</span>
          </div>
          <p className={styles.kpiValue}>192</p>
          <span className={styles.kpiTrendUp}>↑ 5.4% vs last 30 days</span>
        </div>

        <div className={styles.kpiCard}>
          <div className={styles.kpiTop}>
            <div className={styles.kpiIconBox} style={{ background: 'rgba(184, 132, 255, 0.1)', color: '#b884ff' }}>👤+</div>
            <span className={styles.kpiLabel}>New Students (This Month)</span>
          </div>
          <p className={styles.kpiValue}>1,250</p>
          <span className={styles.kpiTrendUp}>↑ 12.3% vs last 30 days</span>
        </div>
      </div>

      {/* Row 1: Grade Level & School Ranking */}
      <div className={`${styles.rowGrid} ${styles.rowGradeSchool}`}>
        {/* Grade Level */}
        <Card>
          <CardHeader 
            title="Students by Grade Level" 
            description="Distribution of students across all grade levels."
          />
          <CardBody>
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginTop: '1rem' }}>
              <div style={{ width: '180px', height: '180px', flexShrink: 0, position: 'relative' }}>
                 <ChalkDistributionDonut total="24,560" label="Students" val1={50} val2={30} color1="#b884ff" color2="#84a9ff" />
              </div>
              
              <div style={{ flex: 1 }}>
                <table className={styles.rankingTable} style={{ marginTop: 0 }}>
                  <thead>
                    <tr>
                      <th>Grade Level</th>
                      <th>Students</th>
                      <th>Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { g: 'Grade 7', s: '5,320', p: '21.7%', c: '#b884ff' },
                      { g: 'Grade 8', s: '4,890', p: '19.9%', c: '#84a9ff' },
                      { g: 'Grade 9', s: '4,520', p: '18.4%', c: '#4df58a' },
                      { g: 'Grade 10', s: '4,110', p: '16.7%', c: '#f5c842' },
                      { g: 'Grade 11', s: '3,200', p: '13.0%', c: '#ff8a8a' },
                      { g: 'Grade 12', s: '2,520', p: '10.3%', c: '#84a9ff' },
                    ].map((row, i) => (
                      <tr key={i}>
                        <td style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: 'none' }}>
                          <span style={{ color: row.c }}>●</span> {row.g}
                        </td>
                        <td style={{ borderBottom: 'none' }}>{row.s}</td>
                        <td style={{ borderBottom: 'none' }}>{row.p}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <Button variant="ghost" style={{ color: '#84a9ff' }}>View Grade Level Growth →</Button>
            </div>
          </CardBody>
        </Card>

        {/* School Ranking */}
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <CardHeader 
              title="Students by School" 
              description="Top schools by total student count."
            />
            <div style={{ padding: '1.25rem 1.25rem 0 0' }}>
              <Input placeholder="Search school..." style={{ width: '200px', marginBottom: 0 }} />
            </div>
          </div>
          <CardBody>
            <table className={styles.rankingTable}>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>School</th>
                  <th>Total Students</th>
                  <th>JHS</th>
                  <th>SHS</th>
                  <th>% of Total</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { r: 1, name: 'ABC Learning Academy', t: '2,560', j: '1,620', s: '940', p: '10.4%' },
                  { r: 2, name: 'Bright Future School', t: '2,340', j: '1,420', s: '920', p: '9.5%' },
                  { r: 3, name: 'Global Excellence School', t: '1,980', j: '1,210', s: '770', p: '8.1%' },
                  { r: 4, name: 'Knowledge Union Academy', t: '1,750', j: '1,050', s: '700', p: '7.1%' },
                  { r: 5, name: 'New Horizon School', t: '1,620', j: '980', s: '640', p: '6.6%' },
                ].map((row, i) => (
                  <tr key={i}>
                    <td><span className={styles.rankBadge}>{row.r}</span></td>
                    <td style={{ fontWeight: 500 }}>{row.name}</td>
                    <td>{row.t}</td>
                    <td>{row.j}</td>
                    <td>{row.s}</td>
                    <td>{row.p}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <Button variant="ghost" style={{ color: '#84a9ff' }}>View All Schools →</Button>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Row 2: Region, Growth, Type */}
      <div className={`${styles.rowGrid} ${styles.rowRegionGrowthType}`}>
        
        {/* Region */}
        <Card>
          <CardHeader 
            title="Students by Region" 
            description="Distribution of students by region."
          />
          <CardBody>
            <div style={{ height: '280px', marginTop: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
               <ChalkHorizontalBarChart />
            </div>
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <Button variant="ghost" style={{ color: '#84a9ff' }}>View Regional Breakdown →</Button>
            </div>
          </CardBody>
        </Card>

        {/* Growth */}
        <Card>
          <CardHeader 
            title="Student Growth Over Time" 
            description="Total student growth over the selected period."
          />
          <CardBody>
            <div style={{ height: '280px', marginTop: '1rem' }}>
              <ChalkGrowthLineChart />
            </div>
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <Button variant="ghost" style={{ color: '#84a9ff' }}>View Growth Analysis →</Button>
            </div>
          </CardBody>
        </Card>

        {/* Type */}
        <Card>
          <CardHeader 
            title="Students by School Type" 
            description="Distribution by type of school."
          />
          <CardBody>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem' }}>
              <div style={{ width: '160px', height: '160px', position: 'relative' }}>
                 <ChalkDistributionDonut total="24,560" label="Students" val1={63.1} val2={33.1} color1="#b884ff" color2="#84a9ff" />
              </div>
              
              <div className={styles.legendList} style={{ width: '100%' }}>
                <div className={styles.legendRow}>
                  <span style={{ color: 'rgba(240, 239, 237, 0.8)' }}><span style={{ color: '#b884ff' }}>●</span> Private</span>
                  <span style={{ fontWeight: 600 }}>15,480 (63.1%)</span>
                </div>
                <div className={styles.legendRow}>
                  <span style={{ color: 'rgba(240, 239, 237, 0.8)' }}><span style={{ color: '#84a9ff' }}>●</span> Public</span>
                  <span style={{ fontWeight: 600 }}>8,120 (33.1%)</span>
                </div>
                <div className={styles.legendRow}>
                  <span style={{ color: 'rgba(240, 239, 237, 0.8)' }}><span style={{ color: '#4df58a' }}>●</span> Others</span>
                  <span style={{ fontWeight: 600 }}>960 (3.9%)</span>
                </div>
              </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
              <Button variant="ghost" style={{ color: '#84a9ff' }}>View School Type Report →</Button>
            </div>
          </CardBody>
        </Card>

      </div>
      
      <div style={{ fontSize: '0.75rem', color: 'rgba(240, 239, 237, 0.4)', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <span>ⓘ</span> All data is updated daily at 12:00 AM.
      </div>
    </div>
  );
};
