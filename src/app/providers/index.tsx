import '@shared/main.css';
import 'react-toastify/dist/ReactToastify.css';

import { withErrorBoundary } from 'react-error-boundary';
import { QueryClientProvider } from './QueryClientProvider';
import { BrowserRouter } from './RouterProvider';
import { withSuspense } from '@shared/lib';
import { AuthProvider } from './AuthProvider';
import { ToastContainer } from 'react-toastify';
import { Spinner } from '@shared/index';

function Providers() {
  return (
    <QueryClientProvider>
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
    </QueryClientProvider>
  );
}

const SuspensedProvider = withSuspense(Providers, {
  fallback: <Spinner />,
});

export const Provider = withErrorBoundary(SuspensedProvider, {
  fallbackRender: ({ error }) => <>{error}</>,
});
