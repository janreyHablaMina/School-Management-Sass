import React from 'react';
import globalStyles from '@/app/admin/admin.module.css';
import styles from './addSchool.module.css';

interface StepperProps {
  currentStep: number;
}

const steps = [
  { id: 1, label: 'School Information', icon: '🏫' },
  { id: 2, label: 'Contact Details', icon: '📞' },
  { id: 3, label: 'Address', icon: '📍' },
  { id: 4, label: 'Review', icon: '📋' }
];

export const Stepper: React.FC<StepperProps> = ({ currentStep }) => {
  return (
    <div className={globalStyles.tableCard} style={{ padding: '2rem 4rem', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', border: '1px solid rgba(240, 239, 237, 0.1)', minHeight: 'auto' }}>
      {steps.map((step, index) => {
        const isActive = currentStep >= step.id;
        return (
          <React.Fragment key={step.id}>
            <div className={styles.stepperContainer}>
              <div className={isActive ? styles.stepIconActive : styles.stepIconInactive}>
                {step.icon}
              </div>
              <span className={isActive ? styles.stepLabelActive : styles.stepLabelInactive}>
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={styles.connector} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
