import styles from './AuthLayout.module.scss';
import { ThemeSwitchWidget } from '~/features/ThemeSwitch/ThemeSwitchWidget';

interface AuthLayoutProps {
  children?: React.ReactNode;
}
export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className={styles.AuthLayout}>
      <div>
        <ThemeSwitchWidget />
      </div>
      <div>{children}</div>
    </div>
  );
}
