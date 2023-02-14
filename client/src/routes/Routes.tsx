import { Navigate, useRoutes } from 'react-router-dom';

import { SideNavLayout, BasicLayout } from '@/layout';
import {
  Home,
  Login,
  NotFound,
  InputIndicator,
  Jurusan,
  JurusanDetail,
  Profile,
  IndicatorDetail,
  Indicator,
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
            { path: 'indicator', element: <Indicator /> },
            { path: 'indicator/:id', element: <IndicatorDetail /> },
            { path: 'indicator-input', element: <InputIndicator /> },
            { path: 'jurusan', element: <Jurusan /> },
            { path: 'jurusan/:id', element: <JurusanDetail /> },
            { path: 'profile', element: <Profile /> },
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
