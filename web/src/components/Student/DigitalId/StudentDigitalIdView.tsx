'use client';

import React, { useState } from 'react';
import {
  ChalkBadge, DataTable, SummaryMetrics, listStyles,
  RowActionsMenu, ResourceBulkBar, RowSelectCell, SelectAllCheckbox,
  type DataTableColumn
} from '@/components/ui/shared';
import { PageHeader } from '@/components/ui/shared';
import { SchoolAdminDirectoryFilters } from '@/components/SchoolAdmin/shared/SchoolAdminDirectoryFilters';
import { GATE_PASS_HISTORY, DIGITAL_ID_STATS } from '@/lib/mock/studentProfile.mock';
import { Download, QrCode } from 'lucide-react';
import uiStyles from '@/components/ui/ui.module.css';

const STUDENT_PROFILE_DATA = {
  basicInfo: {
    name: 'Juan Dela Cruz',
    studentId: '2023-14902-A',
    avatarUrl: 'https://i.pravatar.cc/150?u=juan',
  },
  academicInfo: {
    gradeLevel: 'Grade 11',
    section: 'STEM - Archimedes',
  }
};

const COLUMNS: DataTableColumn[] = [
  { id: 'date', label: 'Date & Time' },
  { id: 'action', label: 'Action (Entry/Exit)' },
  { id: 'location', label: 'Gate Location' },
  { id: 'status', label: 'Scan Status' },
];

