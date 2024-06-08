import { AuthRequest } from '@entities/Auth/api/auth.types';

export interface IForgotPasswordFormProps {
  handleSubmit: (data: { email: AuthRequest['email'] }) => void;
  isDisabledSubmitBtn?: boolean;
}
