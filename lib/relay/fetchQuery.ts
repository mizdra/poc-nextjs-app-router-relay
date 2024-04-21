import { createEnvironment } from '@/lib/relay/environment';
import type { CacheConfig, FetchQueryFetchPolicy, GraphQLTaggedNode, OperationType } from 'relay-runtime';
import { createOperationDescriptor, fetchQuery, getRequest } from 'relay-runtime';
import type { OperationDescriptor, RecordMap } from 'relay-runtime/lib/store/RelayStoreTypes';

export async function fetchGraphQLQuery<T extends OperationType>(
  taggedNode: GraphQLTaggedNode,
  variables: T['variables'],
  cacheConfig?: {
    networkCacheConfig?: CacheConfig | null | undefined;
    fetchPolicy?: FetchQueryFetchPolicy | null | undefined;
  } | null,
): Promise<{ data: T['response']; recordMap: RecordMap; operationDescriptor: OperationDescriptor }> {
  // Fetch query
  const environment = createEnvironment();
  const observable = fetchQuery<T>(environment, taggedNode, variables, cacheConfig);
  const data = await observable.toPromise();
  if (data === undefined) throw new Error('data is undefined');

  // Get record map from the store
  const store = environment.getStore();
  const recordMap = store.getSource().toJSON();

  // Create operation descriptor
  const queryRequest = getRequest(taggedNode);
  const operationDescriptor = createOperationDescriptor(queryRequest, variables, cacheConfig?.networkCacheConfig);

  return { data, recordMap, operationDescriptor };
}
