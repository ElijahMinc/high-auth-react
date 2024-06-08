import { ResetPasswordRequest } from '@entities/Auth/api/auth.types';

export interface IResetPasswordFormProps {
  handleSubmit: (
    newPassword: Pick<ResetPasswordRequest, 'newPassword'>
  ) => void;
  isDisabledSubmitBtn?: boolean;
}
