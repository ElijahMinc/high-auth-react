import { useAuth } from '@entities/Auth/lib/hooks/useAuth';
import { Spinner } from '@shared/index';
import { Outlet } from 'react-router-dom';

export const AppLayout = () => {
  const { isAuthLoading } = useAuth();

  return (
    <div className="wrapper">{isAuthLoading ? <Spinner /> : <Outlet />}</div>
  );
};
