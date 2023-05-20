import { useMutation } from 'react-query';

import baseAPI from '@/controller/utils/axios-utils';

const useUpdateUserProfileMutation = () => {
  const mutation = useMutation(async (data: FormData) => {
    return await baseAPI.putForm(`/user`, data);
  });

  return mutation;
};

export default useUpdateUserProfileMutation;
