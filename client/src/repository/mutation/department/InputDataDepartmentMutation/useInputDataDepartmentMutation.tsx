import { useMutation } from 'react-query';

import baseAPI from '@/controller/utils/axios-utils';

import type { InputDataDepartmentPayload } from './types';

const useInputDataDepartmentMutation = () => {
  const mutation = useMutation(async (data: InputDataDepartmentPayload) => {
    return await baseAPI.post('/indicator/data/department', data, {
      validateStatus: () => true,
    });
  });

  return mutation;
};

export default useInputDataDepartmentMutation;
