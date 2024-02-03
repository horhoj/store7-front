import { useFormik } from 'formik';
import * as yup from 'yup';
import { useEffect } from 'react';
import { AuthLayout } from '../../../layouts/AuthLayout';
import { authSlice } from '../../store/authSlice';
import { useAuthRedirect } from '../../hooks/useAuthRedirect';
import { Button } from '~/ui/Button';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { Input } from '~/ui/Input';
import { Form } from '~/ui/Form';
import { FormField } from '~/ui/FormField';
import { getFormikFieldData } from '~/utils/getFormikFieldData';
import { Spinner } from '~/ui/Spinner';
import { Link } from '~/ui/Link';
import { routes } from '~/router/routes';
import { FormResponseErrors } from '~/ui/FormResponseErrors';
import { FormTitle } from '~/ui/FormTitle';

interface InitialValues {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const initialValues: InitialValues = {
  name: 'xx001',
  email: 'x@x001',
  password: '12345678',
  password_confirmation: '12345678',
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
  password_confirmation: yup
    .string()
    .required(VALIDATION_IS_EMPTY_MSG)
    .oneOf([yup.ref('password'), ''], VALIDATION_PASSWORD_MUST_MATCH),
});

export function RegisterPage() {
  const dispatch = useAppDispatch();
  useAuthRedirect();
  const formik = useFormik<InitialValues>({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      dispatch(
        authSlice.thunks.registerThunk({
          registerPayload: values,
        }),
      );
    },
  });

  const registrationRequest = useAppSelector(
    (state) => state.auth.registrationRequest,
  );

  useEffect(
    () => () => {
      dispatch(authSlice.actions.registrationRequestClear());
    },
    [],
  );

  const nameFieldData = getFormikFieldData(formik, 'name');
  const emailFieldData = getFormikFieldData(formik, 'email');
  const passwordFieldData = getFormikFieldData(formik, 'password');
  const passwordConfirmFieldData = getFormikFieldData(
    formik,
    'password_confirmation',
  );

  return (
    <>
      <Spinner isShow={registrationRequest.isLoading} />
      <AuthLayout>
        <Form onSubmit={formik.handleSubmit} noValidate autoComplete={'off'}>
          <FormTitle>Регистрация</FormTitle>
          {registrationRequest.error && (
            <FormResponseErrors
              responseErrors={registrationRequest.error}
              title={'Ошибка запроса на регистрацию'}
            />
          )}
          <FormField title={'name'} error={nameFieldData.errorText}>
            <Input
              {...nameFieldData.fieldProps}
              placeholder={'имя...'}
              isError={nameFieldData.isError}
              disabled={registrationRequest.isLoading}
            />
          </FormField>

          <FormField title={'email'} error={emailFieldData.errorText}>
            <Input
              {...emailFieldData.fieldProps}
              placeholder={'почта...'}
              isError={emailFieldData.isError}
              disabled={registrationRequest.isLoading}
            />
          </FormField>

          <FormField title={'Пароль'} error={passwordFieldData.errorText}>
            <Input
              {...passwordFieldData.fieldProps}
              placeholder={'пароль...'}
              isError={passwordFieldData.isError}
              type={'password'}
              disabled={registrationRequest.isLoading}
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
              disabled={registrationRequest.isLoading}
            />
          </FormField>

          <Button type={'submit'}>Submit</Button>
          <div>
            Уже есть аккаунт? <Link to={routes.LOGIN}>Войти</Link>
          </div>
        </Form>
      </AuthLayout>
    </>
  );
}
