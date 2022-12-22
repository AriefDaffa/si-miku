import type { FC, ReactNode } from 'react';

import { QueryClientProvider, QueryClient } from 'react-query';

interface ReactQueryProviderProps {
  children: ReactNode;
}

const ReactQueryProvider: FC<ReactQueryProviderProps> = (props) => {
  const { children } = props;
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
