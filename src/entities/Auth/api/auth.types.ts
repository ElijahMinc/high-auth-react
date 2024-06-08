export interface IUser {
  id: string;
  email: string;
  password: string;
}

export interface AuthRequest extends IUser {}

export interface ResetPasswordRequest {
  accessLink: string;
  newPassword: string;
}

export interface AuthResponse {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}
