'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import { listStyles, modalStyles } from '@/components/ui/shared';
import { useLockWorkspaceScroll } from '@/lib/hooks';
import type {
  AnnouncementPublishMode,
  AnnouncementType,
  CreateAnnouncementInput,
} from '@/types/teacherAnnouncements';
import styles from '../announcements.module.css';
import { ContentStep, IMAGE_ACCEPT } from './steps/ContentStep';
import { AudienceStep } from './steps/AudienceStep';
import { DeliveryStep, PUBLISH_MODES } from './steps/DeliveryStep';

interface CreateAnnouncementModalProps {
  classrooms: string[];
  onCancel: () => void;
  onCreate: (input: CreateAnnouncementInput) => void;
}

type AudienceMode = 'all' | 'selected';
type ModalStep = 'content' | 'audience' | 'delivery';

const IMAGE_MAX_BYTES = 3 * 1024 * 1024;
const STEPS: Array<{ value: ModalStep; label: string }> = [
  { value: 'content', label: 'Content' },
  { value: 'audience', label: 'Audience' },
  { value: 'delivery', label: 'Delivery' },
];

function toDateInputValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatSchedulePreview(dateKey: string, time: string) {
  const date = new Date(`${dateKey}T${time}:00`);
  if (Number.isNaN(date.getTime())) return 'Auto-send later';
  return date.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function readAnnouncementImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) { reject(new Error('Choose a JPG, PNG, WEBP, or GIF image.')); return; }
    if (file.size > IMAGE_MAX_BYTES) { reject(new Error('Image must be 3 MB or smaller.')); return; }
    const reader = new FileReader();
    reader.onload = () => { if (typeof reader.result === 'string') resolve(reader.result); else reject(new Error('Could not read that image.')); };
    reader.onerror = () => reject(new Error('Could not read that image.'));
    reader.readAsDataURL(file);
  });
}

