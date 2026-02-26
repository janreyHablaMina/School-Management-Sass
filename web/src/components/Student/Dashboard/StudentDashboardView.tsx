'use client';

import React from 'react';
import { PageHeader, SummaryMetrics, listStyles } from '@/components/ui/shared';
import { QUICK_STATS_DATA, SCHEDULE_DATA, UPCOMING_DEADLINES } from '@/lib/mock/studentProfile.mock';
import styles from './studentDashboard.module.css';
import { MapPin, Users, Megaphone } from 'lucide-react';

export function StudentDashboardView() {
  return (
    <div className={listStyles.page}>
      <PageHeader 
        title="Student Dashboard" 
        subtitle="Welcome back, Alex! Here is a summary of your academic progress."
      />

      <SummaryMetrics 
        metrics={QUICK_STATS_DATA.map(s => ({
          label: s.label,
          value: s.value,
          subtitle: s.subText,
          icon: s.icon,
          accent: s.iconColor,
        }))} 
        columns={4} 
      />

      <div className={styles.overviewLayout}>
        <div className={styles.twoColumnRow}>
          
          {/* LEFT COLUMN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3>Today's Schedule</h3>
                <a href="#" className={styles.viewAll}>View full schedule</a>
              </div>
              
              <div className={styles.timeline}>
                {SCHEDULE_DATA.filter(s => s.day.includes('Mon')).map((schedule, index) => {
                  const isOngoing = index === 1; // Mock ongoing
                  return (
                    <div key={schedule.id} className={styles.timelineItem}>
                      <div className={`${styles.timelineDot} ${isOngoing ? styles.timelineDotActive : ''}`}></div>
                      <div className={styles.timelineContent} style={{ width: '100%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div className={styles.timelineTime} style={isOngoing ? { color: '#8b5cf6', fontWeight: 600 } : {}}>
                            {schedule.time}
                          </div>
                          {isOngoing && <span className={styles.statusOngoing}>Ongoing</span>}
                        </div>
                        
                        <div style={{ 
                          background: isOngoing ? 'rgba(139, 92, 246, 0.08)' : 'rgba(240, 239, 237, 0.02)', 
                          padding: '0.85rem 1rem', 
                          borderRadius: '8px', 
                          marginTop: '0.25rem', 
                          border: isOngoing ? '1px solid rgba(139, 92, 246, 0.2)' : '1px solid rgba(240, 239, 237, 0.05)' 
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                            <div className={styles.timelineTitle} style={{ fontSize: isOngoing ? '0.95rem' : '0.9rem', color: isOngoing ? '#fff' : 'rgba(240, 239, 237, 0.9)' }}>
                              {schedule.subject}
                            </div>
                            <div className={styles.timelineTitle} style={{ color: isOngoing ? '#8b5cf6' : 'rgba(240, 239, 237, 0.4)', fontSize: '0.75rem' }}>
                              {schedule.teacher}
                            </div>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div className={styles.timelineSub} style={{ color: isOngoing ? 'rgba(240, 239, 237, 0.7)' : 'rgba(240, 239, 237, 0.5)' }}>
                              Grade 11 - STEM
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: isOngoing ? 'rgba(240, 239, 237, 0.6)' : 'rgba(240, 239, 237, 0.4)' }}>
                              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                <MapPin size={12} /> {schedule.room}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3>Recent Announcements</h3>
                <a href="#" className={styles.viewAll}>View all</a>
              </div>
              
              <div className={styles.timeline} style={{ marginTop: '0.5rem' }}>
                <div className={styles.timelineItem}>
                  <div className={styles.timelineDot} style={{ background: '#8b5cf6', borderColor: '#8b5cf6', width: '24px', height: '24px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '-7px', marginTop: '0' }}>
                    <Megaphone size={14} color="#111" />
                  </div>
                  <div className={styles.timelineContent}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div className={styles.timelineTitle}>Midterm Examination Schedule Released</div>
                        <div className={styles.timelineSub}>Exams will commence on October 1st.</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div className={styles.timelineTime}>Sep 15, 2026</div>
                        <div className={styles.timelineSub} style={{ fontSize: '0.65rem' }}>Principal's Office</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3>Action Items & Deadlines</h3>
              </div>
              
              <div className={styles.timeline} style={{ marginTop: '0.5rem' }}>
                {UPCOMING_DEADLINES.map((deadline, index) => (
                   <div key={deadline.id} className={styles.timelineItem}>
                    <div className={styles.timelineDot} style={{ background: deadline.iconColor, borderColor: deadline.iconColor, width: '24px', height: '24px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '-7px', marginTop: '0', fontSize: '0.8rem' }}>
                      📝
                    </div>
                    <div className={styles.timelineContent}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <div className={styles.timelineTitle}>{deadline.title}</div>
                        <div className={styles.timelineSub} style={{ marginBottom: '0.25rem' }}>{deadline.subject}</div>
                        <div className={styles.timelineTime} style={{ color: deadline.iconColor, fontWeight: 500 }}>
                          {deadline.date}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.card} style={{ borderColor: 'rgba(255, 126, 147, 0.4)', background: 'rgba(255, 126, 147, 0.05)' }}>
              <div className={styles.cardHeader}>
                <h3 style={{ color: '#ff7e93' }}>Clearance Status</h3>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.25rem' }}>⚠️</span>
                <div>
                  <div style={{ fontWeight: 600, color: '#ff7e93', marginBottom: '0.25rem' }}>1 Liability Found</div>
                  <div style={{ fontSize: '0.85rem', color: 'rgba(240, 239, 237, 0.7)', lineHeight: 1.5, marginBottom: '1rem' }}>
                    You have a pending liability in the Library. Settle this to secure your midterm clearance.
                  </div>
                  <a href="#" className={styles.viewAll} style={{ color: '#ff7e93' }}>View details →</a>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
