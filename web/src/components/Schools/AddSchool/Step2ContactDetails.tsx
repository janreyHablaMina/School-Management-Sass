import React from 'react';
import globalStyles from '@/app/admin/admin.module.css';
import styles from './addSchool.module.css';

export const Step2ContactDetails: React.FC = () => {
  return (
    <div className={globalStyles.tableCard} style={{ padding: '2.5rem', borderLeft: '4px solid #f5c842' }}>
      <div className={styles.sectionHeader} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(245, 200, 66, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
          📞
        </div>
        <div>
          <h3 className={styles.sectionTitle} style={{ color: '#f5c842' }}>Contact Details</h3>
          <p className={styles.sectionDesc}>Provide the primary contact information for your school.</p>
        </div>
      </div>
      
      <div className={styles.twoColGrid}>
        <div className={styles.formColumn}>
          <div className={styles.inputRow}>
            <div>
              <label className={styles.label}>Primary Contact Person <span className={styles.requiredStar}>*</span></label>
              <div className={styles.inputGroup}>
                <span className={styles.groupIcon}>👤</span>
                <input type="text" placeholder="e.g. John Dela Cruz" className={styles.groupInput} />
              </div>
            </div>
            <div>
              <label className={styles.label}>Designation / Position <span className={styles.requiredStar}>*</span></label>
              <div className={styles.inputGroup}>
                <span className={styles.groupIcon}>💼</span>
                <input type="text" placeholder="e.g. School Administrator" className={styles.groupInput} />
              </div>
            </div>
          </div>

          <div className={styles.inputRow}>
            <div>
              <label className={styles.label}>Email Address <span className={styles.requiredStar}>*</span></label>
              <div className={styles.inputGroup}>
                <span className={styles.groupIcon}>✉️</span>
                <input type="email" placeholder="e.g. admin@school.edu.ph" className={styles.groupInput} />
              </div>
            </div>
            <div>
              <label className={styles.label}>Phone Number <span className={styles.requiredStar}>*</span></label>
              <div className={styles.inputGroup}>
                <span className={styles.groupIcon}>📱</span>
                <input type="tel" placeholder="e.g. +63 912 345 6789" className={styles.groupInput} />
              </div>
            </div>
          </div>

          <div className={styles.inputRow}>
            <div>
              <label className={styles.label}>Alternate Phone Number</label>
              <div className={styles.inputGroup}>
                <span className={styles.groupIcon}>📱</span>
                <input type="tel" placeholder="e.g. +63 998 765 4321" className={styles.groupInput} />
              </div>
            </div>
            <div>
              <label className={styles.label}>School Landline <span className={styles.optionalText}>(Optional)</span></label>
              <div className={styles.inputGroup}>
                <span className={styles.groupIcon}>☎️</span>
                <input type="tel" placeholder="e.g. (045) 123 4567" className={styles.groupInput} />
              </div>
            </div>
          </div>

          <div>
            <label className={styles.label}>Official Website <span className={styles.optionalText}>(Optional)</span></label>
            <div className={styles.inputGroup}>
              <span className={styles.groupIcon}>🌐</span>
              <input type="url" placeholder="e.g. www.schoolname.edu.ph" className={styles.groupInput} />
            </div>
          </div>

          <div>
            <label className={styles.label}>Official Social Media <span className={styles.optionalText}>(Optional)</span></label>
            <div className={styles.socialGrid}>
              <div className={`${styles.inputGroup} ${styles.inputGroupSocial}`}>
                <span style={{ color: '#1877F2', fontSize: '1.1rem' }}>📘</span>
                <input type="url" placeholder="Facebook URL" className={`${styles.groupInput} ${styles.groupInputSocial}`} />
              </div>
              <div className={`${styles.inputGroup} ${styles.inputGroupSocial}`}>
                <span style={{ color: '#1DA1F2', fontSize: '1.1rem' }}>🐦</span>
                <input type="url" placeholder="Twitter URL" className={`${styles.groupInput} ${styles.groupInputSocial}`} />
              </div>
              <div className={`${styles.inputGroup} ${styles.inputGroupSocial}`}>
                <span style={{ color: '#E4405F', fontSize: '1.1rem' }}>📸</span>
                <input type="url" placeholder="Instagram URL" className={`${styles.groupInput} ${styles.groupInputSocial}`} />
              </div>
              <div className={`${styles.inputGroup} ${styles.inputGroupSocial}`}>
                <span style={{ color: '#FF0000', fontSize: '1.1rem' }}>▶️</span>
                <input type="url" placeholder="YouTube URL" className={`${styles.groupInput} ${styles.groupInputSocial}`} />
              </div>
            </div>
          </div>
        </div>

        {/* Info Panel */}
        <div className={styles.infoPanelCol}>
          <div className={styles.infoPanelContact}>
            <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>📇</div>
            <h4 className={styles.panelTitleContact} style={{ color: '#f5c842', margin: 0, fontWeight: 600 }}>Why is this important?</h4>
            <p style={{ color: 'rgba(240, 239, 237, 0.7)', fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>
              These contact details will be used for important communication, notifications, and account recovery.
            </p>
          </div>
          
          <div className={styles.tipsPanel}>
            <div className={styles.panelHeader}>
              <span style={{ fontSize: '1.2rem' }}>💡</span>
              <h4 className={styles.panelTitle} style={{ color: '#f0efed' }}>Tips</h4>
            </div>
            
            <div className={styles.checkItem}>
              <div className={styles.checkCircle} style={{ background: '#f5c842' }}>
                <span className={styles.checkMark}>✓</span>
              </div>
              <span className={styles.checkText}>Use an official school email address.</span>
            </div>
            
            <div className={styles.checkItem}>
              <div className={styles.checkCircle} style={{ background: '#f5c842' }}>
                <span className={styles.checkMark}>✓</span>
              </div>
              <span className={styles.checkText}>Ensure the phone number is active and monitored regularly.</span>
            </div>
            
            <div className={styles.checkItem}>
              <div className={styles.checkCircle} style={{ background: '#f5c842' }}>
                <span className={styles.checkMark}>✓</span>
              </div>
              <span className={styles.checkText}>You can update these details later in Settings.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
