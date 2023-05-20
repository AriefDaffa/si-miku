import { useMutation } from 'react-query';

import baseAPI from '@/controller/utils/axios-utils';

import type { DeleteMajorDataPayload } from './types';

const useDeleteMajorDataMutation = () => {
  const mutation = useMutation(async (data: DeleteMajorDataPayload) => {
    return await baseAPI.delete(`/indicator/data/major`, { data });
  });

  return mutation;
};

export default useDeleteMajorDataMutation;
