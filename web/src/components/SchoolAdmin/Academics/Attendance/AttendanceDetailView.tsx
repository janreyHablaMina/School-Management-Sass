import React, { useState } from 'react';
import { DataTable, type DataTableColumn, ChalkBadge, ProgressStatCell, listStyles } from '@/components/ui/shared';
import peopleStyles from '../../People/students.module.css';

interface AttendanceDetailViewProps {
  attendanceId: string;
  onBack: () => void;
}

interface SectionClassRecord {
  id: string;
  subject: string;
  teacher: string;
  time: string;
  present: number;
  absent: number;
  late: number;
  total: number;
  status: 'Submitted' | 'Pending';
  accent: string;
}

const COLUMNS: DataTableColumn[] = [
  { id: 'subject', label: 'Subject / Class', sortable: true },
  { id: 'teacher', label: 'Teacher', sortable: true },
  { id: 'time', label: 'Time', sortable: true },
  { id: 'present', label: 'Present', sortable: true },
  { id: 'absent', label: 'Absent', sortable: true },
  { id: 'late', label: 'Late', sortable: true },
  { id: 'rate', label: 'Rate', sortable: true },
  { id: 'status', label: 'Status', sortable: true },
];

function statusAccent(status: string) {
  return status === 'Submitted' ? '#5cc789' : '#f5c842';
}

function rateAccent(rate: number) {
  if (rate >= 93) return '#5cc789';
  if (rate >= 88) return '#f5c842';
  return '#ff7e93';
}

// Generate some mock classes based on the attendance ID
function getMockClassesForSection(id: string): SectionClassRecord[] {
  return [
    {
      id: `${id}-math`,
      subject: 'Mathematics',
      teacher: 'Albert Cruz',
      time: '08:00 AM - 09:00 AM',
      present: 36,
      absent: 1,
      late: 1,
      total: 38,
      status: 'Submitted',
      accent: '#b68eff',
    },
    {
      id: `${id}-sci`,
      subject: 'Science',
      teacher: 'Sarah Jenkins',
      time: '09:00 AM - 10:00 AM',
      present: 35,
      absent: 2,
      late: 1,
      total: 38,
      status: 'Submitted',
      accent: '#5cc789',
    },
    {
      id: `${id}-eng`,
      subject: 'English',
      teacher: 'David Smith',
      time: '10:15 AM - 11:15 AM',
      present: 38,
      absent: 0,
      late: 0,
      total: 38,
      status: 'Submitted',
      accent: '#84a9ff',
    },
    {
      id: `${id}-hist`,
      subject: 'History',
      teacher: 'Maria Garcia',
      time: '11:15 AM - 12:15 PM',
      present: 0,
      absent: 0,
      late: 0,
      total: 38,
      status: 'Pending',
      accent: '#f5c842',
    }
  ];
}

export const AttendanceDetailView: React.FC<AttendanceDetailViewProps> = ({
  attendanceId,
  onBack,
}) => {
  const [sortKey, setSortKey] = useState<keyof SectionClassRecord | 'rate'>('time');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const classes = getMockClassesForSection(attendanceId);

  const sortedClasses = [...classes].sort((a, b) => {
    let valA: any = a[sortKey as keyof SectionClassRecord];
    let valB: any = b[sortKey as keyof SectionClassRecord];

    if (sortKey === 'rate') {
      valA = (a.present / a.total) * 100;
      valB = (b.present / b.total) * 100;
    }

    if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
    if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key as keyof SectionClassRecord | 'rate');
      setSortDirection('asc');
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <button 
        onClick={onBack}
        style={{
          background: 'none',
          border: 'none',
          color: '#84a9ff',
          cursor: 'pointer',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '14px',
          fontWeight: 500,
        }}
      >
        <span>←</span> Back to Attendance Directory
      </button>

      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--text-primary)' }}>
          Class Breakdown
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
          Detailed attendance per subject for the selected section.
        </p>
      </div>

      <div className={listStyles.tableContainer}>
        <DataTable
          columns={COLUMNS}
          sortKey={sortKey}
          sortDirection={sortDirection}
          onSort={handleSort}
        >
          {sortedClasses.map((cls) => {
            const rate = (cls.present / cls.total) * 100;
            return (
              <tr key={cls.id}>
                <td>
                  <div className={peopleStyles.studentCell}>
                    <div className={peopleStyles.avatar} style={{ background: cls.accent }}>
                      {cls.subject.substring(0, 1)}
                    </div>
                    <div className={peopleStyles.studentInfo}>
                      <span className={peopleStyles.studentName}>{cls.subject}</span>
                    </div>
                  </div>
                </td>
                <td>{cls.teacher}</td>
                <td>{cls.time}</td>
                <td>{cls.present}</td>
                <td>{cls.absent}</td>
                <td>{cls.late}</td>
                <td>
                  <ProgressStatCell
                    current={cls.present}
                    total={cls.total}
                    barColor={rateAccent(rate)}
                  />
                </td>
                <td>
                  <ChalkBadge label={cls.status} accent={statusAccent(cls.status)} />
                </td>
              </tr>
            );
          })}
        </DataTable>
      </div>
    </div>
  );
};
