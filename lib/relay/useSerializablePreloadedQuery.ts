// Fork from: https://github.com/relayjs/relay-examples/tree/b6f9b199d0b8027b5a76a11f1821631b216f4df4/issue-tracker-next-v13/src/relay
/**
 * @license
 * MIT License
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

// Convert preloaded query object (with raw GraphQL Response) into
// Relay's PreloadedQuery.

import { useMemo } from 'react';
import type { PreloadedQuery, PreloadFetchPolicy } from 'react-relay';
import type { ConcreteRequest, IEnvironment, OperationType } from 'relay-runtime';
import { responseCache } from './environment';
import type { SerializablePreloadedQuery } from './loadSerializableQuery';

// This hook convert serializable preloaded query
// into Relay's PreloadedQuery object.
// It is also writes this serializable preloaded query
// into QueryResponseCache, so we the network layer
// can use these cache results when fetching data
// in `usePreloadedQuery`.
export default function useSerializablePreloadedQuery<TRequest extends ConcreteRequest, TQuery extends OperationType>(
  environment: IEnvironment,
  preloadQuery: SerializablePreloadedQuery<TRequest, TQuery>,
  fetchPolicy: PreloadFetchPolicy = 'store-or-network',
): PreloadedQuery<TQuery> {
  useMemo(() => {
    writePreloadedQueryToCache(preloadQuery);
  }, [preloadQuery]);

  return {
    environment,
    fetchKey: preloadQuery.params.id ?? preloadQuery.params.cacheID,
    fetchPolicy,
    isDisposed: false,
    name: preloadQuery.params.name,
    kind: 'PreloadedQuery',
    variables: preloadQuery.variables,
    dispose: () => {
      return;
    },
  };
}

function writePreloadedQueryToCache<TRequest extends ConcreteRequest, TQuery extends OperationType>(
  preloadedQueryObject: SerializablePreloadedQuery<TRequest, TQuery>,
) {
  const cacheKey = preloadedQueryObject.params.id ?? preloadedQueryObject.params.cacheID;
  responseCache?.set(cacheKey, preloadedQueryObject.variables, preloadedQueryObject.response);
}
