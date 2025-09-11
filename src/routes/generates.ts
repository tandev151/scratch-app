import { generatePath } from 'react-router-dom';

import { PATHS } from './paths';

export const ROUTE_GENERATORS = {
  home: () => PATHS.HOME,
  login: () => PATHS.LOGIN,
  plan: (id: string | number) => generatePath(PATHS.PLAN, { id }),
};
