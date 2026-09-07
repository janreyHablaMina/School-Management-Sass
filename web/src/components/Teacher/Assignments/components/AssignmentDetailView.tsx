'use client';

import React, { useState } from 'react';
import type { TeacherAssignmentRow } from '@/types/teacherAssignments';
import { ChalkBadge, listStyles } from '../../shared';
import { assignmentStatusAccent, assignmentTypeAccent } from '../utils';
import styles from './assignmentDetail.module.css';
import { ListTabs } from '../../shared';
import { SubmissionsTable } from './SubmissionsTable';

interface AssignmentDetailViewProps {
  assignment: TeacherAssignmentRow;
  onBack: () => void;
  initialTab?: string;
}

export function AssignmentDetailView({
  assignment,
  onBack,
  initialTab = 'Instructions & Attachments',
}: AssignmentDetailViewProps) {
  const [activeTab, setActiveTab] = useState(initialTab);

  return (
    <div className={listStyles.page} style={{ padding: '2rem' }}>
      <button type="button" className={listStyles.backBtn} onClick={onBack} style={{ marginBottom: '2rem' }}>
        <span aria-hidden>‹</span> Back to Assignments
      </button>
      
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <div className={styles.titleInfo}>
            <h1 className={styles.title}>{assignment.title}</h1>
            <div className={styles.badges}>
              <ChalkBadge label={assignment.type} accent={assignmentTypeAccent(assignment.type)} />
              <ChalkBadge label={assignment.classLabel} />
              <ChalkBadge label={assignment.status} accent={assignmentStatusAccent(assignment.status)} />
            </div>
          </div>
        </div>

        <div className={styles.meta}>
          <p>Due: <strong>{assignment.dueDate} at {assignment.dueTime}</strong></p>
          <p>Total Students: <strong>{assignment.totalStudents}</strong></p>
        </div>
      </div>

      <ListTabs
        tabs={['Instructions & Attachments', 'Submissions']}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      <div className={styles.content}>
        {activeTab === 'Instructions & Attachments' ? (
          <div className={styles.instructionsTab}>
            <h3>Description</h3>
            <p className={styles.descriptionText}>{assignment.description}</p>
            
            <h3 style={{ marginTop: '2rem' }}>Attachments</h3>
            <div className={styles.attachmentsList}>
              <div className={styles.attachmentCard}>
                <span className={styles.attachmentIcon}>📄</span>
                <div>
                  <p className={styles.attachmentName}>Rubric.pdf</p>
                  <p className={styles.attachmentSize}>2.4 MB</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.submissionsTab}>
             <SubmissionsTable assignment={assignment} />
          </div>
        )}
      </div>
    </div>
  );
}
