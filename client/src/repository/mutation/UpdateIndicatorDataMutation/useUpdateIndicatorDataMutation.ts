import { useMutation } from 'react-query';

import baseAPI from '@/controller/utils/axios-utils';

import type { payloadData } from './types';

const useUpdateIndicatorDataMutation = (indicatorID: number) => {
  const mutation = useMutation(async (data: payloadData) => {
    return await baseAPI.put(`/indicator/${indicatorID}/data`, data);
  });

  return mutation;
};

export default useUpdateIndicatorDataMutation;
