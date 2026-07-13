import React from 'react';
import globalStyles from '@/app/admin/admin.module.css';
import styles from './addSchool.module.css';

export const Step5Review: React.FC = () => {
  return (
    <div className={globalStyles.tableCard} style={{ padding: '2.5rem', borderLeft: '4px solid #f5c842' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className={styles.sectionHeader} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: 0 }}>
          <div>
            <h3 className={styles.sectionTitle} style={{ color: '#f0efed', fontSize: '1.5rem', marginBottom: '0.4rem' }}>Review & Confirm</h3>
            <p className={styles.sectionDesc}>Please review all the information below. You can go back and edit any details if needed.</p>
          </div>
        </div>
        
        {/* Decorative graphic (Clipboard & Magnifying Glass) */}
        <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
          <div style={{ fontSize: '4rem', opacity: 0.9 }}>📋</div>
          <div style={{ fontSize: '3rem', position: 'absolute', right: '-15px', bottom: '-10px', transform: 'rotate(-15deg)', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.4))' }}>🔍</div>
        </div>
      </div>
      
      <div className={styles.reviewLayout}>
        {/* Left Column: Stacked Cards */}
        <div className={styles.reviewMainCol}>
          
          {/* School Information Card */}
          <div className={styles.reviewSectionCard}>
            <div className={styles.reviewSectionHeader}>
              <div className={styles.reviewSectionTitle}>
                <span style={{ color: '#5cc789', fontSize: '1.4rem' }}>🏫</span>
                School Information
              </div>
              <button className={styles.editBtn}>✏️ Edit</button>
            </div>
            
            <div className={styles.reviewDataGrid}>
              <div className={styles.dataRow}>
                <span className={styles.dataLabel}>School Name</span>
                <span className={styles.dataValue}>ABC Learning Academy</span>
              </div>
              <div className={styles.dataRow}>
                <span className={styles.dataLabel}>Established Year</span>
                <span className={styles.dataValue}>2020</span>
              </div>
              <div className={styles.dataRow}>
                <span className={styles.dataLabel}>School Code</span>
                <span className={styles.dataValue}>SCH-2025-001</span>
              </div>
              <div className={styles.dataRow}>
                <span className={styles.dataLabel}>School Type</span>
                <span className={styles.dataValue}>Private</span>
              </div>
              <div className={styles.dataRow}>
                <span className={styles.dataLabel}>Short Name</span>
                <span className={styles.dataValue}>ABC Academy</span>
              </div>
            </div>
          </div>

          {/* Contact Details Card */}
          <div className={styles.reviewSectionCard}>
            <div className={styles.reviewSectionHeader}>
              <div className={styles.reviewSectionTitle}>
                <span style={{ color: '#84a9ff', fontSize: '1.4rem' }}>📞</span>
                Contact Details
              </div>
              <button className={styles.editBtn}>✏️ Edit</button>
            </div>
            
            <div className={styles.reviewDataGrid}>
              <div className={styles.dataRow}>
                <span className={styles.dataLabel}>Primary Contact</span>
                <span className={styles.dataValue}>John Dela Cruz</span>
              </div>
              <div className={styles.dataRow}>
                <span className={styles.dataLabel}>Phone Number</span>
                <span className={styles.dataValue}>+63 912 345 6789</span>
              </div>
              <div className={styles.dataRow}>
                <span className={styles.dataLabel}>Designation</span>
                <span className={styles.dataValue}>School Administrator</span>
              </div>
              <div className={styles.dataRow}>
                <span className={styles.dataLabel}>Alternate Phone</span>
                <span className={styles.dataValue}>+63 998 765 4321</span>
              </div>
              <div className={styles.dataRow}>
                <span className={styles.dataLabel}>Email</span>
                <span className={styles.dataValue}>admin@abclearning.edu.ph</span>
              </div>
              <div className={styles.dataRow}>
                <span className={styles.dataLabel}>Landline</span>
                <span className={styles.dataValue}>(045) 123 4567</span>
              </div>
            </div>
          </div>

          {/* Address Card */}
          <div className={styles.reviewSectionCard}>
            <div className={styles.reviewSectionHeader}>
              <div className={styles.reviewSectionTitle}>
                <span style={{ color: '#f5c842', fontSize: '1.4rem' }}>📍</span>
                Address
              </div>
              <button className={styles.editBtn}>✏️ Edit</button>
            </div>
            
            <div className={styles.reviewDataGrid}>
              <div className={styles.dataRowHorizontal}>
                <span className={styles.dataLabel}>Address</span>
                <span className={styles.dataValue}>123 Education Street, Malabanias, Angeles City, Pampanga, 2009</span>
              </div>
              <div className={styles.dataRowHorizontal}>
                <span className={styles.dataLabel}>Province</span>
                <span className={styles.dataValue}>Pampanga</span>
              </div>
              <div className={styles.dataRowHorizontal}>
                <span className={styles.dataLabel}>Region / State</span>
                <span className={styles.dataValue}>Central Luzon</span>
              </div>
              <div className={styles.dataRowHorizontal}>
                <span className={styles.dataLabel}>City / Municipality</span>
                <span className={styles.dataValue}>Angeles City</span>
              </div>
              <div className={styles.dataRowHorizontal}>
                <span className={styles.dataLabel}>Country</span>
                <span className={styles.dataValue}>Philippines</span>
              </div>
              <div className={styles.dataRowHorizontal}>
                <span className={styles.dataLabel}>Barangay</span>
                <span className={styles.dataValue}>Malabanias</span>
              </div>
              <div className={styles.dataRowHorizontal}>
                <span className={styles.dataLabel}>Main Campus</span>
                <span className={`${styles.badge} ${styles.badgeGreen}`}>Yes</span>
              </div>
              <div className={styles.dataRowHorizontal}>
                <span className={styles.dataLabel}>Zip / Postal Code</span>
                <span className={styles.dataValue}>2009</span>
              </div>
            </div>
          </div>

          {/* Preferences Card */}
          <div className={styles.reviewSectionCard}>
            <div className={styles.reviewSectionHeader}>
              <div className={styles.reviewSectionTitle}>
                <span style={{ color: '#ffb74d', fontSize: '1.4rem' }}>⚙️</span>
                Preferences
              </div>
              <button className={styles.editBtn}>✏️ Edit</button>
            </div>
            
            <div className={styles.reviewDataGrid}>
              <div className={styles.dataRowHorizontal}>
                <span className={styles.dataLabel}>Academic Year Start</span>
                <span className={styles.dataValue}>June</span>
              </div>
              <div className={styles.dataRowHorizontal}>
                <span className={styles.dataLabel}>Time Format</span>
                <span className={styles.dataValue}>12-Hour (1:00 PM)</span>
              </div>
              <div className={styles.dataRowHorizontal}>
                <span className={styles.dataLabel}>Grading System</span>
                <span className={styles.dataValue}>Percentage (%)</span>
              </div>
              <div className={styles.dataRowHorizontal}>
                <span className={styles.dataLabel}>Date Format</span>
                <span className={styles.dataValue}>MM/DD/YYYY</span>
              </div>
              <div className={styles.dataRowHorizontal}>
                <span className={styles.dataLabel}>School Level</span>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span className={`${styles.badge} ${styles.badgePurple}`}>JHS (Grades 7-10)</span>
                  <span className={`${styles.badge} ${styles.badgePurple}`}>SHS (Grades 11-12)</span>
                </div>
              </div>
              <div className={styles.dataRowHorizontal}>
                <span className={styles.dataLabel}>Announcements</span>
                <span className={`${styles.badge} ${styles.badgeGreen}`}>✅ Enabled</span>
              </div>
              <div className={styles.dataRowHorizontal}>
                <span className={styles.dataLabel}>Default Language</span>
                <span className={styles.dataValue}>English</span>
              </div>
              <div className={styles.dataRowHorizontal}>
                <span className={styles.dataLabel}>Parent Access</span>
                <span className={`${styles.badge} ${styles.badgeGreen}`}>✅ Enabled</span>
              </div>
              <div className={styles.dataRowHorizontal}></div>
              <div className={styles.dataRowHorizontal}>
                <span className={styles.dataLabel}>Student ID Generation</span>
                <span className={`${styles.badge} ${styles.badgeGray}`}>❌ Disabled</span>
              </div>
            </div>
          </div>

          {/* System Preview Card */}
          <div className={styles.reviewSectionCard}>
            <div className={styles.reviewSectionTitle} style={{ marginBottom: '1.5rem' }}>
              <span style={{ color: '#f5c842', fontSize: '1.4rem' }}>💻</span>
              System Preview
            </div>
            
            <div className={styles.previewCard} style={{ marginTop: 0, padding: '2rem', display: 'flex', flexDirection: 'row', gap: '2rem', alignItems: 'center' }}>
              <div className={styles.previewIcon} style={{ margin: 0 }}>🏫</div>
              <div style={{ textAlign: 'left' }}>
                <h3 className={styles.previewTitle} style={{ fontSize: '1.5rem' }}>ABC Learning Academy</h3>
                <div className={styles.previewTags} style={{ justifyContent: 'flex-start' }}>
                  <span className={styles.previewTag}>JHS (Grades 7-10)</span>
                  <span className={styles.previewTag}>SHS (Grades 11-12)</span>
                </div>
                <div className={styles.previewDetails} style={{ flexDirection: 'row', gap: '1rem', marginTop: '0.8rem' }}>
                  <span>SY 2025–2026</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span>🌐</span> English
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Status & Summary Cards */}
        <div className={styles.reviewSideCol}>
          
          <div className={styles.allSetCard}>
            <div className={styles.shieldIcon}>🛡️</div>
            <h3 className={styles.allSetTitle}>All Set!</h3>
            <p className={styles.allSetDesc}>Your school is ready to be added to the system.</p>
          </div>

          <div className={styles.summaryListCard}>
            <div className={styles.summaryListItem}>
              <div className={styles.summaryListIcon} style={{ background: 'rgba(245, 200, 66, 0.1)', color: '#f5c842' }}>✓</div>
              <div className={styles.summaryListText}>
                <h5>5</h5>
                <p>Steps Completed</p>
              </div>
            </div>
            
            <div className={styles.summaryListItem}>
              <div className={styles.summaryListIcon} style={{ background: 'rgba(92, 199, 137, 0.1)', color: '#5cc789' }}>✓</div>
              <div className={styles.summaryListText}>
                <h5>All Information</h5>
                <p>Looks complete</p>
              </div>
            </div>
            
            <div className={styles.summaryListItem}>
              <div className={styles.summaryListIcon} style={{ background: 'rgba(255, 183, 77, 0.1)', color: '#ffb74d' }}>✓</div>
              <div className={styles.summaryListText}>
                <h5>Ready to Go</h5>
                <p>Click submit to add your school and get started.</p>
              </div>
            </div>
          </div>

          <div className={styles.needChangesCard}>
            <h4>Need to make changes?</h4>
            <p>You can go back to any step and edit the details before submitting.</p>
            <button className={styles.goBackBtn}>
              <span>←</span> Go Back to Edit
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
