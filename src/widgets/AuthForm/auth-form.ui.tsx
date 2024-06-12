import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  useLoginByOAuthGoogle,
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
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const currentPage = params.get('page') as Nullable<'signin' | 'signup'>;

  const {
    loginMutation: { isPending: isLoginPending, mutateAsync: loginFn },
  } = useLoginMutation();

  const {
    registrationMutation: {
      isPending: isRegistrationPenging,
      mutateAsync: registerFn,
    },
  } = useRegistrationMutation();

  const {
    loginByOAuthGoogle: {
      isPending: isLoginOAuthGoogle,
      mutateAsync: loginByOAuthGoogleFn,
    },
  } = useLoginByOAuthGoogle();

  const isLoading =
    isLoginPending || isRegistrationPenging || isLoginOAuthGoogle;

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

  const onSubmitGoogle = async (data: Pick<AuthRequest, 'email'>) => {
    const res = await loginByOAuthGoogleFn(data);

    if (!res) {
      toast.error('Something went wrong');

      return;
    }

    toast.success('You have successfully logged in');
    setAuth(true);
    navigate(ROUTER_PATHS.HOME, { replace: true });
  };

  //!TODO Auth through Github. Not complete yet
  // const onSubmitGithub = async (code: string) => {
  //   console.log('code', code);
  // };

  const thirdPartyAuths: IThirdPartyAuth[] = [
    {
      id: 1,
      Component: <GoogleAuth handleSubmit={onSubmitGoogle} />,
    },
    // {
    //   id: 2,
    //   Component: <GithubAuth handleSubmit={onSubmitGithub} />,
    // },
  ];

  return (
    <AuthForm
      currentPage={currentPage ?? 'signup'}
      handleSubmit={onSubmit}
      isDisabledSubmitBtn={isLoading}
      thirdPartyAuths={thirdPartyAuths}
    />
  );
};
