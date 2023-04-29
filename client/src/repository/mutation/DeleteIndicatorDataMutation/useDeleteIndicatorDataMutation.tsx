import { useMutation } from 'react-query';

import baseAPI from '@/controller/utils/axios-utils';

import type { DeleteIndicatorDataTypes } from './types';

const useDeleteIndicatorDataMutation = () => {
  const mutation = useMutation(async (data: DeleteIndicatorDataTypes[]) => {
    return await baseAPI.delete('/indicator/data', {
      data: {
        indicator: data,
      },
    });
  });

  return mutation;
};

export default useDeleteIndicatorDataMutation;
