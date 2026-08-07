'use client';

import React, { useState, useId } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

/* ────────────────────────────────────────────────────────────
   Inline SVG Icons
   ──────────────────────────────────────────────────────────── */
const IconEmail = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const IconLock = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const IconEye = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const IconEyeOff = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

const IconAlert = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

/* ────────────────────────────────────────────────────────────
   Google SVG Logo
   ──────────────────────────────────────────────────────────── */
const GoogleLogo = () => (
  <svg className={styles.googleIcon} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

interface ChalkSVGProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  color?: string;
}

const DoodleChalkStar = ({ className, width = 24, height = 24, color = "rgba(240,239,237,0.6)" }: ChalkSVGProps) => (
  <svg className={className} width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 2 L17.5 19.5 L3 8.5 L21 8.5 L6.5 19.5 Z" />
  </svg>
);

const DoodlePaperPlane = ({ className, width = 24, height = 24, color = "rgba(245,200,66,0.6)" }: ChalkSVGProps) => (
  <svg className={className} width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2 12 L22 2 L13 22 L11 13 Z" />
    <path d="M11 13 L22 2" />
    <path d="M11 13 L8 17 L8 14" />
  </svg>
);

const WelcomeBackSwoosh = () => (
  <svg className={styles.welcomeUnderline} viewBox="0 0 160 8" fill="none" aria-hidden="true" preserveAspectRatio="none">
    <path d="M2 5 Q40 2 80 5 Q120 8 158 3" stroke="#f5c842" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.8"/>
  </svg>
);

const ActiveLinkSwoosh = () => (
  <svg className={styles.navActiveSwoosh} viewBox="0 0 60 6" fill="none" aria-hidden="true" preserveAspectRatio="none">
    <path d="M2 3 Q25 1 58 4" stroke="#f5c842" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.8"/>
  </svg>
);

const DoodleChalkSchoolTools = () => (
  <svg width="120" height="120" viewBox="0 0 120 120" fill="none" stroke="rgba(240, 239, 237, 0.45)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {/* Triangle Ruler (Set Square) */}
    <path d="M20 20 L20 95 L95 95 Z" stroke="rgba(245, 200, 66, 0.55)" />
    <path d="M30 40 L30 85 L75 85 Z" stroke="rgba(245, 200, 66, 0.4)" strokeWidth="1" />
    {/* Tick marks on triangle ruler */}
    <path d="M20 30h4 M20 40h4 M20 50h4 M20 60h4 M20 70h4 M20 85h4 M30 95v-4 M40 95v-4 M50 95v-4 M60 95v-4 M70 95v-4 M85 95v-4" stroke="rgba(245, 200, 66, 0.5)" strokeWidth="1" />

    {/* Straight Ruler crossing behind at an angle */}
    <g transform="translate(10, 50) rotate(-25)">
      <rect x="0" y="0" width="95" height="20" rx="2" stroke="rgba(240, 239, 237, 0.5)" />
      {/* Tick marks on straight ruler */}
      <path d="M5 0v5 M15 0v3 M25 0v5 M35 0v3 M45 0v5 M55 0v3 M65 0v5 M75 0v3 M85 0v5" stroke="rgba(240, 239, 237, 0.4)" strokeWidth="1" />
    </g>

    {/* Small details */}
    <path d="M85 30 l2 2 -2 2 -2-2 z" fill="rgba(245, 200, 66, 0.4)" stroke="none" />
    <path d="M85 55h6M88 52v6" stroke="rgba(240, 239, 237, 0.3)" strokeWidth="1.2" />
    <path d="M15 110 Q45 100 75 110" stroke="rgba(240, 239, 237, 0.2)" strokeDasharray="3 3" />
  </svg>
);

/* ────────────────────────────────────────────────────────────
   Chalk Doodle Illustrations — matching reference positions
   ──────────────────────────────────────────────────────────── */

