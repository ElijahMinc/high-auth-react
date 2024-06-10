import '@shared/main.css';
import 'react-toastify/dist/ReactToastify.css';

import { withErrorBoundary } from 'react-error-boundary';
import { QueryClientProvider } from './QueryClientProvider';
import { BrowserRouter } from './RouterProvider';
import { withSuspense } from '@shared/lib';
import { AuthProvider } from './AuthProvider';
import { ToastContainer } from 'react-toastify';
import { Spinner } from '@shared/index';
import { GoogleOAuthProvider } from '@react-oauth/google';

function Providers() {
  return (
    <QueryClientProvider>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <AuthProvider>
          <BrowserRouter />
        </AuthProvider>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
}

const SuspensedProvider = withSuspense(Providers, {
  fallback: <Spinner />,
});

export const Provider = withErrorBoundary(SuspensedProvider, {
  fallbackRender: ({ error }) => <>{error}</>,
});
