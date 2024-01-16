import classNames from 'classnames';
import styles from './Logo.module.scss';
import { TestIcon } from '~/assets/icons';

interface LogoProps {
  onMenuBtnClick: () => void;
}
export function Logo({ onMenuBtnClick }: LogoProps) {
  return (
    <div className={classNames(styles.Logo)}>
      <button onClick={onMenuBtnClick} className={styles.menuButton}>
        <TestIcon />
      </button>
      <div>Logo</div>
    </div>
  );
}
