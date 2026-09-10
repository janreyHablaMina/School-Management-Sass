'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import { DatePicker } from '@/components/ui/DatePicker';
import { TimePicker } from '@/components/ui/TimePicker';
import { listStyles, modalStyles, useLockWorkspaceScroll } from '../../shared';
import type {
  AnnouncementPublishMode,
  AnnouncementType,
  CreateAnnouncementInput,
} from '@/types/teacherAnnouncements';
import styles from '../announcements.module.css';

interface CreateAnnouncementModalProps {
  classrooms: string[];
  onCancel: () => void;
  onCreate: (input: CreateAnnouncementInput) => void;
}

type AudienceMode = 'all' | 'selected';
type ModalStep = 'content' | 'audience' | 'delivery';

const TYPES: AnnouncementType[] = ['General', 'Reminder', 'Event', 'Urgent'];
const IMAGE_ACCEPT = 'image/jpeg,image/png,image/webp,image/gif';
const IMAGE_MAX_BYTES = 3 * 1024 * 1024;
const STEPS: Array<{ value: ModalStep; label: string }> = [
  { value: 'content', label: 'Content' },
  { value: 'audience', label: 'Audience' },
  { value: 'delivery', label: 'Delivery' },
];

const PUBLISH_MODES: Array<{ value: AnnouncementPublishMode; label: string }> = [
  { value: 'publish', label: 'Publish now' },
  { value: 'draft', label: 'Save draft' },
  { value: 'schedule', label: 'Auto-send later' },
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

  return date.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function readAnnouncementImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Choose a JPG, PNG, WEBP, or GIF image.'));
      return;
    }
    if (file.size > IMAGE_MAX_BYTES) {
      reject(new Error('Image must be 3 MB or smaller.'));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') resolve(reader.result);
      else reject(new Error('Could not read that image.'));
    };
    reader.onerror = () => reject(new Error('Could not read that image.'));
    reader.readAsDataURL(file);
  });
}

