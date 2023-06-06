import { useMutation } from 'react-query';

import baseAPI from '@/controller/utils/axios-utils';

const useDeleteUserMutation = () => {
  const mutation = useMutation(async (id: number) => {
    return await baseAPI.delete(`/user/${id}`);
  });

  return mutation;
};

export default useDeleteUserMutation;
