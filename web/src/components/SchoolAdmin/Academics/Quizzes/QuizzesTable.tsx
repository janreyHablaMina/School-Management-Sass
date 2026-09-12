import React from 'react';
import {
  ChalkBadge,
  DataTable,
  listStyles,
  ProgressStatCell,
  ResourceBulkBar,
  RowActionsMenu,
  RowSelectCell,
  SelectAllCheckbox,
  type DataTableColumn,
} from '@/components/Teacher/shared';
import peopleStyles from '../../People/students.module.css';
import type { QuizRecord, QuizSortKey } from './useQuizzes';

interface QuizzesTableProps {
  quizzes: QuizRecord[];
  selectedQuizzes: string[];
  sortKey: QuizSortKey | null;
  sortDirection: 'asc' | 'desc';
  onSelectAll: (checked: boolean) => void;
  onSelectQuiz: (id: string) => void;
  onSort: (key: QuizSortKey) => void;
}

const COLUMNS: DataTableColumn[] = [
  { id: 'title', label: 'Quiz', sortable: true },
  { id: 'classLabel', label: 'Class', sortable: true },
  { id: 'teacher', label: 'Teacher', sortable: true },
  { id: 'questionCount', label: 'Questions', sortable: true },
  { id: 'dueSortKey', label: 'Due Date', sortable: true },
  { id: 'attemptCount', label: 'Attempts', sortable: true },
  { id: 'averageScore', label: 'Average', sortable: true },
  { id: 'status', label: 'Status', sortable: true },
  { id: 'riskLevel', label: 'Risk', sortable: true },
  { id: 'actions', label: 'Action' },
];

const ROW_ACTIONS = [
  { icon: '>', label: 'View Quiz' },
  { icon: '@', label: 'Message Teacher' },
  { icon: '#', label: 'Export Results' },
] as const;

function statusAccent(status: string) {
  if (status === 'Completed') return '#5cc789';
  if (status === 'Active') return '#84a9ff';
  if (status === 'Upcoming') return '#f5c842';
  return '#8a9a90';
}

function riskAccent(risk: string) {
  if (risk === 'Low') return '#5cc789';
  if (risk === 'Medium') return '#f5c842';
  return '#ff7e93';
}

function quizInitials(title: string) {
  return title
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

export const QuizzesTable: React.FC<QuizzesTableProps> = ({
  quizzes,
  selectedQuizzes,
  sortKey,
  sortDirection,
  onSelectAll,
  onSelectQuiz,
  onSort,
}) => {
  const allVisibleSelected = selectedQuizzes.length === quizzes.length && quizzes.length > 0;

  return (
    <div className={peopleStyles.tableStack}>
      <ResourceBulkBar
        selectedCount={selectedQuizzes.length}
        itemLabel="quiz"
        onClearSelection={() => onSelectAll(false)}
        actions={[
          {
            label: 'Export Results',
            onClick: () => alert('Export quiz results functionality not implemented yet.'),
          },
          {
            label: 'Notify Teachers',
            onClick: () => alert('Notify teachers functionality not implemented yet.'),
          },
        ]}
      />

      <DataTable
        columns={COLUMNS}
        minWidth={1500}
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSort={(key) => onSort(key as QuizSortKey)}
        leadingHeader={
          <SelectAllCheckbox
            checked={allVisibleSelected}
            onChange={(event) => onSelectAll(event.target.checked)}
            label="Select all visible quizzes"
          />
        }
      >
        {quizzes.map((quiz) => (
          <tr
            key={quiz.id}
            className={selectedQuizzes.includes(quiz.id) ? listStyles.rowSelected : ''}
          >
            <RowSelectCell
              selected={selectedQuizzes.includes(quiz.id)}
              onToggle={() => onSelectQuiz(quiz.id)}
              label={`Select ${quiz.title}`}
            />
            <td>
              <div className={peopleStyles.studentCell}>
                <div className={peopleStyles.avatar} style={{ background: quiz.accent }}>
                  {quizInitials(quiz.title)}
                </div>
                <div className={peopleStyles.studentInfo}>
                  <span className={peopleStyles.studentName}>{quiz.title}</span>
                  <span className={peopleStyles.studentEmail}>
                    {quiz.subject} | {quiz.type}
                  </span>
                </div>
              </div>
            </td>
            <td>{quiz.classLabel}</td>
            <td>{quiz.teacher}</td>
            <td>{quiz.questionCount}</td>
            <td>{quiz.dueDate}</td>
            <td>
              <ProgressStatCell
                current={quiz.attemptCount}
                total={quiz.totalStudents}
                barColor={quiz.accent}
              />
            </td>
            <td>{quiz.averageScore === null ? '-' : `${quiz.averageScore}%`}</td>
            <td>
              <ChalkBadge label={quiz.status} accent={statusAccent(quiz.status)} />
            </td>
            <td>
              <ChalkBadge label={quiz.riskLevel} accent={riskAccent(quiz.riskLevel)} />
            </td>
            <td>
              <RowActionsMenu
                label={`More actions for ${quiz.title}`}
                actions={ROW_ACTIONS}
                onAction={(label) => {
                  if (label === 'View Quiz') {
                    alert('Quiz detail functionality not implemented yet.');
                  }
                  if (label === 'Message Teacher') {
                    alert('Message teacher functionality not implemented yet.');
                  }
                  if (label === 'Export Results') {
                    alert('Export quiz results functionality not implemented yet.');
                  }
                }}
              />
            </td>
          </tr>
        ))}
      </DataTable>
    </div>
  );
};
