import React from 'react';
import type { AiStarterPrompt } from '@/types/teacherAiAssistant';
import styles from '../aiAssistant.module.css';

interface StarterPromptsProps {
  prompts: AiStarterPrompt[];
  onSelect: (prompt: AiStarterPrompt) => void;
}

export function StarterPrompts({ prompts, onSelect }: StarterPromptsProps) {
  return (
    <div className={styles.starterRow}>
      {prompts.map((item) => (
        <button
          key={item.id}
          type="button"
          className={styles.starterChip}
          onClick={() => onSelect(item)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
