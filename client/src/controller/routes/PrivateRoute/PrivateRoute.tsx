import { Navigate, Outlet, useLocation } from 'react-router-dom';
import type { FC } from 'react';

import SplashScreen from '@/components/UI/atoms/Loader/SplashScreen';
import useAuthStatusQuery from '@/repository/query/AuthStatusQuery';

const PrivateRoute: FC = () => {
  const location = useLocation();

  const { data, isLoading } = useAuthStatusQuery(
    location.pathname.includes('login')
  );

  if (isLoading) {
    return <SplashScreen />;
  } else if (!data.isAuthenticated && location.pathname.includes('login')) {
    return <Navigate to="/login" />;
  } else {
    return <Outlet />;
  }
};

export default PrivateRoute;
