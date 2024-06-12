import { createContext } from 'react';
import { IUser } from './api/auth.types';
import { Nullable } from '@shared/types/nullable.type';
import { localStorageAccessTokenKey } from '@shared/http/http.api';

export interface IAuthContext {
  isAuth: boolean;
  setAuth: (status: boolean) => void;
  user: Nullable<IUser>;
  setUser: (user: Nullable<IUser>) => void;
  logout: () => void;
  isAuthLoading: boolean;
}

export const AuthContext = createContext<IAuthContext>({
  isAuth: !!localStorage.getItem(localStorageAccessTokenKey),
  setAuth: () => {},
  user: null,
  setUser: () => {},
  logout: () => {},
  isAuthLoading: false,
});
