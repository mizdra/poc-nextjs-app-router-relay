import {
  Environment,
  type GraphQLResponse,
  Network,
  RecordSource,
  type RequestParameters,
  Store,
  type Variables,
} from 'relay-runtime';

if (process.env.NEXT_PUBLIC_API_ENDPOINT === undefined) throw new Error('NEXT_PUBLIC_API_ENDPOINT is not defined');
const GRAPHQL_API_ENDPOINT = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/graphql`;
const IS_SERVER = typeof window === typeof undefined;

export async function networkFetch(request: RequestParameters, variables: Variables): Promise<GraphQLResponse> {
  const resp = await fetch(GRAPHQL_API_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: request.text,
      variables,
    }),
  });
  const text = await resp.text();
  let json: GraphQLResponse;
  try {
    json = JSON.parse(text);
  } catch (e) {
    throw new Error(
      `Failed to parse JSON response of query '${request.name}' with variables '${JSON.stringify(variables)}': ${text}`,
      { cause: e },
    );
  }

  // GraphQL returns exceptions (for example, a missing required variable) in the "errors"
  // property of the response. If any exceptions occurred when processing the request,
  // throw an error to indicate to the developer what went wrong.
  if ('errors' in json && Array.isArray(json.errors)) {
    throw new Error(
      `Error fetching GraphQL query '${request.name}' with variables '${JSON.stringify(variables)}': ${JSON.stringify(
        json.errors,
      )}`,
    );
  }

  return json;
}

export function createEnvironment() {
  return new Environment({
    network: Network.create(networkFetch),
    store: new Store(new RecordSource()),
    isServer: IS_SERVER,
  });
}
