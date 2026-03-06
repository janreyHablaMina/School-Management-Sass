'use client';

import { Suspense } from 'react';
import JoinClassPage from './JoinClassClient';
import styles from './join.module.css';

export default function JoinClassRoutePage() {
  return (
    <Suspense
      fallback={
        <main className={styles.page}>
          <div className={styles.shell}>
            <p className={styles.brand}>Teachify</p>
            <section className={styles.board}>
              <p className={styles.eyebrow}>Classroom invite</p>
              <h1 className={styles.title}>Loading invite…</h1>
            </section>
          </div>
        </main>
      }
    >
      <JoinClassPage />
    </Suspense>
  );
}
