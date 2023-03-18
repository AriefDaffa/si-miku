import { useMutation } from 'react-query';

import baseAPI from '@/utils/axios-utils';

import type { IndicatorMutationTypes } from './types';

const InputIndicatorDataMajorMutation = () => {
  const mutation = useMutation(async (data: IndicatorMutationTypes) => {
    return await baseAPI.post('/indicator/insert-data-major', data, {
      validateStatus: () => true,
    });
  });

  return mutation;
};

export default InputIndicatorDataMajorMutation;
