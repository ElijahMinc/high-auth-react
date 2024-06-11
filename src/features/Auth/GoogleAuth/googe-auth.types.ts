import { AuthRequest } from '@entities/Auth/api/auth.types';

export interface IGoogleProps {
  handleSubmit: (data: Pick<AuthRequest, 'email'>) => void;
}
