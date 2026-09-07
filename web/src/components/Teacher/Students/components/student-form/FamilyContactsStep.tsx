import React from 'react';
import type { StudentProfileFormInput } from '@/types/teacherStudents';
import { modalStyles } from '../../../shared';
import { emptyGuardianInput } from '../../studentForm';
import styles from '../../students.module.css';

interface FamilyContactsStepProps {
  values: StudentProfileFormInput;
  errors: Record<string, string>;
  patch: <K extends keyof StudentProfileFormInput>(key: K, val: StudentProfileFormInput[K]) => void;
  setValues: React.Dispatch<React.SetStateAction<StudentProfileFormInput>>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  updateGuardian: (index: number, field: keyof ReturnType<typeof emptyGuardianInput>, val: string) => void;
}

export function FamilyContactsStep({
  values,
  errors,
  patch,
  setValues,
  setErrors,
  updateGuardian,
}: FamilyContactsStepProps) {
  return (
    <>
      {values.guardians.map((guardian, index) => (
        <div key={`guardian-${index}`} className={styles.editGuardianBlock}>
          <p className={styles.editGuardianLabel}>
            {index === 0 ? 'Primary guardian' : `Guardian ${index + 1}`}
          </p>
          <div className={styles.formGrid}>
            <label className={modalStyles.modalField}>
              <span className={modalStyles.modalLabel}>
                Name{index === 0 ? <span className={modalStyles.requiredMark}>*</span> : null}
              </span>
              <input
                className={`${modalStyles.modalInput} ${errors[`guardian${index}.name`] ? modalStyles.fieldError : ''}`}
                type="text"
                value={guardian.name}
                onChange={(e) => updateGuardian(index, 'name', e.target.value)}
                placeholder="Guardian full name"
                maxLength={80}
              />
              {errors[`guardian${index}.name`] ? <span className={modalStyles.inlineError}>{errors[`guardian${index}.name`]}</span> : null}
            </label>
            <label className={modalStyles.modalField}>
              <span className={modalStyles.modalLabel}>Relationship</span>
              <input
                className={modalStyles.modalInput}
                type="text"
                value={guardian.relationship}
                onChange={(e) => updateGuardian(index, 'relationship', e.target.value)}
                placeholder="Father, Mother, Guardian…"
                maxLength={40}
              />
            </label>
          </div>
          <div className={styles.formGrid}>
            <label className={modalStyles.modalField}>
              <span className={modalStyles.modalLabel}>
                Contact number{index === 0 ? <span className={modalStyles.requiredMark}>*</span> : null}
              </span>
              <input
                className={`${modalStyles.modalInput} ${errors[`guardian${index}.phone`] ? modalStyles.fieldError : ''}`}
                type="tel"
                value={guardian.phone}
                onChange={(e) => updateGuardian(index, 'phone', e.target.value.replace(/\D/g, ''))}
                placeholder="09XX XXX XXXX"
                maxLength={11}
              />
              {errors[`guardian${index}.phone`] ? <span className={modalStyles.inlineError}>{errors[`guardian${index}.phone`]}</span> : null}
            </label>
            <label className={modalStyles.modalField}>
              <span className={modalStyles.modalLabel}>Email</span>
              <input
                className={`${modalStyles.modalInput} ${errors[`guardian${index}.email`] ? modalStyles.fieldError : ''}`}
                type="email"
                value={guardian.email}
                onChange={(e) => updateGuardian(index, 'email', e.target.value)}
                onBlur={() => {
                  if (guardian.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guardian.email)) {
                    setErrors((prev) => ({ ...prev, [`guardian${index}.email`]: index === 0 ? 'Enter a valid primary guardian email.' : `Enter a valid email for guardian ${index + 1}.` }));
                  } else {
                    setErrors((prev) => {
                      const next = { ...prev };
                      delete next[`guardian${index}.email`];
                      return next;
                    });
                  }
                }}
                placeholder="parent@email.com"
                maxLength={80}
              />
              {errors[`guardian${index}.email`] ? <span className={modalStyles.inlineError}>{errors[`guardian${index}.email`]}</span> : null}
            </label>
          </div>
          <label className={modalStyles.modalField}>
            <span className={modalStyles.modalLabel}>Occupation</span>
            <input
              className={modalStyles.modalInput}
              type="text"
              value={guardian.occupation}
              onChange={(e) => updateGuardian(index, 'occupation', e.target.value)}
              placeholder="Optional"
              maxLength={60}
            />
          </label>
        </div>
      ))}

      {values.guardians.length < 3 ? (
        <button
          type="button"
          className={styles.editAddGuardian}
          onClick={() =>
            setValues((prev) => ({
              ...prev,
              guardians: [...prev.guardians, emptyGuardianInput()],
            }))
          }
        >
          + Add another guardian
        </button>
      ) : null}

      <p className={styles.editSectionTitle}>Emergency contact</p>

      <div className={styles.formGrid}>
        <label className={modalStyles.modalField}>
          <span className={modalStyles.modalLabel}>
            Name<span className={modalStyles.requiredMark}>*</span>
          </span>
          <input
            className={`${modalStyles.modalInput} ${errors['emergencyContact.name'] ? modalStyles.fieldError : ''}`}
            type="text"
            value={values.emergencyContact.name}
            onChange={(e) =>
              patch('emergencyContact', {
                ...values.emergencyContact,
                name: e.target.value,
              })
            }
            placeholder="Emergency contact name"
            maxLength={80}
          />
          {errors['emergencyContact.name'] ? <span className={modalStyles.inlineError}>{errors['emergencyContact.name']}</span> : null}
        </label>
        <label className={modalStyles.modalField}>
          <span className={modalStyles.modalLabel}>Relationship</span>
          <input
            className={modalStyles.modalInput}
            type="text"
            value={values.emergencyContact.relationship}
            onChange={(e) =>
              patch('emergencyContact', {
                ...values.emergencyContact,
                relationship: e.target.value,
              })
            }
            placeholder="Father, Aunt…"
            maxLength={40}
          />
        </label>
      </div>

      <label className={modalStyles.modalField}>
        <span className={modalStyles.modalLabel}>
          Contact number<span className={modalStyles.requiredMark}>*</span>
        </span>
        <input
          className={`${modalStyles.modalInput} ${errors['emergencyContact.phone'] ? modalStyles.fieldError : ''}`}
          type="tel"
          value={values.emergencyContact.phone}
          onChange={(e) =>
            patch('emergencyContact', {
              ...values.emergencyContact,
              phone: e.target.value.replace(/\D/g, ''),
            })
          }
          placeholder="09XX XXX XXXX"
          maxLength={11}
        />
        {errors['emergencyContact.phone'] ? <span className={modalStyles.inlineError}>{errors['emergencyContact.phone']}</span> : null}
      </label>
    </>
  );
}
