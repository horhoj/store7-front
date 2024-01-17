import { useFormik } from 'formik';
import * as yup from 'yup';
import { AuthLayout } from '../../../AuthLayout';
import { authSlice } from '../../store/authSlice';
import { useAuthRedirect } from '../../hooks/useAuthRedirect';
import styles from './LoginPage.module.scss';
import { Button } from '~/ui/Button';
import { useAppDispatch } from '~/store/hooks';
import { Input } from '~/ui/Input';
import { Form } from '~/ui/Form';
import { FormField } from '~/ui/FormField';
import { getFormikFieldData } from '~/utils/getFormikFieldData';

interface InitialValues {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const initialValues: InitialValues = {
  name: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

const VALIDATION_IS_EMPTY_MSG = 'Не должно быть пустым';
const VALIDATION_IS_NOT_EMAIL_MSG = 'Не почта';
const VALIDATION_PASSWORD_MUST_MATCH = 'Пароль и подтверждение не совпадают';
const VALIDATION_PASSWORD_MUST_MIN =
  'Пароль должен содержать минимум 8 символов';

const validationSchema: yup.ObjectSchema<InitialValues> = yup.object({
  name: yup.string().required(VALIDATION_IS_EMPTY_MSG),
  email: yup
    .string()
    .required(VALIDATION_IS_EMPTY_MSG)
    .email(VALIDATION_IS_NOT_EMAIL_MSG),
  password: yup
    .string()
    .required(VALIDATION_IS_EMPTY_MSG)
    .min(8, VALIDATION_PASSWORD_MUST_MIN),
  passwordConfirm: yup
    .string()
    .required(VALIDATION_IS_EMPTY_MSG)
    .oneOf([yup.ref('password'), ''], VALIDATION_PASSWORD_MUST_MATCH),
});

export function RegisterPage() {
  const dispatch = useAppDispatch();
  const { authRedirect } = useAuthRedirect();
  const formik = useFormik<InitialValues>({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleAuth = () => {
    // dispatch(
    //   authSlice.thunks.loginThunk({
    //     successCb: authRedirect,
    //   }),
    // );
  };

  const nameFieldData = getFormikFieldData(formik, 'name');
  const emailFieldData = getFormikFieldData(formik, 'email');
  const passwordFieldData = getFormikFieldData(formik, 'password');
  const passwordConfirmFieldData = getFormikFieldData(
    formik,
    'passwordConfirm',
  );

  return (
    <AuthLayout>
      <Form onSubmit={formik.handleSubmit} noValidate autoComplete={'off'}>
        <div>
          <Button onClick={handleAuth}>isAuth</Button>
        </div>
        <FormField title={'name'} error={nameFieldData.errorText}>
          <Input
            {...nameFieldData.fieldProps}
            placeholder={'имя...'}
            isError={nameFieldData.isError}
          />
        </FormField>

        <FormField title={'email'} error={emailFieldData.errorText}>
          <Input
            {...emailFieldData.fieldProps}
            placeholder={'почта...'}
            isError={emailFieldData.isError}
          />
        </FormField>

        <FormField title={'Пароль'} error={passwordFieldData.errorText}>
          <Input
            {...passwordFieldData.fieldProps}
            placeholder={'пароль...'}
            isError={passwordFieldData.isError}
            type={'password'}
          />
        </FormField>

        <FormField
          title={'Подтверждение пароля'}
          error={passwordConfirmFieldData.errorText}
        >
          <Input
            {...passwordConfirmFieldData.fieldProps}
            placeholder={'подтверждение пароля...'}
            isError={passwordConfirmFieldData.isError}
            type={'password'}
          />
        </FormField>

        <Button type={'submit'}>Submit</Button>
      </Form>
    </AuthLayout>
  );
}
