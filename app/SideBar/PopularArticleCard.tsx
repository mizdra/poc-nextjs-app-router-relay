'use client';

import type { PopularArticleCard_query$key } from '@/app/SideBar/__generated__/PopularArticleCard_query.graphql';
import { Card } from '@/components/Card';
import Link from 'next/link';
// biome-ignore lint/nursery/noRestrictedImports: This is CC.
import { graphql, usePaginationFragment } from 'react-relay';

// This is the Client Component because it implements pagination with `usePaginationFragment`.
export function PopularArticleCard({ query }: { query: PopularArticleCard_query$key }) {
  const { data, hasNext, loadNext, isLoadingNext } = usePaginationFragment(
    graphql`
      fragment PopularArticleCard_query on Query
      @argumentDefinitions(first: { type: "Int", defaultValue: 3 }, after: { type: "String" })
      @refetchable(queryName: "PopularArticleCardPaginationQuery" directives: ["@raw_response_type"]) {
        popularArticles(first: $first, after: $after) @connection(key: "PopularArticleCard_popularArticles") {
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
  const popularArticles = data.popularArticles.edges.map((edge) => edge.node);
  return (
    <Card>
      <h2>Popular Articles</h2>
      <ul>
        {popularArticles.map((article) => (
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
