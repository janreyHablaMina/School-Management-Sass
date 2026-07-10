import React from 'react';
import globalStyles from '@/app/admin/admin.module.css';
import styles from './addSchool.module.css';

export const Step1BasicInfo: React.FC = () => {
  return (
    <div className={globalStyles.tableCard} style={{ padding: '2.5rem', borderLeft: '4px solid #84a9ff' }}>
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle} style={{ color: '#84a9ff' }}>Basic Information</h3>
        <p className={styles.sectionDesc}>Provide the basic details about your school.</p>
      </div>
      
      <div className={styles.twoColGrid}>
        <div className={styles.formColumn}>
          <div className={styles.inputRow}>
            <div>
              <label className={styles.label}>School Name <span className={styles.requiredStar}>*</span></label>
              <input type="text" placeholder="Enter school name" className={styles.inputBox} />
            </div>
            <div>
              <label className={styles.label}>School Code <span className={styles.requiredStar}>*</span></label>
              <input type="text" placeholder="e.g. SCH-2025-001" className={styles.inputBox} />
            </div>
          </div>

          <div className={styles.inputRow}>
            <div>
              <label className={styles.label}>Short Name <span className={styles.requiredStar}>*</span></label>
              <input type="text" placeholder="e.g. ABC School" className={styles.inputBox} />
            </div>
            <div>
              <label className={styles.label}>Established Year</label>
              <input type="date" className={`${styles.inputBox} ${styles.inputBoxDarkScheme}`} />
            </div>
          </div>

          <div>
            <label className={styles.label}>School Type <span className={styles.requiredStar}>*</span></label>
            <select className={`${styles.inputBox} ${styles.selectInput}`}>
              <option value="">Select school type</option>
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="charter">Charter</option>
            </select>
          </div>
        </div>

        {/* Logo Upload */}
        <div className={styles.logoUploadWrapper}>
          <span className={styles.label} style={{ marginBottom: '1rem', fontWeight: 500 }}>School Logo</span>
          <div className={styles.logoUploadBox}>
            <div style={{ color: '#84a9ff', fontSize: '2rem', marginBottom: '0.5rem' }}>🖼️</div>
            <div style={{ color: '#84a9ff', fontWeight: 600, marginBottom: '0.3rem' }}>Upload Logo</div>
            <div style={{ color: 'rgba(240, 239, 237, 0.5)', fontSize: '0.8rem' }}>PNG, JPG or SVG (max. 2MB)</div>
          </div>
        </div>
      </div>

      {/* About the School (Moved inside Step 1 for simplicity) */}
      <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px dashed rgba(240, 239, 237, 0.1)' }}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle} style={{ color: '#5cc789' }}>About the School</h3>
          <p className={styles.sectionDesc}>Tell us more about your school.</p>
        </div>
        
        <div className={styles.twoColGrid}>
          <div>
            <label className={styles.label}>School Description</label>
            <textarea 
              placeholder="Enter a brief description about your school..."
              rows={6}
              className={`${styles.inputBox} ${styles.textareaInput}`}
            />
            <div className={styles.textareaCharCount}>0/500</div>
          </div>

          <div className={styles.infoPanel}>
            <div className={styles.panelHeader}>
              <span style={{ fontSize: '1.2rem' }}>✨</span>
              <h4 className={styles.panelTitle} style={{ color: '#5cc789' }}>Why it matters?</h4>
            </div>
            
            <div className={styles.checkItem}>
              <div className={styles.checkCircle} style={{ background: '#5cc789' }}>
                <span className={styles.checkMark}>✓</span>
              </div>
              <span className={styles.checkText}>This information helps personalize your school portal.</span>
            </div>
            
            <div className={styles.checkItem}>
              <div className={styles.checkCircle} style={{ background: '#5cc789' }}>
                <span className={styles.checkMark}>✓</span>
              </div>
              <span className={styles.checkText}>You can always update these details later.</span>
            </div>
            
            <div className={styles.checkItem}>
              <div className={styles.checkCircle} style={{ background: '#5cc789' }}>
                <span className={styles.checkMark}>✓</span>
              </div>
              <span className={styles.checkText}>Make sure the information is accurate for official records.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