export function CreateAnnouncementModal({
  classrooms,
  onCancel,
  onCreate,
}: CreateAnnouncementModalProps) {
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
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [dropdownOpen]);

  const toggleClass = (classroom: string) => {
    setSelectedClasses((prev) =>
      prev.includes(classroom) ? prev.filter((c) => c !== classroom) : [...prev, classroom],
    );
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    try {
      const nextImageUrl = await readAnnouncementImage(file);
      setImageUrl(nextImageUrl);
      setImageName(file.name);
      setError(null);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : 'Could not attach image.');
    }
  };

  const removeImage = () => {
    setImageUrl('');
    setImageName('');
  };

  const dropdownLabel =
    selectedClasses.length === 0
      ? 'Select classrooms'
      : selectedClasses.length === 1
        ? selectedClasses[0]
        : selectedClasses.length === classrooms.length
          ? 'All listed classrooms'
          : `${selectedClasses.length} classrooms selected`;
  const filteredClassrooms = classrooms.filter((classroom) =>
    classroom.toLowerCase().includes(classSearch.trim().toLowerCase()),
  );

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
    if (targetStep === 'audience' && !allClasses && selectedClasses.length === 0 && !includeParents) {
      return 'Select at least one classroom, or include Parents.';
    }
    if (targetStep === 'delivery') {
      if (publishMode === 'schedule' && !scheduledAt) return 'Pick a date for auto-send.';
      if (publishMode === 'schedule' && !scheduledTime) return 'Pick a time for auto-send.';
    }

    return null;
  };

  const canMoveToStep = (targetIndex: number) => {
    if (targetIndex <= 0) return true;
    return validateStep('content') === null;
  };

  const goToNextStep = () => {
    const nextError = validateStep(step);
    if (nextError) {
      setError(nextError);
      return;
    }

    setError(null);
    setStep(STEPS[Math.min(stepIndex + 1, STEPS.length - 1)].value);
  };

  const goToPreviousStep = () => {
    setError(null);
    setStep(STEPS[Math.max(stepIndex - 1, 0)].value);
  };

  const handleCreate = () => {
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();
    const allClasses = audienceMode === 'all';
    const contentError = validateStep('content');
    const audienceError = validateStep('audience');
    const deliveryError = validateStep('delivery');

    if (contentError || audienceError || deliveryError) {
      setError(contentError ?? audienceError ?? deliveryError);
      if (contentError) setStep('content');
      else if (audienceError) setStep('audience');
      else setStep('delivery');
      return;
    }

    onCreate({
      title: trimmedTitle,
      description: trimmedDescription,
      type,
      classrooms: allClasses ? [] : selectedClasses,
      includeParents,
      allClasses,
      pinned,
      publishMode,
      scheduledAt: publishMode === 'schedule' ? scheduledAt : undefined,
      scheduledTime: publishMode === 'schedule' ? scheduledTime : undefined,
      imageUrl: imageUrl || undefined,
      imageName: imageName || undefined,
    });
  };

  const submitLabel =
    publishMode === 'publish'
      ? 'Publish announcement'
      : publishMode === 'schedule'
        ? 'Schedule announcement'
        : 'Save draft';

  return (
    <div
      className={modalStyles.modalOverlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-announcement-title"
    >
      <form
        className={`${modalStyles.modalCard} ${modalStyles.modalCardWide} ${styles.announcementComposer}`}
        onSubmit={(event) => event.preventDefault()}
      >
        <div className={styles.composerHeader}>
          <div>
            <p className={modalStyles.modalEyebrow}>New announcement</p>
            <h2 id="create-announcement-title" className={modalStyles.modalTitle}>
              Create announcement
            </h2>
            <p className={modalStyles.modalCopy}>
              Build the post, pick the audience, then choose how it goes out.
            </p>
          </div>
        </div>

        <div className={styles.stepper} aria-label="Announcement steps">
          {STEPS.map((item, index) => (
            <button
              key={item.value}
              type="button"
              className={`${styles.stepPill} ${step === item.value ? styles.stepPillActive : ''}`}
              disabled={!canMoveToStep(index)}
              onClick={() => {
                if (canMoveToStep(index)) {
                  setError(null);
                  setStep(item.value);
                }
              }}
            >
              <span>{index + 1}</span>
              {item.label}
            </button>
          ))}
        </div>

        <div className={styles.composerShell}>
          <section className={styles.composerMain}>
            {step === 'content' ? (
              <>
                <label className={modalStyles.modalField}>
                  <span className={modalStyles.modalLabel}>Title</span>
                  <input
                    className={modalStyles.modalInput}
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Quiz in Mathematics"
                    maxLength={120}
                  />
                </label>

                <label className={modalStyles.modalField}>
                  <span className={modalStyles.modalLabel}>Message</span>
                  <textarea
                    className={modalStyles.modalTextarea}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="What should students or parents know?"
                    rows={6}
                    maxLength={500}
                  />
                </label>

                <div className={styles.imagePanel}>
                  <div className={styles.imagePreview}>
                    {imageUrl ? (
                      <img src={imageUrl} alt={imageName || 'Announcement image preview'} />
                    ) : (
                      <span aria-hidden>IMG</span>
                    )}
                  </div>
                  <div className={styles.imageUploadBody}>
                    <span className={modalStyles.modalLabel}>Image</span>
                    <p className={styles.imageUploadCopy}>
                      Add an optional poster or photo for this announcement.
                    </p>
                    <div className={styles.imageActions}>
                      <label className={styles.imageUploadBtn}>
                        Upload image
                        <input
                          type="file"
                          accept={IMAGE_ACCEPT}
                          onChange={handleImageChange}
                        />
                      </label>
                      {imageUrl ? (
                        <button
                          type="button"
                          className={styles.imageRemoveBtn}
                          onClick={removeImage}
                        >
                          Remove
                        </button>
                      ) : null}
                    </div>
                    {imageName ? <span className={styles.imageName}>{imageName}</span> : null}
                  </div>
                </div>
              </>
            ) : null}

            {step === 'audience' ? (
              <>
                <div className={modalStyles.modalField}>
                  <span className={modalStyles.modalLabel}>Type</span>
                  <div className={modalStyles.chipRow}>
                    {TYPES.map((option) => (
                      <button
                        key={option}
                        type="button"
                        className={`${modalStyles.choiceChip} ${
                          type === option ? modalStyles.choiceChipActive : ''
                        }`}
                        onClick={() => setType(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={modalStyles.modalField}>
                  <span className={modalStyles.modalLabel}>Assign to classrooms</span>
                  <div className={styles.radioGroup} role="radiogroup" aria-label="Audience mode">
                    <label className={styles.radioOption}>
                      <input
                        type="radio"
                        name="audience-mode"
                        checked={audienceMode === 'all'}
                        onChange={() => {
                          setAudienceMode('all');
                          setSelectedClasses([]);
                          setDropdownOpen(false);
                        }}
                      />
                      <span>All Classes</span>
                    </label>
                    <label className={styles.radioOption}>
                      <input
                        type="radio"
                        name="audience-mode"
                        checked={audienceMode === 'selected'}
                        onChange={() => setAudienceMode('selected')}
                      />
                      <span>Select classrooms</span>
                    </label>
                  </div>

                  {audienceMode === 'selected' ? (
                    <div className={styles.dropdown} ref={dropdownRef}>
                      <button
                        type="button"
                        id={dropdownId}
                        className={styles.dropdownTrigger}
                        aria-haspopup="listbox"
                        aria-expanded={dropdownOpen}
                        onClick={() => setDropdownOpen((open) => !open)}
                      >
                        <span>{dropdownLabel}</span>
                        <span className={styles.dropdownCaret} aria-hidden />
                      </button>

                      {dropdownOpen ? (
                        <div
                        className={styles.dropdownMenu}
                        role="listbox"
                        aria-multiselectable="true"
                      >
                          <input
                            className={styles.classSearchInput}
                            type="search"
                            value={classSearch}
                            onChange={(e) => setClassSearch(e.target.value)}
                            placeholder="Search class..."
                            aria-label="Search classrooms"
                          />
                          {filteredClassrooms.length > 0 ? (
                            filteredClassrooms.map((classroom) => {
                            const checked = selectedClasses.includes(classroom);
                            return (
                              <label
                                key={classroom}
                                className={`${styles.dropdownOption} ${
                                  checked ? styles.dropdownOptionActive : ''
                                }`}
                                role="option"
                                aria-selected={checked}
                              >
                                <input
                                  type="checkbox"
                                  checked={checked}
                                  onChange={() => toggleClass(classroom)}
                                />
                                <span>{classroom}</span>
                              </label>
                            );
                            })
                          ) : (
                            <p className={styles.dropdownEmpty}>No classes found.</p>
                          )}
                        </div>
                      ) : null}
                    </div>
                  ) : null}

                  <label className={styles.parentsCheck}>
                    <input
                      type="checkbox"
                      checked={includeParents}
                      onChange={(e) => setIncludeParents(e.target.checked)}
                    />
                    <span>Also send to Parents</span>
                  </label>
                </div>
              </>
            ) : null}

            {step === 'delivery' ? (
              <>
                <div className={modalStyles.modalField}>
                  <span className={modalStyles.modalLabel}>When to send</span>
                  <div className={styles.deliveryGrid}>
                    {PUBLISH_MODES.map((mode) => (
                      <button
                        key={mode.value}
                        type="button"
                        className={`${styles.deliveryOption} ${
                          publishMode === mode.value ? styles.deliveryOptionActive : ''
                        }`}
                        onClick={() => setPublishMode(mode.value)}
                      >
                        <span>{mode.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {publishMode === 'schedule' ? (
                  <div className={styles.schedulePanel}>
                    <div>
                      <span className={styles.scheduleEyebrow}>Auto-send</span>
                      <p className={styles.scheduleCopy}>
                        The announcement will stay scheduled until this date and time.
                      </p>
                    </div>
                    <div className={styles.scheduleGrid}>
                      <label className={`${modalStyles.modalField} ${styles.scheduleField}`}>
                        <span className={modalStyles.modalLabel}>Send date</span>
                        <DatePicker
                          value={scheduledAt}
                          minDate={minScheduleDate}
                          onChange={setScheduledAt}
                        />
                      </label>
                      <label className={`${modalStyles.modalField} ${styles.scheduleField}`}>
                        <span className={modalStyles.modalLabel}>Send time</span>
                        <TimePicker
                          value={scheduledTime}
                          onChange={setScheduledTime}
                        />
                      </label>
                    </div>
                  </div>
                ) : null}

                <label className={styles.checkRow}>
                  <input
                    type="checkbox"
                    checked={pinned}
                    onChange={(e) => setPinned(e.target.checked)}
                  />
                  <span>Pin this announcement to the top</span>
                </label>
              </>
            ) : null}
          </section>

          <aside className={styles.composerPreview} aria-label="Announcement preview">
            <span className={styles.previewLabel}>Preview</span>
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={imageName || 'Announcement image'}
                className={styles.previewImage}
              />
            ) : (
              <div className={styles.previewImageEmpty}>Image</div>
            )}
            <h3>{title.trim() || 'Announcement title'}</h3>
            <p>{description.trim() || 'Your message preview will appear here.'}</p>
            <dl>
              <div>
                <dt>Type</dt>
                <dd>{type}</dd>
              </div>
              <div>
                <dt>Audience</dt>
                <dd>{audienceMode === 'all' ? 'All Classes' : dropdownLabel}</dd>
              </div>
              <div>
                <dt>Delivery</dt>
                <dd>
                  {publishMode === 'schedule' && scheduledAt
                    ? formatSchedulePreview(scheduledAt, scheduledTime)
                    : PUBLISH_MODES.find((mode) => mode.value === publishMode)?.label}
                </dd>
              </div>
            </dl>
          </aside>
        </div>

        {error ? <p className={modalStyles.modalError}>{error}</p> : null}

        <div className={styles.stepActions}>
          <button type="button" className={listStyles.secondaryBtn} onClick={onCancel}>
            Cancel
          </button>
          <div className={styles.stepNavActions}>
            {stepIndex > 0 ? (
              <button
                type="button"
                className={listStyles.secondaryBtn}
                onClick={goToPreviousStep}
              >
                Back
              </button>
            ) : null}
            {isLastStep ? (
              <button
                type="button"
                className={listStyles.primaryBtn}
                onClick={handleCreate}
              >
                {submitLabel}
              </button>
            ) : (
              <button
                type="button"
                className={listStyles.primaryBtn}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  goToNextStep();
                }}
              >
                Continue
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
