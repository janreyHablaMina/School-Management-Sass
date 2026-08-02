import React, { useState } from 'react';
import styles from './teacherClassesTab.module.css';
import uiStyles from '@/components/ui/ui.module.css';
import { Teacher, mockTeacherClasses, TeacherClass, mockTeacherActivities, TeacherActivity } from '@/lib/mock/teachers.mock';
import { Table, Column } from '@/components/ui/Table';
import { Pagination } from '@/components/ui/Pagination';
import { Search, Download, Check, MoreVertical, Megaphone, FileText, CheckSquare, Upload, Plus } from 'lucide-react';

interface TeacherClassesTabProps {
  teacher: Teacher;
}

export const TeacherClassesTab: React.FC<TeacherClassesTabProps> = ({ teacher }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const classesColumns: Column<TeacherClass>[] = [
    {
      header: 'Class / Section',
      render: (cls) => (
        <div className={styles.avatarCell}>
          <div className={`${styles.avatar} ${!cls.isAdviser ? styles.avatarGE : ''}`}>
            {cls.name.substring(0, 2)}
          </div>
          <div>
            <div className={styles.className}>{cls.name}</div>
            <div className={styles.classSection}>{cls.section}</div>
          </div>
        </div>
      )
    },
    { header: 'Grade Level', accessor: 'gradeLevel' },
    { header: 'Subject', accessor: 'subject' },
    { header: 'Students', accessor: 'students' },
    {
      header: 'Schedule',
      render: (cls) => (
        <>
          <div className={styles.scheduleDays}>{cls.schedule.days}</div>
          <div className={styles.scheduleTime}>{cls.schedule.time}</div>
        </>
      )
    },
    { header: 'Room', accessor: 'room' },
    {
      header: 'Adviser',
      render: (cls) => cls.isAdviser ? (
        <div className={styles.adviserCheck}><Check size={16} /></div>
      ) : (
        <div style={{ color: 'rgba(240, 239, 237, 0.4)', textAlign: 'center' }}>—</div>
      )
    },
    {
      header: 'Status',
      render: (cls) => (
        <span className={cls.status === 'Active' ? uiStyles.badgeGreen : uiStyles.badgeGray}>
          {cls.status}
        </span>
      )
    },
    {
      header: 'Actions',
      render: () => (
        <button className={styles.actionBtn}>
          <MoreVertical size={16} />
        </button>
      )
    }
  ];

  const activityColumns: Column<TeacherActivity>[] = [
    {
      header: 'Date & Time',
      render: (act) => (
        <>
          <div className={styles.scheduleDays}>{act.date}</div>
          <div className={styles.scheduleTime}>{act.time}</div>
        </>
      )
    },
    {
      header: 'Activity',
      render: (act) => {
        let Icon = Megaphone;
        let iconClass = styles.activityPurple;
        if (act.type === 'Grades') { Icon = CheckSquare; iconClass = styles.activityBlue; }
        if (act.type === 'Assignment') { Icon = FileText; iconClass = styles.activityYellow; }
        if (act.type === 'Document') { Icon = Upload; iconClass = styles.activityGreen; }

        return (
          <div className={styles.activityTitle}>
            <div className={`${styles.activityIcon} ${iconClass}`}>
              <Icon size={14} />
            </div>
            {act.title}
          </div>
        );
      }
    },
    {
      header: 'Details',
      render: (act) => <span className={styles.activityDesc}>{act.details}</span>
    },
    {
      header: 'Class / Section',
      render: (act) => <span className={styles.activityDesc}>{act.targetClass}</span>
    }
  ];

  return (
    <div className={uiStyles.tabLayoutContainer}>
      
      <div className={uiStyles.tabLeftCol}>
        {/* Row 1 / Left Col: Classes Handled */}
        <div className={`${styles.card} ${styles.cardHandled}`} style={{ marginBottom: 0 }}>
          <div className={styles.cardHeader}>
            <div>
              <h3 className={styles.cardTitle}>Classes Handled (SY 2025-2026)</h3>
              <p className={styles.cardSubtitle}>List of all classes and sections handled by the teacher this school year.</p>
            </div>
            <div className={styles.headerActions}>
              <div className={styles.searchWrapper}>
                <input type="text" placeholder="Search class or section..." className={styles.searchInput} />
                <Search className={styles.searchIcon} size={16} />
              </div>
              <button className={`${uiStyles.btnBase} ${uiStyles.btnSm} ${uiStyles.btnSecondary}`}>
                <Download size={14} /> Export
              </button>
            </div>
          </div>

          <Table 
            columns={classesColumns} 
            data={mockTeacherClasses.slice(0, itemsPerPage)} 
            keyExtractor={(cls) => cls.id} 
          />
          
          <Pagination 
            currentPage={currentPage}
            totalPages={Math.ceil(mockTeacherClasses.length / itemsPerPage)}
            totalItems={mockTeacherClasses.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            itemName="classes"
          />
        </div>

        {/* Row 3 / Left Col: Recent Class Activities */}
        <div className={`${styles.card} ${styles.cardActivities}`} style={{ marginBottom: 0 }}>
          <h3 className={styles.cardTitle}>Recent Class Activities</h3>
          
          <Table 
            columns={activityColumns}
            data={mockTeacherActivities}
            keyExtractor={(act) => act.id}
          />
          
          <a href="#" className={styles.viewAllLink}>View all class activities →</a>
        </div>
      </div>

      <div className={uiStyles.tabRightCol}>
        {/* Row 2 / Right Col: Summary and Advisory */}
        <div className={`${styles.summaryAdvisoryGroup} ${styles.cardSummaryAdvisory}`}>
          
          {/* Classes Summary */}
          <div className={styles.card} style={{ marginBottom: 0 }}>
            <h3 className={styles.cardTitle}>Classes Summary</h3>
            <div className={styles.summaryGrid}>
              <div className={styles.summaryCard}>
                <div className={`${styles.summaryIcon} ${styles.summaryIconPurple}`}>
                  <FileText size={20} />
                </div>
                <div className={styles.summaryInfo}>
                  <h4>4</h4>
                  <p>Classes Handled</p>
                  <span>This School Year</span>
                </div>
              </div>
              <div className={styles.summaryCard}>
                <div className={`${styles.summaryIcon} ${styles.summaryIconGreen}`}>
                  <FileText size={20} />
                </div>
                <div className={styles.summaryInfo}>
                  <h4>128</h4>
                  <p>Total Students</p>
                  <span>Across All Classes</span>
                </div>
              </div>
              <div className={styles.summaryCard}>
                <div className={`${styles.summaryIcon} ${styles.summaryIconYellow}`}>
                  <FileText size={20} />
                </div>
                <div className={styles.summaryInfo}>
                  <h4>2</h4>
                  <p>Subjects Taught</p>
                  <span>This School Year</span>
                </div>
              </div>
              <div className={styles.summaryCard}>
                <div className={`${styles.summaryIcon} ${styles.summaryIconBlue}`}>
                  <FileText size={20} />
                </div>
                <div className={styles.summaryInfo}>
                  <h4>16</h4>
                  <p>Total Periods / Week</p>
                  <span>All Classes</span>
                </div>
              </div>
            </div>
          </div>

          {/* Advisory Class */}
          <div className={styles.card} style={{ marginBottom: 0 }}>
            <h3 className={styles.cardTitle}>Advisory Class</h3>
            <div className={styles.advisoryCard}>
              <div className={styles.advisoryLeft}>
                <div className={styles.advisoryAvatar}>ST</div>
                <div className={styles.advisoryInfo}>
                  <div className={styles.advisoryTitle}>STEM 11 - A</div>
                  <div className={styles.advisorySection}>Section A</div>
                  <div className={styles.advisoryDate}>Adviser Since: June 15, 2021</div>
                </div>
              </div>
              <div className={styles.advisoryRight}>
                <div className={styles.advisoryCount}>32</div>
                <div className={styles.advisoryLabel}>Students</div>
              </div>
            </div>
          </div>
        </div>

        {/* Row 4 / Right Col: Notes */}
        <div className={`${styles.card} ${styles.cardNotes}`} style={{ marginBottom: 0 }}>
          <div className={styles.notesHeader}>
            <h3 className={styles.cardTitle} style={{ margin: 0 }}>Notes</h3>
            <button className={`${uiStyles.btnBase} ${uiStyles.btnSm} ${uiStyles.btnSecondary}`} style={{ borderColor: 'rgba(182, 142, 255, 0.5)', color: '#b68eff' }}>
              <Plus size={14} /> Add Note
            </button>
          </div>
          <div className={styles.emptyNotes}>
            <FileText size={40} />
            <p>No notes added yet.</p>
            <span>Click "Add Note" to add notes about this teacher's classes.</span>
          </div>
        </div>
      </div>

    </div>
  );
};
