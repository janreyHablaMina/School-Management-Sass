'use client';

import React, { useRef, useState } from 'react';
import { FilterSelect, listStyles, modalStyles } from '../../shared';
import type { AiAssistantTool, AiAttachment } from '@/types/teacherAiAssistant';
import {
  ACCEPTED_UPLOAD_ACCEPT,
  MAX_ATTACHMENTS,
  attachmentIcon,
} from '../utils';
import styles from '../aiAssistant.module.css';

interface PromptComposerProps {
  prompt: string;
  onPromptChange: (value: string) => void;
  classroom: string;
  classroomOptions: string[];
  onClassroomChange: (value: string) => void;
  selectedTool: AiAssistantTool | null;
  attachments: AiAttachment[];
  onAddFiles: (files: FileList | File[]) => void;
  onRemoveAttachment: (id: string) => void;
  isGenerating: boolean;
  onSend: () => void;
}

export function PromptComposer({
  prompt,
  onPromptChange,
  classroom,
  classroomOptions,
  onClassroomChange,
  selectedTool,
  attachments,
  onAddFiles,
  onRemoveAttachment,
  isGenerating,
  onSend,
}: PromptComposerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const openPicker = () => inputRef.current?.click();

  return (
    <div className={styles.composer}>
      <div className={styles.composerTop}>
        <div className={styles.composerField}>
          <FilterSelect
            label="Classroom"
            value={classroom}
            options={classroomOptions}
            onChange={onClassroomChange}
            fullWidth
          />
        </div>
        <div className={styles.composerToolHint}>
          <span className={styles.composerToolLabel}>Active tool</span>
          <span className={styles.composerToolValue}>
            {selectedTool ? `${selectedTool.icon} ${selectedTool.title}` : 'General chat'}
          </span>
        </div>
      </div>

      <div
        className={`${styles.uploadZone} ${isDragging ? styles.uploadZoneActive : ''}`}
        onDragEnter={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          if (e.currentTarget.contains(e.relatedTarget as Node)) return;
          setIsDragging(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          if (e.dataTransfer.files?.length) onAddFiles(e.dataTransfer.files);
        }}
      >
        <div className={styles.uploadCopy}>
          <span className={styles.uploadTitle}>Attach classroom materials</span>
          <span className={styles.uploadHint}>
            PDF, PowerPoint, Word, or text · up to {MAX_ATTACHMENTS} files · 15 MB each
          </span>
        </div>
        <button
          type="button"
          className={listStyles.secondaryBtn}
          onClick={openPicker}
          disabled={isGenerating || attachments.length >= MAX_ATTACHMENTS}
        >
          + Upload file
        </button>
        <input
          ref={inputRef}
          type="file"
          className={styles.fileInput}
          accept={ACCEPTED_UPLOAD_ACCEPT}
          multiple
          onChange={(e) => {
            if (e.target.files?.length) onAddFiles(e.target.files);
            e.target.value = '';
          }}
        />
      </div>

      {attachments.length > 0 ? (
        <ul className={styles.attachmentList}>
          {attachments.map((file) => (
            <li key={file.id} className={styles.attachmentChip}>
              <span className={styles.attachmentIcon} aria-hidden>
                {attachmentIcon(file.kind)}
              </span>
              <span className={styles.attachmentMeta}>
                <span className={styles.attachmentName}>{file.name}</span>
                <span className={styles.attachmentSize}>{file.sizeLabel}</span>
              </span>
              <button
                type="button"
                className={styles.attachmentRemove}
                onClick={() => onRemoveAttachment(file.id)}
                aria-label={`Remove ${file.name}`}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      <textarea
        className={`${modalStyles.modalTextarea} ${styles.composerInput}`}
        rows={4}
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        placeholder={
          selectedTool?.promptHint ??
          'Describe what you need, or attach a file and ask for a lesson, quiz, or summary…'
        }
        onKeyDown={(e) => {
          if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            onSend();
          }
        }}
      />

      <div className={styles.composerFooter}>
        <span className={styles.composerHint}>
          {selectedTool?.creditCost
            ? `${selectedTool.creditCost} credits per run · Ctrl/⌘ + Enter to send`
            : 'Free tool · Ctrl/⌘ + Enter to send'}
        </span>
        <button
          type="button"
          className={listStyles.primaryBtn}
          onClick={onSend}
          disabled={isGenerating}
        >
          {isGenerating ? 'Generating…' : 'Generate'}
        </button>
      </div>
    </div>
  );
}
