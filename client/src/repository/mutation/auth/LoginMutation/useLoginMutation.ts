import { useMutation } from 'react-query';

import baseAPI from '@/controller/utils/axios-utils';

import { LoginProps } from './types';

const useLoginMutation = () => {
  const mutation = useMutation({
    mutationFn: (data: LoginProps) => {
      const { user_email, password } = data;
      return baseAPI.post(
        '/login',
        { user_email, password },
        { validateStatus: () => true }
      );
    },
  });

  return mutation;
};

export default useLoginMutation;
