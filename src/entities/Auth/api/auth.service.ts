import {
  AuthRequest,
  AuthResponse,
  IUser,
  ResetPasswordRequest,
} from './auth.types';
import { toast } from 'react-toastify';
import { Nullable } from '@shared/types/nullable.type';
import { CrudService } from '@shared/http/crud.service';
import { SuccessResponse } from '@shared/http/http.types';
import { localStorageAccessTokenKey } from '@shared/http/http.api';

import './auth.api';

class AuthService extends CrudService {
  public uniqueName: string;

  constructor() {
    super('auth');
    this.uniqueName = 'auth';
  }

  async login(data: AuthRequest): Promise<Nullable<AuthResponse>> {
    const routeParams = {};

    const response = await this.create<
      AuthRequest,
      SuccessResponse<AuthResponse>
    >(data, routeParams, '/login');

    if ('error' in response) {
      return null;
    }

    localStorage.setItem(localStorageAccessTokenKey, response.data.accessToken);

    return response.data;
  }

  async loginByOAuthGoogle(
    data: Pick<AuthRequest, 'email'>
  ): Promise<Nullable<AuthResponse>> {
    const routeParams = {};

    const response = await this.create<
      Pick<AuthRequest, 'email'>,
      SuccessResponse<AuthResponse>
    >(data, routeParams, '/login-oauth-google');

    if ('error' in response) {
      return null;
    }

    localStorage.setItem(localStorageAccessTokenKey, response.data.accessToken);

    return response.data;
  }

  //!TODO Not completed; Don`t use it
  async loginByOAuthGithub(code: string): Promise<Nullable<AuthResponse>> {
    const routeParams = {
      code,
    };

    const response = await this.create<unknown, SuccessResponse<AuthResponse>>(
      {},
      routeParams,
      '/login-oauth-github'
    );

    if ('error' in response) {
      return null;
    }

    localStorage.setItem(localStorageAccessTokenKey, response.data.accessToken);

    return response.data;
  }

  async registration(data: AuthRequest): Promise<Nullable<AuthResponse>> {
    const routeParams = {};

    const response = await this.create<
      AuthRequest,
      SuccessResponse<AuthResponse>
    >(data, routeParams, '/registration');

    if ('error' in response) {
      return null;
    }

    localStorage.setItem(localStorageAccessTokenKey, response.data.accessToken);

    return response.data;
  }

  async forgotPassword(data: { email: AuthRequest['email'] }) {
    const routeParams = {};

    const response = await this.create<
      { email: AuthRequest['email'] },
      SuccessResponse<AuthResponse>
    >(data, routeParams, '/forgot-password');

    toast.success(response.message);

    return response;
  }

  async resetPassword({ accessLink, newPassword }: ResetPasswordRequest) {
    const routeParams = {};

    const response = await this.create<
      Pick<ResetPasswordRequest, 'newPassword'>,
      SuccessResponse<IUser>
    >({ newPassword }, routeParams, `/reset-password/${accessLink}`);

    if ('error' in response) {
      toast.error(response.message);

      return null;
    }

    toast.success(response.message);

    return response.data;
  }

  async checkValidateUserByJWT(accessToken: Nullable<string>) {
    const routeParams = {};

    const response = await this.get<SuccessResponse<IUser>>(
      routeParams,
      '/check',
      {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      }
    );

    if ('error' in response) {
      return null;
    }

    return response;
  }

  async refreshTokens() {
    const routeParams = {};

    const response = await this.get<
      SuccessResponse<{ accessToken: string; refreshToken: string }>
    >(routeParams, '/refresh');

    if ('error' in response) {
      return null;
    }

    return response.data;
  }

  async logout() {
    const routeParams = {};

    const response = await this.get<
      SuccessResponse<{ accessToken: string; refreshToken: string }>
    >(routeParams, '/refresh');

    if ('error' in response) {
      toast.error(response.message);

      return null;
    }

    toast.success(response.message);

    return response.data;
  }
}

export default new AuthService();
