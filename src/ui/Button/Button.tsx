import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode | string;
  isIcon?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, isIcon = false, ...props }, ref) => {
    return (
      <button
        {...props}
        className={classNames(
          styles.Button,
          className,
          isIcon && styles.isIcon,
        )}
        ref={ref}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
