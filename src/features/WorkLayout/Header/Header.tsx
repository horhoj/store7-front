import styles from './Header.module.scss';

interface HeaderProps {
  children?: React.ReactNode;
}
export function Header({ children }: HeaderProps) {
  return <header className={styles.Header}>{children}</header>;
}
