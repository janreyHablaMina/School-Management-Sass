'use client';

import { useEffect, useRef } from 'react';
import type { AiAssistantTool, AiChatMessage } from '@/types/teacherAiAssistant';
import { attachmentIcon } from './utils';
import styles from './aiAssistant.module.css';

interface ChatThreadProps {
  messages: AiChatMessage[];
  selectedTool: AiAssistantTool | null;
  isGenerating: boolean;
}

export function ChatThread({ messages, selectedTool, isGenerating }: ChatThreadProps) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isGenerating]);

  if (messages.length === 0 && !isGenerating) {
    return (
      <div className={styles.emptyChat}>
        <span className={styles.emptyIcon}>{selectedTool?.icon ?? '✨'}</span>
        <h3 className={styles.emptyTitle}>
          {selectedTool ? selectedTool.title : 'Ask Teachify AI'}
        </h3>
        <p className={styles.emptyCopy}>
          {selectedTool?.promptHint ??
            'Pick a tool, attach a PDF/PPT/Word file if you have one, and describe what you need.'}
        </p>
      </div>
    );
  }

  return (
    <div className={styles.thread} aria-live="polite">
      {messages.map((message) => (
        <article
          key={message.id}
          className={`${styles.bubble} ${
            message.role === 'user' ? styles.bubbleUser : styles.bubbleAssistant
          }`}
        >
          <header className={styles.bubbleMeta}>
            <span>{message.role === 'user' ? 'You' : 'Teachify AI'}</span>
            <time>{message.createdAt}</time>
          </header>
          {message.attachments?.length ? (
            <ul className={styles.bubbleFiles}>
              {message.attachments.map((file) => (
                <li key={file.id} className={styles.bubbleFile}>
                  <span aria-hidden>{attachmentIcon(file.kind)}</span>
                  <span>
                    {file.name}
                    <span className={styles.bubbleFileSize}> · {file.sizeLabel}</span>
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
          <p className={styles.bubbleText}>{message.content}</p>
        </article>
      ))}
      {isGenerating ? (
        <article className={`${styles.bubble} ${styles.bubbleAssistant} ${styles.bubbleTyping}`}>
          <header className={styles.bubbleMeta}>
            <span>Teachify AI</span>
            <span>Thinking…</span>
          </header>
          <p className={styles.bubbleText}>Drafting something classroom-ready…</p>
        </article>
      ) : null}
      <div ref={endRef} />
    </div>
  );
}
