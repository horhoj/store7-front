import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import styles from './LeftMenuLink.module.scss';

interface LeftMenuLinkProps {
  children?: React.ReactNode;
  to: string;
}
export function LeftMenuLink({ children, to }: LeftMenuLinkProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        classNames(styles.LeftMenuLink, isActive && styles.linkActive)
      }
    >
      {children}
    </NavLink>
  );
}
