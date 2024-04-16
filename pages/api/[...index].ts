// In truth, it is simpler to use msw/node in the process of launching Next.js
// and mocking it.However, that is known to be difficult.
//
// - https://github.com/mswjs/msw/issues/1644
// - https://github.com/vercel/next.js/discussions/56446
//
// So, start a new Node.js process and launch a mock server that listens on a different port than Next.js.
// Then, requests are sent from the Next.js process to this mock server.

import { createMiddleware } from '@mswjs/http-middleware';
import { handlers } from '../../lib/mocks/handlers';
import type { NextApiRequest, NextApiResponse } from 'next';
import express from 'express';

const app = express();
app.use(createMiddleware(...handlers));

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('req.url:', req.url);
  app(req, res);
}
