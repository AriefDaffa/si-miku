import { useMutation } from 'react-query';

import baseAPI from '@/utils/axios-utils';

const useDeleteUserMutation = () => {
  const mutation = useMutation(async (id: number[]) => {
    return await baseAPI.delete('/user', {
      data: {
        id,
      },
    });
  });

  return mutation;
};

export default useDeleteUserMutation;
