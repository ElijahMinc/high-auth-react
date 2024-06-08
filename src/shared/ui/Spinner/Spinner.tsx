import styles from './spinner-styles.module.css';
import cn from 'classnames';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
}

export const Spinner = ({ size = 'lg' }: SpinnerProps) => (
  <div
    className={cn(styles.wrapper, {
      ['sm']: size === 'sm',
      ['md']: size === 'md',
      ['lg']: size === 'lg',
    })}
  >
    <div className={styles['lds-roller']}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);
