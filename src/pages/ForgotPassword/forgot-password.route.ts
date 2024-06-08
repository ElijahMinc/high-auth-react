import { createElement } from 'react';
import { RouteObject } from 'react-router-dom';
import { ROUTER_PATHS } from '@shared/lib/react-router/config';
import { ForgotPasswordPage } from './forgot-password.ui';

export const forgotPasswordPageRoute: RouteObject = {
  path: ROUTER_PATHS.FORGOT_PASSWORD,
  element: createElement(ForgotPasswordPage),
};
