// In truth, it is simpler to use msw/node in the process of launching Next.js
// and mocking it.However, that is known to be difficult.
//
// - https://github.com/mswjs/msw/issues/1644
// - https://github.com/vercel/next.js/discussions/56446
//
// So, start a new Node.js process and launch a mock server that listens on a different port than Next.js.
// Then, requests are sent from the Next.js process to this mock server.

import { createServer } from '@mswjs/http-middleware';
import { handlers } from '../lib/mocks/handlers';

if (process.env.MOCK_SERVER_PORT === undefined) {
  throw new Error('Please set `MOCK_SERVER_PORT` environment variable');
}

const httpServer = createServer(...handlers);

httpServer.listen(+process.env.MOCK_SERVER_PORT);