export function StudentDigitalIdView() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = GATE_PASS_HISTORY.filter(log => {
    return log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.location.toLowerCase().includes(search.toLowerCase()) ||
      log.date.toLowerCase().includes(search.toLowerCase());
  });

  const allVisibleSelected = filtered.length > 0 && filtered.every(a => selected.includes(a.id));

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelected(prev => Array.from(new Set([...prev, ...filtered.map(a => a.id)])));
    } else {
      setSelected(prev => prev.filter(id => !filtered.map(a => a.id).includes(id)));
    }
  };

  const handleSelectOne = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const summaryMetrics = [
    { label: 'ID Status', value: DIGITAL_ID_STATS.status, subtitle: `Valid until ${DIGITAL_ID_STATS.validUntil}`, icon: '🪪', accent: '#5cc789' },
    { label: 'Last Scan', value: DIGITAL_ID_STATS.lastScanTime, subtitle: DIGITAL_ID_STATS.lastScanLocation, icon: '⏱️', accent: '#84a9ff' },
    { label: 'Scans This Week', value: '14', subtitle: 'Normal activity level', icon: '📊', accent: '#b68eff' },
  ];

  return (
    <div className={listStyles.page}>
      <PageHeader
        title="Digital ID & Gate Pass"
        subtitle="Use your digital QR code for campus entry and view your recent gate logs."
      >
        <button className={`${uiStyles.btnBase} ${uiStyles.btnSm} ${uiStyles.btnSecondary}`}>
          <Download size={14} /> Save to Device
        </button>
      </PageHeader>

      <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        
        {/* ID Card Visual */}
        <div style={{
          background: 'linear-gradient(135deg, #2a2e35 0%, #1a1c20 100%)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '16px',
          padding: '2rem',
          width: '350px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Decorative background element */}
          <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px', background: 'rgba(132, 169, 255, 0.05)', borderRadius: '50%' }}></div>
          
          <h3 style={{ color: '#84a9ff', margin: '0 0 1.5rem 0', fontSize: '1.2rem', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 700 }}>
            Student ID Pass
          </h3>
          
          <img 
            src={STUDENT_PROFILE_DATA.basicInfo.avatarUrl} 
            alt="Student Avatar" 
            style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #5cc789', marginBottom: '1rem' }} 
          />
          
          <h2 style={{ color: '#fff', margin: '0 0 0.25rem 0', fontSize: '1.4rem' }}>{STUDENT_PROFILE_DATA.basicInfo.name}</h2>
          <div style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '0.25rem', fontSize: '0.9rem' }}>ID: {STUDENT_PROFILE_DATA.basicInfo.studentId}</div>
          <div style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>{STUDENT_PROFILE_DATA.academicInfo.gradeLevel} - {STUDENT_PROFILE_DATA.academicInfo.section}</div>
          
          <div style={{ 
            background: '#fff', 
            padding: '1rem', 
            borderRadius: '12px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '180px',
            height: '180px'
          }}>
            {/* Simulated QR Code using an icon for now, ideally an actual QR component or image */}
            <QrCode size={150} color="#000" strokeWidth={1} />
          </div>
          
          <div style={{ marginTop: '1.5rem', color: '#5cc789', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '8px', height: '8px', background: '#5cc789', borderRadius: '50%', display: 'inline-block' }}></span>
            Active & Valid
          </div>
        </div>

        {/* Right Side: Metrics and recent activity intro */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem', minWidth: '400px' }}>
          <SummaryMetrics
            metrics={summaryMetrics}
          />
          
          <div style={{ background: 'rgba(30, 33, 40, 0.4)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '1.5rem', flex: 1 }}>
            <h4 style={{ color: '#f0efed', margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>How to use your Digital ID</h4>
            <ul style={{ color: 'rgba(240,239,237,0.7)', fontSize: '0.9rem', lineHeight: '1.6', paddingLeft: '1.2rem', margin: 0 }}>
              <li>Present the QR code at any campus entrance terminal.</li>
              <li>Ensure your screen brightness is turned up for faster scanning.</li>
              <li>You can download the QR code to your device for offline use.</li>
              <li>If you lose your physical ID card, this digital pass serves as a valid temporary replacement.</li>
            </ul>
          </div>
        </div>
      </div>

      <h3 style={{ color: '#f0efed', marginTop: '1rem', marginBottom: '1rem', fontSize: '1.2rem' }}>Recent Gate Scans</h3>

      <SchoolAdminDirectoryFilters
        searchTerm={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search dates, locations, or actions..."
        searchAriaLabel="Search gate logs"
        selects={[]}
        hasActiveFilters={search !== ''}
        onReset={() => setSearch('')}
      />

      <ResourceBulkBar
        selectedCount={selected.length}
        itemLabel="log"
        onClearSelection={() => setSelected([])}
        actions={[
          { label: 'Export Logs', onClick: () => {} },
        ]}
      />

      <DataTable
        columns={COLUMNS}
        minWidth={800}
        leadingHeader={
          <SelectAllCheckbox
            checked={allVisibleSelected}
            onChange={(e) => handleSelectAll(e.target.checked)}
            label="Select all"
          />
        }
      >
        {filtered.map((log) => (
          <tr
            key={log.id}
            className={`${listStyles.clickableRow}${selected.includes(log.id) ? ` ${listStyles.rowSelected}` : ''}`}
          >
            <RowSelectCell
              selected={selected.includes(log.id)}
              onToggle={() => handleSelectOne(log.id)}
              label={`Select log on ${log.date}`}
            />

            {/* Date & Time */}
            <td>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#f0efed' }}>{log.date.split(' - ')[0]}</div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(240,239,237,0.5)' }}>{log.date.split(' - ')[1]}</div>
            </td>

            {/* Action */}
            <td>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: log.iconBg, color: log.iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>
                  {log.icon}
                </div>
                <span style={{ fontWeight: 600, fontSize: '0.9rem', color: log.action === 'Entry' ? '#5cc789' : '#b68eff' }}>
                  {log.action}
                </span>
              </div>
            </td>

            {/* Location */}
            <td>
              <span style={{ fontSize: '0.85rem', color: 'rgba(240,239,237,0.85)' }}>{log.location}</span>
            </td>

            {/* Status */}
            <td>
              <ChalkBadge 
                label={log.status} 
                accent={log.status.includes('Denied') ? '#ff7e93' : '#5cc789'} 
              />
            </td>
          </tr>
        ))}
        {filtered.length === 0 && (
          <tr>
            <td colSpan={COLUMNS.length + 1} style={{ textAlign: 'center', padding: '3rem', color: 'rgba(240,239,237,0.4)' }}>
              No gate pass logs found.
            </td>
          </tr>
        )}
      </DataTable>
    </div>
  );
}

