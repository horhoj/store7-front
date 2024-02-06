import styles from './AuthLayout.module.scss';
import { ThemeSwitchWidget } from '~/features/settings/widgets/ThemeSwitchWidget';

interface AuthLayoutProps {
  children?: React.ReactNode;
}
export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className={styles.authLayoutWrapper}>
      <div className={styles.AuthLayout}>
        <div className={styles.header}>
          <ThemeSwitchWidget />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
