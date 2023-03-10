import { useMutation } from 'react-query';

import baseAPI from '@/utils/axios-utils';

import { UserData } from './types';

const useCreateOperatorMutation = () => {
  const mutation = useMutation(async (data: UserData) => {
    return await baseAPI.post('/users/operator', data);
  });

  return mutation;
};

export default useCreateOperatorMutation;
