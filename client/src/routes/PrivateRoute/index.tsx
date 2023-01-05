import { Navigate, Outlet } from 'react-router-dom';
import type { FC } from 'react';

import Loader from '@/components/Loader';
import { useAuthContext } from '@/context/AuthContext';

const PrivateRoute: FC = () => {
  const { isAuthenticated, isLoading } = useAuthContext();

  if (isLoading) {
    return <Loader />;
  } else if (!isAuthenticated) {
    return <Navigate to="/login" />;
  } else {
    return <Outlet />;
  }
};

export default PrivateRoute;
