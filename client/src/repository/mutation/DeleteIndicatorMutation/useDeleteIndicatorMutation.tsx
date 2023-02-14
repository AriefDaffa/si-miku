import { useMutation } from 'react-query';

import baseAPI from '@/utils/axios-utils';

const useDeleteIndicatorMutation = () => {
  const mutation = useMutation(async (id: number) => {
    return await baseAPI.delete('/indicator', {
      data: {
        indicator_id: id,
      },
    });
  });

  return mutation;
};

export default useDeleteIndicatorMutation;
