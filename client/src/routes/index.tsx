import { Navigate, useRoutes } from 'react-router-dom';

import { SideNavLayout } from '@/layout';

import { Home, Login, NotFound, ListIndicator } from '@/pages';

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
