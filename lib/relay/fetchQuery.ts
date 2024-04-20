import { getCurrentEnvironment } from '@/lib/relay/environment';
import type { CacheConfig, FetchQueryFetchPolicy, GraphQLTaggedNode, OperationType } from 'relay-runtime';
import { fetchQuery } from 'relay-runtime';

export async function fetchGraphQLQuery<T extends OperationType>(
  taggedNode: GraphQLTaggedNode,
  variables: T['variables'],
  cacheConfig?: {
    networkCacheConfig?: CacheConfig | null | undefined;
    fetchPolicy?: FetchQueryFetchPolicy | null | undefined;
  } | null,
): Promise<T['response']> {
  const environment = getCurrentEnvironment();
  const observable = fetchQuery<T>(environment, taggedNode, variables, cacheConfig);
  const query = await observable.toPromise();
  if (query === undefined) throw new Error('Query is undefined');
  return query;
}
