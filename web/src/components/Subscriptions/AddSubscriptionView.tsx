'use client';

import React, { useState } from 'react';
import styles from '@/app/admin/admin.module.css';

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
    <div style={{ color: '#f0efed', paddingBottom: '2rem', marginTop: '1rem' }}>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
        
        {/* Left Column: Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* 1. Select School */}
          <div className={styles.tableCard} style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', border: '1px dashed rgba(132, 169, 255, 0.3)' }}>
            <div>
              <h3 style={{ fontFamily: 'Caveat, cursive', margin: '0 0 0.2rem 0', fontSize: '1.8rem', color: '#84a9ff' }}>1. Select School</h3>
              <p style={{ color: 'rgba(240, 239, 237, 0.6)', margin: 0, fontSize: '0.9rem' }}>Choose the school that will be assigned this subscription.</p>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>School *</label>
              <select 
                value={selectedSchool}
                onChange={(e) => setSelectedSchool(e.target.value)}
                style={{ 
                  width: '100%', padding: '0.8rem 1rem', borderRadius: '6px', 
                  background: 'rgba(0,0,0,0.2) url("data:image/svg+xml;utf8,<svg fill=\'%23f0efed\' height=\'24\' viewBox=\'0 0 24 24\' width=\'24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5z\'/><path d=\'M0 0h24v24H0z\' fill=\'none\'/></svg>") no-repeat right 0.5rem center', 
                  border: '1px solid rgba(240, 239, 237, 0.2)', 
                  color: '#f0efed', outline: 'none',
                  appearance: 'none', WebkitAppearance: 'none'
                }}
              >
                <option value="">Search and select a school...</option>
                <option value="school-1">St. Mary's Academy</option>
                <option value="school-2">Greenfield High School</option>
              </select>
            </div>

            <div style={{ 
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '1rem', background: 'rgba(132, 169, 255, 0.05)', 
              border: '1px solid rgba(132, 169, 255, 0.2)', borderRadius: '8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(132, 169, 255, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#84a9ff' }}>ℹ️</div>
                <div>
                  <h4 style={{ margin: 0, color: '#84a9ff', fontSize: '0.95rem' }}>Can't find the school?</h4>
                  <p style={{ margin: 0, color: 'rgba(240, 239, 237, 0.6)', fontSize: '0.85rem' }}>Add a new school first.</p>
                </div>
              </div>
              <button style={{ 
                background: 'transparent', border: '1px solid rgba(132, 169, 255, 0.4)', 
                color: '#84a9ff', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' 
              }}>
                Add New School
              </button>
            </div>
          </div>

          {/* 2. Select Plan */}
          <div className={styles.tableCard} style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', border: '1px dashed rgba(92, 199, 137, 0.3)', transform: 'rotate(0.5deg)' }}>
            <div>
              <h3 style={{ fontFamily: 'Caveat, cursive', margin: '0 0 0.2rem 0', fontSize: '1.8rem', color: '#5cc789' }}>2. Select Plan</h3>
              <p style={{ color: 'rgba(240, 239, 237, 0.6)', margin: 0, fontSize: '0.9rem' }}>Choose a subscription plan for the school.</p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Plan *</label>
                <select 
                  value={selectedPlan}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                  style={{ 
                    width: '100%', padding: '0.8rem 1rem', borderRadius: '6px', 
                    background: 'rgba(0,0,0,0.2) url("data:image/svg+xml;utf8,<svg fill=\'%23f0efed\' height=\'24\' viewBox=\'0 0 24 24\' width=\'24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5z\'/><path d=\'M0 0h24v24H0z\' fill=\'none\'/></svg>") no-repeat right 0.5rem center', 
                    border: '1px solid rgba(240, 239, 237, 0.2)', 
                    color: '#f0efed', outline: 'none',
                    appearance: 'none', WebkitAppearance: 'none'
                  }}
                >
                  <option value="">Select a plan...</option>
                  <option value="school-plan">School Plan</option>
                  <option value="district-plan">District Plan</option>
                  <option value="enterprise-plan">Enterprise Plan</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Plan Details</label>
                <div style={{ 
                  background: 'rgba(240, 239, 237, 0.03)', border: '1px dashed rgba(240, 239, 237, 0.2)',
                  borderRadius: '6px', padding: '1.5rem', textAlign: 'center', color: 'rgba(240, 239, 237, 0.6)'
                }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📄</div>
                  <div style={{ fontWeight: 500, color: 'rgba(240, 239, 237, 0.9)' }}>Please select a plan to view details</div>
                  <div style={{ fontSize: '0.85rem' }}>Plan features and limits will appear here.</div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Subscription Details */}
          <div className={styles.tableCard} style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', border: '1px dashed rgba(245, 200, 66, 0.3)' }}>
            <div>
              <h3 style={{ fontFamily: 'Caveat, cursive', margin: '0 0 0.2rem 0', fontSize: '1.8rem', color: '#f5c842' }}>3. Subscription Details</h3>
              <p style={{ color: 'rgba(240, 239, 237, 0.6)', margin: 0, fontSize: '0.9rem' }}>Configure the subscription period and billing information.</p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '1rem', fontSize: '0.9rem' }}>Billing Cycle *</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  {['Monthly', 'Quarterly (Save 5%)', 'Semi-Annual (Save 10%)', 'Annual (Save 15%)'].map(cycle => (
                    <label key={cycle} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: 'rgba(240, 239, 237, 0.8)' }}>
                      <input 
                        type="radio" 
                        name="billingCycle" 
                        value={cycle} 
                        checked={billingCycle === cycle}
                        onChange={(e) => setBillingCycle(e.target.value)}
                        style={{ accentColor: '#84a9ff' }}
                      />
                      {cycle}
                    </label>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Start Date *</label>
                  <input 
                    type="date" 
                    defaultValue="2025-05-31"
                    style={{ 
                      width: '100%', padding: '0.8rem', borderRadius: '6px', 
                      background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(240, 239, 237, 0.2)', 
                      color: '#f0efed', outline: 'none'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>End Date *</label>
                  <input 
                    type="date" 
                    defaultValue="2025-06-30"
                    style={{ 
                      width: '100%', padding: '0.8rem', borderRadius: '6px', 
                      background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(240, 239, 237, 0.2)', 
                      color: '#f0efed', outline: 'none'
                    }}
                  />
                </div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: '#84a9ff' }}>
                  <input type="checkbox" defaultChecked style={{ accentColor: '#84a9ff' }} />
                  Auto-renewal
                </label>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '1rem', fontSize: '0.9rem' }}>Trial Period (Optional)</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '1.5rem' }}>
                  {['No Trial', '7 Days Trial', '14 Days Trial', '30 Days Trial'].map(trial => (
                    <label key={trial} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: 'rgba(240, 239, 237, 0.8)' }}>
                      <input 
                        type="radio" 
                        name="trialPeriod" 
                        value={trial} 
                        checked={trialPeriod === trial}
                        onChange={(e) => setTrialPeriod(e.target.value)}
                        style={{ accentColor: '#84a9ff' }}
                      />
                      {trial}
                    </label>
                  ))}
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'rgba(240, 239, 237, 0.4)' }}>Trial End Date</label>
                  <input 
                    type="date" 
                    disabled
                    style={{ 
                      width: '100%', padding: '0.8rem', borderRadius: '6px', 
                      background: 'rgba(0,0,0,0.1)', border: '1px dashed rgba(240, 239, 237, 0.1)', 
                      color: 'rgba(240, 239, 237, 0.4)', outline: 'none', cursor: 'not-allowed'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 4. Payment Information */}
          <div className={styles.tableCard} style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', border: '1px dashed rgba(255, 138, 138, 0.3)' }}>
            <div>
              <h3 style={{ fontFamily: 'Caveat, cursive', margin: '0 0 0.2rem 0', fontSize: '1.8rem', color: '#ff8a8a' }}>4. Payment Information</h3>
              <p style={{ color: 'rgba(240, 239, 237, 0.6)', margin: 0, fontSize: '0.9rem' }}>Set the pricing and payment details for this subscription.</p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Monthly Fee (PHP) *</label>
                <input 
                  type="text" 
                  defaultValue="0.00"
                  style={{ 
                    width: '100%', padding: '0.8rem', borderRadius: '6px', 
                    background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(240, 239, 237, 0.2)', 
                    color: '#f0efed', outline: 'none'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Discount (%)</label>
                <input 
                  type="text" 
                  defaultValue="0"
                  style={{ 
                    width: '100%', padding: '0.8rem', borderRadius: '6px', 
                    background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(240, 239, 237, 0.2)', 
                    color: '#f0efed', outline: 'none'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Tax (%)</label>
                <input 
                  type="text" 
                  defaultValue="0"
                  style={{ 
                    width: '100%', padding: '0.8rem', borderRadius: '6px', 
                    background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(240, 239, 237, 0.2)', 
                    color: '#f0efed', outline: 'none'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Total Amount (PHP)</label>
                <input 
                  type="text" 
                  readOnly
                  defaultValue="₱0.00"
                  style={{ 
                    width: '100%', padding: '0.8rem', borderRadius: '6px', 
                    background: 'rgba(132, 169, 255, 0.05)', border: '1px solid rgba(132, 169, 255, 0.2)', 
                    color: '#84a9ff', outline: 'none', fontWeight: 600
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Notes (Optional)</label>
              <textarea 
                placeholder="Add any notes or additional information..."
                rows={3}
                style={{ 
                  width: '100%', padding: '0.8rem', borderRadius: '6px', 
                  background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(240, 239, 237, 0.2)', 
                  color: '#f0efed', outline: 'none', resize: 'vertical'
                }}
              />
            </div>
          </div>
        </div>

        {/* Right Column: Summary */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div className={styles.tableCard} style={{ padding: '1.5rem', borderTop: '4px solid #b388ff' }}>
            <h3 style={{ fontFamily: 'Caveat, cursive', margin: '0 0 1.5rem 0', fontSize: '1.6rem', color: '#b388ff' }}>📋 Subscription Summary</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '2rem' }}>
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

            <div style={{ borderTop: '1px dashed rgba(240, 239, 237, 0.1)', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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

            <div style={{ borderTop: '1px dashed rgba(240, 239, 237, 0.1)', marginTop: '1.5rem', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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

            <div style={{ 
              marginTop: '1.5rem', padding: '1rem', background: 'rgba(132, 169, 255, 0.1)', 
              borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' 
            }}>
              <span style={{ fontWeight: 600, color: '#f0efed' }}>Total Amount</span>
              <span style={{ fontWeight: 600, color: '#84a9ff', fontSize: '1.2rem' }}>₱0.00</span>
            </div>
          </div>

          <div className={styles.tableCard} style={{ padding: '1.5rem', borderTop: '4px solid #f5c842' }}>
            <h3 style={{ fontFamily: 'Caveat, cursive', margin: '0 0 0.5rem 0', fontSize: '1.6rem', color: '#f5c842' }}>✨ Plan Features</h3>
            <p style={{ color: 'rgba(240, 239, 237, 0.6)', margin: '0 0 1.5rem 0', fontSize: '0.85rem' }}>Select a plan to see the features and limits included.</p>
            
            <div style={{ background: 'rgba(0,0,0,0.1)', border: '1px solid rgba(240, 239, 237, 0.1)', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {['Student Limit', 'Teacher Limit', 'Sections Limit', 'AI Credits', 'Storage', 'Support', 'And more...'].map((feature, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: 'rgba(92, 199, 137, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: '#5cc789', fontSize: '0.7rem' }}>✓</span>
                  </div>
                  <span style={{ color: 'rgba(240, 239, 237, 0.7)', fontSize: '0.9rem' }}>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button 
              onClick={onCancel}
              style={{ 
                flex: 1, padding: '0.8rem', background: 'transparent', border: '1px solid rgba(240, 239, 237, 0.2)', 
                color: '#f0efed', borderRadius: '6px', cursor: 'pointer', fontWeight: 500, transition: 'all 0.2s' 
              }}
            >
              Cancel
            </button>
            <button 
              onClick={onSave}
              className={styles.toolbarAddBtn}
              style={{ 
                flex: 2, height: 'auto', padding: '0.8rem', fontSize: '1rem'
              }}
            >
              + Create Subscription
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
