'use client';

import type { CommentsCard_article$key } from '@/app/article/[articleId]/__generated__/CommentsCard_article.graphql';
import type { CommentsCard_articleComment$key } from '@/app/article/[articleId]/__generated__/CommentsCard_articleComment.graphql';
import { Card } from '@/components/Card';
import { User } from '@/components/User';
import { useCallback } from 'react';
// biome-ignore lint/nursery/noRestrictedImports: This is CC.
import { graphql, useFragment, useMutation, usePaginationFragment } from 'react-relay';
import type { CommentsCard_CreateArticleCommentMutation } from './__generated__/CommentsCard_CreateArticleCommentMutation.graphql';

// This is the Client Component because it implements pagination with `usePaginationFragment`.
export function CommentsCard({ article }: { article: CommentsCard_article$key }) {
  const { data, hasNext, loadNext, isLoadingNext } = usePaginationFragment(
    graphql`
      fragment CommentsCard_article on Article
      @argumentDefinitions(first: { type: "Int", defaultValue: 3 }, after: { type: "String" })
      @refetchable(queryName: "CommentsCardPaginationQuery" directives: ["@raw_response_type"]) {
        comments(first: $first, after: $after) @connection(key: "CommentsCard_comments") {
          __id
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

  // Create a new comment and prepend it to the list of comments.
  const [createComment, isInFlight] = useMutation<CommentsCard_CreateArticleCommentMutation>(graphql`
    mutation CommentsCard_CreateArticleCommentMutation($connections: [ID!]!, $input: CreateArticleCommentInput!) @raw_response_type {
      createArticleComment(input: $input) {
        comment @prependNode(connections: $connections, edgeTypeName: "ArticleCommentEdge") {
          ...CommentsCard_articleComment
        }
      }
    }
  `);
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      const formData = new FormData(form);
      const articleId = formData.get('articleId') as string;
      const content = formData.get('content') as string;
      createComment({
        variables: {
          input: { articleId, content },
          connections: [data.comments.__id],
        },
        onCompleted() {
          form.reset();
        },
      });
    },
    [createComment, data],
  );

  const comments = data.comments.edges.map((edge) => edge.node);
  return (
    <Card>
      <h2>Comments</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="articleId" value={data.id} />
          <textarea name="content" required disabled={isInFlight} />
          <button type="submit" disabled={isInFlight}>
            Post
          </button>
        </form>
      </div>
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
          ...User_user
        }
        content
      }
    `,
    articleComment,
  );
  return (
    <div>
      <div>
        <User user={author} />
      </div>
      <div>{content}</div>
    </div>
  );
}
