import {
  defineArticleFactory,
  defineCommentFactory,
  defineUserFactory,
  defineViewerFactory,
  dynamic,
} from '@/__generated__/fabbrica';
import I_JS from '@/assets/js.png';

export const ArticleFactory = defineArticleFactory({
  defaultFields: {
    __typename: 'Article',
    id: dynamic(({ seq }) => `Article-${seq}`),
    title: dynamic(async ({ get }) => `Title of ${await get('id')}`),
    content: 'This is the content of Article.',
    comments: dynamic(async () => ({
      edges: comments.slice(0, 3).map((comment) => ({ cursor: comment.id, node: comment })),
      pageInfo: {
        endCursor: '3',
        hasNextPage: true,
      },
    })),
  },
});

export const CommentFactory = defineCommentFactory({
  defaultFields: {
    __typename: 'Comment',
    id: dynamic(({ seq }) => `Comment-${seq}`),
    author: dynamic(() => UserFactory.build()),
    content: dynamic(async ({ get }) => `This is the comment of ${await get('id')}.`),
  },
});

export const UserFactory = defineUserFactory({
  defaultFields: {
    __typename: 'User',
    id: dynamic(({ seq }) => `User-${seq}`),
    name: dynamic(async ({ get }) => `${await get('id')}`),
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

export const comments = await CommentFactory.buildList(20);
