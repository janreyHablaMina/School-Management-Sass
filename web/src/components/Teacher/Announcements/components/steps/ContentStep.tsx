'use client';

import React from 'react';
import { modalStyles } from '@/components/ui/shared';
import styles from '../../announcements.module.css';

export const IMAGE_ACCEPT = 'image/jpeg,image/png,image/webp,image/gif';

interface ContentStepProps {
  title: string;
  setTitle: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  imageUrl: string;
  imageName: string;
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeImage: () => void;
}

export function ContentStep({
  title,
  setTitle,
  description,
  setDescription,
  imageUrl,
  imageName,
  handleImageChange,
  removeImage,
}: ContentStepProps) {
  return (
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
  );
}
