import { useMutation } from 'react-query';

import baseAPI from '@/controller/utils/axios-utils';

import type { InputDataFacultyPayload } from './types';

const useInputDataFacultyMutation = () => {
  const mutation = useMutation(async (data: InputDataFacultyPayload) => {
    return await baseAPI.post('/indicator/data/faculty', data, {
      validateStatus: () => true,
    });
  });

  return mutation;
};

export default useInputDataFacultyMutation;
