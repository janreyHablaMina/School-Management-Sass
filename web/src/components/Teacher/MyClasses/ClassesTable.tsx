import React from 'react';
import { DataTable } from '../shared';
import { ClassRow } from './components/ClassRow';
import type { MyClassRow } from '@/types/myClasses';

interface ClassesTableProps {
  classes: MyClassRow[];
}

const COLUMNS = ['Class', 'Schedule', 'Students', 'Attendance', 'Progress', 'Actions'] as const;

export function ClassesTable({ classes }: ClassesTableProps) {
  return (
    <DataTable columns={COLUMNS} minWidth={980}>
      {classes.map((cls) => (
        <ClassRow key={cls.id} cls={cls} />
      ))}
    </DataTable>
  );
}
