import { useMutation } from 'react-query';

import baseAPI from '@/controller/utils/axios-utils';

const useChangePasswordMutation = () => {
  const mutation = useMutation(async (data: FormData) => {
    return await baseAPI.putForm(`/user/password`, data, {
      validateStatus: () => true,
    });
  });

  return mutation;
};

export default useChangePasswordMutation;
