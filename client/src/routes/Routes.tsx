import { Navigate, useRoutes } from 'react-router-dom';

import { SideNavLayout } from '@/layout';
import {
  Home,
  Login,
  NotFound,
  ListIndicator,
  InputIndicator,
  InputTarget,
} from '@/pages';

import PrivateRoute from './PrivateRoute';

const Router = () => {
  const routes = useRoutes([
    {
      element: <PrivateRoute />,
      children: [
        {
          path: '/',
          element: <Navigate to="/dashboard" />,
        },
        {
          path: '/dashboard',
          element: <SideNavLayout />,
          children: [
            { element: <Navigate to="/dashboard/overview" />, index: true },
            { path: 'overview', element: <Home /> },
            { path: 'indicator-list', element: <ListIndicator /> },
            { path: 'indicator-input', element: <InputIndicator /> },
            { path: 'target-input', element: <InputTarget /> },
          ],
        },
      ],
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);

  return routes;
};

export default Router;
