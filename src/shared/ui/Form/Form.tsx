import React, {
  DetailedHTMLProps,
  ParamHTMLAttributes,
  forwardRef,
} from 'react';
import cn from 'classnames';
import styles from './form-styles.module.css';

interface FormProps
  extends DetailedHTMLProps<
    ParamHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  > {}

export const Form = forwardRef<
  HTMLFormElement,
  React.PropsWithChildren<FormProps>
>(({ children, className, ...props }, ref) => (
  <form ref={ref} className={cn(styles.form, className)} {...props}>
    {children}
  </form>
));
