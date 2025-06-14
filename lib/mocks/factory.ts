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
    title: dynamic(async ({ get }) => `Title of ${await get('id')}`),
    content: 'This is the content of Article.',
    comments: dynamic(() => ArticleCommentFactory.buildConnection(3, {})),
  },
});

export const ArticleCommentFactory = defineArticleCommentFactory({
  defaultFields: {
    __typename: 'ArticleComment',
    id: dynamic(({ seq }) => `ArticleComment-${seq}`),
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

export const articles = await ArticleFactory.buildList(20);
export const articleComments = await ArticleCommentFactory.buildList(20);
