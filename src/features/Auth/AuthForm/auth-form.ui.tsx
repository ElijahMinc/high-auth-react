import { ISignInFormProps } from './auth-form.types';
import {
  signInFormDefaultValues,
  signInFormSchema,
} from './constants/auth-form.constants';

import { Link, useLocation } from 'react-router-dom';
import GithubIcon from '@shared/assets/github.svg';
import GoogleIcon from '@shared/assets/google.svg';
import { useForm } from '@shared/lib/hooks/form';
import { Button, Form, Input } from '@shared/index';
import { ROUTER_PATHS } from '@shared/lib/react-router/config';
import { AuthRequest } from '@entities/Auth/api/auth.types';
import { PasswordField } from '@entities/PasswordField';

import styles from './auth-form-styles.module.css';

export const AuthForm = ({
  handleSubmit,
  currentPage,
  isDisabledSubmitBtn = false,
}: ISignInFormProps) => {
  const location = useLocation();

  const {
    values,
    handleSubmit: onSubmit,
    handleBlur,
    handleChange,
    errors,
    clearValues,
  } = useForm({
    callback: (data: AuthRequest) => {
      handleSubmit(data);
      clearValues(signInFormDefaultValues);
    },
    schema: signInFormSchema,
    initialValues: signInFormDefaultValues,
  }) as any;

  const titleText =
    currentPage === 'signin' ? 'Sign in to your account' : 'Sign up an account';

  return (
    <Form className={styles.form} onSubmit={onSubmit}>
      <h2 className={styles.form__title}>{titleText}</h2>
      <div className={styles.form__signin}>
        <Button type="button">
          <img src={GoogleIcon} />
          Google
        </Button>
        <Button type="button">
          <img src={GithubIcon} />
          Github
        </Button>
      </div>
      <div className={styles.sep}>or</div>
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

        <PasswordField
          name="password"
          value={values.password}
          placeholder="Password"
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors['password']}
        />
      </div>
      <div className={styles.forgot_password}>
        <Link
          to={`${location.pathname}/${ROUTER_PATHS.FORGOT_PASSWORD}`}
          className="primary"
        >
          Forgot your password?
        </Link>
      </div>

      <Button
        type="submit"
        className={styles.submitBtn}
        appearance="primary"
        disabled={isDisabledSubmitBtn}
      >
        Sign in
      </Button>

      <div className={styles.signUp}>
        Is your company new to Qencode?
        <Link
          to={
            location.pathname +
            (currentPage === 'signin' ? '?page=signup' : '?page=signin')
          }
          className={styles.signUp__link}
        >
          {currentPage === 'signin' ? 'Sign in' : 'Sign up'}
        </Link>
      </div>
    </Form>
  );
};
