'use client';

import React, { useState } from 'react';
import globalStyles from '@/app/admin/admin.module.css';
import styles from './addSchool.module.css';
import { Stepper } from './Stepper';
import { Step1BasicInfo } from './Step1BasicInfo';
import { Step2ContactDetails } from './Step2ContactDetails';

interface AddSchoolContainerProps {
  onCancel: () => void;
  onSave: () => void;
}

export const AddSchoolContainer: React.FC<AddSchoolContainerProps> = ({ onCancel, onSave }) => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, 5));
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  return (
    <div className={styles.pageContainer}>
      <Stepper currentStep={currentStep} />

      {currentStep === 1 && <Step1BasicInfo />}
      {currentStep === 2 && <Step2ContactDetails />}
      
      {/* Placeholders for future steps */}
      {currentStep === 3 && <div className={globalStyles.tableCard} style={{ padding: '2.5rem' }}>Step 3: Address</div>}
      {currentStep === 4 && <div className={globalStyles.tableCard} style={{ padding: '2.5rem' }}>Step 4: Preferences</div>}
      {currentStep === 5 && <div className={globalStyles.tableCard} style={{ padding: '2.5rem' }}>Step 5: Review</div>}

      {/* Action Bar */}
      <div className={styles.actionBar}>
        {currentStep === 1 ? (
          <button onClick={onCancel} className={styles.secondaryBtn}>
            Cancel
          </button>
        ) : (
          <button onClick={handleBack} className={styles.secondaryBtn}>
            <span>←</span> Back
          </button>
        )}
        <button 
          onClick={currentStep === 5 ? onSave : handleNext}
          className={globalStyles.toolbarAddBtn}
          style={{ 
            height: 'auto', padding: '0.8rem 2.5rem', fontSize: '1.05rem', 
            background: currentStep === 5 ? '#5cc789' : '#b388ff', 
            borderColor: '#2e2e2e', color: '#0b1a13'
          }}
        >
          {currentStep === 5 ? 'Complete →' : 'Next Step →'}
        </button>
      </div>
    </div>
  );
};
