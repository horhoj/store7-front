import classNames from 'classnames';
import styles from './Logo.module.scss';
import { TestIcon } from '~/assets/icons';
import { Button } from '~/ui/Button';

interface LogoProps {
  onMenuBtnClick: () => void;
}
export function Logo({ onMenuBtnClick }: LogoProps) {
  return (
    <div className={classNames(styles.Logo)}>
      <Button
        isIcon={true}
        onClick={onMenuBtnClick}
        className={styles.menuButton}
      >
        <TestIcon />
      </Button>
      <div>Logo</div>
    </div>
  );
}
