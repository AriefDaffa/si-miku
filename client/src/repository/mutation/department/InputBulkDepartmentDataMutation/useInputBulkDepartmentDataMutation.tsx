import { useMutation } from 'react-query';

import baseAPI from '@/controller/utils/axios-utils';

import type { BulkDepartmentProps } from './types';

const useInputBulkDepartmentDataMutation = () => {
  const mutation = useMutation(async (data: BulkDepartmentProps) => {
    return await baseAPI.post('/indicator/data/department/bulk', data, {
      validateStatus: () => true,
    });
  });

  return mutation;
};

export default useInputBulkDepartmentDataMutation;
