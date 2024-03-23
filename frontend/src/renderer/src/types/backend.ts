import { paths } from '../../../types/schema';

export type Path = keyof paths;

export type RequestBodyShape<
  TPath extends Path,
  TVerb extends 'get' | 'put' | 'patch' | 'post' | 'delete',
> = paths[TPath] extends {
  [V in TVerb]: { requestBody: { content: { 'application/json': infer Shape } } };
}
  ? Shape
  : never;

export type ResponseShape<
  TPath extends Path,
  TVerb extends 'get' | 'put' | 'patch' | 'post' | 'delete',
> = paths[TPath] extends {
  [V in TVerb]: { responses: { 200: { content: { 'application/json': infer Shape } } } };
}
  ? Shape
  : never;
