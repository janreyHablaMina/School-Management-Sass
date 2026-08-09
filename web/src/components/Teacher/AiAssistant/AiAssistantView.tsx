'use client';

import React from 'react';
import { listStyles, PageHeader, SummaryMetrics } from '../shared';
import { ChatThread } from './components/ChatThread';
import { CreditUsageCard } from './components/CreditUsageCard';
import { PromptComposer } from './components/PromptComposer';
import { RecentRuns } from './components/RecentRuns';
import { StarterPrompts } from './components/StarterPrompts';
import { ToolGrid } from './components/ToolGrid';
import { useAiAssistant } from './useAiAssistant';
import styles from './aiAssistant.module.css';

export function AiAssistantView() {
  const {
    metrics,
    tools,
    starterPrompts,
    classroomOptions,
    creditsLeft,
    usage,
    selectedToolId,
    selectedTool,
    classroom,
    setClassroom,
    prompt,
    setPrompt,
    attachments,
    addFiles,
    removeAttachment,
    messages,
    recentRuns,
    isGenerating,
    statusMessage,
    error,
    selectTool,
    applyStarter,
    clearChat,
    loadRecentRun,
    sendPrompt,
  } = useAiAssistant();

  return (
    <div className={listStyles.page}>
      <PageHeader
        title="AI Assistant"
        subtitle="Upload PDF, PPT, or Word files, then draft lessons, quizzes, exams, and summaries."
      >
        <button type="button" className={listStyles.secondaryBtn} onClick={clearChat}>
          Clear chat
        </button>
        <button
          type="button"
          className={listStyles.primaryBtn}
          onClick={sendPrompt}
          disabled={isGenerating}
        >
          {isGenerating ? 'Generating…' : 'Generate'}
        </button>
      </PageHeader>

      {error ? (
        <p className={`${styles.statusBanner} ${styles.statusError}`}>{error}</p>
      ) : null}
      {!error && statusMessage ? (
        <p className={`${styles.statusBanner} ${styles.statusInfo}`}>{statusMessage}</p>
      ) : null}

      <SummaryMetrics metrics={metrics} columns={4} />

      <div className={styles.layout}>
        <aside className={styles.sideColumn}>
          <CreditUsageCard creditsLeft={creditsLeft} usage={usage} />
          <RecentRuns runs={recentRuns} onSelect={loadRecentRun} />
          <section className={styles.panel}>
            <p className={styles.panelEyebrow}>Toolkit</p>
            <h2 className={styles.panelTitle}>AI tools</h2>
            <ToolGrid
              tools={tools}
              selectedToolId={selectedToolId}
              onSelect={selectTool}
            />
          </section>
        </aside>

        <section className={`${styles.panel} ${styles.workspace} ${styles.mainColumn}`}>
          <div className={styles.workspaceHeader}>
            <div>
              <p className={styles.panelEyebrow}>Workspace</p>
              <h2 className={styles.panelTitle}>
                {selectedTool ? selectedTool.title : 'Ask Teachify AI'}
              </h2>
              <p className={styles.workspaceCopy}>
                Attach class materials, pick a starter or write a prompt, then generate a
                draft you can edit before sharing with students.
              </p>
            </div>
          </div>

          <StarterPrompts prompts={starterPrompts} onSelect={applyStarter} />

          <div className={styles.threadWrap}>
            <ChatThread
              messages={messages}
              selectedTool={selectedTool}
              isGenerating={isGenerating}
            />
          </div>

          <PromptComposer
            prompt={prompt}
            onPromptChange={setPrompt}
            classroom={classroom}
            classroomOptions={classroomOptions}
            onClassroomChange={setClassroom}
            selectedTool={selectedTool}
            attachments={attachments}
            onAddFiles={addFiles}
            onRemoveAttachment={removeAttachment}
            isGenerating={isGenerating}
            onSend={sendPrompt}
          />
        </section>
      </div>
    </div>
  );
}
