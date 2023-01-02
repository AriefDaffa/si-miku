import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import type { FC } from 'react';

import { useAuthContext } from '@/context/AuthContext';
import Loader from '@/components/Loader';
import baseAPI from '@/utils/axios-utils';

const PrivateRoute: FC = () => {
  const navigate = useNavigate();
  const { isLoading } = useAuthContext();

  useEffect(() => {
    baseAPI.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        if (err.response.status === 403 || err.response.status === 401) {
          navigate('/login');
        }
        return err;
      }
    );
  }, []);

  if (isLoading) {
    return <Loader />;
  } else {
    return <Outlet />;
  }
};

export default PrivateRoute;
