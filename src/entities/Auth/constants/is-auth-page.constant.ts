import { ROUTER_PATHS } from '@shared/lib/react-router/config';

export const isAuthPage = window.location.pathname.includes(
  `/${ROUTER_PATHS.AUTH}`
);
