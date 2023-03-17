import { useMutation } from 'react-query';

import baseAPI from '@/utils/axios-utils';

import type { IndicatorMutationTypes } from './types';

const useInputIndicatorDataFacultyMutation = () => {
  const mutation = useMutation(async (data: IndicatorMutationTypes) => {
    return await baseAPI.post('/indicator/insert-data-faculty', data, {
      validateStatus: () => true,
    });
  });

  return mutation;
};

export default useInputIndicatorDataFacultyMutation;
