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
import { GoogleAuth } from '@features/Auth/GoogleAuth/googe-auth.ui';
import { IThirdPartyAuth } from '@features/Auth/AuthForm/auth-form.types';

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

  const onSubmitByThirdPartyAuth = async (data: AuthRequest) => {
    let isError = false;

    const res = await registerFn(data);

    if (!res) {
      const loginRes = await loginFn(data);

      if (!loginRes) {
        isError = true;
      }
    }

    if (isError) {
      toast.error('Something went wrong');

      return;
    }

    toast.success('You have successfully logged in');
    setAuth(true);
    navigate(ROUTER_PATHS.HOME, { replace: true });
  };

  const thirdPartyAuths: IThirdPartyAuth[] = [
    {
      id: 1,
      Component: <GoogleAuth handleSubmit={onSubmitByThirdPartyAuth} />,
    },
  ];

  return (
    <AuthForm
      currentPage={currentPage ?? 'signup'}
      handleSubmit={onSubmit}
      isDisabledSubmitBtn={isLoginPending || isRegistrationPenging}
      thirdPartyAuths={thirdPartyAuths}
    />
  );
};
