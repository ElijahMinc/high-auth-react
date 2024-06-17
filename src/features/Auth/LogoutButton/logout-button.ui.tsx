import { Button } from '@shared/index';
import { LogoutButtonProps } from './logout-button.types';
import { useAuth } from '@entities/Auth/lib/hooks/useAuth';
import { ROUTER_PATHS } from '@shared/lib/react-router/config';
import { useNavigate } from 'react-router-dom';

export const LogoutButton = ({ text }: LogoutButtonProps) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate(`/${ROUTER_PATHS.AUTH}?page=sigin`, { replace: true });
  };

  return (
    <Button appearance="primary" onClick={handleLogout}>
      {text}
    </Button>
  );
};
