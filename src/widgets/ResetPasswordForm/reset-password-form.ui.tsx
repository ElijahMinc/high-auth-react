import { ResetPasswordForm } from '@features/Auth/ResetPasswordForm/reset-password-form.ui';
import { useResetPasswordMutation } from '@entities/Auth/api/auth.queries';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { ROUTER_PATHS } from '@shared/lib/react-router/config';
import { ResetPasswordRequest } from '@entities/Auth/api/auth.types';
import { toast } from 'react-toastify';

export const ResetPasswordFormW = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const accessLink = params.get('accessLink');

  const {
    resetPassword: { isPending, mutateAsync: resetPasswordFn },
  } = useResetPasswordMutation();

  if (!accessLink) {
    return <Navigate to={`/${ROUTER_PATHS.AUTH}?page=signup`} />;
  }

  const onSubmit = async ({
    newPassword,
  }: Pick<ResetPasswordRequest, 'newPassword'>) => {
    const res = await resetPasswordFn({ newPassword, accessLink });

    if (!res) return;

    navigate(`/${ROUTER_PATHS.AUTH}?page=signin`);
    toast.success('Please, sign in with your new password');
  };

  return (
    <ResetPasswordForm
      handleSubmit={onSubmit}
      isDisabledSubmitBtn={isPending}
    />
  );
};
