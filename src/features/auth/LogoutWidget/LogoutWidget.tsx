import { authSlice } from '../store/authSlice';
import { useAppDispatch } from '~/store/hooks';
import { Button } from '~/ui/Button';

export function LogoutWidget() {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(authSlice.actions.setIsAuth(false));
  };

  return <Button onClick={handleLogout}>Exit</Button>;
}
