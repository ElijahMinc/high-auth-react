import { ButtonHTMLAttributes, DetailedHTMLProps, forwardRef } from 'react';
import styles from './input-styles.module.css';
import cn from 'classnames';

export interface InputProps extends React.HTMLProps<HTMLInputElement> {
  labelOptions?: {
    text: string;
    position: 'bottom' | 'top';
  };
  labelProps?: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  >;

  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, labelOptions, labelProps, error, ...restProps }, ref) => (
    <div
      className={cn(styles.inputWrapper, {
        ['bottom']:
          !!labelOptions?.position && labelOptions.position === 'bottom',
      })}
    >
      {!!labelOptions?.text && (
        <label
          className={cn(styles.label, labelProps?.className)}
          {...labelProps}
        >
          {labelOptions.text}
        </label>
      )}

      <input ref={ref} className={cn(styles.input, className)} {...restProps} />

      {error && (
        <p
          style={{ color: 'red', marginTop: '5px' }}
          className="text-red-500 text-xs mt-2 text-left"
        >
          {error}
        </p>
      )}
    </div>
  )
);
