import type {
  PopularArticleCardPaginationQuery$rawResponse,
  PopularArticleCardPaginationQuery$variables,
} from '@/app/SideBar/__generated__/PopularArticleCardPaginationQuery.graphql';
import type { HeaderQuery$rawResponse } from '@/app/__generated__/HeaderQuery.graphql';
import type { layout_RootLayoutQuery$rawResponse } from '@/app/__generated__/layout_RootLayoutQuery.graphql';
import type {
  page_ArticlePageQuery$rawResponse,
  page_ArticlePageQuery$variables,
} from '@/app/article/[articleId]/__generated__/page_ArticlePageQuery.graphql';
import { ArticleFactory, ViewerFactory } from '@/lib/mocks/factory';
import { HttpResponse, delay, graphql } from 'msw';

export const handlers = [
  graphql.query<layout_RootLayoutQuery$rawResponse>('layout_RootLayoutQuery', async () => {
    return HttpResponse.json({
      data: {
        latestArticles: {
          nodes: await ArticleFactory.buildList(5),
        },
        popularArticles: {
          edges: [
            { cursor: '1', node: await ArticleFactory.build() },
            { cursor: '2', node: await ArticleFactory.build() },
            { cursor: '3', node: await ArticleFactory.build() },
            { cursor: '4', node: await ArticleFactory.build() },
            { cursor: '5', node: await ArticleFactory.build() },
          ],
          pageInfo: {
            endCursor: '5',
            hasNextPage: true,
          },
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
  graphql.query<PopularArticleCardPaginationQuery$rawResponse, PopularArticleCardPaginationQuery$variables>(
    'PopularArticleCardPaginationQuery',
    async ({ variables }) => {
      console.log('PopularArticleCardPaginationQuery');
      return HttpResponse.json({
        data: {
          popularArticles: {
            edges: [
              { cursor: '1', node: await ArticleFactory.build() },
              { cursor: '2', node: await ArticleFactory.build() },
              { cursor: '3', node: await ArticleFactory.build() },
              { cursor: '4', node: await ArticleFactory.build() },
              { cursor: '5', node: await ArticleFactory.build() },
            ],
            pageInfo: {
              endCursor: '5',
              hasNextPage: true,
            },
          },
        },
      });
    },
  ),
];
