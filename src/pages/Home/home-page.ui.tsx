import { useAuth } from '@entities/Auth/lib/hooks/useAuth';
import { LogoutButton } from '@features/Auth/LogoutButton/logout-button.ui';
import styles from './home-styles.module.css';

export const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className={styles.wrapper}>
      <h1>Hello, {user?.email}</h1>

      <div className={styles.actions}>
        <div className={styles.btns}>
          <LogoutButton text="Logout" />
        </div>
      </div>
    </div>
  );
};
