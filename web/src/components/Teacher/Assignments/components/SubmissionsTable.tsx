'use client';

import React, { useState } from 'react';
import type { TeacherAssignmentRow } from '@/types/teacherAssignments';
import { DataTable, type DataTableColumn, ChalkBadge, listStyles } from '../../shared';
import styles from './assignmentDetail.module.css';

// Mock submission data
interface SubmissionRow {
  id: string;
  studentName: string;
  status: 'Turned In' | 'Missing' | 'Graded' | 'Late';
  submittedDate?: string;
  score: number | null;
  maxScore: number;
}

function generateMockSubmissions(assignment: TeacherAssignmentRow): SubmissionRow[] {
  return [
    { id: '1', studentName: 'Alice Johnson', status: 'Graded', submittedDate: 'May 20, 2025', score: 92, maxScore: 100 },
    { id: '2', studentName: 'Bob Smith', status: 'Turned In', submittedDate: 'May 21, 2025', score: null, maxScore: 100 },
    { id: '3', studentName: 'Charlie Davis', status: 'Missing', score: null, maxScore: 100 },
    { id: '4', studentName: 'Diana Prince', status: 'Late', submittedDate: 'May 22, 2025', score: null, maxScore: 100 },
    { id: '5', studentName: 'Evan Wright', status: 'Graded', submittedDate: 'May 20, 2025', score: 88, maxScore: 100 },
  ];
}

interface SubmissionsTableProps {
  assignment: TeacherAssignmentRow;
}

export function SubmissionsTable({ assignment }: SubmissionsTableProps) {
  const [submissions, setSubmissions] = useState<SubmissionRow[]>(() => generateMockSubmissions(assignment));
  const [scores, setScores] = useState<Record<string, string>>({});

  const COLUMNS: DataTableColumn[] = [
    { id: 'student', label: 'Student', sortable: true },
    { id: 'status', label: 'Status', sortable: true },
    { id: 'submitted', label: 'Submitted Date', sortable: true },
    { id: 'grade', label: 'Grade' },
  ];

  const handleScoreChange = (id: string, value: string) => {
    setScores((prev) => ({ ...prev, [id]: value }));
  };

  const handleGrade = (id: string) => {
    const scoreVal = parseFloat(scores[id]);
    if (isNaN(scoreVal)) return;

    setSubmissions((prev) =>
      prev.map((sub) =>
        sub.id === id ? { ...sub, status: 'Graded', score: scoreVal } : sub
      )
    );
  };

  const getStatusAccent = (status: string) => {
    switch (status) {
      case 'Turned In': return '#84a9ff';
      case 'Missing': return '#ff7e93';
      case 'Graded': return '#5cc789';
      case 'Late': return '#f5a623';
      default: return 'currentColor';
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ color: '#fff', margin: 0, fontWeight: 500 }}>
          {submissions.filter(s => s.status === 'Graded').length} / {assignment.totalStudents} Graded
        </h3>
        <button type="button" className={listStyles.primaryBtn}>
          Return All Graded
        </button>
      </div>

      <DataTable
        columns={COLUMNS}
        minWidth={800}
      >
        {submissions.map((sub) => (
          <tr key={sub.id}>
            <td>
              <span style={{ color: '#fff', fontWeight: 500 }}>{sub.studentName}</span>
            </td>
            <td>
              <ChalkBadge label={sub.status} accent={getStatusAccent(sub.status)} />
            </td>
            <td>
              <span style={{ color: 'rgba(255,255,255,0.7)' }}>{sub.submittedDate || '—'}</span>
            </td>
            <td>
              {sub.status === 'Graded' && sub.score !== null ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: '#5cc789', fontWeight: 600 }}>{sub.score}</span>
                  <span style={{ color: 'rgba(255,255,255,0.4)' }}>/ {sub.maxScore}</span>
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input
                    type="number"
                    value={scores[sub.id] || ''}
                    onChange={(e) => handleScoreChange(sub.id, e.target.value)}
                    placeholder="-"
                    style={{
                      width: '60px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '4px',
                      color: '#fff',
                      padding: '4px 8px',
                      outline: 'none',
                    }}
                  />
                  <span style={{ color: 'rgba(255,255,255,0.4)' }}>/ {sub.maxScore}</span>
                  <button
                    type="button"
                    onClick={() => handleGrade(sub.id)}
                    disabled={!scores[sub.id]}
                    style={{
                      background: scores[sub.id] ? '#5cc789' : 'rgba(255,255,255,0.1)',
                      color: scores[sub.id] ? '#000' : 'rgba(255,255,255,0.5)',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '4px 12px',
                      cursor: scores[sub.id] ? 'pointer' : 'not-allowed',
                      fontWeight: 600,
                      fontSize: '0.8rem',
                      marginLeft: '0.5rem',
                      transition: 'all 0.2s',
                    }}
                  >
                    Grade
                  </button>
                </div>
              )}
            </td>
          </tr>
        ))}
      </DataTable>
    </div>
  );
}
