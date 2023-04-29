import { useMutation } from 'react-query';

import baseAPI from '@/controller/utils/axios-utils';

import type { EditMajorDataPayload } from './types';

const useEditMajorDataMutation = () => {
  const mutation = useMutation(async ({ id, data }: EditMajorDataPayload) => {
    return await baseAPI.put(`/indicator/${id}/data/major`, data, {
      validateStatus: () => true,
    });
  });

  return mutation;
};

export default useEditMajorDataMutation;
