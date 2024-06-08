import { createElement } from 'react';
import { RouteObject } from 'react-router-dom';
import { ROUTER_PATHS } from '@shared/lib/react-router/config';
import { ResetPasswordPage } from './reset-password.ui';

export const resetPasswordPageRoute: RouteObject = {
  path: ROUTER_PATHS.RESET_PASSWORD,
  element: createElement(ResetPasswordPage),
};
