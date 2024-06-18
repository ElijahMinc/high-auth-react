import { AppLayout, AuthLayout } from '@app/layouts';
import { ProtectedLayout } from '@app/layouts/ProtectedLayout/ProtectedLayout';
import { ROUTER_PATHS } from '@shared/lib/react-router/config';
import { homePageRoute } from '@pages/Home';
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
  useRouteError,
} from 'react-router-dom';
import { authRoutePageRoute } from '@pages/Auth';
import { resetPasswordPageRoute } from '@pages/ResetPassword';
import { forgotPasswordPageRoute } from '@pages/ForgotPassword';

// https://github.com/remix-run/react-router/discussions/10166
function BubbleError() {
  const error = useRouteError();
  if (error) throw error;
  return null;
}

const router = createBrowserRouter([
  {
    path: ROUTER_PATHS.HOME,
    errorElement: <BubbleError />,
    element: <AppLayout />,
    children: [
      {
        index: homePageRoute.index,
        element: <ProtectedLayout>{homePageRoute.element}</ProtectedLayout>,
      },
      {
        path: ROUTER_PATHS.AUTH,
        element: <AuthLayout />,
        children: [
          authRoutePageRoute,
          resetPasswordPageRoute,
          forgotPasswordPageRoute,
        ],
      },
      {
        loader: async () => redirect(ROUTER_PATHS.AUTH),
        path: '*',
      },
    ],
  },
]);

export function BrowserRouter() {
  return <RouterProvider router={router} />;
}
