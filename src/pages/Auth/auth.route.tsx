import { createElement } from 'react';
import { RouteObject } from 'react-router-dom';
import { AuthPage } from './auth-page.ui';

export const authRoutePageRoute: RouteObject = {
  index: true,
  element: createElement(AuthPage),
};
