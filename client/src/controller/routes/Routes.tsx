import { Navigate, useRoutes } from 'react-router-dom';

import {
  SideNavLayout,
  BasicLayout,
} from '@/presentation/global-component/layout';

import {
  Indicator,
  IndicatorDetail,
  IndicatorInput,
  Login,
  Profile,
  User,
  Department,
  Major,
  NotFound,
} from '@/controller/pages';

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
            { element: <Navigate to="/dashboard/indicator" />, index: true },
            {
              path: 'indicator',
              element: <Indicator />,
              children: [{ path: ':id', element: <IndicatorDetail /> }],
            },
            { path: 'department', element: <Department /> },
            { path: 'major', element: <Major /> },
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
