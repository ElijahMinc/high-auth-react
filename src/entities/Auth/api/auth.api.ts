import { $authApi, localStorageAccessTokenKey } from '@shared/http/http.api';
import { isAxiosError } from 'axios';
import authService from './auth.service';

let _isRetry = false;

$authApi.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (
      isAxiosError(error) &&
      error.response?.status === 401 &&
      !_isRetry
    ) {
      _isRetry = true;

      try {
        const data = await authService.refreshTokens();
        if (!data) return;

        localStorage.setItem(localStorageAccessTokenKey, data.accessToken);

        originalRequest.headers.set(
          'Authorization',
          `Bearer ${data.accessToken}`
        );

        return $authApi.request(originalRequest);
      } catch (e) {
        const res = await authService.logout();
        if (!res) return;

        localStorage.removeItem(localStorageAccessTokenKey);

        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  }
);