/* Lightbulb — positioned upper area near headline */
const DoodleLightbulb = () => (
  <svg width="60" height="80" viewBox="0 0 60 80" fill="none" aria-hidden="true">
    <circle cx="30" cy="28" r="18" stroke="rgba(245,200,66,0.75)" strokeWidth="1.8" fill="none"/>
    <path d="M22 42 Q25 52 30 54 Q35 52 38 42" stroke="rgba(245,200,66,0.7)" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
    <line x1="25" y1="54" x2="35" y2="54" stroke="rgba(245,200,66,0.6)" strokeWidth="1.3"/>
    <line x1="25" y1="57" x2="35" y2="57" stroke="rgba(245,200,66,0.5)" strokeWidth="1.3"/>
    {/* Rays */}
    <line x1="30" y1="8" x2="30" y2="3" stroke="rgba(245,200,66,0.5)" strokeWidth="1.3" strokeLinecap="round"/>
    <line x1="13" y1="15" x2="9" y2="11" stroke="rgba(245,200,66,0.4)" strokeWidth="1.3" strokeLinecap="round"/>
    <line x1="47" y1="15" x2="51" y2="11" stroke="rgba(245,200,66,0.4)" strokeWidth="1.3" strokeLinecap="round"/>
    <line x1="7" y1="28" x2="2" y2="28" stroke="rgba(245,200,66,0.35)" strokeWidth="1.3" strokeLinecap="round"/>
    <line x1="53" y1="28" x2="58" y2="28" stroke="rgba(245,200,66,0.35)" strokeWidth="1.3" strokeLinecap="round"/>
    {/* Inner filament */}
    <path d="M30 20 Q33 25 30 30 Q27 25 30 20" stroke="rgba(245,200,66,0.45)" strokeWidth="1" fill="none"/>
  </svg>
);

/* Graduation cap with dashed trail */
const DoodleGraduationCap = () => (
  <svg width="90" height="70" viewBox="0 0 90 70" fill="none" aria-hidden="true">
    <polygon points="40,8 75,22 40,38 5,22" stroke="rgba(240,239,237,0.75)" strokeWidth="1.8" fill="rgba(255,255,255,0.04)" strokeLinejoin="round"/>
    <path d="M56 30 L56 46 Q40 55 24 46 L24 30" stroke="rgba(240,239,237,0.6)" strokeWidth="1.5" fill="rgba(255,255,255,0.03)" strokeLinejoin="round"/>
    <line x1="75" y1="22" x2="75" y2="42" stroke="rgba(240,239,237,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M73 40 Q75 45 77 40" stroke="rgba(245,200,66,0.7)" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    {/* Dashed trail curving away */}
    <path d="M5 20 Q-5 10 8 3" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" strokeDasharray="3 4" strokeLinecap="round" fill="none"/>
    <path d="M6 2 L9 5 L4 7" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeLinecap="round" fill="none"/>
  </svg>
);

/* Open book + stacked books with labels */
const DoodleBooks = () => (
  <svg width="190" height="140" viewBox="0 0 190 140" fill="none" aria-hidden="true">
    {/* Open book */}
    <path d="M15 70 Q65 50 115 70" stroke="rgba(240,239,237,0.7)" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
    <path d="M15 70 L15 98 Q65 80 115 98 L115 70" stroke="rgba(240,239,237,0.7)" strokeWidth="1.8" strokeLinecap="round" fill="rgba(255,255,255,0.04)"/>
    {/* Center spine */}
    <path d="M65 69 L65 99" stroke="rgba(245,200,66,0.5)" strokeWidth="1.8" strokeLinecap="round"/>
    {/* Page lines - left */}
    <path d="M30 80 Q48 76 65 78" stroke="rgba(240,239,237,0.25)" strokeWidth="0.8" strokeLinecap="round"/>
    <path d="M30 85 Q48 81 65 83" stroke="rgba(240,239,237,0.25)" strokeWidth="0.8" strokeLinecap="round"/>
    <path d="M30 90 Q48 86 65 88" stroke="rgba(240,239,237,0.25)" strokeWidth="0.8" strokeLinecap="round"/>
    {/* Page lines - right */}
    <path d="M70 76 Q88 80 100 77" stroke="rgba(240,239,237,0.25)" strokeWidth="0.8" strokeLinecap="round"/>
    <path d="M70 81 Q88 85 100 82" stroke="rgba(240,239,237,0.25)" strokeWidth="0.8" strokeLinecap="round"/>
    <path d="M70 86 Q88 90 100 87" stroke="rgba(240,239,237,0.25)" strokeWidth="0.8" strokeLinecap="round"/>

    {/* Stacked books below */}
    <rect x="25" y="100" width="100" height="12" rx="2" stroke="rgba(240,239,237,0.6)" strokeWidth="1.5" fill="rgba(255,255,255,0.04)"/>
    <rect x="20" y="110" width="110" height="12" rx="2" stroke="rgba(245,200,66,0.65)" strokeWidth="1.5" fill="rgba(255,255,255,0.04)"/>
    <text x="36" y="120" fontFamily="'Inter', sans-serif" fontSize="6" fill="rgba(245,200,66,0.75)" letterSpacing="1.5">MATH</text>
    <rect x="16" y="120" width="118" height="12" rx="2" stroke="rgba(240,239,237,0.55)" strokeWidth="1.5" fill="rgba(255,255,255,0.04)"/>
    <text x="30" y="130" fontFamily="'Inter', sans-serif" fontSize="6" fill="rgba(240,239,237,0.6)" letterSpacing="1.5">HISTORY</text>

    {/* Dashed arrow to the right */}
    <path d="M120 92 Q140 84 152 95" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" strokeDasharray="3 4" strokeLinecap="round" fill="none"/>
    <path d="M149 92 L154 97 L150 102" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
  </svg>
);

