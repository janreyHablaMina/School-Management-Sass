'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardBody } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import styles from './addSubscription.module.css';

interface AddSubscriptionViewProps {
  onCancel: () => void;
  onSave: () => void;
}

export const AddSubscriptionView: React.FC<AddSubscriptionViewProps> = ({ onCancel, onSave }) => {
  const [selectedSchool, setSelectedSchool] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');
  const [billingCycle, setBillingCycle] = useState('Monthly');
  const [trialPeriod, setTrialPeriod] = useState('No Trial');
  
  return (
    <div className={styles.pageContainer}>
      <div className={styles.mainGrid}>
        
        {/* Left Column: Form */}
        <div className={styles.leftColumn}>
          
          {/* 1. Select School & Plan */}
          <Card className={styles.schoolSection}>
            <CardHeader 
              title={<span style={{ fontFamily: 'Caveat, cursive', color: '#84a9ff' }}>1. Select School & Plan</span>}
              description="Choose the school and the subscription plan to assign."
            />
            <CardBody className={`${styles.flexCol} ${styles.gapLg}`}>
              {/* School Selection */}
              <div>
                <Select 
                  label="School *"
                  value={selectedSchool}
                  onChange={(e) => setSelectedSchool(e.target.value)}
                  options={[
                    { label: "St. Mary's Academy", value: 'school-1' },
                    { label: 'Greenfield High School', value: 'school-2' }
                  ]}
                  placeholder="Search and select a school..."
                />

                <div className={styles.infoBox} style={{ marginTop: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div className={styles.infoBoxIcon}>ℹ️</div>
                    <div>
                      <h4 style={{ margin: 0, color: '#84a9ff', fontSize: '0.95rem' }}>Can&apos;t find the school?</h4>
                      <p style={{ margin: 0, color: 'rgba(240, 239, 237, 0.6)', fontSize: '0.85rem' }}>Add a new school first.</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Add New School</Button>
                </div>
              </div>

              {/* Plan Selection */}
              <div>
                <Select 
                  label="Plan *"
                  value={selectedPlan}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                  options={[
                    { label: 'School Plan', value: 'school-plan' },
                    { label: 'District Plan', value: 'district-plan' },
                    { label: 'Enterprise Plan', value: 'enterprise-plan' }
                  ]}
                  placeholder="Select a plan..."
                />
              </div>
            </CardBody>
          </Card>

          {/* 2. Subscription Details */}
          <Card className={styles.detailsSection}>
            <CardHeader 
              title={<span style={{ fontFamily: 'Caveat, cursive', color: '#f5c842' }}>2. Subscription Details</span>}
              description="Configure the subscription period and billing information."
            />
            <CardBody className={`${styles.flexCol} ${styles.gapLg}`}>
              <div className={styles.twoColGrid}>
                {/* Billing Cycle */}
                <Select 
                  label="Billing Cycle *"
                  value={billingCycle}
                  onChange={(e) => setBillingCycle(e.target.value)}
                  options={[
                    { label: 'Monthly', value: 'Monthly' },
                    { label: 'Quarterly (Save 5%)', value: 'Quarterly (Save 5%)' },
                    { label: 'Semi-Annual (Save 10%)', value: 'Semi-Annual (Save 10%)' },
                    { label: 'Annual (Save 15%)', value: 'Annual (Save 15%)' }
                  ]}
                />

                {/* Trial Period */}
                <Select 
                  label="Trial Period (Optional)"
                  value={trialPeriod}
                  onChange={(e) => setTrialPeriod(e.target.value)}
                  options={[
                    { label: 'No Trial', value: 'No Trial' },
                    { label: '7 Days Trial', value: '7 Days Trial' },
                    { label: '14 Days Trial', value: '14 Days Trial' },
                    { label: '30 Days Trial', value: '30 Days Trial' }
                  ]}
                />
              </div>

              {/* Dates */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
                <Input type="date" label="Start Date *" defaultValue="2025-05-31" style={{ colorScheme: 'dark' }} />
                <Input type="date" label="End Date *" defaultValue="2025-06-30" style={{ colorScheme: 'dark' }} />
                <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', opacity: 0, userSelect: 'none' }}>Hidden</label>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                    <label className={styles.radioLabel} style={{ color: '#84a9ff', margin: 0 }}>
                      <input type="checkbox" defaultChecked className={styles.radioInput} />
                      Auto-renewal
                    </label>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* 3. Payment & Invoicing */}
          <Card className={styles.paymentSection}>
            <CardHeader 
              title={<span style={{ fontFamily: 'Caveat, cursive', color: '#ff8a8a' }}>3. Payment & Invoicing</span>}
              description="Set the pricing and payment details for this subscription."
            />
            <CardBody className={`${styles.flexCol} ${styles.gapLg}`}>
              <div className={styles.paymentGrid}>
                <Input type="text" label="Monthly Fee (PHP) *" defaultValue="0.00" />
                <Input type="text" label="Discount (%)" defaultValue="0" />
                <Input type="text" label="Tax (%)" defaultValue="0" />
                <Input type="text" label="Total Amount (PHP)" readOnly defaultValue="₱0.00" style={{ background: 'rgba(132, 169, 255, 0.05)', color: '#84a9ff', fontWeight: 600, borderColor: 'rgba(132, 169, 255, 0.2)' }} />
              </div>
              <Input type="text" label="Notes (Optional)" placeholder="Add any notes or additional information..." />
            </CardBody>
          </Card>
        </div>

        {/* Right Column: Summary */}
        <div className={styles.rightColumn}>
          
          <Card style={{ borderTop: '4px solid #b388ff' }}>
            <CardBody>
              <h3 style={{ fontFamily: 'Caveat, cursive', margin: '0 0 1.5rem 0', fontSize: '1.6rem', color: '#b388ff' }}>📋 Subscription Summary</h3>
              
              <div className={`${styles.flexCol} ${styles.gapLg}`} style={{ marginBottom: '2rem' }}>
                <div>
                  <div style={{ color: 'rgba(240, 239, 237, 0.6)', fontSize: '0.85rem', marginBottom: '0.3rem' }}>School</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: 'rgba(240, 239, 237, 0.4)' }}>🏫</span>
                    <span style={{ color: selectedSchool ? '#f0efed' : 'rgba(240, 239, 237, 0.4)' }}>
                      {selectedSchool ? "St. Mary's Academy" : 'Not Selected'}
                    </span>
                  </div>
                </div>
                
                <div>
                  <div style={{ color: 'rgba(240, 239, 237, 0.6)', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Plan</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: 'rgba(240, 239, 237, 0.4)' }}>📋</span>
                    <span style={{ color: selectedPlan ? '#f0efed' : 'rgba(240, 239, 237, 0.4)' }}>
                      {selectedPlan ? "School Plan" : 'Not Selected'}
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ borderTop: '1px dashed rgba(240, 239, 237, 0.1)', paddingTop: '1.5rem' }} className={`${styles.flexCol} ${styles.gapMd}`}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span style={{ color: 'rgba(240, 239, 237, 0.6)' }}>Billing Cycle</span>
                  <span style={{ color: '#f0efed' }}>{billingCycle.split(' ')[0]}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span style={{ color: 'rgba(240, 239, 237, 0.6)' }}>Start Date</span>
                  <span style={{ color: '#f0efed' }}>May 31, 2025</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span style={{ color: 'rgba(240, 239, 237, 0.6)' }}>End Date</span>
                  <span style={{ color: '#f0efed' }}>June 30, 2025</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span style={{ color: 'rgba(240, 239, 237, 0.6)' }}>Trial Period</span>
                  <span style={{ color: '#f0efed' }}>{trialPeriod}</span>
                </div>
              </div>

              <div style={{ borderTop: '1px dashed rgba(240, 239, 237, 0.1)', marginTop: '1.5rem', paddingTop: '1.5rem' }} className={`${styles.flexCol} ${styles.gapMd}`}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span style={{ color: 'rgba(240, 239, 237, 0.6)' }}>Monthly Fee</span>
                  <span style={{ color: '#f0efed' }}>₱0.00</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span style={{ color: 'rgba(240, 239, 237, 0.6)' }}>Discount</span>
                  <span style={{ color: '#f0efed' }}>-</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span style={{ color: 'rgba(240, 239, 237, 0.6)' }}>Tax</span>
                  <span style={{ color: '#f0efed' }}>-</span>
                </div>
              </div>

              <div className={styles.summaryAmountBox}>
                <span style={{ fontWeight: 600, color: '#f0efed' }}>Total Amount</span>
                <span style={{ fontWeight: 600, color: '#84a9ff', fontSize: '1.2rem' }}>₱0.00</span>
              </div>
            </CardBody>
          </Card>

          <Card style={{ borderTop: '4px solid #f5c842' }}>
            <CardBody>
              <h3 style={{ fontFamily: 'Caveat, cursive', margin: '0 0 0.5rem 0', fontSize: '1.6rem', color: '#f5c842' }}>✨ Plan Features</h3>
              <p style={{ color: 'rgba(240, 239, 237, 0.6)', margin: '0 0 1.5rem 0', fontSize: '0.85rem' }}>Select a plan to see the features and limits included.</p>
              
              <div className={styles.featureList}>
                {['Student Limit', 'Teacher Limit', 'Sections Limit', 'AI Credits', 'Storage', 'Support', 'And more...'].map((feature, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <div className={styles.featureIcon}>
                      <span style={{ color: '#5cc789', fontSize: '0.7rem' }}>✓</span>
                    </div>
                    <span style={{ color: 'rgba(240, 239, 237, 0.7)', fontSize: '0.9rem' }}>{feature}</span>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <Button variant="secondary" onClick={onCancel} style={{ flex: 1 }}>Cancel</Button>
            <Button variant="primary" onClick={onSave} style={{ flex: 2 }}>+ Create Subscription</Button>
          </div>

        </div>

      </div>
    </div>
  );
};
