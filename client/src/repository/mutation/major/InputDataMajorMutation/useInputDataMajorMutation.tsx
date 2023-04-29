import { useMutation } from 'react-query';

import baseAPI from '@/controller/utils/axios-utils';

import type { InputDataMajorPayload } from './types';

const useInputDataMajorMutation = () => {
  const mutation = useMutation(async (data: InputDataMajorPayload) => {
    return await baseAPI.post('/indicator/data/major', data, {
      validateStatus: () => true,
    });
  });

  return mutation;
};

export default useInputDataMajorMutation;
