export enum ROUTER_PATHS {
  HOME = '/',
  AUTH = 'auth',
  FORGOT_PASSWORD = 'forgot-password',
  RESET_PASSWORD = 'reset-password',
}

export const pathKeys = {
  root: '/',
  auth() {
    return pathKeys.root.concat(ROUTER_PATHS.AUTH);
  },
  forgot_password() {
    return pathKeys.root.concat(ROUTER_PATHS.FORGOT_PASSWORD);
  },
  reset_password() {
    return pathKeys.root.concat(ROUTER_PATHS.RESET_PASSWORD);
  },
  home() {
    return pathKeys.root;
  },
};
