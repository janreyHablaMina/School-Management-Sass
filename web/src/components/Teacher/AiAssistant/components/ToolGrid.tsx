import React from 'react';
import type { AiAssistantTool } from '@/types/teacherAiAssistant';
import styles from '../aiAssistant.module.css';

interface ToolGridProps {
  tools: AiAssistantTool[];
  selectedToolId: number | null;
  onSelect: (tool: AiAssistantTool) => void;
}

export function ToolGrid({ tools, selectedToolId, onSelect }: ToolGridProps) {
  return (
    <div className={styles.toolGrid}>
      {tools.map((tool) => {
        const active = tool.id === selectedToolId;
        return (
          <button
            key={tool.id}
            type="button"
            className={`${styles.toolCard} ${active ? styles.toolCardActive : ''}`}
            onClick={() => onSelect(tool)}
          >
            <span
              className={styles.toolIcon}
              style={{ background: tool.iconBg, color: tool.iconColor }}
            >
              {tool.icon}
            </span>
            <span className={styles.toolBody}>
              <span className={styles.toolTitle}>{tool.title}</span>
              <span className={styles.toolDesc}>{tool.desc}</span>
            </span>
            <span className={styles.toolCredits}>{tool.credits}</span>
          </button>
        );
      })}
    </div>
  );
}