/* Pencil cup */
const DoodlePencils = () => (
  <svg width="75" height="130" viewBox="0 0 75 130" fill="none" aria-hidden="true">
    {/* Cup body */}
    <path d="M12 60 L16 120 Q38 126 60 120 L64 60 Z" stroke="rgba(240,239,237,0.6)" strokeWidth="1.5" fill="rgba(255,255,255,0.04)" strokeLinejoin="round"/>
    {/* Cup rim */}
    <ellipse cx="38" cy="60" rx="26" ry="4" stroke="rgba(240,239,237,0.5)" strokeWidth="1.2" fill="none"/>

    {/* Pencils sticking out */}
    <line x1="22" y1="58" x2="20" y2="10" stroke="rgba(245,200,66,0.85)" strokeWidth="3" strokeLinecap="round"/>
    <polygon points="19,8 20,10 21,8" fill="rgba(245,200,66,0.5)"/>

    <line x1="32" y1="58" x2="34" y2="5" stroke="rgba(240,239,237,0.8)" strokeWidth="3" strokeLinecap="round"/>
    <polygon points="33,3 34,5 35,3" fill="rgba(240,239,237,0.5)"/>

    <line x1="42" y1="58" x2="44" y2="12" stroke="rgba(245,200,66,0.7)" strokeWidth="3" strokeLinecap="round"/>
    <polygon points="43,10 44,12 45,10" fill="rgba(245,200,66,0.45)"/>

    <line x1="52" y1="58" x2="52" y2="8" stroke="rgba(240,239,237,0.65)" strokeWidth="3" strokeLinecap="round"/>
    <polygon points="51,6 52,8 53,6" fill="rgba(240,239,237,0.4)"/>
  </svg>
);

const DoodleChalkTrails = () => (
  <svg className={styles.chalkTrails} viewBox="0 0 220 280" fill="none" stroke="rgba(240, 239, 237, 0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {/* Dashed trail from top right (near cap) curving down-left */}
    <path d="M180 20 Q110 50 130 110" strokeDasharray="3 5" />
    <path d="M123 102 L130 110 L135 100" /> {/* Arrowhead */}

    {/* Small star doodle near the first trail */}
    <path d="M145 65 L149 75 L157 75 L151 80 L153 88 L145 83 L137 88 L139 80 L133 75 L141 75 Z" stroke="rgba(240, 239, 237, 0.22)" strokeWidth="1.2" />

    {/* Second dashed trail curving towards the pencil cup */}
    <path d="M110 150 Q60 210 120 250" strokeDasharray="3 5" />
    <path d="M110 246 L120 250 L116 240" /> {/* Arrowhead */}
    
    {/* Small star doodle near the second trail */}
    <path d="M70 185 L73 192 L80 192 L75 196 L77 202 L70 198 L63 202 L65 196 L60 192 L67 192 Z" stroke="rgba(245, 200, 66, 0.4)" strokeWidth="1.2" />
  </svg>
);

/* ────────────────────────────────────────────────────────────
   Yellow underline swoosh SVG (under EMPOWER.)
   ──────────────────────────────────────────────────────────── */
const UnderlineSwoosh = () => (
  <svg className={styles.highlightUnderline} viewBox="0 0 300 12" fill="none" aria-hidden="true" preserveAspectRatio="none">
    <path d="M2 8 Q40 2 80 7 Q120 12 160 6 Q200 0 240 7 Q270 11 298 5" stroke="#f5c842" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.7"/>
    <path d="M5 10 Q50 5 100 9 Q150 13 200 8 Q250 3 295 9" stroke="#f5c842" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.4"/>
  </svg>
);

