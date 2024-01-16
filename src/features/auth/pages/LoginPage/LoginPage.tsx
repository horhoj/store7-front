import { AuthLayout } from '../../../AuthLayout';
import { authSlice } from '../../store/authSlice';
import { useAuthRedirect } from '../../hooks/useAuthRedirect';
import styles from './LoginPage.module.scss';
import { Button } from '~/ui/Button';
import { useAppDispatch } from '~/store/hooks';
import { Input } from '~/ui/Input';

export function LoginPage() {
  const dispatch = useAppDispatch();
  const { authRedirect } = useAuthRedirect();

  const handleAuth = () => {
    dispatch(
      authSlice.thunks.loginThunk({
        successCb: authRedirect,
      }),
    );
  };

  return (
    <AuthLayout>
      <form className={styles.form}>
        <div>
          <Button onClick={handleAuth}>isAuth</Button>
        </div>
        <div>
          <Input isError={true} type={'password'} />
        </div>
        <div>
          <Input isError={false} />
        </div>
      </form>
    </AuthLayout>
  );
}
