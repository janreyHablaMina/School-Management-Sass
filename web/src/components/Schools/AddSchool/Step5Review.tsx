import React from 'react';
import globalStyles from '@/app/admin/admin.module.css';
import styles from './addSchool.module.css';

export const Step5Review: React.FC = () => {
  return (
    <div className={globalStyles.tableCard} style={{ padding: '2.5rem', borderLeft: '4px solid #b388ff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className={styles.sectionHeader} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: 0 }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(179, 136, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: '#b388ff' }}>
            📋
          </div>
          <div>
            <h3 className={styles.sectionTitle} style={{ color: '#b388ff' }}>Review & Confirm</h3>
            <p className={styles.sectionDesc}>Please review all the information below before adding the school.</p>
          </div>
        </div>
        
        {/* Decorative graphic */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', opacity: 0.8 }}>
          <div style={{ fontSize: '3.5rem' }}>📑</div>
          <div style={{ fontSize: '2.5rem', transform: 'rotate(15deg) translateY(10px)', color: '#b388ff' }}>🛡️</div>
        </div>
      </div>
      
      <div className={styles.reviewGrid}>
        {/* Column 1: School Info & Preferences */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div className={styles.reviewCard}>
            <div className={styles.reviewCardHeader}>
              <span className={styles.reviewCardIcon}>🏫</span>
              School Information
            </div>
            
            <div className={styles.dataRow}>
              <span className={styles.dataLabel}>School Name</span>
              <span className={styles.dataValue}>ABC Learning Academy</span>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.dataLabel}>School Code</span>
              <span className={styles.dataValue}>SCH-2025-001</span>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.dataLabel}>Short Name</span>
              <span className={styles.dataValue}>ABC Academy</span>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.dataLabel}>Established Year</span>
              <span className={styles.dataValue}>2020</span>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.dataLabel}>School Type</span>
              <span className={styles.dataValue}>Private</span>
            </div>
          </div>

          <div className={styles.reviewCard}>
            <div className={styles.reviewCardHeader}>
              <span className={styles.reviewCardIcon}>⚙️</span>
              Preferences
            </div>
            
            <div className={styles.dataRow}>
              <span className={styles.dataLabel}>Academic Year Start</span>
              <span className={styles.dataValue}>June</span>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.dataLabel}>Grading System</span>
              <span className={styles.dataValue}>Percentage (%)</span>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.dataLabel}>School Level</span>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span className={`${styles.badge} ${styles.badgePurple}`}>JHS (Grades 7-10)</span>
                <span className={`${styles.badge} ${styles.badgePurple}`}>SHS (Grades 11-12)</span>
              </div>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.dataLabel}>Default Language</span>
              <span className={styles.dataValue}>English</span>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.dataLabel}>Time Format</span>
              <span className={styles.dataValue}>12-Hour (1:00 PM)</span>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.dataLabel}>Date Format</span>
              <span className={styles.dataValue}>MM/DD/YYYY</span>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.dataLabel}>Announcements</span>
              <span className={`${styles.badge} ${styles.badgeGreen}`}>✅ Enabled</span>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.dataLabel}>Parent Access</span>
              <span className={`${styles.badge} ${styles.badgeGreen}`}>✅ Enabled</span>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.dataLabel}>Student ID Generation</span>
              <span className={`${styles.badge} ${styles.badgeGray}`}>❌ Disabled</span>
            </div>
          </div>

        </div>

        {/* Column 2: Contact & System Preview */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div className={styles.reviewCard}>
            <div className={styles.reviewCardHeader}>
              <span className={styles.reviewCardIcon}>📞</span>
              Contact Details
            </div>
            
            <div className={styles.dataRow}>
              <span className={styles.dataLabel}>Primary Contact</span>
              <span className={styles.dataValue}>John Dela Cruz</span>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.dataLabel}>Designation</span>
              <span className={styles.dataValue}>School Administrator</span>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.dataLabel}>Email</span>
              <span className={styles.dataValue}>admin@abclearning.edu.ph</span>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.dataLabel}>Phone Number</span>
              <span className={styles.dataValue}>+63 912 345 6789</span>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.dataLabel}>School Landline</span>
              <span className={styles.dataValue}>(045) 123 4567</span>
            </div>
          </div>

          <div className={styles.reviewCard}>
            <div className={styles.reviewCardHeader}>
              <span className={styles.reviewCardIcon}>💻</span>
              System Preview
            </div>
            
            <div className={styles.previewCard} style={{ marginTop: 0, padding: '1.5rem' }}>
              <div className={styles.previewIcon}>🏫</div>
              <h3 className={styles.previewTitle}>ABC Learning Academy</h3>
              <div className={styles.previewTags}>
                <span className={styles.previewTag}>JHS (Grades 7-10)</span>
                <span className={styles.previewTag}>SHS (Grades 11-12)</span>
              </div>
              <div className={styles.previewDetails}>
                <span>SY 2025–2026</span>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                  <span>🌐</span> English
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Column 3: Address, Summary & Next Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div className={styles.reviewCard}>
            <div className={styles.reviewCardHeader}>
              <span className={styles.reviewCardIcon}>📍</span>
              Address
            </div>
            
            <div className={styles.dataRow}>
              <span className={styles.dataLabel}>Address</span>
              <span className={styles.dataValue}>123 Education Street, Malabanias, Angeles City, Pampanga, 2009</span>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.dataLabel}>Region / State</span>
              <span className={styles.dataValue}>Central Luzon</span>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.dataLabel}>Country</span>
              <span className={styles.dataValue}>Philippines</span>
            </div>
            <div className={styles.dataRow} style={{ alignItems: 'center' }}>
              <span className={styles.dataLabel}>Main Campus</span>
              <span className={`${styles.badge} ${styles.badgeGreen}`}>Yes</span>
            </div>
          </div>

          <div className={styles.summaryCard}>
            <div className={styles.panelHeader} style={{ marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '1.2rem' }}>✨</span>
              <h4 className={styles.panelTitle} style={{ color: '#b388ff' }}>Summary</h4>
            </div>
            <p style={{ color: 'rgba(240, 239, 237, 0.7)', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>
              You're almost done! Once submitted, your school will be added to the system and you can start managing everything in one place.
            </p>
            
            <div className={styles.summaryItem}>
              <div className={styles.summaryIcon}>✓</div>
              <div className={styles.summaryText}>
                <h5>5</h5>
                <p>Steps Completed</p>
              </div>
            </div>
            
            <div className={styles.summaryItem}>
              <div className={styles.summaryIcon}>✓</div>
              <div className={styles.summaryText}>
                <h5>All Information</h5>
                <p>Looks Good</p>
              </div>
            </div>
            
            <div className={styles.summaryItem}>
              <div className={styles.summaryIcon}>✓</div>
              <div className={styles.summaryText}>
                <h5>Ready to Submit</h5>
                <p>Review and confirm to add your school</p>
              </div>
            </div>
          </div>

          <div className={styles.nextStepsCard}>
            <div className={styles.panelHeader} style={{ marginBottom: '1rem' }}>
              <span style={{ fontSize: '1.2rem' }}>✨</span>
              <h4 className={styles.panelTitle} style={{ color: '#5cc789' }}>What happens next?</h4>
            </div>
            
            <div className={styles.checkItem} style={{ marginBottom: '0.8rem' }}>
              <div className={styles.checkCircle} style={{ background: '#5cc789' }}>
                <span className={styles.checkMark}>✓</span>
              </div>
              <span className={styles.checkText}>Your school will be added to the system.</span>
            </div>
            
            <div className={styles.checkItem} style={{ marginBottom: '0.8rem' }}>
              <div className={styles.checkCircle} style={{ background: '#5cc789' }}>
                <span className={styles.checkMark}>✓</span>
              </div>
              <span className={styles.checkText}>You can start setting up users, classes, and more.</span>
            </div>
            
            <div className={styles.checkItem}>
              <div className={styles.checkCircle} style={{ background: 'transparent', border: '1px solid #5cc789', color: '#5cc789' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 700 }}>🕒</span>
              </div>
              <span className={styles.checkText}>You can always update these details later in Settings.</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
