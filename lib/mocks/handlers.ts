import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/hello', () => {
    return HttpResponse.text(`Hello, world! (${new Date().toISOString()})`);
  }),
];
