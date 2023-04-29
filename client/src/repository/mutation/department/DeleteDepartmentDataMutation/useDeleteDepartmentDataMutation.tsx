import { useMutation } from 'react-query';

import baseAPI from '@/controller/utils/axios-utils';

import type { DeleteDepartmentDataPayload } from './types';

const useDeleteDepartmentDataMutation = () => {
  const mutation = useMutation(async (data: DeleteDepartmentDataPayload) => {
    return await baseAPI.delete(`/indicator/data/department`, { data });
  });

  return mutation;
};

export default useDeleteDepartmentDataMutation;
