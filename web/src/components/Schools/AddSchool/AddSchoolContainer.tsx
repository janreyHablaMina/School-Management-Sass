'use client';

import React, { useState } from 'react';
import globalStyles from '@/app/admin/admin.module.css';
import styles from './addSchool.module.css';
import { Stepper } from './Stepper';
import { Step1BasicInfo } from './Step1BasicInfo';
import { Step2ContactDetails } from './Step2ContactDetails';
import { Step3Address } from './Step3Address';
import { Step4Preferences } from './Step4Preferences';
import { Step5Review } from './Step5Review';

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
      {currentStep === 3 && <Step3Address />}
      {currentStep === 4 && <Step4Preferences />}
      {currentStep === 5 && <Step5Review />}

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
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          {currentStep > 1 && currentStep < 5 && (
            <button 
              onClick={onSave}
              className={styles.secondaryBtn}
              style={{ background: '#fff', color: '#0b1a13', border: 'none', fontWeight: 600 }}
            >
              Save & Exit
            </button>
          )}
          {currentStep === 5 && (
            <button 
              onClick={onSave}
              className={styles.secondaryBtn}
              style={{ background: 'transparent', color: '#f0efed', borderColor: 'rgba(240, 239, 237, 0.2)' }}
            >
              <span style={{ fontSize: '1.2rem', marginRight: '0.4rem' }}>📄</span> Save as Draft
            </button>
          )}
          <button 
            onClick={currentStep === 5 ? onSave : handleNext}
            className={globalStyles.toolbarAddBtn}
            style={{ 
              height: 'auto', padding: '0.8rem 2.5rem', fontSize: '1.05rem', 
              background: '#b388ff', borderColor: '#2e2e2e', color: '#0b1a13'
            }}
          >
            {currentStep === 5 ? <><span style={{ fontSize: '1.2rem', marginRight: '0.4rem' }}>✓</span> Submit School</> : 'Next Step →'}
          </button>
        </div>
      </div>
    </div>
  );
};
