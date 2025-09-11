import { PATHS } from './paths';

import HomePage from '@/pages/Home';
import LoginPage from '@/pages/Login';

export const routesConfig = [
  {
    path: PATHS.HOME,
    element: <HomePage />,
  },
  {
    path: PATHS.LOGIN,
    element: <LoginPage />,
  },
];
