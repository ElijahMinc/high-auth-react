import { useAuth } from '@entities/Auth/lib/hooks/useAuth';
import { ROUTER_PATHS } from '@shared/lib/react-router/config';
import { Navigate } from 'react-router-dom';

export const ProtectedLayout = ({ children }: React.PropsWithChildren) => {
  const { isAuth } = useAuth();
  return isAuth ? (
    children
  ) : (
    <Navigate to={`/${ROUTER_PATHS.AUTH}?page=signin`} />
  );
};
