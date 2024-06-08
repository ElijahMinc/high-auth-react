import { AuthContext } from '@entities/Auth';
import { useContext } from 'react';

export const useAuth = () => useContext(AuthContext);
