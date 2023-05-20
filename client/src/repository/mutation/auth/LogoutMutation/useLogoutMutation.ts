import { useMutation } from 'react-query';

import baseAPI from '@/controller/utils/axios-utils';

const useLogoutMutation = () => {
  const mutation = useMutation(async () => {
    return await baseAPI.delete('/logout');
  });

  return mutation;
};

export default useLogoutMutation;
