import { DataTable } from '../shared';
import type { MyClassRow } from '@/types/myClasses';
import { ClassRow } from './components/ClassRow';

interface ClassesTableProps {
  classes: MyClassRow[];
  onOpen: (id: number) => void;
  onEdit: (id: number) => void;
  onDuplicate: (id: number) => void;
}

const COLUMNS = ['Class', 'Schedule', 'Students', 'Attendance', 'Progress', 'Actions'] as const;

export function ClassesTable({ classes, onOpen, onEdit, onDuplicate }: ClassesTableProps) {
  return (
    <DataTable columns={COLUMNS} minWidth={980}>
      {classes.map((cls) => (
        <ClassRow
          key={cls.id}
          cls={cls}
          onOpen={onOpen}
          onEdit={onEdit}
          onDuplicate={onDuplicate}
        />
      ))}
    </DataTable>
  );
}
