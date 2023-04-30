import { Navigate, useRoutes } from 'react-router-dom';

import {
  SideNavLayout,
  BasicLayout,
} from '@/presentation/global-component/layout';
import { Home, Department, Major, Progress } from '@/pages';

import PrivateRoute from './PrivateRoute';

import {
  Indicator,
  IndicatorDetail,
  IndicatorInput,
  Login,
  Profile,
  User,
  NotFound,
} from '@/controller/pages';

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
            { element: <Navigate to="/dashboard/indicator" />, index: true },
            {
              path: 'indicator',
              element: <Indicator />,
              children: [{ path: ':id', element: <IndicatorDetail /> }],
            },
            {
              path: 'progress',
              element: <Progress />,
              children: [
                { path: 'department', element: <Department /> },
                { path: 'prodi', element: <Major /> },
              ],
            },
            { path: 'indicator-input', element: <IndicatorInput /> },
            { path: 'profile', element: <Profile /> },
            { path: 'user', element: <User /> },
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
