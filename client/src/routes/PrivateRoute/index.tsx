import { useEffect } from 'react';
import type { FC } from 'react';

import { useCurrentUserQuery } from '@/repository/CurrentUserQuery';
import { Navigate, Outlet } from 'react-router-dom';
import Loader from '@/components/Loader';
import { useAuthContext } from '@/context/AuthContext';

const PrivateRoute: FC = () => {
  const { setCurrentUser } = useAuthContext();
  const { data, error, isLoading } = useCurrentUserQuery();

  useEffect(() => {
    if (!isLoading && !error) {
      setCurrentUser({
        username: data?.data.username,
        email: data?.data.email,
      });
    }
  }, [isLoading, error]);

  if (isLoading) {
    return <Loader />;
  } else if (error) {
    return <Navigate to="/login" />;
  } else {
    return <Outlet />;
  }
};

export default PrivateRoute;
