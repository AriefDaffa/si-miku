import { useMutation } from 'react-query';

import baseAPI from '@/utils/axios-utils';

import { UpdateUserTypes } from './types';

const useUpdateUserProfileMutation = () => {
  const mutation = useMutation(async (data: UpdateUserTypes) => {
    return await baseAPI.put(`/user`, data);
  });

  return mutation;
};

export default useUpdateUserProfileMutation;
