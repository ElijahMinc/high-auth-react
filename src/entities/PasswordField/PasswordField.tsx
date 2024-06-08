import { forwardRef, useState } from 'react';
import ShowPasswordIcon from '@shared/assets/show-password.svg';
import styles from './PasswordField.module.css';
import cn from 'classnames';
import { Input } from '@shared/index';
import { InputProps } from '@shared/ui/Input';

export const PasswordField = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...inputProps }, ref) => {
    const [isShowPassword, setShowPassword] = useState(false);

    const type = isShowPassword ? 'text' : 'password';

    const toggleShowPassword = () =>
      setShowPassword((prevStatus) => !prevStatus);

    return (
      <div className={cn(styles.password, className)}>
        <Input
          ref={ref}
          type={type}
          className={styles.password__input}
          {...inputProps}
        />
        <img
          src={ShowPasswordIcon}
          className={cn(styles.password__icon, {
            [styles.without]: !Object.keys(inputProps?.labelOptions ?? {})
              .length,
          })}
          onClick={toggleShowPassword}
        />
      </div>
    );
  }
);
