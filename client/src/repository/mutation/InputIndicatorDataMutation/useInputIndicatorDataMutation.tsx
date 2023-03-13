import { useMutation } from 'react-query';

import baseAPI from '@/utils/axios-utils';

import type { IndicatorMutationTypes } from './types';

const useInputIndicatorDataMutation = () => {
  const mutation = useMutation(async (data: IndicatorMutationTypes) => {
    return await baseAPI.post('/indicator/insert-data-faculty', data);
  });

  return mutation;
};

export default useInputIndicatorDataMutation;
