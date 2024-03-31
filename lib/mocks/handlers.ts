import { http, HttpResponse } from 'msw';
import I_JS from '../../assets/js.png';

export const handlers = [
  http.get('/api/hello', () => {
    return HttpResponse.text(`Hello, world! (${new Date().toISOString()})`);
  }),
  http.get('/api/image', () => {
    return HttpResponse.json(I_JS);
  }),
];
