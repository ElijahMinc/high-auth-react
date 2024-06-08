import { IForgotPasswordFormProps } from './forgot-password-form.types';
import {
  forgotPasswordFormDefaultValues,
  forgotPasswordFormSchema,
} from './constants/forgot-password.constants';

import { useForm } from '@shared/lib/hooks/form';
import { Button, Form, Input } from '@shared/index';
import { ROUTER_PATHS } from '@shared/lib/react-router/config';
import { AuthRequest } from '@entities/Auth/api/auth.types';
import { useNavigate } from 'react-router-dom';

import styles from './forgot-password-form-styles.module.css';

export const ForgotPasswordForm = ({
  handleSubmit,
  isDisabledSubmitBtn = false,
}: IForgotPasswordFormProps) => {
  const navigate = useNavigate();

  const {
    values,
    handleSubmit: onSubmit,
    handleBlur,
    handleChange,
    errors,
    clearValues,
  } = useForm({
    callback: (data: { email: AuthRequest['email'] }) => {
      handleSubmit(data);
      clearValues(forgotPasswordFormDefaultValues);
    },
    schema: forgotPasswordFormSchema,
    initialValues: forgotPasswordFormDefaultValues,
  }) as any;

  return (
    <Form className={styles.form} onSubmit={onSubmit}>
      <h2 className={styles.form__title}>Forgot Password?</h2>
      <div className={styles.inputs}>
        <Input
          name="email"
          type="input"
          value={values.email}
          placeholder="Work email"
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors['email']}
        />
      </div>

      <div className={styles.btns}>
        <Button
          type="submit"
          className={styles.submitBtn}
          disabled={isDisabledSubmitBtn}
          appearance="primary"
        >
          Send
        </Button>

        <Button type="button" onClick={() => navigate(`/${ROUTER_PATHS.AUTH}`)}>
          Cancel
        </Button>
      </div>
    </Form>
  );
};
