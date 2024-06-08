import styles from './button-styles.module.css';
import cn from 'classnames';

export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  appearance?: 'primary';
  icon?: React.ReactNode;
}

export const Button = ({
  appearance,
  icon,
  className,
  children,
  ...restProps
}: React.PropsWithChildren<ButtonProps>) => {
  return (
    <button
      className={cn(styles.button, className, {
        [styles.primary]: appearance === 'primary',
      })}
      {...restProps}
    >
      {!!icon && <span>{icon}</span>}
      {children}
    </button>
  );
};
