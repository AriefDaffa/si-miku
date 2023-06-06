import { useMutation } from 'react-query';

import baseAPI from '@/controller/utils/axios-utils';

const useEditUserMutation = () => {
  const mutation = useMutation(
    async ({ id, data }: { id: number; data: FormData }) => {
      return await baseAPI.putForm(`/user/${id}`, data);
    }
  );

  return mutation;
};

export default useEditUserMutation;
