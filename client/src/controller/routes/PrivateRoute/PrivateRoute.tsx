import { Navigate, Outlet, useLocation } from 'react-router-dom';
import type { FC } from 'react';

import useAuthStatusQuery from '@/repository/query/auth/AuthStatusQuery';

const PrivateRoute: FC = () => {
  const location = useLocation();

  const { data } = useAuthStatusQuery(location.pathname.includes('login'));

  if (!data.isAuthenticated && location.pathname.includes('login')) {
    return <Navigate to="/login" />;
  } else {
    return <Outlet />;
  }
};

export default PrivateRoute;
