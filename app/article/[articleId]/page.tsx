import { CommentsCard } from '@/app/article/[articleId]/CommentsCard';
import type { page_ArticlePageQuery } from '@/app/article/[articleId]/__generated__/page_ArticlePageQuery.graphql';
import { Card } from '@/components/Card';
import { RelayRecordMapPublisher } from '@/components/RelayRecordMapPublisher';
import { fetchGraphQLQuery } from '@/lib/relay/fetchGraphQLQuery';
import { notFound } from 'next/navigation';
import { graphql } from 'relay-runtime';

import styles from './page.module.css';

export const dynamic = 'force-dynamic';
export const fetchCache = 'default-no-store';

export default async function ArticlePage({ params }: { params: Promise<{ articleId: string }> }) {
  const { articleId } = await params;
  const {
    data: { node: article },
    recordMap,
    operationDescriptor,
  } = await fetchGraphQLQuery<page_ArticlePageQuery>(
    graphql`
    query page_ArticlePageQuery($articleId: ID!) @raw_response_type {
      node(id: $articleId) {
        __typename
        ... on Article {
          id
          title
          content
          ...CommentsCard_article
        }
      }
    }
  `,
    { articleId },
  );
  if (article?.__typename !== 'Article') return notFound();
  return (
    <RelayRecordMapPublisher recordMap={recordMap} operationDescriptor={operationDescriptor}>
      <main className={styles.main}>
        <Card>
          <h2>{article.title}</h2>
          <p>{article.content}</p>
        </Card>
        <CommentsCard article={article} />
      </main>
    </RelayRecordMapPublisher>
  );
}
