import { ActivatedUserStatusProps } from './activated-user-status.types';
import cn from 'classnames';
import styles from './activated-user-status-styles.module.css';

export const ActivatedUserStatus = ({ status }: ActivatedUserStatusProps) => {
  const text = {
    active: 'The account was successfully verified',
    ['non-active']: 'Please, verify your account',
  };

  return (
    <div
      className={cn(styles.status, {
        [styles.activated]: status === 'active',
      })}
    >
      {text[status]}
    </div>
  );
};
