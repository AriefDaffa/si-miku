import { useMutation } from 'react-query';

import baseAPI from '@/controller/utils/axios-utils';

import type { EditFacultyDataPayload } from './types';

const useEditFacultyDataMutation = () => {
  const mutation = useMutation(async ({ id, data }: EditFacultyDataPayload) => {
    return await baseAPI.put(`/indicator/${id}/data/faculty`, data, {
      validateStatus: () => true,
    });
  });

  return mutation;
};

export default useEditFacultyDataMutation;
