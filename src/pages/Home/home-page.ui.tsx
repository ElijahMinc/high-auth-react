import { useAuth } from '@entities/Auth/lib/hooks/useAuth';
import { LogoutButton } from '@features/Auth/LogoutButton/logout-button.ui';
import styles from './home-styles.module.css';
import { ActivatedUserStatus } from '@features/Auth/ActivatedUserStatus/activated-user-status.ui';

export const HomePage = () => {
  const { user } = useAuth();

  const status = user?.isActivated ? 'active' : 'non-active';

  return (
    <div className={styles.wrapper}>
      <h1>Hello, {user?.email}</h1>

      <div className={styles.actions}>
        <ActivatedUserStatus status={status} />
        <div className={styles.btns}>
          <LogoutButton text="Logout" />
        </div>
      </div>
    </div>
  );
};
