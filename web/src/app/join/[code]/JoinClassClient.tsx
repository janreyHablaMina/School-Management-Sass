'use client';

import Link from 'next/link';
import {
  useMemo,
  useState,
  type CSSProperties,
  type FormEvent,
  type ReactNode,
} from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { myClassesPageMock } from '@/lib/mock/myClasses.mock';
import {
  findClassByJoinCode,
  formatInviteExpiry,
  isInviteExpired,
  parseInviteExpiry,
  storedInviteExpiry,
} from '@/components/Teacher/MyClasses/utils';
import styles from './join.module.css';

type Step = 'welcome' | 'create' | 'joined';

function JoinShell({
  children,
  brand = 'Teachify',
}: {
  children: ReactNode;
  brand?: string;
}) {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <p className={styles.brand}>{brand}</p>
        <section className={styles.board}>{children}</section>
      </div>
    </main>
  );
}

export default function JoinClassClient() {
  const params = useParams<{ code: string }>();
  const searchParams = useSearchParams();
  const code = typeof params?.code === 'string' ? params.code : '';

  const cls = useMemo(
    () => findClassByJoinCode(code, myClassesPageMock.classes),
    [code],
  );

  const expiresAt = useMemo(() => {
    const fromUrl = parseInviteExpiry(searchParams.get('exp'));
    if (fromUrl != null) return fromUrl;
    return storedInviteExpiry(code);
  }, [code, searchParams]);

  const expired = isInviteExpired(expiresAt);

  const [step, setStep] = useState<Step>('welcome');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!cls) {
    return (
      <JoinShell>
        <p className={styles.eyebrow}>Invite</p>
        <h1 className={styles.title}>Invite not found</h1>
        <p className={styles.copy}>
          That join code is invalid. Ask your teacher for a new invite link or
          code.
        </p>
        <div className={styles.actions}>
          <Link className={styles.secondaryLink} href="/login">
            Back to sign in
          </Link>
        </div>
      </JoinShell>
    );
  }

  if (expired) {
    return (
      <JoinShell>
        <p className={styles.eyebrow}>Classroom invite</p>
        <h1 className={styles.title}>This invite expired</h1>
        <p className={styles.copy}>
          The invite for <strong>{cls.subject}</strong> ({cls.gradeSection}) is no
          longer valid
          {expiresAt ? <> as of {formatInviteExpiry(expiresAt)}</> : null}. Ask your
          teacher to send a fresh one.
        </p>
        <div className={styles.actions}>
          <Link className={styles.secondaryLink} href="/login">
            Back to sign in
          </Link>
        </div>
      </JoinShell>
    );
  }

  const handleCreate = (event: FormEvent) => {
    event.preventDefault();
    if (isInviteExpired(expiresAt)) {
      setError('This invite just expired. Ask your teacher for a new one.');
      return;
    }
    if (!fullName.trim()) {
      setError('Enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Enter a valid email address.');
      return;
    }
    if (password.trim().length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setError(null);
    setStep('joined');
  };

  const accentStyle = {
    background: `${cls.accent}22`,
    color: cls.accent,
    borderColor: `${cls.accent}77`,
  } as CSSProperties;

  if (step === 'create') {
    return (
      <JoinShell>
        <p className={styles.eyebrow}>Create account</p>
        <h1 className={styles.title}>Almost there</h1>
        <p className={styles.copy}>
          You&apos;ll join <strong>{cls.subject}</strong> · {cls.gradeSection} after
          signup.
        </p>

        <form className={styles.form} onSubmit={handleCreate}>
          <label className={styles.field}>
            <span>Full name</span>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Student full name"
              autoComplete="name"
              maxLength={80}
            />
          </label>

          <label className={styles.field}>
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              autoComplete="email"
              maxLength={80}
            />
          </label>

          <label className={styles.field}>
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              autoComplete="new-password"
              maxLength={80}
            />
          </label>

          {error ? <p className={styles.error}>{error}</p> : null}

          <div className={styles.actions}>
            <button type="submit" className={styles.primaryBtn}>
              Join classroom
            </button>
            <button
              type="button"
              className={styles.textBtn}
              onClick={() => {
                setError(null);
                setStep('welcome');
              }}
            >
              Back
            </button>
          </div>
        </form>
      </JoinShell>
    );
  }

  if (step === 'joined') {
    return (
      <JoinShell>
        <p className={styles.eyebrow}>Welcome</p>
        <div className={styles.successMark} aria-hidden>
          ✓
        </div>
        <h1 className={styles.title}>You&apos;re in</h1>
        <p className={styles.copy}>
          Nice work, {fullName.trim() || 'student'}. You joined{' '}
          <strong>
            {cls.subject} · {cls.gradeSection}
          </strong>
          .
        </p>
        <div className={styles.actions}>
          <Link className={styles.primaryBtn} href="/login">
            Continue to sign in
          </Link>
        </div>
      </JoinShell>
    );
  }

  return (
    <JoinShell>
      <p className={styles.eyebrow}>Classroom invite</p>
      <div className={styles.classMark} style={accentStyle} aria-hidden>
        {cls.icon}
      </div>
      <h1 className={styles.title}>Join {cls.subject}</h1>
      <p className={styles.copy}>
        Create a student account to enter this classroom.
      </p>
      <div className={styles.metaRow}>
        <span className={styles.metaChip}>{cls.gradeSection}</span>
        <span className={styles.metaChip}>{cls.academicYear}</span>
        <span className={styles.metaChip}>{cls.room}</span>
      </div>
      {expiresAt ? (
        <p className={styles.expiryNote}>
          <span className={styles.expiryDot} aria-hidden />
          Expires {formatInviteExpiry(expiresAt)}
        </p>
      ) : null}
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.primaryBtn}
          onClick={() => setStep('create')}
        >
          Create account & join
        </button>
      </div>
      <p className={styles.hint}>
        Already have an account? <Link href="/login">Sign in</Link> with code{' '}
        <strong>{code.toUpperCase()}</strong>.
      </p>
    </JoinShell>
  );
}
