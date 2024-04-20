'use client';

import type { CommentsCard_article$key } from '@/app/article/[articleId]/__generated__/CommentsCard_article.graphql';
import type { CommentsCard_articleComment$key } from '@/app/article/[articleId]/__generated__/CommentsCard_articleComment.graphql';
import { Avatar } from '@/components/Avatar';
import { Card } from '@/components/Card';
// biome-ignore lint/nursery/noRestrictedImports: This is CC.
import { graphql, useFragment, usePaginationFragment } from 'react-relay';

// This is the Client Component because it implements pagination with `usePaginationFragment`.
export function CommentsCard({ article }: { article: CommentsCard_article$key }) {
  const { data, hasNext, loadNext, isLoadingNext } = usePaginationFragment(
    graphql`
      fragment CommentsCard_article on Article
      @argumentDefinitions(first: { type: "Int", defaultValue: 3 }, after: { type: "String" })
      @refetchable(queryName: "CommentsCardPaginationQuery" directives: ["@raw_response_type"]) {
        comments(first: $first, after: $after) @connection(key: "CommentsCard_comments") {
          edges {
            node {
              id
              ...CommentsCard_articleComment
            }
          }
        }
      }
    `,
    article,
  );
  const comments = data.comments.edges.map((edge) => edge.node);
  return (
    <Card>
      <h2>Comments</h2>
      <div>
        {comments.map((comment) => (
          <div key={comment.id}>
            <Comment articleComment={comment} />
            <hr />
          </div>
        ))}
      </div>
      {hasNext && (
        <div>
          <button type="button" onClick={() => loadNext(3)} disabled={isLoadingNext}>
            Load more
          </button>
        </div>
      )}
    </Card>
  );
}

function Comment({ articleComment }: { articleComment: CommentsCard_articleComment$key }) {
  const { author, content } = useFragment(
    graphql`
      fragment CommentsCard_articleComment on ArticleComment {
        author {
          ...Avatar_user
        }
        content
      }
    `,
    articleComment,
  );
  return (
    <div>
      <div>
        <Avatar user={author} alt="" />
      </div>
      <div>{content}</div>
    </div>
  );
}
