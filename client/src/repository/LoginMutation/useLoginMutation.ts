import { useMutation } from 'react-query';

import baseAPI from '@/utils/axios-utils';

import { LoginProps } from './types';

const useLoginMutation = () => {
  const mutation = useMutation(async (data: LoginProps) => {
    const { user_email, password } = data;
    return await baseAPI.post('/login', { user_email, password });
  });

  return mutation;
};

export default useLoginMutation;
