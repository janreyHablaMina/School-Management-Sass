'use client';

import type { TeacherNavRequest } from '@/lib/teacher/classFocus';
import type { StudentGuardian, TeacherStudentRow } from '@/types/teacherStudents';
import {
  buildStudentActivity,
  primaryGuardian,
  toStudentClassFocus,
  type GuardianContactChannel,
} from '../utils';
import styles from '../students.module.css';

type DossierTab = 'overview' | 'family' | 'record';

interface StudentDossierBodyProps {
  student: TeacherStudentRow;
  activeTab: DossierTab;
  onTabChange: (tab: DossierTab) => void;
  onNavigate?: (request: TeacherNavRequest | string) => void;
  onContact?: () => void;
  onGuardianChannel?: (
    guardian: StudentGuardian,
    channel: GuardianContactChannel,
  ) => void;
}

const TABS: Array<{ id: DossierTab; label: string }> = [
  { id: 'overview', label: 'Overview' },
  { id: 'family', label: 'Family' },
  { id: 'record', label: 'Record' },
];

const TONE = { ok: '#5cc789', warn: '#f5a623', info: '#84a9ff' } as const;

const JUMPS = [
  { tab: 'Grades', icon: '📊', label: 'Grades' },
  { tab: 'Attendance', icon: '📍', label: 'Attendance' },
  { tab: 'Assignments', icon: '📋', label: 'Assignments' },
  { tab: 'Lessons', icon: '📖', label: 'Lessons' },
] as const;

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.dossierFact}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export function StudentDossierBody({
  student,
  activeTab,
  onTabChange,
  onNavigate,
  onContact,
  onGuardianChannel,
}: StudentDossierBodyProps) {
  const { details } = student;
  const classFocus = toStudentClassFocus(student);
  const guardian = primaryGuardian(student);
  const activity = buildStudentActivity(student);

  return (
    <section className={styles.dossierBody}>
      <div className={styles.dossierTabs} role="tablist" aria-label="Student sections">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            className={
              activeTab === tab.id
                ? `${styles.dossierTab} ${styles.dossierTabActive}`
                : styles.dossierTab
            }
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' ? (
        <div className={styles.dossierPanel} role="tabpanel">
          <div className={styles.dossierOverviewGrid}>
            <div className={styles.dossierBlock}>
              <p className={styles.dossierBlockEyebrow}>Signals</p>
              <h2 className={styles.dossierBlockTitle}>What&apos;s happening</h2>
              <ul className={styles.dossierSignalList}>
                {activity.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      className={styles.dossierSignal}
                      onClick={() => {
                        if (item.tab) onNavigate?.({ tab: item.tab, classFocus });
                        else if (item.id === 'guardian') onContact?.();
                      }}
                    >
                      <span
                        className={styles.dossierSignalDot}
                        style={{ background: TONE[item.tone] }}
                        aria-hidden
                      />
                      <span className={styles.dossierSignalBody}>
                        <span className={styles.dossierSignalTitle}>{item.title}</span>
                        <span className={styles.dossierSignalMeta}>{item.meta}</span>
                      </span>
                      <span className={styles.dossierSignalWhen}>{item.when}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.dossierBlock}>
              <p className={styles.dossierBlockEyebrow}>Shortcuts</p>
              <h2 className={styles.dossierBlockTitle}>Open related work</h2>
              <div className={styles.dossierJumpGrid}>
                {JUMPS.map((jump) => (
                  <button
                    key={jump.tab}
                    type="button"
                    className={styles.dossierJump}
                    onClick={() => onNavigate?.({ tab: jump.tab, classFocus })}
                  >
                    <span aria-hidden>{jump.icon}</span>
                    {jump.label}
                  </button>
                ))}
              </div>

              {guardian ? (
                <div className={styles.dossierPrimaryContact}>
                  <p className={styles.dossierBlockEyebrow}>Primary guardian</p>
                  <p className={styles.dossierPrimaryName}>{guardian.name}</p>
                  <p className={styles.dossierPrimaryMeta}>
                    {guardian.relationship}
                    {guardian.appLinked ? ' · App linked' : ' · No app yet'}
                  </p>
                  <button
                    type="button"
                    className={styles.dossierPrimaryBtn}
                    onClick={onContact}
                  >
                    Contact {guardian.relationship.toLowerCase()}
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}

      {activeTab === 'family' ? (
        <div className={styles.dossierPanel} role="tabpanel">
          <div className={styles.dossierFamilyGrid}>
            {details.guardians.map((item) => (
              <article
                key={`${item.name}-${item.relationship}`}
                className={styles.dossierGuardian}
              >
                <div className={styles.dossierGuardianHead}>
                  <div
                    className={styles.dossierGuardianAvatar}
                    style={{
                      background: `${student.avatarAccent}18`,
                      color: student.avatarAccent,
                      borderColor: `${student.avatarAccent}55`,
                    }}
                  >
                    {item.name
                      .split(/\s+/)
                      .slice(0, 2)
                      .map((part) => part[0])
                      .join('')}
                  </div>
                  <div>
                    <p className={styles.dossierGuardianName}>{item.name}</p>
                    <p className={styles.dossierGuardianRole}>
                      {item.relationship}
                      {item.occupation ? ` · ${item.occupation}` : ''}
                    </p>
                  </div>
                </div>

                <div className={styles.dossierFactList}>
                  <Fact label="Phone" value={item.phone} />
                  <Fact label="Email" value={item.email} />
                </div>

                <div className={styles.dossierChannelRow}>
                  {(
                    [
                      ['app', '💬', 'App'],
                      ['email', '✉️', 'Email'],
                      ['sms', '📱', 'SMS'],
                      ['call', '📞', 'Call'],
                    ] as const
                  ).map(([channel, icon, label]) => (
                    <button
                      key={channel}
                      type="button"
                      className={
                        channel === 'app'
                          ? `${styles.dossierChannel} ${styles.dossierChannelApp}`
                          : styles.dossierChannel
                      }
                      onClick={() => onGuardianChannel?.(item, channel)}
                    >
                      <span className={styles.dossierChannelIcon} aria-hidden>
                        {icon}
                      </span>
                      <span>{label}</span>
                    </button>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className={styles.dossierSideGrid}>
            <div className={styles.dossierBlock}>
              <p className={styles.dossierBlockEyebrow}>Safety</p>
              <h2 className={styles.dossierBlockTitle}>Emergency</h2>
              <div className={styles.dossierFactList}>
                <Fact label="Name" value={details.emergencyContact.name} />
                <Fact label="Relation" value={details.emergencyContact.relationship} />
                <Fact label="Phone" value={details.emergencyContact.phone} />
              </div>
            </div>

            <div className={styles.dossierBlock}>
              <p className={styles.dossierBlockEyebrow}>Pickup</p>
              <h2 className={styles.dossierBlockTitle}>Authorized</h2>
              <ul className={styles.dossierPickupList}>
                {details.authorizedPickup.map((person) => (
                  <li key={`${person.name}-${person.phone}`}>
                    <strong>{person.name}</strong>
                    <span>
                      {person.relationship} · {person.phone}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : null}

      {activeTab === 'record' ? (
        <div className={styles.dossierPanel} role="tabpanel">
          <div className={styles.dossierRecordGrid}>
            <div className={styles.dossierBlock}>
              <p className={styles.dossierBlockEyebrow}>Personal</p>
              <h2 className={styles.dossierBlockTitle}>About</h2>
              <div className={styles.dossierFactList}>
                <Fact label="Gender" value={details.gender} />
                <Fact
                  label="Birth date"
                  value={`${details.birthDate} (${details.age} yrs)`}
                />
                <Fact label="LRN" value={details.lrn} />
                <Fact label="Student ID" value={student.idNumber} />
                <Fact label="Phone" value={student.phone} />
                <Fact label="Email" value={student.email} />
              </div>
              <div className={styles.dossierAddress}>
                <span>Home address</span>
                <p>{details.address}</p>
              </div>
            </div>

            <div className={styles.dossierBlock}>
              <p className={styles.dossierBlockEyebrow}>Health</p>
              <h2 className={styles.dossierBlockTitle}>Medical</h2>
              <div className={styles.dossierFactList}>
                <Fact label="Allergies" value={details.allergies} />
                <Fact label="Notes" value={details.medicalNotes} />
              </div>
            </div>

            <div className={`${styles.dossierBlock} ${styles.dossierRecordWide}`}>
              <div className={styles.dossierBlockHead}>
                <div>
                  <p className={styles.dossierBlockEyebrow}>Classroom</p>
                  <h2 className={styles.dossierBlockTitle}>This class</h2>
                </div>
                <button
                  type="button"
                  className={styles.dossierLink}
                  onClick={() => onNavigate?.({ tab: 'Grades', classFocus })}
                >
                  Grades ›
                </button>
              </div>
              <div className={styles.dossierFactList}>
                <Fact label="Class" value={student.classLabel} />
                <Fact label="Subject" value={student.subject} />
                <Fact label="Enrolled" value={details.enrollmentDate} />
                <Fact label="Standing" value={student.status} />
              </div>
              <p className={styles.dossierNote}>
                <span>Teacher notes</span>
                {details.teacherNotes}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

export type { DossierTab };
