import { useMutation } from 'react-query';

import baseAPI from '@/controller/utils/axios-utils';

import type { payloadData } from './types';

const useUpdateIndicatorTypeMutation = () => {
  const mutation = useMutation(async (data: payloadData) => {
    return await baseAPI.put(`/indicator/${data.indicator_id}/type`, {
      indicator_type: data.indicator_type,
    });
  });

  return mutation;
};

export default useUpdateIndicatorTypeMutation;
