'use client';

import React, { useState } from 'react';
import { PageHeader, listStyles } from '@/components/ui/shared';
import {
  ENROLLMENT_DATA,
  CONTACT_DATA,
  GUARDIAN_DATA,
  QUICK_STATS_DATA,
  ADVISOR_NOTES,
} from '@/lib/mock/studentProfile.mock';
import { Camera, Edit2, User, BookOpen, Phone, ShieldCheck } from 'lucide-react';
import uiStyles from '@/components/ui/ui.module.css';

const STUDENT = {
  name: 'Juan Dela Cruz',
  studentId: '2023-14902-A',
  gradeLevel: 'Grade 11',
  section: 'STEM - Archimedes',
  track: 'Science, Technology, Engineering & Mathematics',
  schoolYear: '2025-2026',
  avatarUrl: 'https://i.pravatar.cc/150?u=juan',
  status: 'Active',
};

const TABS = ['Overview', 'Personal Info', 'Academic Info', 'Guardian'];

function SectionCard({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div style={{
      background: 'rgba(30, 33, 40, 0.5)',
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: '12px',
      padding: '1.5rem',
      marginBottom: '1.5rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <span style={{ color: '#84a9ff' }}>{icon}</span>
        <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: '#f0efed' }}>{title}</h4>
      </div>
      {children}
    </div>
  );
}

