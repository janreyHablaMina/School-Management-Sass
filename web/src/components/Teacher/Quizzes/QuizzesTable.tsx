import {
  DataTable,
  type DataTableColumn,
  ResourceBulkBar,
  SelectAllCheckbox,
} from '../shared';
import { QuizRow } from './components/QuizRow';
import type { TeacherQuizRow } from '@/types/teacherQuizzes';
import type { QuizSortKey } from './useQuizzes';

interface QuizzesTableProps {
  quizzes: TeacherQuizRow[];
  selectedIds: string[];
  allVisibleSelected: boolean;
  sortKey: QuizSortKey | null;
  sortDirection: 'asc' | 'desc';
  onSort: (key: QuizSortKey) => void;
  onToggle: (id: string) => void;
  onToggleAllVisible: () => void;
  onClearSelection: () => void;
  onArchiveSelected: () => void;
  onDeleteSelected: () => void;
  onArchiveItem: (id: string) => void;
  onDeleteItem: (id: string) => void;
  onDuplicateItem: (id: string) => void;
  onViewQuiz: (quiz: TeacherQuizRow) => void;
}

const COLUMNS: DataTableColumn[] = [
  { id: 'title', label: 'Quiz', sortable: true },
  { id: 'classLabel', label: 'Class', sortable: true },
  { id: 'questionCount', label: 'Questions', sortable: true },
  { id: 'dueSortKey', label: 'Due Date / Schedule', sortable: true },
  { id: 'attemptCount', label: 'Attempts', sortable: true },
  { id: 'actions', label: 'Actions' },
];

export function QuizzesTable({
  quizzes,
  selectedIds,
  allVisibleSelected,
  sortKey,
  sortDirection,
  onSort,
  onToggle,
  onToggleAllVisible,
  onClearSelection,
  onArchiveSelected,
  onDeleteSelected,
  onArchiveItem,
  onDeleteItem,
  onDuplicateItem,
  onViewQuiz,
}: QuizzesTableProps) {
  const selectedCount = selectedIds.length;
  const bulkActions = [
    {
      label: `Archive selected (${selectedCount})`,
      onClick: onArchiveSelected,
      tone: 'danger' as const,
    },
    {
      label: `Delete selected (${selectedCount})`,
      onClick: onDeleteSelected,
      tone: 'danger' as const,
    },
  ];

  return (
    <div>
      <ResourceBulkBar
        selectedCount={selectedCount}
        itemLabel="quiz"
        onClearSelection={onClearSelection}
        actions={bulkActions}
      />

      <DataTable
        columns={COLUMNS}
        minWidth={920}
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSort={(key) => onSort(key as QuizSortKey)}
        leadingHeader={
          <SelectAllCheckbox
            checked={allVisibleSelected}
            onChange={onToggleAllVisible}
            label="Select all visible quizzes"
          />
        }
      >
        {quizzes.map((quiz) => (
          <QuizRow
            key={quiz.id}
            quiz={quiz}
            selected={selectedIds.includes(quiz.id)}
            onToggleSelect={onToggle}
            onArchive={onArchiveItem}
            onDelete={onDeleteItem}
            onDuplicate={onDuplicateItem}
            onViewQuiz={onViewQuiz}
          />
        ))}
      </DataTable>
    </div>
  );
}
