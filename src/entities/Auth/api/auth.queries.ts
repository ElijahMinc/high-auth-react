import { useMutation, useQuery } from '@tanstack/react-query';
import { AuthRequest, ResetPasswordRequest } from './auth.types';
import authService from './auth.service';
import axios from 'axios';
import { localStorageAccessTokenKey } from '@shared/http/http.api';

export const getGoogleCredentialsByAccessToken = async (
  googleAccessToken: string
) => {
  try {
    const { data } = await axios.get(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      {
        headers: { Authorization: `Bearer ${googleAccessToken}` },
      }
    );
    return data;
  } catch (error) {
    return null;
  }
};

export const useLoginMutation = () => {
  const loginMutation = useMutation({
    mutationKey: [authService.uniqueName],
    mutationFn: (data: AuthRequest) => authService.login(data),
  });

  return {
    loginMutation,
  };
};

export const useRegistrationMutation = () => {
  const registrationMutation = useMutation({
    mutationKey: [authService.uniqueName],
    mutationFn: (data: AuthRequest) => authService.registration(data),
  });

  return {
    registrationMutation,
  };
};

//!TODO Not completed; Don`t use it
export const useLoginByOAuthGoogle = () => {
  const loginByOAuthGoogle = useMutation({
    mutationKey: [authService.uniqueName],
    mutationFn: (data: Pick<AuthRequest, 'email'>) =>
      authService.loginByOAuthGoogle(data),
  });

  return {
    loginByOAuthGoogle,
  };
};

export const useLoginByOAuthGithub = () => {
  const loginByOAuthGithub = useMutation({
    mutationKey: [authService.uniqueName],
    mutationFn: (code: string) => authService.loginByOAuthGithub(code),
  });

  return {
    loginByOAuthGithub,
  };
};

export const useResetPasswordMutation = () => {
  const resetPassword = useMutation({
    mutationKey: [authService.uniqueName],
    mutationFn: (data: ResetPasswordRequest) => authService.resetPassword(data),
  });

  return {
    resetPassword,
  };
};

export const useForgotPasswordMutation = () => {
  const forgotPasswordMutation = useMutation({
    mutationKey: [authService.uniqueName],
    mutationFn: (data: { email: AuthRequest['email'] }) =>
      authService.forgotPassword(data),
  });

  return {
    forgotPasswordMutation,
  };
};

export const useCheckUserByJWTQuery = ({
  isEnabled = true,
}: {
  isEnabled: boolean;
}) => {
  const checkUserByJWTQuery = useQuery({
    queryKey: ['checkUser'],
    queryFn: async () => {
      const accessToken = localStorage.getItem(localStorageAccessTokenKey);
      const res = await authService.checkValidateUserByJWT(accessToken);
      return res;
    },
    enabled: isEnabled,
  });

  return {
    checkUserByJWTQuery,
  };
};

export const useLogoutQuery = ({
  isEnabled = true,
}: {
  isEnabled: boolean;
}) => {
  const logout = useQuery({
    queryKey: ['user'],
    queryFn: async () => await authService.logout(),
    enabled: isEnabled,
  });

  return {
    logout,
  };
};
