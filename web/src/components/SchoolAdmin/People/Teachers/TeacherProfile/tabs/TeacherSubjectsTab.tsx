import React, { useState } from 'react';
import styles from './teacherSubjectsTab.module.css';
import uiStyles from '@/components/ui/ui.module.css';
import { Teacher, mockTeacherSubjects, mockSubjectActivities, SubjectHandled, SubjectActivity } from '@/lib/mock/teachers.mock';
import { Table } from '@/components/ui/Table';
import { Pagination } from '@/components/ui/Pagination';
import { 
  Download, Search, MoreHorizontal, FileText, Plus, 
  BookOpen, Users, Calendar, 
  FlaskConical, Leaf, Globe, Book, 
  FilePlus, Edit, UploadCloud, CheckSquare
} from 'lucide-react';
import { ActionDropdown, ActionDropdownItem } from '@/components/ui/ActionDropdown';

interface TeacherSubjectsTabProps {
  teacher: Teacher;
}

export const TeacherSubjectsTab: React.FC<TeacherSubjectsTabProps> = ({ teacher }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const renderSubjectIcon = (name: string) => {
    let Icon = Book;
    let colorClass = styles.activityPurple;
    if (name.includes('Biology')) { Icon = FlaskConical; colorClass = styles.activityPurple; }
    if (name.includes('Research')) { Icon = FlaskConical; colorClass = styles.activityGreen; }
    if (name.includes('Environmental')) { Icon = Leaf; colorClass = styles.activityPink; }
    if (name.includes('Earth')) { Icon = Globe; colorClass = styles.activityPink; }

    return (
      <div className={`${styles.activityIcon} ${colorClass}`}>
        <Icon size={16} />
      </div>
    );
  };

  const renderActivityIcon = (type: string) => {
    let Icon = FileText;
    let colorClass = styles.activityPurple;
    if (type === 'Created Assignment') { Icon = FilePlus; colorClass = styles.activityPurple; }
    if (type === 'Updated Lesson') { Icon = Edit; colorClass = styles.activityBlue; }
    if (type === 'Added Learning Material') { Icon = UploadCloud; colorClass = styles.activityGreen; }
    if (type === 'Submitted Grades') { Icon = CheckSquare; colorClass = styles.activityBlue; }

    return (
      <div className={`${styles.activityIcon} ${colorClass}`}>
        <Icon size={16} />
      </div>
    );
  };

  return (
    <div className={uiStyles.tabLayoutContainer}>
      <div className={uiStyles.tabLeftCol}>
        
        {/* Subjects Table Card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h3 className={styles.cardTitle}>Subjects Handled (SY 2025-2026)</h3>
              <p className={styles.cardSubtitle}>List of all subjects taught by this teacher.</p>
            </div>
            <div className={styles.headerActions}>
              <div className={styles.searchWrapper}>
                <input 
                  type="text" 
                  placeholder="Search subject..." 
                  className={uiStyles.inputBase} 
                  style={{ paddingRight: '2.5rem', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(240,239,237,0.1)' }}
                />
                <Search size={16} className={styles.searchIcon} />
              </div>
              <button className={`${uiStyles.btnBase} ${uiStyles.btnSm} ${uiStyles.btnSecondary}`} style={{ borderColor: 'rgba(182, 142, 255, 0.5)', color: '#b68eff' }}>
                <Download size={14} /> Export
              </button>
            </div>
          </div>

          <Table<SubjectHandled>
            columns={[
              { 
                header: 'Subject', 
                accessor: 'name', 
                render: (item) => (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    {renderSubjectIcon(item.name)}
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontWeight: 600, color: '#f0efed' }}>{item.name}</span>
                      {item.type && <span style={{ fontSize: '0.75rem', color: 'rgba(240, 239, 237, 0.5)' }}>{item.type}</span>}
                    </div>
                  </div>
                )
              },
              { header: 'Subject Code', accessor: 'code' },
              { header: 'Grade Level', accessor: 'gradeLevel' },
              { header: 'Total Classes', accessor: 'totalClasses' },
              { header: 'Total Students', accessor: 'totalStudents' },
              { header: 'Weekly Periods', accessor: 'weeklyPeriods' },
              { 
                header: 'Status', 
                accessor: 'status', 
                render: (item) => (
                  <span className={uiStyles.badgeGreen}>{item.status}</span>
                )
              },
              { 
                header: 'Actions', 
                accessor: 'id', 
                render: (item) => (
                  <div style={{ position: 'relative' }}>
                    <button 
                      className={uiStyles.btnGhost} 
                      style={{ padding: '0.25rem' }}
                      onClick={() => setOpenDropdownId(openDropdownId === item.id ? null : item.id)}
                    >
                      <MoreHorizontal size={16} />
                    </button>
                    <ActionDropdown
                      isOpen={openDropdownId === item.id}
                      onClose={() => setOpenDropdownId(null)}
                    >
                      <ActionDropdownItem>View Syllabus</ActionDropdownItem>
                      <ActionDropdownItem>Edit Subject</ActionDropdownItem>
                      <ActionDropdownItem isDanger>Reassign</ActionDropdownItem>
                    </ActionDropdown>
                  </div>
                )
              }
            ]}
            data={mockTeacherSubjects}
            keyExtractor={(item) => item.id}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={1}
            totalItems={6}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            itemName="subjects"
          />
        </div>

        {/* Recent Activities */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h3 className={styles.cardTitle}>Recent Subject Activities</h3>
            </div>
            <a href="#" className={uiStyles.btnGhost} style={{ fontSize: '0.85rem', fontWeight: 600, padding: 0 }}>
              View all subject activities →
            </a>
          </div>

          <Table<SubjectActivity>
            columns={[
              { 
                header: 'Date & Time', 
                accessor: 'date',
                render: (item) => (
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ color: '#f0efed' }}>{item.date}</span>
                    <span style={{ fontSize: '0.75rem', color: 'rgba(240, 239, 237, 0.5)' }}>{item.time}</span>
                  </div>
                )
              },
              { 
                header: 'Activity', 
                accessor: 'activityType',
                render: (item) => (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    {renderActivityIcon(item.activityType)}
                    <span style={{ fontWeight: 600, color: '#f0efed' }}>{item.activityType}</span>
                  </div>
                )
              },
              { 
                header: 'Details', 
                accessor: 'details',
                render: (item) => (
                  <span style={{ color: 'rgba(240, 239, 237, 0.7)' }}>{item.details}</span>
                )
              },
              { 
                header: 'Subject', 
                accessor: 'subject',
                render: (item) => (
                  <span style={{ color: '#84a9ff' }}>{item.subject}</span>
                )
              }
            ]}
            data={mockSubjectActivities}
            keyExtractor={(item) => item.id}
          />
        </div>

      </div>

      <div className={uiStyles.tabRightCol}>
        <div className={styles.summaryLoadGroup}>
          
          {/* Subject Summary */}
          <div className={styles.card} style={{ marginBottom: 0 }}>
            <h3 className={styles.cardTitle}>Subject Summary</h3>
            <div className={styles.summaryGrid} style={{ marginTop: '1.25rem' }}>
              <div className={styles.summaryCard}>
                <div className={`${styles.summaryIcon} ${styles.summaryIconPurple}`}>
                  <BookOpen size={20} />
                </div>
                <div className={styles.summaryInfo}>
                  <h4>6</h4>
                  <p>Subjects Handled</p>
                  <span>This School Year</span>
                </div>
              </div>
              <div className={styles.summaryCard}>
                <div className={`${styles.summaryIcon} ${styles.summaryIconGreen}`}>
                  <Users size={20} />
                </div>
                <div className={styles.summaryInfo}>
                  <h4>2</h4>
                  <p>Different Grade Levels</p>
                </div>
              </div>
              <div className={styles.summaryCard}>
                <div className={`${styles.summaryIcon} ${styles.summaryIconYellow}`}>
                  <Calendar size={20} />
                </div>
                <div className={styles.summaryInfo}>
                  <h4>20</h4>
                  <p>Total Periods / Week</p>
                </div>
              </div>
              <div className={styles.summaryCard}>
                <div className={`${styles.summaryIcon} ${styles.summaryIconBlue}`}>
                  <Users size={20} />
                </div>
                <div className={styles.summaryInfo}>
                  <h4>275</h4>
                  <p>Total Students</p>
                </div>
              </div>
            </div>
          </div>

          {/* Subjects by Grade Level */}
          <div className={styles.card} style={{ marginBottom: 0 }}>
            <h3 className={styles.cardTitle}>Subjects by Grade Level</h3>
            <div className={styles.chartContainer}>
              <div className={styles.chartPlaceholder}>
                <div className={styles.chartInner}>
                  6
                  <span>Subjects</span>
                </div>
              </div>
              <div className={styles.legend}>
                <div className={styles.legendItem}>
                  <div className={styles.legendLabel}>
                    <div className={`${styles.legendDot} ${styles.dotPurple}`}></div>
                    Grade 11
                  </div>
                  <div className={styles.legendValue}>4 (66.7%)</div>
                </div>
                <div className={styles.legendItem}>
                  <div className={styles.legendLabel}>
                    <div className={`${styles.legendDot} ${styles.dotGreen}`}></div>
                    Grade 12
                  </div>
                  <div className={styles.legendValue}>2 (33.3%)</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className={styles.card} style={{ marginBottom: 0, flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div className={styles.notesHeader}>
            <h3 className={styles.cardTitle} style={{ margin: 0 }}>Notes</h3>
            <button className={`${uiStyles.btnBase} ${uiStyles.btnSm} ${uiStyles.btnSecondary}`} style={{ borderColor: 'rgba(182, 142, 255, 0.5)', color: '#b68eff' }}>
              <Plus size={14} /> Add Note
            </button>
          </div>
          <div className={styles.emptyNotes} style={{ flex: 1 }}>
            <FileText size={40} />
            <p>No notes added yet.</p>
            <span>Click "Add Note" to add notes about this teacher's subjects.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
