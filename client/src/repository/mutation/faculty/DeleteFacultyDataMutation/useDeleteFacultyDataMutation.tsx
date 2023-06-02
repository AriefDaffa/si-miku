import { useMutation } from 'react-query';

import baseAPI from '@/controller/utils/axios-utils';

import type { DeleteFacultyDataPayload } from './types';

const useDeleteFacultyDataMutation = () => {
  const mutation = useMutation(async (data: DeleteFacultyDataPayload) => {
    return await baseAPI.delete(`/indicator/data/faculty`, { data });
  });

  return mutation;
};

export default useDeleteFacultyDataMutation;
