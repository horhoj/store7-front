import styles from './Footer.module.scss';

interface FooterProps {
  children?: React.ReactNode;
}
export function Footer({ children }: FooterProps) {
  return (
    <div className={styles.Footer}>
      Авторское право © {new Date().getFullYear()} cool29horhoj. Все права
      защищены.
    </div>
  );
}
