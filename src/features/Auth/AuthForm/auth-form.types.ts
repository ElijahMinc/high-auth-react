import { AuthRequest } from '@entities/Auth/api/auth.types';

export interface ISignInFormProps {
  handleSubmit: (data: AuthRequest) => void;
  isDisabledSubmitBtn?: boolean;

  currentPage: 'signin' | 'signup';
}
