import fetchClient from '@renderer/lib/fetch-client';
import useSWR from 'swr';

const ASSETS_ROUTE = '/api/v1/assets/';

export function useAssets() {
  const swrReturn = useSWR(ASSETS_ROUTE, async (key) => {
    const { data, response, error } = await fetchClient.GET(key);

    if (error) throw error;
    if (!response.status.toString().startsWith('2'))
      throw new Error(`Non-OK response with code ${response.status}: ${response.statusText}`);

    return data;
  });

  return swrReturn;
}

// TODO: more API hooks!
