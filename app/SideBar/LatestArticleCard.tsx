'use client';

import type { LatestArticleCard_query$key } from '@/app/SideBar/__generated__/LatestArticleCard_query.graphql';
import { Card } from '@/components/Card';
import Link from 'next/link';
// biome-ignore lint/nursery/noRestrictedImports: This is CC.
import { graphql, usePaginationFragment } from 'react-relay';

// This is the Client Component because it implements pagination with `usePaginationFragment`.
export function LatestArticleCard({ query }: { query: LatestArticleCard_query$key }) {
  const { data, hasNext, loadNext, isLoadingNext } = usePaginationFragment(
    graphql`
      fragment LatestArticleCard_query on Query
      @argumentDefinitions(first: { type: "Int", defaultValue: 3 }, after: { type: "String" })
      @refetchable(queryName: "LatestArticleCardPaginationQuery" directives: ["@raw_response_type"]) {
        latestArticles(first: $first, after: $after) @connection(key: "LatestArticleCard_latestArticles") {
          edges {
            node {
              id
              title
            }
          }
        }
      }
    `,
    query,
  );
  const latestArticles = data.latestArticles.edges.map((edge) => edge.node);
  return (
    <Card>
      <h2>Latest Articles</h2>
      <ul>
        {latestArticles.map((article) => (
          <li key={article.id}>
            <Link href={`/article/${article.id}`}>{article.title}</Link>
          </li>
        ))}
      </ul>
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
