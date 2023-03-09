import { Navigate, Outlet } from 'react-router-dom';
import type { FC } from 'react';

import SplashScreen from '@/components/UI/atoms/Loader/SplashScreen';
import useAuthStatusQuery from '@/repository/query/AuthStatusQuery';

const PrivateRoute: FC = () => {
  const { data, isLoading } = useAuthStatusQuery();

  if (isLoading) {
    return <SplashScreen />;
  } else if (!data.isAuthenticated) {
    return <Navigate to="/login" />;
  } else {
    return <Outlet />;
  }
};

export default PrivateRoute;
