'use client';

import { useMemo, useState } from 'react';
import { teacherAiAssistantMock } from '@/lib/mock/teacherAiAssistant.mock';
import {
  resolveClassroomOption,
  type TeacherClassFocus,
} from '@/lib/teacher/classFocus';
import type {
  AiAssistantTool,
  AiAttachment,
  AiChatMessage,
  AiFollowUpActionId,
  AiRecentRun,
  AiStarterPrompt,
} from '@/types/teacherAiAssistant';
import {
  buildAssistantReply,
  buildMetrics,
  buildQaFromTopic,
  collectAttachmentsFromFiles,
  createMessage,
  previewFromRun,
} from './utils';

export function useAiAssistant(options?: {
  classFocus?: TeacherClassFocus | null;
  initialToolId?: number | null;
  initialPrompt?: string | null;
}) {
  const seed = teacherAiAssistantMock;

  const [creditsLeft, setCreditsLeft] = useState(seed.creditsLeft);
  const [usage, setUsage] = useState(seed.usage);
  const [selectedToolId, setSelectedToolId] = useState<number | null>(
    options?.initialToolId ?? seed.tools[1]?.id ?? null,
  );
  const [classroom, setClassroom] = useState(() =>
    resolveClassroomOption(seed.classroomOptions, options?.classFocus),
  );
  const [prompt, setPrompt] = useState(() => options?.initialPrompt?.trim() ?? '');
  const [attachments, setAttachments] = useState<AiAttachment[]>([]);
  const [messages, setMessages] = useState<AiChatMessage[]>([]);
  const [recentRuns, setRecentRuns] = useState<AiRecentRun[]>(seed.recentRuns);
  const [isGenerating, setIsGenerating] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const selectedTool = useMemo(
    () => seed.tools.find((tool) => tool.id === selectedToolId) ?? null,
    [selectedToolId, seed.tools],
  );

  const metrics = useMemo(
    () => buildMetrics(creditsLeft, usage, seed.tools.length),
    [creditsLeft, seed.tools.length, usage],
  );

  const selectTool = (tool: AiAssistantTool) => {
    setSelectedToolId(tool.id);
    setError(null);
    setStatusMessage(`Using ${tool.title}`);
  };

  const applyStarter = (starter: AiStarterPrompt) => {
    setSelectedToolId(starter.toolId);
    setPrompt(starter.prompt);
    setError(null);
    setStatusMessage(null);
  };

  const clearChat = () => {
    setMessages([]);
    setPrompt('');
    setAttachments([]);
    setError(null);
    setStatusMessage('Workspace cleared');
  };

  const loadRecentRun = (run: AiRecentRun) => {
    setSelectedToolId(run.toolId);
    setClassroom(run.classroom);
    setPrompt(run.preview);
    setAttachments([]);
    setError(null);
    setStatusMessage(`Loaded “${run.toolTitle}” run`);
  };

  const addFiles = (files: FileList | File[]) => {
    const { attachments: next, error: fileError } = collectAttachmentsFromFiles(
      files,
      attachments.length,
    );
    if (next.length > 0) {
      setAttachments((prev) => [...prev, ...next]);
      if (selectedToolId == null || selectedToolId === 1) {
        setSelectedToolId(1);
      }
      setStatusMessage(
        next.length === 1 ? `Attached ${next[0].name}` : `Attached ${next.length} files`,
      );
    }
    setError(fileError);
  };

  const removeAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((file) => file.id !== id));
    setError(null);
  };

  const sendPrompt = () => {
    const trimmed = prompt.trim();
    if (!trimmed && attachments.length === 0) {
      setError('Write a prompt or attach a file before generating.');
      return;
    }

    const cost = selectedTool?.creditCost ?? 0;
    if (cost > creditsLeft) {
      setError('Not enough AI credits for this tool.');
      return;
    }

    const content =
      trimmed ||
      (attachments.length === 1
        ? `Please analyze “${attachments[0].name}” and suggest classroom-ready next steps.`
        : `Please analyze these ${attachments.length} files and suggest classroom-ready next steps.`);

    const pendingAttachments = [...attachments];

    setError(null);
    setStatusMessage(null);
    setIsGenerating(true);

    const userMessage = createMessage(
      'user',
      content,
      selectedTool?.id,
      pendingAttachments,
    );
    setMessages((prev) => [...prev, userMessage]);
    setPrompt('');
    setAttachments([]);

    window.setTimeout(() => {
      const reply = buildAssistantReply(
        selectedTool ?? undefined,
        content,
        classroom,
        pendingAttachments,
      );
      const assistantMessage = createMessage(
        'assistant',
        reply.content,
        selectedTool?.id,
        undefined,
        reply.topic,
        reply.intent,
      );
      setMessages((prev) => [...prev, assistantMessage]);

      if (cost > 0) {
        setCreditsLeft((prev) => prev - cost);
        setUsage((prev) => {
          const used = prev.used + cost;
          return {
            used,
            total: prev.total,
            percent: Math.min(100, Math.round((used / prev.total) * 100)),
          };
        });
      }

      setRecentRuns((prev) =>
        [
          {
            id: `run-${Date.now()}`,
            toolId: selectedTool?.id ?? 0,
            toolTitle: selectedTool?.title ?? 'AI Assistant',
            toolIcon: selectedTool?.icon ?? '✨',
            preview: previewFromRun(content, pendingAttachments),
            classroom: classroom || 'All classes',
            creditsSpent: cost,
            createdAt: 'Just now',
          },
          ...prev,
        ].slice(0, 8),
      );

      setIsGenerating(false);
      setStatusMessage(
        cost > 0
          ? `Generated · ${cost} credits used · Save, Q&A, or Share below`
          : 'Generated · Save, Q&A, or Share below',
      );
    }, 650);
  };

  const runMessageAction = (messageId: string, action: AiFollowUpActionId) => {
    const message = messages.find((item) => item.id === messageId);
    if (!message || message.role !== 'assistant') return;

    const topic = message.topic ?? 'this draft';

    if (action === 'save') {
      setError(null);
      setStatusMessage(`Saved “${topic}” to your drafts (demo).`);
      return;
    }

    if (action === 'share') {
      const payload = message.content;
      void (async () => {
        try {
          if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(payload);
            setStatusMessage('Copied to clipboard — paste to share with your class.');
          } else {
            setStatusMessage('Share ready — copy the reply text manually.');
          }
        } catch {
          setStatusMessage('Share ready — copy the reply text manually.');
        }
        setError(null);
      })();
      return;
    }

    if (action === 'generate-qa') {
      setError(null);
      setStatusMessage(null);
      setIsGenerating(true);

      window.setTimeout(() => {
        const qaContent = buildQaFromTopic(topic, classroom);
        const qaMessage = createMessage(
          'assistant',
          qaContent,
          selectedTool?.id,
          undefined,
          topic,
          'quiz',
        );
        setMessages((prev) => [...prev, qaMessage]);
        setIsGenerating(false);
        setStatusMessage(`Q&A ready for “${topic}” · Save or Share below`);
      }, 500);
    }
  };

  return {
    metrics,
    tools: seed.tools,
    starterPrompts: seed.starterPrompts,
    classroomOptions: seed.classroomOptions,
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
  };
}
