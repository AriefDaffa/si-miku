import { useMutation } from 'react-query';

import baseAPI from '@/utils/axios-utils';

import type { IndicatorMutationData } from './types';

const useInputIndicatorDataMutation = () => {
  const mutation = useMutation(async (data: IndicatorMutationData) => {
    return await baseAPI.post('/indicator/add-major', data);
  });

  return mutation;
};

export default useInputIndicatorDataMutation;
