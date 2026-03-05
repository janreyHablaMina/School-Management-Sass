'use client';

import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import {
  classInvitePath,
  classInviteUrl,
  classJoinCode,
  combineDateAndTime,
  DEFAULT_INVITE_HOURS,
  formatInviteExpiry,
  formatInviteRemaining,
  inviteExpiresAt,
  INVITE_QUICK_EXPIRY,
  loginInvitePath,
  rememberClassInvite,
  toDateInputValue,
  toTimeInputValue,
} from '@/lib/classroom';
import type { MyClassRow } from '@/types/myClasses';
import { listStyles, modalStyles, TeacherModal } from '../../shared';
import styles from './InviteStudentModal.module.css';

interface InviteStudentModalProps {
  cls: MyClassRow;
  onClose: () => void;
  onCopied: (kind: 'code' | 'link') => void;
}

function defaultExpiryParts() {
  const expiresAt = inviteExpiresAt(DEFAULT_INVITE_HOURS);
  return {
    date: toDateInputValue(expiresAt),
    time: toTimeInputValue(expiresAt),
  };
}

export function InviteStudentModal({
  cls,
  onClose,
  onCopied,
}: InviteStudentModalProps) {
  const code = classJoinCode(cls);
  const initial = defaultExpiryParts();
  const [expiryDate, setExpiryDate] = useState(initial.date);
  const [expiryTime, setExpiryTime] = useState(initial.time);
  const [copied, setCopied] = useState<'code' | 'link' | null>(null);

  const expiresAt = useMemo(
    () => combineDateAndTime(expiryDate, expiryTime),
    [expiryDate, expiryTime],
  );

  const expiryValid = expiresAt != null && expiresAt > Date.now();
  const link = expiresAt != null ? classInviteUrl(cls, expiresAt) : '';
  const previewHref =
    expiresAt != null
      ? classInvitePath(cls, expiresAt)
      : loginInvitePath(code);

  useEffect(() => {
    if (!expiryValid || expiresAt == null) return;
    rememberClassInvite({ code, classId: cls.id, expiresAt });
  }, [code, cls.id, expiresAt, expiryValid]);

  const applyExpiry = (ms: number) => {
    setExpiryDate(toDateInputValue(ms));
    setExpiryTime(toTimeInputValue(ms));
  };

  const copyValue = async (kind: 'code' | 'link', value: string) => {
    if (!expiryValid || expiresAt == null) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(kind);
      onCopied(kind);
      window.setTimeout(() => setCopied(null), 1800);
    } catch {
      setCopied(null);
    }
  };

  return (
    <TeacherModal
      titleId="invite-student-title"
      eyebrow="Invite students"
      title="Bring them in"
      copy={`${cls.subject} · ${cls.gradeSection}. Pick when the invite expires, then share the code or link.`}
      onClose={onClose}
      showClose
      cardClassName={modalStyles.modalCardWide}
      footer={
        <>
          <a
            className={listStyles.secondaryBtn}
            href={previewHref}
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: 'none' }}
          >
            Preview login
          </a>
          <button type="button" className={listStyles.primaryBtn} onClick={onClose}>
            Done
          </button>
        </>
      }
    >
      <div
        className={styles.inviteHero}
        style={
          {
            '--invite-accent': cls.accent,
          } as CSSProperties
        }
      >
        <span className={styles.inviteHeroIcon} aria-hidden>
          {cls.icon}
        </span>
        <div className={styles.inviteHeroCopy}>
          <p className={styles.inviteHeroEyebrow}>Classroom</p>
          <p className={styles.inviteHeroTitle}>{cls.subject}</p>
          <p className={styles.inviteHeroMeta}>
            {cls.gradeSection} · {cls.room}
          </p>
        </div>
      </div>

      <ol className={styles.inviteRail} aria-label="How invites work">
        <li>
          <span>Set expiry</span>
        </li>
        <li>
          <span>Share invite</span>
        </li>
        <li>
          <span>They join</span>
        </li>
      </ol>

      <section className={styles.invitePanel}>
        <p className={styles.inviteShareLabel}>Expires on</p>

        <div className={styles.inviteDateTimeRow}>
          <label className={styles.inviteDateTimeField}>
            <span>Date</span>
            <input
              type="date"
              value={expiryDate}
              min={toDateInputValue(Date.now())}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
          </label>
          <label className={styles.inviteDateTimeField}>
            <span>Time</span>
            <input
              type="time"
              value={expiryTime}
              onChange={(e) => setExpiryTime(e.target.value)}
            />
          </label>
        </div>

        <div className={styles.inviteQuickRow} role="group" aria-label="Quick expiry">
          {INVITE_QUICK_EXPIRY.map((item) => (
            <button
              key={item.id}
              type="button"
              className={styles.inviteQuickChip}
              onClick={() => applyExpiry(inviteExpiresAt(item.hoursFromNow))}
            >
              {item.label}
            </button>
          ))}
        </div>

        {expiryValid && expiresAt != null ? (
          <p className={styles.inviteExpiryLine}>
            Expires {formatInviteExpiry(expiresAt)}
            <span aria-hidden>·</span>
            {formatInviteRemaining(expiresAt)} left
          </p>
        ) : (
          <p className={styles.inviteExpiryError}>
            Choose a future date and time for this invite.
          </p>
        )}
      </section>

      <section className={styles.inviteCodePanel}>
        <p className={styles.inviteShareLabel}>Join code</p>
        <div className={styles.inviteCodeStage}>
          <code className={styles.inviteCode}>{code}</code>
          <button
            type="button"
            className={listStyles.primaryBtn}
            disabled={!expiryValid}
            onClick={() => void copyValue('code', code)}
          >
            {copied === 'code' ? 'Copied' : 'Copy code'}
          </button>
        </div>
        <p className={styles.inviteCodeHint}>
          Same expiry as the link when shared from this invite.
        </p>
      </section>

      <section className={styles.inviteLinkPanel}>
        <p className={styles.inviteShareLabel}>Invite link</p>
        <div className={styles.inviteShareRow}>
          <p className={styles.inviteLink}>
            {expiryValid ? link : 'Set a valid expiry to generate the link.'}
          </p>
          <button
            type="button"
            className={listStyles.secondaryBtn}
            disabled={!expiryValid}
            onClick={() => void copyValue('link', link)}
          >
            {copied === 'link' ? 'Copied' : 'Copy link'}
          </button>
        </div>
      </section>
    </TeacherModal>
  );
}
