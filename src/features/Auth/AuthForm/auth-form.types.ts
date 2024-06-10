import { AuthRequest } from '@entities/Auth/api/auth.types';

export interface IThirdPartyAuth {
  id: number;
  Component: JSX.Element;
}
export interface ISignInFormProps {
  handleSubmit: (data: AuthRequest) => void;
  isDisabledSubmitBtn?: boolean;

  thirdPartyAuths?: IThirdPartyAuth[];

  currentPage: 'signin' | 'signup';
}
