import { useMutation } from 'react-query';

import baseAPI from '@/controller/utils/axios-utils';

import type { EditDepartmentDataPayload } from './types';

const useEditDepartmentDataMutation = () => {
  const mutation = useMutation(
    async ({ id, data }: EditDepartmentDataPayload) => {
      return await baseAPI.put(`/indicator/${id}/data/department`, data, {
        validateStatus: () => true,
      });
    }
  );

  return mutation;
};

export default useEditDepartmentDataMutation;
