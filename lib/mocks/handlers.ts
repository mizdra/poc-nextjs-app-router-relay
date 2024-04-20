import type {
  LatestArticleCardPaginationQuery$rawResponse,
  LatestArticleCardPaginationQuery$variables,
} from '@/app/SideBar/__generated__/LatestArticleCardPaginationQuery.graphql';
import type { HeaderQuery$rawResponse } from '@/app/__generated__/HeaderQuery.graphql';
import type { layout_RootLayoutQuery$rawResponse } from '@/app/__generated__/layout_RootLayoutQuery.graphql';
import type {
  CommentsCardPaginationQuery$rawResponse,
  CommentsCardPaginationQuery$variables,
} from '@/app/article/[articleId]/__generated__/CommentsCardPaginationQuery.graphql';
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
          edges: [
            { cursor: '1', node: await ArticleFactory.build() },
            { cursor: '2', node: await ArticleFactory.build() },
            { cursor: '3', node: await ArticleFactory.build() },
          ],
          pageInfo: {
            endCursor: '3',
            hasNextPage: true,
          },
        },
        popularArticles: {
          nodes: await ArticleFactory.buildList(3),
        },
      },
    });
  }),
  graphql.query<HeaderQuery$rawResponse>('HeaderQuery', async () => {
    await delay(500);
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
          // `satisfies` is a workaround for https://github.com/facebook/relay/issues/4442
          node: (await ArticleFactory.build({ id: variables.articleId })) satisfies Extract<
            page_ArticlePageQuery$rawResponse['node'],
            { __typename: 'Article' }
          >,
        },
      });
    },
  ),
  graphql.query<LatestArticleCardPaginationQuery$rawResponse, LatestArticleCardPaginationQuery$variables>(
    'LatestArticleCardPaginationQuery',
    async () => {
      await delay(500);
      return HttpResponse.json({
        data: {
          latestArticles: {
            edges: [
              { cursor: '1', node: await ArticleFactory.build() },
              { cursor: '2', node: await ArticleFactory.build() },
              { cursor: '3', node: await ArticleFactory.build() },
            ],
            pageInfo: {
              endCursor: '3',
              hasNextPage: true,
            },
          },
        },
      });
    },
  ),
  graphql.query<CommentsCardPaginationQuery$rawResponse, CommentsCardPaginationQuery$variables>(
    'CommentsCardPaginationQuery',
    async ({ variables }) => {
      await delay(500);
      return HttpResponse.json({
        data: {
          node: await ArticleFactory.build({ id: variables.id }),
        },
      });
    },
  ),
];
