import { getCurrentEnvironment } from '@/lib/relay/environment';
import type { CacheConfig, FetchQueryFetchPolicy, GraphQLTaggedNode, OperationType } from 'relay-runtime';
import { fetchQuery } from 'relay-runtime';
import type { RecordMap } from 'relay-runtime/lib/store/RelayStoreTypes';

export async function fetchGraphQLQuery<T extends OperationType>(
  taggedNode: GraphQLTaggedNode,
  variables: T['variables'],
  cacheConfig?: {
    networkCacheConfig?: CacheConfig | null | undefined;
    fetchPolicy?: FetchQueryFetchPolicy | null | undefined;
  } | null,
): Promise<{ data: T['response']; recordMap: RecordMap }> {
  const environment = getCurrentEnvironment();
  const observable = fetchQuery<T>(environment, taggedNode, variables, cacheConfig);
  const data = await observable.toPromise();
  if (data === undefined) throw new Error('data is undefined');
  const store = environment.getStore();
  const recordMap = store.getSource().toJSON();
  return { data, recordMap };
}
