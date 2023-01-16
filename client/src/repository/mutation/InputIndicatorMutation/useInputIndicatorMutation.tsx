import { useMutation } from 'react-query';

import baseAPI from '@/utils/axios-utils';

import type { IndicatorMutationData } from './types';

const useInputIndicatorMutation = () => {
  const mutation = useMutation(async (data: IndicatorMutationData) => {
    return await baseAPI.post('/indicator', data);
  });

  return mutation;
};

export default useInputIndicatorMutation;
