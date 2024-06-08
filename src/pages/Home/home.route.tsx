import { createElement } from 'react';
import { RouteObject } from 'react-router-dom';
import { HomePage } from './home-page.ui';

export const homePageRoute: RouteObject = {
  index: true,
  element: createElement(HomePage),
};
