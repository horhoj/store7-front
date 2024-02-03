import styles from './UserWidget.module.scss';
import { useAppSelector } from '~/store/hooks';
import { Button } from '~/ui/Button';

export function UserWidget() {
  const userData = useAppSelector((state) => state.auth.userData);

  return <Button>{userData?.email ?? 'unknown'}</Button>;
}
