import { delay, graphql, HttpResponse } from 'msw';
import type { layout_RootLayoutQuery$rawResponse } from '@/app/__generated__/layout_RootLayoutQuery.graphql';
import { ArticleFactory, ViewerFactory } from '@/lib/mocks/factory';
import type { HeaderQuery$rawResponse } from '@/app/__generated__/HeaderQuery.graphql';
import {
  page_ArticlePageQuery,
  type page_ArticlePageQuery$variables,
  type page_ArticlePageQuery$rawResponse,
} from '@/app/article/[articleId]/__generated__/page_ArticlePageQuery.graphql';

export const handlers = [
  graphql.query<layout_RootLayoutQuery$rawResponse>('layout_RootLayoutQuery', async () => {
    return HttpResponse.json({
      data: {
        latestArticles: {
          nodes: await ArticleFactory.buildList(5),
        },
      },
    });
  }),
  graphql.query<HeaderQuery$rawResponse>('HeaderQuery', async () => {
    await delay(1000);
    return HttpResponse.json({
      data: {
        viewer: await ViewerFactory.build(),
      },
    });
  }),
  graphql.query<page_ArticlePageQuery$rawResponse, page_ArticlePageQuery$variables>(
    'page_ArticlePageQuery',
    async ({ variables }) => {
      return HttpResponse.json({
        data: {
          node: await ArticleFactory.build({ id: variables.articleId }),
        },
      });
    },
  ),
];