function InfoRow({ label, value, fullWidth }: { label: string; value: string; fullWidth?: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', ...(fullWidth ? { gridColumn: '1 / -1' } : {}) }}>
      <span style={{ fontSize: '0.75rem', color: 'rgba(240,239,237,0.45)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</span>
      <span style={{ fontSize: '0.9rem', color: '#f0efed', fontWeight: 500 }}>{value}</span>
    </div>
  );
}

export function StudentProfileView() {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className={listStyles.page}>
      <PageHeader
        title="My Profile"
        subtitle="View and manage your personal information, academic details, and guardian records."
      />

      {/* Profile Hero Card */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(30,33,40,0.8) 0%, rgba(20,22,27,0.9) 100%)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '16px',
        padding: '2rem',
        marginBottom: '2rem',
        display: 'flex',
        gap: '2rem',
        alignItems: 'center',
        flexWrap: 'wrap',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative BG */}
        <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '200px', height: '200px', background: 'rgba(84, 169, 255, 0.04)', borderRadius: '50%', pointerEvents: 'none' }} />

        {/* Avatar */}
        <div style={{ position: 'relative' }}>
          <img
            src={STUDENT.avatarUrl}
            alt={STUDENT.name}
            style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #84a9ff' }}
          />
          <button
            title="Change photo"
            style={{ position: 'absolute', bottom: 0, right: 0, width: '28px', height: '28px', borderRadius: '50%', background: '#84a9ff', border: '2px solid #1a1c20', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <Camera size={13} color="#000" />
          </button>
        </div>

        {/* Info */}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <h2 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 700, color: '#f0efed' }}>{STUDENT.name}</h2>
            <span style={{ background: 'rgba(92, 199, 137, 0.15)', color: '#5cc789', fontSize: '0.75rem', fontWeight: 600, padding: '0.2rem 0.75rem', borderRadius: '20px', border: '1px solid rgba(92,199,137,0.3)' }}>
              {STUDENT.status}
            </span>
          </div>
          <div style={{ marginTop: '0.4rem', color: 'rgba(240,239,237,0.6)', fontSize: '0.9rem' }}>
            ID: <strong style={{ color: '#f0efed', fontFamily: 'monospace' }}>{STUDENT.studentId}</strong>
          </div>
          <div style={{ marginTop: '0.75rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.85rem', color: 'rgba(240,239,237,0.7)' }}>📚 {STUDENT.gradeLevel} — {STUDENT.section}</span>
            <span style={{ fontSize: '0.85rem', color: 'rgba(240,239,237,0.7)' }}>🔬 {STUDENT.track}</span>
            <span style={{ fontSize: '0.85rem', color: 'rgba(240,239,237,0.7)' }}>📅 SY {STUDENT.schoolYear}</span>
          </div>
        </div>

        {/* Edit Button */}
        <button className={`${uiStyles.btnBase} ${uiStyles.btnSm} ${uiStyles.btnSecondary}`}>
          <Edit2 size={14} /> Request Info Update
        </button>
      </div>

      {/* Quick Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {QUICK_STATS_DATA.map(stat => (
          <div key={stat.id} style={{ background: 'rgba(30, 33, 40, 0.5)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '1rem 1.25rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'rgba(240,239,237,0.5)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{stat.label}</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#f0efed' }}>{stat.value}</div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(240,239,237,0.4)', marginTop: '0.2rem' }}>{stat.subText}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '0' }}>
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === tab ? '2px solid #84a9ff' : '2px solid transparent',
              color: activeTab === tab ? '#84a9ff' : 'rgba(240,239,237,0.55)',
              padding: '0.6rem 1.25rem',
              fontSize: '0.9rem',
              fontWeight: activeTab === tab ? 600 : 400,
              cursor: 'pointer',
              transition: 'all 0.2s',
              marginBottom: '-1px',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab: Overview */}
      {activeTab === 'Overview' && (
        <div>
          <SectionCard title="Adviser's Note" icon={<User size={16} />}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <img src={ADVISOR_NOTES.avatarUrl} alt={ADVISOR_NOTES.advisorName} style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#f0efed' }}>{ADVISOR_NOTES.advisorName}</div>
                <div style={{ fontSize: '0.78rem', color: 'rgba(240,239,237,0.5)', marginBottom: '0.6rem' }}>{ADVISOR_NOTES.advisorRole} · {ADVISOR_NOTES.dateStr}</div>
                <div style={{ fontSize: '0.9rem', color: 'rgba(240,239,237,0.85)', lineHeight: '1.5', fontStyle: 'italic' }}>"{ADVISOR_NOTES.content}"</div>
              </div>
            </div>
          </SectionCard>
        </div>
      )}

      {/* Tab: Personal Info */}
      {activeTab === 'Personal Info' && (
        <div>
          <SectionCard title="Contact Information" icon={<Phone size={16} />}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
              {CONTACT_DATA.map(item => (
                <InfoRow key={item.id} label={item.label} value={item.value} fullWidth={item.fullWidth} />
              ))}
            </div>
          </SectionCard>
        </div>
      )}

      {/* Tab: Academic Info */}
      {activeTab === 'Academic Info' && (
        <div>
          <SectionCard title="Enrollment Details" icon={<BookOpen size={16} />}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
              {ENROLLMENT_DATA.map(item => (
                <InfoRow key={item.id} label={item.label} value={item.value} />
              ))}
              <InfoRow label="Grade Level" value={STUDENT.gradeLevel} />
              <InfoRow label="Section" value={STUDENT.section} />
              <InfoRow label="Strand / Track" value={STUDENT.track} />
              <InfoRow label="School Year" value={STUDENT.schoolYear} />
            </div>
          </SectionCard>
        </div>
      )}

      {/* Tab: Guardian */}
      {activeTab === 'Guardian' && (
        <div>
          <SectionCard title="Primary Guardian" icon={<ShieldCheck size={16} />}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.5rem' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: GUARDIAN_DATA.avatarGradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1.2rem', color: '#fff', flexShrink: 0 }}>
                {GUARDIAN_DATA.initials}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#f0efed' }}>{GUARDIAN_DATA.name}</div>
                <div style={{ fontSize: '0.8rem', color: 'rgba(240,239,237,0.55)', marginTop: '0.2rem' }}>{GUARDIAN_DATA.relationship}</div>
              </div>
              <span style={{ marginLeft: 'auto', background: 'rgba(92,199,137,0.15)', color: '#5cc789', fontSize: '0.75rem', fontWeight: 600, padding: '0.2rem 0.75rem', borderRadius: '20px', border: '1px solid rgba(92,199,137,0.3)' }}>
                {GUARDIAN_DATA.status}
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
              <InfoRow label="Contact Number" value={GUARDIAN_DATA.contact} />
              <InfoRow label="Relationship" value="Father" />
            </div>
          </SectionCard>
        </div>
      )}
    </div>
  );
}
