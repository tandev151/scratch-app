// External
import React, { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

// Sibling
import { PATHS } from './paths';

// Internal
import LoginPage from '@/pages/Login';
import MainLayout from '@/pages/MainLayout';

const LazyHomePage = lazy(
  () =>
    new Promise((resolve) => {
      setTimeout(() => resolve(import('@/pages/Home') as never), 2000);
    }),
);

const suspenseWrapper = (element: React.ReactNode) => (
  <Suspense fallback={<div>Loading...</div>}>{element}</Suspense>
);

// Define routes structure
export const router = createBrowserRouter([
  {
    path: PATHS.HOME,
    element: <MainLayout />,
    errorElement: <>Error Boundary</>,
    children: [{ index: true, element: suspenseWrapper(<LazyHomePage />) }],
  },
  {
    path: PATHS.LOGIN,
    element: <LoginPage />,
  },

  { path: PATHS.ERROR, element: <>Error</> },
  { path: PATHS.NOT_FOUND, element: <>Not Found</> },

  { path: '*', element: <>Not Found</> },
]);
