import React from 'react';
import dynamic from 'next/dynamic';
import globalStyles from '@/app/admin/admin.module.css';
import styles from './addSchool.module.css';

// Dynamically import the MapComponent with SSR disabled
const MapComponent = dynamic(() => import('./MapComponent'), { 
  ssr: false,
  loading: () => (
    <div style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.2)', color: 'rgba(240, 239, 237, 0.5)' }}>
      Loading map...
    </div>
  )
});

export const Step3Address: React.FC = () => {
  return (
    <div className={globalStyles.tableCard} style={{ padding: '2.5rem', borderLeft: '4px solid #f5c842' }}>
      <div className={styles.sectionHeader} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(245, 200, 66, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
          📍
        </div>
        <div>
          <h3 className={styles.sectionTitle} style={{ color: '#f5c842' }}>School Address</h3>
          <p className={styles.sectionDesc}>Provide the physical address and location details of your school.</p>
        </div>
      </div>
      
      <div className={styles.addressGrid}>
        {/* Left Column: Form */}
        <div className={styles.formColumn}>
          <div>
            <label className={styles.label}>Country <span className={styles.requiredStar}>*</span></label>
            <div className={styles.inputGroup}>
              <span style={{ fontSize: '1.1rem', marginRight: '0.5rem' }}>🇵🇭</span>
              <select className={`${styles.groupInput} ${styles.selectInput}`} style={{ paddingLeft: '0.2rem' }}>
                <option value="ph">Philippines</option>
              </select>
            </div>
          </div>

          <div>
            <label className={styles.label}>Region / State <span className={styles.requiredStar}>*</span></label>
            <select className={`${styles.inputBox} ${styles.selectInput}`}>
              <option value="central-luzon">Central Luzon</option>
            </select>
          </div>

          <div className={styles.inputRow}>
            <div>
              <label className={styles.label}>Province <span className={styles.requiredStar}>*</span></label>
              <select className={`${styles.inputBox} ${styles.selectInput}`}>
                <option value="pampanga">Pampanga</option>
              </select>
            </div>
            <div>
              <label className={styles.label}>City / Municipality <span className={styles.requiredStar}>*</span></label>
              <select className={`${styles.inputBox} ${styles.selectInput}`}>
                <option value="angeles">Angeles City</option>
              </select>
            </div>
          </div>

          <div>
            <label className={styles.label}>Barangay <span className={styles.requiredStar}>*</span></label>
            <select className={`${styles.inputBox} ${styles.selectInput}`}>
              <option value="malabanias">Malabanias</option>
            </select>
          </div>

          <div>
            <label className={styles.label}>Street Address <span className={styles.requiredStar}>*</span></label>
            <input type="text" defaultValue="123 Education Street, Malabanias" className={styles.inputBox} />
            <span style={{ fontSize: '0.75rem', color: 'rgba(240, 239, 237, 0.4)', marginTop: '0.4rem', display: 'block' }}>
              House/Building No., Street Name
            </span>
          </div>

          <div>
            <label className={styles.label}>Zip / Postal Code</label>
            <input type="text" defaultValue="2009" className={styles.inputBox} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
            <input type="checkbox" defaultChecked id="main-campus" style={{ accentColor: '#f5c842', width: '16px', height: '16px', cursor: 'pointer' }} />
            <label htmlFor="main-campus" style={{ fontSize: '0.9rem', color: '#f0efed', cursor: 'pointer', fontWeight: 500 }}>
              This is the main campus address
            </label>
          </div>
        </div>

        {/* Right Column: Map & Tips */}
        <div className={styles.infoPanelCol}>
          
          {/* Map Box */}
          <div style={{ border: '1px solid rgba(240, 239, 237, 0.1)', borderRadius: '12px', background: 'rgba(0,0,0,0.1)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '1.5rem 1.5rem 1rem' }}>
              <h4 style={{ margin: '0 0 0.3rem 0', color: '#f0efed', fontSize: '1rem', fontWeight: 600 }}>School Location</h4>
              <p style={{ margin: 0, color: 'rgba(240, 239, 237, 0.5)', fontSize: '0.8rem' }}>Drag the pin on the map to set the exact location of your school.</p>
            </div>
            
            {/* Real Interactive Map */}
            <div style={{ 
              height: '220px', 
              margin: '0 1.5rem', 
              borderRadius: '8px',
              position: 'relative',
              display: 'flex',
              overflow: 'hidden'
            }}>
              <MapComponent />
            </div>

            {/* Selected Address Overlay Box */}
            <div style={{ margin: '1rem 1.5rem 1.5rem', background: 'rgba(245, 200, 66, 0.05)', borderRadius: '8px', padding: '1rem', display: 'flex', gap: '0.8rem' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(245, 200, 66, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: '0.9rem' }}>📍</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <span style={{ color: '#f0efed', fontSize: '0.85rem', lineHeight: 1.4 }}>123 Education Street, Malabanias<br/>Angeles City, Pampanga, 2009, Philippines</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#f5c842', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>
                  Use this location <span style={{ background: '#f5c842', color: '#0b1a13', borderRadius: '50%', width: '14px', height: '14px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem' }}>✓</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tips Panel */}
          <div className={styles.tipsPanel}>
            <div className={styles.panelHeader}>
              <span style={{ fontSize: '1.2rem' }}>✨</span>
              <h4 className={styles.panelTitle} style={{ color: '#f5c842' }}>Tips</h4>
            </div>
            
            <div className={styles.checkItem}>
              <div className={styles.checkCircle} style={{ background: '#f5c842' }}>
                <span className={styles.checkMark}>✓</span>
              </div>
              <span className={styles.checkText}>Make sure the address is complete and accurate.</span>
            </div>
            
            <div className={styles.checkItem}>
              <div className={styles.checkCircle} style={{ background: '#f5c842' }}>
                <span className={styles.checkMark}>✓</span>
              </div>
              <span className={styles.checkText}>You can adjust the pin on the map for precision.</span>
            </div>
            
            <div className={styles.checkItem}>
              <div className={styles.checkCircle} style={{ background: '#f5c842' }}>
                <span className={styles.checkMark}>✓</span>
              </div>
              <span className={styles.checkText}>This helps parents and visitors find your school easily.</span>
            </div>
          </div>

        </div>
      </div>
      
      {/* Add keyframes for the pulse animation if it doesn't exist */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(245, 200, 66, 0.4); }
          70% { box-shadow: 0 0 0 15px rgba(245, 200, 66, 0); }
          100% { box-shadow: 0 0 0 0 rgba(245, 200, 66, 0); }
        }
      `}} />
    </div>
  );
};
