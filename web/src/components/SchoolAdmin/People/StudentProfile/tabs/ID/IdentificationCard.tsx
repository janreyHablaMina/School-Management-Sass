import React, { useState, useRef, useEffect } from 'react';
import styles from '../../studentProfile.module.css';
import { Student } from '../../shared/types';

interface IdentificationCardProps {
  student: Student;
}

export const IdentificationCard: React.FC<IdentificationCardProps> = ({ student }) => {
  const [idSide, setIdSide] = useState<'front' | 'back'>('front');
  const idCardContainerRef = useRef<HTMLDivElement>(null);
  const [idCardScale, setIdCardScale] = useState(1);

  useEffect(() => {
    if (!idCardContainerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;
      setIdCardScale(width / 450);
    });
    observer.observe(idCardContainerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
        <div className={styles.overviewGrid}>
          {/* Identification Info */}
          <div className={styles.infoCard}>
            <div className={styles.infoCardHeader} style={{ justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <div className={styles.infoCardIcon} style={{ background: 'rgba(182, 142, 255, 0.1)', color: '#b68eff' }}>🪪</div>
                <span className={styles.infoCardTitle}>Identification Information</span>
              </div>
              <div className={styles.idCardToggle}>
                <button 
                  className={`${styles.idCardToggleBtn} ${idSide === 'front' ? styles.idCardToggleBtnActive : ''}`}
                  onClick={() => setIdSide('front')}
                >Front</button>
                <button 
                  className={`${styles.idCardToggleBtn} ${idSide === 'back' ? styles.idCardToggleBtnActive : ''}`}
                  onClick={() => setIdSide('back')}
                >Back</button>
              </div>
            </div>
            <div style={{ padding: '0.5rem 0', width: '100%' }} ref={idCardContainerRef}>
              <div style={{ 
                width: '480px', 
                height: '300px', 
                transform: `scale(${idCardScale})`, 
                transformOrigin: 'top left',
                marginBottom: `-${300 * (1 - idCardScale)}px`
              }}>
                <div className={styles.idCard} style={{ width: '100%', height: '100%', margin: 0 }}>
                  {idSide === 'front' ? (
                  <>
                    {/* Header Container */}
                    <div className={styles.idCardHeader}>
                      <div className={styles.idCardHeaderLeft}>
                        <div className={styles.idCardLogoIcon}>🎓</div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span className={styles.idCardLogoText}>SchoolSaaS</span>
                          <span className={styles.idCardTagline}>Excellence in Education</span>
                        </div>
                      </div>
                      <div className={styles.idCardHeaderRight}>
                        <h4 className={styles.idCardSchoolName}>SCHOOLSAAS ACADEMY</h4>
                        <p className={styles.idCardSlogan}>Slogan Here</p>
                      </div>
                    </div>
  
                    {/* Body Container */}
                    <div className={styles.idCardBody}>
                      <div className={styles.idCardPhotoArea}>
                        <div className={styles.idCardPhoto} style={{ background: '#f8fafc', overflow: 'hidden' }}>
                          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#cbd5e0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                            <circle cx="8.5" cy="8.5" r="1.5"></circle>
                            <polyline points="21 15 16 10 5 21"></polyline>
                          </svg>
                        </div>
                      </div>
  
                      <div className={styles.idCardDivider}></div>
  
                      <div className={styles.idCardDetailsArea}>
                        <div className={styles.idCardGrid}>
                          <span className={styles.idCardLabel}>Reg No</span>
                          <span className={styles.idCardSeparator}>:</span>
                          <span className={styles.idCardValue}>123456</span>
  
                          <span className={styles.idCardLabel}>Student ID</span>
                          <span className={styles.idCardSeparator}>:</span>
                          <span className={styles.idCardValue}>{student.studentId}</span>
  
                          <span className={styles.idCardLabel}>Student Name</span>
                          <span className={styles.idCardSeparator}>:</span>
                          <span className={styles.idCardValue}>{student.name}</span>
  
                          <span className={styles.idCardLabel}>Father/Guardian</span>
                          <span className={styles.idCardSeparator}>:</span>
                          <span className={styles.idCardValue}>Pedro Dela Cruz</span>
  
                          <span className={styles.idCardLabel}>Class</span>
                          <span className={styles.idCardSeparator}>:</span>
                          <span className={styles.idCardValue}>{student.gradeSection}</span>
  
                          <span className={styles.idCardLabel}>Emergency Call</span>
                          <span className={styles.idCardSeparator}>:</span>
                          <span className={styles.idCardValue}>{student.contact}</span>
                        </div>
                      </div>
                    </div>
  
                    {/* Footer Container */}
                    <div className={styles.idCardFooter}>
                      <div className={styles.idCardFooterLeft}>
                        <span className={styles.idCardAddress}>School address street state 123</span>
                        <span className={styles.idCardPhone}>Telephone: 123-456-789</span>
                      </div>
                      <div className={styles.idCardFooterRight}>
                        <div className={styles.idCardSignatureLine}></div>
                        <span className={styles.idCardSignatureText}>Principal</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Back of Card Header */}
                    <div className={styles.idCardBackHeader}>
                      <div className={styles.idCardBackHeaderLeft}>
                        TERMS AND CONDITION
                      </div>
                      <div className={styles.idCardBackHeaderRight}>
                        <div className={styles.idCardBackDates}>
                          <span>Join Date : {student.dateEnrolled}</span>
                          <span>Expire Date : DD/MM/YR</span>
                        </div>
                      </div>
                    </div>
  
                    {/* Back of Card Body */}
                    <div className={styles.idCardBackBody}>
                      <ul className={styles.idCardBackTerms}>
                        <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt.</li>
                        <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt.</li>
                      </ul>
                      <div className={styles.idCardBackQR}>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#2d3748" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                          <rect x="7" y="7" width="3" height="3"></rect>
                          <rect x="14" y="7" width="3" height="3"></rect>
                          <rect x="7" y="14" width="3" height="3"></rect>
                          <rect x="14" y="14" width="3" height="3"></rect>
                        </svg>
                      </div>
                    </div>
  
                    {/* Back of Card Footer */}
                    <div className={styles.idCardBackFooter}>
                      <div className={styles.idCardBackFooterLeft}>
                        <div className={styles.idCardBackContact}>
                          <div className={styles.idCardBackContactRow}>
                            <span className={styles.idCardBackContactLabel}>Phone</span>
                            <span className={styles.idCardBackContactSep}>:</span>
                            <span>{student.contact}</span>
                          </div>
                          <div className={styles.idCardBackContactRow}>
                            <span className={styles.idCardBackContactLabel}>Mail</span>
                            <span className={styles.idCardBackContactSep}>:</span>
                            <span>{student.email}</span>
                          </div>
                          <div className={styles.idCardBackContactRow}>
                            <span className={styles.idCardBackContactLabel}>Website</span>
                            <span className={styles.idCardBackContactSep}>:</span>
                            <span>schoolsaas.edu</span>
                          </div>
                        </div>
                      </div>
                      <div className={styles.idCardBackFooterRight}>
                        <div className={styles.idCardLogoIcon} style={{ width: 32, height: 32, fontSize: '1.2rem', color: '#fff', background: 'rgba(255,255,255,0.1)' }}>🎓</div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span className={styles.idCardSchoolName} style={{ fontSize: '1rem' }}>SchoolSaaS</span>
                          <span className={styles.idCardSlogan} style={{ fontSize: '0.55rem' }}>Excellence in Ed.</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};