/* ────────────────────────────────────────────────────────────
   Chalk-drawn feature bar icons (matching reference)
   ──────────────────────────────────────────────────────────── */
const FeatureIconCourses = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="rgba(240,239,237,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="5" width="22" height="16" rx="2"/>
    <line x1="8" y1="24" x2="20" y2="24"/>
    <line x1="14" y1="21" x2="14" y2="24"/>
    <rect x="7" y="8" width="14" height="10" rx="1" fill="rgba(255,255,255,0.05)"/>
    <path d="M10 13 L13 11 L13 16" stroke="rgba(245,200,66,0.6)" strokeWidth="1.2"/>
  </svg>
);

const FeatureIconLive = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="rgba(240,239,237,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="14" cy="10" r="4"/>
    <path d="M6 24 Q6 17 14 17 Q22 17 22 24"/>
    <circle cx="22" cy="8" r="2.5" stroke="rgba(245,200,66,0.5)"/>
    <path d="M17 22 Q17 18 22 18" stroke="rgba(245,200,66,0.5)" strokeWidth="1.2"/>
  </svg>
);

const FeatureIconProgress = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="rgba(240,239,237,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="4,22 10,14 16,18 24,6" stroke="rgba(245,200,66,0.7)" strokeWidth="1.8"/>
    <polyline points="20,6 24,6 24,10" stroke="rgba(245,200,66,0.7)" strokeWidth="1.5"/>
    <line x1="4" y1="24" x2="24" y2="24"/>
    <line x1="4" y1="24" x2="4" y2="4"/>
  </svg>
);

const FeatureIconCerts = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="rgba(240,239,237,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="14" cy="12" r="7"/>
    <circle cx="14" cy="12" r="4" stroke="rgba(245,200,66,0.6)"/>
    <path d="M10 18 L8 26 L14 23 L20 26 L18 18" fill="rgba(245,200,66,0.08)" stroke="rgba(245,200,66,0.6)" strokeWidth="1.3"/>
    <path d="M14 9 L14.8 11 L17 11 L15.3 12.3 L16 14.5 L14 13.2 L12 14.5 L12.7 12.3 L11 11 L13.2 11 Z" fill="rgba(245,200,66,0.5)" stroke="none"/>
  </svg>
);

/* ────────────────────────────────────────────────────────────
   Floating Decorations Data
   ──────────────────────────────────────────────────────────── */
const starPositions = [
  { top: '15%',  left: '8%',  delay: '0s',   size: '0.9rem' },
  { top: '30%',  left: '44%', delay: '1.5s', size: '0.8rem' },
  { top: '62%',  left: '22%', delay: '0.8s', size: '1rem'   },
  { top: '75%',  left: '42%', delay: '2.2s', size: '0.7rem' },
  { top: '10%',  left: '32%', delay: '1s',   size: '0.85rem' },
  { top: '82%',  right: '12%', delay: '1.8s', size: '0.9rem' },
  { top: '20%',  right: '8%',  delay: '0.5s', size: '0.75rem' },
  { top: '50%',  right: '3%',  delay: '2.5s', size: '1.1rem' },
];

/* ────────────────────────────────────────────────────────────
   Main Login Page Component
   ──────────────────────────────────────────────────────────── */
