import styles from './FormField.module.scss';

interface FormFieldProps {
  children?: React.ReactNode;
  title?: string;
  error?: string;
}
export function FormField({ children, title, error }: FormFieldProps) {
  return (
    <div className={styles.FormField}>
      {title && <label className={styles.label}>{title}</label>}
      <div className={styles.children}>{children}</div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
