import { Button } from '@shared/index';
import styles from './home-styles.module.css';
import { useAuth } from '@entities/Auth/lib/hooks/useAuth';

export const HomePage = () => {
  const { user, logout } = useAuth();

  return (
    <div className={styles.wrapper}>
      <h1>Hello, {user?.email}</h1>

      <div className={styles.actions}>
        <div className={styles.btns}>
          <Button appearance="primary" onClick={logout}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};
