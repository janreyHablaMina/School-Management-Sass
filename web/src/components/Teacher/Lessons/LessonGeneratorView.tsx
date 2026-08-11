'use client';

import { useEffect, useRef, useState } from 'react';
import type { AiAttachment, AiChatMessage } from '@/types/teacherAiAssistant';
import type { TeacherLessonRow } from '@/types/teacherLessons';
import { teacherAiAssistantMock } from '@/lib/mock/teacherAiAssistant.mock';
import {
  ACCEPTED_UPLOAD_ACCEPT,
  buildAssistantReply,
  buildQaFromTopic,
  collectAttachmentsFromFiles,
  createMessage,
  followUpActionsFor,
} from '../AiAssistant/utils';
import { saveAiDraftAsLesson, titleFromAiTopic } from './utils';
import {
  SaveLessonTitleModal,
  type SaveLessonDetails,
} from './components/SaveLessonTitleModal';
import type { LessonGeneratorSession } from './types';
import styles from './lessonGenerator.module.css';

interface LessonGeneratorViewProps {
  session: LessonGeneratorSession;
  classOptions: string[];
  subjectOptions: string[];
  onBack: () => void;
  onSaved: (lessons: TeacherLessonRow[]) => void;
}

export function LessonGeneratorView({
  session,
  classOptions,
  subjectOptions,
  onBack,
  onSaved,
}: LessonGeneratorViewProps) {
  const [messages, setMessages] = useState<AiChatMessage[]>([]);
  const [prompt, setPrompt] = useState('');
  const [attachments, setAttachments] = useState<AiAttachment[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saveTarget, setSaveTarget] = useState<{
    messageId: string;
    topic: string;
    content: string;
    suggestedTitle: string;
  } | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const autoSent = useRef(false);

  const tool =
    teacherAiAssistantMock.tools.find((item) =>
      session.mode === 'upload' ? item.id === 1 : item.id === 2,
    ) ?? teacherAiAssistantMock.tools[1];

  const classroom = session.classLabel;

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isGenerating]);

  useEffect(() => {
    if (autoSent.current) return;
    if (session.mode === 'upload') {
      setPrompt(session.initialPrompt);
      setStatus('Attach a PDF, PPT, or Word file, then generate.');
      return;
    }
    if (!session.initialPrompt.trim()) {
      return;
    }
    autoSent.current = true;
    void runGenerate(session.initialPrompt, []);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- bootstrap once per session
  }, [session]);

  const runGenerate = (text: string, files: AiAttachment[]) => {
    const trimmed = text.trim();
    if (!trimmed && files.length === 0) {
      setError('Write a prompt or attach a file first.');
      return;
    }

    const content =
      trimmed ||
      (files.length === 1
        ? `Please analyze “${files[0].name}” and draft a lesson for ${session.subject} · ${classroom}.`
        : `Please analyze these files and draft a lesson for ${session.subject} · ${classroom}.`);

    setError(null);
    setStatus(null);
    setIsGenerating(true);
    setMessages((prev) => [
      ...prev,
      createMessage('user', content, tool?.id, files),
    ]);
    setPrompt('');
    setAttachments([]);

    window.setTimeout(() => {
      const reply = buildAssistantReply(tool, content, classroom, files);
      setMessages((prev) => [
        ...prev,
        createMessage(
          'assistant',
          reply.content,
          tool?.id,
          undefined,
          reply.topic,
          reply.intent,
        ),
      ]);
      setIsGenerating(false);
      setStatus('Draft ready — save as a lesson or generate Q&A.');
    }, 650);
  };

  const handleSend = () => {
    runGenerate(prompt, attachments);
  };

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList?.length) return;
    const { attachments: next, error: fileError } = collectAttachmentsFromFiles(
      fileList,
      attachments.length,
    );
    if (next.length) {
      setAttachments((prev) => [...prev, ...next]);
      setStatus(
        next.length === 1 ? `Attached ${next[0].name}` : `Attached ${next.length} files`,
      );
    }
    setError(fileError);
  };

  const handleAction = (messageId: string, actionId: string) => {
    const message = messages.find((item) => item.id === messageId);
    if (!message || message.role !== 'assistant') return;
    const topic = message.topic ?? session.topic ?? 'this lesson';

    if (actionId === 'save') {
      if (message.savedLessonId) {
        onBack();
        return;
      }
      setSaveTarget({
        messageId: message.id,
        topic,
        content: message.content,
        suggestedTitle: titleFromAiTopic(topic, message.content),
      });
      return;
    }

    if (actionId === 'share') {
      void navigator.clipboard?.writeText(message.content).then(
        () => setStatus('Copied to clipboard'),
        () => setStatus('Copy the draft text manually to share'),
      );
      return;
    }

    if (actionId === 'generate-qa') {
      setIsGenerating(true);
      setStatus(null);
      window.setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          createMessage(
            'assistant',
            buildQaFromTopic(topic, classroom),
            tool?.id,
            undefined,
            topic,
            'quiz',
          ),
        ]);
        setIsGenerating(false);
        setStatus('Q&A ready — you can save this as a lesson draft for now.');
      }, 500);
    }
  };

  const confirmSaveDetails = (details: SaveLessonDetails): TeacherLessonRow[] => {
    if (!saveTarget) {
      throw new Error('Nothing to save');
    }

    const primaryClass = details.classLabels[0] ?? 'Unassigned';
    const lesson = saveAiDraftAsLesson({
      topic: saveTarget.topic,
      content: saveTarget.content,
      classroom: primaryClass,
      title: details.title,
      classLabel: primaryClass,
      classLabels: details.classLabels,
      subject: details.subject,
      type: details.type,
      classFocus: {
        gradeSection: primaryClass,
        subject: details.subject,
      },
    });

    setMessages((prev) =>
      prev.map((item) =>
        item.id === saveTarget.messageId
          ? { ...item, savedLessonId: lesson.id }
          : item,
      ),
    );
    return [lesson];
  };

  const finishSaveRedirect = (lessons: TeacherLessonRow[]) => {
    setSaveTarget(null);
    onSaved(lessons);
  };

  const suggestions =
    session.mode === 'upload'
      ? [
          'Turn this file into a lesson',
          'Extract key vocabulary and examples',
          'Make a student-friendly summary',
        ]
      : [
          'Draft a lesson plan',
          'Add a warm-up and exit ticket',
          'Write a student-friendly summary',
        ];

  return (
    <div className={styles.page}>
      <header className={styles.topBar}>
        <button type="button" className={styles.backBtn} onClick={onBack}>
          ← Back to Lessons
        </button>
        <h1 className={styles.title}>Lesson studio</h1>
        <p className={styles.subtitle}>
          {session.mode === 'upload'
            ? 'Upload a file, then generate a lesson draft.'
            : 'Chat to draft a lesson, then save it to your list.'}
        </p>
      </header>

      <div className={styles.stage}>
        {messages.length === 0 && !isGenerating ? (
          <div className={styles.empty}>
            <span className={styles.emptyIcon} aria-hidden>
              {session.mode === 'upload' ? '📎' : '✨'}
            </span>
            <h2 className={styles.emptyTitle}>
              {session.mode === 'upload' ? 'Upload, then generate' : 'What should we teach?'}
            </h2>
            <p className={styles.emptyCopy}>
              {session.mode === 'upload'
                ? 'Attach your materials below, then generate a lesson draft you can save.'
                : 'Ask for a lesson plan, summary, or outline — then save it when it looks right.'}
            </p>
            <div className={styles.suggestions}>
              {suggestions.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={styles.suggestion}
                  onClick={() => {
                    setPrompt(item);
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.thread} aria-live="polite">
            {messages.map((message) => {
              const actions =
                message.role === 'assistant' && message.intent
                  ? followUpActionsFor(message.intent, {
                      savedLessonId: message.savedLessonId,
                    })
                  : [];

              return (
                <article
                  key={message.id}
                  className={`${styles.bubble} ${
                    message.role === 'user' ? styles.bubbleUser : styles.bubbleAssistant
                  }`}
                >
                  <header className={styles.bubbleMeta}>
                    <span>{message.role === 'user' ? 'You' : 'Teachify'}</span>
                    <time>{message.createdAt}</time>
                  </header>
                  <p className={styles.bubbleText}>{message.content}</p>
                  {actions.length > 0 ? (
                    <div className={styles.bubbleActions}>
                      {actions.map((action) => (
                        <button
                          key={action.id}
                          type="button"
                          className={styles.actionBtn}
                          disabled={isGenerating}
                          onClick={() => handleAction(message.id, action.id)}
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </article>
              );
            })}
            {isGenerating ? (
              <article className={`${styles.bubble} ${styles.bubbleAssistant}`}>
                <header className={styles.bubbleMeta}>
                  <span>Teachify</span>
                  <span>Thinking…</span>
                </header>
                <p className={styles.bubbleText}>Drafting your lesson…</p>
              </article>
            ) : null}
            <div ref={endRef} />
          </div>
        )}

        <div className={styles.composerWrap}>
          {error ? <p className={`${styles.status} ${styles.statusError}`}>{error}</p> : null}
          {!error && status ? <p className={styles.status}>{status}</p> : null}

          <div className={styles.composer}>
            {attachments.length > 0 ? (
              <div className={styles.fileRow}>
                {attachments.map((file) => (
                  <span key={file.id} className={styles.fileChip}>
                    {file.name}
                    <button
                      type="button"
                      className={styles.fileRemove}
                      aria-label={`Remove ${file.name}`}
                      onClick={() =>
                        setAttachments((prev) => prev.filter((item) => item.id !== file.id))
                      }
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            ) : null}

            <textarea
              className={styles.composerInput}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={
                session.mode === 'upload'
                  ? 'Describe what to build from your files…'
                  : 'Message Lesson studio…'
              }
              rows={2}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  if (!isGenerating) handleSend();
                }
              }}
            />

            <div className={styles.composerBottom}>
              <div>
                {session.mode === 'upload' || attachments.length > 0 ? (
                  <>
                    <input
                      ref={fileRef}
                      className={styles.hiddenInput}
                      type="file"
                      accept={ACCEPTED_UPLOAD_ACCEPT}
                      multiple
                      onChange={(e) => {
                        handleFiles(e.target.files);
                        e.target.value = '';
                      }}
                    />
                    <button
                      type="button"
                      className={styles.attachBtn}
                      onClick={() => fileRef.current?.click()}
                    >
                      Attach file
                    </button>
                  </>
                ) : (
                  <span className={styles.composerHint}>Enter to send · Shift+Enter for new line</span>
                )}
              </div>
              <button
                type="button"
                className={styles.sendBtn}
                disabled={isGenerating || (!prompt.trim() && attachments.length === 0)}
                onClick={handleSend}
              >
                {isGenerating ? 'Generating…' : 'Generate'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {saveTarget ? (
        <SaveLessonTitleModal
          suggestedTitle={saveTarget.suggestedTitle}
          classOptions={classOptions}
          defaultSubject={session.subject || subjectOptions[0] || 'English'}
          onCancel={() => setSaveTarget(null)}
          onConfirm={confirmSaveDetails}
          onDone={finishSaveRedirect}
        />
      ) : null}
    </div>
  );
}
