import React from 'react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Delete',
  cancelText = 'Cancel'
}) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0, 0, 0, 0.7)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999
    }}>
      <div style={{
        background: 'rgba(20, 25, 22, 0.95)',
        border: '2px solid rgba(255, 138, 138, 0.3)',
        borderRadius: '12px 14px 10px 13px / 14px 10px 13px 10px',
        padding: '2rem',
        maxWidth: '400px',
        width: '90%',
        boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
        transform: 'rotate(-0.5deg)',
        color: '#f0efed'
      }}>
        <h3 style={{ fontFamily: 'Caveat, cursive', fontSize: '1.8rem', color: '#ff8a8a', margin: '0 0 1rem 0' }}>
          ⚠️ {title}
        </h3>
        <div style={{ fontSize: '1rem', color: 'rgba(240, 239, 237, 0.8)', marginBottom: '1.5rem', lineHeight: '1.5' }}>
          {message}
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <button 
            onClick={onCancel}
            style={{
              background: 'transparent',
              border: '1px solid rgba(240, 239, 237, 0.3)',
              color: 'rgba(240, 239, 237, 0.8)',
              padding: '0.6rem 1.2rem',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 500,
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(240, 239, 237, 0.1)')}
            onMouseOut={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            {cancelText}
          </button>
          <button 
            onClick={onConfirm}
            style={{
              background: 'rgba(255, 138, 138, 0.15)',
              border: '1px solid rgba(255, 138, 138, 0.5)',
              color: '#ff8a8a',
              padding: '0.6rem 1.2rem',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 600,
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(255, 138, 138, 0.25)')}
            onMouseOut={(e) => (e.currentTarget.style.background = 'rgba(255, 138, 138, 0.15)')}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
