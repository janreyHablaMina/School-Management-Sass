'use client';

import type { ClassFormInput } from '@/types/myClasses';
import { ClassFormModal } from './ClassFormModal';

interface CreateClassModalProps {
  subjects: string[];
  gradeLevels: string[];
  academicYears: string[];
  onCancel: () => void;
  onCreate: (input: ClassFormInput) => void;
}

/** Thin create-mode wrapper around ClassFormModal. */
export function CreateClassModal(props: CreateClassModalProps) {
  return (
    <ClassFormModal
      mode="create"
      subjects={props.subjects}
      gradeLevels={props.gradeLevels}
      academicYears={props.academicYears}
      onCancel={props.onCancel}
      onSubmit={props.onCreate}
    />
  );
}
