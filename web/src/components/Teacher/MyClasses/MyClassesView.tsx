'use client';

import React from 'react';
import styles from './myClasses.module.css';
import { useMyClasses } from './useMyClasses';
import { MyClassesFilters } from './MyClassesFilters';
import { ClassesTable } from './ClassesTable';

export function MyClassesView() {
  const {
    metrics,
    filterOptions,
    searchTerm,
    setSearchTerm,
    academicYear,
    setAcademicYear,
    gradeLevel,
    setGradeLevel,
    subject,
    setSubject,
    status,
    setStatus,
    clearFilters,
    filteredCount,
    paginatedClasses,
    page,
    totalPages,
    setPage,
    pageSize,
  } = useMyClasses();

  const rangeStart = filteredCount === 0 ? 0 : (page - 1) * pageSize + 1;
  const rangeEnd = Math.min(page * pageSize, filteredCount);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerText}>
          <h1>My Classes</h1>
          <p>View and manage all your classes in one place.</p>
        </div>
        <button type="button" className={styles.addBtn}>
          + Create New Class
        </button>
      </div>

      <section className={styles.metricsGrid}>
        {metrics.map((m) => (
          <div key={m.label} className={styles.metricCard}>
            <div
              className={styles.metricIcon}
              style={{ background: `${m.accent}22`, color: m.accent }}
            >
              {m.icon}
            </div>
            <div className={styles.metricBody}>
              <span className={styles.metricLabel}>{m.label}</span>
              <span className={styles.metricValue}>{m.value}</span>
              <span className={styles.metricSub}>{m.subtitle}</span>
            </div>
          </div>
        ))}
      </section>

      <MyClassesFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        academicYear={academicYear}
        onAcademicYearChange={setAcademicYear}
        gradeLevel={gradeLevel}
        onGradeLevelChange={setGradeLevel}
        subject={subject}
        onSubjectChange={setSubject}
        status={status}
        onStatusChange={setStatus}
        academicYears={filterOptions.academicYears}
        gradeLevels={filterOptions.gradeLevels}
        subjects={filterOptions.subjects}
        statuses={filterOptions.statuses}
        onClear={clearFilters}
      />

      {paginatedClasses.length === 0 ? (
        <div className={styles.emptyState}>
          <h3>No classes found</h3>
          <p>Try adjusting your search or filters.</p>
        </div>
      ) : (
        <ClassesTable classes={paginatedClasses} />
      )}

      <div className={styles.pagination}>
        <span className={styles.pageInfo}>
          Showing {rangeStart} to {rangeEnd} of {filteredCount} classes
        </span>
        <div className={styles.pageControls}>
          <button
            type="button"
            className={styles.pageBtn}
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
            aria-label="Previous page"
          >
            ‹
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              className={`${styles.pageBtn} ${n === page ? styles.pageBtnActive : ''}`}
              onClick={() => setPage(n)}
            >
              {n}
            </button>
          ))}
          <button
            type="button"
            className={styles.pageBtn}
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
            aria-label="Next page"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
