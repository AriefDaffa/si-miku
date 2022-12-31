import { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import type { FC } from 'react';

import { useCurrentUserQuery } from '@/repository/query/CurrentUserQuery';
import { useAuthContext } from '@/context/AuthContext';
import Loader from '@/components/Loader';
import baseAPI from '@/utils/axios-utils';

const PrivateRoute: FC = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useAuthContext();
  const { data, error, isLoading } = useCurrentUserQuery();

  useEffect(() => {
    baseAPI.interceptors.response.use(
      (res) => {
        if (!isLoading && !error) {
          setCurrentUser({
            username: data?.data.username,
            email: data?.data.email,
          });
        }
        return res;
      },
      (err) => {
        if (err.response.status === 403 || err.response.status === 401) {
          navigate('/login');
        }
        return Promise.reject(err);
      }
    );
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
