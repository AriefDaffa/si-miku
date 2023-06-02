import { useMutation } from 'react-query';

import baseAPI from '@/controller/utils/axios-utils';

import { UserData } from './types';

const useCreateUserMutation = () => {
  const mutation = useMutation(async (data: UserData) => {
    return await baseAPI.post('/users', data, {
      validateStatus: () => true,
    });
  });

  return mutation;
};

export default useCreateUserMutation;
