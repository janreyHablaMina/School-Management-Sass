'use client';

import React, { useState } from 'react';
import { PageHeader, SummaryMetrics, listStyles, DataTable, ChalkBadge, type DataTableColumn } from '@/components/ui/shared';
import { STUDENT_CALENDAR_EVENTS } from '@/lib/mock/studentProfile.mock';
import { Calendar as CalendarIcon, Clock, MapPin, Tag } from 'lucide-react';
import uiStyles from '@/components/ui/ui.module.css';

const COLUMNS: DataTableColumn[] = [
  { id: 'title', label: 'Event / Activity' },
  { id: 'category', label: 'Category' },
  { id: 'date', label: 'Date & Time' },
  { id: 'location', label: 'Location' },
  { id: 'type', label: 'Type' },
];

export function StudentCalendarView() {
  const [filterType, setFilterType] = useState('All');
  const [search, setSearch] = useState('');

  const types = ['All', 'Academic', 'Assignment', 'Club', 'School-wide'];

  const filteredEvents = STUDENT_CALENDAR_EVENTS.filter(event => {
    const matchType = filterType === 'All' || event.category === filterType;
    const matchSearch = event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.location.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  const summaryMetrics = [
    { label: 'Upcoming Exams', value: '1', subtitle: 'Midterm exam week starts Oct 1', icon: '📝', accent: '#ff7e93' },
    { label: 'Pending Deadlines', value: '2', subtitle: 'Physics project due Oct 8', icon: '⏰', accent: '#84a9ff' },
    { label: 'School Events', value: '2', subtitle: 'Intramurals & SSG Assembly', icon: '🎉', accent: '#5cc789' },
    { label: 'Total Calendar Items', value: STUDENT_CALENDAR_EVENTS.length.toString(), subtitle: 'For Semester 1', icon: '📅', accent: '#b68eff' },
  ];

  return (
    <div className={listStyles.page}>
      <PageHeader
        title="Calendar"
        subtitle="Keep track of academic deadlines, upcoming examinations, club events, and school holidays."
      >
        <button className={`${uiStyles.btnBase} ${uiStyles.btnSm} ${uiStyles.btnSecondary}`}>
          <CalendarIcon size={14} /> Export to iCal / Google Calendar
        </button>
      </PageHeader>

      <SummaryMetrics
        metrics={summaryMetrics}
        columns={4}
      />

      <div style={{ marginTop: '2rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Category Filters */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {types.map(t => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              style={{
                padding: '0.45rem 0.9rem',
                borderRadius: '20px',
                border: filterType === t ? '1px solid #84a9ff' : '1px solid rgba(255,255,255,0.1)',
                background: filterType === t ? 'rgba(132, 169, 255, 0.15)' : 'rgba(30, 33, 40, 0.4)',
                color: filterType === t ? '#84a9ff' : 'rgba(240,239,237,0.7)',
                fontSize: '0.82rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search calendar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            background: 'rgba(0,0,0,0.25)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '6px',
            padding: '0.45rem 0.8rem',
            color: '#f0efed',
            fontSize: '0.85rem',
            width: '220px'
          }}
        />
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <DataTable columns={COLUMNS} minWidth={900}>
          {filteredEvents.map(event => (
            <tr key={event.id} className={listStyles.clickableRow}>
              {/* Event Title */}
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: event.bg,
                    color: event.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '1rem',
                    flexShrink: 0
                  }}>
                    🗓️
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#f0efed' }}>{event.title}</div>
                  </div>
                </div>
              </td>

              {/* Category */}
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'rgba(240,239,237,0.8)' }}>
                  <Tag size={13} color="rgba(240,239,237,0.5)" />
                  {event.category}
                </div>
              </td>

              {/* Date & Time */}
              <td>
                <div>
                  <div style={{ fontWeight: 500, fontSize: '0.85rem', color: '#f0efed' }}>{event.date}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', color: 'rgba(240,239,237,0.5)', marginTop: '0.15rem' }}>
                    <Clock size={12} /> {event.time}
                  </div>
                </div>
              </td>

              {/* Location */}
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'rgba(240,239,237,0.75)' }}>
                  <MapPin size={13} color="rgba(240,239,237,0.4)" />
                  {event.location}
                </div>
              </td>

              {/* Type Badge */}
              <td>
                <ChalkBadge label={event.type} accent={event.color} />
              </td>
            </tr>
          ))}

          {filteredEvents.length === 0 && (
            <tr>
              <td colSpan={COLUMNS.length} style={{ textAlign: 'center', padding: '3rem', color: 'rgba(240,239,237,0.4)' }}>
                No events found for this filter.
              </td>
            </tr>
          )}
        </DataTable>
      </div>
    </div>
  );
}
