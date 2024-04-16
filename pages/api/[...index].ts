// Mock API requests with msw.
// Usually, it is common to use `msw/node` or `msw/browser` to intercept API requests
// and process them with handlers.
//
// - https://mswjs.io/docs/integrations/browser
// - https://mswjs.io/docs/integrations/node
//
// `msw/node` works by monkey-patching the `globalThis.fetch` or `node:http` module.
// In addition, Next.js also monkey patches `globalThis.fetch`. Therefore, if you use
// `msw/node` with Next.js, their monkey patches conflict and mocking will not work.
//
// - https://github.com/mswjs/msw/issues/1644
// - https://github.com/vercel/next.js/discussions/56446
//
// So we mock API requests with msw instead of using `msw/node`. To do so, we combine
// `express` with `@mswjs/http-middleware`.

import { createMiddleware } from '@mswjs/http-middleware';
import { handlers } from '../../lib/mocks/handlers';
import type { NextApiRequest, NextApiResponse } from 'next';
import express from 'express';

const app = express();
app.use(createMiddleware(...handlers));

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  app(req, res);
}
