import { CSSTransition } from 'react-transition-group';
import { ReactNode, useRef } from 'react';
import styles from './LeftMenu.module.scss';

interface LeftMenuProps {
  isOpen: boolean;
  children?: ReactNode;
}
export function LeftMenu({ isOpen, children }: LeftMenuProps) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <CSSTransition
      in={isOpen}
      nodeRef={ref}
      timeout={300}
      unmountOnExit
      classNames={{
        enter: styles.enter,
        enterActive: styles.enterActive,
        exit: styles.exit,
        exitActive: styles.exitActive,
      }}
    >
      <div className={styles.LeftMenu} ref={ref}>
        {children}
      </div>
    </CSSTransition>
  );
}
