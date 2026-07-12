import React from 'react';
import globalStyles from '@/app/admin/admin.module.css';
import styles from './addSchool.module.css';

export const Step4Preferences: React.FC = () => {
  return (
    <div className={globalStyles.tableCard} style={{ padding: '2.5rem', borderLeft: '4px solid #b388ff' }}>
      <div className={styles.sectionHeader} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(179, 136, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
          <span style={{ transform: 'rotate(90deg)' }}>⚙️</span>
        </div>
        <div>
          <h3 className={styles.sectionTitle} style={{ color: '#b388ff' }}>Preferences</h3>
          <p className={styles.sectionDesc}>Customize the settings that best fits your school's needs.</p>
        </div>
      </div>
      
      <div className={styles.addressGrid}>
        {/* Left Column: Form */}
        <div className={styles.formColumn}>
          
          {/* Academic Settings */}
          <div className={styles.subSection}>
            <div className={styles.subSectionHeader}>
              <span className={styles.subSectionIcon}>🎓</span>
              <span>Academic Settings</span>
            </div>
            <div className={styles.inputRow}>
              <div>
                <label className={styles.label}>Academic Year Start <span className={styles.requiredStar}>*</span></label>
                <div className={styles.inputGroup}>
                  <span style={{ fontSize: '1.1rem', marginRight: '0.5rem' }}>🗓️</span>
                  <select className={`${styles.groupInput} ${styles.selectInput}`} style={{ paddingLeft: '0.2rem' }}>
                    <option value="june">June</option>
                    <option value="august">August</option>
                  </select>
                </div>
              </div>
              <div>
                <label className={styles.label}>Grading System <span className={styles.requiredStar}>*</span></label>
                <select className={`${styles.inputBox} ${styles.selectInput}`}>
                  <option value="percentage">Percentage (%)</option>
                  <option value="letter">Letter (A-F)</option>
                  <option value="gpa">GPA (1.0 - 5.0)</option>
                </select>
              </div>
            </div>
          </div>

          {/* School Level */}
          <div className={styles.subSection}>
            <div className={styles.subSectionHeader}>
              <span className={styles.subSectionIcon}>🏫</span>
              <span>School Level <span className={styles.optionalText} style={{ fontWeight: 400, fontSize: '0.85rem' }}>(Select all that apply)</span></span>
            </div>
            <div className={styles.inputRow}>
              <label className={`${styles.checkboxCard} ${styles.checkboxCardActive}`}>
                <input type="checkbox" defaultChecked className={styles.checkboxInput} />
                <span style={{ color: '#f0efed', fontSize: '0.9rem' }}>Junior High School <span className={styles.optionalText}>(Grades 7–10)</span></span>
              </label>
              <label className={`${styles.checkboxCard} ${styles.checkboxCardActive}`}>
                <input type="checkbox" defaultChecked className={styles.checkboxInput} />
                <span style={{ color: '#f0efed', fontSize: '0.9rem' }}>Senior High School <span className={styles.optionalText}>(Grades 11–12)</span></span>
              </label>
            </div>
            <div className={styles.inputRow} style={{ marginTop: '1rem' }}>
              <label className={styles.checkboxCard}>
                <input type="checkbox" className={styles.checkboxInput} />
                <span style={{ color: '#f0efed', fontSize: '0.9rem' }}>Elementary</span>
              </label>
              <label className={styles.checkboxCard}>
                <input type="checkbox" className={styles.checkboxInput} />
                <span style={{ color: '#f0efed', fontSize: '0.9rem' }}>College</span>
              </label>
            </div>
          </div>

          {/* Default Language */}
          <div className={styles.subSection}>
            <div className={styles.subSectionHeader}>
              <span className={styles.subSectionIcon}>🌐</span>
              <span>Default Language</span>
            </div>
            <p style={{ color: 'rgba(240, 239, 237, 0.5)', fontSize: '0.85rem', marginBottom: '1rem', marginTop: '-0.5rem' }}>
              Choose the primary language for your school portal.
            </p>
            <div className={styles.radioGroup}>
              <label className={styles.radioLabel}>
                <input type="radio" name="language" defaultChecked className={styles.radioInput} />
                English
              </label>
              <label className={styles.radioLabel}>
                <input type="radio" name="language" className={styles.radioInput} />
                Filipino
              </label>
              <label className={styles.radioLabel}>
                <input type="radio" name="language" className={styles.radioInput} />
                Both (English & Filipino)
              </label>
            </div>
          </div>

          {/* Time & Date Format */}
          <div className={styles.subSection}>
            <div className={styles.subSectionHeader}>
              <span className={styles.subSectionIcon}>🕒</span>
              <span>Time & Date Format</span>
            </div>
            <div className={styles.inputRow}>
              <div>
                <label className={styles.label}>Time Format</label>
                <select className={`${styles.inputBox} ${styles.selectInput}`}>
                  <option value="12h">12-Hour (1:00 PM)</option>
                  <option value="24h">24-Hour (13:00)</option>
                </select>
              </div>
              <div>
                <label className={styles.label}>Date Format</label>
                <select className={`${styles.inputBox} ${styles.selectInput}`}>
                  <option value="mmddyyyy">MM/DD/YYYY</option>
                  <option value="ddmmyyyy">DD/MM/YYYY</option>
                  <option value="yyyymmdd">YYYY-MM-DD</option>
                </select>
              </div>
            </div>
          </div>

          {/* Other Preferences */}
          <div className={styles.subSection}>
            <div className={styles.subSectionHeader}>
              <span className={styles.subSectionIcon}>⚙️</span>
              <span>Other Preferences</span>
            </div>
            <div className={styles.inputRow}>
              <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                <input type="checkbox" defaultChecked className={styles.checkboxInput} style={{ marginTop: '0.2rem' }} />
                <div>
                  <span style={{ color: '#f0efed', fontSize: '0.9rem', fontWeight: 500, display: 'block' }}>Enable announcements</span>
                  <span style={{ color: 'rgba(240, 239, 237, 0.5)', fontSize: '0.8rem' }}>Allow administrators and teachers to post announcements.</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                <input type="checkbox" defaultChecked className={styles.checkboxInput} style={{ marginTop: '0.2rem' }} />
                <div>
                  <span style={{ color: '#f0efed', fontSize: '0.9rem', fontWeight: 500, display: 'block' }}>Enable parent access</span>
                  <span style={{ color: 'rgba(240, 239, 237, 0.5)', fontSize: '0.8rem' }}>Allow parents to access their children's information.</span>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start', marginTop: '1.5rem' }}>
              <input type="checkbox" className={styles.checkboxInput} style={{ marginTop: '0.2rem' }} />
              <div>
                <span style={{ color: '#f0efed', fontSize: '0.9rem', fontWeight: 500, display: 'block' }}>Enable student ID generation</span>
                <span style={{ color: 'rgba(240, 239, 237, 0.5)', fontSize: '0.8rem' }}>Automatically generate student ID numbers.</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Preview & Tips */}
        <div className={styles.infoPanelCol}>
          
          <div style={{ background: 'rgba(240, 239, 237, 0.02)', borderRadius: '12px', padding: '1.5rem' }}>
            <h4 style={{ margin: '0 0 0.3rem 0', color: '#f0efed', fontSize: '1.05rem', fontWeight: 600 }}>School Preview</h4>
            <p style={{ margin: 0, color: 'rgba(240, 239, 237, 0.5)', fontSize: '0.85rem' }}>This is how your school will appear in the system.</p>
            
            <div className={styles.previewCard}>
              <div className={styles.previewIcon}>🏫</div>
              <h3 className={styles.previewTitle}>ABC Learning Academy</h3>
              <div className={styles.previewTags}>
                <span className={styles.previewTag}>Junior High School</span>
                <span className={styles.previewTag}>Senior High School</span>
              </div>
              <div className={styles.previewDetails}>
                <span>SY 2025–2026</span>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                  <span>🌐</span> English
                </span>
              </div>
            </div>
          </div>
          
          {/* Tips Panel */}
          <div className={styles.tipsPanel}>
            <div className={styles.panelHeader}>
              <span style={{ fontSize: '1.2rem' }}>💡</span>
              <h4 className={styles.panelTitle} style={{ color: '#b388ff' }}>Why these preferences matter?</h4>
            </div>
            
            <div className={styles.checkItem}>
              <div className={styles.checkCircle} style={{ background: '#b388ff' }}>
                <span className={styles.checkMark}>✓</span>
              </div>
              <span className={styles.checkText}>Academic year setting helps in organizing classes and reports.</span>
            </div>
            
            <div className={styles.checkItem}>
              <div className={styles.checkCircle} style={{ background: '#b388ff' }}>
                <span className={styles.checkMark}>✓</span>
              </div>
              <span className={styles.checkText}>Grading system is used for assessments and grade computation.</span>
            </div>
            
            <div className={styles.checkItem}>
              <div className={styles.checkCircle} style={{ background: '#b388ff' }}>
                <span className={styles.checkMark}>✓</span>
              </div>
              <span className={styles.checkText}>Language and format settings ensure the system matches your school's standards.</span>
            </div>

            <div className={styles.checkItem}>
              <div className={styles.checkCircle} style={{ background: '#b388ff' }}>
                <span className={styles.checkMark}>✓</span>
              </div>
              <span className={styles.checkText}>You can update these anytime in Settings.</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
