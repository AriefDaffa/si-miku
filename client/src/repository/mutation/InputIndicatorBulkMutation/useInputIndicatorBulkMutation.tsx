import { useMutation } from 'react-query';

import baseAPI from '@/utils/axios-utils';

import type { IndicatorMutationData } from './types';

const useInputIndicatorBulkMutation = () => {
  const mutation = useMutation(async (data: IndicatorMutationData) => {
    return await baseAPI.post('/indicator-bulk', data, {
      validateStatus: () => true,
    });
  });

  return mutation;
};

export default useInputIndicatorBulkMutation;
