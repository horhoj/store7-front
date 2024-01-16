import styles from './Header.module.scss';

interface HeaderProps {
  children?: React.ReactNode;
}
export function Header({ children }: HeaderProps) {
  return <div className={styles.Header}>{children}</div>;
}
