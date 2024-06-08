import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  useLoginMutation,
  useRegistrationMutation,
} from '@entities/Auth/api/auth.queries';
import { AuthForm } from '@features/Auth/AuthForm/auth-form.ui';
import { AuthRequest } from '@entities/Auth/api/auth.types';
import { toast } from 'react-toastify';
import { useAuth } from '@entities/Auth/lib/hooks/useAuth';
import { ROUTER_PATHS } from '@shared/lib/react-router/config';
import { Nullable } from '@shared/types/nullable.type';

export const AuthFormW = () => {
  const [params] = useSearchParams();

  const currentPage = params.get('page') as Nullable<'signin' | 'signup'>;

  const { setAuth } = useAuth();

  const {
    loginMutation: { isPending: isLoginPending, mutateAsync: loginFn },
  } = useLoginMutation();

  const {
    registrationMutation: {
      isPending: isRegistrationPenging,
      mutateAsync: registerFn,
    },
  } = useRegistrationMutation();

  const navigate = useNavigate();

  const onSubmit = async (data: AuthRequest) => {
    const res =
      currentPage === 'signin' ? await loginFn(data) : await registerFn(data);

    if (!res) {
      return;
    }

    toast.success('You have successfully logged in');
    setAuth(true);
    navigate(ROUTER_PATHS.HOME, { replace: true });
  };

  return (
    <AuthForm
      currentPage={currentPage ?? 'signup'}
      handleSubmit={onSubmit}
      isDisabledSubmitBtn={isLoginPending || isRegistrationPenging}
    />
  );
};
