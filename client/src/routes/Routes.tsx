import { Navigate, useRoutes } from 'react-router-dom';

import { SideNavLayout, BasicLayout } from '@/layout';
import {
  Home,
  Login,
  NotFound,
  ListIndicator,
  InputIndicator,
  Jurusan,
  JurusanDetail,
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
            { path: 'jurusan', element: <Jurusan /> },
            { path: 'jurusan/:id', element: <JurusanDetail /> },
          ],
        },
      ],
    },
    {
      element: <BasicLayout />,
      children: [
        { path: '*', element: <NotFound /> },
        { path: '/login', element: <Login /> },
      ],
    },
  ]);

  return routes;
};

export default Router;
