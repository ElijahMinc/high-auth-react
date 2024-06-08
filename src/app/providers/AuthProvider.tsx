import { AuthContext, IAuthContext } from '@entities/Auth';
import { IUser } from '@entities/Auth/api/auth.types';
import { localStorageAccessTokenKey } from '@shared/http/http.api';
import { Nullable } from '@shared/types/nullable.type';
import { useMemo, useState } from 'react';

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [isAuth, setIsAuth] = useState(
    !!localStorage.getItem(localStorageAccessTokenKey)
  );
  const [user, setUser] = useState<Nullable<IUser>>(null);

  const setAuth = (status: boolean) => setIsAuth(status);

  const value: IAuthContext = useMemo(
    () => ({
      setAuth,
      isAuth,
      user,
      setUser,
    }),
    [isAuth, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
