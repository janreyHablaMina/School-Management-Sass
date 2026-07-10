'use client';

import React, { useState } from 'react';
import styles from '@/app/admin/admin.module.css';

interface AddSchoolViewProps {
  onCancel: () => void;
  onSave: () => void;
}

const steps = [
  { id: 1, label: 'School Information', icon: '🏫' },
  { id: 2, label: 'Contact Details', icon: '📞' },
  { id: 3, label: 'Address', icon: '📍' },
  { id: 4, label: 'Preferences', icon: '⚙️' },
  { id: 5, label: 'Review', icon: '📋' }
];

export const AddSchoolView: React.FC<AddSchoolViewProps> = ({ onCancel, onSave }) => {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div style={{ color: '#f0efed', paddingBottom: '2rem', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Stepper Card */}
      <div className={styles.tableCard} style={{ padding: '2rem 4rem', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', border: '1px solid rgba(240, 239, 237, 0.1)', minHeight: 'auto' }}>
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', width: '100px' }}>
              <div style={{ 
                width: '56px', height: '56px', borderRadius: '50%', 
                background: currentStep >= step.id ? '#b388ff' : 'rgba(240, 239, 237, 0.08)', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem',
                color: currentStep >= step.id ? '#0b1a13' : 'rgba(240, 239, 237, 0.5)',
                boxShadow: currentStep >= step.id ? '0 0 15px rgba(179, 136, 255, 0.4)' : 'none',
                transition: 'all 0.3s',
                flexShrink: 0
              }}>
                {step.icon}
              </div>
              <span style={{ 
                fontFamily: currentStep >= step.id ? "'Caveat', cursive" : 'inherit', 
                fontSize: currentStep >= step.id ? '1.3rem' : '0.85rem', 
                color: currentStep >= step.id ? '#b388ff' : 'rgba(240, 239, 237, 0.5)',
                fontWeight: currentStep >= step.id ? 600 : 400,
                textAlign: 'center',
                whiteSpace: 'nowrap'
              }}>
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div style={{ 
                flex: 1, borderTop: '3px dotted rgba(240, 239, 237, 0.2)', 
                margin: '0 -10px', marginTop: '28px'
              }} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step 1: School Information */}
      {currentStep === 1 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Basic Information */}
          <div className={styles.tableCard} style={{ padding: '2.5rem', borderLeft: '4px solid #84a9ff' }}>
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontFamily: "'Caveat', cursive", margin: '0 0 0.2rem 0', fontSize: '2rem', color: '#84a9ff' }}>Basic Information</h3>
              <p style={{ color: 'rgba(240, 239, 237, 0.6)', margin: 0, fontSize: '0.9rem' }}>Provide the basic details about your school.</p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '3rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>School Name <span style={{ color: '#ff8a8a' }}>*</span></label>
                    <input 
                      type="text" 
                      placeholder="Enter school name"
                      style={{ 
                        width: '100%', padding: '0.8rem 1rem', borderRadius: '6px', 
                        background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(240, 239, 237, 0.2)', 
                        color: '#f0efed', outline: 'none'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>School Code <span style={{ color: '#ff8a8a' }}>*</span></label>
                    <input 
                      type="text" 
                      placeholder="e.g. SCH-2025-001"
                      style={{ 
                        width: '100%', padding: '0.8rem 1rem', borderRadius: '6px', 
                        background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(240, 239, 237, 0.2)', 
                        color: '#f0efed', outline: 'none'
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Short Name <span style={{ color: '#ff8a8a' }}>*</span></label>
                    <input 
                      type="text" 
                      placeholder="e.g. ABC School"
                      style={{ 
                        width: '100%', padding: '0.8rem 1rem', borderRadius: '6px', 
                        background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(240, 239, 237, 0.2)', 
                        color: '#f0efed', outline: 'none'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Established Year</label>
                    <input 
                      type="date" 
                      style={{ 
                        width: '100%', padding: '0.8rem 1rem', borderRadius: '6px', 
                        background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(240, 239, 237, 0.2)', 
                        color: '#f0efed', outline: 'none', colorScheme: 'dark'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>School Type <span style={{ color: '#ff8a8a' }}>*</span></label>
                  <select 
                    style={{ 
                      width: '100%', padding: '0.8rem 1rem', borderRadius: '6px', 
                      background: 'rgba(0,0,0,0.2) url("data:image/svg+xml;utf8,<svg fill=\'%23f0efed\' height=\'24\' viewBox=\'0 0 24 24\' width=\'24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5z\'/><path d=\'M0 0h24v24H0z\' fill=\'none\'/></svg>") no-repeat right 0.5rem center', 
                      border: '1px solid rgba(240, 239, 237, 0.2)', 
                      color: '#f0efed', outline: 'none',
                      appearance: 'none', WebkitAppearance: 'none'
                    }}
                  >
                    <option value="">Select school type</option>
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                    <option value="charter">Charter</option>
                  </select>
                </div>
              </div>

              {/* Logo Upload */}
              <div style={{ background: 'rgba(132, 169, 255, 0.05)', borderRadius: '12px', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.9rem', marginBottom: '1rem', display: 'block', fontWeight: 500 }}>School Logo</span>
                <div style={{ 
                  flex: 1, border: '2px dashed rgba(132, 169, 255, 0.3)', borderRadius: '8px', 
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(0,0,0,0.1)', cursor: 'pointer', transition: 'all 0.2s'
                }}>
                  <div style={{ color: '#84a9ff', fontSize: '2rem', marginBottom: '0.5rem' }}>🖼️</div>
                  <div style={{ color: '#84a9ff', fontWeight: 600, marginBottom: '0.3rem' }}>Upload Logo</div>
                  <div style={{ color: 'rgba(240, 239, 237, 0.5)', fontSize: '0.8rem' }}>PNG, JPG or SVG (max. 2MB)</div>
                </div>
              </div>
            </div>
          </div>

          {/* About the School */}
          <div className={styles.tableCard} style={{ padding: '2.5rem', borderLeft: '4px solid #5cc789' }}>
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontFamily: "'Caveat', cursive", margin: '0 0 0.2rem 0', fontSize: '2rem', color: '#5cc789' }}>About the School</h3>
              <p style={{ color: 'rgba(240, 239, 237, 0.6)', margin: 0, fontSize: '0.9rem' }}>Tell us more about your school.</p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '3rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>School Description</label>
                <textarea 
                  placeholder="Enter a brief description about your school..."
                  rows={6}
                  style={{ 
                    width: '100%', padding: '1rem', borderRadius: '6px', 
                    background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(240, 239, 237, 0.2)', 
                    color: '#f0efed', outline: 'none', resize: 'vertical'
                  }}
                />
                <div style={{ textAlign: 'right', color: 'rgba(240, 239, 237, 0.4)', fontSize: '0.8rem', marginTop: '0.5rem' }}>0/500</div>
              </div>

              {/* Info Panel */}
              <div style={{ background: 'rgba(92, 199, 137, 0.05)', borderRadius: '12px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <span style={{ fontSize: '1.2rem' }}>✨</span>
                  <h4 style={{ margin: 0, color: '#5cc789', fontSize: '1.05rem', fontWeight: 600 }}>Why it matters?</h4>
                </div>
                
                <div style={{ display: 'flex', gap: '0.8rem' }}>
                  <div style={{ minWidth: '18px', height: '18px', borderRadius: '50%', background: '#5cc789', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: '#0b1a13', fontSize: '0.7rem', fontWeight: 700 }}>✓</span>
                  </div>
                  <span style={{ color: 'rgba(240, 239, 237, 0.8)', fontSize: '0.85rem', lineHeight: 1.4 }}>This information helps personalize your school portal.</span>
                </div>
                
                <div style={{ display: 'flex', gap: '0.8rem' }}>
                  <div style={{ minWidth: '18px', height: '18px', borderRadius: '50%', background: '#5cc789', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: '#0b1a13', fontSize: '0.7rem', fontWeight: 700 }}>✓</span>
                  </div>
                  <span style={{ color: 'rgba(240, 239, 237, 0.8)', fontSize: '0.85rem', lineHeight: 1.4 }}>You can always update these details later.</span>
                </div>
                
                <div style={{ display: 'flex', gap: '0.8rem' }}>
                  <div style={{ minWidth: '18px', height: '18px', borderRadius: '50%', background: '#5cc789', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: '#0b1a13', fontSize: '0.7rem', fontWeight: 700 }}>✓</span>
                  </div>
                  <span style={{ color: 'rgba(240, 239, 237, 0.8)', fontSize: '0.85rem', lineHeight: 1.4 }}>Make sure the information is accurate for official records.</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Step 2: Contact Details */}
      {currentStep === 2 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className={styles.tableCard} style={{ padding: '2.5rem', borderLeft: '4px solid #b388ff' }}>
            <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(179, 136, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                📞
              </div>
              <div>
                <h3 style={{ fontFamily: "'Caveat', cursive", margin: '0 0 0.2rem 0', fontSize: '2rem', color: '#b388ff' }}>Contact Details</h3>
                <p style={{ color: 'rgba(240, 239, 237, 0.6)', margin: 0, fontSize: '0.9rem' }}>Provide the primary contact information for your school.</p>
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '3rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Primary Contact Person <span style={{ color: '#ff8a8a' }}>*</span></label>
                    <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(240, 239, 237, 0.2)', borderRadius: '6px', padding: '0 1rem' }}>
                      <span style={{ color: 'rgba(240, 239, 237, 0.4)', fontSize: '1.1rem' }}>👤</span>
                      <input type="text" placeholder="e.g. John Dela Cruz" style={{ flex: 1, padding: '0.8rem 1rem', background: 'transparent', border: 'none', color: '#f0efed', outline: 'none' }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Designation / Position <span style={{ color: '#ff8a8a' }}>*</span></label>
                    <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(240, 239, 237, 0.2)', borderRadius: '6px', padding: '0 1rem' }}>
                      <span style={{ color: 'rgba(240, 239, 237, 0.4)', fontSize: '1.1rem' }}>💼</span>
                      <input type="text" placeholder="e.g. School Administrator" style={{ flex: 1, padding: '0.8rem 1rem', background: 'transparent', border: 'none', color: '#f0efed', outline: 'none' }} />
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Email Address <span style={{ color: '#ff8a8a' }}>*</span></label>
                    <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(240, 239, 237, 0.2)', borderRadius: '6px', padding: '0 1rem' }}>
                      <span style={{ color: 'rgba(240, 239, 237, 0.4)', fontSize: '1.1rem' }}>✉️</span>
                      <input type="email" placeholder="e.g. admin@school.edu.ph" style={{ flex: 1, padding: '0.8rem 1rem', background: 'transparent', border: 'none', color: '#f0efed', outline: 'none' }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Phone Number <span style={{ color: '#ff8a8a' }}>*</span></label>
                    <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(240, 239, 237, 0.2)', borderRadius: '6px', padding: '0 1rem' }}>
                      <span style={{ color: 'rgba(240, 239, 237, 0.4)', fontSize: '1.1rem' }}>📱</span>
                      <input type="tel" placeholder="e.g. +63 912 345 6789" style={{ flex: 1, padding: '0.8rem 1rem', background: 'transparent', border: 'none', color: '#f0efed', outline: 'none' }} />
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Alternate Phone Number</label>
                    <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(240, 239, 237, 0.2)', borderRadius: '6px', padding: '0 1rem' }}>
                      <span style={{ color: 'rgba(240, 239, 237, 0.4)', fontSize: '1.1rem' }}>📱</span>
                      <input type="tel" placeholder="e.g. +63 998 765 4321" style={{ flex: 1, padding: '0.8rem 1rem', background: 'transparent', border: 'none', color: '#f0efed', outline: 'none' }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>School Landline <span style={{ color: 'rgba(240, 239, 237, 0.4)' }}>(Optional)</span></label>
                    <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(240, 239, 237, 0.2)', borderRadius: '6px', padding: '0 1rem' }}>
                      <span style={{ color: 'rgba(240, 239, 237, 0.4)', fontSize: '1.1rem' }}>☎️</span>
                      <input type="tel" placeholder="e.g. (045) 123 4567" style={{ flex: 1, padding: '0.8rem 1rem', background: 'transparent', border: 'none', color: '#f0efed', outline: 'none' }} />
                    </div>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Official Website <span style={{ color: 'rgba(240, 239, 237, 0.4)' }}>(Optional)</span></label>
                  <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(240, 239, 237, 0.2)', borderRadius: '6px', padding: '0 1rem' }}>
                    <span style={{ color: 'rgba(240, 239, 237, 0.4)', fontSize: '1.1rem' }}>🌐</span>
                    <input type="url" placeholder="e.g. www.schoolname.edu.ph" style={{ flex: 1, padding: '0.8rem 1rem', background: 'transparent', border: 'none', color: '#f0efed', outline: 'none' }} />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Official Social Media <span style={{ color: 'rgba(240, 239, 237, 0.4)' }}>(Optional)</span></label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(240, 239, 237, 0.2)', borderRadius: '6px', padding: '0 0.8rem' }}>
                      <span style={{ color: '#1877F2', fontSize: '1.1rem' }}>📘</span>
                      <input type="url" placeholder="Facebook URL" style={{ flex: 1, padding: '0.8rem 0.5rem', background: 'transparent', border: 'none', color: '#f0efed', outline: 'none', fontSize: '0.85rem' }} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(240, 239, 237, 0.2)', borderRadius: '6px', padding: '0 0.8rem' }}>
                      <span style={{ color: '#1DA1F2', fontSize: '1.1rem' }}>🐦</span>
                      <input type="url" placeholder="Twitter URL" style={{ flex: 1, padding: '0.8rem 0.5rem', background: 'transparent', border: 'none', color: '#f0efed', outline: 'none', fontSize: '0.85rem' }} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(240, 239, 237, 0.2)', borderRadius: '6px', padding: '0 0.8rem' }}>
                      <span style={{ color: '#E4405F', fontSize: '1.1rem' }}>📸</span>
                      <input type="url" placeholder="Instagram URL" style={{ flex: 1, padding: '0.8rem 0.5rem', background: 'transparent', border: 'none', color: '#f0efed', outline: 'none', fontSize: '0.85rem' }} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(240, 239, 237, 0.2)', borderRadius: '6px', padding: '0 0.8rem' }}>
                      <span style={{ color: '#FF0000', fontSize: '1.1rem' }}>▶️</span>
                      <input type="url" placeholder="YouTube URL" style={{ flex: 1, padding: '0.8rem 0.5rem', background: 'transparent', border: 'none', color: '#f0efed', outline: 'none', fontSize: '0.85rem' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Info Panel */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ background: 'rgba(179, 136, 255, 0.05)', borderRadius: '12px', padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.2rem', alignItems: 'center', textAlign: 'center' }}>
                  <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>📇</div>
                  <h4 style={{ margin: 0, color: '#b388ff', fontSize: '1.1rem', fontWeight: 600 }}>Why is this important?</h4>
                  <p style={{ color: 'rgba(240, 239, 237, 0.7)', fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>
                    These contact details will be used for important communication, notifications, and account recovery.
                  </p>
                </div>
                
                <div style={{ background: 'rgba(240, 239, 237, 0.03)', borderRadius: '12px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <span style={{ fontSize: '1.2rem' }}>💡</span>
                    <h4 style={{ margin: 0, color: '#f0efed', fontSize: '1.05rem', fontWeight: 600 }}>Tips</h4>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '0.8rem' }}>
                    <div style={{ minWidth: '18px', height: '18px', borderRadius: '50%', background: '#b388ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ color: '#0b1a13', fontSize: '0.7rem', fontWeight: 700 }}>✓</span>
                    </div>
                    <span style={{ color: 'rgba(240, 239, 237, 0.8)', fontSize: '0.85rem', lineHeight: 1.4 }}>Use an official school email address.</span>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '0.8rem' }}>
                    <div style={{ minWidth: '18px', height: '18px', borderRadius: '50%', background: '#b388ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ color: '#0b1a13', fontSize: '0.7rem', fontWeight: 700 }}>✓</span>
                    </div>
                    <span style={{ color: 'rgba(240, 239, 237, 0.8)', fontSize: '0.85rem', lineHeight: 1.4 }}>Ensure the phone number is active and monitored regularly.</span>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '0.8rem' }}>
                    <div style={{ minWidth: '18px', height: '18px', borderRadius: '50%', background: '#b388ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ color: '#0b1a13', fontSize: '0.7rem', fontWeight: 700 }}>✓</span>
                    </div>
                    <span style={{ color: 'rgba(240, 239, 237, 0.8)', fontSize: '0.85rem', lineHeight: 1.4 }}>You can update these details later in Settings.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
        {currentStep === 1 ? (
          <button 
            onClick={onCancel}
            style={{ 
              padding: '0.8rem 2rem', background: 'transparent', border: '1px solid rgba(240, 239, 237, 0.2)', 
              color: '#f0efed', borderRadius: '6px', cursor: 'pointer', fontWeight: 500, transition: 'all 0.2s' 
            }}
          >
            Cancel
          </button>
        ) : (
          <button 
            onClick={() => setCurrentStep(prev => Math.max(prev - 1, 1))}
            style={{ 
              padding: '0.8rem 2rem', background: 'transparent', border: '1px solid rgba(240, 239, 237, 0.2)', 
              color: '#f0efed', borderRadius: '6px', cursor: 'pointer', fontWeight: 500, transition: 'all 0.2s',
              display: 'flex', alignItems: 'center', gap: '0.5rem'
            }}
          >
            <span>←</span> Back
          </button>
        )}
        <button 
          onClick={() => setCurrentStep(prev => Math.min(prev + 1, 5))}
          className={styles.toolbarAddBtn}
          style={{ 
            height: 'auto', padding: '0.8rem 2.5rem', fontSize: '1.05rem', 
            background: '#b388ff', borderColor: '#2e2e2e', color: '#0b1a13'
          }}
        >
          Next Step →
        </button>
      </div>

    </div>
  );
};
