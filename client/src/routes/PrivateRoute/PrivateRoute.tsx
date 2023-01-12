import { Navigate, Outlet } from 'react-router-dom';
import type { FC } from 'react';

import Loader from '@/components/Loader';
import useAuthStatusQuery from '@/repository/query/AuthStatusQuery';

const PrivateRoute: FC = () => {
  const { data, isLoading } = useAuthStatusQuery();

  if (isLoading) {
    return <Loader />;
  } else if (!data.isAuthenticated) {
    return <Navigate to="/login" />;
  } else {
    return <Outlet />;
  }
};

export default PrivateRoute;
