import { useForm } from '@shared/lib/hooks/form';
import { Button, Form } from '@shared/index';
import { ROUTER_PATHS } from '@shared/lib/react-router/config';
import { useNavigate } from 'react-router-dom';
import { IResetPasswordFormProps } from './reset-password-form.types';
import {
  resetPasswordFormDefaultValues,
  resetPasswordFormSchema,
} from './constants/reset-password.constants';
import { PasswordField } from '@entities/PasswordField';

import styles from './reset-password-form-styles.module.css';

export const ResetPasswordForm = ({
  handleSubmit,
  isDisabledSubmitBtn = false,
}: IResetPasswordFormProps) => {
  const navigate = useNavigate();

  const {
    values,
    handleSubmit: onSubmit,
    handleBlur,
    handleChange,
    errors,
    clearValues,
  } = useForm({
    callback: (
      data: Pick<typeof resetPasswordFormDefaultValues, 'newPassword'>
    ) => {
      handleSubmit(data);
      clearValues(resetPasswordFormDefaultValues);
    },
    schema: resetPasswordFormSchema,
    initialValues: resetPasswordFormDefaultValues,
  }) as any;

  return (
    <Form className={styles.form} onSubmit={onSubmit}>
      <h2 className={styles.form__title}>Create new Password?</h2>
      <div className={styles.inputs}>
        <PasswordField
          name="newPassword"
          value={values.newPassword}
          placeholder="Your new password"
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors['newPassword']}
          labelOptions={{
            text: 'New password',
            position: 'top',
          }}
        />

        <PasswordField
          name="confirmPassword"
          value={values['confirmPassword']}
          placeholder="Confirm your password"
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors['confirmPassword']}
          labelOptions={{
            text: 'Confirm password',
            position: 'top',
          }}
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
