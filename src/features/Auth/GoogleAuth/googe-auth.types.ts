import { AuthRequest } from '@entities/Auth/api/auth.types';

export interface IGoogleProps {
  handleSubmit: (data: AuthRequest) => void;
}
