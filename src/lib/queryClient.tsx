import { QueryClient, QueryClientProvider, QueryCache } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import type { ReactNode } from 'react';

// --- DEFINE GLOBAL ERROR HANDLER ---
const handleGlobalError = (error: any) => {
  // TODO: handle error at below area
  import.meta.env.DEV && console.error('Global Error From React Query:', error);
};

// Create instance QueryCache and pass handler function
const createQueryCache = new QueryCache({
  onError: handleGlobalError,
});

// Create create query client function and return instance Query Client
function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // --- DEFAULT CONFIGURATION --- //

        // Data will be watched "fresh" for 3 minutes
        staleTime: 3 * 60 * 1000,

        // Only enable for specific query if need
        refetchOnWindowFocus: false,

        // Auto refresh data when reconnecting
        refetchOnReconnect: true,

        retry: (failureCount, error: any) => {
          // Not retry with error status over 4xx
          if (error?.response?.status >= 400 && error?.response?.status < 500) {
            return false;
          }
          return failureCount < 3;
        },
      },
    },
    queryCache: createQueryCache,
  });
}

const queryClient = createQueryClient();

type Props = {
  children: ReactNode;
};

// Create Query Provider
export function QueryProvider({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}
