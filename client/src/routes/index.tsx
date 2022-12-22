import { useRoutes } from 'react-router-dom';

import { SideNavLayout } from '@/layout';

import { Home, Login, NotFound } from '@/pages';

const Router = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <SideNavLayout />,
      children: [
        { path: '/', element: <Home /> },
        // { path: '/indicator', element: <IndicatorList /> },
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
