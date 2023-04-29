import { useMutation } from 'react-query';

import baseAPI from '@/controller/utils/axios-utils';

import type { payloadData } from './types';

const useUpdateIndicatorTypeMutation = (indicatorID: number) => {
  const mutation = useMutation(async (data: payloadData) => {
    return await baseAPI.put(`/indicator/${indicatorID}/type`, data);
  });

  return mutation;
};

export default useUpdateIndicatorTypeMutation;
