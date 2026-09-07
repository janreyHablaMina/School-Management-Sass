import React from 'react';

export default function DocumentPreviewPage({ params }: { params: { id: string } }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#f5f5f5' }}>
      <header style={{ padding: '1rem', backgroundColor: '#333', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Document Preview - {params.id}</span>
        <button style={{ background: '#fff', color: '#333', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}>Download PDF</button>
      </header>
      
      <main style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '2rem', overflowY: 'auto' }}>
        <div style={{ backgroundColor: '#fff', width: '100%', maxWidth: '800px', minHeight: '1000px', padding: '4rem', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '2rem', borderBottom: '2px solid #eaeaea', paddingBottom: '1rem', color: '#333' }}>
            Sample Document Preview
          </h1>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} style={{ height: '1rem', backgroundColor: '#f0f0f0', borderRadius: '4px', width: `${Math.random() * 40 + 60}%` }} />
            ))}
          </div>
          
          <div style={{ marginTop: '4rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} style={{ height: '1rem', backgroundColor: '#f0f0f0', borderRadius: '4px', width: `${Math.random() * 40 + 60}%` }} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