export function CreateAnnouncementModal({ classrooms, onCancel, onCreate }: CreateAnnouncementModalProps) {
  const dropdownId = useId();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [step, setStep] = useState<ModalStep>('content');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<AnnouncementType>('General');
  const [audienceMode, setAudienceMode] = useState<AudienceMode>('selected');
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [classSearch, setClassSearch] = useState('');
  const [includeParents, setIncludeParents] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [publishMode, setPublishMode] = useState<AnnouncementPublishMode>('publish');
  const [scheduledAt, setScheduledAt] = useState('');
  const [scheduledTime, setScheduledTime] = useState('08:00');
  const [imageUrl, setImageUrl] = useState('');
  const [imageName, setImageName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [minScheduleDate] = useState(() => toDateInputValue(new Date()));

  useLockWorkspaceScroll();

  useEffect(() => {
    if (!dropdownOpen) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) setDropdownOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [dropdownOpen]);

  const toggleClass = (classroom: string) =>
    setSelectedClasses((prev) => prev.includes(classroom) ? prev.filter((c) => c !== classroom) : [...prev, classroom]);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    try {
      setImageUrl(await readAnnouncementImage(file));
      setImageName(file.name);
      setError(null);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : 'Could not attach image.');
    }
  };

  const removeImage = () => { setImageUrl(''); setImageName(''); };

  const dropdownLabel =
    selectedClasses.length === 0 ? 'Select classrooms'
    : selectedClasses.length === 1 ? selectedClasses[0]
    : selectedClasses.length === classrooms.length ? 'All listed classrooms'
    : `${selectedClasses.length} classrooms selected`;

  const filteredClassrooms = classrooms.filter((c) => c.toLowerCase().includes(classSearch.trim().toLowerCase()));
  const stepIndex = STEPS.findIndex((item) => item.value === step);
  const isLastStep = step === 'delivery';

  const validateStep = (targetStep = step) => {
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();
    const allClasses = audienceMode === 'all';
    if (targetStep === 'content') {
      if (!trimmedTitle) return 'Add a title for this announcement.';
      if (!trimmedDescription) return 'Write a short message for your audience.';
    }
    if (targetStep === 'audience' && !allClasses && selectedClasses.length === 0 && !includeParents)
      return 'Select at least one classroom, or include Parents.';
    if (targetStep === 'delivery') {
      if (publishMode === 'schedule' && !scheduledAt) return 'Pick a date for auto-send.';
      if (publishMode === 'schedule' && !scheduledTime) return 'Pick a time for auto-send.';
    }
    return null;
  };

  const canMoveToStep = (targetIndex: number) => targetIndex <= 0 || validateStep('content') === null;

  const goToNextStep = () => {
    const nextError = validateStep(step);
    if (nextError) { setError(nextError); return; }
    setError(null);
    setStep(STEPS[Math.min(stepIndex + 1, STEPS.length - 1)].value);
  };

  const goToPreviousStep = () => { setError(null); setStep(STEPS[Math.max(stepIndex - 1, 0)].value); };

  const handleCreate = () => {
    const allClasses = audienceMode === 'all';
    const firstError = validateStep('content') ?? validateStep('audience') ?? validateStep('delivery');
    if (firstError) {
      setError(firstError);
      if (validateStep('content')) setStep('content');
      else if (validateStep('audience')) setStep('audience');
      else setStep('delivery');
      return;
    }
    onCreate({
      title: title.trim(), description: description.trim(), type,
      classrooms: allClasses ? [] : selectedClasses, includeParents, allClasses, pinned, publishMode,
      scheduledAt: publishMode === 'schedule' ? scheduledAt : undefined,
      scheduledTime: publishMode === 'schedule' ? scheduledTime : undefined,
      imageUrl: imageUrl || undefined, imageName: imageName || undefined,
    });
  };

  const submitLabel = publishMode === 'publish' ? 'Publish announcement' : publishMode === 'schedule' ? 'Schedule announcement' : 'Save draft';

  return (
    <div className={modalStyles.modalOverlay} role="dialog" aria-modal="true" aria-labelledby="create-announcement-title">
      <form className={`${modalStyles.modalCard} ${modalStyles.modalCardWide} ${styles.announcementComposer}`} onSubmit={(e) => e.preventDefault()}>
        <div className={styles.composerHeader}>
          <div>
            <p className={modalStyles.modalEyebrow}>New announcement</p>
            <h2 id="create-announcement-title" className={modalStyles.modalTitle}>Create announcement</h2>
            <p className={modalStyles.modalCopy}>Build the post, pick the audience, then choose how it goes out.</p>
          </div>
        </div>

        <div className={styles.stepper} aria-label="Announcement steps">
          {STEPS.map((item, index) => (
            <button key={item.value} type="button" className={`${styles.stepPill} ${step === item.value ? styles.stepPillActive : ''}`} disabled={!canMoveToStep(index)} onClick={() => { if (canMoveToStep(index)) { setError(null); setStep(item.value); } }}>
              <span>{index + 1}</span>{item.label}
            </button>
          ))}
        </div>

        <div className={styles.composerShell}>
          <section className={styles.composerMain}>
            {step === 'content' && <ContentStep title={title} setTitle={setTitle} description={description} setDescription={setDescription} imageUrl={imageUrl} imageName={imageName} handleImageChange={handleImageChange} removeImage={removeImage} />}
            {step === 'audience' && <AudienceStep type={type} setType={setType} audienceMode={audienceMode} setAudienceMode={setAudienceMode} selectedClasses={selectedClasses} setSelectedClasses={setSelectedClasses} classSearch={classSearch} setClassSearch={setClassSearch} includeParents={includeParents} setIncludeParents={setIncludeParents} classrooms={classrooms} dropdownOpen={dropdownOpen} setDropdownOpen={setDropdownOpen} dropdownRef={dropdownRef} dropdownId={dropdownId} dropdownLabel={dropdownLabel} filteredClassrooms={filteredClassrooms} toggleClass={toggleClass} />}
            {step === 'delivery' && <DeliveryStep publishMode={publishMode} setPublishMode={setPublishMode} scheduledAt={scheduledAt} setScheduledAt={setScheduledAt} scheduledTime={scheduledTime} setScheduledTime={setScheduledTime} minScheduleDate={minScheduleDate} pinned={pinned} setPinned={setPinned} />}
          </section>

          <aside className={styles.composerPreview} aria-label="Announcement preview">
            <span className={styles.previewLabel}>Preview</span>
            {imageUrl ? <img src={imageUrl} alt={imageName || 'Announcement image'} className={styles.previewImage} /> : <div className={styles.previewImageEmpty}>Image</div>}
            <h3>{title.trim() || 'Announcement title'}</h3>
            <p>{description.trim() || 'Your message preview will appear here.'}</p>
            <dl>
              <div><dt>Type</dt><dd>{type}</dd></div>
              <div><dt>Audience</dt><dd>{audienceMode === 'all' ? 'All Classes' : dropdownLabel}</dd></div>
              <div><dt>Delivery</dt><dd>{publishMode === 'schedule' && scheduledAt ? formatSchedulePreview(scheduledAt, scheduledTime) : PUBLISH_MODES.find((m) => m.value === publishMode)?.label}</dd></div>
            </dl>
          </aside>
        </div>

        {error ? <p className={modalStyles.modalError}>{error}</p> : null}

        <div className={styles.stepActions}>
          <button type="button" className={listStyles.secondaryBtn} onClick={onCancel}>Cancel</button>
          <div className={styles.stepNavActions}>
            {stepIndex > 0 && <button type="button" className={listStyles.secondaryBtn} onClick={goToPreviousStep}>Back</button>}
            {isLastStep
              ? <button type="button" className={listStyles.primaryBtn} onClick={handleCreate}>{submitLabel}</button>
              : <button type="button" className={listStyles.primaryBtn} onClick={(e) => { e.preventDefault(); e.stopPropagation(); goToNextStep(); }}>Continue</button>
            }
          </div>
        </div>
      </form>
    </div>
  );
}
