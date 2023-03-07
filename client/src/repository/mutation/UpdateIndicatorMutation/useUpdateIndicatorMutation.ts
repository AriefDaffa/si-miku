import { useMutation } from 'react-query';

import baseAPI from '@/utils/axios-utils';

const useUpdateIndicatorMutation = () => {
  const mutation = useMutation(
    async ({
      id,
      data,
    }: {
      id: number;
      data: { indicator_code: string; indicator_name: string };
    }) => {
      return await baseAPI.put(`/indicator/${id}`, data);
    }
  );

  return mutation;
};

export default useUpdateIndicatorMutation;
