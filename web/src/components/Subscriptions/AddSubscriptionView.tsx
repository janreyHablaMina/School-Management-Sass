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
          
          {/* 1. Select School */}
          <Card className={styles.schoolSection}>
            <CardHeader 
              title={<span style={{ fontFamily: 'Caveat, cursive', color: '#84a9ff' }}>1. Select School</span>}
              description="Choose the school that will be assigned this subscription."
            />
            <CardBody className={`${styles.flexCol} ${styles.gapLg}`}>
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

              <div className={styles.infoBox}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div className={styles.infoBoxIcon}>ℹ️</div>
                  <div>
                    <h4 style={{ margin: 0, color: '#84a9ff', fontSize: '0.95rem' }}>Can&apos;t find the school?</h4>
                    <p style={{ margin: 0, color: 'rgba(240, 239, 237, 0.6)', fontSize: '0.85rem' }}>Add a new school first.</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">Add New School</Button>
              </div>
            </CardBody>
          </Card>

          {/* 2. Select Plan */}
          <Card className={styles.planSection}>
            <CardHeader 
              title={<span style={{ fontFamily: 'Caveat, cursive', color: '#5cc789' }}>2. Select Plan</span>}
              description="Choose a subscription plan for the school."
            />
            <CardBody className={styles.twoColGrid}>
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

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Plan Details</label>
                <div className={styles.planDetailsBox}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📄</div>
                  <div style={{ fontWeight: 500, color: 'rgba(240, 239, 237, 0.9)' }}>Please select a plan to view details</div>
                  <div style={{ fontSize: '0.85rem' }}>Plan features and limits will appear here.</div>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* 3. Subscription Details */}
          <Card className={styles.detailsSection}>
            <CardHeader 
              title={<span style={{ fontFamily: 'Caveat, cursive', color: '#f5c842' }}>3. Subscription Details</span>}
              description="Configure the subscription period and billing information."
            />
            <CardBody className={styles.detailsGrid}>
              <div>
                <label style={{ display: 'block', marginBottom: '1rem', fontSize: '0.9rem', fontWeight: 500 }}>Billing Cycle *</label>
                <div className={`${styles.flexCol} ${styles.gapMd}`}>
                  {['Monthly', 'Quarterly (Save 5%)', 'Semi-Annual (Save 10%)', 'Annual (Save 15%)'].map(cycle => (
                    <label key={cycle} className={styles.radioLabel}>
                      <input 
                        type="radio" 
                        name="billingCycle" 
                        value={cycle} 
                        checked={billingCycle === cycle}
                        onChange={(e) => setBillingCycle(e.target.value)}
                        className={styles.radioInput}
                      />
                      {cycle}
                    </label>
                  ))}
                </div>
              </div>

              <div className={`${styles.flexCol} ${styles.gapLg}`}>
                <Input type="date" label="Start Date *" defaultValue="2025-05-31" style={{ colorScheme: 'dark' }} />
                <Input type="date" label="End Date *" defaultValue="2025-06-30" style={{ colorScheme: 'dark' }} />
                <label className={styles.radioLabel} style={{ color: '#84a9ff' }}>
                  <input type="checkbox" defaultChecked className={styles.radioInput} />
                  Auto-renewal
                </label>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '1rem', fontSize: '0.9rem', fontWeight: 500 }}>Trial Period (Optional)</label>
                <div className={`${styles.flexCol} ${styles.gapMd}`} style={{ marginBottom: '1.5rem' }}>
                  {['No Trial', '7 Days Trial', '14 Days Trial', '30 Days Trial'].map(trial => (
                    <label key={trial} className={styles.radioLabel}>
                      <input 
                        type="radio" 
                        name="trialPeriod" 
                        value={trial} 
                        checked={trialPeriod === trial}
                        onChange={(e) => setTrialPeriod(e.target.value)}
                        className={styles.radioInput}
                      />
                      {trial}
                    </label>
                  ))}
                </div>
                <Input type="date" label="Trial End Date" disabled style={{ background: 'rgba(0,0,0,0.1)', cursor: 'not-allowed', colorScheme: 'dark' }} />
              </div>
            </CardBody>
          </Card>

          {/* 4. Payment Information */}
          <Card className={styles.paymentSection}>
            <CardHeader 
              title={<span style={{ fontFamily: 'Caveat, cursive', color: '#ff8a8a' }}>4. Payment Information</span>}
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
