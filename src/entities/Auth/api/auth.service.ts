import {
  AuthRequest,
  AuthResponse,
  IUser,
  ResetPasswordRequest,
} from './auth.types';
import { toast } from 'react-toastify';
import { Nullable } from '@shared/types/nullable.type';
import { CrudService } from '@shared/http/crud.service';
import { ErrorResponse, SuccessResponse } from '@shared/http/http.types';
import { localStorageAccessTokenKey } from '@shared/http/http.api';
import { isError } from '@shared/http/http.lib';
import { isAxiosError } from 'axios';

class AuthService extends CrudService {
  public uniqueName: string;

  _isRetry = false;

  constructor() {
    super('auth');
    this.uniqueName = 'auth';

    this.setup();
  }

  private setup() {
    this.httpRequest.$api.interceptors.response.use(
      (res) => res,
      async (error) => {
        const originalRequest = error.config;

        if (
          isAxiosError(error) &&
          error.response?.status === 401 &&
          !this._isRetry
        ) {
          this._isRetry = true;

          try {
            const data = await this.refreshTokens();
            if ('error' in data) return;

            localStorage.setItem(localStorageAccessTokenKey, data.accessToken);

            originalRequest.headers.set(
              'Authorization',
              `Bearer ${data.accessToken}`
            );

            return this.httpRequest.$api.request(originalRequest);
          } catch (e) {
            const res = await this.logout();
            if (!res) return;

            localStorage.removeItem(localStorageAccessTokenKey);

            return Promise.reject(e);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  async login(data: AuthRequest): Promise<AuthResponse | ErrorResponse> {
    const routeParams = {};

    const response = await this.create<
      AuthRequest,
      SuccessResponse<AuthResponse>
    >(data, routeParams, '/login');

    if (isError(response)) {
      return {
        error: true,
        status: response.status,
        message: response.message,
      };
    }

    localStorage.setItem(localStorageAccessTokenKey, response.data.accessToken);

    return response.data;
  }

  async loginByOAuthGoogle(
    data: Pick<AuthRequest, 'email'>
  ): Promise<AuthResponse | ErrorResponse> {
    const routeParams = {};

    const response = await this.create<
      Pick<AuthRequest, 'email'>,
      SuccessResponse<AuthResponse>
    >(data, routeParams, '/login-oauth-google');

    if (isError(response)) {
      return {
        error: true,
        status: response.status,
        message: response.message,
      };
    }

    localStorage.setItem(localStorageAccessTokenKey, response.data.accessToken);

    return response.data;
  }

  //!TODO Not completed; Don`t use it
  async loginByOAuthGithub(
    code: string
  ): Promise<AuthResponse | ErrorResponse> {
    const routeParams = {
      code,
    };

    const response = await this.create<unknown, SuccessResponse<AuthResponse>>(
      {},
      routeParams,
      '/login-oauth-github'
    );

    if (isError(response)) {
      return {
        error: true,
        status: response.status,
        message: response.message,
      };
    }

    localStorage.setItem(localStorageAccessTokenKey, response.data.accessToken);

    return response.data;
  }

  async registration(data: AuthRequest): Promise<AuthResponse | ErrorResponse> {
    const routeParams = {};

    const response = await this.create<
      AuthRequest,
      SuccessResponse<AuthResponse>
    >(data, routeParams, '/registration');

    if (isError(response)) {
      return {
        error: true,
        status: response.status,
        message: response.message,
      };
    }

    localStorage.setItem(localStorageAccessTokenKey, response.data.accessToken);

    return response.data;
  }

  async forgotPassword(data: {
    email: AuthRequest['email'];
  }): Promise<AuthResponse | ErrorResponse> {
    const routeParams = {};

    const response = await this.create<
      { email: AuthRequest['email'] },
      SuccessResponse<AuthResponse>
    >(data, routeParams, '/forgot-password');

    if (isError(response)) {
      return {
        error: true,
        status: response.status,
        message: response.message,
      };
    }

    toast.success(response.message);

    return response.data;
  }

  async resetPassword({
    accessLink,
    newPassword,
  }: ResetPasswordRequest): Promise<IUser | ErrorResponse> {
    const routeParams = {};

    const response = await this.create<
      Pick<ResetPasswordRequest, 'newPassword'>,
      SuccessResponse<IUser>
    >({ newPassword }, routeParams, `/reset-password/${accessLink}`);

    if (isError(response)) {
      toast.error(response.message);

      return {
        error: true,
        status: response.status,
        message: response.message,
      };
    }

    toast.success(response.message);

    return response.data;
  }

  async checkValidateUserByJWT(
    accessToken: Nullable<string>
  ): Promise<IUser | ErrorResponse> {
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

    if (isError(response)) {
      return {
        error: true,
        status: response.status,
        message: response.message,
      };
    }

    return response.data;
  }

  async refreshTokens(): Promise<
    { accessToken: string; refreshToken: string } | ErrorResponse
  > {
    const routeParams = {};

    const response = await this.get<
      SuccessResponse<{ accessToken: string; refreshToken: string }>
    >(routeParams, '/refresh');

    if (isError(response)) {
      return {
        error: true,
        status: response.status,
        message: response.message,
      };
    }

    return response.data;
  }

  async logout(): Promise<Nullable<ErrorResponse>> {
    const routeParams = {};
    const response = await this.get<SuccessResponse<null>>(
      routeParams,
      '/logout'
    );

    if (isError(response)) {
      toast.error(response.message);

      return {
        error: true,
        status: response.status,
        message: response.message,
      };
    }

    localStorage.removeItem(localStorageAccessTokenKey);

    return response.data;
  }
}

export default new AuthService();
