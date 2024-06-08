import { useCheckUserByJWTQuery } from '@entities/Auth/api/auth.queries';
import { useAuth } from '@entities/Auth/lib/hooks/useAuth';
import { Spinner } from '@shared/index';
import { ROUTER_PATHS } from '@shared/lib/react-router/config';
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

export const AppLayout = () => {
  const location = useLocation();
  const isAuthPage = location.pathname.includes(`/${ROUTER_PATHS.AUTH}`);

  const { setUser, setAuth } = useAuth();

  const {
    checkUserByJWTQuery: { data, isLoading, isFetching, isError, isSuccess },
  } = useCheckUserByJWTQuery({
    isEnabled: !isAuthPage,
  });

  const isCheckLoading = isLoading || isFetching;

  useEffect(() => {
    if (isAuthPage) return;
    if (isCheckLoading) return;

    if (isError) {
      setUser(null);
      setAuth(false);
      return;
    }

    if (!data) return;

    const { data: user } = data;

    setUser(user);
    setAuth(true);
  }, [isError, isSuccess]);

  return (
    <div className="wrapper">{isCheckLoading ? <Spinner /> : <Outlet />}</div>
  );
};
