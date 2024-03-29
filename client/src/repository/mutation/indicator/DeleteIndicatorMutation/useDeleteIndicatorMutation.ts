import { useMutation } from 'react-query';

import baseAPI from '@/controller/utils/axios-utils';

const useDeleteIndicatorMutation = () => {
  const mutation = useMutation(async (id: number) => {
    return await baseAPI.delete(`/indicator/${id}`);
  });

  return mutation;
};

export default useDeleteIndicatorMutation;
