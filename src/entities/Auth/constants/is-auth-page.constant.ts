import { ROUTER_PATHS } from '@shared/lib/react-router/config';

export const isAuthPages = window.location.pathname.includes(
  `/${ROUTER_PATHS.AUTH}`
);
