import type { page_ArticlePageQuery } from '@/app/article/[articleId]/__generated__/page_ArticlePageQuery.graphql';
import { Card } from '@/components/Card';
import { fetchGraphQLQuery } from '@/lib/relay/fetchQuery';
import { notFound } from 'next/navigation';
import { graphql } from 'relay-runtime';

export default async function ArticlePage({ params }: { params: { articleId: string } }) {
  const { node: article } = await fetchGraphQLQuery<page_ArticlePageQuery>(
    graphql`
    query page_ArticlePageQuery($articleId: ID!) @raw_response_type {
      node(id: $articleId) {
        __typename
        ... on Article {
          id
          title
          content
        }
      }
    }
  `,
    { articleId: params.articleId },
  );
  if (article?.__typename !== 'Article') return notFound();
  return (
    <main>
      <Card>
        <h2>{article.title}</h2>
        <p>{article.content}</p>
      </Card>
    </main>
  );
}
