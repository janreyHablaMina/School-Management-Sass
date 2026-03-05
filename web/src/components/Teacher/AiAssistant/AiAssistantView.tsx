'use client';

import type { TeacherClassFocus } from '@/lib/teacher/classFocus';
import { listStyles, PageHeader, SummaryMetrics } from '../shared';
import { ChatThread } from './components/ChatThread';
import { PromptComposer } from './components/PromptComposer';
import { useAiAssistant } from './useAiAssistant';
import styles from './aiAssistant.module.css';

interface AiAssistantViewProps {
  classFocus?: TeacherClassFocus | null;
  initialToolId?: number | null;
  initialPrompt?: string | null;
}

export function AiAssistantView({
  classFocus = null,
  initialToolId = null,
  initialPrompt = null,
}: AiAssistantViewProps) {
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
    runMessageAction,
  } = useAiAssistant({ classFocus, initialToolId, initialPrompt });

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
        <p className={`${listStyles.statusBanner} ${listStyles.statusError}`}>{error}</p>
      ) : null}
      {!error && statusMessage ? (
        <p className={`${listStyles.statusBanner} ${listStyles.statusInfo}`}>{statusMessage}</p>
      ) : null}

      <SummaryMetrics metrics={metrics} columns={4} />

      <div className={styles.layout}>
        <aside className={styles.sideColumn}>
          <section className={styles.panel}>
            <div className={styles.usageTop}>
              <div>
                <p className={styles.panelEyebrow}>Monthly allowance</p>
                <h2 className={styles.panelTitle}>Credits this month</h2>
              </div>
              <span className={styles.usagePill}>✨ {creditsLeft.toLocaleString()} left</span>
            </div>
            <div className={styles.usageMeta}>
              <span>
                {usage.used} / {usage.total.toLocaleString()} used
              </span>
              <span>{usage.percent}%</span>
            </div>
            <div className={styles.usageTrack} aria-hidden>
              <div className={styles.usageFill} style={{ width: `${usage.percent}%` }} />
            </div>
          </section>

          <section className={styles.panel}>
            <p className={styles.panelEyebrow}>History</p>
            <h2 className={styles.panelTitle}>Recent runs</h2>
            {recentRuns.length === 0 ? (
              <p className={styles.recentEmpty}>Generated work will show up here.</p>
            ) : (
              <ul className={styles.recentList}>
                {recentRuns.map((run) => (
                  <li key={run.id}>
                    <button
                      type="button"
                      className={styles.recentItem}
                      onClick={() => loadRecentRun(run)}
                    >
                      <span className={styles.recentIcon}>{run.toolIcon}</span>
                      <span className={styles.recentBody}>
                        <span className={styles.recentItemTitle}>{run.toolTitle}</span>
                        <span className={styles.recentPreview}>{run.preview}</span>
                        <span className={styles.recentMeta}>
                          {run.classroom} · {run.createdAt}
                          {run.creditsSpent > 0 ? ` · ${run.creditsSpent} cr` : ' · Free'}
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className={styles.panel}>
            <p className={styles.panelEyebrow}>Toolkit</p>
            <h2 className={styles.panelTitle}>AI tools</h2>
            <div className={styles.toolGrid}>
              {tools.map((tool) => {
                const active = tool.id === selectedToolId;
                return (
                  <button
                    key={tool.id}
                    type="button"
                    className={`${styles.toolCard} ${active ? styles.toolCardActive : ''}`}
                    onClick={() => selectTool(tool)}
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
          </section>
        </aside>

        <section className={`${styles.panel} ${styles.workspace}`}>
          <div>
            <p className={styles.panelEyebrow}>Workspace</p>
            <h2 className={styles.panelTitle}>
              {selectedTool ? selectedTool.title : 'Ask Teachify AI'}
            </h2>
            <p className={styles.workspaceCopy}>
              Attach class materials, pick a starter or write a prompt, then generate a draft
              you can edit before sharing with students.
            </p>
          </div>

          <div className={styles.starterRow}>
            {starterPrompts.map((item) => (
              <button
                key={item.id}
                type="button"
                className={styles.starterChip}
                onClick={() => applyStarter(item)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className={styles.threadWrap}>
            <ChatThread
              messages={messages}
              selectedTool={selectedTool}
              isGenerating={isGenerating}
              onMessageAction={runMessageAction}
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
