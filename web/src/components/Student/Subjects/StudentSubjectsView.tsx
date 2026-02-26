'use client';

import React, { useState } from 'react';
import { PageHeader, SummaryMetrics, listStyles } from '@/components/ui/shared';
import { SUBJECTS_DATA, SCHEDULE_DATA, SUMMARY_DATA } from '@/lib/mock/studentProfile.mock';
import styles from './studentSubjects.module.css';

const GRADE_DESCRIPTOR = (g: number) => {
  if (g >= 98) return { label: 'Outstanding', color: '#5cc789' };
  if (g >= 90) return { label: 'Very Good', color: '#84a9ff' };
  if (g >= 85) return { label: 'Good', color: '#b68eff' };
  if (g >= 80) return { label: 'Satisfactory', color: '#ffab6b' };
  if (g >= 75) return { label: 'Fairly Satisfactory', color: '#f5c842' };
  return { label: 'Did Not Meet Expectations', color: '#ff7e93' };
};

export function StudentSubjectsView() {
  const [activeSubject, setActiveSubject] = useState<string | null>(null);

  const selected = SUBJECTS_DATA.find(s => s.id === activeSubject) ?? null;

  return (
    <div className={listStyles.page}>
      <PageHeader
        title="My Subjects"
        subtitle="View all your enrolled subjects, teachers, schedules, and current grades for this school year."
      />

      {/* Summary Metrics */}
      <SummaryMetrics
        metrics={SUMMARY_DATA.map(s => ({
          label: s.label,
          value: s.value,
          subtitle: s.subText,
          icon: s.icon,
          accent: s.iconColor,
        }))}
        columns={4}
      />

      <div className={styles.layout}>
        {/* LEFT: Subject Cards Grid */}
        <div className={styles.subjectGrid}>
          {SUBJECTS_DATA.map(subject => {
            const desc = GRADE_DESCRIPTOR(subject.quarterGrade);
            const isSelected = activeSubject === subject.id;
            return (
              <div
                key={subject.id}
                className={`${styles.subjectCard} ${isSelected ? styles.subjectCardActive : ''}`}
                onClick={() => setActiveSubject(isSelected ? null : subject.id)}
                style={{ borderColor: isSelected ? subject.iconColor : undefined }}
              >
                <div className={styles.subjectIconRow}>
                  <div className={styles.subjectIcon} style={{ background: subject.iconBg, color: subject.iconColor }}>
                    {subject.icon}
                  </div>
                  <div className={styles.subjectGradeBadge} style={{ background: `${subject.iconColor}15`, color: subject.iconColor }}>
                    {subject.quarterGrade}
                  </div>
                </div>
                <h4 className={styles.subjectName}>{subject.name}</h4>
                <p className={styles.subjectTeacher}>👤 {subject.teacher}</p>
                <div className={styles.subjectFooter}>
                  <span className={styles.subjectUnits}>{subject.units} units</span>
                  <span className={styles.subjectDescriptor} style={{ color: desc.color }}>{desc.label}</span>
                </div>
                <div className={styles.gradeBar}>
                  <div className={styles.gradeBarFill} style={{ width: `${subject.quarterGrade}%`, background: subject.iconColor }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT: Subject Detail Panel */}
        <div className={styles.detailPanel}>
          {selected ? (
            <div className={styles.card}>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div className={styles.subjectIcon} style={{ background: selected.iconBg, color: selected.iconColor, fontSize: '1.75rem', width: '52px', height: '52px' }}>
                  {selected.icon}
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700, color: '#f0efed' }}>{selected.name}</h3>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(240,239,237,0.6)' }}>{selected.teacher}</p>
                </div>
              </div>

              {/* Grades Section */}
              <div className={styles.cardHeader}>
                <h4 className={styles.cardSectionTitle}>Quarterly Grades</h4>
              </div>
              <div className={styles.gradesRow}>
                {['Q1', 'Q2', 'Q3', 'Q4'].map((q, i) => {
                  const grade = i === 0 ? selected.quarterGrade : i === 3 ? selected.finalGrade : Math.max(75, selected.quarterGrade - i * 2);
                  const desc = GRADE_DESCRIPTOR(grade);
                  return (
                    <div key={q} className={styles.gradeBlock}>
                      <span className={styles.gradeLabel}>{q}</span>
                      <span className={styles.gradeValue} style={{ color: desc.color }}>{grade}</span>
                      <span className={styles.gradeDesc}>{desc.label}</span>
                    </div>
                  );
                })}
              </div>

              {/* Schedule for this subject */}
              <div className={styles.cardHeader} style={{ marginTop: '1.5rem' }}>
                <h4 className={styles.cardSectionTitle}>Class Schedule</h4>
              </div>
              {(() => {
                const sched = SCHEDULE_DATA.find(s => s.subject === selected.name);
                return sched ? (
                  <div className={styles.scheduleBlock}>
                    <div className={styles.scheduleRow}>
                      <span className={styles.scheduleLabel}>📅 Days</span>
                      <span className={styles.scheduleValue}>{sched.day}</span>
                    </div>
                    <div className={styles.scheduleRow}>
                      <span className={styles.scheduleLabel}>⏰ Time</span>
                      <span className={styles.scheduleValue}>{sched.time}</span>
                    </div>
                    <div className={styles.scheduleRow}>
                      <span className={styles.scheduleLabel}>📍 Room</span>
                      <span className={styles.scheduleValue}>{sched.room}</span>
                    </div>
                    <div className={styles.scheduleRow}>
                      <span className={styles.scheduleLabel}>👤 Teacher</span>
                      <span className={styles.scheduleValue}>{sched.teacher}</span>
                    </div>
                  </div>
                ) : (
                  <p style={{ color: 'rgba(240,239,237,0.4)', fontSize: '0.85rem' }}>No schedule data available.</p>
                );
              })()}

              {/* Quick stats */}
              <div className={styles.cardHeader} style={{ marginTop: '1.5rem' }}>
                <h4 className={styles.cardSectionTitle}>At a Glance</h4>
              </div>
              <div className={styles.glanceGrid}>
                <div className={styles.glanceItem}>
                  <span className={styles.glanceValue} style={{ color: selected.iconColor }}>{selected.units}</span>
                  <span className={styles.glanceLabel}>Units</span>
                </div>
                <div className={styles.glanceItem}>
                  <span className={styles.glanceValue} style={{ color: selected.iconColor }}>{selected.finalGrade}</span>
                  <span className={styles.glanceLabel}>Final Grade</span>
                </div>
                <div className={styles.glanceItem}>
                  <span className={styles.glanceValue} style={{ color: selected.iconColor }}>Q1</span>
                  <span className={styles.glanceLabel}>Current Quarter</span>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.card} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📚</div>
              <p style={{ color: 'rgba(240,239,237,0.5)', fontSize: '1rem', margin: 0 }}>Select a subject card to view details</p>
              <p style={{ color: 'rgba(240,239,237,0.3)', fontSize: '0.85rem', marginTop: '0.5rem' }}>Grades, schedule, and more</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

