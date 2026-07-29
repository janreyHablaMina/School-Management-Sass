import React from 'react';
import { AssessmentStatsGrid } from '../../tabs/Assessments/AssessmentStatsGrid';
import { AssessmentTable } from '../../tabs/Assessments/AssessmentTable';
import { AssessmentFooter } from '../../tabs/Assessments/AssessmentFooter';

export const AssessmentsTab: React.FC = () => {
  return (
    <>
      <AssessmentStatsGrid />
      <AssessmentTable />
      <AssessmentFooter />
    </>
  );
};
