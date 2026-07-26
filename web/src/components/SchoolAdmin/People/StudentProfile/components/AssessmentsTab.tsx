import React from 'react';
import { AssessmentStatsGrid } from './AssessmentStatsGrid';
import { AssessmentTable } from './AssessmentTable';
import { AssessmentFooter } from './AssessmentFooter';

export const AssessmentsTab: React.FC = () => {
  return (
    <>
      <AssessmentStatsGrid />
      <AssessmentTable />
      <AssessmentFooter />
    </>
  );
};
