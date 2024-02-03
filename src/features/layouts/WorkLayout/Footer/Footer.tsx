import styles from './Footer.module.scss';

export function Footer() {
  return (
    <footer className={styles.Footer}>
      Авторское право © {new Date().getFullYear()} cool29horhoj. Все права
      защищены.
    </footer>
  );
}
