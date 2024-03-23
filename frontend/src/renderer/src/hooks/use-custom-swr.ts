import customFetch from '@renderer/lib/custom-fetch';
import { Path, RequestBodyShape, ResponseShape } from '@renderer/types/backend';

import useSWR, { SWRConfiguration } from 'swr';

export default function useCustomSWR<TPath extends Path>(
  key: TPath,
  opts: Omit<SWRConfiguration<ResponseShape<TPath, 'get'>>, 'fetcher'>,
) {
  return useSWR<ResponseShape<TPath, 'get'>>(key, {
    ...opts,
    fetcher: async (path) => {
      return await customFetch<TPath, 'get'>(path, {
        method: 'get',
        body: undefined as RequestBodyShape<TPath, 'get'>,
      });
    },
  });
}
