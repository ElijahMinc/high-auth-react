import { useMutation, useQuery } from '@tanstack/react-query';
import { AuthRequest, ResetPasswordRequest } from './auth.types';
import authService from './auth.service';

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
    queryKey: ['user'],
    queryFn: async () => {
      const res = await authService.checkValidateUserByJWT();
      return res;
    },
    enabled: isEnabled,
  });

  return {
    checkUserByJWTQuery,
  };
};
