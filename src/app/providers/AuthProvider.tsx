import { AuthContext, IAuthContext } from '@entities/Auth';
import {
  useCheckUserByJWTQuery,
  useLogoutQuery,
} from '@entities/Auth/api/auth.queries';
import { IUser } from '@entities/Auth/api/auth.types';
import { localStorageAccessTokenKey } from '@shared/http/http.api';
import { ROUTER_PATHS } from '@shared/lib/react-router/config';
import { Nullable } from '@shared/types/nullable.type';
import { useEffect, useMemo, useState } from 'react';

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [isAuth, setIsAuth] = useState(
    !!localStorage.getItem(localStorageAccessTokenKey)
  );
  const [user, setUser] = useState<Nullable<IUser>>(null);

  const isAuthPages = window.location.pathname.includes(
    `/${ROUTER_PATHS.AUTH}`
  );

  const {
    checkUserByJWTQuery: {
      data,
      isLoading: isCheckUserLoading,
      isFetching: isCheckUserFetching,
      isError: isCheckUserError,
      isSuccess: isCheckUserSuccess,
    },
  } = useCheckUserByJWTQuery({
    isEnabled: !isAuthPages,
  });

  const {
    logout: {
      refetch: logoutFn,
      isLoading: isLogoutLoading,
      isFetching: isLogoutFetching,
    },
  } = useLogoutQuery({
    isEnabled: false,
  });

  const isAuthLoading =
    isCheckUserLoading ||
    isCheckUserFetching ||
    isLogoutLoading ||
    isLogoutFetching;

  const setAuth = (status: boolean) => setIsAuth(status);

  const logout = async () => {
    await logoutFn();
    setUser(null);
    setAuth(false);
  };

  useEffect(() => {
    if (isAuthPages) return;
    if (isAuthLoading) return;

    if (isCheckUserError) {
      setUser(null);
      setAuth(false);
      return;
    }

    if (!data) return;

    const { data: user } = data;

    setUser(user);
    setAuth(true);
  }, [isCheckUserError, isCheckUserSuccess, data, isAuthLoading, isAuthPages]);

  const value: IAuthContext = useMemo(
    () => ({
      setAuth,
      isAuth,
      user,
      setUser,
      logout,
      isAuthLoading,
    }),
    [isAuth, user, isAuthLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
