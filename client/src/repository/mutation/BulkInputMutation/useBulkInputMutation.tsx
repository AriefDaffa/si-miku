import { useMutation } from 'react-query';

import baseAPI from '@/utils/axios-utils';

const useBulkInputMutation = () => {
  const mutation = useMutation(async (data) => {
    return await baseAPI.post('/indicator/bulk', data);
  });

  return mutation;
};

export default useBulkInputMutation;
