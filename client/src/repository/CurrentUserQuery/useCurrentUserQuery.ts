import { useQuery } from 'react-query';

import baseAPI from '@/utils/axios-utils';

const currentUser = async () => {
  const response = await baseAPI.get('current-user');

  return response;
};

const useCurrentUserQuery = () => {
  const query = useQuery('currentUser', currentUser, {
    refetchOnWindowFocus: false,
    retry: false,
  });

  return query;
};

export default useCurrentUserQuery;
