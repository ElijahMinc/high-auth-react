import { useForgotPasswordMutation } from '@entities/Auth/api/auth.queries';
import { AuthRequest } from '@entities/Auth/api/auth.types';
import { ForgotPasswordForm } from '@features/Auth/ForgotPasswordForm/forgot-password-form.ui';

export const ForgotPasswordFormW = () => {
  const {
    forgotPasswordMutation: { isPending, mutateAsync: forgotPasswordByEmailFn },
  } = useForgotPasswordMutation();

  const onSubmit = async (data: { email: AuthRequest['email'] }) =>
    await forgotPasswordByEmailFn(data);

  return (
    <ForgotPasswordForm
      handleSubmit={onSubmit}
      isDisabledSubmitBtn={isPending}
    />
  );
};
