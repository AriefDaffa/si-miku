import { useMutation } from 'react-query';

import baseAPI from '@/utils/axios-utils';

const useDeleteIndicatorDataMutation = () => {
  const mutation = useMutation(async (id: number[]) => {
    return await baseAPI.delete('/indicator-data', {
      data: {
        indicator_major_year_id: id,
      },
    });
  });

  return mutation;
};

export default useDeleteIndicatorDataMutation;
