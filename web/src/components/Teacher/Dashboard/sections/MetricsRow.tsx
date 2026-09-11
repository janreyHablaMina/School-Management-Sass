import React from 'react';
import { DashboardMetrics } from '@/components/shared/DashboardMetrics';
import type { TeacherMetric } from '@/types/teacherPortal';

interface MetricsRowProps {
  metrics: TeacherMetric[];
}

export function MetricsRow({ metrics }: MetricsRowProps) {
  return <DashboardMetrics metrics={metrics} />;
}
