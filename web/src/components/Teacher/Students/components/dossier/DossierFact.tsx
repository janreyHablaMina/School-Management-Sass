import styles from '../../students.module.css';

export function DossierFact({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.dossierFact}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
