import React, { useState } from 'react';
import styles from './studentProfile.module.css';

interface Student {
  id: string;
  name: string;
  email: string;
  studentId: string;
  gradeSection: string;
  parentGuardian: string;
  contact: string;
  status: string;
  dateEnrolled: string;
  avatarColor: string;
}

interface StudentProfileViewProps {
  student: Student;
  onBack: () => void;
}

export const StudentProfileView: React.FC<StudentProfileViewProps> = ({ student, onBack }) => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [idSide, setIdSide] = useState<'front' | 'back'>('front');

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const tabs = ['Overview', 'Academic', 'Attendance', 'Assignments', 'Grades', 'Documents', 'Parent / Guardian', 'History'];

  return (
    <div className={styles.container}>
      {/* Breadcrumbs */}
      <div className={styles.breadcrumbs}>
        <span className={styles.breadcrumbLink} onClick={onBack}>Students</span>
        <span>&gt;</span>
        <span className={styles.breadcrumbActive}>Student Profile</span>
      </div>

      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1>Student Profile</h1>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.backBtn} onClick={onBack}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            Back to Students
          </button>
          <button className={styles.editBtn}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon></svg>
            Edit Student
          </button>
          <button className={styles.moreBtn}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
          </button>
        </div>
      </div>

      {/* Header Grid */}
      <div className={styles.headerGrid}>
        {/* Avatar Card */}
        <div className={styles.infoCard}>
          <div className={styles.avatarTopHalf}>
            <div className={styles.avatarProfileBlock}>
              <div className={styles.avatarCircle} style={{ borderColor: student.avatarColor }}>
                <span style={{ color: student.avatarColor }}>{getInitials(student.name)}</span>
                <div className={styles.statusDot}></div>
              </div>
            </div>
            <div className={styles.nameAndBadge}>
              <h2>{student.name}</h2>
              <span className={styles.statusBadge}>{student.status} Student</span>
            </div>
          </div>
          
          <div className={styles.avatarBottomHalf}>
            <div className={styles.avatarMetaGrid}>
                <div className={styles.detailRow}>
                  <span className={styles.rowLabel}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg> Grade & Section</span>
                  <span className={styles.rowValue}>{student.gradeSection}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.rowLabel}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg> Student ID</span>
                  <span className={styles.rowValue}>{student.studentId}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.rowLabel}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg> LRN</span>
                  <span className={styles.rowValue}>123456789101</span>
                </div>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className={styles.infoCard}>
          <div className={styles.infoCardHeader}>
            <div className={styles.infoCardIcon}>👤</div>
            <span className={styles.infoCardTitle}>Personal Information</span>
          </div>
          <div className={styles.detailsGrid}>
            <div className={styles.detailRow}>
              <span className={styles.rowLabel}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg> Date of Birth</span>
              <span className={styles.rowValue}>March 15, 2009</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.rowLabel}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> Age</span>
              <span className={styles.rowValue}>16 years old</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.rowLabel}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> Gender</span>
              <span className={styles.rowValue}>Male</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.rowLabel}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg> Nationality</span>
              <span className={styles.rowValue}>Filipino</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.rowLabel}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"></path></svg> Blood Type</span>
              <span className={styles.rowValue}>O+</span>
            </div>
          </div>
        </div>

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
          <div style={{ padding: '0.5rem 0' }}>
            <div className={styles.idCard}>
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

      {/* Tabs */}
      <div className={styles.tabsContainer}>
        {tabs.map(tab => (
          <button 
            key={tab} 
            className={`${styles.tabBtn} ${activeTab === tab ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'Overview' && (
        <div className={styles.overviewGrid}>
          {/* School Information */}
          <div className={styles.infoCard}>
            <div className={styles.infoCardHeader}>
              <div className={styles.infoCardIcon} style={{ background: 'rgba(92, 199, 137, 0.1)', color: '#5cc789' }}>🏛️</div>
              <span className={styles.infoCardTitle}>School Information</span>
            </div>
            <div className={styles.detailsGrid}>
              <div className={styles.detailRow}>
                <span className={styles.rowLabel}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg> Adviser</span>
                <span className={styles.rowValue}>Mrs. Liza Mendoza</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.rowLabel}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg> School Year</span>
                <span className={styles.rowValue}>2025 - 2026</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.rowLabel}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg> Modality</span>
                <span className={styles.rowValue}>Face-to-Face</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.rowLabel}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg> Club</span>
                <span className={styles.rowValue}>Science Club</span>
              </div>
            </div>
          </div>
          {/* Enrollment Info */}
          <div className={styles.infoCard}>
            <div className={styles.infoCardHeader}>
              <div className={styles.infoCardIcon} style={{ background: 'rgba(132, 169, 255, 0.1)', color: '#84a9ff' }}>📅</div>
              <span className={styles.infoCardTitle}>Enrollment Information</span>
            </div>
            <div className={styles.detailsGrid}>
              <div className={styles.detailRow}>
                <span>Enrollment Type</span>
                <span>Transferee</span>
              </div>
              <div className={styles.detailRow}>
                <span>Admission Date</span>
                <span>{student.dateEnrolled}</span>
              </div>
              <div className={styles.detailRow}>
                <span>Curriculum</span>
                <span>Basic Education (K-12)</span>
              </div>
              <div className={styles.detailRow}>
                <span>Previous School</span>
                <span>Quezon City Science High School</span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className={styles.infoCard}>
            <div className={styles.infoCardHeader}>
              <div className={styles.infoCardIcon} style={{ background: 'rgba(245, 200, 66, 0.1)', color: '#f5c842' }}>📞</div>
              <span className={styles.infoCardTitle}>Contact Information</span>
            </div>
            <div className={styles.detailsGrid}>
              <div className={styles.detailRow} style={{ gridColumn: '1 / -1' }}>
                <span>Address</span>
                <span>123 Sampaguita St., Barangay 12, Quezon City</span>
              </div>
              <div className={styles.detailRow}>
                <span>Contact Number</span>
                <span>{student.contact}</span>
              </div>
              <div className={styles.detailRow}>
                <span>Email</span>
                <span>{student.email}</span>
              </div>
            </div>
          </div>

          {/* Parent/Guardian */}
          <div className={styles.infoCard}>
            <div className={styles.infoCardHeader}>
              <div className={styles.infoCardIcon} style={{ background: 'rgba(255, 126, 147, 0.1)', color: '#ff7e93' }}>👥</div>
              <span className={styles.infoCardTitle}>Parent / Guardian</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', borderBottom: '1px dashed rgba(240, 239, 237, 0.1)', paddingBottom: '1rem' }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'rgba(240, 239, 237, 0.5)', fontWeight: 600 }}>Father</span>
                <span style={{ fontSize: '1rem', color: '#f0efed', fontWeight: 500 }}>Pedro Dela Cruz</span>
                <span style={{ fontSize: '0.85rem', color: '#84a9ff', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  0917 876 5432
                </span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', borderBottom: '1px dashed rgba(240, 239, 237, 0.1)', paddingBottom: '1rem' }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'rgba(240, 239, 237, 0.5)', fontWeight: 600 }}>Mother</span>
                <span style={{ fontSize: '1rem', color: '#f0efed', fontWeight: 500 }}>Maria Dela Cruz</span>
                <span style={{ fontSize: '0.85rem', color: '#84a9ff', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  0908 765 4321
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#ff7e93', fontWeight: 600 }}>Emergency Contact</span>
                <span style={{ fontSize: '1rem', color: '#f0efed', fontWeight: 500 }}>{student.parentGuardian}</span>
                <span style={{ fontSize: '0.85rem', color: '#84a9ff', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  {student.contact}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Statistics */}
          <div className={styles.infoCard}>
            <div className={styles.infoCardHeader}>
              <div className={styles.infoCardIcon} style={{ background: 'rgba(255, 171, 107, 0.1)', color: '#ffab6b' }}>📊</div>
              <span className={styles.infoCardTitle}>Quick Statistics</span>
            </div>
            <div className={styles.statsRow}>
              <div className={styles.statBox}>
                <div className={styles.statIcon} style={{ background: 'rgba(245, 200, 66, 0.1)', color: '#f5c842' }}>🏅</div>
                <div className={styles.statLabel}>General Average</div>
                <div className={styles.statVal}>89.15</div>
                <div className={styles.statSub}>Very Good</div>
              </div>
              <div className={styles.statBox}>
                <div className={styles.statIcon} style={{ background: 'rgba(92, 199, 137, 0.1)', color: '#5cc789' }}>📅</div>
                <div className={styles.statLabel}>Attendance</div>
                <div className={styles.statVal}>96%</div>
                <div className={styles.statSub}>This School Year</div>
              </div>
              <div className={styles.statBox}>
                <div className={styles.statIcon} style={{ background: 'rgba(132, 169, 255, 0.1)', color: '#84a9ff' }}>📖</div>
                <div className={styles.statLabel}>Subjects</div>
                <div className={styles.statVal}>8</div>
                <div className={styles.statSub}>This School Year</div>
              </div>
              <div className={styles.statBox}>
                <div className={styles.statIcon} style={{ background: 'rgba(182, 142, 255, 0.1)', color: '#b68eff' }}>📋</div>
                <div className={styles.statLabel}>Assignments</div>
                <div className={styles.statVal}>12 / 13</div>
                <div className={styles.statSub}>Submitted</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab !== 'Overview' && (
        <div className={styles.infoCard}>
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'rgba(240,239,237,0.4)' }}>
            <h3>{activeTab} Module</h3>
            <p>This module is currently under development.</p>
          </div>
        </div>
      )}
    </div>
  );
};
