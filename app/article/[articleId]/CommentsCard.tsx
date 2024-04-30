'use client';

import type { CommentsCard_article$key } from '@/app/article/[articleId]/__generated__/CommentsCard_article.graphql';
import type { CommentsCard_comment$key } from '@/app/article/[articleId]/__generated__/CommentsCard_comment.graphql';
import { Card } from '@/components/Card';
import { User } from '@/components/User';
import { useCallback } from 'react';
// biome-ignore lint/nursery/noRestrictedImports: This is CC.
import { graphql, useFragment, useMutation, usePaginationFragment } from 'react-relay';
import type { CommentsCard_PostCommentMutation } from './__generated__/CommentsCard_PostCommentMutation.graphql';

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
              ...CommentsCard_comment
            }
          }
        }
      }
    `,
    article,
  );

  // Create a new comment and prepend it to the list of comments.
  const [postComment, isInFlight] = useMutation<CommentsCard_PostCommentMutation>(graphql`
    mutation CommentsCard_PostCommentMutation($connections: [ID!]!, $input: PostCommentInput!) @raw_response_type {
      postComment(input: $input) {
        comment @appendNode(connections: $connections, edgeTypeName: "CommentEdge") {
          ...CommentsCard_comment
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
      postComment({
        variables: {
          input: { articleId, content },
          connections: [data.comments.__id],
        },
        onCompleted() {
          form.reset();
        },
      });
    },
    [postComment, data],
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
            <Comment comment={comment} />
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

function Comment({ comment }: { comment: CommentsCard_comment$key }) {
  const { author, content } = useFragment(
    graphql`
      fragment CommentsCard_comment on Comment {
        author {
          ...User_user
        }
        content
      }
    `,
    comment,
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
