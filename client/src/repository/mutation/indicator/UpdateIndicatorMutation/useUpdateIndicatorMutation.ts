import { useMutation } from 'react-query';

import baseAPI from '@/controller/utils/axios-utils';

import type { updateIndicatorPayload } from './types';

const useUpdateIndicatorMutation = () => {
  const mutation = useMutation(
    async ({ id, ...rest }: updateIndicatorPayload) => {
      return await baseAPI.put(
        `/indicator/${id}`,
        { ...rest },
        {
          validateStatus: () => true,
        }
      );
    }
  );

  return mutation;
};

export default useUpdateIndicatorMutation;
