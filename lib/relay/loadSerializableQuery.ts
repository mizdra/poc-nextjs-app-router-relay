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

import type { GraphQLResponse, OperationType, RequestParameters, VariablesOf } from 'relay-runtime';
import type { ConcreteRequest } from 'relay-runtime/lib/util/RelayConcreteNode';
import { networkFetch } from './environment';

export interface SerializablePreloadedQuery<TRequest extends ConcreteRequest, TQuery extends OperationType> {
  params: TRequest['params'];
  variables: VariablesOf<TQuery>;
  response: GraphQLResponse;
}

// Call into raw network fetch to get serializable GraphQL query response
// This response will be sent to the client to "warm" the QueryResponseCache
// to avoid the client fetches.
export default async function loadSerializableQuery<TRequest extends ConcreteRequest, TQuery extends OperationType>(
  params: RequestParameters,
  variables: VariablesOf<TQuery>,
): Promise<SerializablePreloadedQuery<TRequest, TQuery>> {
  const response = await networkFetch(params, variables);
  return {
    params,
    variables,
    response,
  };
}
