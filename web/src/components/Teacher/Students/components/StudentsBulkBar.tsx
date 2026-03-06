'use client';

import { ResourceBulkBar } from '../../shared';

interface StudentsBulkBarProps {
  selectedCount: number;
  selectedActiveCount: number;
  selectedInactiveCount: number;
  onMarkInactive: () => void;
  onRestoreActive: () => void;
  onClearSelection: () => void;
}

export function StudentsBulkBar({
  selectedCount,
  selectedActiveCount,
  selectedInactiveCount,
  onMarkInactive,
  onRestoreActive,
  onClearSelection,
}: StudentsBulkBarProps) {
  return (
    <ResourceBulkBar
      selectedCount={selectedCount}
      itemLabel="student"
      onClearSelection={onClearSelection}
      actions={[
        ...(selectedActiveCount > 0
          ? [
              {
                label: `Mark inactive (${selectedActiveCount})`,
                onClick: onMarkInactive,
                tone: 'danger' as const,
              },
            ]
          : []),
        ...(selectedInactiveCount > 0
          ? [
              {
                label: `Restore active (${selectedInactiveCount})`,
                onClick: onRestoreActive,
                tone: 'restore' as const,
              },
            ]
          : []),
      ]}
    />
  );
}
