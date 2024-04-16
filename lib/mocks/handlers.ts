import { graphql, http, HttpResponse } from 'msw';
import I_JS from '../../assets/js.png';

export const handlers = [
  http.get('/api/hello', () => {
    return HttpResponse.text(`Hello, world! (${new Date().toISOString()})`);
  }),
  http.get('/api/image', () => {
    return HttpResponse.json(I_JS);
  }),
  // for test: `curl -i -X POST -H "Content-Type: Application/json" -d '{ "query": "query GetHello { hello }" }' http://localhost:3000/api/graphql`
  graphql.query('GetHello', () => {
    return HttpResponse.json({
      data: {
        hello: 'Hello, world!',
      },
    });
  }),
];