export default function LoginPage() {
  const [email, setEmail]               = useState('');
  const [password, setPassword]         = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading]       = useState(false);
  const [error, setError]               = useState('');
  const router                          = useRouter();

  const emailId    = useId();
  const passwordId = useId();
  const errorId    = useId();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);

    if (email === 'admin@gmail.com' && password === 'admin@gmail.com') {
      router.push('/admin');
    } else if (email === 'school@gmail.com' && password === 'school@gmail.com') {
      router.push('/school-admin');
    } else if (email === 'teacher@gmail.com' && password === 'teacher @gmail.com') {
      router.push('/teacher');
    } else {
      setError('Invalid credentials. (Hint: admin@gmail.com, school@gmail.com, or teacher@gmail.com)');
    }
  };

  const handleGoogleLogin = () => {
    alert('Google OAuth integration coming soon.');
  };

  return (
    <main className={styles.page}>

      {/* ── Floating Header Bar ── */}
      <header className={styles.headerBar}>
        {/* Left: Logo */}
        <Link href="/" className={styles.headerLogo} aria-label="SchoolSaaS home">
          <div className={styles.headerLogoIcon} aria-hidden="true">🎓</div>
          <span className={styles.headerLogoText}>School<span>SaaS</span></span>
        </Link>

        {/* Center: Navigation Links */}
        <nav className={styles.headerNav} aria-label="Main navigation">
          {[
            { label: 'Courses', active: true },
            { label: 'Teachers' },
            { label: 'Students' },
            { label: 'Resources' },
            { label: 'Pricing' }
          ].map((item) => (
            <div key={item.label} className={styles.navItemWrapper}>
              <Link 
                href={`/${item.label.toLowerCase()}`} 
                className={`${styles.navLink} ${item.active ? styles.navActive : ''}`}
              >
                {item.label}
              </Link>
              {item.active && <ActiveLinkSwoosh />}
            </div>
          ))}
        </nav>

        {/* Right: Search + Buttons */}
        <div className={styles.headerActions}>
          <button className={styles.searchBtn} aria-label="Search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </button>

          <Link href="/login" className={styles.headerLoginBtn}>
            Login
          </Link>

          <Link href="/register" className={styles.headerStartBtn}>
            Get Started
          </Link>

          {/* Little yellow rays above the buttons */}
          <div className={styles.headerRays} aria-hidden="true">
            <svg width="24" height="16" viewBox="0 0 24 16" fill="none" stroke="#f5c842" strokeWidth="2" strokeLinecap="round">
              <line x1="12" y1="14" x2="12" y2="3" />
              <line x1="5" y1="12" x2="2" y2="6" />
              <line x1="19" y1="12" x2="22" y2="6" />
            </svg>
          </div>

          {/* Header Star Decor */}
          <div className={styles.headerStar}>
            <DoodleChalkStar width={18} height={18} color="rgba(240, 239, 237, 0.6)" />
          </div>
        </div>
      </header>

      {/* ── Floating stars ── */}
      <div className={styles.floatingStars} aria-hidden="true">
        {starPositions.map((s, i) => (
          <div
            key={i}
            className={styles.starWrapper}
            style={{
              position: 'absolute',
              top: s.top,
              left: s.left,
              right: s.right,
              animationDelay: s.delay,
              transform: `scale(${s.size === '1rem' ? 1.2 : s.size === '0.7rem' ? 0.75 : 1})`,
            }}
          >
            <DoodleChalkStar width={18} height={18} color="rgba(240, 239, 237, 0.22)" />
          </div>
        ))}
      </div>

      <div className={styles.container}>

        {/* ═══════════ LEFT PANEL ═══════════ */}
        <section className={styles.leftPanel} aria-label="Product introduction">


          {/* Hero Content */}
          <div className={styles.hero}>
            <div className={styles.heroText}>
              <h1 className={styles.heroTagline}>
                EVERY GREAT JOURNEY<br />
                <span className={styles.highlight}>
                  BEGINS WITH LEARNING.
                </span>
              </h1>
              <UnderlineSwoosh />
              <p className={styles.heroSubtitle}>
                Everything you need in an LMS<br />
                that feels like a real classroom.
              </p>
            </div>
          </div>

          {/* Decorative Doodles absolutely positioned */}
          <div className={styles.doodlesContainer} aria-hidden="true">
            <div className={styles.topLeftSchoolTools}>
              <DoodleChalkSchoolTools />
            </div>
            <div className={styles.lightbulbDoodle}>
              <DoodleLightbulb />
            </div>
            <div className={styles.graduationCapDoodle}>
              <DoodleGraduationCap />
            </div>
            <div className={styles.booksDoodle}>
              <DoodleBooks />
            </div>
            <div className={styles.pencilsDoodle}>
              <DoodlePencils />
            </div>
            
            <div className={styles.chalkTrailsDoodle}>
              <DoodleChalkTrails />
            </div>
            
            <div className={styles.middlePaperPlane}>
              <DoodlePaperPlane width={45} height={45} color="rgba(240, 239, 237, 0.45)" />
            </div>
            
            {/* Hand-drawn chalk stars in specific reference layout positions */}
            <div className={styles.leftPanelStar1}>
              <DoodleChalkStar width={18} height={18} color="rgba(240, 239, 237, 0.45)" />
            </div>
            <div className={styles.leftPanelStar2}>
              <DoodleChalkStar width={24} height={24} color="rgba(245, 200, 66, 0.55)" />
            </div>
            <div className={styles.leftPanelStar3}>
              <DoodleChalkStar width={15} height={15} color="rgba(240, 239, 237, 0.3)" />
            </div>
          </div>

          {/* Feature Bar */}
          <nav className={styles.featureBar} aria-label="Product features">
            {[
              { icon: <FeatureIconCourses />, label: 'Online Courses' },
              { icon: <FeatureIconLive />,    label: 'Live Classes'   },
              { icon: <FeatureIconProgress />,label: 'Track Progress' },
              { icon: <FeatureIconCerts />,   label: 'Certificates'   },
            ].map(({ icon, label }) => (
              <div key={label} className={styles.featureItem}>
                <span className={styles.featureIcon}>{icon}</span>
                <span className={styles.featureLabel}>{label}</span>
              </div>
            ))}
          </nav>
        </section>

        {/* ═══════════ RIGHT PANEL ═══════════ */}
        <section className={styles.rightPanel} aria-label="Login form">
          <div className={styles.card} role="region" aria-label="Sign in to your account">

            {/* Header */}
            <header className={styles.cardHeader}>
              <div className={styles.welcomeTitleWrapper}>
                <h2 className={styles.welcomeTitle}>
                  Welcome Back!
                </h2>
                <div className={styles.welcomeStarDecor} aria-hidden="true">
                  <DoodleChalkStar width={20} height={20} color="rgba(240, 239, 237, 0.5)" />
                </div>
              </div>
              <WelcomeBackSwoosh />
              <p className={styles.cardSubtitle}>Log in to continue your learning journey.</p>
            </header>

            {/* Error */}
            {error && (
              <div id={errorId} className={styles.errorMsg} role="alert" aria-live="assertive">
                <IconAlert />
                {error}
              </div>
            )}

            {/* Form */}
            <form
              className={styles.form}
              onSubmit={handleSubmit}
              noValidate
              aria-describedby={error ? errorId : undefined}
            >
              {/* Email */}
              <div className={styles.formGroup}>
                <label htmlFor={emailId} className={styles.label}>Email Address</label>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputIcon}><IconEmail /></span>
                  <input
                    id={emailId}
                    type="email"
                    className={styles.input}
                    placeholder="you@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                    aria-required="true"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Password */}
              <div className={styles.formGroup}>
                <label htmlFor={passwordId} className={styles.label}>Password</label>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputIcon}><IconLock /></span>
                  <input
                    id={passwordId}
                    type={showPassword ? 'text' : 'password'}
                    className={styles.input}
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                    aria-required="true"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className={styles.passwordToggle}
                    onClick={() => setShowPassword(v => !v)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    disabled={isLoading}
                  >
                    {showPassword ? <IconEyeOff /> : <IconEye />}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className={styles.forgotRow}>
                <Link href="/forgot-password" className={styles.forgotLink}>
                  Forgot Password?
                </Link>
              </div>

              {/* Submit */}
              <button type="submit" className={styles.submitBtn} disabled={isLoading} aria-busy={isLoading}>
                {isLoading
                  ? <><span className={styles.spinner} aria-hidden="true" /> Signing in…</>
                  : 'Log In'
                }
              </button>

              {/* Divider */}
              <div className={styles.divider} aria-hidden="true">
                <div className={styles.dividerLine} />
                <span className={styles.dividerText}>or</span>
                <div className={styles.dividerLine} />
              </div>

              {/* Google */}
              <button type="button" className={styles.googleBtn} onClick={handleGoogleLogin} disabled={isLoading}>
                <GoogleLogo />
                Continue with Google
              </button>
            </form>

            {/* Sign Up */}
            <p className={styles.signupRow}>
              Don&apos;t have an account?
              <Link href="/register" className={styles.signupLink}>
                Sign Up →
              </Link>
            </p>

            {/* Inner Card chalk doodles */}
            <div className={styles.cardDoodles} aria-hidden="true">
              <div className={styles.cardStarDoodle}>
                <DoodleChalkStar width={16} height={16} color="rgba(240, 239, 237, 0.45)" />
              </div>
              <div className={styles.cardPlaneDoodle}>
                <DoodlePaperPlane width={22} height={22} color="rgba(245, 200, 66, 0.65)" />
              </div>
            </div>

          </div>
        </section>

      </div>
    </main>
  );
}
