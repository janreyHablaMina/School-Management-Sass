import React from 'react';
import styles from '../teacherProfile.module.css';
import { Teacher } from '@/lib/mock/teachers.mock';
import { ClassesHandledCard } from './components/ClassesHandledCard';
import { SubjectsHandledCard } from './components/SubjectsHandledCard';
import { TodayScheduleCard } from './components/TodayScheduleCard';
import { RecentActivitiesCard } from './components/RecentActivitiesCard';
import { 
  User, Calendar, Heart, Globe, MessageCircle, FileText, Award, 
} from 'lucide-react';

interface TeacherOverviewTabProps {
  teacher: Teacher;
}

export const TeacherOverviewTab: React.FC<TeacherOverviewTabProps> = ({ teacher }) => {
  return (
    <div>
      <div className={styles.overviewLayout}>
        <div className={styles.classesAndSubjectsRow}>
          <ClassesHandledCard />
          <SubjectsHandledCard />
        </div>

        <div className={styles.threeColumnRow}>
          <TodayScheduleCard />
          <RecentActivitiesCard />
          
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3>About Teacher</h3>
            </div>
            <p className={styles.bioText}>
              {teacher.aboutBio || 'No bio available.'}
            </p>
            
            <div className={styles.aboutList}>
              <div className={styles.aboutItem}>
                <div className={styles.aboutIcon}><User size={16} /></div>
                <div className={styles.aboutLabel}>Gender</div>
                <div className={styles.aboutValue}>{teacher.gender || 'N/A'}</div>
              </div>
              <div className={styles.aboutItem}>
                <div className={styles.aboutIcon}><Calendar size={16} /></div>
                <div className={styles.aboutLabel}>Date of Birth</div>
                <div className={styles.aboutValue}>{teacher.dateOfBirth || 'N/A'}</div>
              </div>
              <div className={styles.aboutItem}>
                <div className={styles.aboutIcon}><Heart size={16} /></div>
                <div className={styles.aboutLabel}>Civil Status</div>
                <div className={styles.aboutValue}>{teacher.civilStatus || 'N/A'}</div>
              </div>
              <div className={styles.aboutItem}>
                <div className={styles.aboutIcon}><Globe size={16} /></div>
                <div className={styles.aboutLabel}>Citizenship</div>
                <div className={styles.aboutValue}>{teacher.citizenship || 'N/A'}</div>
              </div>
              <div className={styles.aboutItem}>
                <div className={styles.aboutIcon}><MessageCircle size={16} /></div>
                <div className={styles.aboutLabel}>Languages</div>
                <div className={styles.aboutValue}>{teacher.languages || 'N/A'}</div>
              </div>
            </div>

            <div className={styles.aboutTags}>
              <span className={styles.aboutTag}><FileText size={12} /> LET Passer</span>
              <span className={styles.aboutTag}><Award size={12} /> Master's Degree</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
