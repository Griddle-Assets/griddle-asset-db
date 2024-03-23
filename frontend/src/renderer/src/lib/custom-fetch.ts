import { Path, RequestBodyShape, ResponseShape } from '@renderer/types/backend';

export default async function customFetch<
  TPath extends Path,
  TMethod extends 'get' | 'post' | 'patch' | 'put' | 'delete' = 'get',
>(
  key: TPath,
  {
    method,
    body,
  }: {
    method: TMethod;
    body: RequestBodyShape<TPath, TMethod>;
  },
) {
  const res = await fetch(key, {
    method,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  if (!res.status.toString().startsWith('2')) {
    throw new Error(`Invalid response: ${res.status} (${res.statusText}).`);
  }
  return (await res.json()) as ResponseShape<TPath, TMethod>;
}
