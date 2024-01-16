import classNames from 'classnames';
import styles from './LeftMenuContent.module.scss';
import { LeftMenuLink } from './LeftMenuLink';
import { routes } from '~/router/routes';

export function LeftMenuContent() {
  return (
    <nav className={classNames(styles.LeftMenuContent)}>
      <LeftMenuLink to={routes.PRODUCT_LIST}>Товары</LeftMenuLink>
      <LeftMenuLink to={routes.CATEGORY_LIST}>Категории</LeftMenuLink>
      <LeftMenuLink to={routes.LOGIN}>Логин</LeftMenuLink>
    </nav>
  );
}
