import type { FC } from 'react';

import { useCurrentUserQuery } from '@/repository/CurrentUserQuery';
import { Navigate, Outlet } from 'react-router-dom';
import Loader from '@/components/Loader';

const PrivateRoute: FC = () => {
  const { error, isLoading } = useCurrentUserQuery();

  if (isLoading) {
    return <Loader />;
  } else if (error) {
    return <Navigate to="/login" />;
  } else {
    return <Outlet />;
  }
};

export default PrivateRoute;
