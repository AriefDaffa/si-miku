import { useMutation } from 'react-query';

import baseAPI from '@/controller/utils/axios-utils';

import type { BulkMajorProps } from './types';

const useInputBulkMajorDataMutation = () => {
  const mutation = useMutation(async (data: BulkMajorProps) => {
    return await baseAPI.post('/indicator/data/major/bulk', data, {
      validateStatus: () => true,
    });
  });

  return mutation;
};

export default useInputBulkMajorDataMutation;
