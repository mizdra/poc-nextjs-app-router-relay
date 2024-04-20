import {
  defineArticleCommentFactory,
  defineArticleFactory,
  defineUserFactory,
  defineViewerFactory,
  dynamic,
} from '@/__generated__/fabbrica';
import I_JS from '@/assets/js.png';

export const ArticleFactory = defineArticleFactory({
  defaultFields: {
    __typename: 'Article',
    id: dynamic(({ seq }) => `Article-${seq}`),
    title: 'Article Title',
    content: 'This is the content of Article.',
    comments: dynamic(async () => ({
      edges: [
        { cursor: '1', node: await ArticleCommentFactory.build() },
        { cursor: '2', node: await ArticleCommentFactory.build() },
        { cursor: '3', node: await ArticleCommentFactory.build() },
      ],
      pageInfo: {
        endCursor: '3',
        hasNextPage: true,
      },
    })),
  },
});

export const ArticleCommentFactory = defineArticleCommentFactory({
  defaultFields: {
    __typename: 'ArticleComment',
    id: dynamic(({ seq }) => `ArticleComment-${seq}`),
    author: dynamic(() => UserFactory.build()),
    content: 'This is a comment.',
  },
});

export const UserFactory = defineUserFactory({
  defaultFields: {
    __typename: 'User',
    id: dynamic(({ seq }) => `User-${seq}`),
    name: 'JavaScripter',
    avatar: {
      url: I_JS.src,
      width: I_JS.width,
      height: I_JS.height,
    },
  },
});

export const ViewerFactory = defineViewerFactory({
  defaultFields: {
    __typename: 'Viewer',
    user: dynamic(() => UserFactory.build()),
  },
});
