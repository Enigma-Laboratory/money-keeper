import { QueryFunction, QueryKey, UseQueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query';

interface CustomQueryOptions<TData, TError> extends UseQueryOptions<TData, TError> {}

const useQueryHook = <TData = unknown, TError = unknown>(
  queryKey: QueryKey,
  queryFn: QueryFunction<TData>,
  options?: CustomQueryOptions<TData, TError>,
): UseQueryResult<TData, TError> => {
  return useQuery({
    queryKey: queryKey,
    queryFn,
    ...options,
  });
};

export default useQueryHook;
