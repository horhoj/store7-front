import { Fragment, useState } from 'react';
import { useMediaQuery } from '@uidotdev/usehooks';
import classNames from 'classnames';
import { Drawer } from '../../ui/Drawer';
import { LeftMenu } from './LeftMenu';
import styles from './WorkLayout.module.scss';
import { LeftMenuContent } from './LeftMenuContent';
import { Logo } from './Logo';
import { Header } from './Header';
import { Footer } from './Footer';

interface WorkLayoutProps {
  children?: React.ReactNode;
}

export function WorkLayout({ children }: WorkLayoutProps) {
  const [isOpen, setIsOpen] = useState(true);
  const isMobile = useMediaQuery('only screen and (max-width: 1200px)');

  const handleMenuButtonClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {isMobile && (
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <Header>
            <Logo onMenuBtnClick={handleMenuButtonClick} />
          </Header>
          <LeftMenuContent />
        </Drawer>
      )}
      <div className={styles.WorkLayout}>
        <Header>
          <Logo onMenuBtnClick={handleMenuButtonClick} />
        </Header>
        <div className={styles.content}>
          <div className={styles.nav}>
            {!isMobile && (
              <LeftMenu isOpen={isOpen}>
                <LeftMenuContent />
              </LeftMenu>
            )}
          </div>
          <main className={styles.main}>{children}</main>
        </div>
        <Footer />
      </div>
    </>
  );
}